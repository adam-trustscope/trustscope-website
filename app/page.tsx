import Link from 'next/link'
import { ArrowRight, Code2, FileCheck, Scale, ShieldAlert } from 'lucide-react'
import HeroGovernanceDemo from '@/components/HeroGovernanceDemo'
import UniversalGovernance from '@/components/UniversalGovernance'
import UseCaseCards from '@/components/UseCaseCards'
import DetectionEngines from '@/components/DetectionEngines'
import ComplianceBridge from '@/components/ComplianceBridge'

const urgencySignals = [
  {
    value: '40%',
    label: 'of enterprise apps will embed AI agents by end of 2026, up from 5% last year.',
    sourceLabel: 'Gartner, Aug 2025',
    sourceHref: 'https://www.gartner.com/en/newsroom/press-releases',
  },
  {
    value: '20%',
    label: 'of all data breaches now involve shadow AI — unmonitored models operating outside governance.',
    sourceLabel: 'IBM Cost of a Data Breach Report, 2025',
    sourceHref: 'https://www.ibm.com/reports/data-breach',
  },
  {
    value: '$4.63M',
    label: 'average cost of an AI-related data breach — $670K more than standard breaches.',
    sourceLabel: 'IBM Cost of a Data Breach Report, 2025',
    sourceHref: 'https://www.ibm.com/reports/data-breach',
  },
]

const pillars = [
  {
    title: 'Know',
    headline: 'See every action your agents take.',
    body: '27 detection engines surface PII leaks, prompt injection, jailbreak attempts, cost spikes, behavioral drift, and hallucinations — across every ingestion path, in real time.',
    details: [
      'Trace-level findings organized by agent, model, and severity',
      'Agent DNA behavioral fingerprinting detects drift before users do',
      'Works across 9 ingestion paths — Gateway, SDK, MCP, OTel, and more',
    ],
    cta: 'See Detection Engines',
    href: '/visibility',
  },
  {
    title: 'Control',
    headline: 'Stop dangerous actions before they execute.',
    body: 'Policy enforcement runs inline with your agent traffic. Simulate first, then alert, then block — without breaking developer workflows or production uptime.',
    details: [
      'Three policy modes: simulate, alert, and block',
      'Redaction, command restrictions, and budget caps enforced in-line',
      'Human approval gates for high-risk actions with evidence binding',
    ],
    cta: 'See Policy Controls',
    href: '/enforcement',
  },
  {
    title: 'Prove',
    headline: 'Generate evidence your auditor can verify.',
    body: 'Every governance event produces a signed, tamper-evident receipt. Export evidence mapped to AIUC-1, SOC 2, EU AI Act, NIST AI RMF, or ISO 42001 — ready for audit review.',
    details: [
      'Cryptographically signed evidence chain for every governed action',
      'Framework-mapped exports with ready, partial, and gap labels',
      'Verifiable without access to TrustScope — your auditor checks independently',
    ],
    cta: 'See Compliance Evidence',
    href: '/evidence',
  },
]

const personas = [
  {
    title: 'Developers',
    line: 'Connect your agents in minutes.',
    details: [
      'Gateway, SDK, MCP, and CLI integration paths',
      'Local trace analysis before cloud deployment',
      'Framework support for LangChain, CrewAI, AutoGen, OpenAI Agents, and more',
    ],
    cta: 'Developer setup',
    href: '/visibility',
    icon: Code2,
  },
  {
    title: 'Engineering & Security Leaders',
    line: 'See your team. Set the rules. Block the threats.',
    details: [
      'Team dashboard with per-agent, per-member visibility',
      'Policy enforcement with simulate → alert → block progression',
      'Incident triage with full trace-level forensics',
    ],
    cta: 'See enforcement controls',
    href: '/enforcement',
    icon: ShieldAlert,
  },
  {
    title: 'Compliance Teams',
    line: 'Your auditor asked about AI controls. Hand them evidence.',
    details: [
      'Framework-mapped exports: AIUC-1, SOC 2, EU AI Act, NIST AI RMF, ISO 42001',
      'Signed evidence chain with cryptographic verification',
      'Explicit ready, partial, and gap labeling — no overclaiming',
    ],
    cta: 'See compliance evidence',
    href: '/evidence',
    icon: Scale,
  },
]


export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <HeroGovernanceDemo />

      <section className="section-container pt-8 pb-14">
        <p className="eyebrow mb-4">THE AI GOVERNANCE GAP</p>
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

      <UniversalGovernance />
      <UseCaseCards />
      <DetectionEngines />

      <section className="section-container py-16">
        <h2 className="mb-8 text-3xl font-bold">Built for everyone shipping AI into production.</h2>
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

      <ComplianceBridge />

      <section className="section-container py-20 text-center">
        <h2 className="text-4xl font-bold">Start free. See results in 5 minutes.</h2>
        <p className="mt-3 max-w-2xl mx-auto text-[var(--text-secondary)]">
          No credit card required. Monitor tier includes 27 detection engines, a full dashboard, and API access. Upgrade when you need team policies, advanced detection, or compliance evidence.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary">
            Start Free
          </a>
          <Link href="/contact" className="btn-secondary">
            Book a Demo
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--text-subtle)]">
          <span className="inline-flex items-center gap-1"><FileCheck className="h-3.5 w-3.5" />800+ patent claims</span>
          <span>Apache-2.0 CLI</span>
          <span>SOC 2 in progress</span>
        </div>
      </section>
    </div>
  )
}
