import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react'

const domains = [
  {
    id: 'A',
    name: 'Data & Privacy',
    quality: 'Strong',
    engines: ['pii_scanner', 'secrets_scanner', 'pii_confidence'],
    note: 'Policy docs are customer-authored; TrustScope proves enforcement.',
  },
  {
    id: 'B',
    name: 'Security',
    quality: 'Strong',
    engines: ['prompt_injection_ai', 'jailbreak_ai', 'command_firewall'],
    note: 'B001 requires third-party adversarial testing (partial).',
  },
  {
    id: 'C',
    name: 'Safety',
    quality: 'Strong',
    engines: ['toxicity_filter', 'hallucination_detector', 'hate_speech_detector'],
    note: 'C003 bias coverage via toxicity + hate speech (per-trace) and Agent DNA fairness strand (aggregate). C010-C012 require external testing (partial).',
  },
  {
    id: 'D',
    name: 'Reliability',
    quality: 'Good',
    engines: ['loop_killer', 'velocity_monitor', 'error_rate'],
    note: 'D002/D004 are third-party testing controls (partial).',
  },
  {
    id: 'E',
    name: 'Accountability',
    quality: 'Strong',
    engines: ['evidence_signer', 'hash_chain', 'audit_export'],
    note: 'Failure-plan docs are customer-authored but evidence-backed.',
  },
  {
    id: 'F',
    name: 'Cyber Misuse',
    quality: 'Strong',
    engines: ['command_firewall', 'secrets_scanner', 'prompt_injection_ai'],
    note: 'CBRN and misuse prevention via security engines.',
  },
]

const criticalGaps = [
  'B001 third-party adversarial robustness testing',
  'C010 third-party harmful output testing',
  'C011 third-party out-of-scope output testing',
  'C012 third-party customer-defined risk testing',
  'D002 third-party hallucination testing',
  'D004 third-party tool-call reliability testing',
]

export default function AIUC1Page() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">AIUC-1</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">AIUC-1 mapping for runtime governance evidence.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope maps runtime controls to all six AIUC-1 domains and clearly distinguishes ready evidence, partial coverage, and customer-owned obligations.
        </p>
        <p className="mt-4 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="mb-3 text-sm text-[var(--text-muted)]">Strong coverage across all 6 domains. Gaps clearly labeled below.</p>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Domain</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Evidence Quality</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Key Engines</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.id}. {row.name}</td>
                  <td className={`px-4 py-3 font-semibold ${row.quality === 'Strong' ? 'text-[var(--status-success)]' : 'text-[var(--status-success)]'}`}>{row.quality}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.engines.join(', ')}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-3">Critical gaps (external testing requirement)</p>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {criticalGaps.map((gap) => (
              <li key={gap} className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--status-danger)]" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            These are not product failures. AIUC-1 requires accredited third-party testing engagements. TrustScope provides the audit trail those assessors review.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not compliance determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not compliance determinations. Final certification decisions are made by qualified assessors.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Run AIUC-1 readiness on real traces.</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
            Start Free <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/compliance" className="btn-secondary">Back to Compliance Hub</Link>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <CheckCircle className="h-3.5 w-3.5 text-[var(--status-success)]" />
          Includes explicit ready / partial / gap labeling.
        </div>
      </section>
    </div>
  )
}
