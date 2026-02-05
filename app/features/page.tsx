import Link from 'next/link'
import {
  Eye, Shield, Lock, FileCheck, Zap,
  ArrowRight, CheckCircle, AlertTriangle,
  Fingerprint, GitBranch, Link2, Terminal,
  FileSearch, ShieldAlert, Brain, Scan,
  Clock, Hash, Award
} from 'lucide-react'

// Detection engines - v16: 11 Discover → 15 Protect → 21 Enforce → 21 Comply (+evidence)
const detectionEngines = [
  // 11 Discover Engines (alert only, cannot block)
  { name: 'Loop Killer', description: '5 identical requests in 60s', icon: GitBranch, tier: 'Discover' },
  { name: 'Velocity', description: '100 req/60s threshold', icon: Clock, tier: 'Discover' },
  { name: 'Oscillation', description: 'A→B→A→B cycle detection', icon: GitBranch, tier: 'Discover' },
  { name: 'Token Growth', description: '50% growth in 3 requests', icon: AlertTriangle, tier: 'Discover' },
  { name: 'Cost Velocity', description: '$5/min spending threshold', icon: Zap, tier: 'Discover' },
  { name: 'Error Rate', description: '50% error rate detection', icon: AlertTriangle, tier: 'Discover' },
  { name: 'Budget Caps', description: 'Session/daily/monthly limits', icon: Zap, tier: 'Discover' },
  { name: 'Context Expansion', description: '>50% growth or >50K tokens', icon: AlertTriangle, tier: 'Discover' },
  { name: 'PII Scanner', description: '88 patterns (alert only)', icon: Scan, tier: 'Discover' },
  { name: 'Session Duration', description: '4hr default limit', icon: Clock, tier: 'Discover' },
  { name: 'Session Actions', description: '500 actions/session limit', icon: Clock, tier: 'Discover' },
  // +4 Protect Engines (can block)
  { name: 'Command Firewall', description: '55+ shell/SQL/code patterns', icon: ShieldAlert, tier: 'Protect+' },
  { name: 'Blocked Phrases', description: 'Org-configured blacklist', icon: ShieldAlert, tier: 'Protect+' },
  { name: 'Secrets Scanner', description: '50+ patterns (AWS, GCP, etc.)', icon: Lock, tier: 'Protect+' },
  { name: 'PII Blocking', description: 'Upgraded: now blocks', icon: Scan, tier: 'Protect+' },
  // +6 Enforce Engines (AI-powered)
  { name: 'Prompt Injection', description: '40+ patterns, ≥0.85 confidence', icon: Brain, tier: 'Enforce+' },
  { name: 'Jailbreak Detector', description: '30+ patterns (DAN, STAN)', icon: Brain, tier: 'Enforce+' },
  { name: 'Semantic Firewall', description: 'Embedding-based detection', icon: Brain, tier: 'Enforce+' },
  { name: 'A2A Depth', description: 'Warn depth 3, block depth 5', icon: GitBranch, tier: 'Enforce+' },
  { name: 'Hallucination', description: '3-layer detection pipeline', icon: Brain, tier: 'Enforce+' },
  { name: 'Reasoning Drift', description: 'LLM reasoning quality check', icon: Brain, tier: 'Enforce+' },
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

// Tier features (v16 Golden Spec)
const tierFeatures = {
  discover: {
    name: 'Discover',
    price: 'Free',
    tagline: 'See everything',
    color: 'slate',
    features: [
      'Trace capture (5K/mo)',
      '11 detection engines (alert only)',
      'Platform Discovery (CLI, GitHub, GitLab)',
      'Agent inventory & coverage dashboard',
      '4 basic policies',
      'Discord & Telegram alerts',
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
      'Everything in Discover',
      '20K traces/month',
      '15 detection engines (can block)',
      'Real-time blocking mode',
      '16 policies (11 types)',
      'New agent alerts (Shadow AI)',
      'Slack/Email alerts',
      '30-day retention',
      '3 seats',
    ]
  },
  enforce: {
    name: 'Enforce',
    price: '$99/mo',
    tagline: 'AI + MCP + Control',
    color: 'purple',
    features: [
      'Everything in Protect',
      '100K traces/month',
      '21 engines (AI-powered)',
      '50 policies (20 types)',
      'MCP full suite',
      'Agent DNA + Lock',
      'Drift & expansion alerts',
      'Webhook integrations',
      '1-year retention',
      '5 seats',
    ]
  },
  comply: {
    name: 'Comply',
    price: 'Contact Us',
    tagline: 'Evidence Packs',
    color: 'amber',
    features: [
      'Everything in Enforce',
      '500K+ traces/month',
      '21 engines + evidence artifacts',
      '14-layer governance engine',
      'Evidence Packs & Verifier',
      'Governance certificates',
      'Blockchain anchoring (export)',
      'Compliance exports (EU AI Act, etc.)',
      '3-year retention',
      'Unlimited seats',
      'Priority support + SSO',
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
            <h2 className="text-3xl font-bold mb-4">21 Detection Engines</h2>
            <p className="text-slate-400">11 Discover (alert) + 4 Protect (block) + 6 Enforce (AI-powered)</p>
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
            <span className="text-slate-500 text-sm">All 21 engines. OWASP Agentic Top 10 aligned.</span>
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
              <div key={i} className={`card ${tier.name === 'Comply' ? 'border-amber-500/50 glow' : ''}`}>
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
