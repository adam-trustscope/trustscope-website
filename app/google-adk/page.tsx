import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Cpu, FileCheck, Lock, Eye } from 'lucide-react'

export const metadata = {
  title: 'Google ADK Governance | TrustScope',
  description: 'Governance for Google Agent Development Kit. Monitor actions, A2A protocol support, generate evidence.',
}

const features = [
  { icon: Eye, title: 'Action Monitoring', description: 'Track every agent action, tool call, and function.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats across all agent operations.' },
  { icon: Lock, title: 'Agent Lock', description: "Lock behavioral fingerprint and detect drift." },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for compliance.' },
]

const adkFeatures = ['Agent action tracking', 'Tool invocation logging', 'Function call capture', 'Session management', 'Memory operation monitoring', 'Multi-turn tracking', 'Streaming support', 'A2A protocol support']

export default function GoogleADKPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-red-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-6 h-6 text-red-400" />
                <span className="text-red-400 font-medium">Google ADK</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your Google ADK Agents with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Enterprise governance for Google's Agent Development Kit. Monitor actions, enforce policies, generate evidence.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from google.adk import Agent, Tool
from trustscope import TrustScopeClient

ts = TrustScopeClient(api_key="ts_live_xxx")

agent = Agent(name="research-assistant", tools=[...])

@ts.observe(agent_id="research-assistant")
@ts.enforce(policies=["pii_block", "cost_limit"])
async def run_agent(query: str):
    return await agent.run(query)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-red-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">A2A</div><div className="text-slate-400 text-sm">Protocol support</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">&lt;50ms</div><div className="text-slate-400 text-sm">Latency P95</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Governance for Google ADK</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Complete Agent Visibility</h2>
              <p className="text-slate-400 mb-8">Monitor every action including A2A communications.</p>
              <div className="grid grid-cols-2 gap-3">
                {adkFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`# A2A Protocol Governance
from trustscope.a2a import A2AMonitor

a2a_monitor = A2AMonitor(
    api_key="ts_live_xxx",
    policies=[
        {"type": "chain_depth_limit", "max_depth": 3},
        {"type": "delegation_restriction",
         "allowed_targets": ["approved-agent-*"]}
    ]
)

a2a_client = a2a_monitor.wrap(original_client)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your Google ADK Agents</h2>
          <p className="text-xl text-slate-400 mb-8">Free tier includes 5,000 traces/month.</p>
          <div className="flex gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">Start Free</Link>
            <Link href="/pricing" className="btn-secondary">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
