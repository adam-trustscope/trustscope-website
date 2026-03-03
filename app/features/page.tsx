import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowRight, Code2, ShieldCheck } from 'lucide-react'

type EngineRow = {
  engine: string
  detects: string
  tier: string
  mode: string
}

type EngineGroup = {
  label: string
  description: string
  rows: EngineRow[]
}

const engineRows: EngineRow[] = [
  // STATISTICAL (10) - Monitor tier
  { engine: 'Loop Killer', detects: 'Infinite loops and recursive patterns', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Velocity Monitor', detects: 'Request rate and burst patterns', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Cost Velocity', detects: 'Rapid cost increases', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Budget Caps', detects: 'Spending limit enforcement', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Token Growth', detects: 'Token usage growth over time', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'Context Expansion', detects: 'Context window abuse', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'Oscillation Detector', detects: 'A-B-A-B behavioral patterns', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'Error Rate', detects: 'Error frequency and patterns', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'Session Duration', detects: 'Unusually long sessions', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'Session Action Limit', detects: 'Actions per session caps', tier: 'Monitor+', mode: 'Alert + block' },
  // PATTERN / CONTENT (6) - Monitor tier
  { engine: 'Secrets Scanner', detects: '60 patterns: API keys, tokens, DB URLs', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Command Firewall', detects: '56 dangerous command patterns', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Blocked Phrases', detects: 'Custom phrase blocklist', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Prompt Injection', detects: '57 patterns across 8 categories', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Jailbreak Detector', detects: '46 patterns across 6 categories', tier: 'Monitor+', mode: 'Alert + block' },
  // ML / CONTENT (5) - Protect tier
  { engine: 'Action Label Mismatch', detects: 'Safe labels hiding destructive content', tier: 'Protect+', mode: 'Alert' },
  { engine: 'PII Scanner', detects: '90 patterns: SSN, email, phone, IDs', tier: 'Protect+', mode: 'Alert + redact + block' },
  { engine: 'Toxicity Filter', detects: '6 keyword categories', tier: 'Protect+', mode: 'Alert + block' },
  { engine: 'Hate Speech Detector', detects: 'AI-powered hate speech detection', tier: 'Protect+', mode: 'Alert + block' },
  { engine: 'Data Exfiltration', detects: 'Data extraction attempts', tier: 'Protect+', mode: 'Alert + block' },
  // AI HYBRID (6) - Enforce tier
  { engine: 'Semantic Firewall', detects: 'AI-powered intent analysis', tier: 'Enforce+', mode: 'Alert + block' },
  { engine: 'Hallucination Detector', detects: 'Fact verification against sources', tier: 'Enforce+', mode: 'Alert + approval gates' },
  { engine: 'Reasoning Drift', detects: 'Logical inconsistencies', tier: 'Enforce+', mode: 'Alert' },
  { engine: 'A2A Depth', detects: 'Agent-to-agent delegation depth limits', tier: 'Enforce+', mode: 'Alert + block' },
  { engine: 'Tool Parameter Validator', detects: 'Tool call parameter validation', tier: 'Enforce+', mode: 'Alert + block' },
  { engine: 'Reasoning Quality Monitor', detects: 'Reasoning chain quality checks', tier: 'Enforce+', mode: 'Alert' },
  { engine: 'Bias Monitor', detects: 'Aggregate fairness and bias pattern detection', tier: 'Enforce+', mode: 'Alert' },
]

const integrations = [
  {
    method: 'Gateway proxy',
    group: 'Full inline',
    setup: 'export OPENAI_BASE_URL=https://api.trustscope.ai/gateway',
    bestFor: 'Zero-code rollout in existing apps',
  },
  {
    method: 'Python SDK',
    group: 'Full inline',
    setup: 'pip install trustscope + decorators/callbacks',
    bestFor: 'Deep per-agent policy control (Python)',
  },
  {
    method: 'Node SDK',
    group: 'Full inline',
    setup: 'npm install @trustscope/sdk + middleware hooks',
    bestFor: 'Deep per-agent policy control (Node)',
  },
  {
    method: 'MCP server',
    group: 'Full inline',
    setup: 'npx @trustscope/mcp-server',
    bestFor: 'IDE-native governance in Claude, Cursor, VS Code',
  },
  {
    method: 'CLI',
    group: 'Full inline',
    setup: 'npx trustscope scan <file>',
    bestFor: 'CI/CD pipeline checks and local analysis',
  },
  {
    method: 'Webhook listener',
    group: 'Detection + alerting',
    setup: 'POST https://api.trustscope.ai/ingest/webhook',
    bestFor: 'Existing event-driven architectures',
  },
  {
    method: 'Log shipper (Fluentd / Vector)',
    group: 'Detection + alerting',
    setup: 'Sidecar or agent config',
    bestFor: 'High-volume log pipelines',
  },
  {
    method: 'SIEM forwarding',
    group: 'Visibility + evidence',
    setup: 'Splunk, Datadog, or Elastic output plugin',
    bestFor: 'SOC integration and centralized monitoring',
  },
  {
    method: 'Batch trace import',
    group: 'Visibility + evidence',
    setup: 'JSON, JSONL, CSV, TSV, HAR, OTel',
    bestFor: 'Offline and historical analysis',
  },
]

const capabilityGroups = [
  {
    title: 'Know',
    items: [
      '27-engine runtime visibility',
      'Agent DNA fingerprinting + drift detection',
      'Session replay and forensic trace context',
      'Cost and exposure telemetry by agent/model',
    ],
  },
  {
    title: 'Control',
    items: [
      'Policy modes: simulate, alert, block',
      'Inline redaction and command restrictions',
      'Human-approval gates for high-risk actions',
      'Fail-open architecture with explicit controls',
    ],
  },
  {
    title: 'Prove',
    items: [
      'Signed, tamper-evident evidence receipts',
      'Hash-chained history with long retention',
      'Framework exports: AIUC-1, NIST, ISO, SOC 2, EU AI Act',
      'Govern-tier underwriting and audit workflows',
    ],
  },
]

const engineGroups: EngineGroup[] = [
  {
    label: 'Monitor Foundation (15)',
    description: 'CPU/regex runtime controls available from Monitor tier upward.',
    rows: engineRows.filter((row) => row.tier.startsWith('Monitor')),
  },
  {
    label: 'Protect Layer (+5)',
    description: 'Cloud-assisted controls for contextual risk routing and stronger blocking.',
    rows: engineRows.filter((row) => row.tier.startsWith('Protect')),
  },
  {
    label: 'Enforce Layer (+7)',
    description: 'AI-powered controls for advanced runtime reasoning, bias detection, and migration risk checks.',
    rows: engineRows.filter((row) => row.tier.startsWith('Enforce')),
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-6xl text-center">
        <p className="eyebrow mb-4">Features</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Everything TrustScope does.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          27 detection engines, Agent DNA behavioral profiling, 9 integration paths, and one runtime governance platform.
        </p>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <p className="eyebrow mb-3">Detection matrix</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Grouped by control layer so buyers can quickly map capability depth to tier.
        </p>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Engine</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">What it detects</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Tier</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Action mode</th>
              </tr>
            </thead>
            <tbody>
              {engineGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr key={`${group.label}-header`} className="border-b border-[var(--border)] bg-[var(--bg)]">
                    <td colSpan={4} className="px-4 py-2.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">{group.label}</p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{group.description}</p>
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={`${group.label}-${row.engine}`} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{row.engine}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.detects}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.tier}</td>
                      <td className="px-4 py-3 text-[var(--text-secondary)]">{row.mode}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <p className="eyebrow mb-3">Agent DNA behavioral profiling</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Aggregate behavioral analysis that runs across traces, not on individual requests.
        </p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <article className="card">
            <h3 className="text-lg font-semibold">Behavioral Fingerprint</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Tracks agent behavior patterns over time to detect drift from baseline.</p>
          </article>
          <article className="card">
            <h3 className="text-lg font-semibold">Fairness Strand</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Detects systemic bias across outputs. AIUC-1 C003 coverage for aggregate bias patterns.</p>
          </article>
          <article className="card">
            <h3 className="text-lg font-semibold">Migration Drift</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Compares baseline vs candidate agent behavior during model changes.</p>
          </article>
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <p className="eyebrow mb-3">Integration paths</p>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Method</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Setup</th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">Best for</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((row) => (
                <tr key={row.method} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{row.method}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">{row.setup}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <p className="eyebrow mb-3">Platform capabilities</p>
        <div className="grid gap-3 md:grid-cols-3">
          {capabilityGroups.map((group) => (
            <article key={group.title} className="card">
              <h2 className="text-2xl font-bold">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--status-success)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl text-center">
        <h2 className="text-3xl font-bold">See it on your own data.</h2>
        <p className="mt-3 text-[var(--text-secondary)]">Run local analysis first, then move to continuous governance.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary gap-2">
            Start Free <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/developers" className="btn-secondary gap-2">
            <Code2 className="h-4 w-4" /> Developer Setup
          </Link>
        </div>
      </section>
    </div>
  )
}
