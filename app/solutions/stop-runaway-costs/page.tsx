import Link from 'next/link'
import { 
  DollarSign, AlertTriangle, Zap, ArrowRight, CheckCircle,
  RefreshCw, Users, TrendingUp, Clock
} from 'lucide-react'

const incidents = [
  {
    title: 'The $10,000 Infinite Loop',
    description: 'Customer support agent got stuck in a verification loop. Repeated 2,847 times overnight.',
    cost: '$10,247',
    detection: 'Loop Killer would have stopped at iteration 10',
  },
  {
    title: 'The Runaway Agent Cascade',
    description: 'Agent A called Agent B, which called Agent C, which called Agent A. 47 agents in a deadlock.',
    cost: '$5,000+',
    detection: 'A2A Depth Limit would have stopped at depth 3',
  },
  {
    title: 'The Context Window Explosion',
    description: 'Agent kept appending to context without summarization. Hit 128K tokens in minutes.',
    cost: '$3,000+',
    detection: 'Token Growth Detection catches 5x expansion',
  },
]

const features = [
  {
    icon: RefreshCw,
    title: 'Loop Killer',
    description: 'Detects repetitive patterns in agent output. Kills runaway loops at iteration 10, not 10,000.',
    tier: 'All tiers (alert) · Protect+ (block)',
  },
  {
    icon: Users,
    title: 'A2A Depth Limits',
    description: 'Prevents infinite agent-to-agent delegation chains. Set max depth per workflow.',
    tier: 'Enforce',
  },
  {
    icon: TrendingUp,
    title: 'Token Growth Detection',
    description: 'Monitors context window growth rate. Alerts when tokens expand faster than expected.',
    tier: 'Protect',
  },
  {
    icon: DollarSign,
    title: 'Budget Caps',
    description: 'Set hard spend limits per agent, per session, per day. Never wake up to a surprise bill.',
    tier: 'Enforce',
  },
  {
    icon: Clock,
    title: 'Velocity Monitoring',
    description: 'Track requests per minute per agent. Catch unusual spikes before they cost you.',
    tier: 'All tiers (alert) · Protect+ (block)',
  },
]

export default function StopRunawayCostsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-red-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <Link href="/solutions" className="text-slate-500 hover:text-slate-300 text-sm mb-4 inline-block">
              ← Solutions
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Stop Runaway Costs</h1>
                <p className="text-red-400 text-lg">"Why is my OpenAI bill $10K?"</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 mb-8">
              AI agents can burn through your API budget overnight. Infinite loops, recursive 
              agent calls, and context window explosions don't wait for business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
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
              <div className="text-3xl font-bold text-red-400">$10K+</div>
              <div className="text-slate-500 text-sm">avg incident cost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">10</div>
              <div className="text-slate-500 text-sm">iterations before kill</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">&lt;50ms</div>
              <div className="text-slate-500 text-sm">detection latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Incidents */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">This happens more than you think</h2>
            <p className="text-slate-400">Real incidents from real teams</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {incidents.map((inc, i) => (
              <div key={i} className="card p-6">
                <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="font-semibold mb-2">{inc.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{inc.description}</p>
                <div className="text-2xl font-bold text-red-400 mb-2">{inc.cost}</div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    {inc.detection}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/incidents" className="text-blue-400 hover:text-blue-300 text-sm">
              See more incidents →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How TrustScope Helps</h2>
            <p className="text-slate-400">Multiple layers of cost protection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{f.description}</p>
                <span className="text-xs text-slate-500">{f.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Detection in Action</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-4">Loop Detection Event</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-slate-300">{`{
  "event": "loop_detected",
  "agent": "customer-support-bot",
  "trace_id": "tr_abc123",
  "pattern": {
    "type": "output_repetition",
    "iterations": 10,
    "threshold": 10,
    "similarity": 0.94
  },
  "action": "blocked",  // Protect tier
  "cost_saved_estimate": "$847.00",
  "timestamp": "2026-01-30T02:14:32Z"
}`}</code>
              </pre>
            </div>

            <p className="text-center text-slate-400 mt-6">
              Caught at iteration 10. Without TrustScope, this would have run until rate limits 
              or your credit card.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Stop burning money on broken agents</h2>
          <p className="text-xl text-slate-400 mb-8">
            Free tier includes Loop Killer alerts. Upgrade to Protect for real-time blocking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/developers" className="btn-secondary">
              Developer Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
