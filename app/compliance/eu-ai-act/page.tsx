import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Circle, Shield, FileCheck, Scale } from 'lucide-react'

// EU AI Act Article 17 Requirements
const article17Requirements = [
  { 
    id: '17(1)(a)', 
    name: 'Regulatory compliance strategy', 
    status: 'ready', 
    evidence: 'Compliance exports',
    rationale: 'Framework-tagged documentation automatically generated',
    details: 'TrustScope maintains framework mappings and generates compliance exports tagged to specific regulatory requirements.'
  },
  { 
    id: '17(1)(b)', 
    name: 'Design verification', 
    status: 'ready', 
    evidence: 'CCE test results',
    rationale: 'Controlled Change Environment validates design changes',
    details: 'Every agent change goes through CCE testing before deployment, with signed certificates proving verification.'
  },
  { 
    id: '17(1)(c)', 
    name: 'Design validation', 
    status: 'ready', 
    evidence: 'Agent DNA baseline',
    rationale: 'DNA fingerprints capture validated behavioral state',
    details: 'Agent DNA creates cryptographic fingerprints of agent behavior, tools, and capabilities as validation baseline.'
  },
  { 
    id: '17(1)(d)', 
    name: 'Examination and testing', 
    status: 'ready', 
    evidence: 'Detection test results',
    rationale: '19 detection engines provide continuous testing',
    details: 'Real-time examination through prompt injection, PII, command firewall, and 13 other detection engines.'
  },
  { 
    id: '17(1)(e)', 
    name: 'Data management', 
    status: 'ready', 
    evidence: 'PII detection logs',
    rationale: 'Data boundary enforcement with 67+ PII patterns',
    details: 'PII Scanner detects and blocks sensitive data across 3 tiers (Critical, High, Medium) with full audit trail.'
  },
  { 
    id: '17(1)(f)', 
    name: 'Risk management', 
    status: 'ready', 
    evidence: 'Exposure Index reports',
    rationale: 'Quantified risk assessment methodology',
    details: 'Agent Exposure Index provides numeric risk scores based on capabilities, data access, and deployment context.'
  },
  { 
    id: '17(1)(g)', 
    name: 'Post-market monitoring', 
    status: 'conditional', 
    evidence: 'Drift detection, alerts',
    rationale: 'Available for agents routed through TrustScope',
    details: 'Continuous monitoring detects behavioral drift, capability expansion, and anomalies—but only for instrumented agents.'
  },
  { 
    id: '17(1)(h)', 
    name: 'Incident reporting', 
    status: 'integration', 
    evidence: 'Jira ticket links',
    rationale: 'Requires Jira integration for ticket creation',
    details: 'TrustScope can link to Jira tickets for incident tracking, but requires customer Jira integration setup.'
  },
  { 
    id: '17(1)(i)', 
    name: 'Communication with authorities', 
    status: 'ready', 
    evidence: 'Compliance exports',
    rationale: 'Export-ready documentation for regulators',
    details: 'One-click export of Evidence Packs in formats suitable for regulatory submission.'
  },
  { 
    id: '17(1)(j)', 
    name: 'Record-keeping', 
    status: 'ready', 
    evidence: 'Hash chain audit',
    rationale: 'Tamper-evident logs with blockchain anchoring',
    details: 'All traces stored in cryptographically linked hash chains with optional OpenTimestamps blockchain anchoring.'
  },
]

// Summary stats
const summary = {
  total: 10,
  ready: 8,
  conditional: 1,
  integration: 1,
}

// Key dates
const keyDates = [
  { date: 'August 1, 2024', event: 'EU AI Act entered into force' },
  { date: 'February 2, 2025', event: 'Prohibited AI practices apply' },
  { date: 'August 2, 2025', event: 'GPAI & governance rules apply' },
  { date: 'August 2, 2026', event: 'High-risk AI requirements apply' },
  { date: 'August 2, 2027', event: 'Full enforcement for all AI systems' },
]

// Penalty structure
const penalties = [
  { violation: 'Prohibited AI practices', fine: '€35M or 7% global revenue' },
  { violation: 'High-risk AI non-compliance', fine: '€15M or 3% global revenue' },
  { violation: 'Incorrect information to authorities', fine: '€7.5M or 1.5% global revenue' },
]

function StatusBadge({ status }: { status: string }) {
  const configs = {
    ready: { icon: CheckCircle, color: 'emerald', label: 'Evidence Ready' },
    conditional: { icon: AlertCircle, color: 'purple', label: 'Conditional' },
    integration: { icon: Circle, color: 'amber', label: 'Integration Required' },
  }
  const config = configs[status as keyof typeof configs]
  const Icon = config.icon
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs bg-${config.color}-500/10 text-${config.color}-400`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

export default function EUAIActPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 mb-6">
              <Scale className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">EU Regulation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              EU AI Act Article 17
            </h1>
            
            <p className="text-xl text-slate-400 mb-4">
              Quality Management System Requirements
            </p>
            
            <p className="text-lg text-slate-500 mb-8">
              TrustScope generates evidence for <span className="text-white font-semibold">8 of 10</span> Article 17 
              requirements. High-risk AI systems must demonstrate QMS compliance by August 2026.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center gap-2">
                Start Generating Evidence <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://docs.trustscope.ai/compliance/eu-ai-act" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Full Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Warning */}
      <section className="py-8 border-y border-amber-500/30 bg-amber-500/5">
        <div className="section-container">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <p className="text-amber-200">
              <strong>High-risk AI requirements take effect August 2, 2026.</strong> Organizations deploying 
              AI in regulated sectors must demonstrate Article 17 QMS compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{summary.total}</div>
              <div className="text-slate-500 text-sm">Article 17 Requirements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{summary.ready}</div>
              <div className="text-slate-500 text-sm">Evidence Ready</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{summary.conditional}</div>
              <div className="text-slate-500 text-sm">Conditional</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">{summary.integration}</div>
              <div className="text-slate-500 text-sm">Integration Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement Cards */}
      <section className="py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Article 17 Requirement Mapping</h2>
            <p className="text-slate-400">Quality Management System for High-Risk AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {article17Requirements.map((req, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="font-mono text-blue-400 text-sm">{req.id}</span>
                    <h3 className="font-semibold text-lg mt-1">{req.name}</h3>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
                
                <p className="text-slate-400 text-sm mb-4">{req.details}</p>
                
                <div className="pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-500 mb-1">Evidence Generated:</div>
                  <div className="text-sm text-slate-300">{req.evidence}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">EU AI Act Timeline</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />
              
              {keyDates.map((item, i) => (
                <div key={i} className="relative pl-12 pb-8 last:pb-0">
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                    i === 3 ? 'bg-amber-500 border-amber-400' : 'bg-slate-800 border-slate-600'
                  }`} />
                  <div className="text-sm text-slate-500 mb-1">{item.date}</div>
                  <div className={`font-medium ${i === 3 ? 'text-amber-400' : 'text-slate-300'}`}>
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Penalty Structure</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {penalties.map((penalty, i) => (
              <div key={i} className="card bg-red-500/5 border-red-500/20 p-6 text-center">
                <div className="text-2xl font-bold text-red-400 mb-2">{penalty.fine}</div>
                <div className="text-slate-400 text-sm">{penalty.violation}</div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-8">
            Whichever is higher. Penalties apply to global annual turnover.
          </p>
        </div>
      </section>

      {/* Evidence Pack */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <FileCheck className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">EU AI Act Evidence Pack</h2>
            <p className="text-slate-400 mb-8">
              TrustScope's Govern tier includes a pre-built EU AI Act Evidence Pack template 
              that bundles all generated evidence with Article 17 control mappings.
            </p>
            
            <div className="card p-6 text-left">
              <h3 className="font-semibold mb-4">Evidence Pack Includes:</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Regulatory strategy documentation (17.1.a)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  CCE verification certificates (17.1.b)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Agent DNA validation baselines (17.1.c)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Detection test results (17.1.d)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  PII/data management logs (17.1.e)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Exposure Index risk reports (17.1.f)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Hash chain audit trail (17.1.j)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Prepare for EU AI Act compliance</h2>
          <p className="text-xl text-slate-400 mb-8">
            High-risk AI requirements take effect August 2026. Start generating evidence now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">
              Get Started Free
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to Compliance Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
