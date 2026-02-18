'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Clock, Shield, Hash, FileText, Calendar, Building2, ExternalLink } from 'lucide-react';

// Mock verification data - in production this would come from API
const MOCK_PROOFS: Record<string, {
  status: 'verified' | 'invalid' | 'pending';
  agentId: string;
  agentName: string;
  organization: string;
  createdAt: string;
  expiresAt: string;
  hashChain: string[];
  signature: string;
  evidenceType: string;
  framework: string;
}> = {
  'proof_abc123': {
    status: 'verified',
    agentId: 'agent_financial_bot',
    agentName: 'Financial Advisor Bot',
    organization: 'Acme Corp',
    createdAt: '2026-02-15T10:30:00Z',
    expiresAt: '2027-02-15T10:30:00Z',
    hashChain: [
      'sha256:a1b2c3d4e5f6...',
      'sha256:f6e5d4c3b2a1...',
      'sha256:1a2b3c4d5e6f...',
    ],
    signature: 'sig_ts_v1_...',
    evidenceType: 'Compliance Evidence Pack',
    framework: 'SOC 2 Type II',
  },
};

export default function VerifyPage() {
  const params = useParams();
  const proofId = params.proofId as string;

  const proof = MOCK_PROOFS[proofId];
  const isDemo = !proof;

  // Demo data for unknown proof IDs
  const displayData = proof || {
    status: 'pending' as const,
    agentId: 'unknown',
    agentName: 'Unknown Agent',
    organization: 'Unknown',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    hashChain: ['sha256:...'],
    signature: 'sig_ts_v1_...',
    evidenceType: 'Evidence Pack',
    framework: 'Unknown',
  };

  const statusConfig = {
    verified: {
      icon: CheckCircle,
      label: 'Verified',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
    },
    invalid: {
      icon: XCircle,
      label: 'Invalid',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30',
    },
    pending: {
      icon: Clock,
      label: 'Pending Verification',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
    },
  };

  const status = statusConfig[displayData.status];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#0f1117] pt-20">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[#C49B3A]" />
            <h1 className="text-2xl font-bold text-white">TrustScope Verification</h1>
          </div>
          <p className="text-slate-400">
            Independent verification of AI agent evidence
          </p>
        </div>

        {/* Demo Notice */}
        {isDemo && (
          <div className="mb-6 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30">
            <p className="text-yellow-400 text-sm text-center">
              This is a demo page. Proof ID "{proofId}" was not found.
            </p>
          </div>
        )}

        {/* Main Verification Card */}
        <div className={`rounded-2xl border ${status.borderColor} ${status.bgColor} p-8 mb-8`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <StatusIcon className={`w-12 h-12 ${status.color}`} />
            <span className={`text-3xl font-bold ${status.color}`}>{status.label}</span>
          </div>

          <div className="text-center text-slate-400 mb-6">
            {displayData.status === 'verified' && (
              <p>This evidence pack has been cryptographically verified.</p>
            )}
            {displayData.status === 'invalid' && (
              <p>This evidence pack failed verification checks.</p>
            )}
            {displayData.status === 'pending' && (
              <p>This evidence pack is awaiting verification.</p>
            )}
          </div>

          {/* Proof ID */}
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <span className="text-slate-500 text-sm">Proof ID</span>
            <div className="font-mono text-white mt-1">{proofId}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Organization</span>
            </div>
            <div className="text-white font-medium">{displayData.organization}</div>
          </div>

          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Evidence Type</span>
            </div>
            <div className="text-white font-medium">{displayData.evidenceType}</div>
          </div>

          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Framework</span>
            </div>
            <div className="text-white font-medium">{displayData.framework}</div>
          </div>

          <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Created</span>
            </div>
            <div className="text-white font-medium">
              {new Date(displayData.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Hash Chain */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 mb-8">
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Hash className="w-5 h-5" />
            <span className="font-medium">Hash Chain</span>
          </div>
          <div className="space-y-2">
            {displayData.hashChain.map((hash, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50"
              >
                <span className="text-slate-500 text-sm w-8">#{index + 1}</span>
                <code className="text-slate-300 text-sm font-mono flex-1 truncate">
                  {hash}
                </code>
                {displayData.status === 'verified' && (
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Agent Info */}
        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 mb-8">
          <h3 className="text-white font-medium mb-4">Agent Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Agent Name</span>
              <div className="text-white mt-1">{displayData.agentName}</div>
            </div>
            <div>
              <span className="text-slate-500">Agent ID</span>
              <div className="text-white font-mono mt-1">{displayData.agentId}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors text-center"
          >
            Back to Home
          </Link>
          <a
            href="https://app.trustscope.ai"
            className="px-6 py-3 rounded-xl bg-[#C49B3A] text-black font-medium hover:bg-[#d4ab4a] transition-colors text-center flex items-center justify-center gap-2"
          >
            View Full Evidence <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-500 text-sm mt-12">
          This verification page is provided by TrustScope for independent evidence validation.
          <br />
          <Link href="/security" className="text-[#C49B3A] hover:underline">
            Learn about our security practices
          </Link>
        </p>
      </div>
    </div>
  );
}
