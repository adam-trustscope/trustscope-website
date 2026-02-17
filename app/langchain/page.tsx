import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, FileCheck, Lock, GitBranch, Eye } from 'lucide-react'

export const metadata = {
  title: 'LangChain Governance & Security | TrustScope',
  description: 'Add governance, security, and compliance to your LangChain agents in 5 minutes.',
}

const features = [
  { icon: Eye, title: 'Chain Tracing', description: 'Capture every LLM call, tool invocation, and chain step automatically.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block PII, secrets, prompt injections, and other threats before they execute.' },
  { icon: Lock, title: 'Agent Lock', description: "Lock your agent's behavioral fingerprint and detect drift over time." },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographically signed proof of which governance checks ran on every action.' },
]

const detectionEngines = ['PII Scanner (88 patterns)', 'Secrets Detection (50+ patterns)', 'Prompt Injection (40+ patterns)', 'Jailbreak Detection', 'Command Firewall', 'Toxicity Filter', 'Hallucination Detection', 'Data Exfiltration']

export default function LangChainPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-emerald-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-medium">LangChain Integration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your LangChain Agents with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Add policy enforcement, audit trails, and compliance evidence to your LangChain applications in under 5 minutes.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from langchain.agents import AgentExecutor
from trustscope.langchain import TrustScopeCallback

callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    agent_id="support-agent"
)

result = agent.invoke(
    {"input": user_message},
    config={"callbacks": [callback]}
)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-emerald-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration time</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">23</div><div className="text-slate-400 text-sm">Policy types</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">&lt;50ms</div><div className="text-slate-400 text-sm">Added latency P95</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Everything You Need for LangChain Governance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-emerald-400 mb-4" />
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
              <h2 className="text-3xl font-bold mb-6">25 Detection Engines</h2>
              <p className="text-slate-400 mb-8">Every LangChain action runs through TrustScope's detection engines.</p>
              <div className="grid grid-cols-2 gap-3">
                {detectionEngines.map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    policies=["pii_block", "secrets_block", "cost_limit"]
)

try:
    result = agent.invoke(input, callbacks=[callback])
except TrustScopeBlocked as e:
    print(f"Blocked: {e.policy}")`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your LangChain Agents</h2>
          <p className="text-xl text-slate-400 mb-8">Free tier includes 5,000 traces/month. No credit card required.</p>
          <div className="flex gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">Start Free</Link>
            <Link href="/pricing" className="btn-secondary">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
