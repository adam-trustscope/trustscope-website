import Link from 'next/link'
import { 
  Terminal, Zap, Shield, DollarSign, Bug, Clock,
  ArrowRight, CheckCircle, Copy, AlertTriangle,
  Code, GitBranch, Gauge, Eye
} from 'lucide-react'

// CLI commands showcase
const cliCommands = [
  {
    command: 'trustscope test "What is 2+2?" --agent calculator',
    description: 'Test a prompt through all detection engines',
  },
  {
    command: 'trustscope traces --last 10 --agent customer-support',
    description: 'View recent traces for an agent',
  },
  {
    command: 'trustscope check --detection pii_scan --input "SSN: 123-45-6789"',
    description: 'Test a specific detection engine',
  },
  {
    command: 'trustscope replay trace_abc123 --with-policies',
    description: 'Replay a trace with policy evaluation',
  },
  {
    command: 'trustscope agent list --exposure-score',
    description: 'List agents ranked by risk exposure',
  },
  {
    command: 'trustscope export --agent billing-agent --format json --days 7',
    description: 'Export traces for debugging or compliance',
  },
]

// Developer pain points we solve
const painPoints = [
  {
    icon: DollarSign,
    problem: '"Why is my OpenAI bill $10K?"',
    solution: 'Loop detection kills runaway agents at iteration 10, not iteration 10,000.',
    feature: 'Loop Killer',
  },
  {
    icon: Bug,
    problem: '"Why did my agent do that?"',
    solution: 'Full trace capture with inputs, outputs, tool calls, and token counts.',
    feature: 'Trace Capture',
  },
  {
    icon: AlertTriangle,
    problem: '"It ran DROP TABLE in production"',
    solution: 'Command firewall blocks destructive operations before they execute.',
    feature: 'Command Firewall',
  },
  {
    icon: Clock,
    problem: '"Agents calling agents calling agents..."',
    solution: 'A2A depth limits prevent infinite delegation chains.',
    feature: 'A2A Depth Limit',
  },
  {
    icon: Shield,
    problem: '"It leaked our API keys in a response"',
    solution: 'Secrets scanner detects credentials, tokens, and keys in outputs.',
    feature: 'Secrets Scanner',
  },
  {
    icon: Gauge,
    problem: '"Context window exploded to 100K tokens"',
    solution: 'Token growth detection catches context expansion before costs spike.',
    feature: 'Token Growth',
  },
]

// Quick integration options
const integrations = [
  {
    name: 'One Environment Variable',
    time: '30 seconds',
    code: `# That's it. Seriously.
export OPENAI_BASE_URL=https://gateway.trustscope.ai/v1
export TRUSTSCOPE_API_KEY=ts_live_xxx

# Your existing code just works
python your_agent.py`,
  },
  {
    name: 'Python Decorator',
    time: '2 minutes',
    code: `from trustscope import TrustScope

ts = TrustScope()

@ts.observe("my-agent")
def run_agent(prompt: str):
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )`,
  },
  {
    name: 'CLI Testing',
    time: '10 seconds',
    code: `# Install
npx @trustscope/cli

# Test immediately
trustscope test "Summarize this document" --agent doc-summarizer

# Check what would be blocked
trustscope check --detection command_firewall --input "DROP TABLE users"`,
  },
]

export default function DevelopersPage() {
  return (
    <div className="pt-20">
      {/* Hero - Developer focused */}
      <section className="py-24 bg-gradient-to-b from-emerald-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400">For Developers</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stop debugging in production.
            </h1>
            
            <p className="text-xl text-slate-400 mb-4">
              Your AI agent just cost you $10K. Or leaked credentials. Or dropped a table.
              You're staring at logs trying to figure out why.
            </p>
            
            <p className="text-xl text-white mb-8">
              TrustScope catches these before they happen. Free tier. No credit card. 
              <span className="text-emerald-400"> Start from your terminal.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm flex items-center gap-3">
                <span className="text-slate-500">$</span>
                <span className="text-emerald-400">npx @trustscope/cli</span>
                <button className="text-slate-500 hover:text-white">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <Link href="https://docs.trustscope.ai/quickstart" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Showcase */}
      <section className="py-16 bg-slate-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your new favorite CLI</h2>
            <p className="text-slate-400">Debug, test, and monitor agents without leaving your terminal</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
              <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-sm ml-2">Terminal</span>
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

      {/* Pain Points Grid */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Sound familiar?</h2>
            <p className="text-slate-400">We've heard these from every team running AI agents in production</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div key={i} className="card p-6">
                <point.icon className="w-8 h-8 text-red-400 mb-4" />
                <p className="text-lg font-medium text-white mb-3">{point.problem}</p>
                <p className="text-slate-400 text-sm mb-4">{point.solution}</p>
                <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">
                  {point.feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Speed */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Integration measured in seconds</h2>
            <p className="text-slate-400">Not days. Not sprints. Seconds.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {integrations.map((int, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                  <span className="font-medium">{int.name}</span>
                  <span className="text-emerald-400 text-sm">{int.time}</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-slate-300">{int.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tier Callout */}
      <section className="py-16">
        <div className="section-container">
          <div className="card bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/30 p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Free tier that's actually useful</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    5,000 traces/month
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    8 detection engines (alerts)
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Full CLI access
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    3-day retention
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    No credit card required
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">$0</div>
                <div className="text-slate-400 mb-4">forever</div>
                <Link href="https://app.trustscope.ai" className="btn-primary">
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What you're actually getting</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="card p-6 text-center">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Observability</h3>
              <p className="text-slate-500 text-sm">See every prompt, response, tool call, and token count</p>
            </div>
            
            <div className="card p-6 text-center">
              <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safety Rails</h3>
              <p className="text-slate-500 text-sm">19 detection engines catch problems before users do</p>
            </div>
            
            <div className="card p-6 text-center">
              <GitBranch className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Agent DNA</h3>
              <p className="text-slate-500 text-sm">Behavioral fingerprinting detects drift over time</p>
            </div>
            
            <div className="card p-6 text-center">
              <Code className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Debug Tools</h3>
              <p className="text-slate-500 text-sm">Replay traces, test detections, export for analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Compliance Thing */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Oh, and about compliance...</h2>
            <p className="text-slate-400 mb-6">
              The same traces you use for debugging become evidence when your compliance 
              team needs it. SOC 2 auditor wants evidence your PII scanner ran? You already have it.
              No extra work.
            </p>
            <p className="text-slate-500 text-sm">
              But that's their problem. You're here to build agents that don't catch fire.
            </p>
            <Link href="/compliance" className="text-blue-400 hover:text-blue-300 text-sm mt-4 inline-block">
              (Compliance people click here) →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start from your terminal</h2>
          
          <div className="bg-slate-900 border border-slate-700 rounded-lg px-6 py-4 font-mono text-lg inline-flex items-center gap-3 mb-8">
            <span className="text-slate-500">$</span>
            <span className="text-emerald-400">npx @trustscope/cli && trustscope init</span>
          </div>
          
          <p className="text-slate-400 mb-8">
            You'll have traces flowing in under 5 minutes. We've timed it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="https://docs.trustscope.ai/cli" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              CLI Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
