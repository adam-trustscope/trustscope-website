import { detectAndParse } from '@/lib/scanner/format-detector'
import { estimateCost, simpleHash } from '@/lib/scanner/patterns'
import { ScanCallbacks, ScanResult, scanContent } from '@/lib/scanner/scanner-engine'
import { Finding, FindingEngine, ScannedTrace } from '@/lib/scanner/types'

export type MigrationVerdict = 'CLEAR' | 'DRIFT' | 'REGRESSION' | 'CRITICAL REGRESSION'
export type StrandStatus = 'STABLE' | 'IMPROVED' | 'DEGRADED' | 'N/A'

export interface LocalScanBundle {
  fileName: string
  fileType: string
  content: string
  parsed: ReturnType<typeof detectAndParse>
  scan: ScanResult
}

export interface MatchedTracePair {
  baseline: ScannedTrace
  candidate: ScannedTrace
  fingerprint: string
  toolPath: string
}

export interface StrandMetric {
  key: string
  label: string
  baseline: number | null
  candidate: number | null
  baselineDisplay: string
  candidateDisplay: string
  deltaDisplay: string
  status: StrandStatus
  notes?: string
}

export interface RegressionExplainer {
  strandKey: string
  strandLabel: string
  detail: string
  baselineExample: string
  candidateExample: string
  severityRank: number
}

export interface ProjectionRow {
  rolloutPct: number
  values: Record<string, string>
}

export interface MigrationConfidence {
  matchedPairs: number
  unmatchedBaseline: number
  unmatchedCandidate: number
  note: string | null
}

export interface MigrationReport {
  verdict: MigrationVerdict
  verdictContext: string
  strands: StrandMetric[]
  regressions: RegressionExplainer[]
  projections: ProjectionRow[]
  projectionStrands: string[]
  confidence: MigrationConfidence
  matchedPairs: MatchedTracePair[]
}

interface ComparisonStatus {
  status: StrandStatus
  delta: number | null
  deltaPct: number | null
  deltaDisplay: string
}

interface NumericSeries {
  values: number[]
  kind: 'cost' | 'tokens' | 'latency' | 'tool_calls'
}

const CRITICAL_STRAND_KEYS = new Set(['pii_exposure', 'secrets', 'prompt_injection'])

const ENGINE_TO_STRAND: Partial<Record<string, string>> = {
  pii_scanner: 'pii_exposure',
  secrets_scanner: 'secrets',
  prompt_injection: 'prompt_injection',
  loop_killer: 'loop_risk',
  toxicity_filter: 'toxicity',
}

const STRAND_LABELS: Record<string, string> = {
  pii_exposure: 'PII Exposure',
  secrets: 'Secrets',
  prompt_injection: 'Prompt Injection',
  cost_token: 'Cost / Token',
  latency: 'Avg Latency',
  loop_risk: 'Loop Risk',
  toxicity: 'Toxicity',
  tool_usage: 'Tool Usage',
}

function formatInteger(value: number): string {
  return value.toLocaleString()
}

function formatCost(value: number): string {
  return `$${value.toFixed(4)}`
}

function formatTokens(value: number): string {
  return `${Math.round(value).toLocaleString()} tok`
}

function formatLatency(valueMs: number): string {
  if (valueMs >= 1000) return `${(valueMs / 1000).toFixed(2)}s`
  return `${Math.round(valueMs)}ms`
}

function formatToolUsage(value: number): string {
  return `${value.toFixed(2)} calls/trace`
}

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function getPromptSource(trace: ScannedTrace): string {
  if (trace.input && trace.input.trim().length > 0) return trace.input
  if (trace.raw && trace.raw.trim().length > 0) return trace.raw.slice(0, 2000)
  return ''
}

function getToolPath(trace: ScannedTrace): string {
  if (!trace.toolCalls || trace.toolCalls.length === 0) return 'no-tools'
  return trace.toolCalls.map((value) => normalizeText(String(value))).join('>')
}

function getTraceKey(trace: ScannedTrace): { fingerprint: string; toolPath: string; key: string } {
  const prompt = normalizeText(getPromptSource(trace))
  const toolPath = getToolPath(trace)
  const promptFingerprint = simpleHash(prompt || `trace-${trace.index}`)
  const toolFingerprint = simpleHash(toolPath)
  return {
    fingerprint: promptFingerprint,
    toolPath,
    key: `${promptFingerprint}|${toolFingerprint}`,
  }
}

function buildPairMatches(
  baseline: ScannedTrace[],
  candidate: ScannedTrace[]
): {
  pairs: MatchedTracePair[]
  unmatchedBaseline: ScannedTrace[]
  unmatchedCandidate: ScannedTrace[]
} {
  const queues = new Map<string, ScannedTrace[]>()
  const baselineUnmatched = new Set<number>()
  const candidateUnmatched = new Set<number>()

  for (const trace of baseline) {
    const key = getTraceKey(trace).key
    if (!queues.has(key)) queues.set(key, [])
    queues.get(key)!.push(trace)
    baselineUnmatched.add(trace.index)
  }

  const pairs: MatchedTracePair[] = []

  for (const trace of candidate) {
    const keyData = getTraceKey(trace)
    const queue = queues.get(keyData.key)
    if (queue && queue.length > 0) {
      const baselineTrace = queue.shift()!
      baselineUnmatched.delete(baselineTrace.index)
      pairs.push({
        baseline: baselineTrace,
        candidate: trace,
        fingerprint: keyData.fingerprint,
        toolPath: keyData.toolPath,
      })
    } else {
      candidateUnmatched.add(trace.index)
    }
  }

  const unmatchedBaseline = baseline.filter((trace) => baselineUnmatched.has(trace.index))
  const unmatchedCandidate = candidate.filter((trace) => candidateUnmatched.has(trace.index))

  return { pairs, unmatchedBaseline, unmatchedCandidate }
}

function buildFindingsByTrace(findings: Finding[]): Map<number, Finding[]> {
  const byTrace = new Map<number, Finding[]>()
  for (const finding of findings) {
    if (!byTrace.has(finding.traceIndex)) byTrace.set(finding.traceIndex, [])
    byTrace.get(finding.traceIndex)!.push(finding)
  }
  return byTrace
}

function countEngineFindings(findings: Finding[], traceIndexes: Set<number>, engine: FindingEngine): number {
  return findings.reduce((count, finding) => {
    if (finding.engine === engine && traceIndexes.has(finding.traceIndex)) return count + 1
    return count
  }, 0)
}

function evaluateComparison(
  baseline: number | null,
  candidate: number | null,
  lowerIsBetter: boolean
): ComparisonStatus {
  if (baseline === null || candidate === null) {
    return { status: 'N/A', delta: null, deltaPct: null, deltaDisplay: 'N/A' }
  }

  if (baseline === 0 && candidate === 0) {
    return { status: 'STABLE', delta: 0, deltaPct: 0, deltaDisplay: '0' }
  }

  const delta = candidate - baseline
  const deltaPct = baseline === 0 ? null : (delta / baseline) * 100
  const absDeltaPct = deltaPct === null ? Math.abs(delta) * 100 : Math.abs(deltaPct)

  if (baseline === 0 && candidate > 0) {
    return {
      status: lowerIsBetter ? 'DEGRADED' : 'IMPROVED',
      delta,
      deltaPct,
      deltaDisplay: `+${candidate.toFixed(2)} (new)`,
    }
  }

  if (baseline > 0 && candidate === 0) {
    return {
      status: lowerIsBetter ? 'IMPROVED' : 'DEGRADED',
      delta,
      deltaPct,
      deltaDisplay: '-100%',
    }
  }

  if (absDeltaPct < 5) {
    return {
      status: 'STABLE',
      delta,
      deltaPct,
      deltaDisplay: `${deltaPct === null ? '0' : `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(1)}%`}`,
    }
  }

  const improved = lowerIsBetter ? candidate < baseline : candidate > baseline
  return {
    status: improved ? 'IMPROVED' : 'DEGRADED',
    delta,
    deltaPct,
    deltaDisplay: deltaPct === null ? `${delta >= 0 ? '+' : ''}${delta.toFixed(2)}` : `${deltaPct >= 0 ? '+' : ''}${deltaPct.toFixed(1)}%`,
  }
}

function getCostSeries(traces: ScannedTrace[]): NumericSeries | null {
  const costs: number[] = []
  for (const trace of traces) {
    if (typeof trace.cost === 'number' && Number.isFinite(trace.cost)) {
      costs.push(trace.cost)
      continue
    }

    if (trace.model && typeof trace.tokensIn === 'number' && typeof trace.tokensOut === 'number') {
      const estimated = estimateCost(trace.model, trace.tokensIn, trace.tokensOut)
      if (typeof estimated === 'number' && Number.isFinite(estimated)) {
        costs.push(estimated)
      }
    }
  }
  if (costs.length === 0) return null
  return { values: costs, kind: 'cost' }
}

function getTokenSeries(traces: ScannedTrace[]): NumericSeries | null {
  const tokens: number[] = []
  for (const trace of traces) {
    const total = (trace.tokensIn ?? 0) + (trace.tokensOut ?? 0)
    if (total > 0) tokens.push(total)
  }
  if (tokens.length === 0) return null
  return { values: tokens, kind: 'tokens' }
}

function extractLatencyMs(trace: ScannedTrace): number | null {
  const metadata = trace.metadata ?? {}
  const keys = [
    'latency_ms',
    'latencyMs',
    'duration_ms',
    'durationMs',
    'response_time_ms',
    'responseTimeMs',
    'latency',
    'duration',
  ]

  for (const key of keys) {
    const raw = metadata[key]
    const parsed = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN
    if (Number.isFinite(parsed) && parsed > 0) {
      // Best effort heuristic: values over 200 likely already ms, else seconds.
      return parsed > 200 ? parsed : parsed * 1000
    }
  }

  if (trace.raw) {
    const match = trace.raw.match(/"(latency_ms|duration_ms|response_time_ms)"\s*:\s*([0-9]+(?:\.[0-9]+)?)/i)
    if (match) return Number(match[2])
  }

  return null
}

function getLatencySeries(traces: ScannedTrace[]): NumericSeries | null {
  const values: number[] = []
  for (const trace of traces) {
    const latency = extractLatencyMs(trace)
    if (latency !== null) values.push(latency)
  }
  if (values.length === 0) return null
  return { values, kind: 'latency' }
}

function getToolUsageSeries(traces: ScannedTrace[]): NumericSeries | null {
  const values: number[] = []
  let sawToolField = false
  for (const trace of traces) {
    if (Array.isArray(trace.toolCalls)) {
      sawToolField = true
      values.push(trace.toolCalls.length)
    }
  }
  if (!sawToolField) return null
  return { values, kind: 'tool_calls' }
}

function average(values: number[]): number | null {
  if (values.length === 0) return null
  const sum = values.reduce((acc, current) => acc + current, 0)
  return sum / values.length
}

function formatByKind(value: number | null, kind: NumericSeries['kind'] | 'count'): string {
  if (value === null) return 'N/A'
  if (kind === 'cost') return formatCost(value)
  if (kind === 'tokens') return formatTokens(value)
  if (kind === 'latency') return formatLatency(value)
  if (kind === 'tool_calls') return formatToolUsage(value)
  return formatInteger(Math.round(value))
}

function statusWeight(status: StrandStatus): number {
  if (status === 'DEGRADED') return 3
  if (status === 'IMPROVED') return 2
  if (status === 'STABLE') return 1
  return 0
}

function getSeverityRank(strandKey: string): number {
  if (CRITICAL_STRAND_KEYS.has(strandKey)) return 3
  if (strandKey === 'loop_risk' || strandKey === 'toxicity') return 2
  return 1
}

function pickFindingRegressionExample(
  strandKey: string,
  pairs: MatchedTracePair[],
  baselineByTrace: Map<number, Finding[]>,
  candidateByTrace: Map<number, Finding[]>
): { detail: string; baselineExample: string; candidateExample: string } {
  const engine = Object.entries(ENGINE_TO_STRAND).find(([, key]) => key === strandKey)?.[0] as FindingEngine | undefined
  if (!engine) {
    return {
      detail: 'Detected change in this strand.',
      baselineExample: 'Baseline: no comparable example found.',
      candidateExample: 'Candidate: no comparable example found.',
    }
  }

  for (const pair of pairs) {
    const baselineFindings = (baselineByTrace.get(pair.baseline.index) ?? []).filter((item) => item.engine === engine)
    const candidateFindings = (candidateByTrace.get(pair.candidate.index) ?? []).filter((item) => item.engine === engine)
    if (candidateFindings.length > baselineFindings.length) {
      const baselineLabel = baselineFindings.length === 0
        ? `Baseline trace #${pair.baseline.index + 1}: no ${STRAND_LABELS[strandKey].toLowerCase()} findings.`
        : `Baseline trace #${pair.baseline.index + 1}: ${baselineFindings.length} finding(s).`
      const sampleFinding = candidateFindings[0]?.description ?? `${candidateFindings.length} finding(s) detected`
      const candidateLabel = `Candidate trace #${pair.candidate.index + 1}: ${sampleFinding}.`
      return {
        detail: `${STRAND_LABELS[strandKey]} increased on matched traces.`,
        baselineExample: baselineLabel,
        candidateExample: candidateLabel,
      }
    }
  }

  return {
    detail: `${STRAND_LABELS[strandKey]} increased in aggregate.`,
    baselineExample: 'Baseline: lower incidence in matched traces.',
    candidateExample: 'Candidate: higher incidence in matched traces.',
  }
}

function pickMetricRegressionExample(
  strandKey: string,
  pairs: MatchedTracePair[]
): { detail: string; baselineExample: string; candidateExample: string } {
  type PairDelta = { pair: MatchedTracePair; baseline: number; candidate: number; delta: number }
  const deltas: PairDelta[] = []

  const extractValue = (trace: ScannedTrace): number | null => {
    if (strandKey === 'cost_token') {
      const costSeries = getCostSeries([trace])
      if (costSeries) return costSeries.values[0] ?? null
      const tokenSeries = getTokenSeries([trace])
      return tokenSeries?.values[0] ?? null
    }
    if (strandKey === 'latency') {
      const latency = extractLatencyMs(trace)
      return latency
    }
    if (strandKey === 'tool_usage') {
      return Array.isArray(trace.toolCalls) ? trace.toolCalls.length : null
    }
    return null
  }

  for (const pair of pairs) {
    const baselineValue = extractValue(pair.baseline)
    const candidateValue = extractValue(pair.candidate)
    if (baselineValue === null || candidateValue === null) continue
    deltas.push({
      pair,
      baseline: baselineValue,
      candidate: candidateValue,
      delta: candidateValue - baselineValue,
    })
  }

  deltas.sort((a, b) => b.delta - a.delta)
  const top = deltas[0]
  if (!top || top.delta <= 0) {
    return {
      detail: `${STRAND_LABELS[strandKey]} changed versus baseline.`,
      baselineExample: 'Baseline: lower value in aggregate.',
      candidateExample: 'Candidate: higher value in aggregate.',
    }
  }

  if (strandKey === 'cost_token') {
    return {
      detail: 'Higher average request footprint detected on candidate traces.',
      baselineExample: `Baseline trace #${top.pair.baseline.index + 1}: ${top.baseline.toFixed(4)}.`,
      candidateExample: `Candidate trace #${top.pair.candidate.index + 1}: ${top.candidate.toFixed(4)}.`,
    }
  }

  if (strandKey === 'latency') {
    return {
      detail: 'Response time increased on matched trace pairs.',
      baselineExample: `Baseline trace #${top.pair.baseline.index + 1}: ${formatLatency(top.baseline)}.`,
      candidateExample: `Candidate trace #${top.pair.candidate.index + 1}: ${formatLatency(top.candidate)}.`,
    }
  }

  return {
    detail: 'Tool invocation volume increased on matched trace pairs.',
    baselineExample: `Baseline trace #${top.pair.baseline.index + 1}: ${Math.round(top.baseline)} tool call(s).`,
    candidateExample: `Candidate trace #${top.pair.candidate.index + 1}: ${Math.round(top.candidate)} tool call(s).`,
  }
}

function createConfidenceNote(matched: number): string | null {
  if (matched < 5) return 'Insufficient data for reliable comparison. Upload more traces for meaningful results.'
  if (matched < 20) return 'Small sample size. Results may not represent production behavior.'
  return null
}

function deriveVerdict(strands: StrandMetric[], matchedPairs: number): { verdict: MigrationVerdict; context: string } {
  const degraded = strands.filter((item) => item.status === 'DEGRADED')
  const improved = strands.filter((item) => item.status === 'IMPROVED')
  const criticalDegraded = degraded.filter((item) => CRITICAL_STRAND_KEYS.has(item.key))

  if (criticalDegraded.length > 0) {
    const names = criticalDegraded.map((item) => item.label).join(', ')
    return {
      verdict: 'CRITICAL REGRESSION',
      context: `Critical regressions detected: ${names}. Review findings below.`,
    }
  }

  if (degraded.length > 0) {
    return {
      verdict: 'REGRESSION',
      context: `Regressions detected in ${degraded.length} strand(s). Review findings below.`,
    }
  }

  if (improved.length > 0) {
    return {
      verdict: 'DRIFT',
      context: `Changes detected across ${improved.length} strand(s). No degraded strands detected across ${matchedPairs} matched trace pairs.`,
    }
  }

  return {
    verdict: 'CLEAR',
    context: `No regressions detected across ${matchedPairs} matched trace pairs.`,
  }
}

function buildProjectionRows(strands: StrandMetric[]): { rows: ProjectionRow[]; strandKeys: string[] } {
  const degradations = strands.filter(
    (strand) => strand.status === 'DEGRADED' && strand.baseline !== null && strand.candidate !== null
  )

  if (degradations.length === 0) {
    return { rows: [], strandKeys: [] }
  }

  const rolloutPercents = [10, 25, 50, 100]
  const rows: ProjectionRow[] = rolloutPercents.map((rolloutPct) => {
    const values: Record<string, string> = {}

    for (const strand of degradations) {
      const baseline = strand.baseline ?? 0
      const candidate = strand.candidate ?? 0
      const delta = candidate - baseline
      const projected = baseline + (delta * rolloutPct) / 100

      if (strand.key === 'cost_token') {
        const costLike = strand.baselineDisplay.startsWith('$') && strand.candidateDisplay.startsWith('$')
        values[strand.key] = costLike ? formatCost(projected) : formatTokens(projected)
      } else if (strand.key === 'latency') {
        values[strand.key] = formatLatency(projected)
      } else if (strand.key === 'tool_usage') {
        values[strand.key] = formatToolUsage(projected)
      } else {
        values[strand.key] = formatInteger(Math.round(projected))
      }
    }

    return { rolloutPct, values }
  })

  return { rows, strandKeys: degradations.map((item) => item.key) }
}

export function buildMigrationReport(
  baselineScan: LocalScanBundle,
  candidateScan: LocalScanBundle
): MigrationReport {
  const { pairs, unmatchedBaseline, unmatchedCandidate } = buildPairMatches(
    baselineScan.parsed.traces,
    candidateScan.parsed.traces
  )

  const matchedBaselineIndexes = new Set(pairs.map((pair) => pair.baseline.index))
  const matchedCandidateIndexes = new Set(pairs.map((pair) => pair.candidate.index))

  const baselineFindingsByTrace = buildFindingsByTrace(baselineScan.scan.findings)
  const candidateFindingsByTrace = buildFindingsByTrace(candidateScan.scan.findings)

  const piiBaseline = countEngineFindings(baselineScan.scan.findings, matchedBaselineIndexes, 'pii_scanner')
  const piiCandidate = countEngineFindings(candidateScan.scan.findings, matchedCandidateIndexes, 'pii_scanner')
  const piiCmp = evaluateComparison(piiBaseline, piiCandidate, true)

  const secretsBaseline = countEngineFindings(baselineScan.scan.findings, matchedBaselineIndexes, 'secrets_scanner')
  const secretsCandidate = countEngineFindings(candidateScan.scan.findings, matchedCandidateIndexes, 'secrets_scanner')
  const secretsCmp = evaluateComparison(secretsBaseline, secretsCandidate, true)

  const hasPromptData = baselineScan.scan.classification.hasPrompts || candidateScan.scan.classification.hasPrompts
  const promptBaseline = hasPromptData
    ? countEngineFindings(baselineScan.scan.findings, matchedBaselineIndexes, 'prompt_injection')
    : null
  const promptCandidate = hasPromptData
    ? countEngineFindings(candidateScan.scan.findings, matchedCandidateIndexes, 'prompt_injection')
    : null
  const promptCmp = evaluateComparison(promptBaseline, promptCandidate, true)

  const baselineMatchedTraces = pairs.map((pair) => pair.baseline)
  const candidateMatchedTraces = pairs.map((pair) => pair.candidate)

  const baselineCostSeries = getCostSeries(baselineMatchedTraces)
  const candidateCostSeries = getCostSeries(candidateMatchedTraces)
  const baselineTokenSeries = getTokenSeries(baselineMatchedTraces)
  const candidateTokenSeries = getTokenSeries(candidateMatchedTraces)

  let costTokenBaseline: number | null = null
  let costTokenCandidate: number | null = null
  let costTokenKind: 'cost' | 'tokens' = 'tokens'

  if (baselineCostSeries && candidateCostSeries) {
    costTokenKind = 'cost'
    costTokenBaseline = average(baselineCostSeries.values)
    costTokenCandidate = average(candidateCostSeries.values)
  } else if (baselineTokenSeries && candidateTokenSeries) {
    costTokenKind = 'tokens'
    costTokenBaseline = average(baselineTokenSeries.values)
    costTokenCandidate = average(candidateTokenSeries.values)
  }

  const costCmp = evaluateComparison(costTokenBaseline, costTokenCandidate, true)

  const baselineLatencySeries = getLatencySeries(baselineMatchedTraces)
  const candidateLatencySeries = getLatencySeries(candidateMatchedTraces)
  const latencyBaseline = baselineLatencySeries ? average(baselineLatencySeries.values) : null
  const latencyCandidate = candidateLatencySeries ? average(candidateLatencySeries.values) : null
  const latencyCmp = evaluateComparison(latencyBaseline, latencyCandidate, true)

  const loopBaseline = countEngineFindings(baselineScan.scan.findings, matchedBaselineIndexes, 'loop_killer')
  const loopCandidate = countEngineFindings(candidateScan.scan.findings, matchedCandidateIndexes, 'loop_killer')
  const loopCmp = evaluateComparison(loopBaseline, loopCandidate, true)

  const hasOutputText = baselineScan.scan.classification.hasResponses || candidateScan.scan.classification.hasResponses
  const toxicityBaseline = hasOutputText
    ? countEngineFindings(baselineScan.scan.findings, matchedBaselineIndexes, 'toxicity_filter')
    : null
  const toxicityCandidate = hasOutputText
    ? countEngineFindings(candidateScan.scan.findings, matchedCandidateIndexes, 'toxicity_filter')
    : null
  const toxicityCmp = evaluateComparison(toxicityBaseline, toxicityCandidate, true)

  const baselineToolSeries = getToolUsageSeries(baselineMatchedTraces)
  const candidateToolSeries = getToolUsageSeries(candidateMatchedTraces)
  const toolBaseline = baselineToolSeries ? average(baselineToolSeries.values) : null
  const toolCandidate = candidateToolSeries ? average(candidateToolSeries.values) : null
  const toolCmp = evaluateComparison(toolBaseline, toolCandidate, true)

  const strands: StrandMetric[] = [
    {
      key: 'pii_exposure',
      label: STRAND_LABELS.pii_exposure,
      baseline: piiBaseline,
      candidate: piiCandidate,
      baselineDisplay: formatByKind(piiBaseline, 'count'),
      candidateDisplay: formatByKind(piiCandidate, 'count'),
      deltaDisplay: piiCmp.deltaDisplay,
      status: piiCmp.status,
    },
    {
      key: 'secrets',
      label: STRAND_LABELS.secrets,
      baseline: secretsBaseline,
      candidate: secretsCandidate,
      baselineDisplay: formatByKind(secretsBaseline, 'count'),
      candidateDisplay: formatByKind(secretsCandidate, 'count'),
      deltaDisplay: secretsCmp.deltaDisplay,
      status: secretsCmp.status,
    },
    {
      key: 'prompt_injection',
      label: STRAND_LABELS.prompt_injection,
      baseline: promptBaseline,
      candidate: promptCandidate,
      baselineDisplay: promptBaseline === null ? 'N/A' : formatByKind(promptBaseline, 'count'),
      candidateDisplay: promptCandidate === null ? 'N/A' : formatByKind(promptCandidate, 'count'),
      deltaDisplay: promptCmp.deltaDisplay,
      status: promptCmp.status,
      notes: hasPromptData ? undefined : 'N/A — data not available in traces',
    },
    {
      key: 'cost_token',
      label: STRAND_LABELS.cost_token,
      baseline: costTokenBaseline,
      candidate: costTokenCandidate,
      baselineDisplay: costTokenBaseline === null ? 'N/A' : formatByKind(costTokenBaseline, costTokenKind),
      candidateDisplay: costTokenCandidate === null ? 'N/A' : formatByKind(costTokenCandidate, costTokenKind),
      deltaDisplay: costCmp.deltaDisplay,
      status: costCmp.status,
      notes: costTokenBaseline === null ? 'N/A — data not available in traces' : undefined,
    },
    {
      key: 'latency',
      label: STRAND_LABELS.latency,
      baseline: latencyBaseline,
      candidate: latencyCandidate,
      baselineDisplay: latencyBaseline === null ? 'N/A' : formatByKind(latencyBaseline, 'latency'),
      candidateDisplay: latencyCandidate === null ? 'N/A' : formatByKind(latencyCandidate, 'latency'),
      deltaDisplay: latencyCmp.deltaDisplay,
      status: latencyCmp.status,
      notes: latencyBaseline === null ? 'N/A — data not available in traces' : undefined,
    },
    {
      key: 'loop_risk',
      label: STRAND_LABELS.loop_risk,
      baseline: loopBaseline,
      candidate: loopCandidate,
      baselineDisplay: formatByKind(loopBaseline, 'count'),
      candidateDisplay: formatByKind(loopCandidate, 'count'),
      deltaDisplay: loopCmp.deltaDisplay,
      status: loopCmp.status,
    },
    {
      key: 'toxicity',
      label: STRAND_LABELS.toxicity,
      baseline: toxicityBaseline,
      candidate: toxicityCandidate,
      baselineDisplay: toxicityBaseline === null ? 'N/A' : formatByKind(toxicityBaseline, 'count'),
      candidateDisplay: toxicityCandidate === null ? 'N/A' : formatByKind(toxicityCandidate, 'count'),
      deltaDisplay: toxicityCmp.deltaDisplay,
      status: toxicityCmp.status,
      notes: hasOutputText ? undefined : 'N/A — data not available in traces',
    },
    {
      key: 'tool_usage',
      label: STRAND_LABELS.tool_usage,
      baseline: toolBaseline,
      candidate: toolCandidate,
      baselineDisplay: toolBaseline === null ? 'N/A' : formatByKind(toolBaseline, 'tool_calls'),
      candidateDisplay: toolCandidate === null ? 'N/A' : formatByKind(toolCandidate, 'tool_calls'),
      deltaDisplay: toolCmp.deltaDisplay,
      status: toolCmp.status,
      notes: toolBaseline === null ? 'N/A — data not available in traces' : undefined,
    },
  ]

  const degraded = strands.filter((strand) => strand.status === 'DEGRADED')
  const regressions: RegressionExplainer[] = degraded
    .map((strand) => {
      const severityRank = getSeverityRank(strand.key)
      const findingLike = new Set(['pii_exposure', 'secrets', 'prompt_injection', 'loop_risk', 'toxicity']).has(strand.key)
      const example = findingLike
        ? pickFindingRegressionExample(strand.key, pairs, baselineFindingsByTrace, candidateFindingsByTrace)
        : pickMetricRegressionExample(strand.key, pairs)
      return {
        strandKey: strand.key,
        strandLabel: strand.label,
        detail: example.detail,
        baselineExample: example.baselineExample,
        candidateExample: example.candidateExample,
        severityRank,
      }
    })
    .sort((a, b) => {
      if (b.severityRank !== a.severityRank) return b.severityRank - a.severityRank
      const aWeight = statusWeight(strands.find((strand) => strand.key === a.strandKey)?.status ?? 'N/A')
      const bWeight = statusWeight(strands.find((strand) => strand.key === b.strandKey)?.status ?? 'N/A')
      return bWeight - aWeight
    })
    .slice(0, 20)

  const { rows: projections, strandKeys: projectionStrands } = buildProjectionRows(strands)
  const confidence: MigrationConfidence = {
    matchedPairs: pairs.length,
    unmatchedBaseline: unmatchedBaseline.length,
    unmatchedCandidate: unmatchedCandidate.length,
    note: createConfidenceNote(pairs.length),
  }

  const verdict = deriveVerdict(strands, pairs.length)

  return {
    verdict: verdict.verdict,
    verdictContext: verdict.context,
    strands,
    regressions,
    projections,
    projectionStrands,
    confidence,
    matchedPairs: pairs,
  }
}

export function runLocalScan(
  content: string,
  fileName: string,
  fileType: string,
  onProgress?: (phaseLabel: string) => void
): Promise<LocalScanBundle> {
  const parsed = detectAndParse(content, fileName, fileType)

  return new Promise((resolve, reject) => {
    const callbacks: ScanCallbacks = {
      onFormatDetected: () => undefined,
      onContentClassified: () => undefined,
      onProgress: (progress) => onProgress?.(progress.phaseLabel),
      onFinding: () => undefined,
      onComplete: (scanResult) => {
        resolve({
          fileName,
          fileType,
          content,
          parsed,
          scan: scanResult,
        })
      },
      onError: (error) => reject(new Error(error)),
    }

    void scanContent(content, fileName, fileType, callbacks)
  })
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function createComparisonHash(
  baselineContent: string,
  candidateContent: string,
  report: MigrationReport
): Promise<string> {
  const encoder = new TextEncoder()
  const digestInput = [
    baselineContent,
    candidateContent,
    JSON.stringify({
      verdict: report.verdict,
      verdictContext: report.verdictContext,
      strands: report.strands,
      regressions: report.regressions,
      projections: report.projections,
      confidence: report.confidence,
    }),
  ].join('\n::\n')

  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(digestInput))
  return toHex(hashBuffer)
}

