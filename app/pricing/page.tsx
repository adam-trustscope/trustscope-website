import Link from 'next/link'
import { CheckCircle, X, ArrowRight, Zap, HelpCircle } from 'lucide-react'

const tiers = [
  {
    name: 'Discover',
    price: 'Free',
    period: '',
    description: 'See what your AI agents are doing',
    highlight: false,
    cta: 'Start Free',
    features: {
      traces: '5,000/month',
      retention: '3 days',
      detections: '11 engines (alert only)',
      seats: '1 seat',
      policies: '4 policies',
      blocking: false,
      discovery: true,
      mcpBasic: true,
      agentDna: false,
      agentLock: false,
      evidencePacks: false,
      certificates: false,
      blockchainAnchoring: false,
      support: 'Community',
    }
  },
  {
    name: 'Protect',
    price: '$29',
    period: '/month',
    description: 'Block threats before they cause damage',
    highlight: false,
    cta: 'Start Trial',
    features: {
      traces: '20,000/month',
      retention: '30 days',
      detections: '15 engines (can block)',
      seats: '3 seats',
      policies: '16 policies',
      blocking: true,
      discovery: true,
      mcpBasic: true,
      agentDna: false,
      agentLock: false,
      evidencePacks: false,
      certificates: false,
      blockchainAnchoring: false,
      support: 'Email',
    }
  },
  {
    name: 'Enforce',
    price: '$99',
    period: '/month',
    description: 'AI-powered security and agent control',
    highlight: true,
    cta: 'Start Trial',
    features: {
      traces: '100,000/month',
      retention: '1 year',
      detections: '21 engines (AI-powered)',
      seats: '5 seats',
      policies: '50 policies',
      blocking: true,
      discovery: true,
      mcpFull: true,
      agentDna: true,
      agentLock: true,
      evidencePacks: false,
      certificates: 'Preview',
      blockchainAnchoring: 'Badge',
      support: 'Email',
    }
  },
  {
    name: 'Comply',
    price: 'Contact Us',
    period: '',
    description: 'Evidence Packs for compliance and audit',
    highlight: false,
    cta: 'Contact Sales',
    features: {
      traces: '500,000+/month',
      retention: '3 years',
      detections: '21 engines + evidence',
      seats: 'Unlimited',
      policies: 'Unlimited',
      blocking: true,
      discovery: true,
      mcpFull: true,
      agentDna: true,
      agentLock: true,
      evidencePacks: true,
      certificates: true,
      blockchainAnchoring: true,
      support: 'Priority',
    }
  },
]

const featureLabels: { [key: string]: string } = {
  traces: 'Monthly traces',
  retention: 'Data retention',
  detections: 'Detection engines',
  seats: 'Team seats',
  policies: 'Policy limit',
  blocking: 'Real-time blocking',
  discovery: 'Platform Discovery',
  mcpBasic: 'MCP Integration (basic)',
  mcpFull: 'MCP Full Suite',
  agentDna: 'Agent DNA fingerprints',
  agentLock: 'Agent Lock',
  evidencePacks: 'Evidence Packs',
  certificates: 'Governance certificates',
  blockchainAnchoring: 'Blockchain anchoring',
  support: 'Support level',
}

const faqs = [
  {
    question: 'What counts as a trace?',
    answer: 'A trace is a single AI agent action captured by TrustScope—an LLM call, tool invocation, or agent decision. Multi-step agent workflows count as multiple traces.'
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes. Upgrade or downgrade at any time. When upgrading, you get immediate access. When downgrading, the change takes effect at your next billing cycle.'
  },
  {
    question: 'What happens if I exceed my trace limit?',
    answer: 'We\'ll notify you at 80% and 100% usage. Discover has a hard cap. Paid tiers can purchase additional traces at overage rates ($1.50/1K for Protect, $1.00/1K for Enforce, $0.80/1K for Comply).'
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes. Annual billing saves 20%. Contact sales for annual pricing on Enforce and Comply tiers.'
  },
  {
    question: 'Is there a free trial for paid tiers?',
    answer: 'Yes. All paid tiers include a 14-day free trial with full features. No credit card required to start.'
  },
  {
    question: 'What\'s included in Evidence Packs?',
    answer: 'Evidence Packs are auditor-ready bundles containing hash-chained logs, signed certificates, framework control mappings, and verification proofs—all exportable as PDF or structured data.'
  },
]

export default function PricingPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Start free. Upgrade when you need more. 
            No surprises, no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className={`rounded-xl p-6 ${
                  tier.highlight 
                    ? 'bg-blue-600 border-2 border-blue-400 scale-105 z-10' 
                    : 'bg-slate-900 border border-slate-700'
                }`}
              >
                {tier.highlight && (
                  <div className="text-center text-sm font-semibold text-blue-200 mb-4 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className={`text-sm mb-4 ${tier.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={tier.highlight ? 'text-blue-200' : 'text-slate-400'}>
                    {tier.period}
                  </span>
                </div>
                
                <Link
                  href={tier.name === 'Comply' ? '/contact' : 'https://app.trustscope.ai'}
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors mb-6 ${
                    tier.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-slate-800 hover:bg-slate-700 border border-slate-600'
                  }`}
                >
                  {tier.cta}
                </Link>

                <ul className="space-y-3">
                  <li className={`text-sm ${tier.highlight ? 'text-white' : 'text-slate-300'}`}>
                    <strong>{tier.features.traces}</strong> traces
                  </li>
                  <li className={`text-sm ${tier.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    {tier.features.retention} retention
                  </li>
                  <li className={`text-sm ${tier.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    {tier.features.detections}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  {tiers.map((tier, i) => (
                    <th key={i} className="text-center py-4 px-4 font-semibold">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(featureLabels).map((key, i) => {
                  // Skip mcpBasic row if any tier has mcpFull
                  if (key === 'mcpBasic') return null;
                  const displayKey = key === 'mcpFull' ? 'MCP' : key;
                  return (
                    <tr key={i} className="border-b border-slate-800">
                      <td className="py-4 px-4 text-slate-400">
                        {key === 'mcpFull' ? 'MCP Integration' : featureLabels[key]}
                      </td>
                      {tiers.map((tier, j) => {
                        const value = key === 'mcpFull'
                          ? (tier.features.mcpFull ? 'Full Suite' : (tier.features.mcpBasic ? 'Basic' : false))
                          : tier.features[key as keyof typeof tier.features];
                        return (
                          <td key={j} className="text-center py-4 px-4">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-300 text-sm">
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-24">
        <div className="section-container">
          <div className="card bg-gradient-to-r from-slate-900 to-slate-800 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Enterprise</h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Custom deployment, SLA guarantees, dedicated infrastructure, 
              and hands-on implementation support.
            </p>
            <ul className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Single-tenant deployment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                99.99% SLA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                BYOK encryption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Custom integrations
              </li>
            </ul>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-lg mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-slate-400 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start for free today</h2>
          <p className="text-xl text-slate-400 mb-8">
            No credit card required. Get started in under 5 minutes.
          </p>
          <Link href="https://app.trustscope.ai" className="btn-primary inline-flex items-center gap-2">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
