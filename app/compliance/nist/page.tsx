import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, AlertCircle, MinusCircle, HelpCircle } from 'lucide-react'

// Evidence status types
const statusConfig = {
  ready: { icon: CheckCircle, color: 'emerald', label: 'Evidence Ready', description: 'TrustScope generates automatically' },
  conditional: { icon: AlertCircle, color: 'purple', label: 'Conditional', description: 'Available if traffic routed through TrustScope' },
  integration: { icon: Circle, color: 'amber', label: 'Integration Required', description: 'Needs external integration (Jira, Okta)' },
  customer: { icon: HelpCircle, color: 'blue', label: 'Customer Provided', description: 'Customer owns this evidence' },
  excluded: { icon: MinusCircle, color: 'slate', label: 'Organizational', description: 'HR/culture control outside software scope' },
}

// NIST AI RMF Summary
const summary = {
  total: 63,
  ready: 39,
  conditional: 4,
  integration: 6,
  customer: 8,
  excluded: 6,
}

// GOVERN Function controls
const governControls = [
  { id: 'GOVERN 1.1', name: 'Legal/regulatory documented', status: 'ready', evidence: 'Compliance exports', rationale: 'Exports document tracked frameworks' },
  { id: 'GOVERN 1.2', name: 'Trustworthy AI policies', status: 'ready', evidence: 'Policy config + enforcement logs', rationale: 'Rules define criteria; logs document execution' },
  { id: 'GOVERN 1.3', name: 'Risk management processes', status: 'ready', evidence: 'Exposure Index reports', rationale: 'Quantified assessment with methodology' },
  { id: 'GOVERN 1.4', name: 'Risk management transparent', status: 'ready', evidence: 'Audit trails, dashboard exports', rationale: 'All decisions logged and exportable' },
  { id: 'GOVERN 1.5', name: 'Ongoing monitoring', status: 'ready', evidence: 'Detection logs, alert history', rationale: '16 engines run continuously' },
  { id: 'GOVERN 1.6', name: 'Workforce diversity', status: 'excluded', evidence: '—', rationale: 'HR/organizational domain' },
  { id: 'GOVERN 1.7', name: 'Actors understand responsibilities', status: 'customer', evidence: '—', rationale: 'Customer training records' },
  { id: 'GOVERN 2.1', name: 'Roles defined', status: 'integration', evidence: 'RBAC audit logs', rationale: 'Requires Okta/IAM integration' },
  { id: 'GOVERN 2.3', name: 'Executive oversight', status: 'ready', evidence: 'Dashboard access logs', rationale: 'Documents executive visibility' },
  { id: 'GOVERN 3.1', name: 'Decision-making documented', status: 'ready', evidence: 'Audit trails', rationale: 'All decisions logged with context' },
  { id: 'GOVERN 3.2', name: 'Policies align with values', status: 'ready', evidence: 'Policy configuration exports', rationale: 'Rules reflect stated values' },
  { id: 'GOVERN 4.3', name: 'Transparency practices', status: 'ready', evidence: 'Compliance exports', rationale: 'Evidence available on demand' },
  { id: 'GOVERN 5.1', name: 'Risk integrated with org', status: 'ready', evidence: 'Exposure Index reports', rationale: 'Risk scores feed dashboards' },
  { id: 'GOVERN 5.2', name: 'Feedback mechanisms', status: 'integration', evidence: 'Webhook delivery logs', rationale: 'Requires webhook/Jira config' },
  { id: 'GOVERN 6.1', name: 'Third-party AI policies', status: 'conditional', evidence: 'Policy enforcement logs', rationale: 'Only if third-party routes through Gateway' },
]

// MAP Function controls  
const mapControls = [
  { id: 'MAP 1.1', name: 'Intended purpose documented', status: 'ready', evidence: 'Agent registry metadata', rationale: 'Registry captures purpose, owner, criticality' },
  { id: 'MAP 1.3', name: 'Scope and boundaries', status: 'ready', evidence: 'Policy boundary configs', rationale: 'Rules define allowed/blocked' },
  { id: 'MAP 1.4', name: 'Deployment context', status: 'ready', evidence: 'Agent metadata, env tags', rationale: 'Environment captured per agent' },
  { id: 'MAP 1.5', name: 'Actor tasks documented', status: 'ready', evidence: 'Agent DNA, tool inventory', rationale: 'DNA captures tools and behaviors' },
  { id: 'MAP 1.6', name: 'System requirements', status: 'ready', evidence: 'Agent registry', rationale: 'Technical requirements documented' },
  { id: 'MAP 2.1', name: 'Use context understood', status: 'ready', evidence: 'Agent metadata', rationale: 'Use case metadata' },
  { id: 'MAP 2.3', name: 'Lifecycle documentation', status: 'ready', evidence: 'Agent change history', rationale: 'Every change captured' },
  { id: 'MAP 3.1', name: 'Risks identified', status: 'ready', evidence: 'Detection event history', rationale: '16 risk categories detected' },
  { id: 'MAP 3.2', name: 'Third-party risks', status: 'conditional', evidence: 'PII detection, firewall logs', rationale: 'Only for traffic through Gateway' },
  { id: 'MAP 3.3', name: 'Measurement approaches', status: 'ready', evidence: 'Exposure Index methodology', rationale: 'Documented scoring' },
  { id: 'MAP 4.1', name: 'Impacts assessed', status: 'ready', evidence: 'Exposure Index reports', rationale: 'Impact in scoring' },
  { id: 'MAP 4.2', name: 'Impacts quantified', status: 'ready', evidence: 'Exposure Index values', rationale: 'Numeric scores with drivers' },
  { id: 'MAP 5.1', name: 'Likelihood assessed', status: 'ready', evidence: 'Detection frequency data', rationale: 'Historical rates' },
]

// MEASURE Function controls
const measureControls = [
  { id: 'MEASURE 1.1', name: 'Measurement approaches', status: 'ready', evidence: 'Detection engine configs', rationale: 'Methodology documented' },
  { id: 'MEASURE 1.3', name: 'Metrics defined', status: 'ready', evidence: 'Dashboard metric definitions', rationale: 'All metrics documented' },
  { id: 'MEASURE 2.1', name: 'Pre-deployment testing', status: 'ready', evidence: 'CCE test results', rationale: 'CCE validates before deploy' },
  { id: 'MEASURE 2.2', name: 'Ongoing testing', status: 'conditional', evidence: 'Continuous detection logs', rationale: 'For instrumented agents' },
  { id: 'MEASURE 2.3', name: 'Testing documented', status: 'ready', evidence: 'Audit trails', rationale: 'All tests logged' },
  { id: 'MEASURE 2.4', name: 'Trustworthiness metrics', status: 'ready', evidence: 'Agent DNA metrics', rationale: 'DNA captures indicators' },
  { id: 'MEASURE 2.7', name: 'Safety evaluation', status: 'ready', evidence: 'Detection engine results', rationale: 'Safety detections' },
  { id: 'MEASURE 3.1', name: 'Feedback mechanisms', status: 'integration', evidence: 'Alert webhook logs', rationale: 'Requires webhook config' },
]

// MANAGE Function controls
const manageControls = [
  { id: 'MANAGE 1.1', name: 'Risks prioritized', status: 'ready', evidence: 'Exposure Index rankings', rationale: 'Agents ranked by exposure' },
  { id: 'MANAGE 1.2', name: 'Risk treatment options', status: 'ready', evidence: 'Policy engine options', rationale: 'Multiple options available' },
  { id: 'MANAGE 1.3', name: 'Responses documented', status: 'ready', evidence: 'Blocked request logs', rationale: 'All responses logged' },
  { id: 'MANAGE 2.2', name: 'Treatments implemented', status: 'ready', evidence: 'Enforcement logs', rationale: 'Enforcement logged' },
  { id: 'MANAGE 2.3', name: 'Treatments monitored', status: 'ready', evidence: 'Dashboard, alert history', rationale: 'Continuous monitoring' },
  { id: 'MANAGE 2.4', name: 'Incident response', status: 'integration', evidence: 'Jira ticket links', rationale: 'Requires Jira integration' },
  { id: 'MANAGE 3.1', name: 'AI decommissioning', status: 'ready', evidence: 'Agent Lock history', rationale: 'Lock changes logged' },
  { id: 'MANAGE 3.2', name: 'Updates documented', status: 'ready', evidence: 'Drift detection logs', rationale: 'All changes detected' },
  { id: 'MANAGE 4.1', name: 'Post-deployment monitoring', status: 'conditional', evidence: 'Continuous detection', rationale: 'For instrumented agents' },
  { id: 'MANAGE 4.2', name: 'Feedback capture', status: 'integration', evidence: 'Webhook delivery logs', rationale: 'Requires webhook config' },
]

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as keyof typeof statusConfig]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs bg-${config.color}-500/10 text-${config.color}-400`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function ControlTable({ controls, title }: { controls: typeof governControls, title: string }) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 font-medium text-slate-400">Control</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400">Requirement</th>
              <th className="text-left py-3 px-4 font-medium text-slate-400">Status</th>
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
  )
}

export default function NISTPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 mb-6">
              <span className="text-sm text-blue-400">Compliance Framework</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NIST AI Risk Management Framework
            </h1>
            
            <p className="text-xl text-slate-400 mb-8">
              TrustScope generates evidence for <span className="text-white font-semibold">39 of 63</span> applicable 
              NIST AI RMF subcategories. Not compliance scores—verifiable evidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center gap-2">
                Start Generating Evidence <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://docs.trustscope.ai/compliance/nist" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Full Mapping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{summary.total}</div>
              <div className="text-slate-500 text-sm">Applicable Controls</div>
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
              <div className="text-3xl font-bold text-blue-400 mb-1">{summary.customer}</div>
              <div className="text-slate-500 text-sm">Customer Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-400 mb-1">{summary.excluded}</div>
              <div className="text-slate-500 text-sm">Organizational</div>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-slate-900/50">
        <div className="section-container">
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <config.icon className={`w-4 h-4 text-${config.color}-400`} />
                <span className="text-slate-400">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Tables */}
      <section className="py-16">
        <div className="section-container space-y-8">
          <ControlTable controls={governControls} title="GOVERN Function (Governance)" />
          <ControlTable controls={mapControls} title="MAP Function (Risk Mapping)" />
          <ControlTable controls={measureControls} title="MEASURE Function (Measurement)" />
          <ControlTable controls={manageControls} title="MANAGE Function (Risk Management)" />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-900/30">
        <div className="section-container">
          <div className="card bg-amber-500/5 border-amber-500/20 p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-amber-400 mb-2">Important Note</h3>
            <p className="text-slate-400 text-sm">
              TrustScope generates evidence artifacts mapped to compliance frameworks. Evidence availability 
              depends on configuration, retention, and integration status. Compliance determination requires 
              qualified assessors. Framework mappings include rationale but may not reflect official regulatory guidance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to generate NIST AI RMF evidence?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Start with the Govern tier to access Evidence Packs with framework mappings.
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
