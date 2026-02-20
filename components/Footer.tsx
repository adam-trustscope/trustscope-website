import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const footer = {
  product: [
    { name: 'Trace Analyzer', href: '/scanner' },
    { name: 'Simulate', href: '/switch' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ],
  solutions: [
    { name: 'Development Governance', href: '/build' },
    { name: 'Security Governance', href: '/secure' },
    { name: 'Cost Governance', href: '/cost' },
    { name: 'Compliance Urgency', href: '/comply' },
    { name: 'Migration Governance', href: '/switch#compare-upload' },
    { name: 'Compliance Evidence', href: '/compliance' },
    { name: 'Incident Response', href: '/incidents' },
  ],
  compliance: [
    { name: 'Overview', href: '/compliance' },
    { name: 'AIUC-1', href: '/compliance/aiuc-1' },
    { name: 'SOC 2', href: '/compliance/soc2' },
    { name: 'EU AI Act', href: '/compliance/eu-ai-act' },
    { name: 'NIST AI RMF', href: '/compliance/nist' },
    { name: 'ISO 42001', href: '/compliance/iso42001' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'DPA', href: '/dpa' },
  ],
}

export default function Footer() {
  const sections = [
    { title: 'Product', links: footer.product },
    { title: 'Use Cases', links: footer.solutions },
    { title: 'Compliance', links: footer.compliance },
    { title: 'Company', links: footer.company },
  ]

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[color:rgba(17,17,19,.8)]">
      <div className="section-container py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <img src="/brand/logo-horizontal-white.png" alt="TrustScope" className="h-7 w-auto" />
            </Link>
            <p className="mt-3 text-xs text-[var(--text-muted)]">Know. Control. Prove.</p>
            <div className="mt-4 flex gap-3 text-[var(--text-muted)]">
              <a href="https://twitter.com/trustscope" aria-label="Twitter" className="hover:text-[var(--text-primary)]"><Twitter className="h-5 w-5" /></a>
              <a href="https://github.com/trustscope" aria-label="GitHub" className="hover:text-[var(--text-primary)]"><Github className="h-5 w-5" /></a>
              <a href="https://linkedin.com/company/trustscope" aria-label="LinkedIn" className="hover:text-[var(--text-primary)]"><Linkedin className="h-5 w-5" /></a>
            </div>
            <div className="mt-4 space-y-1 text-[10px] text-[var(--text-subtle)]">
              <div>274+ patent claims</div>
              <div>MIT licensed CLI</div>
              <div>SOC 2 in progress</div>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-[var(--text-secondary)]">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-subtle)]">
          © 2026 TrustScope, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
