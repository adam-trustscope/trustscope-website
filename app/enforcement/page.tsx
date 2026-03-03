import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Eye,
  Bell,
  ShieldOff,
  UserCheck,
  BrainCircuit,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Policy Enforcement',
  description:
    'Simulate, alert, and block dangerous agent actions in real time with inline policy enforcement.',
}

const modes = [
  {
    icon: Eye,
    label: 'Simulate',
    color: 'var(--interactive)',
    headline: 'See what would be caught. Zero production impact.',
    question: 'What would happen if I turned this on?',
  },
  {
    icon: Bell,
    label: 'Alert',
    color: 'var(--status-warning)',
    headline: 'Get notified when a policy triggers. Agent continues.',
    question: 'Tell me when something fires.',
  },
  {
    icon: ShieldOff,
    label: 'Block',
    color: 'var(--status-danger)',
    headline: 'Prevent dangerous actions before they execute.',
    question: 'Stop it. Now.',
  },
]

const owaspRows = [
  {
    id: 'ASI-01',
    risk: 'Goal Hijacking',
    response:
      'Prompt injection + jailbreak AI detectors with escalation and block.',
  },
  {
    id: 'ASI-02',
    risk: 'Tool Misuse',
    response:
      'Command firewall, A2A depth controls, tool call policy validation.',
  },
  {
    id: 'ASI-04',
    risk: 'Supply Chain',
    response:
      'Schema quarantine, TOFU pinning, shadow registry tracking.',
  },
  {
    id: 'ASI-06',
    risk: 'Context Poisoning',
    response:
      'Context growth monitoring, guardrail policy checks.',
  },
  {
    id: 'ASI-08',
    risk: 'Cascading Failures',
    response:
      'Loop killer, velocity controls, cost caps, error-rate controls.',
  },
  {
    id: 'ASI-10',
    risk: 'Rogue Agents',
    response:
      'Agent DNA drift detection, behavioral fingerprinting, kill switch.',
  },
]

const policyExamples: { title: string; yaml: string }[] = [
  {
    title: 'Budget Cap',
    yaml: `policy: customer-bot-budget
mode: block
trigger:
  metric: session.total_cost
  operator: gte
  value: 5.00
action:
  block: true
  notify:
    channel: "#ops-alerts"
    message: "Session cost cap reached."`,
  },
  {
    title: 'Command Restrictions',
    yaml: `policy: no-destructive-sql
mode: block
trigger:
  tool: sql_query
  pattern: "DROP|TRUNCATE|DELETE\\\\s+FROM"
action:
  block: true
  escalate: human_review
  notify:
    channel: "#security"
    message: "Destructive SQL blocked."`,
  },
  {
    title: 'PII Redaction',
    yaml: `policy: redact-pii-in-responses
mode: alert
trigger:
  detector: pii_scanner
  entities:
    - ssn
    - credit_card
    - phone_number
action:
  redact: true
  log: true
  notify:
    channel: "#compliance"
    message: "PII detected and redacted."`,
  },
]

export default function EnforcementPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">PLATFORM</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          See it. Stop it. Before it hits production.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Detection tells you what happened. Enforcement stops it from happening.
          TrustScope policy enforcement runs inline with your agent traffic&nbsp;&mdash;
          simulate first, then alert, then block.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/pricing" className="btn-primary gap-2">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#policy-modes" className="btn-secondary">
            See Policy Controls
          </a>
        </div>
      </section>

      {/* ── Policy Modes ─────────────────────────────── */}
      <section id="policy-modes" className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">ENFORCEMENT MODES</p>
        <h2 className="text-3xl font-bold">Three modes. Your pace.</h2>
        <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
          Every policy runs in one of three modes: simulate, alert, or block. Start
          in simulate to see what would be caught with zero production impact, then
          promote individual policies to alert or block as confidence grows. Each
          policy moves independently&nbsp;&mdash; there is no global switch.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {modes.map((mode) => (
            <article key={mode.label} className="card flex flex-col">
              <div className="mb-3 flex items-center gap-2">
                <mode.icon
                  className="h-5 w-5"
                  style={{ color: mode.color }}
                />
                <h3 className="text-lg font-semibold">{mode.label}</h3>
              </div>
              <p className="text-[var(--text-secondary)]">{mode.headline}</p>
              <p className="mt-auto pt-4 text-sm italic text-[var(--text-muted)]">
                &ldquo;{mode.question}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── OWASP Agentic Top 10 ─────────────────────── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">THREAT COVERAGE</p>
        <h2 className="text-3xl font-bold">Mapped to OWASP Agentic Top 10.</h2>

        <div className="card mt-6 overflow-x-auto !p-0">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  OWASP Risk
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  TrustScope Response
                </th>
              </tr>
            </thead>
            <tbody>
              {owaspRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {row.id} {row.risk}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {row.response}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Policy Examples ──────────────────────────── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">POLICY EXAMPLES</p>
        <h2 className="text-3xl font-bold">Policies that make sense to humans.</h2>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {policyExamples.map((example) => (
            <div key={example.title} className="flex flex-col">
              <p className="mb-2 text-sm font-semibold text-[var(--text-primary)]">
                {example.title}
              </p>
              <pre className="card flex-1 overflow-x-auto !bg-[#0d1117] !p-4 text-xs leading-relaxed text-[#c9d1d9]">
                <code>{example.yaml}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Human Approval Workflows ─────────────────── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">HUMAN IN THE LOOP</p>
        <h2 className="text-3xl font-bold">
          High-risk actions wait for your approval.
        </h2>
        <div className="card mt-6">
          <div className="flex items-start gap-3">
            <UserCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--interactive)]" />
            <div>
              <p className="text-[var(--text-secondary)]">
                When a policy triggers in block mode, TrustScope can hold the action
                and route it through a human approval workflow. Reviewers receive
                notifications via Slack, email, or webhook with the full evidence
                chain&nbsp;&mdash; the agent trace, the policy that fired, and the
                action that was blocked. Approve or deny with one click and the
                decision is logged to the audit trail.
              </p>
              <p className="mt-4 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-muted)]">
                Available at Enforce tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Adaptive Governance ───────────────────────── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">ADAPTIVE GOVERNANCE</p>
        <h2 className="text-3xl font-bold">
          Policies that tighten automatically.
        </h2>
        <div className="card mt-6">
          <div className="flex items-start gap-3">
            <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-[var(--brand)]" />
            <div>
              <p className="text-[var(--text-secondary)]">
                Adaptive governance watches detection patterns over time and
                auto-adjusts policy constraints. If prompt injection attempts spike
                on a particular agent, the system can tighten that agent&apos;s
                enforcement mode from simulate to alert or from alert to block
                without manual intervention. Thresholds, cooldowns, and escalation
                paths are all configurable.
              </p>
              <p className="mt-4 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-muted)]">
                Available at Enforce tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <h2 className="text-3xl font-bold">
            Start with visibility. Upgrade when you need enforcement.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Monitor tier gives you detection. Protect adds blocking. Enforce adds
            AI-powered analysis and adaptive governance.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing" className="btn-primary gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
