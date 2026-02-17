'use client';

import BrowserScanner from '@/components/scanner/BrowserScanner';

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      <section className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Trace Scanner
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Scan your AI traces for PII, secrets, cost anomalies, loops, and more.
              100% client-side. Your data never leaves your browser.
            </p>
          </div>

          {/* Scanner */}
          <BrowserScanner />
        </div>
      </section>
    </div>
  );
}
