'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code2, Cpu, Github, Layers, Zap } from 'lucide-react'

type IntegrationPath = 'gateway' | 'sdk' | 'mcp'

const paths: { id: IntegrationPath; label: string; title: string; blurb: string; code: string }[] = [
  {
    id: 'gateway',
    label: 'Gateway (Zero Code)',
    title: 'Change one environment variable',
    blurb: 'Point your existing OpenAI-compatible calls at TrustScope Gateway and keep your app code unchanged.',
    code: `export OPENAI_BASE_URL=https://api.trustscope.ai/gateway\nexport TRUSTSCOPE_API_KEY=ts_live_abc123`,
  },
  {
    id: 'sdk',
    label: 'SDK (Python / Node)',
    title: 'Instrument directly in code',
    blurb: 'Use decorators/callbacks for per-agent context, policy assignment, and deep trace semantics.',
    code: `from trustscope import TrustScope\nfrom trustscope.langchain import TrustScopeCallbackHandler\n\nts = TrustScope(api_key=\"ts_live_abc123\")\nhandler = TrustScopeCallbackHandler(client=ts)`,
  },
  {
    id: 'mcp',
    label: 'MCP Server (IDE Native)',
    title: 'Run governance tools in your editor',
    blurb: 'Use TrustScope governance workflows from Claude, Cursor, VS Code, and Windsurf via MCP.',
    code: `npx @trustscope/mcp-server\n# exposes 9 governance tools locally`,
  },
]

const frameworks = [
  { label: 'LangChain', href: '/langchain' },
  { label: 'CrewAI', href: '/crewai' },
  { label: 'AutoGen', href: '/autogen' },
  { label: 'OpenAI Agents', href: '/openai-agents' },
  { label: 'Google ADK', href: '/google-adk' },
  { label: 'LlamaIndex', href: '/llamaindex' },
  { label: 'Semantic Kernel', href: '/semantic-kernel' },
  { label: 'Direct API', href: '/direct-api' },
]

const capabilities = [
  { icon: Layers, title: '26 Detection Engines', text: '15 CPU + 5 ML + 6 AI-hybrid across Monitor/Protect/Enforce.' },
  { icon: Zap, title: 'Real-time Blocking', text: 'Policy modes for simulate, alert, and block with fail-open controls.' },
  { icon: Cpu, title: 'Agent DNA Fingerprinting', text: 'Behavioral baselines and drift detection for model/tool changes.' },
  { icon: Code2, title: 'Session Replay', text: 'Reconstruct full request journeys for debugging and incident response.' },
  { icon: Layers, title: 'Cost and Risk Telemetry', text: 'Per-agent spend, velocity, loop, and exposure monitoring in one feed.' },
  { icon: Zap, title: 'Framework Exports', text: 'AIUC-1, NIST AI RMF, ISO 42001, SOC 2, EU AI Act evidence mapping.' },
]

export default function DevelopersPage() {
  const [selected, setSelected] = useState<IntegrationPath>('gateway')
  const current = paths.find((p) => p.id === selected) ?? paths[0]

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <div className="text-center">
          <p className="eyebrow mb-4">Developers</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">Governance from your first line of code.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
            One integration model, multiple entry points. Use gateway, SDK, MCP, or batch ingest and keep the same governance outputs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://docs.trustscope.ai/quickstart" target="_blank" rel="noopener noreferrer" className="btn-primary gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/trustscope" target="_blank" rel="noopener noreferrer" className="btn-secondary gap-2">
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="section-container mt-10 max-w-5xl">
        <div className="card !p-4">
          <p className="eyebrow mb-2">Setup model</p>
          <div className="grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-4">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Gateway proxy for zero-code routing</div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">SDK callbacks for app-level control</div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">MCP tools for IDE-native workflows</div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">Batch ingest for offline trace review</div>
          </div>
        </div>
      </section>

      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">Integration paths</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {paths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelected(path.id)}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                selected === path.id
                  ? 'border-[var(--interactive)] bg-[color:rgba(37,99,235,.12)] text-[var(--text-primary)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
              }`}
            >
              {path.label}
            </button>
          ))}
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold">{current.title}</h2>
          <p className="mt-2 text-[var(--text-secondary)]">{current.blurb}</p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text-secondary)]">
            <code>{current.code}</code>
          </pre>
          <p className="mt-3 text-xs text-[var(--text-subtle)]">If it makes LLM calls, TrustScope can govern it.</p>
        </div>
      </section>

      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">Framework support</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {frameworks.map((framework) => (
            <Link key={framework.href} href={framework.href} className="card !p-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              {framework.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">What you get</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} className="card">
              <item.icon className="h-5 w-5 text-[var(--brand-muted)]" />
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container mt-16 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-2">Open source</p>
          <h2 className="text-2xl font-bold">CLI is MIT licensed</h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Inspect the code, run local checks, and integrate into your own toolchain with no black boxes.
          </p>
          <a href="https://github.com/trustscope" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--interactive)] hover:text-[var(--interactive-hover)]">
            View CLI repository <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="section-container mt-16 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Start with Monitor. Upgrade when you need enforcement.</h2>
        <p className="mt-3 text-[var(--text-secondary)]">5,000 traces/month free. No credit card required.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/scanner" className="btn-primary">Run Trace Analyzer Demo</Link>
          <a href="https://docs.trustscope.ai/quickstart" target="_blank" rel="noopener noreferrer" className="btn-secondary">Read Quickstart</a>
        </div>
      </section>
    </div>
  )
}
