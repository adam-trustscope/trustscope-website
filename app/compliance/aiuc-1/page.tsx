import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react'

const domains = [
  {
    domain: 'A. Data & Privacy',
    controls: '~7',
    ready: '4',
    partial: '3',
    gap: '0',
    note: 'Policy docs are customer-authored; TrustScope proves enforcement.',
  },
  {
    domain: 'B. Security',
    controls: '~9',
    ready: '5',
    partial: '1',
    gap: '1',
    note: 'B001 requires third-party adversarial testing.',
  },
  {
    domain: 'C. Safety',
    controls: '~12',
    ready: '7',
    partial: '2',
    gap: '3',
    note: 'C010-C012 require external testing engagements.',
  },
  {
    domain: 'D. Reliability',
    controls: '~4',
    ready: '1',
    partial: '1',
    gap: '2',
    note: 'D002/D004 are third-party testing controls.',
  },
  {
    domain: 'E. Accountability',
    controls: '~10+',
    ready: '3',
    partial: '6+',
    gap: '0',
    note: 'Failure-plan docs are customer-authored but evidence-backed by TrustScope.',
  },
  {
    domain: 'F. Society',
    controls: '~2',
    ready: '1',
    partial: '1',
    gap: '0',
    note: 'CBRN and misuse policy depth is customer-taxonomy dependent.',
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
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Domain</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Controls</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Ready</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Partial</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Gap</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {domains.map((row) => (
                <tr key={row.domain} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.domain}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.controls}</td>
                  <td className="px-4 py-3 text-[var(--status-success)]">{row.ready}</td>
                  <td className="px-4 py-3 text-[var(--status-warning)]">{row.partial}</td>
                  <td className="px-4 py-3 text-[var(--status-danger)]">{row.gap}</td>
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
            These are not product failures. AIUC-1 requires accredited third-party testing engagements. TrustScope provides the evidence package those assessors review.
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
          <Link href="/scanner" className="btn-primary gap-2">
            Start Assessment <ArrowRight className="h-4 w-4" />
          </Link>
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
