import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileCheck,
  Lock,
  Shield,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compliance Evidence',
  description:
    'Signed, tamper-evident governance evidence mapped to AIUC-1, SOC 2, EU AI Act, NIST AI RMF, and ISO 42001.',
}

const tiers = [
  {
    name: 'Monitor',
    evidence: [
      'JSON logs',
    ],
    retention: '30-day retention',
  },
  {
    name: 'Protect',
    evidence: [
      'JSON logs',
      '+ Ed25519 signatures',
      '+ SHA-256 hash chain',
    ],
    retention: '90-day retention',
  },
  {
    name: 'Enforce',
    evidence: [
      'JSON logs',
      '+ Ed25519 signatures',
      '+ SHA-256 hash chain',
      '+ Timestamp anchoring',
      '+ Post-quantum crypto',
    ],
    retention: '1-year retention',
    extras: ['Audit trail export (signed CSV/JSON)'],
  },
  {
    name: 'Govern',
    evidence: [
      'JSON logs',
      '+ Ed25519 signatures',
      '+ SHA-256 hash chain',
      '+ Timestamp anchoring',
      '+ Post-quantum crypto',
      '+ Zero-knowledge proofs',
      '+ Custom encryption keys',
      '+ BYOS (Bring Your Own Storage)',
    ],
    retention: '7-year retention',
    extras: ['Compliance exports (14 frameworks, auditor-formatted)'],
  },
]

const frameworks = [
  {
    name: 'AIUC-1',
    href: '/compliance/aiuc-1',
    coverage: 'Strong across all 6 domains',
    note: 'Primary framework',
  },
  {
    name: 'SOC 2',
    href: '/compliance/soc2',
    coverage: '6 of 10 AI-relevant controls ready',
    note: 'Strong on CC4.1, CC5.1, CC8.1',
  },
  {
    name: 'EU AI Act',
    href: '/compliance/eu-ai-act',
    coverage: 'Strong on Articles 9, 11, 12, 13, 14',
    note: 'High-risk enforcement Aug 2, 2026',
  },
  {
    name: 'NIST AI RMF',
    href: '/compliance/nist',
    coverage: '42 of 63 applicable subcategories ready',
    note: 'GOVERN / MAP / MEASURE / MANAGE',
  },
  {
    name: 'ISO 42001',
    href: '/compliance/iso42001',
    coverage: '22 of 38 controls ready',
    note: 'Runtime strong; organizational gaps separated',
  },
]

const deadlines = [
  {
    framework: 'EU AI Act',
    date: 'August 2, 2026',
    detail: 'High-risk AI system obligations take effect.',
  },
  {
    framework: 'SOC 2',
    date: 'Active now',
    detail: 'AI controls are already appearing in auditor sampling.',
  },
  {
    framework: 'Enterprise questionnaires',
    date: 'Every major deal',
    detail: 'Prospects ask how you govern AI before the contract closes.',
  },
]

const pipelineSteps = [
  'Agent Action',
  '27 Engines',
  'Policy Decision',
  'Signed Receipt',
  'Hash Chain',
  'Framework Mapping',
  'Export',
]

export default function EvidencePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      {/* ── Hero ── */}
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">PLATFORM</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Your auditor asked about AI. Here&apos;s your answer.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope generates signed, tamper-evident governance evidence mapped
          to the compliance frameworks your auditor actually uses. Not
          dashboards. Not screenshots. Verifiable proof that controls ran on
          every agent action.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#frameworks" className="btn-primary gap-2">
            View Framework Coverage <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/contact" className="btn-secondary">
            Book Compliance Walkthrough
          </Link>
        </div>
      </section>

      {/* ── The Compliance Paradox ── */}
      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">THE PARADOX</p>
          <h2 className="text-2xl font-bold">
            Prove the controls ran without exposing the data you&apos;re
            required to protect.
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Traditional logs reveal too much or too little. Full traces expose
            customer data your privacy policy forbids sharing. Summaries leave
            auditors questioning whether controls actually executed.
          </p>
          <p className="mt-3 text-[var(--text-secondary)]">
            TrustScope evidence shows engine results and policy paths without
            disclosing protected payloads. Each signed receipt proves which
            checks ran, which policy was applied, and what action was
            enforced&nbsp;&mdash; without leaking the data those controls exist to
            protect. At the Govern tier, zero-knowledge proofs let you
            demonstrate policy compliance to any third party without revealing
            underlying content.
          </p>
        </div>
      </section>

      {/* ── Evidence Chain ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">HOW IT WORKS</p>
        <h2 className="mb-4 text-3xl font-bold">
          From agent action to verifiable proof.
        </h2>
        <div className="card overflow-x-auto">
          <div className="flex min-w-[700px] items-center gap-2 text-sm">
            {pipelineSteps.map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text-secondary)]">
                  {step}
                </span>
                {idx < pipelineSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-[var(--text-subtle)]" />
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Every governed action generates a signed receipt. Receipts are linked
          into a SHA-256 hash chain, mapped to one or more compliance
          frameworks, and exported in auditor-ready formats. The chain is
          tamper-evident: altering any receipt invalidates every subsequent
          hash.
        </p>
      </section>

      {/* ── Evidence by Tier ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">EVIDENCE DEPTH</p>
        <h2 className="mb-6 text-3xl font-bold">
          Evidence scales with your compliance needs.
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article key={tier.name} className="card flex h-full flex-col">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {tier.name}
              </h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--text-secondary)]">
                {tier.evidence.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--status-success)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                  <Clock className="h-4 w-4 text-[var(--text-subtle)]" />
                  {tier.retention}
                </p>
                {tier.extras && (
                  <ul className="mt-2 space-y-1 text-xs text-[var(--text-muted)]">
                    {tier.extras.map((extra) => (
                      <li key={extra} className="flex items-start gap-2">
                        <FileCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand)]" />
                        <span>{extra}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Framework Coverage ── */}
      <section id="frameworks" className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">FRAMEWORK COVERAGE</p>
        <h2 className="mb-6 text-3xl font-bold">
          Mapped to the frameworks that matter.
        </h2>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Framework
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Coverage
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Notes
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {frameworks.map((fw) => (
                <tr
                  key={fw.name}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">
                    {fw.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {fw.coverage}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {fw.note}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={fw.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]"
                    >
                      Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Compliance Deadlines ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">TIMELINE</p>
        <div className="grid gap-3 md:grid-cols-3">
          {deadlines.map((d) => (
            <article key={d.framework} className="card">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[var(--status-warning)]" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {d.framework}
                </h3>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {d.date}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {d.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <Lock className="mx-auto h-5 w-5 text-[var(--brand)]" />
          <h2 className="mt-3 text-3xl font-bold">
            Replace $500/hr compliance consultants with evidence that generates
            itself.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Manual evidence assembly costs teams weeks before every audit cycle.
            Screenshots expire. Spreadsheets drift. Consultants charge by the
            hour to reconstruct what your systems already know. TrustScope
            generates framework-mapped evidence automatically, on every governed
            action, so the proof is ready before anyone asks for it.
          </p>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <div className="flex items-start gap-2">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[var(--status-warning)]" />
            <div>
              <p className="font-semibold text-[var(--status-warning)]">
                Evidence, not legal determination
              </p>
              <p className="mt-1 text-[var(--text-secondary)]">
                TrustScope provides governance evidence, not compliance
                determinations. Compliance assessment requires review by
                qualified legal, audit, or compliance professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-container mt-14 max-w-5xl text-center">
        <ShieldCheck className="mx-auto h-6 w-6 text-[var(--brand)]" />
        <h2 className="mt-3 text-3xl font-bold">
          Evidence ready when they ask.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
          Don&apos;t wait until the night before the audit.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary">
            Start Free
          </a>
          <Link href="/contact" className="btn-secondary">
            Book Compliance Walkthrough
          </Link>
        </div>
      </section>
    </div>
  )
}
