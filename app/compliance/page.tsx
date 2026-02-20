import Link from 'next/link'
import { ArrowRight, FileCheck, Scale, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const complianceSources = [
  {
    label: 'EUR-Lex AI Act timeline',
    href: 'https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence.html',
  },
  {
    label: 'TrustScope AIUC-1 mapping methodology',
    href: '/compliance/aiuc-1',
  },
]

const frameworks = [
  {
    name: 'AIUC-1',
    href: '/compliance/aiuc-1',
    coverage: '45 addressed / 50 requirements (90%)',
    note: 'Primary standard with 6 domains.',
  },
  {
    name: 'SOC 2',
    href: '/compliance/soc2',
    coverage: '6 ready / 10 AI-relevant controls',
    note: 'Trust services criteria mapping.',
  },
  {
    name: 'EU AI Act',
    href: '/compliance/eu-ai-act',
    coverage: 'Strong on Articles 9, 11, 12, 13, 14',
    note: 'High-risk obligations converge by August 2, 2026.',
  },
  {
    name: 'NIST AI RMF',
    href: '/compliance/nist',
    coverage: '42 ready / 63 applicable',
    note: 'Safe-harbor relevant posture for TRAIGA contexts.',
  },
  {
    name: 'ISO 42001',
    href: '/compliance/iso42001',
    coverage: '22 ready / 38 controls',
    note: 'AIMS controls with organizational gaps clearly separated.',
  },
]

const aiucDomains = [
  { name: 'A. Data & Privacy', quality: 'Strong', note: 'PII, secrets, redaction controls', color: 'text-[var(--status-success)]' },
  { name: 'B. Security', quality: 'Strong', note: 'Injection, jailbreak, command firewall', color: 'text-[var(--status-success)]' },
  { name: 'C. Safety', quality: 'Strong', note: 'Toxicity, hallucination, fairness strand (C003)', color: 'text-[var(--status-success)]' },
  { name: 'D. Reliability', quality: 'Good', note: 'Loop killer, velocity, error rate', color: 'text-[var(--status-success)]' },
  { name: 'E. Accountability', quality: 'Strong', note: 'Hash-chained receipts, audit exports', color: 'text-[var(--status-success)]' },
  { name: 'F. Cyber Misuse', quality: 'Strong', note: 'CBRN prevention via security engines', color: 'text-[var(--status-success)]' },
]

const gapSignals = [
  'Third-party testing controls (AIUC-1 B001, C010-C012, D002, D004) require an external assessor.',
  'Written policy documents are customer-authored; TrustScope enforces and evidences execution.',
  'Training-data governance remains outside TrustScope runtime scope and must come from customer controls.',
]

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <div className="text-center">
          <p className="eyebrow mb-4">Compliance</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">Your auditor asked about AI. Here&apos;s your answer.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
            TrustScope generates framework-mapped evidence across runtime governance controls, with verifiable records and explicit gap labeling.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/scanner" className="btn-primary gap-2">
              Run Compliance Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">Book Compliance Walkthrough</Link>
          </div>
          <p className="mt-5 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow">The compliance paradox</p>
          <h2 className="mt-2 text-2xl font-bold">Prove the controls ran without exposing sensitive data.</h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Traditional logs either reveal too much data or too little proof. TrustScope evidence shows which checks executed, which policy path was taken, and what action was enforced, without disclosing protected payloads.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Evidence chain</p>
        <div className="card overflow-x-auto">
          <div className="flex min-w-[620px] items-center gap-2 text-sm">
            {['Trace', '26 Engines', 'Policy', 'Receipt', 'Hash Chain', 'Framework Mapping', 'Export'].map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text-secondary)]">{step}</span>
                {idx < 6 && <ArrowRight className="h-4 w-4 text-[var(--text-subtle)]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">AIUC-1 domain snapshot</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {aiucDomains.map((domain) => (
            <article key={domain.name} className="card !p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{domain.name}</p>
              <p className={`mt-1 text-sm font-semibold ${domain.color}`}>{domain.quality}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{domain.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Framework pages</p>
        <div className="grid gap-3 md:grid-cols-2">
          {frameworks.map((framework) => (
            <Link key={framework.href} href={framework.href} className="card block">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{framework.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{framework.coverage}</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{framework.note}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-[var(--interactive)]" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3 text-xs text-[var(--text-muted)]">
          {complianceSources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="mr-4 font-semibold text-[var(--interactive)] hover:underline">
              Source: {source.label}
            </a>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">Critical customer requirements</p>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            {gapSignals.map((signal) => (
              <div key={signal} className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--status-warning)]" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="grid gap-3 md:grid-cols-2">
          <article className="card">
            <p className="eyebrow mb-2">Enforce</p>
            <h3 className="text-2xl font-bold">$249/mo</h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-[var(--status-success)]" />26 engines with AI-hybrid detections</li>
              <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-[var(--status-success)]" />Compliance exports and retention controls</li>
              <li className="flex gap-2"><CheckCircle className="h-4 w-4 text-[var(--status-success)]" />Most teams start here for audit prep</li>
            </ul>
          </article>
          <article className="card">
            <p className="eyebrow mb-2">Govern</p>
            <h3 className="text-2xl font-bold">$2K+/mo</h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-2"><FileCheck className="h-4 w-4 text-[var(--status-success)]" />Signed evidence chain and long-term retention</li>
              <li className="flex gap-2"><Shield className="h-4 w-4 text-[var(--status-success)]" />BYOK signing and underwriting-grade exports</li>
              <li className="flex gap-2"><Scale className="h-4 w-4 text-[var(--status-success)]" />Advanced compliance workflows and reviews</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not legal determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not compliance determinations. Compliance assessment requires review by qualified legal, audit, or compliance professionals.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Need framework-specific mapping detail?</h2>
        <p className="mt-3 text-[var(--text-secondary)]">Open the framework pages for control-level tables and evidence references.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/compliance/aiuc-1" className="btn-primary">View AIUC-1 Mapping</Link>
          <Link href="/pricing" className="btn-secondary">Compare Plans</Link>
        </div>
      </section>
    </div>
  )
}
