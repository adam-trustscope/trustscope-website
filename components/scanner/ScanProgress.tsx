'use client';

import { Loader2, FileSearch, Brain, Shield, Key, DollarSign, RefreshCw, MessageSquare, FileCheck } from 'lucide-react';
import { ProgressUpdate, ScanPhase } from '@/lib/scanner/types';

interface ScanProgressProps {
  progress: ProgressUpdate;
}

const PHASE_CONFIG: Record<ScanPhase, { icon: typeof FileSearch; color: string }> = {
  detecting: { icon: FileSearch, color: 'text-blue-400' },
  extracting: { icon: FileSearch, color: 'text-blue-400' },
  classifying: { icon: Brain, color: 'text-purple-400' },
  scanning_pii: { icon: Shield, color: 'text-blue-400' },
  scanning_secrets: { icon: Key, color: 'text-red-400' },
  scanning_cost: { icon: DollarSign, color: 'text-yellow-400' },
  scanning_loops: { icon: RefreshCw, color: 'text-purple-400' },
  scanning_toxicity: { icon: MessageSquare, color: 'text-orange-400' },
  redacting: { icon: FileCheck, color: 'text-emerald-400' },
  complete: { icon: FileCheck, color: 'text-emerald-400' },
};

export default function ScanProgress({ progress }: ScanProgressProps) {
  const config = PHASE_CONFIG[progress.phase];
  const Icon = config.icon;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      {/* Phase indicator */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10`}>
          {progress.phase === 'complete' ? (
            <Icon className={`w-6 h-6 ${config.color}`} />
          ) : (
            <Loader2 className={`w-6 h-6 ${config.color} animate-spin`} />
          )}
        </div>
        <div className="flex-1">
          <p className={`font-semibold ${config.color}`}>{progress.phaseLabel}</p>
          <p className="text-sm text-slate-500">
            {progress.phase === 'complete'
              ? 'Scan finished'
              : `Processing trace ${progress.processed.toLocaleString()} of ${progress.total.toLocaleString()}`
            }
          </p>
        </div>
        {progress.findingsCount > 0 && (
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-400">{progress.findingsCount}</p>
            <p className="text-xs text-slate-500">findings</p>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
            progress.phase === 'complete'
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
        <span>{progress.percentage}% complete</span>
        <span>100% local processing</span>
      </div>
    </div>
  );
}
