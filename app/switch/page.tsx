'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardCopy,
  Download,
  Loader2,
  UploadCloud,
} from 'lucide-react'
import { generateSampleData } from '@/lib/scanner/sample-data'
import {
  MigrationReport,
  createComparisonHash,
  buildMigrationReport,
  runLocalScan,
} from '@/lib/switch/migration-report'
import {
  downloadMigrationPdf,
  generateMigrationPdfReport,
  migrationReportDisclaimer,
} from '@/lib/switch/migration-report-pdf'

type ComparePhase = 'idle' | 'scanning' | 'computing' | 'done' | 'error'

interface UploadedTraceFile {
  file: File
  content: string
}

interface UploadCardProps {
  title: string
  helper: string
  placeholder: string
  selectedFileName: string | null
  disabled: boolean
  onSelect: (file: File) => Promise<void>
}

function UploadCard({
  title,
  helper,
  placeholder,
  selectedFileName,
  disabled,
  onSelect,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelect = useCallback(
    async (fileList: FileList | null) => {
      const file = fileList?.[0]
      if (!file) return
      await onSelect(file)
    },
    [onSelect]
  )

  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 ${
        disabled ? 'opacity-60' : ''
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        if (disabled) return
        void handleSelect(event.dataTransfer.files)
      }}
    >
      <p className="eyebrow mb-2">{title}</p>
      <p className="text-sm font-semibold text-[var(--text-primary)]">{helper}</p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">{placeholder}</p>

      <button
        type="button"
        disabled={disabled}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="h-4 w-4" /> Drop traces or browse
      </button>

      <input
        ref={inputRef}
        type="file"
        disabled={disabled}
        className="hidden"
        accept=".json,.jsonl,.csv,.tsv,.txt,.har"
        onChange={(event) => {
          void handleSelect(event.currentTarget.files)
        }}
      />

      {selectedFileName ? (
        <p className="mt-3 text-xs text-[var(--status-success)]">Loaded: {selectedFileName}</p>
      ) : (
        <p className="mt-3 text-xs text-[var(--text-subtle)]">No file selected</p>
      )}
    </div>
  )
}

function statusBadge(status: string): string {
  if (status === 'IMPROVED') {
    return 'rounded-full border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.1)] px-2 py-1 text-[11px] font-semibold text-[var(--status-success)]'
  }
  if (status === 'DEGRADED') {
    return 'rounded-full border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.1)] px-2 py-1 text-[11px] font-semibold text-[var(--status-danger)]'
  }
  if (status === 'N/A') {
    return 'rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)]'
  }
  return 'rounded-full border border-[color:rgba(113,113,122,.35)] bg-[color:rgba(113,113,122,.15)] px-2 py-1 text-[11px] font-semibold text-[var(--text-secondary)]'
}

function verdictColor(verdict: MigrationReport['verdict']): string {
  if (verdict === 'CLEAR') return 'text-[var(--status-success)]'
  if (verdict === 'DRIFT') return 'text-[var(--status-warning)]'
  return 'text-[var(--status-danger)]'
}

function scrollToWithHeaderOffset(element: HTMLElement | null): void {
  if (!element || typeof window === 'undefined') return
  const headerOffset = 96
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({
    top: Math.max(0, elementTop - headerOffset),
    behavior: 'smooth',
  })
}

function scrubSensitiveText(value: string): string {
  return value
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]')
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, '[REDACTED_CARD]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED_EMAIL]')
    .replace(/\b(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}\b/g, '[REDACTED_PHONE]')
    .replace(/sk-proj-[A-Za-z0-9_-]+/g, '[REDACTED_OPENAI_KEY]')
    .replace(/sk-ant-api03-[A-Za-z0-9_-]+/g, '[REDACTED_ANTHROPIC_KEY]')
    .replace(/AKIA[0-9A-Z]{16}/g, '[REDACTED_AWS_ACCESS_KEY]')
    .replace(/postgresql:\/\/[^\s]+/g, 'postgresql://[REDACTED_DB_URL]')
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED_TOKEN]')
}

function reduceNumericValue(value: unknown, factor: number): unknown {
  if (typeof value !== 'number') return value
  const reduced = value * factor
  return reduced >= 1 ? Math.round(reduced) : Number(reduced.toFixed(4))
}

function buildDemoCandidateFromBaseline(baselineContent: string): string {
  try {
    const parsed = JSON.parse(baselineContent) as unknown
    if (!Array.isArray(parsed)) return baselineContent

    const candidate = parsed.map((entry) => {
      if (!entry || typeof entry !== 'object') return entry
      const item = JSON.parse(JSON.stringify(entry)) as Record<string, unknown>

      if (typeof item.model === 'string' && item.model.includes('gpt')) {
        item.model = 'claude-3-5-sonnet'
      }
      if (typeof item.model_name === 'string' && item.model_name.includes('gpt')) {
        item.model_name = 'claude-3-5-sonnet'
      }

      if (typeof item.completion === 'string') {
        item.completion = scrubSensitiveText(item.completion)
      }
      if (typeof item.output === 'string') {
        item.output = scrubSensitiveText(item.output)
      }

      const outputs = item.outputs
      if (outputs && typeof outputs === 'object') {
        const outputObj = outputs as Record<string, unknown>
        if (Array.isArray(outputObj.generations)) {
          outputObj.generations = outputObj.generations.map((generation) => {
            if (!generation || typeof generation !== 'object') return generation
            const generationObj = generation as Record<string, unknown>
            if (typeof generationObj.text === 'string') {
              generationObj.text = scrubSensitiveText(generationObj.text)
            }
            return generationObj
          })
        }
      }

      if (typeof item.tokens_in === 'number') item.tokens_in = reduceNumericValue(item.tokens_in, 0.78)
      if (typeof item.tokens_out === 'number') item.tokens_out = reduceNumericValue(item.tokens_out, 0.78)
      if (typeof item.prompt_tokens === 'number') item.prompt_tokens = reduceNumericValue(item.prompt_tokens, 0.78)
      if (typeof item.completion_tokens === 'number') item.completion_tokens = reduceNumericValue(item.completion_tokens, 0.78)
      if (typeof item.cost === 'number') item.cost = Number((item.cost * 0.72).toFixed(4))

      if (item.usage && typeof item.usage === 'object') {
        const usage = item.usage as Record<string, unknown>
        usage.prompt_tokens = reduceNumericValue(usage.prompt_tokens, 0.78)
        usage.completion_tokens = reduceNumericValue(usage.completion_tokens, 0.78)
        usage.input_tokens = reduceNumericValue(usage.input_tokens, 0.78)
        usage.output_tokens = reduceNumericValue(usage.output_tokens, 0.78)
      }

      if (item.extra && typeof item.extra === 'object') {
        const extra = item.extra as Record<string, unknown>
        if (extra.invocation_params && typeof extra.invocation_params === 'object') {
          const params = extra.invocation_params as Record<string, unknown>
          if (typeof params.model === 'string' && params.model.includes('gpt')) {
            params.model = 'claude-3-5-sonnet'
          }
        }
        if (extra.tokens && typeof extra.tokens === 'object') {
          const tokens = extra.tokens as Record<string, unknown>
          tokens.input = reduceNumericValue(tokens.input, 0.78)
          tokens.output = reduceNumericValue(tokens.output, 0.78)
          tokens.prompt = reduceNumericValue(tokens.prompt, 0.78)
          tokens.completion = reduceNumericValue(tokens.completion, 0.78)
        }
      }

      return item
    })

    return JSON.stringify(candidate, null, 2)
  } catch {
    return baselineContent
  }
}

export default function SwitchPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const reportRef = useRef<HTMLElement>(null)

  const [prefilledBaselineName, setPrefilledBaselineName] = useState<string | null>(null)
  const [prefilledCandidateName, setPrefilledCandidateName] = useState<string | null>(null)

  const [baselineUpload, setBaselineUpload] = useState<UploadedTraceFile | null>(null)
  const [candidateUpload, setCandidateUpload] = useState<UploadedTraceFile | null>(null)

  const [phase, setPhase] = useState<ComparePhase>('idle')
  const [error, setError] = useState<string | null>(null)
  const [baselineProgress, setBaselineProgress] = useState<string>('Waiting')
  const [candidateProgress, setCandidateProgress] = useState<string>('Waiting')

  const [report, setReport] = useState<MigrationReport | null>(null)
  const [comparisonHash, setComparisonHash] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setPrefilledBaselineName(params.get('baseline'))
    setPrefilledCandidateName(params.get('candidate'))
  }, [])

  useEffect(() => {
    if (phase !== 'scanning' && phase !== 'computing') return
    if (typeof window === 'undefined') return
    const timer = window.setTimeout(() => {
      scrollToWithHeaderOffset(progressRef.current)
    }, 80)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'done' || !report) return
    if (typeof window === 'undefined') return
    const timer = window.setTimeout(() => {
      scrollToWithHeaderOffset(reportRef.current)
    }, 80)
    return () => window.clearTimeout(timer)
  }, [phase, report])

  const baselineLabel = baselineUpload?.file.name ?? prefilledBaselineName ?? null
  const candidateLabel = candidateUpload?.file.name ?? prefilledCandidateName ?? null

  const projectionLabels = useMemo(() => {
    if (!report) return []
    return report.projectionStrands.map((key) => {
      const strand = report.strands.find((item) => item.key === key)
      return strand?.label ?? key
    })
  }, [report])

  const handleSelectFile = useCallback(
    async (side: 'baseline' | 'candidate', file: File) => {
      const content = await file.text()
      setReport(null)
      setComparisonHash('')
      setError(null)
      setPhase('idle')
      if (side === 'baseline') {
        setBaselineUpload({ file, content })
      } else {
        setCandidateUpload({ file, content })
      }
    },
    []
  )

  const handleCompare = useCallback(async () => {
    if (!baselineUpload || !candidateUpload) return

    setError(null)
    setReport(null)
    setComparisonHash('')
    setPhase('scanning')
    setBaselineProgress('Scanning baseline traces...')
    setCandidateProgress('Scanning candidate traces...')

    try {
      const [baselineScan, candidateScan] = await Promise.all([
        runLocalScan(
          baselineUpload.content,
          baselineUpload.file.name,
          baselineUpload.file.type,
          (phaseLabel) => setBaselineProgress(phaseLabel)
        ),
        runLocalScan(
          candidateUpload.content,
          candidateUpload.file.name,
          candidateUpload.file.type,
          (phaseLabel) => setCandidateProgress(phaseLabel)
        ),
      ])

      setPhase('computing')
      const comparison = buildMigrationReport(baselineScan, candidateScan)
      const hash = await createComparisonHash(
        baselineUpload.content,
        candidateUpload.content,
        comparison
      )

      setComparisonHash(hash)
      setReport(comparison)
      setPhase('done')
    } catch (scanError) {
      const message =
        scanError instanceof Error
          ? scanError.message
          : 'Comparison failed. Check that both files contain valid trace data.'
      setError(message)
      setPhase('error')
    }
  }, [baselineUpload, candidateUpload])

  const handleCopyLink = useCallback(async () => {
    if (typeof window === 'undefined') return
    const url = new URL('/switch', window.location.origin)
    if (baselineLabel) url.searchParams.set('baseline', baselineLabel)
    if (candidateLabel) url.searchParams.set('candidate', candidateLabel)
    await navigator.clipboard.writeText(url.toString())
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }, [baselineLabel, candidateLabel])

  const handleDownloadPdf = useCallback(async () => {
    if (!report || !comparisonHash) return

    const blob = await generateMigrationPdfReport(report, {
      baselineFileName: baselineLabel ?? 'baseline-traces',
      candidateFileName: candidateLabel ?? 'candidate-traces',
      generatedAt: new Date(),
      comparisonHash,
    })

    const dateTag = new Date().toISOString().slice(0, 10)
    downloadMigrationPdf(blob, `migration-report-${dateTag}.pdf`)
  }, [baselineLabel, candidateLabel, comparisonHash, report])

  const handleApplyDemoPair = useCallback(() => {
    const baselineSample = generateSampleData('financial')
    const candidateContent = buildDemoCandidateFromBaseline(baselineSample.content)

    const baselineFile = new File([baselineSample.content], 'baseline_demo_traces.json', {
      type: 'application/json',
    })
    const candidateFile = new File([candidateContent], 'candidate_demo_traces.json', {
      type: 'application/json',
    })

    setPrefilledBaselineName(null)
    setPrefilledCandidateName(null)
    setBaselineUpload({ file: baselineFile, content: baselineSample.content })
    setCandidateUpload({ file: candidateFile, content: candidateContent })
    setReport(null)
    setComparisonHash('')
    setError(null)
    setPhase('idle')
    setBaselineProgress('Waiting')
    setCandidateProgress('Waiting')
  }, [])

  const canCompare = Boolean(baselineUpload && candidateUpload)
  const isWorking = phase === 'scanning' || phase === 'computing'

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section id="compare-upload" className="section-container max-w-6xl">
        <div className="text-center">
          <p className="eyebrow mb-4">Simulate</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">Model Migration Report</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
            Compare two models. See what changed. Decide with data.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <UploadCard
            title="Baseline"
            helper="Traces from your current model"
            placeholder="Example: GPT-4 production traces"
            selectedFileName={baselineLabel}
            disabled={isWorking}
            onSelect={(file) => handleSelectFile('baseline', file)}
          />
          <UploadCard
            title="Candidate"
            helper="Traces from the model you're evaluating"
            placeholder="Example: replacement-model staging traces"
            selectedFileName={candidateLabel}
            disabled={isWorking}
            onSelect={(file) => handleSelectFile('candidate', file)}
          />
        </div>

        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="eyebrow mb-2">Local Demo Pair (Optional)</p>
          <p className="text-sm text-[var(--text-secondary)]">
            This page starts blank. Click once to load a local before/after migration demo pair.
          </p>
          <button
            type="button"
            onClick={handleApplyDemoPair}
            disabled={isWorking}
            className="btn-secondary mt-3 gap-2 disabled:cursor-not-allowed"
          >
            Apply Financial Advisor Demo Pair
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-secondary)]">
          100% local. Your data never leaves your browser. Disconnect WiFi and run Compare.
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            disabled={!canCompare || isWorking}
            onClick={() => void handleCompare()}
            className="btn-primary gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isWorking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Comparing
              </>
            ) : (
              <>
                Compare <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {(phase === 'scanning' || phase === 'computing') && (
          <div ref={progressRef} className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="eyebrow mb-2">Progress</p>
            <div className="space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center justify-between gap-3">
                <span>Baseline</span>
                <span>{baselineProgress}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Candidate</span>
                <span>{candidateProgress}</span>
              </div>
              <div className="mt-2 border-t border-[var(--border)] pt-2 text-[var(--text-muted)]">
                {phase === 'computing' ? 'Computing matched-pair diff...' : 'Running local detection engines...'}
              </div>
            </div>
          </div>
        )}

        {phase === 'error' && error && (
          <div className="mt-8 rounded-xl border border-[color:rgba(220,38,38,.4)] bg-[color:rgba(220,38,38,.1)] p-4 text-sm text-[var(--status-danger)]">
            {error}
          </div>
        )}
      </section>

      {report && (
        <section ref={reportRef} className="section-container mt-14 max-w-6xl space-y-6">
          <div className="card text-center">
            <p className={`text-5xl font-black md:text-6xl ${verdictColor(report.verdict)}`}>{report.verdict}</p>
            <p className="mx-auto mt-3 max-w-3xl text-[var(--text-secondary)]">{report.verdictContext}</p>
          </div>

          {report.confidence.matchedPairs === 0 && (
            <div className="rounded-xl border border-[color:rgba(217,119,6,.4)] bg-[color:rgba(217,119,6,.12)] p-4 text-sm text-[var(--text-secondary)]">
              No matching trace pairs found. Ensure both files contain similar prompts/tasks so the comparison can align baseline and candidate traces.
            </div>
          )}

          <div className="card overflow-x-auto !p-0">
            <div className="border-b border-[var(--border)] p-4">
              <h2 className="text-2xl font-bold">8-Strand Comparison</h2>
            </div>
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Strand</th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Baseline</th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Candidate</th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Delta</th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.strands.map((strand) => (
                  <tr key={strand.key} className="border-b border-[var(--border)] align-top last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--text-primary)]">{strand.label}</div>
                      {strand.notes && (
                        <div className="mt-1 text-xs text-[var(--text-muted)]">{strand.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{strand.baselineDisplay}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{strand.candidateDisplay}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{strand.deltaDisplay}</td>
                    <td className="px-4 py-3">
                      <span className={statusBadge(strand.status)}>{strand.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {report.regressions.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-bold">Top Regressions</h2>
              <div className="mt-4 space-y-4">
                {report.regressions.map((item, index) => (
                  <article key={`${item.strandKey}-${index}`} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {index + 1}. {item.strandLabel}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.detail}</p>
                    <p className="mt-2 text-xs text-[var(--text-muted)]">{item.baselineExample}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{item.candidateExample}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="card overflow-x-auto">
            <h2 className="text-2xl font-bold">Projected Impact at Rollout (Canary)</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Canary rollout means releasing the candidate model to a smaller traffic slice first (10%, 25%, 50%) before full rollout.
              The table linearly projects impact for degraded strands as rollout share increases.
            </p>

            {report.projections.length === 0 || projectionLabels.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                No regressions to project. All strands are stable or improved.
              </p>
            ) : (
              <table className="mt-4 w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Rollout %</th>
                    {projectionLabels.map((label) => (
                      <th key={label} className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.projections.map((row) => (
                    <tr key={row.rolloutPct} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 text-[var(--text-primary)]">{row.rolloutPct}%</td>
                      {report.projectionStrands.map((strandKey) => (
                        <td key={`${row.rolloutPct}-${strandKey}`} className="px-4 py-3 text-[var(--text-secondary)]">
                          {row.values[strandKey] ?? 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card">
            <h2 className="text-xl font-bold">Confidence</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Based on {report.confidence.matchedPairs.toLocaleString()} matched trace pairs.
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {report.confidence.unmatchedBaseline.toLocaleString()} baseline / {report.confidence.unmatchedCandidate.toLocaleString()} candidate traces were unmatched and excluded.
            </p>
            {report.confidence.note && (
              <p className="mt-2 rounded-lg border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.1)] p-3 text-xs text-[var(--text-secondary)]">
                {report.confidence.note}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-primary gap-2" onClick={() => void handleDownloadPdf()}>
              <Download className="h-4 w-4" /> Download PDF Report
            </button>
            <button type="button" className="btn-secondary gap-2" onClick={() => void handleCopyLink()}>
              <ClipboardCopy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy Link'}
            </button>
          </div>

          <div className="card">
            <p className="text-sm text-[var(--text-secondary)]">
              This comparison used local detection engines in a single browser session. TrustScope Cloud runs additional engines continuously on every request during rollout.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]">
              Monitor Your Migration in Production <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--text-muted)]">
            <div className="inline-flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-[var(--status-warning)]" />
              <p>{migrationReportDisclaimer}</p>
            </div>
            {comparisonHash && (
              <p className="mt-2 font-mono text-[11px] text-[var(--text-subtle)]">SHA-256: {comparisonHash}</p>
            )}
          </div>
        </section>
      )}

      <section className="section-container mt-16 max-w-6xl">
        <div className="card flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-[var(--text-subtle)]">Where this fits</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Simulate is for model replacement events. Daily trace review still starts in Trace Analyzer.
            </p>
          </div>
          <Link href="/scanner" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--interactive)]">
            Open Trace Analyzer <CheckCircle2 className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
