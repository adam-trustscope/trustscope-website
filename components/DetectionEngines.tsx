import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const tiers = [
  {
    name: 'Monitor',
    price: 'Free',
    count: 15,
    label: 'Foundation — rule-based runtime controls',
    color: 'text-[var(--text-secondary)]',
    borderColor: 'border-[var(--border)]',
    groups: [
      {
        name: 'Cost & Loops',
        engines:
          'Loop killer · Velocity monitor · Cost velocity · Budget caps · Token growth · Session duration · Session action limit',
      },
      {
        name: 'Content & Secrets',
        engines: 'Secrets scanner (60 patterns) · Blocked phrases · PII scanner (regex, 90 patterns)',
      },
      {
        name: 'Security',
        engines:
          'Prompt injection (57 patterns) · Jailbreak detector (46 patterns) · Command firewall (56 patterns)',
      },
      {
        name: 'Behavioral',
        engines: 'Oscillation detector · Error rate',
      },
    ],
  },
  {
    name: 'Protect',
    price: '$49/mo',
    count: 5,
    label: 'ML-assisted controls for contextual risk',
    color: 'text-[var(--interactive)]',
    borderColor: 'border-[var(--interactive)]/30',
    groups: [
      {
        name: 'Cloud engines',
        engines:
          'PII scanner (Presidio NER) · Prompt injection (ONNX) · Jailbreak (ONNX) · Toxicity filter · Data exfiltration',
      },
    ],
  },
  {
    name: 'Enforce',
    price: '$199/mo',
    count: 7,
    label: 'AI-powered analysis using your own LLM keys',
    color: 'text-[var(--brand)]',
    borderColor: 'border-[var(--brand)]/30',
    groups: [
      {
        name: 'AI-hybrid engines',
        engines:
          'Semantic firewall · Hallucination detector · Reasoning drift · Reasoning quality · A2A depth · Tool parameter validator · Bias monitor',
      },
    ],
  },
]

export default function DetectionEngines() {
  return (
    <section className="section-container py-16">
      <p className="eyebrow mb-4">DETECTION DEPTH</p>
      <h2 className="mb-10 text-4xl font-bold text-[var(--text-primary)]">
        27 engines. Three tiers of intelligence.
      </h2>

      <div className="grid gap-3 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className={`card flex flex-col border ${tier.borderColor}`}>
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <span className={`text-lg font-bold ${tier.color}`}>{tier.name}</span>
                <span className="ml-2 text-xs text-[var(--text-muted)]">
                  {tier.name === 'Monitor' ? `${tier.count} engines` : `adds ${tier.count}`}
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--text-muted)]">{tier.price}</span>
            </div>

            <p className="mb-4 text-xs text-[var(--text-muted)]">{tier.label}</p>

            <div className="space-y-3">
              {tier.groups.map((group) => (
                <div key={group.name}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
                    {group.name}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">{group.engines}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--text-muted)]">
        AI-hybrid engines run on your LLM provider. TrustScope never pays for or stores your LLM
        calls. Bring your own key.
      </p>

      <div className="mt-5 flex flex-wrap gap-5">
        <Link
          href="/visibility"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]"
        >
          See full engine details <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--interactive)]"
        >
          Compare plans <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
