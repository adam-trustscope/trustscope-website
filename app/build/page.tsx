import Link from 'next/link'
import { ArrowRight, Code2, Terminal, Cpu, Globe, Layers } from 'lucide-react'

const incidents = [
  {
    title: 'The Pre-Launch Leak',
    impact: '$180,000 in discovery and response',
    summary:
      'A staging agent with production credentials exposed customer data during internal testing. Nobody reviewed its output behavior before rollout.',
    prevention: 'PII scanner + secrets scanner in development workflows before deployment.',
  },
  {
    title: 'The Tool Call Gone Wrong',
    impact: '2 days incident response, near-miss on production data',
    summary:
      'An agent granted tool access interpreted a debugging prompt as a destructive action. There was no sandbox validation before prod.',
    prevention: 'Command firewall + tool allowlist validation during development.',
  },
  {
    title: 'The Silent Drift',
    impact: 'Undetected for 3 weeks until customer complaints',
    summary:
      'After a model version bump, the agent started returning hallucinated citations. No baseline comparison existed to catch behavior change.',
    prevention: 'Agent DNA fingerprinting + baseline trace comparison before rollout.',
  },
]

const workflowStages = [
  {
    stage: 'Local',
    icon: Terminal,
    items: ['Browser trace analyzer', 'CLI validation', 'Offline trace review'],
  },
  {
    stage: 'Staging',
    icon: Layers,
    items: ['Gateway proxy integration', 'SDK callbacks', 'Policy simulate mode'],
  },
  {
    stage: 'Production',
    icon: Globe,
    items: ['Continuous monitoring', 'Alert + block modes', 'Evidence generation'],
  },
]

const integrationPaths = [
  {
    name: 'MCP Server',
    code: 'npx @trustscope/mcp-server --demo',
    note: 'IDE-native governance in Claude, Cursor, VS Code, Windsurf.',
  },
  {
    name: 'CLI',
    code: 'npx trustscope scan traces.jsonl',
    note: 'Local validation before deployment. Works offline.',
  },
  {
    name: 'SDK (Python / Node)',
    code: 'from trustscope.langchain import TrustScopeCallbackHandler',
    note: 'Decorators and callbacks for per-agent context and deep trace semantics.',
  },
  {
    name: 'Gateway (Zero Code)',
    code: 'export OPENAI_BASE_URL=https://api.trustscope.ai/gateway',
    note: 'Change one environment variable. Keep your app code unchanged.',
  },
]

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl text-center">
        <p className="eyebrow mb-4">Build</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">You built the agent. You didn&apos;t build the guardrails.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Most teams discover governance gaps after deployment. TrustScope lets you validate behavior, catch drift, and enforce policies from your first commit.
        </p>
        <div className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <code className="text-sm text-[var(--text-primary)]">npx @trustscope/mcp-server --demo</code>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/developers" className="btn-primary gap-2">
            Developer Setup <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/scanner?demo=support-bot" className="btn-secondary">Open Trace Analyzer</Link>
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Real incidents</p>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          Composite scenarios based on recurring development and rollout failures. Names changed. Patterns preserved.
        </p>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <article key={incident.title} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{incident.title}</h2>
                <span className="rounded-md border border-[color:rgba(220,38,38,.35)] bg-[color:rgba(220,38,38,.1)] px-3 py-1 text-xs text-[var(--status-danger)]">
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
        <p className="eyebrow mb-3">Governance across the development lifecycle</p>
        <div className="grid gap-3 md:grid-cols-3">
          {workflowStages.map((stage) => (
            <article key={stage.stage} className="card">
              <div className="mb-3 flex items-center gap-2">
                <stage.icon className="h-4 w-4 text-[var(--interactive)]" />
                <h3 className="text-lg font-semibold">{stage.stage}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--border-hover)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <p className="eyebrow mb-3">Integration paths</p>
        <div className="grid gap-3 md:grid-cols-2">
          {integrationPaths.map((path) => (
            <article key={path.name} className="card">
              <h3 className="text-lg font-semibold">{path.name}</h3>
              <div className="mt-3 rounded-md border border-[var(--border)] bg-[var(--bg)] p-3">
                <code className="text-xs text-[var(--text-primary)]">{path.code}</code>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{path.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-5xl">
        <div className="card text-center">
          <Code2 className="mx-auto h-5 w-5 text-[var(--interactive)]" />
          <h2 className="mt-3 text-3xl font-bold">Don&apos;t ship without governance.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--text-secondary)]">
            Run local validation first, then wire continuous governance into your deployment pipeline.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/scanner?demo=support-bot" className="btn-primary">Open Trace Analyzer</Link>
            <Link href="/pricing" className="btn-secondary">Compare Plans</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
