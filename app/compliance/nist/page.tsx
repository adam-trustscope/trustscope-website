import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const functionSummary = [
  { fn: 'GOVERN', applicable: '15', ready: '10', partial: '3', gap: '0' },
  { fn: 'MAP', applicable: '12', ready: '8', partial: '3', gap: '1' },
  { fn: 'MEASURE', applicable: '19', ready: '12', partial: '5', gap: '2' },
  { fn: 'MANAGE', applicable: '17', ready: '12', partial: '3', gap: '2' },
]

const highlights = [
  {
    id: 'MAP 2.3',
    issue: 'Scientific integrity and training provenance documentation',
    status: 'Gap',
    note: 'Training pipeline evidence remains customer-owned.',
  },
  {
    id: 'MEASURE 2.7',
    issue: 'Formal AI system evaluation program',
    status: 'Gap',
    note: 'Requires structured evaluation methodology and/or third-party engagement.',
  },
  {
    id: 'MANAGE 2.2',
    issue: 'Superseding AI decisions',
    status: 'Partial',
    note: 'Agent lock exists; formal override process doc is customer-owned.',
  },
  {
    id: 'MANAGE 4.1',
    issue: 'Post-deployment monitoring plan',
    status: 'Partial',
    note: 'Monitoring exists; formal plan template required for audit packets.',
  },
]

export default function NISTPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">NIST AI RMF</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">NIST AI RMF runtime evidence mapping.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope covers 42 of 63 applicable NIST AI RMF subcategories as ready evidence, with remaining items explicitly marked as partial or customer-owned.
        </p>
        <p className="mt-4 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Function</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Applicable</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Ready</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Partial</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Gap</th>
              </tr>
            </thead>
            <tbody>
              {functionSummary.map((row) => (
                <tr key={row.fn} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.fn}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.applicable}</td>
                  <td className="px-4 py-3 text-[var(--status-success)]">{row.ready}</td>
                  <td className="px-4 py-3 text-[var(--status-warning)]">{row.partial}</td>
                  <td className="px-4 py-3 text-[var(--status-danger)]">{row.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Subcategory</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Issue</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Status</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {highlights.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-mono text-[var(--interactive)]">{row.id}</td>
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.issue}</td>
                  <td className={`px-4 py-3 ${row.status === 'Gap' ? 'text-[var(--status-danger)]' : 'text-[var(--status-warning)]'}`}>
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not compliance determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not compliance determinations. Final NIST conformance interpretation requires qualified assessor review.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <Link href="/scanner" className="btn-primary gap-2">
          Run NIST-Oriented Scan <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
