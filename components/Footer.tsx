import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Documentation', href: 'https://docs.trustscope.ai', external: true },
    { name: 'Changelog', href: '/changelog' },
  ],
  solutions: [
    { name: 'Overview', href: '/solutions' },
    { name: 'Stop Runaway Costs', href: '/solutions/stop-runaway-costs' },
    { name: 'Prevent Data Leaks', href: '/solutions/prevent-data-leaks' },
    { name: 'Debug Agents', href: '/solutions/debug-agents' },
    { name: 'Pass Audits', href: '/solutions/pass-audits' },
  ],
  roles: [
    { name: 'For Developers', href: '/developers' },
    { name: 'For Compliance', href: '/compliance' },
    { name: 'For CTOs', href: '/leadership' },
  ],
  compliance: [
    { name: 'Framework Overview', href: '/compliance' },
    { name: 'SOC 2', href: '/compliance/soc2' },
    { name: 'EU AI Act', href: '/compliance/eu-ai-act' },
    { name: 'NIST AI RMF', href: '/compliance/nist' },
    { name: 'ISO 42001', href: '/compliance/iso42001' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Incidents', href: '/incidents' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'DPA', href: '/dpa' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="TrustScope" className="h-8" />
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Evidence infrastructure for AI agents. Document that your AI followed policy with cryptographically signed evidence.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com/trustscope" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/trustscope" className="text-slate-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/trustscope" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white text-sm transition-colors"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Role */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300">By Role</h4>
            <ul className="space-y-3">
              {footerLinks.roles.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300">Frameworks</h4>
            <ul className="space-y-3">
              {footerLinks.compliance.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-slate-300">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 TrustScope, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Evidence Infrastructure for AI Agents</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
