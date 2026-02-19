import Link from 'next/link'
import { 
  Bug, ArrowRight, Terminal, GitBranch, 
  Eye, Clock, Activity, Search, Repeat
} from 'lucide-react'

const cliCommands = [
  {
    command: 'trustscope traces --last 10 --agent customer-support',
    description: 'View recent traces for an agent',
  },
  {
    command: 'trustscope replay tr_abc123 --verbose',
    description: 'Replay a specific trace with full context',
  },
  {
    command: 'trustscope diff tr_abc123 tr_def456',
    description: 'Compare two traces to spot differences',
  },
  {
    command: 'trustscope agent dna customer-support --history 7d',
    description: 'View behavioral fingerprint over time',
  },
]

const features = [
  {
    icon: Eye,
    title: 'Full Trace Capture',
    description: 'Every prompt, response, tool call, and token count. Nothing hidden.',
    detail: 'Capture everything without modifying your agent code.',
  },
  {
    icon: Terminal,
    title: 'CLI Replay',
    description: 'Reproduce issues locally by replaying exact trace sequences.',
    detail: 'trustscope replay tr_abc123 --with-policies',
  },
  {
    icon: GitBranch,
    title: 'Agent DNA',
    description: 'Behavioral fingerprinting tracks how your agent responds over time.',
    detail: 'Detect drift before users notice.',
  },
  {
    icon: Activity,
    title: 'Drift Detection',
    description: 'Automatic alerts when agent behavior changes unexpectedly.',
    detail: 'Compare current vs baseline fingerprints.',
  },
  {
    icon: Search,
    title: 'Trace Search',
    description: 'Find specific interactions by content, user, agent, or outcome.',
    detail: 'Full-text search across all captured traces.',
  },
  {
    icon: Clock,
    title: 'Latency Analysis',
    description: 'See where time is spent: LLM calls, tool execution, overhead.',
    detail: 'Identify bottlenecks in your agent workflow.',
  },
]

export default function DebugAgentsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-purple-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <Link href="/solutions" className="text-slate-500 hover:text-slate-300 text-sm mb-4 inline-block">
              ← Solutions
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Bug className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Debug Agent Behavior</h1>
                <p className="text-purple-400 text-lg">"Why did my agent do that?"</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 mb-8">
              Agents are black boxes. When something goes wrong, you need full visibility 
              into what happened—not a dashboard, but actual traces you can replay and analyze.
            </p>

            <div className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm inline-flex items-center gap-3 mb-8">
              <span className="text-slate-500">$</span>
              <span className="text-emerald-400">npm install -g @trustscope/cli</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/developers" className="btn-secondary">
                Developer Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">&lt;50ms</div>
              <div className="text-slate-500 text-sm">capture latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-slate-500 text-sm">trace coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">5K</div>
              <div className="text-slate-500 text-sm">traces/mo free</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Showcase */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Debug from your terminal</h2>
            <p className="text-slate-400">Not another dashboard to learn</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="p-6 space-y-6">
                {cliCommands.map((cmd, i) => (
                  <div key={i}>
                    <div className="font-mono text-sm">
                      <span className="text-slate-500">$ </span>
                      <span className="text-emerald-400">{cmd.command}</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1 pl-4"># {cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to understand</h2>
            <p className="text-slate-400">Full visibility into agent behavior</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{f.description}</p>
                <code className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                  {f.detail}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent DNA */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <GitBranch className="w-12 h-12 text-purple-400 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Agent DNA</h2>
                <p className="text-slate-400 mb-6">
                  Every agent has a behavioral fingerprint—the patterns in how it responds, 
                  which tools it uses, how long it takes. Agent DNA captures this fingerprint 
                  so you can detect when something changes.
                </p>
                <ul className="space-y-3">
                  {[
                    'Response pattern analysis',
                    'Tool usage distribution',
                    'Latency baseline',
                    'Token consumption trends',
                    'Automatic drift alerts',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300">
                      <Repeat className="w-4 h-4 text-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-slate-300">{`{
  "agent_dna": {
    "agent": "customer-support",
    "fingerprint": "dna_7f8a9b2c",
    "baseline_date": "2026-01-15",
    
    "patterns": {
      "avg_response_tokens": 847,
      "tool_usage": {
        "search_kb": 0.72,
        "escalate": 0.15,
        "create_ticket": 0.13
      },
      "avg_latency_ms": 1240
    },
    
    "drift_status": "stable",
    "similarity_to_baseline": 0.94
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Stop guessing, start understanding</h2>
          <p className="text-xl text-slate-400 mb-8">
            Free tier includes 5K traces/month with full CLI access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/developers" className="btn-secondary">
              CLI Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
