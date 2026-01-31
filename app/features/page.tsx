import Link from 'next/link'
import {
  Eye, Shield, Lock, FileCheck, Zap,
  ArrowRight, CheckCircle, AlertTriangle,
  Fingerprint, GitBranch, Link2, Terminal,
  FileSearch, ShieldAlert, Brain, Scan,
  Clock, Hash, Award
} from 'lucide-react'

// Detection engines - 8 Anomaly (All), 4 Content (Protect+), 4 AI (Enforce+)
const detectionEngines = [
  // 8 Anomaly Engines (All tiers)
  { name: 'Loop Killer', description: 'Catches infinite loops before they burn tokens', icon: GitBranch, tier: 'All' },
  { name: 'Velocity Limit', description: 'Rate spike detection', icon: Clock, tier: 'All' },
  { name: 'Cost Velocity', description: 'Spending spike detection', icon: Zap, tier: 'All' },
  { name: 'Token Growth', description: 'Anomalous token expansion', icon: AlertTriangle, tier: 'All' },
  { name: 'Depth Guard', description: 'Recursion depth limits', icon: GitBranch, tier: 'All' },
  { name: 'Session Timeout', description: 'Long-running session detection', icon: Clock, tier: 'All' },
  { name: 'Error Cascade', description: 'Repeated failure patterns', icon: AlertTriangle, tier: 'All' },
  { name: 'Tool Abuse', description: 'Excessive tool invocations', icon: AlertTriangle, tier: 'All' },
  // 4 Content Engines (Protect+)
  { name: 'PII Scanner', description: '67+ patterns across 3 tiers', icon: Scan, tier: 'Protect+' },
  { name: 'Secrets Detection', description: 'API keys, passwords, tokens', icon: Lock, tier: 'Protect+' },
  { name: 'Command Firewall', description: 'Blocks DROP, DELETE, rm -rf', icon: ShieldAlert, tier: 'Protect+' },
  { name: 'URL Blocklist', description: 'Malicious URL detection', icon: ShieldAlert, tier: 'Protect+' },
  // 4 AI-Powered Engines (Enforce+)
  { name: 'Prompt Injection', description: 'Pattern + semantic detection', icon: Brain, tier: 'Enforce+' },
  { name: 'Jailbreak Defense', description: 'LLM manipulation attempts', icon: Brain, tier: 'Enforce+' },
  { name: 'Hallucination Flag', description: 'Confidence scoring on outputs', icon: Brain, tier: 'Enforce+' },
  { name: 'Behavioral Drift', description: 'Agent personality changes', icon: Brain, tier: 'Enforce+' },
]

// Integration methods
const integrations = [
  { 
    name: 'Gateway Proxy', 
    description: 'Route LLM traffic through TrustScope. Zero code changes.',
    code: 'OPENAI_BASE_URL=https://gateway.trustscope.ai/v1',
    icon: Link2 
  },
  { 
    name: 'SDK', 
    description: 'Instrument your code directly for maximum control.',
    code: 'from trustscope import TrustScope\nts = TrustScope(api_key="...")',
    icon: Terminal 
  },
  { 
    name: 'MCP Server', 
    description: 'Monitor Model Context Protocol tool usage.',
    code: '# Works with Anthropic Claude, etc.',
    icon: FileSearch 
  },
]

// Governance features
const governanceFeatures = [
  { 
    name: 'Agent DNA', 
    description: 'Behavioral fingerprints for every agent. Detect drift before disasters.',
    icon: Fingerprint,
    details: ['System prompt hashing', 'Tool inventory tracking', 'Behavioral baselines', 'Drift detection']
  },
  { 
    name: 'Hash Chain Audit Trail', 
    description: 'Every action linked cryptographically. Tamper-evident by design.',
    icon: Hash,
    details: ['SHA-256 chaining', 'Ed25519 signatures', 'Daily merkle roots', 'SIEM export']
  },
  { 
    name: 'Blockchain Anchoring', 
    description: 'Timestamps anchored via OpenTimestamps for immutable evidence.',
    icon: Hash,
    details: ['Daily anchoring', 'Immutable evidence', 'Third-party verifiable', '50+ year retention']
  },
  { 
    name: 'Governance Certificates', 
    description: 'Signed attestations documenting your AI was under control.',
    icon: Award,
    details: ['Per-agent certs', 'Time-bounded', 'Framework-mapped', 'Auditor-ready']
  },
]

// Tier features
const tierFeatures = {
  observe: {
    name: 'Observe',
    price: 'Free',
    tagline: 'See everything',
    color: 'slate',
    features: [
      'Trace capture (5K/mo)',
      'Session tracking',
      'Agent inventory',
      '8 anomaly detections (alert only)',
      'Dashboard access',
      '3-day retention',
      '1 seat',
    ]
  },
  protect: {
    name: 'Protect',
    price: '$29/mo',
    tagline: 'Block threats',
    color: 'blue',
    features: [
      'Everything in Observe',
      '25K traces/month',
      '12 detection engines',
      'Real-time blocking',
      '5 basic policies',
      '30-day retention',
      'Slack/Email alerts',
      '3 seats',
    ]
  },
  enforce: {
    name: 'Enforce',
    price: '$99/mo',
    tagline: 'Policies + Lock',
    color: 'purple',
    features: [
      'Everything in Protect',
      '100K traces/month',
      '16 engines (AI-powered)',
      '20+ advanced policies',
      'Agent DNA fingerprints',
      'Drift detection',
      'Agent Lock',
      '1-year retention',
      '5 seats',
    ]
  },
  govern: {
    name: 'Govern',
    price: '$499/mo',
    tagline: 'Evidence Packs',
    color: 'amber',
    features: [
      'Everything in Enforce',
      '500K traces/month',
      '14-layer verification',
      'Evidence Packs',
      'Governance certificates',
      'Blockchain anchoring',
      'Compliance exports',
      '3-year retention',
      'Unlimited seats',
      'Priority support',
    ]
  }
}

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="gradient-text">Govern AI Agents</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            From observability to evidence generation. 
            One platform for the entire AI governance lifecycle.
          </p>
          <Link href="https://app.trustscope.ai" className="btn-primary inline-flex items-center gap-2">
            Start Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Integration Methods */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multiple Integration Points</h2>
            <p className="text-slate-400">Capture every agent action, however you deploy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((integration, i) => (
              <div key={i} className="card">
                <integration.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{integration.description}</p>
                <pre className="bg-slate-950 rounded-lg p-3 text-xs text-slate-300 overflow-x-auto">
                  <code>{integration.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Engines */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">16 Detection Engines</h2>
            <p className="text-slate-400">8 anomaly (all tiers) + 4 content (Protect+) + 4 AI-powered (Enforce+)</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detectionEngines.map((engine, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <engine.icon className="w-6 h-6 text-blue-400" />
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    engine.tier === 'All' ? 'bg-slate-700 text-slate-300' :
                    engine.tier === 'Protect+' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>{engine.tier}</span>
                </div>
                <h3 className="font-medium text-sm mb-1">{engine.name}</h3>
                <p className="text-slate-500 text-xs">{engine.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <span className="text-slate-500 text-sm">All 16 engines. OWASP Agentic Top 10 aligned.</span>
          </div>
        </div>
      </section>

      {/* Governance Features */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Patent-Protected Governance</h2>
            <p className="text-slate-400">274 claims across 3 provisional patents</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {governanceFeatures.map((feature, i) => (
              <div key={i} className="card flex gap-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{feature.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="text-slate-500 text-xs flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Tier</h2>
            <p className="text-slate-400">Start free. Upgrade as you grow.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {Object.values(tierFeatures).map((tier, i) => (
              <div key={i} className={`card ${tier.name === 'Govern' ? 'border-amber-500/50 glow' : ''}`}>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{tier.name}</h3>
                  <p className="text-slate-500 text-sm">{tier.tagline}</p>
                </div>
                <div className="text-3xl font-bold mb-6">{tier.price}</div>
                <ul className="space-y-2">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="btn-primary inline-flex items-center gap-2">
              View Full Pricing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Free tier includes 5,000 traces/month. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">
              Start Free Trial
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
