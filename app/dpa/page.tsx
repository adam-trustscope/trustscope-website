import Link from 'next/link'
import { FileCheck, Download, Shield } from 'lucide-react'

export default function DPAPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Data Processing Agreement
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Our DPA governs how TrustScope processes personal data on behalf of customers, 
              ensuring compliance with GDPR and other data protection regulations.
            </p>
            <div className="card bg-blue-500/10 border-blue-500/30 p-6 inline-block">
              <div className="flex items-center gap-4">
                <FileCheck className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="font-semibold">Request DPA</div>
                  <div className="text-slate-400 text-sm">Contact us to receive our standard DPA</div>
                </div>
              </div>
              <Link href="mailto:legal@trustscope.ai" className="btn-primary mt-4 inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                Request DPA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Terms */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Key DPA Provisions</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">Processing Scope</h3>
                <p className="text-slate-400 text-sm">
                  TrustScope processes personal data only as necessary to provide our AI governance 
                  services. This includes AI agent traces, prompts, responses, and associated metadata 
                  that may contain personal data.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">Sub-processors</h3>
                <p className="text-slate-400 text-sm">
                  We maintain a list of sub-processors and notify customers of any additions. 
                  Current sub-processors include our cloud infrastructure providers (Render, Neon, 
                  Vercel) and payment processor (Stripe).
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">Data Subject Rights</h3>
                <p className="text-slate-400 text-sm">
                  TrustScope assists customers in responding to data subject requests (access, 
                  rectification, deletion, portability) through our API and dashboard controls.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">Security Measures</h3>
                <p className="text-slate-400 text-sm">
                  Our DPA includes Annex II describing technical and organizational security measures, 
                  including encryption, access controls, and incident response procedures.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">International Transfers</h3>
                <p className="text-slate-400 text-sm">
                  For transfers outside the EEA, our DPA incorporates the EU Standard Contractual 
                  Clauses (Module 2: Controller to Processor) as approved by the European Commission.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="font-semibold text-lg mb-3">Data Retention</h3>
                <p className="text-slate-400 text-sm">
                  Data is retained according to your subscription tier (3 days to 7 years) and 
                  deleted upon termination in accordance with our retention policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GDPR Compliance */}
      <section className="py-16 bg-slate-900/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold">GDPR Compliance</h2>
            </div>
            
            <div className="space-y-4 text-slate-400">
              <p>
                TrustScope is committed to GDPR compliance. As a data processor, we:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process data only on documented customer instructions</li>
                <li>Ensure personnel are bound by confidentiality obligations</li>
                <li>Implement appropriate technical and organizational security measures</li>
                <li>Assist with data subject requests and impact assessments</li>
                <li>Notify customers of data breaches without undue delay</li>
                <li>Delete or return data upon termination of services</li>
                <li>Make available information necessary for compliance audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-6">Need a DPA?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Contact us to receive our standard Data Processing Agreement or discuss 
            custom requirements for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:legal@trustscope.ai" className="btn-primary">
              Request DPA
            </Link>
            <Link href="/privacy" className="btn-secondary">
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
