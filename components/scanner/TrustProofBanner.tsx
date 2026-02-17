'use client';

import { Shield, Wifi, WifiOff, CheckCircle } from 'lucide-react';

interface TrustProofBannerProps {
  offlineVerified?: boolean;
}

export default function TrustProofBanner({ offlineVerified }: TrustProofBannerProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-medium text-emerald-400">100% Local Processing</h4>
            <p className="text-sm text-slate-400">
              Your data never leaves your browser. Zero network requests.
            </p>
          </div>
        </div>

        {offlineVerified ? (
          <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">Verified Offline</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <WifiOff className="w-4 h-4" />
            <span>Disconnect WiFi and try again to verify</span>
          </div>
        )}
      </div>
    </div>
  );
}
