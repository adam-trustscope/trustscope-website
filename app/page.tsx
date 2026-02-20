import Link from 'next/link'
import { ArrowRight, Code2, FileCheck, Scale, ShieldAlert } from 'lucide-react'
import HeroGovernanceDemo from '@/components/HeroGovernanceDemo'

const urgencySignals = [
  {
    value: '7%',
    label: 'max global annual turnover penalty for prohibited-practice violations under the EU AI Act.',
    sourceLabel: 'EU AI Act (Regulation (EU) 2024/1689, Article 99)',
    sourceHref: 'http://data.europa.eu/eli/reg/2024/1689/oj',
  },
  {
    value: 'Aug 2, 2026',
    label: 'key EU AI Act obligations apply for most high-risk AI systems.',
    sourceLabel: 'EUR-Lex AI Act timeline summary',
    sourceHref: 'https://eur-lex.europa.eu/EN/legal-content/summary/rules-for-trustworthy-artificial-intelligence.html',
  },
  {
    value: '6 domains',
    label: 'in AIUC-1 require evidence across privacy, security, safety, reliability, accountability, and society.',
    sourceLabel: 'TrustScope AIUC-1 mapping (v22.0)',
    sourceHref: '/compliance/aiuc-1',
  },
]

const pillars = [
  {
    title: 'Know',
    headline: 'See every decision your agents make.',
    body: '26 detection engines surface PII leaks, prompt injection, jailbreak attempts, cost spikes, and drift before they become incidents.',
    details: [
      'Trace-level findings by model and severity',
      'Timeline view to spot where drift starts',
      'Local browser analysis with no trace upload',
    ],
    cta: 'Open Trace Analyzer',
    href: '/scanner',
  },
  {
    title: 'Control',
    headline: 'Stop what should not happen.',
    body: 'Inline policy enforcement blocks dangerous actions in real time while preserving developer workflows and uptime.',
    details: [
      'Policy modes: simulate, alert, and block',
      'Guardrails for tool calls and data boundaries',
      'Escalation path for high-risk traces',
    ],
    cta: 'View Security Controls',
    href: '/secure',
  },
  {
    title: 'Prove',
    headline: 'Generate evidence anyone can verify.',
    body: 'Signed, tamper-evident evidence packs map to AIUC-1, SOC 2, EU AI Act, NIST AI RMF, and ISO 42001 reporting needs.',
    details: [
      'Hash-chained receipts for each governance event',
      'Framework-mapped exports for audit workflows',
      'Explicit ready, partial, and gap labeling',
    ],
    cta: 'Open Compliance Mapping',
    href: '/compliance',
  },
]

const personas = [
  {
    title: 'Developers',
    line: 'Governance from your first line of code.',
    details: ['SDK, gateway, and MCP setup paths', 'Fast local validation before cloud rollout'],
    cta: 'Go to Developers',
    href: '/developers',
    icon: Code2,
  },
  {
    title: 'Security and Engineering Leaders',
    line: 'Catch leaks, injection, and runaway automation before customers do.',
    details: ['Incident triage on trace history after an event', 'Policy controls to move from alert to block'],
    cta: 'View Security',
    href: '/secure',
    icon: ShieldAlert,
  },
  {
    title: 'Compliance Teams',
    line: 'When your auditor asks about AI controls, answer with evidence.',
    details: ['Framework mappings with ready/partial/gap labels', 'Evidence exports aligned to review workflows'],
    cta: 'View Compliance',
    href: '/compliance',
    icon: Scale,
  },
]

const criticalWorkflows = [
  {
    title: 'Deprecated Model Cutover',
    when: 'When to use: your production model is being sunset or repriced',
    body: 'Compare baseline versus replacement traces before cutover so you can catch behavior drift before customers do.',
    cta: 'Run Simulate Cutover',
    href: '/switch#compare-upload',
  },
  {
    title: 'Live Leak Incident Response',
    when: 'When to use: a bot exposed customer data or unsafe output',
    body: 'Run incident-focused trace analysis to scope which sessions leaked, what was exposed, and which controls should move to block.',
    cta: 'Start Incident Triage',
    href: '/scanner?demo=claims-processor',
  },
  {
    title: 'Friday Audit Evidence Request',
    when: 'When to use: compliance, legal, or security asks for proof now',
    body: 'Generate mapped evidence workflows aligned to AIUC-1, SOC 2, NIST AI RMF, and EU AI Act reporting expectations.',
    cta: 'Open Compliance Evidence',
    href: '/compliance',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <HeroGovernanceDemo />

      <section className="section-container pt-8 pb-14">
        <p className="eyebrow mb-4">Why governance urgency is rising</p>
        <div className="grid gap-3 md:grid-cols-3">
          {urgencySignals.map((item) => (
            <div key={item.value} className="card py-8 text-center">
              <div className="font-display text-5xl font-black text-[var(--text-primary)]">{item.value}</div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{item.label}</p>
              {item.sourceHref.startsWith('/') ? (
                <Link href={item.sourceHref} className="mt-2 inline-block text-xs font-semibold text-[var(--interactive)] hover:underline">
                  Source: {item.sourceLabel}
                </Link>
              ) : (
                <a
                  href={item.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-[var(--interactive)] hover:underline"
                >
                  Source: {item.sourceLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section-container py-16">
        <h2 className="mb-10 text-4xl font-bold text-[var(--text-primary)]">Know. Control. Prove.</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="card flex h-full flex-col">
              <p className={`eyebrow mb-3 ${pillar.title === 'Prove' ? 'text-[var(--brand)]' : 'text-[var(--text-subtle)]'}`}>
                {pillar.title}
              </p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{pillar.headline}</h3>
              <p className="mt-3 text-[var(--text-secondary)]">{pillar.body}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                {pillar.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <Link href={pillar.href} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]">
                {pillar.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-16">
        <h2 className="mb-8 text-3xl font-bold">Hard-hitting workflows</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {criticalWorkflows.map((workflow) => (
            <article key={workflow.title} className="card flex h-full flex-col">
              <p className="eyebrow mb-2">{workflow.title}</p>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">{workflow.when}</p>
              <p className="text-[var(--text-secondary)]">{workflow.body}</p>
              <Link href={workflow.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]">
                {workflow.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container py-16">
        <h2 className="mb-8 text-3xl font-bold">Built for teams shipping AI into production.</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((item) => (
            <Link key={item.title} href={item.href} className="card block h-full">
              <div className="flex h-full flex-col">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                  <item.icon className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <p className="eyebrow text-[var(--text-subtle)]">{item.title}</p>
                <p className="mt-2 text-lg text-[var(--text-secondary)]">{item.line}</p>
                <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]">
                  {item.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container py-20 text-center">
        <h2 className="text-4xl font-bold">Start free. See results in 5 minutes.</h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          No credit card. 5,000 traces per month. Upgrade when you need continuous governance.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner" className="btn-primary">
            Scan Your Traces
          </Link>
          <Link href="/switch#compare-upload" className="btn-secondary">
            Open Model Compare
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--text-subtle)]">
          <span className="inline-flex items-center gap-1"><FileCheck className="h-3.5 w-3.5" />274+ patent claims</span>
          <span>MIT licensed CLI</span>
          <span>SOC 2 in progress</span>
        </div>
      </section>
    </div>
  )
}
