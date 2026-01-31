import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0066FF] to-[#00D4AA] rounded-lg"></div>
            <span className="text-xl font-bold">TrustScope</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a>
            <a href="#compliance" className="text-gray-400 hover:text-white transition">Compliance</a>
            <a href="https://docs.trustscope.ai" className="text-gray-400 hover:text-white transition">Docs</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://app.trustscope.ai" className="text-gray-400 hover:text-white transition">Login</a>
            <a href="https://app.trustscope.ai/signup" className="btn-primary">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="hero-glow top-20 left-1/4"></div>
        <div className="hero-glow top-40 right-1/4 opacity-50"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-400">Now with NIST AI RMF & EU AI Act compliance</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI Agent Governance<br />
            <span className="gradient-text">Made Simple</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Monitor, secure, and audit every AI agent interaction.
            Real-time observability with enterprise-grade compliance built in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="https://app.trustscope.ai/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </a>
            <a href="https://docs.trustscope.ai" className="btn-secondary text-lg px-8 py-4">
              View Documentation
            </a>
          </div>

          {/* Code snippet preview */}
          <div className="gradient-border p-6 text-left max-w-2xl mx-auto glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-gray-500">2 lines to integrate</span>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code className="text-gray-300">
{`from openai import OpenAI

client = OpenAI(
    base_url="`}<span className="text-[#00D4AA]">https://gateway.trustscope.ai/v1</span>{`",
    default_headers={"`}<span className="text-[#0066FF]">X-TrustScope-Key</span>{`": "ts_live_xxx"}
)

# Your existing code works unchanged`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">Works with every major LLM provider</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <span className="text-2xl font-semibold">OpenAI</span>
            <span className="text-2xl font-semibold">Anthropic</span>
            <span className="text-2xl font-semibold">Google</span>
            <span className="text-2xl font-semibold">Mistral</span>
            <span className="text-2xl font-semibold">Azure</span>
            <span className="text-2xl font-semibold">AWS</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-400">Complete AI agent governance in one platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👁️",
                title: "Real-Time Observability",
                description: "Monitor every AI interaction as it happens. Full visibility into prompts, responses, tool calls, and costs."
              },
              {
                icon: "🛡️",
                title: "Policy Enforcement",
                description: "Block harmful content, prevent data leaks, and enforce guardrails in real-time before responses reach users."
              },
              {
                icon: "🔐",
                title: "Cryptographic Audit Trail",
                description: "Tamper-proof logs with blockchain-anchored timestamps. Prove exactly what happened and when."
              },
              {
                icon: "🤖",
                title: "Agent Identity",
                description: "Track unique fingerprints for each AI agent. Detect behavioral drift and unauthorized changes."
              },
              {
                icon: "📊",
                title: "Cost Management",
                description: "Set budgets per agent, user, or team. Get alerts before costs spiral. Detailed usage analytics."
              },
              {
                icon: "📋",
                title: "Compliance Reports",
                description: "One-click exports for NIST AI RMF, EU AI Act, SOC 2, and more. Audit-ready documentation."
              }
            ].map((feature, i) => (
              <div key={i} className="gradient-border p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Integrate in Minutes</h2>
            <p className="text-xl text-gray-400">Three simple steps to governance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Point to Gateway",
                description: "Change one URL in your existing code. No SDK required. Works with OpenAI, Anthropic, and all major providers."
              },
              {
                step: "02",
                title: "Configure Policies",
                description: "Set up content filters, cost limits, and data protection rules in the dashboard. Apply to specific agents or globally."
              },
              {
                step: "03",
                title: "Monitor & Comply",
                description: "Watch interactions in real-time. Export compliance reports instantly. Sleep well knowing your AI is governed."
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Enterprise-Grade<br />
                <span className="gradient-text">Compliance</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Meet regulatory requirements with built-in support for major AI governance frameworks.
              </p>
              <ul className="space-y-4">
                {[
                  "NIST AI Risk Management Framework",
                  "EU AI Act (Article 9-13)",
                  "OWASP Agentic Security",
                  "SOC 2 Type II",
                  "HIPAA for healthcare AI",
                  "ISO 27001 controls"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-[#00D4AA]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="gradient-border p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>NIST AI RMF</span>
                  <span className="text-[#00D4AA]">98% Coverage</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>EU AI Act</span>
                  <span className="text-[#00D4AA]">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>SOC 2</span>
                  <span className="text-[#00D4AA]">Audit Ready</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span>OWASP Top 10</span>
                  <span className="text-[#00D4AA]">Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Govern Your AI?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Start monitoring in 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.trustscope.ai/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </a>
            <a href="mailto:sales@trustscope.ai" className="btn-secondary text-lg px-8 py-4">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0066FF] to-[#00D4AA] rounded-lg"></div>
                <span className="text-xl font-bold">TrustScope</span>
              </div>
              <p className="text-gray-400">AI Agent Governance Platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="https://docs.trustscope.ai" className="hover:text-white transition">Documentation</a></li>
                <li><a href="https://docs.trustscope.ai/api-reference/overview" className="hover:text-white transition">API Reference</a></li>
                <li><a href="https://status.trustscope.ai" className="hover:text-white transition">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
                <li><a href="mailto:contact@trustscope.ai" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500">&copy; 2026 TrustScope. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com/trustscope" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="https://github.com/trustscope-ai" className="text-gray-400 hover:text-white transition">GitHub</a>
              <a href="https://discord.gg/trustscope" className="text-gray-400 hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
