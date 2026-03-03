'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { ScanSummary, FindingSeverity } from '@/lib/scanner/types';

interface ResultsSummaryProps {
  summary: ScanSummary;
}

const SEVERITY_CONFIG: Record<
  FindingSeverity,
  { icon: typeof AlertTriangle; label: string; color: string; bg: string }
> = {
  critical: {
    icon: AlertTriangle,
    label: 'Critical',
    color: 'text-[var(--status-danger)]',
    bg: 'bg-[color:rgba(220,38,38,.12)] border-[color:rgba(220,38,38,.35)]',
  },
  high: {
    icon: AlertCircle,
    label: 'High',
    color: 'text-[var(--status-warning)]',
    bg: 'bg-[color:rgba(217,119,6,.12)] border-[color:rgba(217,119,6,.35)]',
  },
  medium: {
    icon: Info,
    label: 'Medium',
    color: 'text-[var(--text-secondary)]',
    bg: 'bg-[color:rgba(63,63,70,.2)] border-[color:rgba(63,63,70,.45)]',
  },
  low: {
    icon: CheckCircle,
    label: 'Low',
    color: 'text-[var(--status-success)]',
    bg: 'bg-[color:rgba(22,163,74,.12)] border-[color:rgba(22,163,74,.35)]',
  },
};

export default function ResultsSummary({ summary }: ResultsSummaryProps) {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedCritical, setAnimatedCritical] = useState(0);
  const [animatedHigh, setAnimatedHigh] = useState(0);
  const hasFindings = summary.totalFindings > 0;
  const total = Math.max(summary.totalFindings, 1);

  useEffect(() => {
    let raf = 0;
    const started = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedTotal(Math.round(summary.totalFindings * eased));
      setAnimatedCritical(Math.round(summary.bySeverity.critical * eased));
      setAnimatedHigh(Math.round(summary.bySeverity.high * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [summary]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center md:p-8">
        <p className="eyebrow mb-3">Analysis Results</p>
        <div className="text-7xl font-black leading-none tracking-tight md:text-9xl">{animatedTotal.toLocaleString()}</div>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          risk events across {summary.totalTraces.toLocaleString()} traces
        </p>
        <p className="mt-2 text-sm text-[var(--text-subtle)]">
          Completed in {(summary.scanDurationMs / 1000).toFixed(2)}s
        </p>

        {hasFindings && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {summary.bySeverity.critical > 0 && (
              <span className="rounded-full border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.12)] px-3 py-1 text-xs font-semibold text-[var(--status-danger)]">
                {animatedCritical} critical
              </span>
            )}
            {summary.bySeverity.high > 0 && (
              <span className="rounded-full border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.12)] px-3 py-1 text-xs font-semibold text-[var(--status-warning)]">
                {animatedHigh} high
              </span>
            )}
          </div>
        )}

        {hasFindings && (
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Critical and high events indicate potential data leaks, security exposure, or runaway cost.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold">Severity breakdown</h3>
          <span className="text-xs text-[var(--text-subtle)]">
            {hasFindings ? 'Action required if critical/high findings exist' : 'No issues found'}
          </span>
        </div>
        <div className="mb-4 flex h-2.5 overflow-hidden rounded-full bg-[var(--surface-hover)]">
          <div className="h-full bg-[var(--status-danger)]" style={{ width: `${(summary.bySeverity.critical / total) * 100}%` }} />
          <div className="h-full bg-[var(--status-warning)]" style={{ width: `${(summary.bySeverity.high / total) * 100}%` }} />
          <div className="h-full bg-[var(--border-hover)]" style={{ width: `${(summary.bySeverity.medium / total) * 100}%` }} />
          <div className="h-full bg-[var(--status-success)]" style={{ width: `${(summary.bySeverity.low / total) * 100}%` }} />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {(['critical', 'high', 'medium', 'low'] as FindingSeverity[]).map((severity) => {
            const cfg = SEVERITY_CONFIG[severity];
            const count = summary.bySeverity[severity];
            const Icon = cfg.icon;
            return (
              <div key={severity} className={`rounded-xl border p-3 transition-colors ${cfg.bg} ${count === 0 ? 'opacity-50' : ''}`}>
                <div className={`mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${cfg.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {cfg.label}
                </div>
                <p className={`text-3xl font-bold ${cfg.color}`}>
                  {severity === 'critical' ? animatedCritical : severity === 'high' ? animatedHigh : count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
