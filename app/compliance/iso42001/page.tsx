import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Circle, MinusCircle, HelpCircle, Award } from 'lucide-react'

// ISO 42001 Control Areas
const controlAreas = [
  { 
    area: 'A.4 AI Policies',
    controls: '4.1-4.4',
    status: 'partial',
    evidence: 'Policy enforcement, configuration exports',
    description: 'TrustScope enforces policies; customer authors them',
    ready: 2,
    customer: 2,
  },
  { 
    area: 'A.5 Internal Organization',
    controls: '5.1-5.4',
    status: 'excluded',
    evidence: '—',
    description: 'Organizational domain (roles, responsibilities, leadership)',
    ready: 0,
    excluded: 4,
  },
  { 
    area: 'A.6 Resources',
    controls: '6.1-6.5',
    status: 'excluded',
    evidence: '—',
    description: 'Organizational domain (competence, awareness, communication)',
    ready: 0,
    excluded: 5,
  },
  { 
    area: 'A.7 AI System Lifecycle',
    controls: '7.1-7.5',
    status: 'ready',
    evidence: 'Agent DNA, CCE, registry',
    description: 'Full lifecycle tracking from design to decommissioning',
    ready: 5,
  },
  { 
    area: 'A.8 Data Management',
    controls: '8.1-8.4',
    status: 'partial',
    evidence: 'PII detection logs',
    description: 'Data boundary enforcement for instrumented agents',
    ready: 2,
    conditional: 2,
  },
  { 
    area: 'A.9 System Operations',
    controls: '9.1-9.4',
    status: 'ready',
    evidence: 'Detection, enforcement logs',
    description: 'Runtime monitoring and operational controls',
    ready: 4,
  },
  { 
    area: 'A.10 Third-Party Relationships',
    controls: '10.1-10.3',
    status: 'outofscope',
    evidence: '—',
    description: 'Third-party risk management domain',
    outofscope: 3,
  },
  { 
    area: 'A.11 AI System Impact Assessment',
    controls: '11.1-11.3',
    status: 'ready',
    evidence: 'Exposure Index reports',
    description: 'Quantified impact assessment methodology',
    ready: 3,
  },
  { 
    area: 'A.12 Documentation',
    controls: '12.1-12.4',
    status: 'ready',
    evidence: 'Audit trails, compliance exports',
    description: 'Comprehensive documentation and record-keeping',
    ready: 4,
  },
]

// Summary stats
const summary = {
  total: 38,
  ready: 18,
  conditional: 2,
  integration: 2,
  customer: 4,
  excluded: 9,
  outofscope: 3,
}

function StatusIndicator({ status }: { status: string }) {
  const configs = {
    ready: { color: 'emerald', label: 'Evidence Ready' },
    partial: { color: 'blue', label: 'Partial Coverage' },
    excluded: { color: 'slate', label: 'Organizational' },
    outofscope: { color: 'slate', label: 'Out of Scope' },
  }
  const config = configs[status as keyof typeof configs]
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs bg-${config.color}-500/10 text-${config.color}-400`}>
      {config.label}
    </span>
  )
}

export default function ISO42001Page() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30 mb-6">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">International Standard</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ISO/IEC 42001
            </h1>
            
            <p className="text-xl text-slate-400 mb-4">
              AI Management System Requirements
            </p>
            
            <p className="text-lg text-slate-500 mb-8">
              TrustScope generates evidence for <span className="text-white font-semibold">18 of 26</span> applicable 
              ISO 42001 Annex A controls. The first international standard for AI management systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center gap-2">
                Start Generating Evidence <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://docs.trustscope.ai/compliance/iso42001" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About ISO 42001 */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-400">
              ISO/IEC 42001:2023 is the world's first international standard for AI management systems, 
              published in December 2023. It provides a framework for organizations to establish, implement, 
              maintain, and continually improve an AI management system (AIMS).
            </p>
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{summary.total}</div>
              <div className="text-slate-500 text-sm">Total Controls</div>
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
              <div className="text-3xl font-bold text-blue-400 mb-1">{summary.customer}</div>
              <div className="text-slate-500 text-sm">Customer Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-400 mb-1">{summary.excluded}</div>
              <div className="text-slate-500 text-sm">Organizational</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-500 mb-1">{summary.outofscope}</div>
              <div className="text-slate-500 text-sm">Out of Scope</div>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-6 bg-slate-900/50">
        <div className="section-container">
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Evidence Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">Conditional (requires instrumentation)</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">Customer Provided</span>
            </div>
            <div className="flex items-center gap-2">
              <MinusCircle className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Organizational/Out of Scope</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control Areas */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Annex A Control Mapping</h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {controlAreas.map((area, i) => (
              <div key={i} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{area.area}</h3>
                      <span className="text-xs text-slate-500 font-mono">{area.controls}</span>
                    </div>
                    <p className="text-slate-400 text-sm">{area.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <StatusIndicator status={area.status} />
                    {area.ready && area.ready > 0 && (
                      <span className="text-sm text-emerald-400">{area.ready} ready</span>
                    )}
                  </div>
                </div>
                
                {area.evidence !== '—' && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <span className="text-xs text-slate-500">Evidence: </span>
                    <span className="text-xs text-slate-300">{area.evidence}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Areas Deep Dive */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Strong Coverage Areas</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card p-6">
              <h3 className="font-semibold text-emerald-400 mb-4">A.7 AI System Lifecycle</h3>
              <p className="text-slate-400 text-sm mb-4">Full coverage of AI lifecycle management</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Agent registry with purpose/owner
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Agent DNA behavioral baselines
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  CCE change validation
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Agent Lock decommissioning
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-emerald-400 mb-4">A.9 System Operations</h3>
              <p className="text-slate-400 text-sm mb-4">Runtime monitoring and controls</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  16 detection engines
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Real-time enforcement
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Drift detection alerts
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Budget/rate controls
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold text-emerald-400 mb-4">A.12 Documentation</h3>
              <p className="text-slate-400 text-sm mb-4">Comprehensive record-keeping</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Hash chain audit trails
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Compliance exports
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Evidence Packs
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Blockchain anchoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="section-container">
          <div className="card bg-amber-500/5 border-amber-500/20 p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-amber-400 mb-2">Important Note</h3>
            <p className="text-slate-400 text-sm">
              ISO 42001 certification requires evidence across all control areas, including organizational 
              controls (leadership, resources, competence) that are outside TrustScope's scope. TrustScope 
              provides evidence for technical controls related to AI system lifecycle, operations, and 
              documentation. Consult an accredited certification body for full requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Prepare for ISO 42001 certification</h2>
          <p className="text-xl text-slate-400 mb-8">
            Generate evidence for 18 Annex A controls with TrustScope's Govern tier.
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
