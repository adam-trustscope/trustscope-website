'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, HelpCircle } from 'lucide-react'

type Tier = {
  name: 'Monitor' | 'Protect' | 'Enforce' | 'Govern'
  description: string
  monthly: number | null
  annual: number | null
  traces: string
  retention: string
  engines: string
  seats: string
  ctaLabel: string
  ctaHref: string
  highlight?: boolean
  badge?: string
  badgeTone?: 'gold' | 'blue'
}

const tiers: Tier[] = [
  {
    name: 'Monitor',
    description: 'See everything your AI does',
    monthly: 0,
    annual: 0,
    traces: '5,000 traces/month',
    retention: '30 days',
    engines: '15 engines (CPU/regex)',
    seats: '1 seat',
    ctaLabel: 'Start Free',
    ctaHref: '/scanner',
  },
  {
    name: 'Protect',
    description: 'Block threats before damage',
    monthly: 49,
    annual: 39,
    traces: '25,000 traces/month',
    retention: '90 days',
    engines: '20 engines (+5 ML)',
    seats: '3 seats',
    ctaLabel: 'Start Free, Upgrade Anytime',
    ctaHref: 'https://app.trustscope.ai',
  },
  {
    name: 'Enforce',
    description: 'AI engines + compliance exports',
    monthly: 249,
    annual: 199,
    traces: '100,000 traces/month',
    retention: '1 year',
    engines: '26 engines (+6 AI-hybrid)',
    seats: '5 seats',
    ctaLabel: 'Start Free, Upgrade Anytime',
    ctaHref: 'https://app.trustscope.ai',
    highlight: true,
    badge: 'Most teams start here',
    badgeTone: 'blue',
  },
  {
    name: 'Govern',
    description: 'Signed evidence + audit proof',
    monthly: null,
    annual: null,
    traces: '500,000+ traces/month',
    retention: '7 years',
    engines: '26 + evidence signing',
    seats: 'Unlimited',
    ctaLabel: 'Talk to Sales',
    ctaHref: '/contact',
    badge: 'Gold standard evidence',
    badgeTone: 'gold',
  },
]

const comparison = [
  { feature: 'Browser trace analyzer', monitor: true, protect: true, enforce: true, govern: true },
  { feature: 'Runtime blocking', monitor: false, protect: true, enforce: true, govern: true },
  { feature: 'ML engines (+5)', monitor: false, protect: true, enforce: true, govern: true },
  { feature: 'AI-hybrid engines (+6)', monitor: false, protect: false, enforce: true, govern: true },
  { feature: 'Natural language policies', monitor: false, protect: false, enforce: true, govern: true },
  { feature: 'Compliance exports', monitor: false, protect: false, enforce: true, govern: true },
  { feature: 'Evidence signing', monitor: false, protect: false, enforce: false, govern: true },
  { feature: 'SIEM integration', monitor: false, protect: false, enforce: false, govern: true },
  { feature: 'BYOK signing', monitor: false, protect: false, enforce: false, govern: true },
]

const faqs = [
  {
    q: 'What happens if I exceed my trace limit?',
    a: 'You will be notified before limit thresholds. Paid plans can scale with add-on volume and plan upgrades.',
  },
  {
    q: 'Can I try Enforce features before upgrading?',
    a: 'Yes. Simulate mode shows what Enforce engines would catch on your current traffic before you enable blocking.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Monitor starts immediately with no card required.',
  },
  {
    q: 'Do you support annual billing?',
    a: 'Yes. Annual pricing is discounted by 20% and represented as effective monthly cost.',
  },
  {
    q: 'Who should choose Govern?',
    a: 'Teams requiring long retention, signed evidence chains, and enterprise audit workflows.',
  },
  {
    q: 'What if I need more than 500,000 traces per month?',
    a: 'Govern supports larger custom volumes. Contact the team and we will scope retention, throughput, and export requirements.',
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const trustStrip = useMemo(
    () => ['No credit card required', 'Cancel anytime', 'Your data is always yours', 'Full API export'],
    []
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] py-14">
      <section className="section-container max-w-6xl text-center">
        <p className="eyebrow mb-4">Pricing</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">Start free. Scale with confidence.</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-secondary)]">
          Monitor, Protect, Enforce, Govern. One model, one upgrade path, no naming confusion.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm ${!annual ? 'bg-[var(--interactive)] text-white' : 'text-[var(--text-secondary)]'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm ${annual ? 'bg-[var(--interactive)] text-white' : 'text-[var(--text-secondary)]'}`}
          >
            Annual (20% off)
          </button>
        </div>
      </section>

      <section className="section-container mt-12 max-w-6xl">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => {
            const displayed = tier.monthly === null ? null : annual ? tier.annual : tier.monthly
            return (
              <article
                key={tier.name}
                className={`card flex h-full flex-col ${
                  tier.name === 'Govern'
                    ? 'border-[var(--brand-muted)]'
                    : tier.highlight
                      ? 'border-[var(--interactive)]'
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
                <p className="mt-1 text-sm text-[var(--text-muted)]">{tier.description}</p>

                <div className="mt-4">
                  {displayed === null ? (
                    <>
                      <span className="text-4xl font-black">$2K+</span>
                      <span className="ml-1 text-sm text-[var(--text-muted)]">/mo</span>
                    </>
                  ) : displayed === 0 ? (
                    <span className="text-4xl font-black">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-black">${displayed}</span>
                      <span className="ml-1 text-sm text-[var(--text-muted)]">/mo</span>
                    </>
                  )}
                </div>

                <ul className="mt-5 flex-1 space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>{tier.traces}</li>
                  <li>{tier.retention} retention</li>
                  <li>{tier.engines}</li>
                  <li>{tier.seats}</li>
                </ul>

                <a
                  href={tier.ctaHref}
                  className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ${
                    tier.highlight ? 'bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]' : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tier.ctaLabel}
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <details className="card group">
          <summary className="cursor-pointer list-none text-lg font-semibold">
            See full feature comparison
            <span className="ml-2 text-sm text-[var(--text-muted)] group-open:hidden">(expand)</span>
          </summary>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">Feature</th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">Monitor</th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">Protect</th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">Enforce</th>
                  <th className="px-2 py-3 text-[var(--text-secondary)]">Govern</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-2 py-3 text-[var(--text-primary)]">{row.feature}</td>
                    {(['monitor', 'protect', 'enforce', 'govern'] as const).map((key) => (
                      <td key={key} className="px-2 py-3 text-[var(--text-secondary)]">
                        {row[key] ? <Check className="h-4 w-4 text-[var(--status-success)]" /> : '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            Notes: SIEM integration is Govern only. Docker and deprecated add-ons are not included in current plans.
          </p>
        </details>
      </section>

      <section className="section-container mt-14 max-w-6xl">
        <div className="card">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)]">
                  <span className="inline-flex items-start gap-2">
                    <HelpCircle className="mt-0.5 h-4 w-4 text-[var(--text-subtle)]" />
                    {faq.q}
                  </span>
                </summary>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container mt-12 max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-[var(--text-muted)]">
          {trustStrip.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section-container mt-14 max-w-6xl text-center">
        <Link href="/scanner" className="btn-primary">Run Free Trace Analysis</Link>
      </section>
    </div>
  )
}
