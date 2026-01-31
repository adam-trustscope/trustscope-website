'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, DollarSign, ShieldCheck, Bug, FileCheck, Terminal, Scale, Users, Puzzle, Gauge, CreditCard } from 'lucide-react'

const navigation = {
  product: {
    label: 'Product',
    items: [
      { name: 'Features', href: '/features', description: '16 detection engines for AI safety', icon: Gauge },
      { name: 'Integrations', href: '/integrations', description: 'LangChain, CrewAI, AutoGen & more', icon: Puzzle },
      { name: 'Pricing', href: '/pricing', description: 'Free tier to enterprise', icon: CreditCard },
    ],
  },
  solutions: {
    label: 'Solutions',
    sections: [
      {
        title: 'By Use Case',
        items: [
          { name: 'Stop Runaway Costs', href: '/solutions/stop-runaway-costs', description: 'Loop detection, budget caps', icon: DollarSign },
          { name: 'Prevent Data Leaks', href: '/solutions/prevent-data-leaks', description: 'PII scanner, secrets detection', icon: ShieldCheck },
          { name: 'Debug Agents', href: '/solutions/debug-agents', description: 'Traces, replay, Agent DNA', icon: Bug },
          { name: 'Pass Audits', href: '/solutions/pass-audits', description: 'Evidence Packs for compliance', icon: FileCheck },
        ],
      },
      {
        title: 'By Role',
        items: [
          { name: 'For Developers', href: '/developers', description: 'CLI-first, 30-second setup', icon: Terminal },
          { name: 'For Compliance', href: '/compliance', description: 'SOC 2, EU AI Act, NIST', icon: Scale },
          { name: 'For CTOs', href: '/leadership', description: 'Risk visibility, insurance-ready', icon: Users },
        ],
      },
    ],
  },
  frameworks: {
    label: 'Frameworks',
    items: [
      { name: 'Overview', href: '/compliance', description: 'All supported frameworks' },
      { name: 'SOC 2', href: '/compliance/soc2', description: 'CC8.1 evidence mapping' },
      { name: 'EU AI Act', href: '/compliance/eu-ai-act', description: 'Article 17 QMS requirements' },
      { name: 'NIST AI RMF', href: '/compliance/nist', description: '39 of 63 controls' },
      { name: 'ISO 42001', href: '/compliance/iso42001', description: 'AI management system' },
    ],
  },
}

const directLinks = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.trustscope.ai', external: true },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <nav className="section-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="TrustScope" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Product Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('product')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              {navigation.product.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'product' ? 'rotate-180' : ''}`} />
            </button>
            
            {openDropdown === 'product' && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 min-w-[280px]">
                  {navigation.product.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown (Mega Menu) */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('solutions')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              {navigation.solutions.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            
            {openDropdown === 'solutions' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 min-w-[600px]">
                  <div className="grid grid-cols-2 gap-8">
                    {navigation.solutions.sections.map((section) => (
                      <div key={section.title}>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                          {section.title}
                        </div>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                              <item.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                              <div>
                                <div className="font-medium text-white text-sm">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <Link 
                      href="/solutions" 
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      View all solutions →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Frameworks Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('frameworks')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-slate-400 hover:text-white transition-colors">
              {navigation.frameworks.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'frameworks' ? 'rotate-180' : ''}`} />
            </button>
            
            {openDropdown === 'frameworks' && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 min-w-[260px]">
                  {navigation.frameworks.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex flex-col p-3 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-sm text-slate-500">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct Links */}
          {directLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="https://app.trustscope.ai" className="text-slate-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="https://app.trustscope.ai" className="btn-primary">
            Start Free Trial
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 max-h-[80vh] overflow-y-auto">
          <div className="section-container py-4 space-y-6">
            {/* Product Section */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product</div>
              {navigation.product.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-slate-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Solutions Section */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Solutions</div>
              {navigation.solutions.sections.map((section) => (
                <div key={section.title} className="mb-4">
                  <div className="text-xs text-slate-600 mb-1">{section.title}</div>
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-slate-300 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Frameworks Section */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Frameworks</div>
              {navigation.frameworks.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-slate-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Direct Links */}
            <div className="pt-4 border-t border-slate-800">
              {directLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-slate-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <Link href="https://app.trustscope.ai" className="block text-slate-400 hover:text-white">
                Sign In
              </Link>
              <Link href="https://app.trustscope.ai" className="btn-primary block text-center">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
