import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Circle, Shield, FileCheck, Scale, Fingerprint, Database, Lock, Activity, Eye } from 'lucide-react'

// AIUC-1 Domain Requirements with detailed control mappings
const domainRequirements = [
  {
    domain: 'A',
    name: 'AI Governance',
    color: 'blue',
    controls: [
      { id: 'A.1', name: 'AI Policy Framework', status: 'ready', evidence: 'Policy exports, config snapshots', details: 'TrustScope captures policy configurations and generates exportable governance documentation.' },
      { id: 'A.2', name: 'Organizational Structure', status: 'ready', evidence: 'Role-based access logs', details: 'RBAC enforcement with audit trail of who accessed what, when.' },
      { id: 'A.3', name: 'AI Risk Assessment', status: 'ready', evidence: 'Exposure Index reports', details: 'Quantified risk scores per agent based on capabilities, data access, and deployment context.' },
      { id: 'A.4', name: 'AI Inventory Management', status: 'ready', evidence: 'Agent registry, DNA fingerprints', details: 'Complete inventory of all AI agents with behavioral fingerprints and capability mappings.' },
      { id: 'A.5', name: 'Stakeholder Communication', status: 'integration', evidence: 'SIEM exports, webhook logs', details: 'Requires SIEM integration (Govern tier) for stakeholder notification workflows.' },
    ]
  },
  {
    domain: 'B',
    name: 'Data Management',
    color: 'green',
    controls: [
      { id: 'B.1', name: 'Data Classification', status: 'ready', evidence: 'PII tier classifications', details: 'Automatic classification into Critical/High/Medium PII tiers with 88+ detection patterns.' },
      { id: 'B.2', name: 'Data Quality Controls', status: 'ready', evidence: 'Input validation logs', details: 'Content validation engines ensure data quality before agent processing.' },
      { id: 'B.3', name: 'Data Privacy', status: 'ready', evidence: 'PII detection/blocking logs', details: 'Real-time PII detection and blocking across 88+ patterns (SSN, credit cards, emails, etc.).' },
      { id: 'B.4', name: 'Data Retention', status: 'ready', evidence: 'Retention policy configs', details: 'Configurable retention: 30 days (Monitor), 90 days (Protect), 1 year (Enforce), 7 years (Govern).' },
      { id: 'B.5', name: 'Data Access Controls', status: 'ready', evidence: 'Access audit trail', details: 'Full audit trail of data access with hash chain integrity verification.' },
    ]
  },
  {
    domain: 'C',
    name: 'AI Model Management',
    color: 'purple',
    controls: [
      { id: 'C.1', name: 'Model Inventory', status: 'ready', evidence: 'Model usage logs', details: 'Tracks all models used across agents: GPT-4o, Claude, Gemini, etc. with version info.' },
      { id: 'C.2', name: 'Model Versioning', status: 'ready', evidence: 'Agent DNA history', details: 'DNA fingerprints capture model configurations over time for version tracking.' },
      { id: 'C.3', name: 'Model Validation', status: 'ready', evidence: 'CCE test results', details: 'Controlled Change Environment validates model behavior before deployment.' },
      { id: 'C.4', name: 'Model Drift Detection', status: 'ready', evidence: 'Drift alerts, DNA diffs', details: 'Automatic detection when agent behavior deviates from baseline fingerprint.' },
      { id: 'C.5', name: 'Model Retirement', status: 'conditional', evidence: 'Deprecation logs', details: 'Tracks model deprecation but requires manual retirement workflow.' },
    ]
  },
  {
    domain: 'D',
    name: 'AI Application Security',
    color: 'red',
    controls: [
      { id: 'D.1', name: 'Prompt Injection Prevention', status: 'ready', evidence: 'Injection detection logs', details: '40+ prompt injection patterns with ML-powered detection (Enforce+).' },
      { id: 'D.2', name: 'Jailbreak Prevention', status: 'ready', evidence: 'Jailbreak detection logs', details: '30+ jailbreak patterns (DAN, STAN, etc.) with real-time blocking.' },
      { id: 'D.3', name: 'Output Sanitization', status: 'ready', evidence: 'Secrets/PII blocking logs', details: 'Secrets scanner (50+ patterns) and PII blocking prevent sensitive data in outputs.' },
      { id: 'D.4', name: 'Command Injection Prevention', status: 'ready', evidence: 'Command firewall logs', details: '55+ dangerous command patterns blocked (DROP TABLE, rm -rf, etc.).' },
      { id: 'D.5', name: 'Access Control', status: 'ready', evidence: 'Policy enforcement logs', details: 'Policy engine enforces access controls with signed evidence of enforcement.' },
    ]
  },
  {
    domain: 'E',
    name: 'AI Operations',
    color: 'amber',
    controls: [
      { id: 'E.1', name: 'Monitoring & Alerting', status: 'ready', evidence: 'Alert logs, notification configs', details: 'Real-time monitoring with alerts via Discord, Telegram, Slack, Email, Webhooks.' },
      { id: 'E.2', name: 'Incident Response', status: 'ready', evidence: 'Incident traces, block logs', details: 'Automatic incident detection with trace capture and optional blocking.' },
      { id: 'E.3', name: 'Performance Management', status: 'ready', evidence: 'Latency/cost metrics', details: 'Per-agent latency, token usage, and cost tracking with anomaly detection.' },
      { id: 'E.4', name: 'Capacity Planning', status: 'ready', evidence: 'Usage reports, forecasts', details: 'Usage analytics with trend analysis for capacity planning.' },
      { id: 'E.5', name: 'Change Management', status: 'ready', evidence: 'DNA change logs', details: 'Agent DNA tracks behavioral changes over time with diff capability.' },
    ]
  },
  {
    domain: 'F',
    name: 'Fairness & Transparency',
    color: 'pink',
    controls: [
      { id: 'F.1', name: 'Bias Detection', status: 'ready', evidence: 'Bias scan results', details: 'ML-powered bias detection engine analyzes outputs for demographic bias patterns.' },
      { id: 'F.2', name: 'Explainability', status: 'conditional', evidence: 'Trace context logs', details: 'Full trace capture provides context but explainability depends on model capabilities.' },
      { id: 'F.3', name: 'Transparency Reporting', status: 'ready', evidence: 'Evidence Packs', details: 'Signed Evidence Packs document all controls and findings for transparency.' },
      { id: 'F.4', name: 'Human Oversight', status: 'ready', evidence: 'Approval workflow logs', details: 'MCP approval workflows enable human-in-the-loop for sensitive actions.' },
      { id: 'F.5', name: 'Audit Trail', status: 'ready', evidence: 'Hash chain audit', details: 'Cryptographic hash chain provides tamper-evident audit trail with blockchain anchoring.' },
    ]
  },
]

// Summary stats
const summary = {
  total: 30,
  ready: 26,
  conditional: 2,
  integration: 2,
  coverage: 87,
}

// Why AIUC-1 matters
const whyAIUC = [
  { title: 'Designed for AI', description: 'Unlike retrofitted frameworks, AIUC-1 was built specifically for AI/ML systems from the ground up.' },
  { title: 'Control-Level Mapping', description: 'Maps directly to technical controls, not abstract principles. Evidence is concrete and verifiable.' },
  { title: 'Framework Crosswalk', description: 'AIUC-1 controls map to EU AI Act, NIST AI RMF, ISO 42001, and SOC 2—one framework, multiple compliance.' },
  { title: 'Evidence-First', description: 'Every control specifies what evidence looks like, making audit preparation straightforward.' },
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

function DomainIcon({ domain }: { domain: string }) {
  const icons: Record<string, typeof Shield> = {
    A: Scale,
    B: Database,
    C: Fingerprint,
    D: Lock,
    E: Activity,
    F: Eye,
  }
  const Icon = icons[domain] || Shield
  return <Icon className="w-5 h-5" />
}

export default function AIUC1Page() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-[#C49B3A]/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C49B3A]/10 border border-[#C49B3A]/30 mb-6">
              <Scale className="w-4 h-4 text-[#C49B3A]" />
              <span className="text-sm text-[#C49B3A]">Primary Framework</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AIUC-1 Framework
            </h1>

            <p className="text-xl text-slate-400 mb-4">
              AI Use Controls — Purpose-Built for AI Governance
            </p>

            <p className="text-lg text-slate-500 mb-8">
              TrustScope generates evidence for <span className="text-white font-semibold">26 of 30</span> AIUC-1
              controls across 6 domains. Our primary framework alignment with <span className="text-[#C49B3A] font-semibold">{summary.coverage}%</span> coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center gap-2">
                Start Generating Evidence <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/comply" className="btn-secondary">
                View Domain Coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why AIUC-1 */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-6">
            {whyAIUC.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
              <div className="text-3xl font-bold text-amber-400 mb-1">{summary.integration}</div>
              <div className="text-slate-500 text-sm">Integration Required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C49B3A] mb-1">{summary.coverage}%</div>
              <div className="text-slate-500 text-sm">Total Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Cards */}
      {domainRequirements.map((domain) => (
        <section key={domain.domain} className={`py-16 ${domain.domain === 'B' || domain.domain === 'D' || domain.domain === 'F' ? 'bg-slate-900/30' : ''}`}>
          <div className="section-container">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-xl bg-${domain.color}-500/10 flex items-center justify-center`}>
                <DomainIcon domain={domain.domain} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Domain {domain.domain}: {domain.name}</h2>
                <p className="text-slate-400">{domain.controls.filter(c => c.status === 'ready').length} of {domain.controls.length} controls with evidence</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {domain.controls.map((control) => (
                <div key={control.id} className="card p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`font-mono text-${domain.color}-400 text-sm`}>{control.id}</span>
                    <StatusBadge status={control.status} />
                  </div>
                  <h3 className="font-semibold mb-2">{control.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{control.details}</p>
                  <div className="pt-3 border-t border-slate-700">
                    <div className="text-xs text-slate-500">Evidence:</div>
                    <div className="text-sm text-slate-300">{control.evidence}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Framework Crosswalk */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Framework Crosswalk</h2>
            <p className="text-slate-400">AIUC-1 maps to major compliance frameworks</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'EU AI Act', mapping: 'Article 17 QMS', coverage: '8 of 10' },
              { name: 'NIST AI RMF', mapping: 'GOVERN, MAP, MEASURE, MANAGE', coverage: '39 of 63' },
              { name: 'ISO 42001', mapping: 'Clauses 4-10', coverage: '18 of 26' },
              { name: 'SOC 2', mapping: 'AI-specific TSCs', coverage: '6 of 10' },
            ].map((fw, i) => (
              <div key={i} className="card p-5 text-center">
                <h3 className="font-semibold text-white mb-2">{fw.name}</h3>
                <p className="text-slate-500 text-sm mb-2">{fw.mapping}</p>
                <p className="text-[#C49B3A] font-mono">{fw.coverage}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            One set of controls. Evidence for multiple frameworks.
          </p>
        </div>
      </section>

      {/* Evidence Pack */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <FileCheck className="w-12 h-12 text-[#C49B3A] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">AIUC-1 Evidence Pack</h2>
            <p className="text-slate-400 mb-8">
              Enforce tier includes validation packs. Govern tier includes full signed evidence
              with Ed25519 signatures and hash chain verification.
            </p>

            <div className="card p-6 text-left">
              <h3 className="font-semibold mb-4">Evidence Pack Includes:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Agent inventory with DNA fingerprints
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Policy configuration exports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Detection engine results
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    PII/secrets scan reports
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Exposure Index risk scores
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Drift detection reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Hash chain verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Framework crosswalk mappings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Start with AIUC-1</h2>
          <p className="text-xl text-slate-400 mb-8">
            Purpose-built for AI. Evidence for all frameworks. Get started free.
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
