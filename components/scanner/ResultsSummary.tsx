'use client';

import { AlertTriangle, AlertCircle, Info, CheckCircle, Shield, Key, DollarSign, RefreshCw, MessageSquare } from 'lucide-react';
import { ScanSummary, FindingSeverity, FindingEngine } from '@/lib/scanner/types';

interface ResultsSummaryProps {
  summary: ScanSummary;
}

const SEVERITY_CONFIG: Record<FindingSeverity, { icon: typeof AlertTriangle; label: string; color: string; bgColor: string; description: string }> = {
  critical: {
    icon: AlertTriangle,
    label: 'Critical',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    description: 'Requires immediate attention'
  },
  high: {
    icon: AlertCircle,
    label: 'High',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
    description: 'Should be addressed soon'
  },
  medium: {
    icon: Info,
    label: 'Medium',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    description: 'Review when possible'
  },
  low: {
    icon: CheckCircle,
    label: 'Low',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20',
    description: 'Informational'
  },
};

const ENGINE_CONFIG: Record<FindingEngine, { icon: typeof Shield; label: string; description: string }> = {
  pii: { icon: Shield, label: 'PII', description: 'Personal data like SSNs, emails, phones' },
  secrets: { icon: Key, label: 'Secrets', description: 'API keys, tokens, credentials' },
  cost: { icon: DollarSign, label: 'Cost', description: 'Unusual spending patterns' },
  loop: { icon: RefreshCw, label: 'Loops', description: 'Repetitive or stuck behavior' },
  toxicity: { icon: MessageSquare, label: 'Content', description: 'Problematic language' },
};

export default function ResultsSummary({ summary }: ResultsSummaryProps) {
  const hasFindings = summary.totalFindings > 0;
  const hasCriticalOrHigh = summary.bySeverity.critical > 0 || summary.bySeverity.high > 0;

  return (
    <div className="space-y-6">
      {/* Quick verdict */}
      <div className={`rounded-xl p-6 border ${
        !hasFindings
          ? 'bg-emerald-500/10 border-emerald-500/20'
          : hasCriticalOrHigh
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-yellow-500/10 border-yellow-500/20'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            !hasFindings ? 'bg-emerald-500/20' : hasCriticalOrHigh ? 'bg-red-500/20' : 'bg-yellow-500/20'
          }`}>
            {!hasFindings ? (
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            ) : hasCriticalOrHigh ? (
              <AlertTriangle className="w-6 h-6 text-red-400" />
            ) : (
              <Info className="w-6 h-6 text-yellow-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-semibold mb-1 ${
              !hasFindings ? 'text-emerald-400' : hasCriticalOrHigh ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {!hasFindings
                ? 'No Issues Found'
                : hasCriticalOrHigh
                  ? 'Action Required'
                  : 'Review Recommended'
              }
            </h3>
            <p className="text-slate-400">
              {!hasFindings
                ? 'Your traces appear clean. No PII, secrets, or anomalies were detected.'
                : `Found ${summary.totalFindings} issue${summary.totalFindings !== 1 ? 's' : ''} across ${summary.totalTraces.toLocaleString()} traces. ${
                    hasCriticalOrHigh
                      ? 'Critical findings should be addressed before sharing this data.'
                      : 'Review the findings below for details.'
                  }`
              }
            </p>
          </div>
        </div>
      </div>

      {hasFindings && (
        <>
          {/* Severity breakdown */}
          <div>
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              By Severity
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {(['critical', 'high', 'medium', 'low'] as FindingSeverity[]).map((severity) => {
                const config = SEVERITY_CONFIG[severity];
                const count = summary.bySeverity[severity];
                const Icon = config.icon;

                return (
                  <div
                    key={severity}
                    className={`border rounded-xl p-4 ${config.bgColor} ${count === 0 ? 'opacity-40' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                    </div>
                    <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engine breakdown */}
          <div>
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              By Detection Type
            </h4>
            <div className="grid grid-cols-5 gap-3">
              {(Object.keys(ENGINE_CONFIG) as FindingEngine[]).map((engine) => {
                const config = ENGINE_CONFIG[engine];
                const count = summary.byEngine[engine];
                const Icon = config.icon;

                return (
                  <div
                    key={engine}
                    className={`bg-white/5 border border-white/10 rounded-xl p-3 text-center ${count === 0 ? 'opacity-40' : ''}`}
                  >
                    <Icon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{count}</p>
                    <p className="text-xs text-slate-500">{config.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Scan stats */}
      <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-white/10">
        <span>{summary.totalTraces.toLocaleString()} traces scanned</span>
        <span>Completed in {(summary.scanDurationMs / 1000).toFixed(2)}s</span>
      </div>
    </div>
  );
}
