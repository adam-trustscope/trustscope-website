import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Layers, FileCheck, Lock, Puzzle } from 'lucide-react'

export const metadata = {
  title: 'Semantic Kernel Governance | TrustScope',
  description: 'Governance for Microsoft Semantic Kernel. Monitor plugins, enforce policies, generate evidence.',
}

const features = [
  { icon: Puzzle, title: 'Plugin Monitoring', description: 'Track every plugin invocation and function call.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats across all kernel operations.' },
  { icon: Lock, title: 'Agent Lock', description: "Lock kernel's behavioral fingerprint." },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for every action.' },
]

const skFeatures = ['Kernel function tracking', 'Plugin invocation logging', 'Semantic function capture', 'Native function monitoring', 'Memory operation tracking', 'Planner execution logging', 'Chat completion tracking', 'Streaming support']

export default function SemanticKernelPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-cyan-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Semantic Kernel</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your Semantic Kernel Apps with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Enterprise governance for Microsoft Semantic Kernel. Monitor plugins, track functions, enforce policies.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`import semantic_kernel as sk
from trustscope.semantic_kernel import TrustScopeFilter

kernel = sk.Kernel()

ts_filter = TrustScopeFilter(
    api_key="ts_live_xxx",
    agent_id="sk-assistant"
)
kernel.add_filter(ts_filter)

result = await kernel.invoke(...)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-cyan-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">Python/.NET</div><div className="text-slate-400 text-sm">SDK support</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">&lt;50ms</div><div className="text-slate-400 text-sm">Latency P95</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Governance for Semantic Kernel</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-cyan-400 mb-4" />
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
              <h2 className="text-3xl font-bold mb-6">Complete Kernel Visibility</h2>
              <p className="text-slate-400 mb-8">Monitor every operation in your Semantic Kernel application.</p>
              <div className="grid grid-cols-2 gap-3">
                {skFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`// .NET Integration
var builder = Kernel.CreateBuilder();

builder.AddTrustScopeFilter(options =>
{
    options.ApiKey = "ts_live_xxx";
    options.Policies = new[] { "pii_block" };
});

var kernel = builder.Build();`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your Semantic Kernel Apps</h2>
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
