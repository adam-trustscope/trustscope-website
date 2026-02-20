'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

const solutionLinks = [
  {
    name: 'Security Governance',
    href: '/secure',
    description: 'Runtime controls for leaks, injection, and unsafe actions',
  },
  {
    name: 'Cost Governance',
    href: '/cost',
    description: 'Budget, loop, and token controls for production agents',
  },
  {
    name: 'Migration Governance',
    href: '/switch#compare-upload',
    description: 'Baseline vs candidate trace comparison before cutover',
  },
  {
    name: 'Compliance Evidence',
    href: '/compliance',
    description: 'Framework-mapped receipts and audit-ready exports',
  },
  {
    name: 'Incident Response',
    href: '/incidents',
    description: 'Trace-level triage after production events',
  },
]

const complianceLinks = [
  { name: 'Overview', href: '/compliance' },
  { name: 'AIUC-1', href: '/compliance/aiuc-1' },
  { name: 'SOC 2', href: '/compliance/soc2' },
  { name: 'EU AI Act', href: '/compliance/eu-ai-act' },
  { name: 'NIST AI RMF', href: '/compliance/nist' },
  { name: 'ISO 42001', href: '/compliance/iso42001' },
]

const topLinks = [
  { name: 'Trace Analyzer', href: '/scanner' },
  { name: 'Developers', href: '/developers' },
  { name: 'Pricing', href: '/pricing' },
]

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<null | 'solutions' | 'compliance'>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItemClass =
    'whitespace-nowrap px-3 py-2 text-[17px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color:rgba(9,9,11,.9)] backdrop-blur-xl">
      <nav className="w-full">
        <div className="hidden h-20 w-full grid-cols-[260px_1fr_260px] items-center px-6 xl:px-8 lg:grid">
          <Link href="/" className="flex items-center justify-start">
            <img
              src="/brand/logo-horizontal-white.png"
              alt="TrustScope"
              className="h-auto w-[236px] max-w-none"
            />
          </Link>

          <div className="flex items-center justify-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('solutions')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`flex items-center gap-1 whitespace-nowrap ${navItemClass}`}>
                Use Cases <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'solutions' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-72 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl">
                    {solutionLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 hover:bg-[var(--surface-hover)]">
                        <div className="text-sm font-medium text-[var(--text-primary)]">{link.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{link.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('compliance')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`flex items-center gap-1 whitespace-nowrap ${navItemClass}`}>
                Compliance <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'compliance' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'compliance' && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-64 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl">
                    {complianceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {topLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navItemClass}>
                {link.name}
              </Link>
            ))}

            <a
              href="https://docs.trustscope.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={navItemClass}
            >
              Docs
            </a>
          </div>

          <div className="flex justify-end">
            <a href="https://app.trustscope.ai" className="btn-primary whitespace-nowrap !px-6 !py-2.5 !text-base">
              Start Free
            </a>
          </div>
        </div>

        <div className="flex h-20 items-center px-4 lg:hidden">
          <Link href="/" className="flex items-center">
            <img
              src="/brand/logo-horizontal-white.png"
              alt="TrustScope"
              className="h-auto w-[206px] max-w-none sm:w-[220px]"
            />
          </Link>

          <button
            className="ml-auto p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] lg:hidden">
          <div className="section-container space-y-5 py-4">
            <div>
              <div className="eyebrow mb-2">Use Cases</div>
              <div className="space-y-1">
                {solutionLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-2">Compliance</div>
              <div className="space-y-1">
                {complianceLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-1 border-t border-[var(--border)] pt-4">
              {topLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  {link.name}
                </Link>
              ))}
              <a
                href="https://docs.trustscope.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                Docs
              </a>
            </div>

            <a href="https://app.trustscope.ai" className="btn-primary block text-center">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
