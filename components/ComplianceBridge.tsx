import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const frameworks = ['AIUC-1', 'SOC 2', 'EU AI Act', 'NIST AI RMF', 'ISO 42001']

export default function ComplianceBridge() {
  return (
    <section className="section-container py-16">
      <p className="eyebrow mb-4">COMPLIANCE EVIDENCE</p>
      <h2 className="mb-4 text-4xl font-bold text-[var(--text-primary)]">
        Prove it to any framework.
      </h2>
      <p className="mb-8 max-w-3xl text-[var(--text-secondary)]">
        TrustScope generates runtime governance evidence mapped to the frameworks your auditor
        actually asks about. Not dashboards. Not screenshots. Signed, verifiable evidence.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {frameworks.map((fw) => (
          <span
            key={fw}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]"
          >
            {fw}
          </span>
        ))}
      </div>

      <div className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
        <p className="text-sm font-semibold text-amber-400">
          EU AI Act high-risk enforcement begins August 2, 2026.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/evidence" className="btn-primary">
          View framework coverage <ArrowRight className="ml-1 inline h-4 w-4" />
        </Link>
        <Link href="/contact" className="btn-secondary">
          Book compliance walkthrough <ArrowRight className="ml-1 inline h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
