'use client';

import { useState, useCallback, useRef } from 'react';
import { Play, Shield, FileText, X, Eye, AlertTriangle, Lock } from 'lucide-react';
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
import ContentClassification from './ContentClassification';
import TrustProofBanner from './TrustProofBanner';
import ExportButtons from './ExportButtons';
import ServerEnginePreview from './ServerEnginePreview';

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
  error: null,
  offlineVerified: false,
};

export default function BrowserScanner() {
  const [state, setState] = useState<ScannerState>(initialState);
  const [stagedFile, setStagedFile] = useState<{ file: File; content: string } | null>(null);
  const [stagedSample, setStagedSample] = useState<SampleType | null>(null);
  const fileNameRef = useRef<string>('');

  const createCallbacks = useCallback((): ScanCallbacks => ({
    onFormatDetected: (result: FormatDetectionResult) => {
      setState(prev => ({ ...prev, formatResult: result }));
    },
    onContentClassified: (classification: ContentClassificationType) => {
      setState(prev => ({ ...prev, classification }));
    },
    onProgress: (progress: ProgressUpdate) => {
      setState(prev => ({ ...prev, progress }));
    },
    onFinding: (finding: Finding) => {
      setState(prev => ({ ...prev, findings: [...prev.findings, finding] }));
    },
    onComplete: (result) => {
      setState(prev => ({
        ...prev,
        status: 'complete',
        summary: result.summary,
        findings: result.findings,
        redactedContent: result.redactedContent,
        classification: result.classification,
        offlineVerified: !navigator.onLine,
      }));
    },
    onError: (error: string) => {
      setState(prev => ({ ...prev, status: 'error', error }));
    },
  }), []);

  // Stage file instead of immediately scanning
  const handleFileSelect = useCallback(async (file: File) => {
    const content = await file.text();
    setStagedFile({ file, content });
    setStagedSample(null);
    fileNameRef.current = file.name;
  }, []);

  // Stage sample data instead of immediately scanning
  const handleSampleSelect = useCallback((sampleType: SampleType) => {
    const sampleNames: Record<SampleType, string> = {
      healthcare: 'healthcare_ai_traces.json',
      financial: 'financial_bot_traces.json',
      support: 'customer_service_traces.json',
      multiagent: 'multi_agent_traces.json',
    };
    setStagedSample(sampleType);
    setStagedFile(null);
    fileNameRef.current = sampleNames[sampleType];
  }, []);

  // Clear staged file/sample
  const handleClearStaged = useCallback(() => {
    setStagedFile(null);
    setStagedSample(null);
    fileNameRef.current = '';
  }, []);

  // Actually start the scan
  const handleStartScan = useCallback(async () => {
    if (stagedFile) {
      setState({
        ...initialState,
        status: 'scanning',
        file: stagedFile.file,
      });
      const callbacks = createCallbacks();
      await scanContent(stagedFile.content, stagedFile.file.name, stagedFile.file.type, callbacks);
      setStagedFile(null);
    } else if (stagedSample) {
      setState({
        ...initialState,
        status: 'scanning',
        sampleType: stagedSample,
      });
      const callbacks = createCallbacks();
      await scanSampleData(stagedSample, callbacks);
      setStagedSample(null);
    }
  }, [stagedFile, stagedSample, createCallbacks]);

  const handleReset = useCallback(() => {
    setState(initialState);
    fileNameRef.current = '';
  }, []);

  const handleDownloadRedacted = useCallback(() => {
    if (!state.redactedContent) return;
    downloadRedactedFile(state.redactedContent, fileNameRef.current);
  }, [state.redactedContent]);

  const handleDownloadReport = useCallback(() => {
    if (!state.summary || !state.classification || !state.formatResult) return;

    const reportData: ReportData = {
      fileName: fileNameRef.current,
      scanDate: new Date(),
      formatResult: state.formatResult,
      classification: state.classification,
      summary: state.summary,
      findings: state.findings,
    };

    const blob = generatePdfReport(reportData);
    const reportFileName = fileNameRef.current.replace(/\.[^/.]+$/, '') + '_scan_report.pdf';
    downloadReport(blob, reportFileName);
  }, [state.summary, state.classification, state.formatResult, state.findings]);

  const isScanning = state.status === 'scanning';
  const isComplete = state.status === 'complete';
  const hasFindings = state.findings.length > 0;
  const hasStaged = stagedFile !== null || stagedSample !== null;

  return (
    <div className="space-y-6">
      {/* Trust banner - always visible */}
      <TrustProofBanner offlineVerified={state.offlineVerified} />

      {/* Main scanner area - show when idle and nothing staged */}
      {state.status === 'idle' && !hasStaged && (
        <>
          <DropZone onFileSelect={handleFileSelect} disabled={isScanning} />
          <SampleDataButtons onSelect={handleSampleSelect} disabled={isScanning} />
        </>
      )}

      {/* Staged state - file selected but not yet scanned */}
      {state.status === 'idle' && hasStaged && (
        <div className="space-y-6">
          {/* Staged file display */}
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{fileNameRef.current}</p>
                  <p className="text-slate-400 text-sm">
                    {stagedFile ? `${(stagedFile.file.size / 1024).toFixed(1)} KB` : 'Sample data'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearStaged}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Safety messaging */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-medium text-sm">100% Local Processing</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Your data never leaves your browser. All scanning happens locally using WebAssembly.
                  </p>
                </div>
              </div>
            </div>

            {/* What will be detected */}
            <div className="space-y-3">
              <p className="text-slate-300 text-sm font-medium">This scan will detect:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Eye, label: 'PII & Sensitive Data', desc: 'Names, emails, SSNs, etc.' },
                  { icon: AlertTriangle, label: 'Prompt Injection', desc: 'Malicious prompts' },
                  { icon: Lock, label: 'Credentials', desc: 'API keys, tokens, passwords' },
                  { icon: Shield, label: 'Security Issues', desc: 'Jailbreaks, data leaks' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2 bg-slate-900/50 rounded-lg p-3">
                    <item.icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Scan button */}
          <button
            onClick={handleStartScan}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-5 h-5" />
            Start Scan
          </button>
        </div>
      )}

      {/* Error state */}
      {state.status === 'error' && (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
            <p className="text-red-400 font-medium mb-2">Scan Error</p>
            <p className="text-slate-400 text-sm">{state.error}</p>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Scanning state */}
      {isScanning && (
        <div className="space-y-4">
          {state.formatResult && <FormatBadge result={state.formatResult} />}
          {state.progress && <ScanProgress progress={state.progress} />}
        </div>
      )}

      {/* Complete state */}
      {isComplete && (
        <div className="space-y-6">
          {state.formatResult && <FormatBadge result={state.formatResult} />}
          {state.summary && <ResultsSummary summary={state.summary} />}
          {state.classification && <ContentClassification classification={state.classification} />}
          {hasFindings && <FindingsTable findings={state.findings} />}
          {hasFindings && (
            <ExportButtons
              onDownloadRedacted={handleDownloadRedacted}
              onDownloadReport={handleDownloadReport}
            />
          )}
          <ServerEnginePreview />
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
          >
            Scan Another File
          </button>
        </div>
      )}
    </div>
  );
}
