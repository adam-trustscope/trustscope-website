import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Users, FileCheck, Workflow } from 'lucide-react'

export const metadata = {
  title: 'CrewAI Governance & Monitoring | TrustScope',
  description: 'Monitor and govern your CrewAI multi-agent workflows. Track delegation, enforce policies, generate evidence.',
}

const features = [
  { icon: Users, title: 'Crew Tracking', description: 'Monitor all agents, tasks, and inter-agent communications.' },
  { icon: Workflow, title: 'Delegation Monitoring', description: 'Track agent delegation and enforce depth limits.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats across your entire crew.' },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for every crew execution.' },
]

const crewFeatures = ['Agent-to-agent delegation', 'Task assignment capture', 'Tool usage per agent', 'Crew session correlation', 'Hierarchical process', 'Sequential process', 'Custom callbacks', 'Memory access logging']

export default function CrewAIPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-purple-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 font-medium">CrewAI Integration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your CrewAI Agents with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Monitor multi-agent workflows, track delegation chains, and enforce policies across your entire crew.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from crewai import Crew
from trustscope.crewai import TrustScopeCallback

callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    crew_id="research-crew"
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    callbacks=[callback]
)

result = crew.kickoff()`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-purple-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-emerald-400 mb-1">Unlimited</div><div className="text-slate-400 text-sm">Agents per crew</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">Full</div><div className="text-slate-400 text-sm">Delegation tracking</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Built for Multi-Agent Workflows</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-purple-400 mb-4" />
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
              <h2 className="text-3xl font-bold mb-6">Complete Crew Visibility</h2>
              <p className="text-slate-400 mb-8">See exactly what every agent in your crew is doing.</p>
              <div className="grid grid-cols-2 gap-3">
                {crewFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    policies=[
        "chain_depth_limit",
        "delegation_restrict",
        "tool_allowlist",
    ]
)

callback.track_agent(
    agent_id="researcher",
    policies=["pii_block"]
)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your CrewAI Agents</h2>
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
