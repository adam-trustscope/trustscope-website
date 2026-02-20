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
  { engine: 'PII Scanner', detects: 'SSN, email, phone, policy/member IDs', tier: 'Monitor+', mode: 'Alert + redact + block' },
  { engine: 'Secrets Scanner', detects: 'API keys, bearer tokens, DB URLs', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Command Firewall', detects: 'Unsafe shell / SQL / tool actions', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Loop Killer', detects: 'Recursive or oscillating agent behavior', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Velocity Monitor', detects: 'Runaway request bursts', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Cost Velocity', detects: 'Spend anomalies and growth spikes', tier: 'Monitor+', mode: 'Alert + block' },
  { engine: 'Context Expansion', detects: 'Context window bloat and drift', tier: 'Monitor+', mode: 'Alert' },
  { engine: 'PII Confidence Model', detects: 'Context-aware sensitive data', tier: 'Protect+', mode: 'Alert + block' },
  { engine: 'Intent Classification', detects: 'Risky user intent patterns', tier: 'Protect+', mode: 'Alert + policy route' },
  { engine: 'Toxicity Scoring', detects: 'Harmful output risk', tier: 'Protect+', mode: 'Alert + block' },
  { engine: 'Prompt Injection (AI)', detects: 'Goal hijacking and instructions tampering', tier: 'Enforce+', mode: 'Alert + block' },
  { engine: 'Jailbreak Detection (AI)', detects: 'Guardrail evasion attempts', tier: 'Enforce+', mode: 'Alert + block' },
  { engine: 'Hallucination Scoring (AI)', detects: 'Ungrounded or fabricated output', tier: 'Enforce+', mode: 'Alert + approval gates' },
  { engine: 'Groundedness / Citation', detects: 'Unsupported claims and missing evidence', tier: 'Enforce+', mode: 'Alert + policy route' },
]

const integrations = [
  {
    method: 'Gateway proxy',
    setup: 'export OPENAI_BASE_URL=https://api.trustscope.ai/gateway',
    bestFor: 'Zero-code rollout in existing apps',
  },
  {
    method: 'Python / Node SDK',
    setup: 'TrustScope client + callback/decorator hooks',
    bestFor: 'Deep per-agent policy control',
  },
  {
    method: 'MCP server',
    setup: 'npx @trustscope/mcp-server',
    bestFor: 'IDE-native governance workflows',
  },
  {
    method: 'Batch trace import',
    setup: 'JSON, JSONL, CSV, TSV, HAR, OTel',
    bestFor: 'Offline and historical analysis',
  },
]

const capabilityGroups = [
  {
    title: 'Know',
    items: [
      '26-engine runtime visibility',
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
    label: 'Monitor Foundation',
    description: 'Rule-based runtime controls available from Monitor tier upward.',
    rows: engineRows.filter((row) => row.tier.startsWith('Monitor')),
  },
  {
    label: 'Protect Layer',
    description: 'ML-assisted controls for contextual risk routing and stronger blocking.',
    rows: engineRows.filter((row) => row.tier.startsWith('Protect')),
  },
  {
    label: 'Enforce Layer',
    description: 'AI-hybrid controls for advanced runtime reasoning and migration risk checks.',
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
          26 detection engines, 4 integration paths, and one runtime governance platform.
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
          <Link href="/scanner" className="btn-primary gap-2">
            Open Trace Analyzer <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/developers" className="btn-secondary gap-2">
            <Code2 className="h-4 w-4" /> Developer Setup
          </Link>
        </div>
      </section>
    </div>
  )
}
