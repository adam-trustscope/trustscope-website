import Link from 'next/link'
import { AlertTriangle, ArrowRight, BarChart3, CheckCircle, DollarSign } from 'lucide-react'

const incidents = [
  {
    title: 'The $10,000 Infinite Loop',
    impact: '$10,847 in 90 minutes',
    summary:
      'An agent retried failed calls recursively after a rate-limit response and amplified usage while no one was online.',
    prevention: 'Loop killer + velocity limits + hard budget policies.',
  },
  {
    title: 'The Runaway Agent Cascade',
    impact: '$3,200 in a single afternoon',
    summary:
      'Multiple agents delegated tasks back and forth and spawned new workers indefinitely, multiplying token and API spend.',
    prevention: 'A2A depth caps + delegation policy constraints.',
  },
  {
    title: 'The Context Window Explosion',
    impact: '$680/day unnecessary spend',
    summary:
      'A retrieval workflow pulled entire datasets into every prompt and inflated token usage far beyond task requirements.',
    prevention: 'Token growth detection + context boundary policies.',
  },
]

const budgetPolicy = `policies:\n  - name: customer-bot-budget\n    agent: customer-bot\n    daily_limit_usd: 100\n    alert_at: 0.8\n    block_at: 1.0`

export default function CostPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Cost</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Your AI spend spiked last Tuesday.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Most teams discover runaway costs on the invoice. TrustScope flags and enforces spend thresholds in real time.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner?demo=financial-advisor" className="btn-primary gap-2">
            Analyze Trace Costs <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn-secondary">View Cost Controls by Tier</Link>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Real incidents</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Composite scenarios based on recurring spend-failure patterns in production AI systems.
        </p>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <article key={incident.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{incident.title}</h2>
                <span className="rounded-md border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.1)] px-3 py-1 text-xs text-[var(--status-warning)]">
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
        <p className="eyebrow mb-3">Cost visibility snapshot</p>
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[var(--interactive)]" />
            <h2 className="text-xl font-bold">Per-agent spend (example)</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'CustomerBot', value: '$47/day', width: '68%' },
              { name: 'ResearchAgent', value: '$16/day', width: '24%' },
              { name: 'CodeReview', value: '$6/day', width: '8%' },
            ].map((row) => (
              <div key={row.name} className="grid grid-cols-[120px_1fr_90px] items-center gap-3 text-sm">
                <span className="text-[var(--text-secondary)]">{row.name}</span>
                <div className="h-2 rounded-full bg-[var(--surface-hover)]">
                  <div className="h-full rounded-full bg-[var(--interactive)]" style={{ width: row.width }} />
                </div>
                <span className="text-right font-mono text-[var(--text-primary)]">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.1)] p-3 text-sm text-[var(--text-secondary)]">
            Optimization signal: moving selected CustomerBot calls to a lower-cost model projects roughly $930/month savings.
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Budget enforcement policy</p>
        <div className="card">
          <pre className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-secondary)]">
            <code>{budgetPolicy}</code>
          </pre>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Set alert and block thresholds per agent. Most teams start with alert at 80% and block at 100%.
          </p>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <DollarSign className="mx-auto h-5 w-5 text-[var(--status-warning)]" />
          <h2 className="mt-3 text-3xl font-bold">Stop spend bleed before finance flags it.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Run a local scan now, then move to continuous cost governance during rollout and production.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/scanner?demo=financial-advisor" className="btn-primary">Open Trace Analyzer (Cost-focused)</Link>
            <Link href="/switch#compare-upload" className="btn-secondary">Simulate Model Switch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
