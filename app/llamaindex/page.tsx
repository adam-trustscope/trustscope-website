import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Database, FileCheck, Search, Eye } from 'lucide-react'

export const metadata = {
  title: 'LlamaIndex Governance & Security | TrustScope',
  description: 'Governance for LlamaIndex RAG applications. Monitor retrievals, detect hallucinations, generate evidence.',
}

const features = [
  { icon: Search, title: 'Retrieval Tracking', description: 'Monitor every document retrieval and query.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats across all RAG operations.' },
  { icon: Eye, title: 'Hallucination Detection', description: 'Verify responses are grounded in documents.' },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for every query.' },
]

const llamaFeatures = ['Query engine monitoring', 'Retriever call tracking', 'Node postprocessor logging', 'Response synthesizer capture', 'Index operation tracking', 'Agent loop monitoring', 'Tool usage logging', 'Streaming support']

export default function LlamaIndexPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-orange-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-orange-400" />
                <span className="text-orange-400 font-medium">LlamaIndex Integration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your LlamaIndex RAG Apps with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Policy enforcement, hallucination detection, and compliance evidence for LlamaIndex.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from llama_index.core import VectorStoreIndex
from llama_index.core.callbacks import CallbackManager
from trustscope.llamaindex import TrustScopeCallback

ts_callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    agent_id="rag-assistant"
)

callback_manager = CallbackManager([ts_callback])
index = VectorStoreIndex.from_documents(
    documents, callback_manager=callback_manager
)`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-orange-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-blue-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">3-layer</div><div className="text-slate-400 text-sm">Hallucination detection</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">&lt;50ms</div><div className="text-slate-400 text-sm">Latency P95</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Built for RAG Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <f.icon className="w-10 h-10 text-orange-400 mb-4" />
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
              <h2 className="text-3xl font-bold mb-6">Complete RAG Visibility</h2>
              <p className="text-slate-400 mb-8">See every retrieval, document chunk, and synthesis step.</p>
              <div className="grid grid-cols-2 gap-3">
                {llamaFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`ts_callback = TrustScopeCallback(
    api_key="ts_live_xxx",
    policies=[
        "hallucination_detector",
        "context_relevance",
        "pii_block",
    ]
)

response = query_engine.query("What are the risks?")
print(response.metadata["trustscope"]["grounding_score"])`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your LlamaIndex Apps</h2>
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
