'use client';

import { Download, FileText, Shield } from 'lucide-react';

interface ExportButtonsProps {
  onDownloadRedacted: () => void;
  onDownloadReport: () => void;
  disabled?: boolean;
}

export default function ExportButtons({ onDownloadRedacted, onDownloadReport, disabled }: ExportButtonsProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
      <h3 className="text-base font-semibold">Export analysis artifacts</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Share redacted data safely or generate a report for engineering and compliance review.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <button
          onClick={onDownloadRedacted}
          disabled={disabled}
          className="rounded-xl border border-[color:rgba(37,99,235,.4)] bg-[color:rgba(37,99,235,.12)] p-4 text-left transition-all duration-150 hover:bg-[color:rgba(37,99,235,.16)] disabled:opacity-50"
        >
          <div className="mb-2 flex items-center gap-2 text-[var(--text-primary)]">
            <Shield className="h-4 w-4 text-[var(--interactive)]" />
            <span className="text-sm font-semibold">Redacted JSON</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">PII and secrets replaced with placeholders.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--interactive)]">
            <Download className="h-3.5 w-3.5" /> Download
          </span>
        </button>

        <button
          onClick={onDownloadReport}
          disabled={disabled}
          className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-left transition-all duration-150 hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] disabled:opacity-50"
        >
          <div className="mb-2 flex items-center gap-2 text-[var(--text-primary)]">
            <FileText className="h-4 w-4 text-[var(--text-secondary)]" />
            <span className="text-sm font-semibold">PDF Report</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Findings, severity, and recommended actions.</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)]">
            <Download className="h-3.5 w-3.5" /> Download
          </span>
        </button>
      </div>
    </div>
  );
}
