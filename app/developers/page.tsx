'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Github,
  Layers,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react'

type IntegrationPath = 'gateway' | 'python' | 'node' | 'mcp' | 'cli'

const paths: {
  id: IntegrationPath
  label: string
  title: string
  blurb: string
  code: string
}[] = [
  {
    id: 'gateway',
    label: 'Gateway',
    title: 'Change one environment variable',
    blurb:
      'Point your existing OpenAI-compatible calls at TrustScope Gateway. No code changes required.',
    code: `export OPENAI_BASE_URL=https://api.trustscope.ai/gateway
export TRUSTSCOPE_API_KEY=ts_live_abc123`,
  },
  {
    id: 'python',
    label: 'Python',
    title: 'Instrument with decorators and callbacks',
    blurb:
      'Use the Python SDK for per-agent context, policy assignment, and deep trace semantics. Built-in support for LangChain, CrewAI, AutoGen, and LlamaIndex.',
    code: `from trustscope import TrustScope
from trustscope.langchain import TrustScopeCallbackHandler

ts = TrustScope(api_key="ts_live_abc123")
handler = TrustScopeCallbackHandler(client=ts)

# Pass handler to your LangChain agent
agent.run("...", callbacks=[handler])`,
  },
  {
    id: 'node',
    label: 'Node',
    title: 'Add middleware to your Node stack',
    blurb:
      'Use the Node/TypeScript SDK for Express or Fastify middleware hooks and per-request governance.',
    code: `import { TrustScope } from '@trustscope/node'

const ts = new TrustScope({ apiKey: 'ts_live_abc123' })
app.use(ts.middleware())`,
  },
  {
    id: 'mcp',
    label: 'MCP Server',
    title: 'Governance tools inside your editor',
    blurb:
      'Run TrustScope as an MCP server in Claude Desktop, Cursor, VS Code, or Windsurf. Seven governance tools available inline.',
    code: `npx @trustscope/mcp-server

# Tools exposed:
#   trustscope_policy_check    - Check action against policies
#   trustscope_log_action      - Log to immutable audit trail
#   trustscope_run_detection   - Run security detections
#   trustscope_get_traces      - Query audit trail
#   trustscope_create_approval - Request human approval
#   trustscope_compliance_status - Check framework compliance
#   trustscope_get_agent_dna   - Get behavioral fingerprint`,
  },
  {
    id: 'cli',
    label: 'CLI',
    title: 'Scan, watch, and test from the terminal',
    blurb:
      'Scan codebases for ungoverned AI agents, proxy LLM calls with live monitoring, or test prompts through detection engines. Apache-2.0 licensed.',
    code: `# Scan codebase for ungoverned AI agents
npx @trustscope/cli scan .

# Proxy and monitor LLM calls in real time
trustscope watch --port 8080

# Test a prompt through detection engines
trustscope test "ignore previous instructions"

# Export traces for audit
trustscope export --days 30 --format json`,
  },
]

const frameworks = [
  'LangChain',
  'CrewAI',
  'AutoGen',
  'LlamaIndex',
  'OpenAI Agents SDK',
  'Google ADK',
  'Semantic Kernel',
  'Direct API',
]

const mcpClients = [
  'Claude Desktop',
  'Cursor',
  'VS Code + Continue',
  'Windsurf',
]

const cliCommands = [
  { cmd: 'scan', desc: 'Detect ungoverned AI agents, hardcoded keys, missing audit trails' },
  { cmd: 'watch', desc: 'Local proxy with loop detection, velocity limits, and cost caps' },
  { cmd: 'test', desc: 'Run prompts through PII, injection, jailbreak, and toxicity engines' },
  { cmd: 'check', desc: 'Run a specific detection engine against input' },
  { cmd: 'traces', desc: 'Query trace history by agent, time range, or severity' },
  { cmd: 'replay', desc: 'Replay a trace through current policy evaluation' },
  { cmd: 'export', desc: 'Export traces as JSON, CSV, or Parquet' },
  { cmd: 'init', desc: 'Generate .trustscope.yaml and optional CI workflow' },
]

const capabilities = [
  {
    icon: Layers,
    title: '27 Detection Engines',
    text: '15 CPU/regex + 5 cloud + 7 AI-powered across Monitor/Protect/Enforce.',
  },
  {
    icon: Zap,
    title: 'Real-time Blocking',
    text: 'Policy modes for simulate, alert, and block with fail-open controls.',
  },
  {
    icon: Cpu,
    title: 'Agent DNA Fingerprinting',
    text: 'Behavioral baselines, drift detection, tool signatures, and prompt fingerprints.',
  },
  {
    icon: Shield,
    title: 'Immutable Audit Trail',
    text: 'Every governed action gets a signed receipt with hash chain position and optional timestamp anchoring.',
  },
  {
    icon: Code2,
    title: 'Session Replay',
    text: 'Reconstruct full request journeys for debugging and incident response.',
  },
  {
    icon: Zap,
    title: 'Compliance Exports',
    text: 'AIUC-1, NIST AI RMF, ISO 42001, SOC 2, EU AI Act evidence mapping.',
  },
]

export default function DevelopersPage() {
  const [selected, setSelected] = useState<IntegrationPath>('gateway')
  const current = paths.find((p) => p.id === selected) ?? paths[0]

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-5xl">
        <div className="text-center">
          <p className="eyebrow mb-4">DEVELOPERS</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Governance from your first line of code.
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
            One integration model, multiple entry points. Use gateway, SDK,
            MCP, CLI, or batch ingest and get the same governance outputs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://docs.trustscope.ai/developer/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2"
            >
              Developer Handbook <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/trustscope"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary gap-2"
            >
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Setup model ── */}
      <section className="section-container mt-10 max-w-5xl">
        <div className="card !p-4">
          <p className="eyebrow mb-2">SETUP MODEL</p>
          <div className="grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-5">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
              Gateway proxy for zero-code routing
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
              Python / Node SDKs for app-level control
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
              MCP server for IDE-native workflows
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
              CLI for scanning and CI/CD pipelines
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
              Batch ingest for offline trace review
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration paths (tabbed) ── */}
      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">INTEGRATION PATHS</p>
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
          <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[#0d1117] p-4 text-sm leading-relaxed text-[#c9d1d9]">
            <code>{current.code}</code>
          </pre>
          <p className="mt-3 text-xs text-[var(--text-subtle)]">
            If it makes LLM calls, TrustScope can govern it.{' '}
            <a
              href="https://docs.trustscope.ai/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--interactive)]"
            >
              Read quickstart &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ── CLI Commands ── */}
      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">CLI COMMANDS</p>
        <h2 className="mb-4 text-2xl font-bold">
          <Terminal className="mr-2 inline h-5 w-5 text-[var(--brand-muted)]" />
          One tool, eight commands.
        </h2>
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  Command
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--text-secondary)]">
                  What it does
                </th>
              </tr>
            </thead>
            <tbody>
              {cliCommands.map((row) => (
                <tr
                  key={row.cmd}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-sm font-medium text-[var(--text-primary)]">
                    trustscope {row.cmd}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Supports GitHub Actions and GitLab CI.{' '}
          <a
            href="https://docs.trustscope.ai/cli"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--interactive)]"
          >
            Full CLI reference &rarr;
          </a>
        </p>
      </section>

      {/* ── MCP Clients ── */}
      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">MCP SUPPORT</p>
        <h2 className="mb-4 text-2xl font-bold">
          Governance tools in every editor.
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {mcpClients.map((name) => (
            <div
              key={name}
              className="card !p-4 text-center text-sm font-medium text-[var(--text-secondary)]"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Seven tools: policy check, audit logging, detection, trace query,
          human approval, compliance status, and agent DNA.{' '}
          <a
            href="https://docs.trustscope.ai/guides/mcp-setup"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--interactive)]"
          >
            MCP setup guide &rarr;
          </a>
        </p>
      </section>

      {/* ── Framework support ── */}
      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">FRAMEWORK SUPPORT</p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {frameworks.map((name) => (
            <div
              key={name}
              className="card !p-4 text-sm font-medium text-[var(--text-secondary)]"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="section-container mt-16 max-w-5xl">
        <p className="eyebrow mb-3">WHAT YOU GET</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} className="card">
              <item.icon className="h-5 w-5 text-[var(--brand-muted)]" />
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Open source ── */}
      <section className="section-container mt-16 max-w-5xl">
        <div className="card">
          <p className="eyebrow mb-2">OPEN SOURCE</p>
          <h2 className="text-2xl font-bold">CLI is Apache-2.0 licensed</h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Inspect the code, run local checks, and integrate into your own
            toolchain with no black boxes.
          </p>
          <a
            href="https://github.com/trustscope"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--interactive)] hover:text-[var(--interactive-hover)]"
          >
            View CLI repository <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Developer Handbook callout ── */}
      <section className="section-container mt-16 max-w-5xl">
        <div className="card flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[var(--interactive)]" />
            <div>
              <h3 className="text-lg font-semibold">Developer Handbook</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Repository map, local development setup, environment variables,
                deployment runbook, and go-live checklist.
              </p>
            </div>
          </div>
          <a
            href="https://docs.trustscope.ai/developer/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 gap-2"
          >
            Open Handbook <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-container mt-16 max-w-5xl text-center">
        <h2 className="text-3xl font-bold">
          Start with Monitor. Upgrade when you need enforcement.
        </h2>
        <p className="mt-3 text-[var(--text-secondary)]">
          Free. No credit card required.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://app.trustscope.ai/signup" className="btn-primary">
            Start Free
          </a>
          <a
            href="https://docs.trustscope.ai/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Read Quickstart
          </a>
        </div>
      </section>
    </div>
  )
}
