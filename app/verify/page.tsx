'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Search, FileCheck, Hash, ArrowRight, CheckCircle } from 'lucide-react';

export default function VerifyPage() {
  const [proofId, setProofId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proofId.trim()) {
      router.push(`/verify/${proofId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
            <Shield className="w-4 h-4" />
            Evidence Verification
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Verify TrustScope Evidence
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Enter a proof ID to cryptographically verify an evidence pack from TrustScope.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={proofId}
                  onChange={(e) => setProofId(e.target.value)}
                  placeholder="Enter proof ID (e.g., ts_proof_abc123...)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#C49B3A] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-4 rounded-xl transition-colors flex items-center gap-2"
              >
                Verify
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            How Verification Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#C49B3A]/20 flex items-center justify-center mx-auto mb-4">
                <Hash className="w-6 h-6 text-[#C49B3A]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Hash Chain</h3>
              <p className="text-sm text-slate-400">
                Every trace is linked in an immutable chain. Tampering breaks the chain.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Ed25519 Signatures</h3>
              <p className="text-sm text-slate-400">
                Evidence packs are cryptographically signed. Signatures verify authenticity.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Framework Mapping</h3>
              <p className="text-sm text-slate-400">
                Evidence maps to specific compliance controls for auditor consumption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What You'll See
          </h2>
          <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
            <div className="space-y-4">
              {[
                'Proof ID and creation timestamp',
                'Hash chain verification status',
                'Ed25519 signature verification',
                'Agent and organization metadata',
                'Compliance framework mappings (AIUC-1, SOC 2, etc.)',
                'Detection engine results summary',
                'Policy enforcement records',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need to generate evidence?
          </h2>
          <p className="text-slate-400 mb-8">
            Sign up for TrustScope to start generating cryptographic evidence for your AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scanner"
              className="inline-flex items-center justify-center gap-2 bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Try the Scanner
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/comply"
              className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Learn About Compliance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
