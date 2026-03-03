import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  Fingerprint,
  Monitor,
  Phone,
  Shield,
  ShieldCheck,
  Sliders,
  Terminal,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Safe Mode',
  description:
    'Local governance layer for AI agents. 15 detection engines, 5 presets, time machine rollback, and phone approvals — no cloud required.',
}

const presets = [
  {
    name: 'coding',
    badge: 'Default',
    description: 'Balanced for software development. Scoped writes, terminal guards, budget caps.',
    budget: '$20/session',
  },
  {
    name: 'personal',
    badge: null,
    description: 'For Claude Desktop personal use. No terminal, no git, filesystem scoped.',
    budget: '$10/session',
  },
  {
    name: 'strict',
    badge: null,
    description: 'Maximum restrictions. Everything requires approval. Read-only filesystem.',
    budget: '$5/session',
  },
  {
    name: 'trading',
    badge: null,
    description: 'Circuit breakers and hard caps for financial operations.',
    budget: '$50/session',
  },
  {
    name: 'yolo',
    badge: null,
    description: 'Maximum autonomy. Catch catastrophes only. For sandboxed environments.',
    budget: '$100/session',
  },
]

const engines = [
  { group: 'Counter Engines (1-8)', items: [
    'Loop Killer', 'Oscillation Detector', 'Velocity Limiter', 'Action Growth',
    'Cost Exposure', 'Latency Spike', 'Error Rate', 'Throughput Drop',
  ]},
  { group: 'Content Scanners (9-10)', items: [
    'PII Scanner', 'Secrets Scanner',
  ]},
  { group: 'Security Scanners (11-12)', items: [
    'Prompt Injection', 'Jailbreak Detector',
  ]},
  { group: 'Rule Engines (13-15)', items: [
    'Command Firewall', 'Budget Cap', 'Action Label Mismatch',
  ]},
]

const clients = [
  'Claude Desktop',
  'Claude Code',
  'Cursor',
  'VS Code',
  'Windsurf',
]

const knobCategories = [
  { name: 'Terminal', count: 10, examples: 'command exec, destructive commands, sudo, package installs, daemons' },
  { name: 'Filesystem', count: 8, examples: 'read, write, delete, symlinks, permissions' },
  { name: 'Git', count: 6, examples: 'commit, push, force push, branch delete, rebase' },
  { name: 'Network', count: 5, examples: 'HTTP, WebSocket, DNS, domain allowlist/blocklist' },
  { name: 'Database', count: 5, examples: 'read, write, delete, schema change, admin' },
  { name: 'Financial', count: 5, examples: 'payments, transfers, subscriptions, refunds' },
  { name: 'API', count: 5, examples: 'read, write, delete, admin, rate limit' },
  { name: 'Communication', count: 5, examples: 'email, messages, notifications, calendar' },
  { name: 'Cloud Infrastructure', count: 5, examples: 'instances, storage, network, IAM' },
  { name: 'Container', count: 4, examples: 'create, delete, image pull, volume mount' },
  { name: 'Package Management', count: 4, examples: 'install, uninstall, update, publish' },
  { name: 'Deployment', count: 4, examples: 'staging, production, rollback, scale' },
  { name: 'Data', count: 4, examples: 'export, import, backup, transform' },
  { name: 'Scheduling', count: 3, examples: 'cron, timers, scheduled tasks' },
  { name: 'Authentication', count: 3, examples: 'credential read/write, sessions' },
  { name: 'Monitoring', count: 3, examples: 'logs, metrics, alerts' },
  { name: 'Browser', count: 3, examples: 'navigate, form submit, download' },
  { name: 'Physical', count: 3, examples: 'IoT commands, hardware, sensors' },
  { name: 'Custom', count: 0, examples: 'your own rules' },
]

const features = [
  {
    icon: Shield,
    title: '15 Detection Engines',
    text: 'Counters, content scanners, ML security models, and rule engines. Under 25ms total latency.',
  },
  {
    icon: Sliders,
    title: '5 Presets, 100+ Knobs',
    text: 'Start with coding, personal, strict, trading, or yolo. Tune every parameter individually.',
  },
  {
    icon: Clock,
    title: 'Time Machine',
    text: 'Automatic file snapshots before every write. Instant rollback to any restore point.',
  },
  {
    icon: Phone,
    title: 'Phone Approvals',
    text: 'Route high-risk actions to Telegram or Discord. Approve or deny from your phone.',
  },
  {
    icon: Fingerprint,
    title: 'Fully Local',
    text: 'No cloud required. No telemetry. No data leaves your machine unless you opt in.',
  },
  {
    icon: Zap,
    title: 'Cloud Upgrade Path',
    text: 'Connect to TrustScope for +12 cloud engines, Agent DNA, compliance evidence, and team dashboards.',
  },
]

export default function SafeModePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      {/* ── Hero ── */}
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">SAFE MODE</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Local guardrails for AI agents.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Safe Mode is a local MCP proxy that sits between your AI editor and
          your tools. 15 detection engines, automatic rollback, and phone
          approvals&nbsp;&mdash; no cloud required.
        </p>
        <div className="mt-8">
          <pre className="mx-auto inline-block rounded-lg border border-[var(--border)] bg-[#0d1117] px-6 py-3 text-left text-sm text-[#c9d1d9]">
            <code>npx safemode init</code>
          </pre>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.trustscope.ai/safe-mode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-2"
          >
            Read the Docs <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/trustscope/safemode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary gap-2"
          >
            <Terminal className="h-4 w-4" /> View on GitHub
          </a>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--text-subtle)]">
          <span>Open source</span>
          <span>No account required</span>
          <span>Works offline</span>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">HOW IT WORKS</p>
        <h2 className="mb-4 text-3xl font-bold">
          One command. Every MCP call governed.
        </h2>
        <div className="card overflow-x-auto">
          <div className="flex min-w-[600px] items-center gap-2 text-sm">
            {['AI Editor', 'Safe Mode Proxy', '15 Engines', 'MCP Servers'].map(
              (step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text-secondary)]">
                    {step}
                  </span>
                  {idx < 3 && (
                    <ArrowRight className="h-4 w-4 text-[var(--text-subtle)]" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Safe Mode detects your MCP clients, patches their configs to route
          through the proxy, and runs every tool call through the detection
          engine pipeline. Original configs are backed up
          to&nbsp;<code className="text-xs">~/.safemode/backup/</code>.
        </p>
      </section>

      {/* ── Supported clients ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">SUPPORTED CLIENTS</p>
        <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-5">
          {clients.map((name) => (
            <div
              key={name}
              className="card !p-4 text-center text-sm font-medium text-[var(--text-secondary)]"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Plus any MCP-compatible client.
        </p>
      </section>

      {/* ── Features grid ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">FEATURES</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="card">
              <f.icon className="h-5 w-5 text-[var(--brand-muted)]" />
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Presets ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">PRESETS</p>
        <h2 className="mb-4 text-3xl font-bold">
          Pick a posture. Tune from there.
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {presets.map((p) => (
            <article key={p.name} className="card">
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-lg font-bold text-[var(--text-primary)]">
                  {p.name}
                </h3>
                {p.badge && (
                  <span className="rounded-md bg-[color:rgba(37,99,235,.14)] px-2 py-0.5 text-xs font-semibold text-[var(--interactive)]">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {p.description}
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">
                Budget cap: {p.budget}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          Switch anytime
          with&nbsp;<code className="text-xs">safemode preset &lt;name&gt;</code>.
          Every knob is individually overridable.
        </p>
      </section>

      {/* ── Knobs ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">GRANULAR CONTROL</p>
        <h2 className="mb-2 text-3xl font-bold">
          19 categories. 92 knobs. Three levels.
        </h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          Every knob is <code className="text-xs">allow</code>,{' '}
          <code className="text-xs">approve</code>, or{' '}
          <code className="text-xs">block</code>. Presets set sensible
          defaults. Override any knob individually.
        </p>

        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Category
                </th>
                <th className="w-16 px-4 py-3 text-center font-semibold text-[var(--text-secondary)]">
                  Knobs
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody>
              {knobCategories.map((cat) => (
                <tr
                  key={cat.name}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">
                    {cat.name}
                  </td>
                  <td className="px-4 py-2.5 text-center text-[var(--text-secondary)]">
                    {cat.count || '—'}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[var(--text-muted)]">
                    {cat.examples}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3 text-center">
            <p className="font-mono text-sm font-bold text-[var(--status-success)]">
              allow
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Action proceeds without interruption
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3 text-center">
            <p className="font-mono text-sm font-bold text-[var(--status-warning)]">
              approve
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Action paused until human approval
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3 text-center">
            <p className="font-mono text-sm font-bold text-[var(--status-danger)]">
              block
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Action denied completely
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-[var(--text-muted)]">
          2 knobs are hardcoded and cannot be overridden:{' '}
          <code className="text-xs">destructive_commands</code> and{' '}
          <code className="text-xs">pipe_to_shell</code> are always blocked.
        </p>
      </section>

      {/* ── Detection Engines ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">DETECTION ENGINES</p>
        <h2 className="mb-4 text-3xl font-bold">
          15 engines. Under 25ms.
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {engines.map((g) => (
            <article key={g.group} className="card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {g.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((name) => (
                  <span
                    key={name}
                    className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          ML security models (prompt injection &amp; jailbreak) are optional.
          Enable
          with&nbsp;<code className="text-xs">safemode ml --enable</code>&nbsp;(~85MB
          download).
        </p>
      </section>

      {/* ── CLI ── */}
      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">CLI</p>
        <div className="card overflow-x-auto !bg-[#0d1117] !p-4">
          <pre className="text-sm leading-relaxed text-[#c9d1d9]">
            <code>{`$ safemode init          # detect clients, pick preset, patch configs
$ safemode start         # start proxy
$ safemode status        # show engines, clients, preset
$ safemode summary       # session stats + restore points
$ safemode restore       # rollback to snapshot
$ safemode scan          # security scan current directory
$ safemode doctor        # health check + diagnostics
$ safemode activity -f   # live activity feed`}</code>
          </pre>
        </div>
      </section>

      {/* ── Cloud upgrade path ── */}
      <section className="section-container mt-14 max-w-5xl">
        <div className="card">
          <div className="flex items-start gap-3">
            <Monitor className="mt-1 h-5 w-5 shrink-0 text-[var(--interactive)]" />
            <div>
              <h2 className="text-2xl font-bold">
                Local first. Cloud when you need it.
              </h2>
              <p className="mt-2 text-[var(--text-secondary)]">
                Safe Mode works entirely offline. When you&apos;re ready for team
                visibility, compliance evidence, and advanced detection,
                connect to TrustScope
                with&nbsp;<code className="text-xs">safemode connect</code>.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    +12 cloud engines
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    PII cloud, anomaly detection, Agent DNA, behavioral fingerprinting
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Team dashboard
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Centralized visibility across all agents and developers
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Compliance evidence
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Signed receipts, hash chains, and framework-mapped exports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-container mt-14 max-w-5xl text-center">
        <ShieldCheck className="mx-auto h-6 w-6 text-[var(--brand)]" />
        <h2 className="mt-3 text-3xl font-bold">
          Try it in sixty seconds.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
          One command. No account. No cloud. Just guardrails.
        </p>
        <div className="mt-6">
          <pre className="mx-auto inline-block rounded-lg border border-[var(--border)] bg-[#0d1117] px-6 py-3 text-sm text-[#c9d1d9]">
            <code>npx safemode init</code>
          </pre>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.trustscope.ai/safe-mode"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-2"
          >
            Read the Docs <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/pricing" className="btn-secondary">
            Compare Plans
          </Link>
        </div>
      </section>
    </div>
  )
}
