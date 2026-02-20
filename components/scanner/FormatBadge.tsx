'use client';

import { CheckCircle, FileJson, FileSpreadsheet, Globe, HelpCircle } from 'lucide-react';
import { FormatDetectionResult, DetectedFormat } from '@/lib/scanner/types';

interface FormatBadgeProps {
  result: FormatDetectionResult;
}

const FORMAT_ICONS: Record<DetectedFormat, typeof FileJson> = {
  langsmith: FileJson,
  langfuse: FileJson,
  otel: Globe,
  har: Globe,
  jsonl: FileJson,
  csv: FileSpreadsheet,
  tsv: FileSpreadsheet,
  'json-array': FileJson,
  unknown: HelpCircle,
};

export default function FormatBadge({ result }: FormatBadgeProps) {
  const Icon = FORMAT_ICONS[result.format];

  return (
    <div className="rounded-xl border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.1)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.14)]">
          <CheckCircle className="h-4 w-4 text-[var(--status-success)]" />
        </div>
        <Icon className="h-5 w-5 flex-shrink-0 text-[var(--status-success)]" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[var(--status-success)]">
            Format detected: {result.displayName}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {result.traceCount.toLocaleString()} trace{result.traceCount !== 1 ? 's' : ''} available for analysis
          </p>
        </div>
        {result.confidence >= 0.8 && (
          <span className="rounded-md border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.14)] px-2 py-1 text-xs text-[color:rgba(22,163,74,.9)]">
            {Math.round(result.confidence * 100)}% confidence
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-[var(--text-subtle)]">
        Confidence is based on trace schema and field consistency checks.
      </p>
    </div>
  );
}
