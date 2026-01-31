import Link from 'next/link'
import { 
  FileCheck, ArrowRight, Scale, Shield, Lock,
  CheckCircle, AlertTriangle, Download, Link2
} from 'lucide-react'

const frameworks = [
  { name: 'NIST AI RMF', controls: '39 of 63', coverage: '62%', href: '/compliance/nist' },
  { name: 'EU AI Act Art 17', controls: '8 of 10', coverage: '80%', href: '/compliance/eu-ai-act' },
  { name: 'SOC 2 Type II', controls: '6 of 10', coverage: '55%', href: '/compliance/soc2' },
  { name: 'ISO 42001', controls: '18 of 26', coverage: '47%', href: '/compliance/iso42001' },
]

const evidenceTypes = [
  {
    title: 'Signed Receipts',
    description: 'Ed25519 signatures document each control actually executed—not just that it was called.',
  },
  {
    title: 'Hash Chains',
    description: 'Cryptographic linking shows logs weren\'t tampered with after the fact.',
  },
  {
    title: 'Blockchain Anchoring',
    description: 'OpenTimestamps documents that evidence existed at a specific point in time.',
  },
  {
    title: 'Coverage Verification',
    description: 'CCE (Complete Control Execution) documents all required checks ran for every action.',
  },
]

const auditScenarios = [
  {
    title: 'SOC 2 Audit',
    auditor: '"Show me evidence that your AI agents run PII checks."',
    without: 'CloudWatch logs showing the check was "called"',
    with: 'Signed receipts documenting each check executed, with hash chain verification',
    icon: FileCheck,
  },
  {
    title: 'Insurance Application',
    auditor: '"Provide cryptographic evidence of control execution."',
    without: 'Dashboard screenshots',
    with: 'Evidence Pack with signed artifacts mapped to governance domains',
    icon: Shield,
  },
  {
    title: 'EU AI Act Compliance',
    auditor: '"Demonstrate Article 17 QMS requirements."',
    without: 'LangSmith traces (observability ≠ compliance)',
    with: 'Framework-mapped Evidence Pack with regulatory citations',
    icon: Scale,
  },
]

export default function PassAuditsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <Link href="/solutions" className="text-slate-500 hover:text-slate-300 text-sm mb-4 inline-block">
              ← Solutions
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Pass Compliance Audits</h1>
                <p className="text-blue-400 text-lg">"Show me your AI followed policy"</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 mb-8">
              Auditors don't want dashboards or logs. They want cryptographic evidence 
              that your controls actually ran. TrustScope generates the evidence they need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/compliance" className="btn-secondary">
                View Framework Mapping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Coverage */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {frameworks.map((f, i) => (
              <Link key={i} href={f.href} className="hover:text-blue-400 transition-colors">
                <div className="text-sm text-slate-500 mb-1">{f.name}</div>
                <div className="text-2xl font-bold text-white">{f.controls}</div>
                <div className="text-xs text-emerald-400">{f.coverage} ready</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Logs vs Evidence */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Logs ≠ Evidence</h2>
            <p className="text-slate-400">This is where most companies fail audits</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6 bg-red-500/5 border-red-500/20">
                <h3 className="font-semibold text-red-400 mb-4">What Logs Show</h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                    "Check was called"
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                    "Timestamp exists"
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                    "Result was logged"
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                    "System was running"
                  </li>
                </ul>
              </div>
              
              <div className="card p-6 bg-emerald-500/5 border-emerald-500/20">
                <h3 className="font-semibold text-emerald-400 mb-4">What Auditors Need</h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                    Evidence the check actually executed
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                    Evidence timestamp wasn't backdated
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                    Evidence the log wasn't modified
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                    Evidence the right checks ran for the right action
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Types */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How TrustScope Creates Evidence</h2>
            <p className="text-slate-400">Cryptographic evidence, not just claims</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {evidenceTypes.map((e, i) => (
              <div key={i} className="card p-6">
                <Lock className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-2">{e.title}</h3>
                <p className="text-slate-400 text-sm">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Scenarios */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Real Audit Scenarios</h2>
            <p className="text-slate-400">What auditors ask vs what you can provide</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {auditScenarios.map((s, i) => (
              <div key={i} className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <s.icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="text-slate-400 italic">{s.auditor}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <div className="text-red-400 text-sm font-medium mb-2">Without TrustScope</div>
                    <p className="text-slate-400 text-sm">{s.without}</p>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                    <div className="text-emerald-400 text-sm font-medium mb-2">With TrustScope</div>
                    <p className="text-slate-400 text-sm">{s.with}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Pack Demo */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Evidence Pack Export</h2>
            <p className="text-slate-400">One click, auditor-ready</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-400 text-sm ml-4">SOC 2 CC8.1 Evidence Pack</span>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
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
      "signature": "ed25519:7f8a9b..."
    },
    {
      "type": "policy_enforcement_logs", 
      "count": 12453,
      "hash_chain_verified": true
    },
    {
      "type": "drift_detection_reports",
      "alerts": 3,
      "resolved": 3
    }
  ],
  
  "verification": {
    "blockchain_anchor": "ots_abc123",
    "certificate_id": "cert_7a8b9c2d"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Be audit-ready before the audit</h2>
          <p className="text-xl text-slate-400 mb-8">
            Govern tier ($499/mo) includes Evidence Packs for all supported frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/compliance" className="btn-secondary">
              View Framework Coverage
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
