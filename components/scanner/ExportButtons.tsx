'use client';

import { Download, FileText, Shield, ArrowRight } from 'lucide-react';

interface ExportButtonsProps {
  onDownloadRedacted: () => void;
  onDownloadReport: () => void;
  disabled?: boolean;
}

export default function ExportButtons({ onDownloadRedacted, onDownloadReport, disabled }: ExportButtonsProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2">Export Options</h3>
      <p className="text-sm text-slate-400 mb-6">
        Download your results. Redacted files have all sensitive data replaced with safe placeholders.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Redacted File */}
        <button
          onClick={onDownloadRedacted}
          disabled={disabled}
          className={`
            flex flex-col items-start gap-3 p-4 rounded-xl text-left
            bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-white">Download Redacted File</p>
              <p className="text-xs text-blue-300">Safe to share</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Get your original file with all PII and secrets replaced with placeholders like [SSN REDACTED], [API-KEY REDACTED].
          </p>
          <div className="flex items-center gap-1 text-blue-400 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download .json
          </div>
        </button>

        {/* PDF Report */}
        <button
          onClick={onDownloadReport}
          disabled={disabled}
          className={`
            flex flex-col items-start gap-3 p-4 rounded-xl text-left
            bg-white/5 border border-white/10 hover:bg-white/10 transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="font-semibold text-white">Download PDF Report</p>
              <p className="text-xs text-slate-500">For documentation</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Get a formatted report showing all findings, severity levels, and recommendations for remediation.
          </p>
          <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download .pdf
          </div>
        </button>
      </div>

      {/* CTA */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Want automatic redaction and monitoring?</p>
          </div>
          <a
            href="https://app.trustscope.ai"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Try TrustScope Cloud
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
