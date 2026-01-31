import Link from 'next/link'
import { 
  ArrowRight, CheckCircle, AlertTriangle, 
  Fingerprint, Search, Brain, FileCheck,
  Shield, Zap
} from 'lucide-react'

export default function HallucinationDetectionPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-300">Now Available</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Hallucination Detection
          </h1>
          
          <p className="text-2xl text-slate-400 mb-4">
            Not just detection. <span className="text-white font-semibold">Evidence.</span>
          </p>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
            The difference between "we think we caught it" and 
            "here's the signed, timestamped evidence."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="btn-secondary">
              See Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="section-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '47%', label: 'of enterprises made decisions based on hallucinated AI content', source: 'IBM 2025' },
              { value: '76%', label: 'now require human-in-the-loop for AI outputs', source: 'IBM 2025' },
              { value: '$5M', label: 'annual compliance cost for hallucination mitigation', source: 'Deloitte' },
              { value: '6%', label: 'of global revenue in potential EU AI Act fines', source: 'EU AI Act' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="text-xs text-slate-600 mt-1">{stat.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="card bg-red-500/10 border-red-500/30 p-8">
              <p className="text-lg text-slate-300 mb-4">
                Your AI agent told a customer their refund was <span className="text-red-400 font-semibold">$500</span>.
              </p>
              <p className="text-lg text-slate-300 mb-4">
                The tool actually returned <span className="text-emerald-400 font-semibold">$50</span>.
              </p>
              <p className="text-lg text-slate-300">
                You found out when they complained on Twitter.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-xl text-white font-semibold">
                How do you show your auditor that you had controls in place?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-slate-900/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The TrustScope Difference</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Others */}
            <div className="card bg-red-500/5 border-red-500/20 p-8">
              <h3 className="text-lg font-semibold text-red-400 mb-6">Other Tools</h3>
              <ul className="space-y-4">
                {[
                  '"We detect hallucinations"',
                  'AI checks AI (opinion-based)',
                  'Alert when found',
                  'Dashboard shows issues',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400">
                    <span className="text-red-400 mt-1">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* TrustScope */}
            <div className="card bg-emerald-500/5 border-emerald-500/20 p-8 glow">
              <h3 className="text-lg font-semibold text-emerald-400 mb-6">TrustScope</h3>
              <ul className="space-y-4">
                {[
                  '"We document what your AI saw vs said"',
                  'Ground truth verification (provable)',
                  'Signed evidence receipt for every check',
                  'Export compliance pack for auditors',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-400 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400">Three layers of verification. Most issues caught for free.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                layer: '1',
                name: 'Ground Truth',
                description: 'Compare claims in AI response against actual tool outputs',
                cost: 'FREE',
                confidence: '100%',
                badge: 'Provable',
                badgeColor: 'emerald',
                icon: Search,
              },
              {
                layer: '2',
                name: 'Behavioral Anomaly',
                description: 'Compare against Agent DNA baseline patterns',
                cost: 'FREE',
                confidence: '75-90%',
                badge: 'Statistical',
                badgeColor: 'blue',
                icon: Fingerprint,
              },
              {
                layer: '3',
                name: 'Semantic Consistency',
                description: 'LLM checks for internal contradictions',
                cost: '~$0.001',
                confidence: '70-80%',
                badge: 'AI Analysis',
                badgeColor: 'purple',
                icon: Brain,
              },
            ].map((layer) => (
              <div key={layer.layer} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                    {layer.layer}
                  </div>
                  <h3 className="font-semibold text-lg">{layer.name}</h3>
                </div>
                
                <p className="text-slate-400 text-sm mb-4">{layer.description}</p>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className={`px-2 py-1 rounded bg-${layer.badgeColor}-500/20 text-${layer.badgeColor}-400`}>
                    {layer.badge}
                  </span>
                  <span className="text-slate-500">{layer.confidence} confidence</span>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <span className={`text-lg font-bold ${layer.cost === 'FREE' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {layer.cost}
                  </span>
                  <span className="text-slate-500 text-sm ml-2">per check</span>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-8">
            Layers run in order. Most hallucinations caught in Layers 1-2 (free). LLM only used for edge cases.
          </p>
        </div>
      </section>

      {/* Evidence Receipt Demo */}
      <section id="demo" className="py-24 bg-slate-900/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Every Check Creates Evidence</h2>
            <p className="text-slate-400">Not just "we found something" — cryptographic evidence you checked.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-4">Evidence Receipt</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-slate-300">{`{
  "receipt_id": "rcpt_7a8b9c2d",
  "trace_id": "tr_abc123",
  "check_type": "hallucination_ground_truth",
  "timestamp": "2026-01-30T14:23:01.234Z",
  
  "result": "FLAGGED",
  "confidence": 1.0,
  "provable": true,
  
  "evidence": {
    "claim": "Account balance is $50,000",
    "tool_name": "get_balance",
    "tool_returned": 12000,
    "claim_stated": 50000
  },
  
  "verification": {
    "receipt_hash": "sha256:4d5e6f7a8b9c...",
    "signature": "ed25519:2c3d4e5f6g7h...",
    "blockchain_anchor": "ots:abc123..."
  }
}`}</code>
              </pre>
            </div>
            
            <p className="text-center text-slate-400 mt-6">
              Hash-chained. Ed25519 signed. Blockchain-anchored. 
              <span className="text-white font-semibold"> Hand this to your auditor.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <p className="text-slate-400">Start detecting. Upgrade for evidence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Protect',
                price: '$29',
                period: '/month',
                traces: '25K traces',
                description: 'Know about problems',
                features: [
                  { text: 'Ground Truth Detection', included: true },
                  { text: 'Semantic Consistency', included: true },
                  { text: 'Alert on Detection', included: true },
                  { text: 'Behavioral Anomaly', included: false },
                  { text: 'Auto-Block', included: false },
                  { text: 'Evidence Receipts', included: false },
                ],
                cta: 'Start Free Trial',
                highlight: false,
              },
              {
                name: 'Enforce',
                price: '$99',
                period: '/month',
                traces: '100K traces',
                description: 'Stop problems',
                features: [
                  { text: 'Everything in Protect', included: true },
                  { text: 'Behavioral Anomaly (Agent DNA)', included: true },
                  { text: 'Auto-Block on Detection', included: true },
                  { text: 'Custom Thresholds', included: true },
                  { text: 'Evidence Receipts', included: false },
                  { text: 'Compliance Export', included: false },
                ],
                cta: 'Start Free Trial',
                highlight: true,
              },
              {
                name: 'Govern',
                price: '$499',
                period: '/month',
                traces: '500K traces',
                description: 'Document you checked',
                features: [
                  { text: 'Everything in Enforce', included: true },
                  { text: 'Signed Evidence Receipts', included: true },
                  { text: 'Hash Chain Verification', included: true },
                  { text: 'Compliance Export', included: true },
                  { text: 'EU AI Act Evidence Pack', included: true },
                  { text: 'Blockchain Timestamp Anchoring', included: true },
                ],
                cta: 'Contact Sales',
                highlight: false,
              },
            ].map((tier) => (
              <div 
                key={tier.name}
                className={`rounded-xl p-6 ${
                  tier.highlight 
                    ? 'bg-blue-600 border-2 border-blue-400 scale-105 z-10' 
                    : 'bg-slate-900 border border-slate-700'
                }`}
              >
                {tier.highlight && (
                  <div className="text-center text-sm font-semibold text-blue-200 mb-4">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className={`text-sm mb-2 ${tier.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                  {tier.description}
                </p>
                <p className={`text-xs mb-4 ${tier.highlight ? 'text-blue-300' : 'text-slate-500'}`}>
                  {tier.traces}/month
                </p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={tier.highlight ? 'text-blue-200' : 'text-slate-400'}>
                    {tier.period}
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm ${
                      feature.included 
                        ? (tier.highlight ? 'text-white' : 'text-slate-300')
                        : (tier.highlight ? 'text-blue-300/50' : 'text-slate-600')
                    }`}>
                      <span>{feature.included ? '✓' : '—'}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={tier.name === 'Govern' ? '/contact' : 'https://app.trustscope.ai'}
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-slate-800 hover:bg-slate-700 border border-slate-600'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 bg-slate-900/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Compliance Ready</h2>
            <p className="text-slate-400">Maps directly to regulatory requirements</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { framework: 'EU AI Act Article 17', requirement: 'Quality management system documentation' },
              { framework: 'EU AI Act Article 12', requirement: 'Record-keeping and automatic logging' },
              { framework: 'SOC 2 CC8.1', requirement: 'Change and configuration management' },
              { framework: 'NIST AI RMF MAP 2.3', requirement: 'AI capabilities and limitations documented' },
            ].map((item, i) => (
              <div key={i} className="card p-4">
                <div className="text-blue-400 font-semibold text-sm mb-1">{item.framework}</div>
                <div className="text-slate-300 text-sm">{item.requirement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to document your AI is under control?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Start with detection. Upgrade when auditors come knocking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
