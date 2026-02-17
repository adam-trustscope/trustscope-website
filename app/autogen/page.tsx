import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Users, FileCheck, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'AutoGen Governance & Security | TrustScope',
  description: 'Governance for Microsoft AutoGen multi-agent conversations. Monitor, enforce policies, generate evidence.',
}

const features = [
  { icon: MessageSquare, title: 'Conversation Tracking', description: 'Capture every message in multi-agent conversations.' },
  { icon: Users, title: 'Group Monitoring', description: 'Monitor GroupChat interactions and track communications.' },
  { icon: Shield, title: 'Policy Enforcement', description: 'Block threats across your entire agent group.' },
  { icon: FileCheck, title: 'Evidence Generation', description: 'Cryptographic proof for every conversation.' },
]

const agFeatures = ['ConversableAgent support', 'GroupChat monitoring', 'AssistantAgent tracking', 'UserProxyAgent capture', 'Tool/function logging', 'Code execution monitoring', 'Human input logging', 'Nested chat support']

export default function AutoGenPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-blue-400 font-medium">Microsoft AutoGen</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Govern Your AutoGen Agents with Confidence</h1>
              <p className="text-xl text-slate-400 mb-8">Monitor multi-agent conversations, track GroupChat interactions, enforce policies.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">Start Free <ArrowRight className="w-5 h-5" /></Link>
                <Link href="https://docs.trustscope.ai/sdks/python" className="btn-secondary">View Docs</Link>
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from autogen import AssistantAgent
from trustscope.autogen import TrustScopeMonitor

monitor = TrustScopeMonitor(
    api_key="ts_live_xxx",
    group_id="dev-team"
)

assistant = monitor.wrap(AssistantAgent(...))
user_proxy = monitor.wrap(UserProxyAgent(...))

user_proxy.initiate_chat(assistant, message="...")`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-slate-800">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-blue-400 mb-1">5 min</div><div className="text-slate-400 text-sm">Integration</div></div>
            <div><div className="text-3xl font-bold text-emerald-400 mb-1">25</div><div className="text-slate-400 text-sm">Detection engines</div></div>
            <div><div className="text-3xl font-bold text-purple-400 mb-1">All</div><div className="text-slate-400 text-sm">Agent types</div></div>
            <div><div className="text-3xl font-bold text-amber-400 mb-1">Full</div><div className="text-slate-400 text-sm">Conversation tracking</div></div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl font-bold mb-12 text-center">Built for AutoGen's Conversational Patterns</h2>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Complete Conversation Visibility</h2>
              <p className="text-slate-400 mb-8">See every message exchanged between agents.</p>
              <div className="grid grid-cols-2 gap-3">
                {agFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <pre className="text-sm overflow-x-auto"><code className="text-slate-300">{`from autogen import GroupChat, GroupChatManager

coder = monitor.wrap(coder)
reviewer = monitor.wrap(reviewer)

groupchat = GroupChat(
    agents=[coder, reviewer, manager],
    max_round=10
)

chat_manager = monitor.wrap(GroupChatManager(...))`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start Governing Your AutoGen Agents</h2>
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
