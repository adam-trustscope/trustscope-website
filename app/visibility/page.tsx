import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Activity,
  Brain,
  Eye,
  Fingerprint,
  Globe,
  Layers,
  Radio,
  Scan,
  Shield,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Runtime Visibility',
  description:
    '27 detection engines across 9 ingestion paths. See every action your AI agents take.',
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tierCards = [
  {
    tier: 'Monitor',
    price: 'Free',
    count: 15,
    description:
      'Rule-based runtime controls. Full dashboard. No credit card.',
    groups: [
      {
        label: 'Cost & Loops',
        count: 7,
        engines: [
          'Loop Killer',
          'Velocity Monitor',
          'Cost Velocity',
          'Budget Caps',
          'Token Growth',
          'Context Expansion',
          'Oscillation Detector',
        ],
      },
      {
        label: 'Content & Secrets',
        count: 3,
        engines: ['Secrets Scanner', 'Blocked Phrases', 'Action Label Mismatch'],
      },
      {
        label: 'Security',
        count: 3,
        engines: ['Prompt Injection (pattern)', 'Jailbreak Detector (pattern)', 'Command Firewall'],
      },
      {
        label: 'Behavioral',
        count: 2,
        engines: ['Error Rate', 'Session Duration'],
      },
    ],
  },
  {
    tier: 'Protect',
    price: '$49/mo',
    count: 5,
    description:
      'ML-assisted controls for contextual risk routing and stronger blocking.',
    groups: [
      {
        label: 'ML Engines',
        count: 5,
        engines: [
          'PII Scanner (Presidio NER)',
          'Prompt Injection (ONNX)',
          'Jailbreak Detector (ONNX)',
          'Toxicity Filter',
          'Data Exfiltration',
        ],
      },
    ],
  },
  {
    tier: 'Enforce',
    price: '$199/mo',
    count: 7,
    description:
      'AI-hybrid controls for advanced runtime reasoning and behavioral intelligence.',
    groups: [
      {
        label: 'AI-Hybrid Engines',
        count: 7,
        engines: [
          'Semantic Firewall',
          'Hallucination Detector',
          'Reasoning Drift',
          'Reasoning Quality Monitor',
          'A2A Depth',
          'Tool Parameter Validator',
          'Bias Monitor',
        ],
      },
    ],
  },
]

const dnaStrands = [
  { strand: 'Tool Call Distribution', description: 'Frequency and ordering of tool invocations across sessions' },
  { strand: 'Token Velocity Profile', description: 'Token consumption rate patterns per agent over time' },
  { strand: 'Error Response Pattern', description: 'How the agent handles and recovers from failure states' },
  { strand: 'Session Duration Shape', description: 'Characteristic session length and activity distribution' },
  { strand: 'Delegation Depth', description: 'Agent-to-agent handoff frequency and chain depth' },
  { strand: 'Cost Curve Signature', description: 'Spend pattern shape across session lifecycle' },
  { strand: 'Content Risk Profile', description: 'Baseline content risk exposure levels per agent' },
  { strand: 'Reasoning Quality Trend', description: 'Reasoning chain quality trajectory over time' },
]

const integrationPaths = [
  {
    category: 'Full inline governance',
    description: 'Real-time detection + blocking + evidence generation',
    paths: [
      { name: 'Gateway Proxy', detail: 'Swap your base URL. Zero code changes.', icon: Globe },
      { name: 'Python SDK', detail: 'Decorator and callback hooks for deep control.', icon: Terminal },
      { name: 'Node.js SDK', detail: 'Middleware integration for JS/TS agent stacks.', icon: Terminal },
      { name: 'Endpoint Bridge', detail: 'REST-based governance for any language or runtime.', icon: Zap },
    ],
  },
  {
    category: 'Detection + alerting',
    description: 'Observe and alert without inline blocking',
    paths: [
      { name: 'MCP Server', detail: 'IDE-native governance for Claude, Cursor, Windsurf.', icon: Scan },
      { name: 'Framework Callbacks', detail: 'LangChain, CrewAI, AutoGen, OpenAI Agents, and more.', icon: Workflow },
    ],
  },
  {
    category: 'Visibility + evidence',
    description: 'Offline analysis, batch scanning, and audit',
    paths: [
      { name: 'CLI Scan', detail: 'Local trace analysis before cloud deployment.', icon: Terminal },
      { name: 'Direct API', detail: 'JSON, JSONL, CSV, TSV, HAR trace import.', icon: Layers },
      { name: 'OTel Fanout', detail: 'Fan out existing OpenTelemetry spans to TrustScope.', icon: Radio },
    ],
  },
]

const budgetPolicy = `policies:
  - name: support-bot-budget
    agent: support-bot
    model: gpt-4o
    daily_limit_usd: 150
    alert_at: 0.8        # alert at 80% of daily limit
    block_at: 1.0        # hard stop at 100%
    loop_kill: true       # terminate infinite retry loops
    velocity_cap: 60      # max requests per minute`

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function VisibilityPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">PLATFORM</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          You have AI agents in production.
          <br className="hidden md:block" />
          Do you know what they&apos;re doing right now?
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          TrustScope gives you trace-level visibility into every AI agent
          action — PII exposure, prompt injection, cost spikes, behavioral
          drift, and tool call anomalies — across every ingestion path, in
          real time.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
            Start Free <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#engines" className="btn-secondary">
            See Detection Engines
          </a>
        </div>
      </section>

      {/* ── The Visibility Gap ────────────────────────────────────── */}
      <section className="section-container mt-20 max-w-5xl">
        <p className="eyebrow mb-3">THE PROBLEM</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Most teams discover AI agent problems from their customers.
        </h2>
        <div className="mt-6 space-y-3">
          <article className="card">
            <p className="text-[var(--text-secondary)]">
              An engineer&apos;s AI tool makes <strong className="text-[var(--text-primary)]">200 database calls per session</strong>.
              Nobody knows.
            </p>
          </article>
          <article className="card">
            <p className="text-[var(--text-secondary)]">
              A support bot leaks a customer&apos;s SSN. Discovery happens in <strong className="text-[var(--text-primary)]">audit review</strong>,
              not production monitoring.
            </p>
          </article>
          <article className="card">
            <p className="text-[var(--text-secondary)]">
              A coding agent retries failed API calls <strong className="text-[var(--text-primary)]">47,000 times overnight</strong>.
              The team finds out from Monday&apos;s billing alert.
            </p>
          </article>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          These aren&apos;t hypotheticals. They&apos;re patterns from real
          production deployments. TrustScope catches them in real time.
        </p>
      </section>

      {/* ── 27 Detection Engines ──────────────────────────────────── */}
      <section id="engines" className="section-container mt-20 max-w-5xl scroll-mt-24">
        <p className="eyebrow mb-3">DETECTION DEPTH</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          27 engines. Three tiers of intelligence.
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          Rule-based, ML-assisted, and AI-hybrid engines layered by tier so
          you pay only for the depth you need.
        </p>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {tierCards.map((tier) => (
            <article key={tier.tier} className="card flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  {tier.tier}
                </h3>
                <span className="rounded-md border border-[var(--border)] px-3 py-1 text-sm font-semibold text-[var(--interactive)]">
                  {tier.price}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                {tier.tier === 'Monitor'
                  ? `${tier.count} engines included`
                  : `+${tier.count} engines`}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {tier.description}
              </p>
              <div className="mt-4 flex-1 space-y-4">
                {tier.groups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                      {group.label} ({group.count})
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {group.engines.map((engine) => (
                        <li
                          key={engine}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--status-success)]" />
                          <span>{engine}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)]">
          AI-hybrid engines run on your LLM provider. TrustScope never pays
          for or stores your LLM calls. Bring your own key.
        </p>
      </section>

      {/* ── Agent DNA ─────────────────────────────────────────────── */}
      <section className="section-container mt-20 max-w-5xl">
        <p className="eyebrow mb-3">BEHAVIORAL INTELLIGENCE</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Agent DNA: know when your agent changes.
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
          Every agent develops a behavioral fingerprint over time — its tool
          call patterns, cost curve, error recovery style, and reasoning
          quality. TrustScope captures this fingerprint as an 8-strand Agent
          DNA profile and alerts you the moment behavior drifts from
          baseline.
        </p>

        <div className="mt-6 flex items-center gap-2">
          <Fingerprint className="h-5 w-5 text-[var(--interactive)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            8-strand behavioral analysis
          </h3>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {dnaStrands.map((s) => (
            <div key={s.strand} className="card">
              <p className="font-medium text-[var(--text-primary)]">{s.strand}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
          <p className="flex items-start gap-2">
            <Activity className="mt-0.5 h-4 w-4 shrink-0 text-[var(--interactive)]" />
            <span>
              <strong className="text-[var(--text-primary)]">Baseline comparison:</strong> TrustScope
              builds a rolling baseline from your first 50 traces and
              continuously compares new sessions against it.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-[var(--interactive)]" />
            <span>
              <strong className="text-[var(--text-primary)]">Drift alerts:</strong> When any strand
              deviates beyond your configured threshold, TrustScope fires a
              drift alert with full strand-level detail.
            </span>
          </p>
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Available at the Enforce tier. Agent DNA runs across traces, not on
          individual requests.
        </p>
      </section>

      {/* ── Integration Paths ─────────────────────────────────────── */}
      <section className="section-container mt-20 max-w-5xl">
        <p className="eyebrow mb-3">UNIVERSAL GOVERNANCE</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          One engine. Nine ingestion paths.
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
          The same 27 detection engines run regardless of how your data
          arrives. Gateway, SDK, MCP, OTel, CLI — TrustScope governance is
          input-agnostic.
        </p>

        <div className="mt-8 space-y-6">
          {integrationPaths.map((group) => (
            <div key={group.category}>
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                  {group.category}
                </p>
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                  {group.description}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.paths.map((path) => (
                  <article key={path.name} className="card">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                      <path.icon className="h-4 w-4 text-[var(--text-secondary)]" />
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)]">
                      {path.name}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {path.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)]">
          6 of 9 paths support real-time blocking. All 9 produce governance
          evidence.
        </p>
      </section>

      {/* ── Cost & Risk Telemetry ─────────────────────────────────── */}
      <section className="section-container mt-20 max-w-5xl">
        <p className="eyebrow mb-3">COST GOVERNANCE</p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Per-agent spend visibility. Budget enforcement.
        </h2>
        <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
          Every governed trace includes cost telemetry — token usage, model
          pricing, and per-agent spend attribution. Set budget caps that
          alert or block at the thresholds you define. Detect infinite retry
          loops and runaway delegation cascades before they hit your invoice.
        </p>

        <div className="mt-6 card">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--interactive)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Example budget policy
            </h3>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-secondary)]">
            <code>{budgetPolicy}</code>
          </pre>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Most teams start with alert at 80% and block at 100%. Loop kill
            and velocity caps catch runaway patterns before budget thresholds
            are reached.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <article className="card">
            <Brain className="mb-2 h-4 w-4 text-[var(--interactive)]" />
            <h4 className="font-semibold text-[var(--text-primary)]">
              Per-agent attribution
            </h4>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Track spend by agent, model, and team member. See exactly which
              agent is driving cost and why.
            </p>
          </article>
          <article className="card">
            <Activity className="mb-2 h-4 w-4 text-[var(--interactive)]" />
            <h4 className="font-semibold text-[var(--text-primary)]">
              Loop detection
            </h4>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Infinite retry loops, oscillation patterns, and recursive
              delegation chains detected and terminated automatically.
            </p>
          </article>
          <article className="card">
            <Zap className="mb-2 h-4 w-4 text-[var(--interactive)]" />
            <h4 className="font-semibold text-[var(--text-primary)]">
              Velocity caps
            </h4>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Set per-minute request limits to catch burst patterns before
              they translate into uncontrolled spend.
            </p>
          </article>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="section-container mt-20 max-w-5xl">
        <div className="card text-center">
          <h2 className="text-3xl font-bold">
            See what your agents are doing. Start free.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            15 detection engines. Full dashboard. No credit card.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/pricing" className="btn-secondary">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
