import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle2, FileCheck, Search, ShieldCheck } from 'lucide-react'

const sourcedSignals = [
  {
    value: '7%',
    label: 'Maximum global annual turnover penalty for prohibited-practice violations under the EU AI Act.',
    sourceLabel: 'EU AI Act (Regulation (EU) 2024/1689, Article 99)',
    sourceHref: 'http://data.europa.eu/eli/reg/2024/1689/oj',
  },
  {
    value: 'Aug 2, 2026',
    label: 'Date key EU AI Act obligations become applicable for most high-risk systems.',
    sourceLabel: 'EUR-Lex AI Act timeline summary',
    sourceHref: 'https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence.html',
  },
  {
    value: '6 controls',
    label: 'Mandatory AIUC-1 controls currently depend on third-party testing, not self-attestation.',
    sourceLabel: 'TrustScope Framework Mapping v22.0 (AIUC-1 gap analysis)',
    sourceHref: '/compliance/aiuc-1',
  },
]

const process = [
  {
    title: 'Ground Truth Check',
    detail:
      'Compare model output against tool output and source context to detect claim mismatches.',
  },
  {
    title: 'Behavior Drift Check',
    detail:
      'Compare current output patterns against historical baseline for unexpected behavior shifts.',
  },
  {
    title: 'Evidence Receipt',
    detail:
      'Store per-check receipts with hash chain and signature metadata for downstream review.',
  },
]

const complianceReferences = [
  'EU AI Act Article 12: record-keeping',
  'EU AI Act Article 14: human oversight',
  'EU AI Act Article 17: quality management system',
  'NIST AI RMF: MAP / MEASURE / MANAGE evidence support',
]

export default function HallucinationDetectionPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Feature Deep Dive</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Hallucination detection with evidence.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Finding hallucinations is useful. Proving what was checked, when, and against which data is what auditors and risk teams need.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner" className="btn-primary gap-2">
            Run Trace Analyzer <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn-secondary">
            View Plan Coverage
          </Link>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Context (source-backed)</p>
        <div className="grid gap-3 md:grid-cols-3">
          {sourcedSignals.map((item) => (
            <article key={item.value} className="card !p-5 text-center">
              <p className="text-4xl font-black text-[var(--text-primary)]">{item.value}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.label}</p>
              <a
                href={item.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-[var(--interactive)] hover:underline"
              >
                Source: {item.sourceLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">Failure pattern</p>
          <h2 className="text-3xl font-bold">The model said one thing. The tool returned another.</h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            Example: an assistant tells a user the refund amount is $500 while the backend tool output was $50. The risk is not just response quality. The risk is operational and regulatory.
          </p>
          <p className="mt-3 text-[var(--text-secondary)]">
            The core question in review is: what checks ran before this output was delivered?
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">How it works</p>
        <div className="grid gap-3 md:grid-cols-3">
          {process.map((item, index) => (
            <article key={item.title} className="card">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--interactive)] text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">Evidence payload example</p>
          <pre className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-xs text-[var(--text-secondary)]">
            <code>{`{
  "receipt_id": "rcpt_7a8b9c2d",
  "trace_id": "tr_abc123",
  "check_type": "hallucination_ground_truth",
  "result": "FLAGGED",
  "claim": "Account balance is $50,000",
  "tool_returned": 12000,
  "claim_stated": 50000,
  "receipt_hash": "sha256:...",
  "signature": "ed25519:..."
}`}</code>
          </pre>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">Compliance relevance</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {complianceReferences.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--status-success)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.1)] p-3 text-xs text-[var(--text-secondary)]">
            These mappings are evidence-support references. Final compliance interpretation remains a legal/compliance function.
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Run it on real traces.</h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          Start local in Trace Analyzer. Move to continuous enforcement when you are ready.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner" className="btn-primary gap-2">
            <Search className="h-4 w-4" /> Open Trace Analyzer
          </Link>
          <Link href="/compliance" className="btn-secondary gap-2">
            <FileCheck className="h-4 w-4" /> Compliance Mapping
          </Link>
          <Link href="/secure" className="btn-secondary gap-2">
            <ShieldCheck className="h-4 w-4" /> Security Coverage
          </Link>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <AlertTriangle className="h-3.5 w-3.5 text-[var(--status-warning)]" />
          TrustScope provides evidence artifacts, not certification outcomes.
        </div>
      </section>
    </div>
  )
}
