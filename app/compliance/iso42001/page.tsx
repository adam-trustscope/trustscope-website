import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    area: 'Leadership and Planning',
    ready: '3',
    partial: '3',
    gap: '0',
    note: 'Governance evidence is strong; policy authorship remains organizational.',
  },
  {
    area: 'Support and Operation',
    ready: '6',
    partial: '3',
    gap: '1',
    note: 'Impact-assessment methodology must be customer-defined.',
  },
  {
    area: 'Performance Evaluation',
    ready: '4',
    partial: '1',
    gap: '0',
    note: 'Audit and monitoring evidence available in exports.',
  },
  {
    area: 'Improvement',
    ready: '2',
    partial: '1',
    gap: '0',
    note: 'Evidence supports improvement cycles; governance process ownership is customer-side.',
  },
  {
    area: 'Annex A Controls',
    ready: '7',
    partial: '3',
    gap: '0',
    note: 'Runtime controls map well; organizational controls remain external.',
  },
]

const keyGap = {
  id: '8.4',
  name: 'AI system impact assessment',
  reason: 'Requires formal, documented impact-assessment methodology before deployment.',
}

export default function ISO42001Page() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">ISO 42001</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">ISO 42001 control mapping for AI operations.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope provides strong runtime evidence coverage for ISO/IEC 42001 AI management controls while explicitly separating organizational ownership items.
        </p>
        <p className="mt-4 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Category</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Ready</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Partial</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Gap</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row) => (
                <tr key={row.area} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.area}</td>
                  <td className="px-4 py-3 text-[var(--status-success)]">{row.ready}</td>
                  <td className="px-4 py-3 text-[var(--status-warning)]">{row.partial}</td>
                  <td className="px-4 py-3 text-[var(--status-danger)]">{row.gap}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <h2 className="text-xl font-bold">Key gap to close</h2>
          <p className="mt-2 font-mono text-sm text-[var(--interactive)]">Control {keyGap.id}</p>
          <p className="mt-2 text-sm text-[var(--text-primary)]">{keyGap.name}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{keyGap.reason}</p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not compliance determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not compliance determinations. ISO 42001 certification outcomes are determined by qualified auditors.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
          Start Free <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  )
}
