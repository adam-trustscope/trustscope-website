import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface FrameworkLandingProps {
  framework: string
  headline?: string
  snippet: string
  detail: string
}

const commonBenefits = [
  '26 detection engines across Monitor, Protect, and Enforce',
  'Runtime policy enforcement with simulate / alert / block modes',
  'Cost, loop, and data leakage visibility per agent',
  'Framework-mapped evidence exports for audit workflows',
]

export default function FrameworkLanding({ framework, headline, snippet, detail }: FrameworkLandingProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">Framework Integration</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">{headline ?? `TrustScope for ${framework}`}</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Add governance to your {framework} agents in minutes without rebuilding your runtime stack.
        </p>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <h2 className="text-2xl font-bold">Integration snippet</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-secondary)]">
            <code>{snippet}</code>
          </pre>
          <p className="mt-3 text-sm text-[var(--text-muted)]">{detail}</p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">What you get</p>
        <div className="card">
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {commonBenefits.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-[var(--status-success)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Ready to wire this into production?</h2>
        <p className="mt-3 text-[var(--text-secondary)]">Use the developers page for full setup options and docs links.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/developers" className="btn-primary gap-2">
            Go to Developers <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/scanner" className="btn-secondary">Run Trace Analyzer Demo</Link>
        </div>
      </section>
    </div>
  )
}
