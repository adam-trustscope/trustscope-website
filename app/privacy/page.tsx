import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-slate-400 mb-8">Last updated: January 30, 2026</p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-slate-400">
                  TrustScope, Inc. ("TrustScope," "we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our AI governance platform and related services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-lg font-medium text-slate-300 mt-4 mb-2">Account Information</h3>
                <p className="text-slate-400">
                  When you create an account, we collect your name, email address, company name, and billing 
                  information necessary to provide our services.
                </p>
                
                <h3 className="text-lg font-medium text-slate-300 mt-4 mb-2">AI Agent Data</h3>
                <p className="text-slate-400">
                  TrustScope processes AI agent traces, including prompts, responses, tool calls, and metadata, 
                  as directed by you. This data is processed solely to provide our governance services and 
                  is stored in accordance with your data retention settings.
                </p>
                
                <h3 className="text-lg font-medium text-slate-300 mt-4 mb-2">Usage Data</h3>
                <p className="text-slate-400">
                  We collect information about how you interact with our dashboard, including pages viewed, 
                  features used, and actions taken.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-slate-400 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, investigate, and prevent security incidents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
                <p className="text-slate-400">
                  AI agent trace data is retained according to your subscription tier:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>Monitor (Free): 30 days</li>
                  <li>Protect ($49/mo): 90 days</li>
                  <li>Enforce ($249/mo): 1 year</li>
                  <li>Govern ($2K+/mo): 7 years</li>
                </ul>
                <p className="text-slate-400 mt-4">
                  You may request deletion of your data at any time by contacting privacy@trustscope.ai.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-slate-400">
                  We implement industry-standard security measures including:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
                  <li>Hash-chained audit trails with optional blockchain anchoring</li>
                  <li>Role-based access controls</li>
                  <li>Regular security assessments</li>
                  <li>SOC 2 Type II compliance (in progress)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
                <p className="text-slate-400">
                  We do not sell your personal information. We may share data with:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>Service providers who assist in operating our platform</li>
                  <li>Professional advisors (lawyers, accountants, auditors)</li>
                  <li>Law enforcement when required by law</li>
                  <li>Other parties in connection with a merger or acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                <p className="text-slate-400">
                  Depending on your location, you may have rights to:
                </p>
                <ul className="list-disc pl-6 text-slate-400 space-y-2 mt-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="text-slate-400 mt-4">
                  To exercise these rights, contact privacy@trustscope.ai.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. International Transfers</h2>
                <p className="text-slate-400">
                  Your data may be transferred to and processed in the United States. We use Standard 
                  Contractual Clauses and other safeguards for international transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="text-slate-400">
                  For privacy-related inquiries:
                </p>
                <p className="text-slate-300 mt-2">
                  TrustScope, Inc.<br />
                  Email: privacy@trustscope.ai<br />
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="text-slate-400">
                  We may update this Privacy Policy from time to time. We will notify you of material 
                  changes by posting the new policy on this page and updating the "Last updated" date.
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
