import Link from 'next/link'
import { ArrowRight, Clock, Scale } from 'lucide-react'

const deadlines = [
  {
    title: 'EU AI Act high-risk deadlines',
    date: 'August 2, 2026',
    note: 'Article 9, 11, 12, 13, 14 obligations apply',
  },
  {
    title: 'SOC 2 AI control expectations',
    date: 'Now required',
    note: 'CC4.1, CC5.1, CC8.1 monitoring and change controls',
  },
  {
    title: 'Enterprise security reviews',
    date: 'Every major deal',
    note: 'AI governance evidence is table stakes',
  },
]

const incidents = [
  {
    title: 'The Friday Audit Request',
    impact: 'Enterprise deal delayed 6 weeks',
    summary:
      'Security review asked for AI governance evidence. The team had logs but no proof that controls executed. Screenshots were rejected.',
    prevention: 'Signed evidence chain with framework-mapped exports ready on demand.',
  },
  {
    title: 'The SOC 2 Gap',
    impact: 'Attestation delayed, additional audit fees',
    summary:
      'Auditor asked how AI outputs were monitored for compliance with trust services criteria. The team had no AI-specific evidence.',
    prevention: 'Runtime governance receipts mapped to SOC 2 criteria with verifiable timestamps.',
  },
  {
    title: 'The EU AI Act Deadline',
    impact: 'Regulatory risk exposure',
    summary:
      'High-risk AI system classification required documented logging and human oversight. The team had 90 days to demonstrate compliance.',
    prevention: 'Pre-mapped Article 9, 11, 12, 13, 14 evidence with audit-ready exports.',
  },
]

const frameworks = [
  {
    name: 'AIUC-1',
    coverage: '45 addressed / 50 requirements (90%)',
    href: '/compliance/aiuc-1',
  },
  {
    name: 'SOC 2',
    coverage: '6 ready / 10 AI-relevant controls',
    href: '/compliance/soc2',
  },
  {
    name: 'EU AI Act',
    coverage: 'Strong on Articles 9, 11, 12, 13, 14',
    href: '/compliance/eu-ai-act',
  },
  {
    name: 'NIST AI RMF',
    coverage: '42 ready / 63 applicable',
    href: '/compliance/nist',
  },
  {
    name: 'ISO 42001',
    coverage: '22 ready / 38 controls',
    href: '/compliance/iso42001',
  },
]

export default function ComplyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Comply</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Your auditor asked about AI. You need proof.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope generates framework-mapped evidence with verifiable timestamps. When compliance asks for AI governance proof, you have an answer.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/compliance" className="btn-primary gap-2">
            View Framework Coverage <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="btn-secondary">Book Compliance Walkthrough</Link>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Compliance deadlines</p>
        <div className="grid gap-3 md:grid-cols-3">
          {deadlines.map((deadline) => (
            <article key={deadline.title} className="card">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--status-warning)]" />
                <span className="text-sm font-semibold text-[var(--status-warning)]">{deadline.date}</span>
              </div>
              <h3 className="text-lg font-semibold">{deadline.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{deadline.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">What happens without evidence</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Composite scenarios based on recurring compliance failures. Names changed. Patterns preserved.
        </p>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <article key={incident.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{incident.title}</h2>
                <span className="rounded-md border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.1)] px-3 py-1 text-xs text-[var(--status-danger)]">
                  {incident.impact}
                </span>
              </div>
              <p className="mt-3 text-[var(--text-secondary)]">{incident.summary}</p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--status-success)]">What would have stopped it:</span> {incident.prevention}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Framework evidence</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((framework) => (
            <Link key={framework.name} href={framework.href} className="card block hover:border-[var(--border-hover)]">
              <h3 className="text-lg font-semibold">{framework.name}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{framework.coverage}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]">
                View mapping <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <Scale className="mx-auto h-5 w-5 text-[var(--brand)]" />
          <h2 className="mt-3 text-3xl font-bold">Evidence ready when they ask.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Generate framework-mapped exports now, not the night before the audit.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/compliance" className="btn-primary">View Framework Coverage</Link>
            <Link href="/contact" className="btn-secondary">Book Compliance Walkthrough</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
