import Link from 'next/link'
import { Shield, Lock, Eye, FileCheck, Server, Key, CheckCircle } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container text-center">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Security at TrustScope</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We build governance infrastructure for AI agents. Security isn't a feature—it's foundational.
          </p>
        </div>
      </section>

      {/* Security Principles */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Security Principles</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card p-6">
              <Lock className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Defense in Depth</h3>
              <p className="text-slate-400 text-sm">
                Multiple layers of security controls ensure no single point of failure can 
                compromise your data.
              </p>
            </div>
            
            <div className="card p-6">
              <Eye className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Least Privilege</h3>
              <p className="text-slate-400 text-sm">
                Access is granted only to what's necessary. Role-based controls limit 
                exposure across the organization.
              </p>
            </div>
            
            <div className="card p-6">
              <FileCheck className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Audit Everything</h3>
              <p className="text-slate-400 text-sm">
                Every action is logged in tamper-evident hash chains. We practice what we 
                preach about audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Infrastructure Security</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Server className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Cloud Infrastructure</h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Hosted on SOC 2 Type II certified providers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      US data centers with geographic redundancy
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Private network isolation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      DDoS protection and WAF
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Encryption</h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      TLS 1.3 for all data in transit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      AES-256 encryption at rest
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Ed25519 signatures for evidence artifacts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      BYOK (Bring Your Own Key) available for Enterprise
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Access Controls</h3>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Role-based access control (RBAC)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      SSO/SAML integration (Govern tier)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      API key scoping and rotation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Audit logs for all admin actions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Data Security</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Your AI Agent Data</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>Data is isolated per organization—no cross-tenant access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>We do not train AI models on your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>Data retention follows your subscription tier (3 days to 7 years)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>Hash chains provide tamper-evident audit trails</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>Optional blockchain anchoring via OpenTimestamps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Compliance & Certifications</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-2">SOC 2 Type II</div>
              <p className="text-slate-500 text-sm">In progress (Q2 2026)</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">GDPR</div>
              <p className="text-slate-500 text-sm">Compliant with DPA available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vulnerability Disclosure */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Responsible Disclosure</h2>
            <p className="text-slate-400 mb-6">
              We welcome security researchers to report vulnerabilities responsibly. 
              Please email security concerns to:
            </p>
            <a 
              href="mailto:security@trustscope.ai" 
              className="text-blue-400 hover:text-blue-300 text-lg font-medium"
            >
              security@trustscope.ai
            </a>
            <p className="text-slate-500 text-sm mt-4">
              We aim to respond within 24 hours and work with researchers to 
              address issues before public disclosure.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Questions about security?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Our team is happy to discuss security requirements for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Security Team
            </Link>
            <Link href="/dpa" className="btn-secondary">
              View DPA
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
