import Link from 'next/link'
import { AlertTriangle, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react'

const incidents = [
  {
    title: 'The $10,000 Infinite Loop',
    category: 'Cost',
    impact: '$10,847 in API spend overnight',
    narrative:
      'A coding agent hit a retry condition and recursively called itself 47,000 times. The team discovered it Monday morning from billing alerts.',
    stop: 'Loop killer + velocity policy + budget block mode.',
    tier: 'Monitor (free) for detection, Protect+ for blocking',
  },
  {
    title: 'The Agent That Leaked SSNs',
    category: 'Security',
    impact: '$1.2M compliance and legal exposure',
    narrative:
      'A healthcare assistant included social security numbers and policy IDs in responses. Discovery happened in audit review, not production monitoring.',
    stop: 'PII scanner + response redaction + enforcement receipts.',
    tier: 'Protect',
  },
  {
    title: 'The DROP TABLE Incident',
    category: 'Security',
    impact: '3 days degraded operations',
    narrative:
      'A tool-enabled assistant interpreted “cleanup” as a destructive SQL action and attempted privileged table deletion.',
    stop: 'Command firewall + tool allowlist + human approval gate.',
    tier: 'Protect',
  },
  {
    title: 'The Audit They Couldn\'t Pass',
    category: 'Compliance',
    impact: 'SOC 2 delay and lost enterprise deal',
    narrative:
      'The team had controls and logs but no verifiable evidence that the controls executed for specific trace events.',
    stop: 'Signed evidence chain and framework-mapped exports.',
    tier: 'Govern',
  },
  {
    title: 'The Insurance Denial',
    category: 'Risk',
    impact: 'No AI liability coverage approval',
    narrative:
      'Underwriters requested independently verifiable governance evidence artifacts. Dashboard screenshots were rejected.',
    stop: 'Underwriting-ready evidence bundle with signatures and timestamps.',
    tier: 'Govern',
  },
  {
    title: 'The Hallucinated Legal Citation',
    category: 'Reliability',
    impact: 'Pending litigation and response costs',
    narrative:
      'A legal drafting assistant cited non-existent cases in a filed document. There was no pre-release reliability gate.',
    stop: 'Hallucination and groundedness checks in enforce mode.',
    tier: 'Enforce',
  },
]

export default function IncidentsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Incidents</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Things that went wrong.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Real patterns from production AI failures. Names changed. Dollar amounts not.
        </p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="card !p-4 text-center">
            <p className="text-2xl font-black text-[var(--status-danger)]">Spend Shock</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Runaway loops and delegation storms</p>
          </div>
          <div className="card !p-4 text-center">
            <p className="text-2xl font-black text-[var(--status-danger)]">Audit Delay</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Controls existed, evidence did not</p>
          </div>
          <div className="card !p-4 text-center">
            <p className="text-2xl font-black text-[var(--status-warning)]">Service Risk</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Unsafe tool calls and output drift</p>
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="space-y-3">
          {incidents.map((incident) => (
            <article key={incident.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="eyebrow mb-1">{incident.category}</p>
                  <h2 className="text-2xl font-bold">{incident.title}</h2>
                </div>
                <span className="rounded-md border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.1)] px-3 py-1 text-xs text-[var(--status-danger)]">
                  {incident.impact}
                </span>
              </div>

              <p className="mt-3 text-[var(--text-secondary)]">{incident.narrative}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">What would have caught it</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{incident.stop}</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-subtle)]">Tier path</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{incident.tier}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <ShieldAlert className="mx-auto h-5 w-5 text-[var(--status-warning)]" />
          <h2 className="mt-3 text-3xl font-bold">These are predictable, not rare.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Runtime governance converts unknown risk into measurable controls and verifiable evidence.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/scanner?demo=claims-processor" className="btn-primary gap-2">
              Open Trace Analyzer (Incident demo) <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/switch#compare-upload" className="btn-secondary">Open Model Compare (Migration)</Link>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <CheckCircle className="h-3.5 w-3.5 text-[var(--status-success)]" />
            Start with local browser scan, then move to continuous protection.
          </div>
        </div>
      </section>

      <section className="section-container mt-10 max-w-5xl text-center">
        <Link href="/cost" className="text-sm font-semibold text-[var(--interactive)] hover:underline">
          See cost-specific failures and controls
        </Link>
      </section>
    </div>
  )
}
