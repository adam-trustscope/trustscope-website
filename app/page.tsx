import Link from 'next/link'
import { 
  Shield, ShieldCheck, Lock, FileCheck, Zap, Eye, 
  AlertTriangle, CheckCircle, ArrowRight, Play,
  Building2, Stethoscope, Landmark, ShoppingCart,
  ExternalLink
} from 'lucide-react'

// Stats data
const stats = [
  { value: '47%', label: 'of enterprises made decisions based on hallucinated AI content', source: 'IBM 2025' },
  { value: '76%', label: 'require human-in-the-loop for AI outputs', source: 'IBM 2025' },
  { value: '€35M', label: 'maximum EU AI Act fine for violations', source: 'EU AI Act' },
  { value: '6%', label: 'of global revenue at risk', source: 'EU AI Act Article 99' },
]

// Horror stories - Classic + v16 stories
const horrorStories = [
  {
    company: 'Air Canada',
    incident: 'Chatbot promised discount that didn\'t exist',
    outcome: '$800 judgment against airline',
    icon: '✈️'
  },
  {
    company: 'MCP Supply Chain',
    incident: 'Malicious tool description modification',
    outcome: '10,000 customer records breached',
    icon: '🔗'
  },
  {
    company: 'Multi-Agent Platform',
    incident: 'Rogue delegation spawned 100 child agents',
    outcome: '$50,000 unauthorized transactions',
    icon: '🤖'
  },
]

// Features - v16 tier structure
const features = [
  {
    icon: Eye,
    title: 'Discover',
    description: '11 detection engines with alerts. Platform Discovery finds ungoverned agents. Free forever.',
    tier: 'Free',
  },
  {
    icon: Shield,
    title: 'Protect',
    description: '15 detection engines with real-time blocking. PII, secrets, command firewall.',
    tier: '$29/mo',
  },
  {
    icon: Lock,
    title: 'Enforce',
    description: '21 engines including AI-powered detection. Agent DNA, MCP Trust Scoring, delegation policies.',
    tier: '$99/mo',
  },
  {
    icon: FileCheck,
    title: 'Comply',
    description: 'Evidence Packs with hash chains, blockchain anchoring, and certificates. Audit-ready.',
    tier: 'Contact Us',
  },
]

// Comparison
const comparison = {
  grc: {
    title: 'GRC Tools',
    subtitle: '(Vanta, Drata)',
    items: [
      { text: 'Track compliance journey', bad: true },
      { text: 'Checklist progress', bad: true },
      { text: 'Manual evidence collection', bad: true },
      { text: 'Generic compliance', bad: true },
    ]
  },
  observability: {
    title: 'Observability',
    subtitle: '(LangSmith, Helicone)',
    items: [
      { text: 'See what happened', bad: true },
      { text: 'Debug after the fact', bad: true },
      { text: 'Logs for engineers', bad: true },
      { text: 'No compliance mapping', bad: true },
    ]
  },
  trustscope: {
    title: 'TrustScope',
    subtitle: 'Evidence Infrastructure',
    items: [
      { text: 'Document what ran', bad: false },
      { text: 'Block before damage', bad: false },
      { text: 'Evidence for auditors', bad: false },
      { text: 'Framework-mapped exports', bad: false },
    ]
  }
}

// Frameworks
const frameworks = [
  { name: 'EU AI Act', status: 'Mapped', controls: '8 of 10 requirements' },
  { name: 'NIST AI RMF', status: 'Mapped', controls: '39 of 63 controls' },
  { name: 'SOC 2 Type II', status: 'Mapped', controls: '6 of 10 controls' },
  { name: 'ISO 42001', status: 'Mapped', controls: '18 of 26 controls' },
]

// Industries
const industries = [
  { icon: Landmark, name: 'Financial Services', description: 'Trading, lending, and compliance' },
  { icon: Stethoscope, name: 'Healthcare', description: 'HIPAA-ready AI governance' },
  { icon: Building2, name: 'Enterprise', description: 'SOC 2 and audit-ready' },
  { icon: ShoppingCart, name: 'E-commerce', description: 'Customer-facing AI safety' },
]

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
        
        <div className="section-container relative py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-blue-300">v16: 21 Detection Engines + MCP Trust Scoring</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Evidence Infrastructure
              <br />
              <span className="gradient-text">for AI Agents</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-4">
              Not a score. Not a checklist. <span className="text-white font-semibold">Evidence.</span>
            </p>

            {/* Subtext */}
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
              When an auditor asks "show me your AI agents followed policy," 
              TrustScope gives you cryptographically signed evidence to answer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="https://app.trustscope.ai" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#demo" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Watch Demo
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                SOC 2 Type II
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                274 Patent Claims
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Blockchain Anchored
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/30">
        <div className="section-container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="text-xs text-slate-600 mt-1">{stat.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section - Horror Stories */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Agents Are Breaking Things</h2>
            <p className="text-xl text-slate-400">Every week there's a new disaster. The question isn't IF—it's whether you can document you had safeguards.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {horrorStories.map((story, i) => (
              <div key={i} className="card bg-red-500/5 border-red-500/20">
                <div className="text-4xl mb-4">{story.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{story.company}</h3>
                <p className="text-slate-400 text-sm mb-4">{story.incident}</p>
                <p className="text-red-400 text-sm font-medium">{story.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Gap in the Market</h2>
            <p className="text-xl text-slate-400">GRC tools don't understand agents. Observability tools don't generate evidence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* GRC Tools */}
            <div className="card bg-red-500/5 border-red-500/20">
              <h3 className="font-semibold text-lg mb-1">{comparison.grc.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{comparison.grc.subtitle}</p>
              <ul className="space-y-3">
                {comparison.grc.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                    <span className="text-red-400">✗</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-red-500/20 text-center">
                <span className="text-slate-500 text-sm">CAMERAS</span>
              </div>
            </div>

            {/* Observability */}
            <div className="card bg-amber-500/5 border-amber-500/20">
              <h3 className="font-semibold text-lg mb-1">{comparison.observability.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{comparison.observability.subtitle}</p>
              <ul className="space-y-3">
                {comparison.observability.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                    <span className="text-amber-400">~</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-amber-500/20 text-center">
                <span className="text-slate-500 text-sm">DASHBOARDS</span>
              </div>
            </div>

            {/* TrustScope */}
            <div className="card bg-emerald-500/10 border-emerald-500/30 glow">
              <h3 className="font-semibold text-lg mb-1 text-emerald-400">{comparison.trustscope.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{comparison.trustscope.subtitle}</p>
              <ul className="space-y-3">
                {comparison.trustscope.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="text-emerald-400">✓</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-emerald-500/30 text-center">
                <span className="text-emerald-400 font-semibold text-sm">BRAKES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover. Protect. Enforce. Comply.</h2>
            <p className="text-xl text-slate-400">Start free with 11 engines. Scale to 21 engines + AI detection. Get Evidence Packs when auditors come knocking.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card group hover:glow">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-xs text-slate-500 mb-2">{feature.tier}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/features" className="btn-secondary inline-flex items-center gap-2">
              See All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Audience Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for developers. Ready for compliance.</h2>
            <p className="text-xl text-slate-400">Start with debugging and safety. Scale to evidence when auditors come knocking.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Developer Card */}
            <div className="card p-8 border-emerald-500/30 bg-emerald-500/5">
              <div className="text-emerald-400 text-sm font-medium mb-4">FOR DEVELOPERS</div>
              <h3 className="text-2xl font-bold mb-4">Stop debugging in production</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-emerald-400">→</span>
                  <span>"Why is my OpenAI bill $10K?" — <span className="text-emerald-400">Loop detection kills it at iteration 10</span></span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-emerald-400">→</span>
                  <span>"It ran DROP TABLE" — <span className="text-emerald-400">Command firewall blocks destructive ops</span></span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-emerald-400">→</span>
                  <span>"Why did my agent do that?" — <span className="text-emerald-400">Full trace capture, CLI replay</span></span>
                </li>
              </ul>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm mb-6">
                <span className="text-slate-500">$ </span>
                <span className="text-emerald-400">pip install trustscope-cli</span>
              </div>
              <Link href="/developers" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                Developer docs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Compliance Card */}
            <div className="card p-8 border-blue-500/30 bg-blue-500/5">
              <div className="text-blue-400 text-sm font-medium mb-4">FOR COMPLIANCE</div>
              <h3 className="text-2xl font-bold mb-4">Evidence, not dashboards</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-blue-400">→</span>
                  <span>"Document PII checks ran" — <span className="text-blue-400">Signed receipts with hash chain</span></span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-blue-400">→</span>
                  <span>"Show me CC8.1 evidence" — <span className="text-blue-400">One-click Evidence Pack export</span></span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-blue-400">→</span>
                  <span>"Article 17 QMS?" — <span className="text-blue-400">8 of 10 requirements covered</span></span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-slate-800 rounded text-sm text-slate-300">NIST AI RMF</span>
                <span className="px-3 py-1 bg-slate-800 rounded text-sm text-slate-300">SOC 2</span>
                <span className="px-3 py-1 bg-slate-800 rounded text-sm text-slate-300">EU AI Act</span>
                <span className="px-3 py-1 bg-slate-800 rounded text-sm text-slate-300">ISO 42001</span>
              </div>
              <Link href="/compliance" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                Compliance mapping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Demo Section */}
      <section id="demo" className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Action Creates Evidence</h2>
            <p className="text-xl text-slate-400">Not just logs. Cryptographically signed, tamper-evident evidence.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-950 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-4">Evidence Pack - SOC 2 CC8.1</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-slate-300">{`{
  "evidence_pack_id": "ep_2026_01_soc2_cc8",
  "framework": "SOC 2 Type II",
  "control": "CC8.1 - Change Management",
  "generated_at": "2026-01-30T14:23:01Z",
  
  "evidence_items": [
    {
      "type": "agent_inventory",
      "count": 47,
      "includes": ["fingerprints", "tools", "permissions"]
    },
    {
      "type": "policy_enforcement_logs",
      "count": 12453,
      "blocked": 234
    },
    {
      "type": "drift_detection_reports",
      "alerts": 3,
      "resolved": 3
    }
  ],
  
  "verification": {
    "hash_chain_verified": true,
    "signatures_valid": true,
    "blockchain_anchor": "block 923847",
    "certificate_id": "cert_7a8b9c2d"
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

      {/* Frameworks Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compliance-Ready Evidence</h2>
            <p className="text-xl text-slate-400">Evidence Packs mapped to major regulatory frameworks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {frameworks.map((framework, i) => (
              <div key={i} className="card text-center">
                <h3 className="font-semibold mb-2">{framework.name}</h3>
                <div className="text-emerald-400 text-sm mb-1">{framework.status}</div>
                <div className="text-slate-500 text-xs">{framework.controls}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Regulated Industries</h2>
            <p className="text-xl text-slate-400">Where AI governance isn't optional—it's required</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, i) => (
              <div key={i} className="card text-center group hover:glow">
                <industry.icon className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">{industry.name}</h3>
                <p className="text-slate-500 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to document your AI is under control?
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Start with observability. Upgrade when you need blocking. 
              Get Evidence Packs when auditors come knocking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.trustscope.ai" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>

            <p className="text-slate-500 text-sm mt-8">
              No credit card required. Free tier includes 5,000 traces/month.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
