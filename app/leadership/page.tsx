import Link from 'next/link'
import { 
  Users, Shield, AlertTriangle, ArrowRight, CheckCircle,
  TrendingDown, FileCheck, Scale, DollarSign, Building2
} from 'lucide-react'

const risks = [
  {
    title: 'Regulatory Exposure',
    description: 'EU AI Act fines up to €35M or 7% of global revenue. Colorado SB 205 effective Feb 2026.',
    icon: Scale,
  },
  {
    title: 'Legal Liability',
    description: 'Courts are holding companies responsible for AI outputs. See: Air Canada $800 judgment.',
    icon: AlertTriangle,
  },
  {
    title: 'Insurance Gaps',
    description: 'AI liability insurance requires evidence of governance controls—dashboards don\'t count.',
    icon: Shield,
  },
  {
    title: 'Operational Costs',
    description: 'Runaway agents cost $10K+ per incident. One infinite loop can blow your monthly budget.',
    icon: DollarSign,
  },
]

const metrics = [
  { value: '€35M', label: 'Max EU AI Act fine', subtext: 'or 7% global revenue' },
  { value: '$812', label: 'Air Canada AI judgment', subtext: 'chatbot gave wrong refund policy' },
  { value: '6 mo', label: 'Avg remediation time', subtext: 'after failed audit' },
  { value: '47%', label: 'Enterprises affected', subtext: 'by AI hallucinations (IBM 2025)' },
]

const boardQuestions = [
  'What controls do we have on AI agent behavior?',
  'Can we show our AI followed policy for a specific interaction?',
  'What\'s our exposure if an agent makes a costly mistake?',
  'Are we ready for EU AI Act enforcement?',
  'Do we have evidence for our next SOC 2 audit?',
  'Can we get AI liability insurance?',
]

const capabilities = [
  {
    title: 'Exposure Index',
    description: 'Single score showing your AI risk posture. Track improvements over time.',
    icon: TrendingDown,
  },
  {
    title: 'Evidence Packs',
    description: 'Cryptographically signed evidence of control execution for auditors and insurers.',
    icon: FileCheck,
  },
  {
    title: 'Agent Inventory',
    description: 'Complete registry of all AI agents with behavioral fingerprints and risk scores.',
    icon: Building2,
  },
  {
    title: 'Incident Prevention',
    description: '19 detection engines catch problems before they become headlines. 25 with AI-powered engines at Enforce+.',
    icon: Shield,
  },
]

export default function LeadershipPage() {
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
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">For CTOs & Leadership</h1>
                <p className="text-purple-400 text-lg">Sleep at night</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 mb-8">
              Your AI agents are making decisions, taking actions, and creating liability.
              TrustScope gives you visibility into what they're doing and evidence that 
              they're under control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/incidents" className="btn-secondary">
                See What Can Go Wrong
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-red-400">{m.value}</div>
                <div className="text-slate-300 text-sm">{m.label}</div>
                <div className="text-slate-500 text-xs">{m.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Categories */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Risks Are Real</h2>
            <p className="text-slate-400">And growing as AI agents become more autonomous</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {risks.map((risk, i) => (
              <div key={i} className="card p-6">
                <risk.icon className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="font-semibold mb-2">{risk.title}</h3>
                <p className="text-slate-400 text-sm">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Questions */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Questions Your Board Will Ask</h2>
              <p className="text-slate-400">Can you answer them today?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {boardQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{q}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-500 mt-8">
              With TrustScope, the answer to all of these is <span className="text-emerald-400 font-semibold">yes</span>.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Executive Visibility</h2>
            <p className="text-slate-400">Know your AI is under control</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => (
              <div key={i} className="card p-6 text-center">
                <cap.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{cap.title}</h3>
                <p className="text-slate-400 text-sm">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Ready */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Shield className="w-12 h-12 text-purple-400 mb-6" />
                <h2 className="text-3xl font-bold mb-4">Insurance-Ready Evidence</h2>
                <p className="text-slate-400 mb-6">
                  AI liability insurance is becoming mandatory for many industries. 
                  Underwriters want cryptographic evidence of governance controls—not 
                  screenshots of dashboards.
                </p>
                <p className="text-slate-400 mb-6">
                  TrustScope generates the artifacts insurers need: signed attestations, 
                  hash chain verification, and blockchain-anchored timestamps.
                </p>
                <Link href="/solutions/pass-audits" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                  Learn about Evidence Packs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="card p-6 bg-purple-500/5 border-purple-500/20">
                <h3 className="font-semibold mb-4">Insurance Evidence Pack includes:</h3>
                <ul className="space-y-3">
                  {[
                    'Agent inventory with risk scores',
                    'Policy enforcement logs with signatures',
                    'Detection engine test results',
                    'Drift detection reports',
                    'Hash chain verification',
                    'Blockchain timestamp proofs',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Take control of your AI risk</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Start with visibility. Scale to evidence. Be ready when the board, 
            auditors, or insurers ask questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
