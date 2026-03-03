import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'

const sources = [
  {
    label: 'EU AI Act official text (Regulation (EU) 2024/1689)',
    href: 'http://data.europa.eu/eli/reg/2024/1689/oj',
  },
  {
    label: 'EUR-Lex timeline summary',
    href: 'https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence.html',
  },
]

const articles = [
  {
    id: 'Article 9',
    requirement: 'Risk management system',
    status: 'Ready',
    evidence: 'Detection coverage, severity scoring, and policy response logs',
  },
  {
    id: 'Article 10',
    requirement: 'Data governance and quality',
    status: 'Partial',
    evidence: 'Runtime data quality and leakage checks; training-data governance is out of scope',
  },
  {
    id: 'Article 11',
    requirement: 'Technical documentation',
    status: 'Ready',
    evidence: 'Agent inventory, tool maps, and control records',
  },
  {
    id: 'Article 12',
    requirement: 'Automatic record-keeping',
    status: 'Ready',
    evidence: 'Hash-chained logs and per-trace receipts',
  },
  {
    id: 'Article 13',
    requirement: 'Transparency and instructions for use',
    status: 'Ready',
    evidence: 'Evidence exports and operator-facing governance records',
  },
  {
    id: 'Article 14',
    requirement: 'Human oversight and intervention',
    status: 'Ready',
    evidence: 'Approval gates, kill-switch controls, and intervention events',
  },
  {
    id: 'Article 17',
    requirement: 'Quality management system',
    status: 'Partial',
    evidence: 'Strong runtime evidence; organizational QMS processes remain customer-owned',
  },
]

export default function EUAIActPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <p className="eyebrow mb-4">EU AI Act</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">EU AI Act high-risk mapping.</h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope is strongest on runtime risk management, record-keeping, transparency, and oversight controls required for high-risk systems.
        </p>
        <p className="mt-4 text-xs text-[var(--text-subtle)]">Last verified mapping date: February 19, 2026</p>
      </section>

      <section className="section-container mt-10 max-w-5xl">
        <div className="rounded-xl border border-[color:rgba(217,119,6,.35)] bg-[color:rgba(217,119,6,.1)] p-4 text-sm text-[var(--text-secondary)]">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-[var(--status-warning)]" />
            <p>
              Enforcement milestones continue through 2026-2027. Penalties can reach up to 7% of global annual revenue for prohibited-practice violations.
            </p>
          </div>
          <div className="mt-3 border-t border-[color:rgba(217,119,6,.25)] pt-3 text-xs">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 inline-block font-semibold text-[var(--interactive)] hover:underline"
              >
                Source: {source.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Article</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Requirement</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">Status</th>
                <th className="px-4 py-3 text-[var(--text-secondary)]">TrustScope Evidence</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-mono text-[var(--interactive)]">{row.id}</td>
                  <td className="px-4 py-3 text-[var(--text-primary)]">{row.requirement}</td>
                  <td className={`px-4 py-3 ${row.status === 'Ready' ? 'text-[var(--status-success)]' : 'text-[var(--status-warning)]'}`}>
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="compliance-disclaimer">
          <p className="font-semibold text-[var(--status-warning)]">Evidence, not legal determination</p>
          <p className="mt-1 text-[var(--text-secondary)]">
            TrustScope provides governance evidence, not legal conclusions. EU AI Act readiness requires legal and compliance review.
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
