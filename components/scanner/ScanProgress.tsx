'use client';

import { Loader2, FileSearch, Brain, Shield, Key, DollarSign, RefreshCw, MessageSquare, FileCheck } from 'lucide-react';
import { ProgressUpdate, ScanPhase } from '@/lib/scanner/types';

interface ScanProgressProps {
  progress: ProgressUpdate;
}

const PHASE_CONFIG: Record<ScanPhase, { icon: typeof FileSearch; color: string }> = {
  detecting: { icon: FileSearch, color: 'text-[var(--interactive)]' },
  extracting: { icon: FileSearch, color: 'text-[var(--interactive)]' },
  classifying: { icon: Brain, color: 'text-[var(--text-secondary)]' },
  scanning_statistical: { icon: RefreshCw, color: 'text-[var(--text-secondary)]' },
  scanning_pii: { icon: Shield, color: 'text-[var(--interactive)]' },
  scanning_secrets: { icon: Key, color: 'text-[var(--status-danger)]' },
  scanning_injection: { icon: Shield, color: 'text-[var(--status-danger)]' },
  scanning_jailbreak: { icon: Shield, color: 'text-[var(--status-warning)]' },
  scanning_commands: { icon: Shield, color: 'text-[var(--status-warning)]' },
  scanning_toxicity: { icon: MessageSquare, color: 'text-[var(--status-warning)]' },
  scanning_cost: { icon: DollarSign, color: 'text-[var(--status-warning)]' },
  scanning_loops: { icon: RefreshCw, color: 'text-[var(--interactive)]' },
  redacting: { icon: FileCheck, color: 'text-[var(--status-success)]' },
  complete: { icon: FileCheck, color: 'text-[var(--status-success)]' },
};

export default function ScanProgress({ progress }: ScanProgressProps) {
  const config = PHASE_CONFIG[progress.phase];
  const Icon = config.icon;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-hover)]">
          {progress.phase === 'complete' ? (
            <Icon className={`h-6 w-6 ${config.color}`} />
          ) : (
            <Loader2 className={`h-6 w-6 ${config.color} animate-spin`} />
          )}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold uppercase tracking-[0.08em] ${config.color}`}>{progress.phaseLabel}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {progress.phase === 'complete'
              ? 'Analysis finished'
              : `Processing trace ${progress.processed.toLocaleString()} of ${progress.total.toLocaleString()}`
            }
          </p>
        </div>
        {progress.findingsCount > 0 && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-right">
            <p className="text-xl font-bold text-[var(--status-warning)]">{progress.findingsCount}</p>
            <p className="text-[11px] text-[var(--text-muted)]">events</p>
          </div>
        )}
      </div>

      <div className="relative h-2 overflow-hidden rounded-full bg-[var(--surface-hover)]">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
            progress.phase === 'complete'
              ? 'bg-[var(--status-success)]'
              : 'bg-[var(--interactive)]'
          }`}
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-[var(--text-muted)]">
        <span>{progress.percentage}% complete</span>
        <span>100% local processing</span>
      </div>
    </div>
  );
}
