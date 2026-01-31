import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-slate-400 mb-8">Last updated: January 30, 2026</p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-400">
                  By accessing or using TrustScope's AI governance platform ("Service"), you agree to be 
                  bound by these Terms of Service ("Terms"). If you are using the Service on behalf of 
                  an organization, you represent that you have authority to bind that organization to 
                  these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-slate-400">
                  TrustScope provides inline runtime governance infrastructure for AI agents, including:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>AI agent traffic monitoring and capture</li>
                  <li>Detection engines for security and compliance risks</li>
                  <li>Policy enforcement and blocking</li>
                  <li>Audit trail generation with cryptographic verification</li>
                  <li>Compliance evidence exports and Evidence Packs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
                <p className="text-slate-400">
                  You must register for an account to use the Service. You agree to provide accurate 
                  information and keep your account credentials secure. You are responsible for all 
                  activities under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment</h2>
                <p className="text-slate-400">
                  Paid subscriptions are billed monthly or annually in advance. Prices are subject to 
                  change with 30 days notice. You authorize us to charge your payment method for all 
                  fees incurred.
                </p>
                <p className="text-slate-400 mt-4">
                  <strong className="text-slate-300">Overage charges:</strong> Usage exceeding your plan 
                  limits will be billed at the overage rate specified in your plan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Your Data</h2>
                <p className="text-slate-400">
                  You retain ownership of all data you submit to the Service ("Customer Data"). You 
                  grant TrustScope a license to process Customer Data solely to provide the Service.
                </p>
                <p className="text-slate-400 mt-4">
                  You are responsible for ensuring you have the right to submit Customer Data and that 
                  your use complies with applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use</h2>
                <p className="text-slate-400">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>Use the Service for illegal purposes</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Interfere with the Service's operation</li>
                  <li>Reverse engineer or decompile the Service</li>
                  <li>Resell or redistribute the Service without authorization</li>
                  <li>Submit malicious code or content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Evidence Packs Disclaimer</h2>
                <p className="text-slate-400">
                  TrustScope generates evidence artifacts mapped to compliance frameworks. 
                  <strong className="text-slate-300"> Evidence Packs are auditor-consumable, not 
                  auditor-ready.</strong> We generate evidence; compliance determination requires qualified 
                  assessors. Framework mappings include rationale but may not reflect official regulatory 
                  guidance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
                <p className="text-slate-400">
                  TrustScope and its licensors retain all rights to the Service, including patents, 
                  copyrights, and trademarks. Nothing in these Terms grants you rights to TrustScope's 
                  intellectual property except as needed to use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-400">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRUSTSCOPE SHALL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS 
                  OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, REGARDLESS OF WHETHER TRUSTSCOPE HAS 
                  BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
                <p className="text-slate-400 mt-4">
                  TRUSTSCOPE'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNTS PAID BY YOU IN THE TWELVE 
                  MONTHS PRECEDING THE CLAIM.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
                <p className="text-slate-400">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
                  INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
                  NON-INFRINGEMENT.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
                <p className="text-slate-400">
                  You agree to indemnify TrustScope against claims arising from your use of the Service, 
                  your Customer Data, or your violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
                <p className="text-slate-400">
                  Either party may terminate these Terms with 30 days written notice. TrustScope may 
                  suspend or terminate your access immediately for violation of these Terms. Upon 
                  termination, your right to use the Service ends and we may delete your data after 
                  a reasonable period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
                <p className="text-slate-400">
                  These Terms are governed by the laws of the State of Delaware, without regard to 
                  conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
                <p className="text-slate-400">
                  We may modify these Terms at any time. Material changes will be notified via email 
                  or in-app notification at least 30 days before taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Contact</h2>
                <p className="text-slate-400">
                  For questions about these Terms:
                </p>
                <p className="text-slate-300 mt-2">
                  TrustScope, Inc.<br />
                  Email: legal@trustscope.ai
                </p>
              </section>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-700">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                Questions? Contact us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
