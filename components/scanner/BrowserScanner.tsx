'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, FileText, X } from 'lucide-react';
import {
  ScannerState,
  SampleType,
  FormatDetectionResult,
  ProgressUpdate,
  Finding,
  ContentClassification as ContentClassificationType,
} from '@/lib/scanner/types';
import { scanContent, scanSampleData, ScanCallbacks } from '@/lib/scanner/scanner-engine';
import { generatePdfReport, downloadReport, downloadRedactedFile, ReportData } from '@/lib/scanner/report-generator';

import DropZone from './DropZone';
import SampleDataButtons from './SampleDataButtons';
import FormatBadge from './FormatBadge';
import ScanProgress from './ScanProgress';
import ResultsSummary from './ResultsSummary';
import FindingsTable from './FindingsTable';
import ScannerInsights from './ScannerInsights';
import TrustProofBanner from './TrustProofBanner';
import ExportButtons from './ExportButtons';
import ServerEnginePreview from './ServerEnginePreview';
import GovernanceGraph from '@/components/GovernanceGraph';

const initialState: ScannerState = {
  status: 'idle',
  file: null,
  sampleType: null,
  formatResult: null,
  progress: null,
  findings: [],
  summary: null,
  classification: null,
  redactedContent: null,
  traces: [],
  error: null,
  offlineVerified: false,
};

const sampleNames: Record<SampleType, string> = {
  support_bot: 'support_bot_traces.json',
  code_assistant: 'code_assistant_traces.json',
  claims_processor: 'claims_processor_traces.json',
  research_pipeline: 'research_pipeline_traces.json',
  financial_advisor: 'financial_advisor_traces.json',
  healthcare: 'healthcare_ai_traces.json',
  financial: 'financial_bot_traces.json',
  support: 'customer_support_traces.json',
  multiagent: 'multi_agent_traces.json',
};

interface BrowserScannerProps {
  defaultSample?: SampleType;
  showDemoBadge?: boolean;
  autoRunDemo?: boolean;
}

export default function BrowserScanner({
  defaultSample = 'financial_advisor',
  showDemoBadge = false,
  autoRunDemo = false,
}: BrowserScannerProps) {
  const [state, setState] = useState<ScannerState>(initialState);
  const [stagedFile, setStagedFile] = useState<{ file: File; content: string } | null>(null);
  const [activeSample, setActiveSample] = useState<SampleType | null>(null);
  const fileNameRef = useRef<string>('');
  const initializedRef = useRef(false);

  const createCallbacks = useCallback(
    (): ScanCallbacks => ({
      onFormatDetected: (result: FormatDetectionResult) => {
        setState((prev) => ({ ...prev, formatResult: result }));
      },
      onContentClassified: (classification: ContentClassificationType) => {
        setState((prev) => ({ ...prev, classification }));
      },
      onProgress: (progress: ProgressUpdate) => {
        setState((prev) => ({ ...prev, progress }));
      },
      onFinding: (finding: Finding) => {
        setState((prev) => ({ ...prev, findings: [...prev.findings, finding] }));
      },
      onComplete: (result) => {
        setState((prev) => ({
          ...prev,
          status: 'complete',
          summary: result.summary,
          findings: result.findings,
          redactedContent: result.redactedContent,
          classification: result.classification,
          traces: result.traces,
          offlineVerified: !navigator.onLine,
        }));
      },
      onError: (error: string) => {
        setState((prev) => ({ ...prev, status: 'error', error }));
      },
    }),
    []
  );

  const startSampleScan = useCallback(
    async (sampleType: SampleType) => {
      setState({ ...initialState, status: 'scanning', sampleType });
      setStagedFile(null);
      setActiveSample(sampleType);
      fileNameRef.current = sampleNames[sampleType];
      const callbacks = createCallbacks();
      await scanSampleData(sampleType, callbacks);
    },
    [createCallbacks]
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    if (autoRunDemo) {
      void startSampleScan(defaultSample);
    }
  }, [autoRunDemo, defaultSample, startSampleScan]);

  const handleFileSelect = useCallback(async (file: File) => {
    const content = await file.text();
    setStagedFile({ file, content });
    setActiveSample(null);
    fileNameRef.current = file.name;
  }, []);

  const handleSampleSelect = useCallback(
    (sampleType: SampleType) => {
      setState(initialState);
      setStagedFile(null);
      setActiveSample(sampleType);
      fileNameRef.current = sampleNames[sampleType];
    },
    []
  );

  const handleStartSampleScan = useCallback(async () => {
    if (!activeSample) return;
    await startSampleScan(activeSample);
  }, [activeSample, startSampleScan]);

  const handleClearStaged = useCallback(() => {
    setStagedFile(null);
    fileNameRef.current = '';
  }, []);

  const handleStartScan = useCallback(async () => {
    if (!stagedFile) return;

    setState({
      ...initialState,
      status: 'scanning',
      file: stagedFile.file,
    });

    const callbacks = createCallbacks();
    await scanContent(stagedFile.content, stagedFile.file.name, stagedFile.file.type, callbacks);
    setStagedFile(null);
  }, [stagedFile, createCallbacks]);

  const handleReset = useCallback(() => {
    setState(initialState);
    setStagedFile(null);
    setActiveSample(null);
    fileNameRef.current = '';
    if (autoRunDemo) {
      void startSampleScan(defaultSample);
    }
  }, [autoRunDemo, defaultSample, startSampleScan]);

  const handleDownloadRedacted = useCallback(() => {
    if (!state.redactedContent) return;
    downloadRedactedFile(state.redactedContent, fileNameRef.current || 'scan_result.json');
  }, [state.redactedContent]);

  const handleDownloadReport = useCallback(async () => {
    if (!state.summary || !state.classification || !state.formatResult) return;

    const reportData: ReportData = {
      fileName: fileNameRef.current || 'scan_result.json',
      scanDate: new Date(),
      formatResult: state.formatResult,
      classification: state.classification,
      summary: state.summary,
      findings: state.findings,
    };

    const blob = await generatePdfReport(reportData);
    const reportFileName = (fileNameRef.current || 'scan_result').replace(/\.[^/.]+$/, '') + '_scan_report.pdf';
    downloadReport(blob, reportFileName);
  }, [state.summary, state.classification, state.formatResult, state.findings]);

  const isScanning = state.status === 'scanning';
  const isComplete = state.status === 'complete';
  const hasFindings = state.findings.length > 0;
  const isIdle = state.status === 'idle' && !stagedFile;

  return (
    <div id="trace-analyzer-workspace" className="space-y-6 scroll-mt-28">
      <section className="space-y-4">
        <TrustProofBanner offlineVerified={state.offlineVerified} />

        <div className="space-y-4">
          <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow">1. Upload your traces</p>
              <span className="text-xs text-[var(--text-subtle)]">Use production files from your stack</span>
            </div>

            <DropZone onFileSelect={handleFileSelect} disabled={isScanning} />

            {stagedFile && state.status === 'idle' && (
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                      <FileText className="h-4 w-4 text-[var(--text-secondary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{fileNameRef.current}</p>
                      <p className="text-xs text-[var(--text-muted)]">{(stagedFile.file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button onClick={handleClearStaged} className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <button onClick={handleStartScan} className="btn-primary mt-4 w-full justify-center gap-2">
                  <Play className="h-4 w-4" /> Analyze Trace
                </button>
              </div>
            )}
          </div>

          <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="eyebrow">2. Run a demo dataset</p>
              <span className="text-xs text-[var(--text-subtle)]">Use local demo data</span>
            </div>

            <SampleDataButtons onSelect={handleSampleSelect} active={activeSample} disabled={isScanning} />

            {activeSample && state.status === 'idle' && (
              <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <p className="text-xs text-[var(--text-muted)]">Selected demo</p>
                <p className="mt-1 font-mono text-sm text-[var(--text-primary)]">{sampleNames[activeSample]}</p>
                <button onClick={handleStartSampleScan} className="btn-primary mt-4 w-full justify-center gap-2" disabled={isScanning}>
                  <Play className="h-4 w-4" /> Generate Demo Report
                </button>
              </div>
            )}

            {showDemoBadge && state.sampleType && (
              <div className="mt-3 rounded-lg border border-[color:rgba(37,99,235,.4)] bg-[color:rgba(37,99,235,.1)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                Demo loaded: <span className="font-mono text-[var(--text-primary)]">{sampleNames[state.sampleType]}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {state.status === 'error' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-[color:rgba(220,38,38,.4)] bg-[color:rgba(220,38,38,.1)] p-4 text-sm text-[var(--status-danger)]">
            {state.error || 'Analysis failed'}
          </div>
          <button onClick={handleReset} className="btn-secondary w-full justify-center">
            Retry Analysis
          </button>
        </div>
      )}

      <section className="space-y-5">
        {isScanning && (
          <div className="space-y-3">
            {state.formatResult && <FormatBadge result={state.formatResult} />}
            {state.progress && <ScanProgress progress={state.progress} />}
          </div>
        )}

        {isIdle && (
          <div className="card">
            <p className="eyebrow mb-2">Ready</p>
            <h3 className="text-2xl font-bold">Run an analysis in under 5 seconds.</h3>
            <p className="mt-2 text-[var(--text-secondary)]">
              Pick a demo and click Generate Demo Report, or upload production traces and run Analyze Trace.
            </p>
          </div>
        )}

        {isComplete && (
          <div className="space-y-6">
            <nav className="sticky top-16 z-20 rounded-xl border border-[var(--border)] bg-[color:rgba(17,17,19,.92)] p-2 backdrop-blur">
              <div className="flex flex-wrap items-center gap-1">
                <a href="#scanner-summary" className="rounded-md px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">Summary</a>
                <a href="#scanner-timeline" className="rounded-md px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">Timeline</a>
                <a href="#scanner-trace" className="rounded-md px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">Trace</a>
                {hasFindings && (
                  <a href="#scanner-findings" className="rounded-md px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">Findings</a>
                )}
                {hasFindings && (
                  <a href="#scanner-export" className="rounded-md px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">Export</a>
                )}
              </div>
            </nav>

            {state.formatResult && <FormatBadge result={state.formatResult} />}
            {state.summary && (
              <div id="scanner-summary" className="scroll-mt-28">
                <ResultsSummary summary={state.summary} />
              </div>
            )}
            {state.summary && (
              <GovernanceGraph
                title="Your governance path for this run."
                subtitle="Derived from the traces you just analyzed locally."
                metrics={{
                  prompt: `${state.summary.totalTraces.toLocaleString()} traces`,
                  model: state.classification?.modelNames?.length
                    ? `${state.classification.modelNames.length} model${state.classification.modelNames.length === 1 ? '' : 's'}`
                    : 'model data parsed',
                  tools: state.classification?.hasToolCalls ? 'tool calls present' : 'tool data unavailable',
                  context: state.classification?.hasMetadata ? 'metadata present' : 'limited metadata',
                  session: 'browser-local run',
                  detections: `${state.summary.totalFindings.toLocaleString()} findings`,
                  policies: 'simulate · alert · block',
                  decision:
                    state.summary.bySeverity.critical + state.summary.bySeverity.high > 0
                      ? 'high-risk triage required'
                      : 'no high-risk findings',
                  evidence: 'redacted + PDF export',
                  framework: 'mapping-ready exports',
                }}
              />
            )}
            {state.summary && state.traces.length > 0 && (
              <ScannerInsights summary={state.summary} findings={state.findings} traces={state.traces} />
            )}
            {hasFindings && (
              <div id="scanner-findings" className="scroll-mt-28">
                <FindingsTable findings={state.findings} />
              </div>
            )}

            {hasFindings && (
              <div id="scanner-export" className="scroll-mt-28 grid gap-4 xl:grid-cols-2">
                <ExportButtons
                  onDownloadRedacted={handleDownloadRedacted}
                  onDownloadReport={handleDownloadReport}
                />
                <ServerEnginePreview />
              </div>
            )}

            {state.classification && (
              <details className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)]">Trace metadata details</summary>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Models: {state.classification.modelNames.length > 0 ? state.classification.modelNames.join(', ') : 'unknown'}
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Prompts: {state.classification.hasPrompts ? 'yes' : 'no'} · Responses: {state.classification.hasResponses ? 'yes' : 'no'} · Tool calls: {state.classification.hasToolCalls ? 'yes' : 'no'}
                </p>
              </details>
            )}

            <button onClick={handleReset} className="btn-secondary w-full justify-center">
              Analyze Another Trace
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
