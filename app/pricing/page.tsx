'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle } from 'lucide-react'

type Tier = {
  name: 'Monitor' | 'Protect' | 'Enforce' | 'Govern'
  tagline: string
  description: string
  monthly: number | null
  annual: number | null
  bullets: string[]
  ctaLabel: string
  ctaHref: string
  highlight?: boolean
  badge?: string
  badgeTone?: 'gold' | 'blue'
}

const tiers: Tier[] = [
  {
    name: 'Monitor',
    tagline: 'For individuals',
    description: 'See everything your AI agents do.',
    monthly: 0,
    annual: 0,
    bullets: [
      '15 detection engines (CPU/regex)',
      '30-day retention',
      '1 seat',
      'JSON logs',
    ],
    ctaLabel: 'Start Free',
    ctaHref: 'https://app.trustscope.ai/signup',
  },
  {
    name: 'Protect',
    tagline: 'For teams',
    description: 'Team visibility with runtime blocking.',
    monthly: 49,
    annual: 39,
    bullets: [
      '20 engines (+5 cloud)',
      '90-day retention',
      '5 seats',
      'Signed evidence + hash chain',
      'Runtime blocking',
    ],
    ctaLabel: 'Start Free, Upgrade Anytime',
    ctaHref: 'https://app.trustscope.ai/signup',
  },
  {
    name: 'Enforce',
    tagline: 'For compliance',
    description: 'Full detection suite with compliance evidence.',
    monthly: 199,
    annual: 159,
    bullets: [
      '27 engines (+7 AI-powered)',
      '1-year retention',
      '10 seats',
      'Timestamp anchoring + post-quantum crypto',
      'Agent DNA profiling',
      'SIEM + audit trail export',
    ],
    ctaLabel: 'Start Free, Upgrade Anytime',
    ctaHref: 'https://app.trustscope.ai/signup',
    highlight: true,
    badge: 'Popular',
    badgeTone: 'blue',
  },
  {
    name: 'Govern',
    tagline: 'For regulated industries',
    description: 'Enterprise compliance with zero-knowledge proofs.',
    monthly: null,
    annual: null,
    bullets: [
      '27 engines + ZKP signing',
      '7-year retention',
      '20+ seats',
      'Zero-knowledge proofs',
      'Custom encryption keys + BYOS',
      'Compliance exports (14 frameworks)',
      'SSO / SAML',
      'Dedicated SLA',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact',
    badge: 'Enterprise',
    badgeTone: 'gold',
  },
]

type ComparisonRow = {
  feature: string
  monitor: boolean | string
  protect: boolean | string
  enforce: boolean | string
  govern: boolean | string
}

const comparisonCategories: { category: string; rows: ComparisonRow[] }[] = [
  {
    category: 'Detection',
    rows: [
      { feature: 'Detection engines', monitor: '15', protect: '20', enforce: '27', govern: '27' },
      { feature: 'Agent DNA profiling', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'Integration paths', monitor: '9', protect: '9', enforce: '9', govern: '9' },
    ],
  },
  {
    category: 'Policies',
    rows: [
      { feature: 'Simulate mode', monitor: true, protect: true, enforce: true, govern: true },
      { feature: 'Alert mode', monitor: false, protect: true, enforce: true, govern: true },
      { feature: 'Block mode', monitor: false, protect: true, enforce: true, govern: true },
      { feature: 'Human approval workflows', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'Adaptive governance', monitor: false, protect: false, enforce: true, govern: true },
    ],
  },
  {
    category: 'Evidence',
    rows: [
      { feature: 'JSON logs', monitor: true, protect: true, enforce: true, govern: true },
      { feature: 'Ed25519 signatures', monitor: false, protect: true, enforce: true, govern: true },
      { feature: 'SHA-256 hash chain', monitor: false, protect: true, enforce: true, govern: true },
      { feature: 'Timestamp anchoring', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'Post-quantum crypto', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'Zero-knowledge proofs', monitor: false, protect: false, enforce: false, govern: true },
      { feature: 'Compliance exports (14 frameworks)', monitor: false, protect: false, enforce: false, govern: true },
    ],
  },
  {
    category: 'Platform',
    rows: [
      { feature: 'Seats included', monitor: '1', protect: '5', enforce: '10', govern: '20+' },
      { feature: 'Data retention', monitor: '30 days', protect: '90 days', enforce: '1 year', govern: '7 years' },
      { feature: 'API access', monitor: true, protect: true, enforce: true, govern: true },
      { feature: 'SIEM export', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'Audit trail export', monitor: false, protect: false, enforce: true, govern: true },
      { feature: 'SSO / SAML', monitor: false, protect: false, enforce: false, govern: true },
      { feature: 'Managed Endpoints add-on', monitor: false, protect: '$10/ep', enforce: '$10/ep', govern: 'Included' },
      { feature: 'Dedicated SLA', monitor: false, protect: false, enforce: false, govern: true },
    ],
  },
]

const faqs = [
  {
    q: 'What happens if I exceed my usage limits?',
    a: 'You will be notified before you hit any threshold. Paid plans can scale with add-on volume and plan upgrades. We never silently drop governed actions.',
  },
  {
    q: 'Can I try enforcement features before upgrading?',
    a: 'Yes. Simulate mode lets you test any policy at your current tier in observe-only mode — see what would be caught without affecting production traffic. Promote to alert or block when you are ready.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Monitor is free and starts immediately with no credit card required.',
  },
  {
    q: 'Do you support annual billing?',
    a: 'Yes. Annual pricing saves 20% and is shown as the effective monthly cost.',
  },
  {
    q: 'Who should choose Govern?',
    a: 'Teams in regulated industries that need long retention (up to 7 years), zero-knowledge proofs for privacy-preserving verification, custom encryption keys, and enterprise audit workflows with compliance exports across 14 frameworks.',
  },
  {
    q: 'What does "uses your own LLM key" mean?',
    a: 'AI-powered detection engines at the Enforce tier and above run inference through your own LLM API key. This keeps your data within your existing provider relationship and means TrustScope never processes your content through our own models.',
  },
  {
    q: 'How does evidence differ across tiers?',
    a: 'Monitor provides JSON logs. Protect adds Ed25519 signatures and SHA-256 hash chains for tamper evidence. Enforce adds timestamp anchoring and post-quantum cryptography. Govern adds zero-knowledge proofs so you can prove policy compliance to third parties without revealing underlying content.',
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      {/* ── Hero ── */}
      <section className="section-container max-w-6xl text-center">
        <p className="eyebrow mb-4">PRICING</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Start free. Scale with confidence.
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Monitor, Protect, Enforce, Govern. One model, one upgrade path.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              !annual
                ? 'bg-[var(--interactive)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              annual
                ? 'bg-[var(--interactive)] text-white'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            Annual (20% off)
          </button>
        </div>
      </section>

      {/* ── Tier Cards ── */}
      <section className="section-container mt-12 max-w-6xl">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => {
            const displayed =
              tier.monthly === null
                ? null
                : annual
                  ? tier.annual
                  : tier.monthly
            return (
              <article
                key={tier.name}
                className={`card flex h-full flex-col ${
                  tier.name === 'Govern'
                    ? 'border-[var(--brand-muted)]'
                    : tier.highlight
                      ? 'border-[var(--interactive)] shadow-lg shadow-[var(--interactive)]/20 ring-1 ring-[var(--interactive)]/30'
                      : ''
                }`}
              >
                {tier.badge && (
                  <div
                    className={`mb-3 inline-flex w-fit rounded-md px-2 py-1 text-xs font-semibold ${
                      tier.badgeTone === 'gold'
                        ? 'bg-[color:rgba(184,150,78,.16)] text-[var(--brand)]'
                        : 'bg-[color:rgba(37,99,235,.14)] text-[var(--interactive)]'
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}
                <h2 className="text-xl font-bold">{tier.name}</h2>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  {tier.tagline}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {tier.description}
                </p>

                <div className="mt-4">
                  {displayed === null ? (
                    <span className="text-3xl font-black">Contact Sales</span>
                  ) : displayed === 0 ? (
                    <span className="text-4xl font-black">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-black">
                        ${displayed}
                      </span>
                      <span className="ml-1 text-sm text-[var(--text-muted)]">
                        /mo
                      </span>
                    </>
                  )}
                </div>

                <ul className="mt-5 flex-1 space-y-2 text-sm text-[var(--text-secondary)]">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--status-success)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ${
                    tier.highlight
                      ? 'bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]'
                      : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tier.ctaLabel}
                </a>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Feature Comparison ── */}
      <section className="section-container mt-14 max-w-6xl">
        <details className="card group">
          <summary className="cursor-pointer list-none text-lg font-semibold">
            See full feature comparison
            <span className="ml-2 text-sm text-[var(--text-muted)] group-open:hidden">
              (expand)
            </span>
          </summary>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">
                    Feature
                  </th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">
                    Monitor
                  </th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">
                    Protect
                  </th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">
                    Enforce
                  </th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">
                    Govern
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((cat) => (
                  <>
                    <tr key={cat.category}>
                      <td
                        colSpan={5}
                        className="px-2 pb-1 pt-5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-[var(--border)] last:border-0"
                      >
                        <td className="px-2 py-3 text-[var(--text-primary)]">
                          {row.feature}
                        </td>
                        {(
                          ['monitor', 'protect', 'enforce', 'govern'] as const
                        ).map((key) => (
                          <td
                            key={key}
                            className="px-2 py-3 text-[var(--text-secondary)]"
                          >
                            {typeof row[key] === 'boolean' ? (
                              row[key] ? (
                                <Check className="h-4 w-4 text-[var(--status-success)]" />
                              ) : (
                                '—'
                              )
                            ) : (
                              <span className="text-sm">{row[key]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            AI-powered engines use your own LLM API key. Managed Endpoints
            available as add-on on paid tiers.
          </p>
        </details>
      </section>

      {/* ── FAQ ── */}
      <section className="section-container mt-14 max-w-6xl">
        <div className="card">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)]">
                  <span className="inline-flex items-start gap-2">
                    <HelpCircle className="mt-0.5 h-4 w-4 text-[var(--text-subtle)]" />
                    {faq.q}
                  </span>
                </summary>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="section-container mt-12 max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[var(--text-muted)]">
          <span>No credit card required</span>
          <span>Cancel anytime</span>
          <span>SOC 2 in progress</span>
          <span>Your data stays yours</span>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section-container mt-14 max-w-6xl text-center">
        <a
          href="https://app.trustscope.ai/signup"
          className="btn-primary gap-2"
        >
          Start Free <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  )
}
