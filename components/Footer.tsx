import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const footer = {
  platform: [
    { name: 'Visibility', href: '/visibility' },
    { name: 'Enforcement', href: '/enforcement' },
    { name: 'Evidence', href: '/evidence' },
    { name: 'Incidents', href: '/incidents' },
    { name: 'Safe Mode', href: '/safe-mode' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ],
  compliance: [
    { name: 'Overview', href: '/compliance' },
    { name: 'AIUC-1', href: '/compliance/aiuc-1' },
    { name: 'SOC 2', href: '/compliance/soc2' },
    { name: 'EU AI Act', href: '/compliance/eu-ai-act' },
    { name: 'NIST AI RMF', href: '/compliance/nist' },
    { name: 'ISO 42001', href: '/compliance/iso42001' },
  ],
  resources: [
    { name: 'Docs', href: 'https://docs.trustscope.ai' },
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Developers', href: '/developers' },
    { name: 'Scanner', href: '/scanner' },
    { name: 'Model Compare', href: '/switch' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Security', href: '/security' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'DPA', href: '/dpa' },
  ],
}

export default function Footer() {
  const sections = [
    { title: 'Platform', links: footer.platform },
    { title: 'Compliance', links: footer.compliance },
    { title: 'Resources', links: footer.resources },
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
              <div>800+ patent claims</div>
              <div>Apache-2.0 CLI</div>
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
