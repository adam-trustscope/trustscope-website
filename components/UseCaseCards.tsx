import Link from 'next/link'
import { ArrowRight, Eye, Shield, BadgeCheck } from 'lucide-react'

const cases = [
  {
    tag: 'VISIBILITY',
    icon: Eye,
    quote:
      'We had 6 AI agents in production. We had no idea what they were actually doing.',
    story:
      'An engineering manager discovered his team\u2019s AI tools were making 200+ unmonitored database calls per session. TrustScope surfaced it in the first hour.',
    outcome: 'Full visibility across every agent, every action, every model.',
    cta: 'See runtime visibility',
    href: '/visibility',
  },
  {
    tag: 'ENFORCEMENT',
    icon: Shield,
    quote:
      'An agent tried to DROP TABLE on our staging database. TrustScope blocked it.',
    story:
      'A developer asked their AI to \u201Cclean up test data.\u201D The agent interpreted it as destructive SQL. The command firewall caught it before execution. Zero damage. Zero downtime.',
    outcome: 'Dangerous actions blocked in-line. Developers keep shipping.',
    cta: 'See policy enforcement',
    href: '/enforcement',
  },
  {
    tag: 'EVIDENCE',
    icon: BadgeCheck,
    quote:
      'Two enterprise deals were stalled because we couldn\u2019t prove AI governance. Now we can.',
    story:
      'A VP of Engineering generated a signed audit trail \u2014 47,000 governed actions with cryptographic evidence. The customer\u2019s compliance team approved the same week. Both deals closed.',
    outcome:
      'Audit-ready evidence that replaces $500/hr compliance consultants.',
    cta: 'See compliance evidence',
    href: '/evidence',
  },
]

export default function UseCaseCards() {
  return (
    <section className="section-container py-16">
      <p className="eyebrow mb-8">WHAT TEAMS USE TRUSTSCOPE FOR</p>

      <div className="grid gap-3 md:grid-cols-3">
        {cases.map((item) => (
          <article key={item.tag} className="card flex h-full flex-col">
            <div className="mb-4 flex items-center gap-2">
              <item.icon className="h-4 w-4 text-[var(--text-muted)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {item.tag}
              </span>
            </div>

            <blockquote className="mb-4 border-l-2 border-[var(--brand)] pl-4 text-sm italic text-[var(--text-primary)]">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            <p className="text-sm text-[var(--text-secondary)]">{item.story}</p>

            <p className="mt-4 text-sm font-semibold text-[var(--brand)]">{item.outcome}</p>

            <Link
              href={item.href}
              className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]"
            >
              {item.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
