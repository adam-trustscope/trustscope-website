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
    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-emerald-400 font-medium truncate">
          Detected: {result.displayName}
        </p>
        <p className="text-slate-400 text-sm">
          {result.traceCount.toLocaleString()} trace{result.traceCount !== 1 ? 's' : ''} found
        </p>
      </div>
      {result.confidence >= 0.8 && (
        <span className="text-xs text-emerald-400/60 bg-emerald-400/10 px-2 py-1 rounded">
          {Math.round(result.confidence * 100)}% confidence
        </span>
      )}
    </div>
  );
}
