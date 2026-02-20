'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, FileText, Hash, Shield, XCircle } from 'lucide-react'

const MOCK_PROOFS: Record<
  string,
  {
    status: 'verified' | 'invalid' | 'pending'
    agentId: string
    agentName: string
    organization: string
    createdAt: string
    hashChain: string[]
    evidenceType: string
    framework: string
  }
> = {
  proof_abc123: {
    status: 'verified',
    agentId: 'agent_financial_bot',
    agentName: 'Financial Advisor Bot',
    organization: 'Acme Corp',
    createdAt: '2026-02-15T10:30:00Z',
    hashChain: ['sha256:a1b2c3d4e5f6...', 'sha256:f6e5d4c3b2a1...', 'sha256:1a2b3c4d5e6f...'],
    evidenceType: 'Compliance Evidence Pack',
    framework: 'SOC 2 Type II',
  },
}

export default function VerifyProofPage() {
  const params = useParams()
  const proofId = params.proofId as string
  const proof = MOCK_PROOFS[proofId]

  if (!proof) {
    return (
      <div className="min-h-screen bg-[var(--bg)] py-14">
        <section className="section-container max-w-3xl">
          <div className="card text-center">
            <XCircle className="mx-auto h-10 w-10 text-[var(--status-danger)]" />
            <p className="eyebrow mt-3">Verification</p>
            <h1 className="mt-2 text-3xl font-bold">Proof not found</h1>
            <p className="mt-3 text-[var(--text-secondary)]">
              No verification record exists for <span className="font-mono">{proofId}</span>.
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Check the proof ID and retry, or contact support if you expected this record to exist.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/verify" className="btn-secondary">
                Back to Verify Lookup
              </Link>
              <Link href="/contact" className="btn-primary">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-4xl">
        <div className="card">
          <div className="text-center">
            <CheckCircle className="mx-auto h-10 w-10 text-[var(--status-success)]" />
            <p className="eyebrow mt-3">Verification</p>
            <h1 className="mt-2 text-3xl font-bold">Proof verified</h1>
            <p className="mt-3 text-[var(--text-secondary)]">
              This evidence record passed cryptographic verification checks.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Proof ID</p>
              <p className="mt-1 font-mono text-sm text-[var(--text-primary)]">{proofId}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Created</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">
                {new Date(proof.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Organization</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">{proof.organization}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Framework</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">{proof.framework}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Evidence Type</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">{proof.evidenceType}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
              <p className="text-xs text-[var(--text-subtle)]">Agent</p>
              <p className="mt-1 text-sm text-[var(--text-primary)]">
                {proof.agentName} <span className="text-[var(--text-muted)]">({proof.agentId})</span>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Hash className="h-4 w-4 text-[var(--interactive)]" />
              Hash Chain
            </div>
            <div className="space-y-2">
              {proof.hashChain.map((hash, index) => (
                <div key={hash} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
                  <span className="text-xs text-[var(--text-subtle)]">#{index + 1}</span>
                  <code className="flex-1 truncate text-xs text-[var(--text-secondary)]">{hash}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/verify" className="btn-secondary">
              Verify Another Proof
            </Link>
            <Link href="/security" className="btn-secondary">
              <Shield className="mr-2 h-4 w-4" />
              Security Details
            </Link>
            <Link href="/compliance" className="btn-primary">
              <FileText className="mr-2 h-4 w-4" />
              Compliance Mapping
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
