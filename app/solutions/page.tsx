import Link from 'next/link'
import { 
  ArrowRight, DollarSign, Shield, Bug, FileCheck,
  Terminal, Scale, Zap, Users
} from 'lucide-react'

// Use cases
const useCases = [
  {
    slug: 'stop-runaway-costs',
    icon: DollarSign,
    title: 'Stop Runaway Costs',
    problem: '"Why is my OpenAI bill $10K?"',
    description: 'Loops, cascades, and token explosions happen. Catch them before your CFO does.',
    features: ['Loop Killer', 'Budget Caps', 'Token Growth Detection', 'A2A Depth Limits'],
    color: 'red',
  },
  {
    slug: 'prevent-data-leaks',
    icon: Shield,
    title: 'Prevent Data Leaks',
    problem: '"It leaked our API keys in a response"',
    description: 'PII in outputs. Credentials in context. Sensitive data where it shouldn\'t be.',
    features: ['PII Scanner (88 patterns)', 'Secrets Scanner (50+)', 'Command Firewall (55+)', 'Data Boundary Enforcement'],
    color: 'amber',
  },
  {
    slug: 'debug-agents',
    icon: Bug,
    title: 'Debug Agent Behavior',
    problem: '"Why did my agent do that?"',
    description: 'Full visibility into every prompt, response, tool call, and decision.',
    features: ['Full Trace Capture', 'CLI Replay', 'Agent DNA Fingerprints', 'Drift Detection'],
    color: 'purple',
  },
  {
    slug: 'pass-audits',
    icon: FileCheck,
    title: 'Pass Compliance Audits',
    problem: '"Show me your AI followed policy"',
    description: 'When auditors ask for evidence, give them cryptographic evidence—not dashboards.',
    features: ['Evidence Packs', 'Framework Mapping', 'Hash Chain Verification', 'Blockchain Anchoring'],
    color: 'blue',
  },
]

// Personas
const personas = [
  {
    slug: '/developers',
    icon: Terminal,
    title: 'For Developers',
    subtitle: 'Ship agents that don\'t catch fire',
    description: 'CLI-first debugging, 30-second integration, free tier that\'s actually useful.',
    cta: 'pip install trustscope-cli',
    color: 'emerald',
  },
  {
    slug: '/compliance',
    icon: Scale,
    title: 'For Compliance',
    subtitle: 'Evidence, not dashboards',
    description: 'SOC 2, EU AI Act, NIST AI RMF, ISO 42001—with control-level mapping.',
    cta: 'View framework coverage',
    color: 'blue',
  },
  {
    slug: '/leadership',
    icon: Users,
    title: 'For CTOs',
    subtitle: 'Sleep at night',
    description: 'Know your AI agents are under control. Reduce liability, get insurance-ready.',
    cta: 'See your exposure',
    color: 'purple',
  },
]

export default function SolutionsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            What are you solving for?
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            TrustScope helps teams ship AI agents safely—whether you're debugging 
            in dev or proving compliance in production.
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">By Use Case</h2>
            <p className="text-slate-400">Pick your pain point</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {useCases.map((uc) => (
              <Link 
                key={uc.slug}
                href={`/solutions/${uc.slug}`}
                className="card p-8 hover:border-blue-500/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-${uc.color}-500/10 flex items-center justify-center mb-6`}>
                  <uc.icon className={`w-6 h-6 text-${uc.color}-400`} />
                </div>
                
                <p className="text-slate-500 text-sm italic mb-2">{uc.problem}</p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {uc.title}
                </h3>
                <p className="text-slate-400 mb-6">{uc.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {uc.features.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>
                
                <span className="text-blue-400 flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">By Team</h2>
            <p className="text-slate-400">Different problems, same platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personas.map((p) => (
              <Link
                key={p.slug}
                href={p.slug}
                className={`card p-8 border-${p.color}-500/30 bg-${p.color}-500/5 hover:bg-${p.color}-500/10 transition-all group`}
              >
                <div className={`w-12 h-12 rounded-lg bg-${p.color}-500/20 flex items-center justify-center mb-6`}>
                  <p.icon className={`w-6 h-6 text-${p.color}-400`} />
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 text-${p.color}-400`}>{p.title}</h3>
                <p className="text-white font-medium mb-3">{p.subtitle}</p>
                <p className="text-slate-400 mb-6">{p.description}</p>
                
                <span className={`text-${p.color}-400 flex items-center gap-2 text-sm group-hover:gap-3 transition-all`}>
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Typical Journey</h2>
            <p className="text-slate-400">Start with debugging. Scale to compliance.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { tier: 'Discover', price: 'Free', desc: '11 engines, see everything', icon: Bug },
                { tier: 'Protect', price: '$29', desc: '15 engines, block threats', icon: Shield },
                { tier: 'Enforce', price: '$99', desc: '21 engines + AI + MCP', icon: Zap },
                { tier: 'Comply', price: 'Contact Us', desc: 'Evidence Packs + certificates', icon: FileCheck },
              ].map((t, i) => (
                <div key={i} className="relative">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-slate-700 z-10" />
                  )}
                  <div className="card p-4 text-center h-full">
                    <t.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                    <div className="font-semibold">{t.tier}</div>
                    <div className="text-slate-500 text-sm mb-2">{t.price}</div>
                    <div className="text-slate-400 text-xs">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-8">
              Most teams start at Discover or Protect, then upgrade when compliance requirements kick in.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Free tier. No credit card. 5 minutes to first trace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
