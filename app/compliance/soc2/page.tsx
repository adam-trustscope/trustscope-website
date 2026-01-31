import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Circle, Shield, Lock, Eye } from 'lucide-react'

// SOC 2 Controls
const soc2Controls = [
  { 
    id: 'CC4.1', 
    name: 'Monitoring activities', 
    status: 'ready', 
    evidence: 'Dashboard, 16 detection engines',
    rationale: 'Continuous monitoring with real-time alerts',
    category: 'Monitoring'
  },
  { 
    id: 'CC4.2', 
    name: 'Evaluate and communicate', 
    status: 'ready', 
    evidence: 'Alerts, webhooks, Slack/email',
    rationale: 'Multi-channel alert delivery with audit trail',
    category: 'Monitoring'
  },
  { 
    id: 'CC5.1', 
    name: 'Control activities', 
    status: 'ready', 
    evidence: 'Policy engine, enforcement logs',
    rationale: 'Policy enforcement with full logging',
    category: 'Control Activities'
  },
  { 
    id: 'CC5.2', 
    name: 'Technology controls', 
    status: 'ready', 
    evidence: 'Budget caps, rate limits, token limits',
    rationale: 'Technical controls with configurable thresholds',
    category: 'Control Activities'
  },
  { 
    id: 'CC5.3', 
    name: 'Policy deployment', 
    status: 'ready', 
    evidence: 'Agent Lock enforcement',
    rationale: 'Policy deployment and enforcement tracking',
    category: 'Control Activities'
  },
  { 
    id: 'CC6.1', 
    name: 'Logical access', 
    status: 'integration', 
    evidence: 'API key audit logs',
    rationale: 'Requires IAM/Okta integration for full coverage',
    category: 'Access Controls'
  },
  { 
    id: 'CC6.2', 
    name: 'Access removal', 
    status: 'integration', 
    evidence: 'Access audit logs',
    rationale: 'Requires IAM integration for provisioning/deprovisioning',
    category: 'Access Controls'
  },
  { 
    id: 'CC6.3', 
    name: 'Access reviews', 
    status: 'integration', 
    evidence: 'RBAC audit logs',
    rationale: 'Requires IAM integration for periodic reviews',
    category: 'Access Controls'
  },
  { 
    id: 'CC8.1', 
    name: 'Change management', 
    status: 'ready', 
    evidence: 'CCE certificates, drift detection',
    rationale: 'Controlled Change Environment provides change evidence',
    category: 'Change Management'
  },
  { 
    id: 'CC9.1', 
    name: 'Risk mitigation', 
    status: 'ready', 
    evidence: 'Exposure Index reports',
    rationale: 'Quantified risk assessment with mitigation tracking',
    category: 'Risk Management'
  },
  { 
    id: 'CC9.2', 
    name: 'Vendor management', 
    status: 'outofscope', 
    evidence: '—',
    rationale: 'Third-party risk management domain (not TrustScope scope)',
    category: 'Risk Management'
  },
]

// Summary
const summary = {
  total: 11,
  ready: 6,
  conditional: 1,
  integration: 3,
  outofscope: 1,
}

// Trust Service Categories relevant to AI
const categories = [
  { name: 'Security', description: 'Protection against unauthorized access', coverage: 'Partial' },
  { name: 'Availability', description: 'System availability for operation', coverage: 'Out of Scope' },
  { name: 'Processing Integrity', description: 'System processing is complete and accurate', coverage: 'Strong' },
  { name: 'Confidentiality', description: 'Information designated as confidential is protected', coverage: 'Strong' },
  { name: 'Privacy', description: 'Personal information is collected, used, retained appropriately', coverage: 'Strong' },
]

function StatusBadge({ status }: { status: string }) {
  const configs = {
    ready: { icon: CheckCircle, color: 'emerald', label: 'Evidence Ready' },
    conditional: { icon: AlertCircle, color: 'purple', label: 'Conditional' },
    integration: { icon: Circle, color: 'amber', label: 'Integration Required' },
    outofscope: { icon: Circle, color: 'slate', label: 'Out of Scope' },
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

export default function SOC2Page() {
  // Group controls by category
  const controlsByCategory = soc2Controls.reduce((acc, control) => {
    if (!acc[control.category]) acc[control.category] = []
    acc[control.category].push(control)
    return acc
  }, {} as Record<string, typeof soc2Controls>)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Compliance Framework</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SOC 2 Type II
            </h1>
            
            <p className="text-xl text-slate-400 mb-4">
              AI-Relevant Controls for Trust Service Criteria
            </p>
            
            <p className="text-lg text-slate-500 mb-8">
              TrustScope generates evidence for <span className="text-white font-semibold">6 of 10</span> AI-relevant 
              SOC 2 controls. Additional controls require IAM integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center gap-2">
                Start Generating Evidence <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://docs.trustscope.ai/compliance/soc2" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{summary.total}</div>
              <div className="text-slate-500 text-sm">AI-Relevant Controls</div>
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
              <div className="text-slate-500 text-sm">Integration Req.</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-400 mb-1">{summary.outofscope}</div>
              <div className="text-slate-500 text-sm">Out of Scope</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Service Categories */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Trust Service Categories</h2>
          
          <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <div key={i} className="card p-4 text-center">
                <h3 className="font-semibold text-sm mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-xs mb-3">{cat.description}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  cat.coverage === 'Strong' ? 'bg-emerald-500/10 text-emerald-400' :
                  cat.coverage === 'Partial' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-slate-500/10 text-slate-400'
                }`}>
                  {cat.coverage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Tables by Category */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Control Mapping</h2>
          
          <div className="space-y-8">
            {Object.entries(controlsByCategory).map(([category, controls]) => (
              <div key={category} className="card overflow-hidden">
                <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
                  <h3 className="font-semibold">{category}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 font-medium text-slate-400 w-24">Control</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Requirement</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400 w-40">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controls.map((control, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="py-3 px-4 font-mono text-xs text-blue-400">{control.id}</td>
                          <td className="py-3 px-4 text-slate-300">{control.name}</td>
                          <td className="py-3 px-4"><StatusBadge status={control.status} /></td>
                          <td className="py-3 px-4 text-slate-500 text-xs">{control.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CC8.1 Deep Dive */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">CC8.1 Change Management Evidence</h2>
            <p className="text-slate-400 text-center mb-8">
              TrustScope's Controlled Change Environment (CCE) provides comprehensive change management evidence.
            </p>
            
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Evidence Pack Contents:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">CCE Test History</span>
                    <p className="text-slate-500">Pass/fail results for all agent changes with timestamps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">CCE Certificates</span>
                    <p className="text-slate-500">Ed25519-signed certificates proving change verification</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">Agent DNA Drift Reports</span>
                    <p className="text-slate-500">Behavioral changes detected against baseline</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">Hash Chain Verification</span>
                    <p className="text-slate-500">Tamper-evident documentation of change sequence</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">Jira Approval Links</span>
                    <p className="text-slate-500">Requires Jira integration for approval workflow</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-900/30">
        <div className="section-container">
          <div className="card bg-amber-500/5 border-amber-500/20 p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-amber-400 mb-2">Important Note</h3>
            <p className="text-slate-400 text-sm">
              TrustScope generates evidence for AI-specific controls within SOC 2 scope. A complete SOC 2 Type II 
              audit requires evidence across all Trust Service Criteria, including infrastructure, HR, and 
              organizational controls outside TrustScope's domain. Consult your auditor for full requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Streamline your SOC 2 evidence collection</h2>
          <p className="text-xl text-slate-400 mb-8">
            Automate AI control evidence with TrustScope's Govern tier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary">
              Start Free Trial
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
