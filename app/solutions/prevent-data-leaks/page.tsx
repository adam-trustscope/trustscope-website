import Link from 'next/link'
import { 
  Shield, AlertTriangle, ArrowRight, CheckCircle,
  Key, FileText, Terminal, Eye, Lock
} from 'lucide-react'

const incidents = [
  {
    title: 'The Credential Leak',
    description: 'User asked for database connection info. Agent helpfully included the password.',
    impact: 'Emergency credential rotation',
    detection: 'Secrets Scanner blocks credentials in outputs',
  },
  {
    title: 'The PII Exposure',
    description: 'Healthcare agent summarized patient visits—including their SSN.',
    impact: 'HIPAA violation, breach notification',
    detection: 'PII Scanner blocks SSN, medical IDs',
  },
  {
    title: 'The DROP TABLE Disaster',
    description: '"Clean up old data" was interpreted as DROP TABLE customers.',
    impact: '50,000 records deleted',
    detection: 'Command Firewall blocks destructive SQL',
  },
]

const piiPatterns = [
  'Social Security Numbers',
  'Credit Card Numbers',
  'Bank Account Numbers',
  'Driver\'s License',
  'Passport Numbers',
  'Email Addresses',
  'Phone Numbers',
  'IP Addresses',
  'Medical Record Numbers',
  'Health Insurance IDs',
  'Biometric Data References',
  'Date of Birth',
]

const features = [
  {
    icon: FileText,
    title: 'PII Scanner',
    description: '88+ patterns including SSN, credit cards, medical IDs, and more. Real-time detection in inputs and outputs.',
    tier: 'All tiers (alert) · Protect+ (block) · ML-powered (Presidio)',
    patterns: '88+ patterns',
  },
  {
    icon: Key,
    title: 'Secrets Scanner',
    description: 'Detects API keys, passwords, tokens, connection strings, and other credentials before they leak.',
    tier: 'All tiers (alert) · Protect+ (block) · 50+ patterns',
    patterns: '50+ credential types',
  },
  {
    icon: Terminal,
    title: 'Command Firewall',
    description: 'Blocks dangerous commands: DROP TABLE, DELETE without WHERE, rm -rf, and other destructive operations.',
    tier: 'All tiers (alert) · Protect+ (block) · Pattern-based',
    patterns: '25+ blocked commands',
  },
  {
    icon: Lock,
    title: 'Data Boundary Enforcement',
    description: 'Define what data agents can access. Alert or block when they try to go outside their scope.',
    tier: 'Enforce+ · AI Hybrid (LLM-powered)',
    patterns: 'Custom rules',
  },
]

export default function PreventDataLeaksPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-amber-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-4xl">
            <Link href="/solutions" className="text-slate-500 hover:text-slate-300 text-sm mb-4 inline-block">
              ← Solutions
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Prevent Data Leaks</h1>
                <p className="text-amber-400 text-lg">"It leaked our API keys in a response"</p>
              </div>
            </div>

            <p className="text-xl text-slate-400 mb-8">
              AI agents are trained to be helpful. Sometimes too helpful. They'll expose 
              PII, credentials, and sensitive data without understanding the consequences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/30">
        <div className="section-container">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-400">88+</div>
              <div className="text-slate-500 text-sm">PII patterns detected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">15+</div>
              <div className="text-slate-500 text-sm">credential types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">25+</div>
              <div className="text-slate-500 text-sm">blocked commands</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Incidents */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Agents leak data constantly</h2>
            <p className="text-slate-400">They're trying to be helpful. That's the problem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {incidents.map((inc, i) => (
              <div key={i} className="card p-6">
                <AlertTriangle className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="font-semibold mb-2">{inc.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{inc.description}</p>
                <div className="text-red-400 text-sm mb-4">{inc.impact}</div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    {inc.detection}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PII Patterns */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">88+ PII Patterns Detected</h2>
            <p className="text-slate-400">From obvious (SSN) to subtle (medical record IDs)</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {piiPatterns.map((pattern, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-300">{pattern}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-6">
              ...and 76+ more patterns including industry-specific identifiers
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How TrustScope Helps</h2>
            <p className="text-slate-400">Multiple layers of data protection</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <f.icon className="w-8 h-8 text-amber-400" />
                  <span className="text-xs px-2 py-1 bg-slate-800 rounded">{f.patterns}</span>
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{f.description}</p>
                <span className="text-xs text-slate-500">{f.tier}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Demo */}
      <section className="py-24 bg-slate-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Detection in Action</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 text-sm ml-4">PII Detection Event</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-slate-300">{`{
  "event": "pii_detected",
  "agent": "patient-summary-bot",
  "trace_id": "tr_xyz789",
  "detection": {
    "type": "ssn",
    "pattern": "xxx-xx-6789",
    "location": "output",
    "confidence": 0.99
  },
  "action": "blocked",
  "redacted_output": "Patient [REDACTED] visited on...",
  "timestamp": "2026-01-30T14:22:18Z"
}`}</code>
              </pre>
            </div>

            <p className="text-center text-slate-400 mt-6">
              PII blocked in real-time. The user never sees the sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Stop leaks before they happen</h2>
          <p className="text-xl text-slate-400 mb-8">
            Protect tier ($49/mo) includes PII and Secrets scanning with real-time blocking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.trustscope.ai" className="btn-primary flex items-center justify-center gap-2">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/developers" className="btn-secondary">
              Developer Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
