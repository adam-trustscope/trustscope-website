'use client';

import { CheckCircle, Shield, WifiOff } from 'lucide-react';

interface TrustProofBannerProps {
  offlineVerified?: boolean;
}

export default function TrustProofBanner({ offlineVerified }: TrustProofBannerProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--border-hover)]">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.14)]">
            <Shield className="h-4.5 w-4.5 text-[var(--status-success)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">100% Local Processing</p>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">Your trace data never leaves your browser session.</p>
          </div>
        </div>

        {offlineVerified ? (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:rgba(22,163,74,.35)] bg-[color:rgba(22,163,74,.12)] px-3 py-1 text-xs text-[var(--status-success)]">
            <CheckCircle className="h-3.5 w-3.5" /> Verified offline
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-subtle)]">
            <WifiOff className="h-3.5 w-3.5" /> Disconnect WiFi and rerun to verify
          </div>
        )}
      </div>
    </div>
  );
}
