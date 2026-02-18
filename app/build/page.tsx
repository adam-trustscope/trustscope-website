'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Terminal,
  Code,
  Cpu,
  Github,
  Zap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { CTASection, CodeBlock, FeatureGrid } from '@/components/ui';

// Metadata moved to layout or head for client component

const INTEGRATION_METHODS = [
  {
    name: 'MCP Server',
    description: '9 governance tools in your IDE',
    code: 'npx @trustscope/mcp-server',
    color: 'text-purple-400',
  },
  {
    name: 'Python SDK',
    description: '4 lines to add governance',
    code: 'pip install trustscope',
    color: 'text-blue-400',
  },
  {
    name: 'Gateway Proxy',
    description: 'Zero code changes',
    code: 'export OPENAI_BASE_URL=https://gateway.trustscope.ai/v1',
    color: 'text-green-400',
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: '19 Detection Engines',
    description: 'Running on every call',
  },
  {
    icon: Cpu,
    title: 'Agent DNA',
    description: 'Behavioral fingerprinting',
  },
  {
    icon: Zap,
    title: 'Real-time Alerts',
    description: 'Discord, Slack, email, webhook',
  },
  {
    icon: BarChart3,
    title: 'Cost Tracking',
    description: 'Per agent, per model',
  },
  {
    icon: Clock,
    title: 'Session Replay',
    description: 'Trace viewer and debugging',
  },
  {
    icon: Code,
    title: '417+ API Endpoints',
    description: 'Full programmatic access',
  },
];

const FRAMEWORKS = [
  'LangChain',
  'CrewAI',
  'AutoGen',
  'LangGraph',
  'OpenAI Agents',
  'Google ADK',
  'Custom',
];

const PYTHON_EXAMPLE = `from trustscope import TrustScope

ts = TrustScope(api_key="ts_live_...")

@ts.monitor(agent_id="my-agent")
def agent_action(prompt):
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )`;

const NODE_EXAMPLE = `import { TrustScope } from '@trustscope/node';
const ts = new TrustScope({ apiKey: 'ts_live_...' });

const result = await ts.monitor({
  agentId: 'my-agent',
  action: () => openai.chat.completions.create({...})
});`;

const MCP_CONFIG = `{
  "mcpServers": {
    "trustscope": {
      "command": "npx",
      "args": ["@trustscope/mcp-server"],
      "env": { "TRUSTSCOPE_API_KEY": "ts_live_..." }
    }
  }
}`;

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
              <Terminal className="w-4 h-4" />
              Developer First
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Governance from your
              <br />
              <span className="text-[#C49B3A]">first line of code.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              <code className="font-mono text-white bg-slate-800 px-2 py-1 rounded">
                npx @trustscope/mcp-server
              </code>
              <br />
              <span className="text-lg">9 governance tools in your IDE. No signup.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://docs.trustscope.ai/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#C49B3A] hover:bg-[#D4A843] text-white transition-colors"
              >
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://docs.trustscope.ai/sdk/overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                SDK Documentation
              </Link>
            </div>
          </div>

          {/* Terminal hero */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-[#0d0f14] border border-slate-800">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-xs text-slate-500 ml-2">Terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="text-slate-500">$ npx @trustscope/mcp-server</div>
                <div className="text-green-400 mt-2">
                  TrustScope MCP Server v1.0.0
                </div>
                <div className="text-slate-400">Loading 9 governance tools...</div>
                <div className="text-white mt-1">
                  Ready. Connected to Claude Desktop.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Paths */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Three Ways to Integrate
            </h2>
            <p className="text-lg text-slate-400">
              Pick what works for your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* MCP */}
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-purple-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-white">MCP Server (IDE)</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                For Claude Desktop, Cursor, VS Code
              </p>
              <CodeBlock code={MCP_CONFIG} language="json" filename="claude_desktop_config.json" />
            </div>

            {/* SDK */}
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">SDK (Code)</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Python and Node side-by-side
              </p>
              <CodeBlock code={PYTHON_EXAMPLE} language="python" />
            </div>

            {/* Gateway */}
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-green-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-green-400" />
                <span className="font-medium text-white">Gateway (Zero Code)</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Just change the base URL
              </p>
              <CodeBlock
                code="export OPENAI_BASE_URL=https://gateway.trustscope.ai/v1"
                language="bash"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Get
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to govern AI agents
            </p>
          </div>

          <FeatureGrid features={FEATURES} columns={3} />
        </div>
      </section>

      {/* Framework Support */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Works With Any Framework
            </h2>
            <p className="text-lg text-slate-400">
              If it makes LLM calls, we govern it
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {FRAMEWORKS.map((framework) => (
              <div
                key={framework}
                className="px-6 py-3 rounded-xl bg-[#1a1f2e] border border-slate-700/50 text-white"
              >
                {framework}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm mb-6">
            <Github className="w-4 h-4" />
            MIT Licensed
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our CLI is Open Source
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            9,084 lines of local governance. MIT licensed.
          </p>
          <Link
            href="https://github.com/trustscope/cli"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to build with governance?"
        subtext="Start with the free tier. 19 engines, 5,000 traces/month, no credit card."
        primaryCTA={{ label: 'Start Building', href: '/docs/getting-started' }}
        secondaryCTA={{ label: 'Read SDK Docs', href: '/docs/sdk/overview' }}
        variant="gradient"
      />
    </main>
  );
}
