import Link from 'next/link'
import { ArrowRight, Plug, Code2, Terminal, Globe, Layers, FileJson, Radio, Webhook, Server } from 'lucide-react'

const rows = [
  {
    label: 'Full inline governance — can block',
    paths: [
      { name: 'Gateway Proxy', desc: 'Change one env var. Zero-code governance.', icon: Plug },
      { name: 'Python SDK', desc: 'Decorators for LangChain, CrewAI, and custom agents.', icon: Code2 },
      { name: 'Node.js SDK', desc: 'Middleware for Express, Fastify, and OpenAI Agents.', icon: Terminal },
      { name: 'Endpoint Bridge', desc: 'Connected endpoints report to cloud automatically.', icon: Server },
    ],
  },
  {
    label: 'Detection + alerting',
    paths: [
      { name: 'MCP Server', desc: 'IDE-native governance tools.', icon: Layers },
      { name: 'Framework Callbacks', desc: 'LangChain, CrewAI, AutoGen hooks.', icon: Webhook },
    ],
  },
  {
    label: 'Visibility + evidence',
    paths: [
      { name: 'CLI Scan', desc: 'Offline batch analysis on trace files.', icon: FileJson },
      { name: 'Direct API', desc: 'POST traces from any source.', icon: Globe },
      { name: 'OTel Fanout', desc: 'Plug into existing observability pipelines.', icon: Radio },
    ],
  },
]

export default function UniversalGovernance() {
  return (
    <section className="section-container py-16">
      <p className="eyebrow mb-4">UNIVERSAL GOVERNANCE</p>
      <h2 className="mb-4 text-4xl font-bold text-[var(--text-primary)]">
        One engine. Every ingestion path.
      </h2>
      <p className="mb-10 max-w-3xl text-[var(--text-secondary)]">
        It doesn&apos;t matter how your AI agents run. Gateway proxy, SDK decorator, MCP server,
        OTel pipeline, or direct API — the same 27 engines, the same policies, the same evidence
        chain governs all of them.
      </p>

      <div className="space-y-8">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {row.label}
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {row.paths.map((path) => (
                <div key={path.name} className="card flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                    <path.icon className="h-4 w-4 text-[var(--text-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{path.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{path.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-[var(--text-muted)]">
        6 of 9 paths support real-time blocking. All 9 produce governance evidence.
      </p>

      <Link
        href="/visibility"
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]"
      >
        See Integration Options <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
