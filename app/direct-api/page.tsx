import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Link2, FileCheck, Lock } from 'lucide-react'

export const metadata = {
  title: 'OpenAI & Anthropic API Governance | TrustScope',
  description: 'Governance for direct LLM API calls. Zero code changes with Gateway proxy.',
}

const features = [
  { icon: Link2, title: 'Gateway Proxy', description: 'Route API calls through TrustScope with a single URL change.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats on every API request and response.' },
  { icon: Lock, title: 'Cost Controls', description: 'Set budgets, rate limits, and token caps.' },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for compliance.' },
]

const providers = [
  { name: 'OpenAI', color: 'text-emerald-400' }, { name: 'Anthropic', color: 'text-orange-400' },
  { name: 'Azure OpenAI', color: 'text-blue-400' }, { name: 'Google Vertex AI', color: 'text-red-400' },
  { name: 'Mistral', color: 'text-purple-400' }, { name: 'Groq', color: 'text-cyan-400' },
  { name: 'Together AI', color: 'text-amber-400' }, { name: 'Ollama', color: 'text-slate-400' },
]

export default function DirectAPIPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-slate-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-6 h-6 text-slate-400" />
                <span className="text-slate-400 font-medium">Direct API Integration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern LLM APIs with Zero Code Changes</h1>
              <p className="text-xl text-slate-400 mb-8">Add governance to OpenAI, Anthropic, and other LLM APIs instantly. Just change your base URL.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/gateway" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`# Just change your base URL
export OPENAI_BASE_URL="https://gateway.trustscope.ai/v1"
export TRUSTSCOPE_API_KEY="ts_live_xxx"

# Your existing code works unchanged
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-emerald-400 mb-1">1 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">10+</div><div className="text-slate-400 text-sm">LLM providers</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">&lt;50ms</div><div className="text-slate-400 text-sm">Latency P95</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Governance for Any LLM API</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Supported LLM Providers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {providers.map((p, i) => (
              <div key={i} className="card p-4 text-center">
                <div className={`font-semibold ${p.color}`}>{p.name}</div>
                <div className="text-xs text-emerald-400 mt-1">Full support</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Powerful Policies</h2>
              <p className="text-slate-400 mb-8">Configure policies in the dashboard. No code changes needed.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div><span className="font-medium">Content Filtering</span><p className="text-sm text-slate-400">Block PII, secrets, harmful content</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div><span className="font-medium">Cost Controls</span><p className="text-sm text-slate-400">Set budgets, token limits, rate caps</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div><span className="font-medium">Security Detections</span><p className="text-sm text-slate-400">Detect prompt injections, jailbreaks</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div><span className="font-medium">Loop Protection</span><p className="text-sm text-slate-400">Prevent runaway agent loops</p></div>
                </li>
              </ul>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`# Policies configured in dashboard
policies:
  - type: pii_block
    mode: block
  - type: rate_limit
    max: 100
    window: 1m
  - type: budget_cap
    max_cost: 50.00
    window: 1d
  - type: prompt_injection
    mode: block
  - type: loop_killer
    threshold: 5`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your LLM APIs</h2>
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
