import Link from 'next/link'
import { ArrowRight, CheckCircle, FileCheck, Shield, Scale, Award, AlertTriangle } from 'lucide-react'

// Framework cards
const frameworks = [
  {
    name: 'AIUC-1',
    slug: 'aiuc1',
    icon: Award,
    description: '"SOC 2 for AI agents" · Microsoft, JPMorgan, Anthropic, 60+ Fortune 500 CISOs',
    coverage: '45 of 51 requirements · 92% mandatory coverage',
    ready: 45,
    badge: 'PRIMARY',
    primary: true,
  },
  {
    name: 'NIST AI RMF',
    slug: 'nist',
    icon: Shield,
    description: 'AI Risk Management Framework',
    coverage: '39 of 63 controls',
    ready: 39,
    badge: 'Most Comprehensive',
  },
  {
    name: 'EU AI Act',
    slug: 'eu-ai-act',
    icon: Scale,
    description: 'Article 17 QMS Requirements',
    coverage: '8 of 10 requirements',
    ready: 8,
    badge: 'Regulatory',
    urgent: true,
  },
  {
    name: 'SOC 2 Type II',
    slug: 'soc2',
    icon: FileCheck,
    description: 'AI-Relevant Trust Service Criteria',
    coverage: '6 of 10 controls',
    ready: 6,
    badge: 'Enterprise Standard',
  },
  {
    name: 'ISO 42001',
    slug: 'iso42001',
    icon: Award,
    description: 'AI Management System Standard',
    coverage: '18 of 26 controls',
    ready: 18,
    badge: 'International',
  },
]

// Evidence model
const evidenceModel = [
  { status: 'Evidence Ready', color: 'emerald', description: 'TrustScope generates automatically' },
  { status: 'Conditional', color: 'purple', description: 'Available if traffic routed through TrustScope' },
  { status: 'Integration Required', color: 'amber', description: 'Needs external integration (Jira, Okta)' },
  { status: 'Customer Provided', color: 'blue', description: 'Customer owns this evidence' },
  { status: 'Organizational', color: 'slate', description: 'HR/culture control outside software scope' },
  { status: 'Out of Scope', color: 'slate', description: 'Not our domain (bias testing, TPRM)' },
]

export default function CompliancePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Framework Evidence Mapping
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
            TrustScope generates evidence mapped to compliance frameworks.
            Not alignment scores—verifiable evidence.
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            We don't track your compliance journey. We generate evidence that auditors 
            and regulators actually need.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Generating Evidence <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Compliance Team
            </Link>
          </div>
        </div>
      </section>

      {/* What We Say vs Don't Say */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card bg-emerald-500/5 border-emerald-500/20 p-6">
              <h3 className="text-emerald-400 font-semibold mb-4">✓ What We Say</h3>
              <p className="text-slate-300 text-lg">
                "TrustScope generates evidence for 39 NIST AI RMF controls"
              </p>
            </div>
            <div className="card bg-red-500/5 border-red-500/20 p-6">
              <h3 className="text-red-400 font-semibold mb-4">✗ What We DON'T Say</h3>
              <p className="text-slate-300 text-lg">
                "TrustScope is 72% aligned with NIST AI RMF"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Cards */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Supported Frameworks</h2>
            <p className="text-slate-400">Click any framework for detailed control mapping</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {frameworks.map((fw, i) => (
              <Link 
                key={i} 
                href={`/compliance/${fw.slug}`}
                className="card p-6 hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <fw.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    {fw.urgent && (
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">
                        Aug 2025 Enforcement
                      </span>
                    )}
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                      {fw.badge}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-xl mb-1 group-hover:text-blue-400 transition-colors">
                  {fw.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{fw.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-emerald-400 font-semibold">{fw.coverage}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Model */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The 6-Status Evidence Model</h2>
            <p className="text-slate-400">Honest categorization of what we can and can't generate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {evidenceModel.map((item, i) => (
              <div key={i} className="card p-4">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-400 mb-3`} />
                <h3 className="font-semibold text-sm mb-1">{item.status}</h3>
                <p className="text-slate-500 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Pack */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <FileCheck className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Evidence Packs</h2>
            <p className="text-slate-400 mb-8">
              The Govern tier ($2K+/mo) includes pre-built Evidence Pack templates with hash chains,
              Ed25519 signatures, and blockchain anchoring. Export as PDF or structured data.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                'SOC 2 CC8 Change Management',
                'EU AI Act Article 17 QMS',
                'Insurance Underwriter Pack',
                'NIST AI RMF Operational',
              ].map((pack, i) => (
                <div key={i} className="card p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-300">{pack}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-900/30">
        <div className="section-container">
          <div className="card bg-amber-500/5 border-amber-500/20 p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-400 mb-2">Legal Disclaimer</h3>
                <p className="text-slate-400 text-sm">
                  TrustScope generates evidence artifacts mapped to compliance frameworks. Evidence 
                  availability depends on configuration, retention, and integration status. Compliance 
                  determination requires qualified assessors. Framework mappings include rationale but 
                  may not reflect official regulatory guidance. Evidence Packs are auditor-consumable, 
                  not auditor-ready—meaning we generate evidence, but compliance determination requires 
                  qualified assessors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to generate compliance evidence?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Start with observation (free), upgrade to evidence generation when auditors come knocking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">
              Get Started Free
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
