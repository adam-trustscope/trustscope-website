'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, HelpCircle, Eye, Shield, Lock, FileCheck } from 'lucide-react';

const TIERS = [
  {
    name: 'Monitor',
    price: { monthly: 0, annual: 0 },
    description: 'See everything your AI does',
    traces: '5,000/month',
    retention: '30 days',
    engines: '19 (alert only)',
    policies: '3 policies',
    seats: '1 seat',
    icon: Eye,
    color: 'slate',
    cta: 'Start Free',
    ctaLink: '/scanner',
    features: {
      'Browser scanner': true,
      'Health Check imports (summary only)': 'Unlimited',
      'Store imports (traces persist)': '5K stored',
      '19 detection engines': true,
      'Real-time blocking': false,
      'Agent DNA': false,
      'OTel fanout (LangSmith, LangFuse, any OTLP)': true,
      'AI hybrid engines (6)': false,
      'Natural language policies': false,
      'AIUC-1 exports': false,
      'SIEM integration (Datadog)': false,
      'Evidence signing': false,
      'Evidence Room': false,
      'BYOK signing': false,
      'BYO Storage': false,
      'Support': 'Community',
      'Notifications': 'Dashboard + Discord + Telegram',
    },
  },
  {
    name: 'Protect',
    price: { monthly: 49, annual: 470 },
    description: 'Block threats before damage',
    traces: '25,000/month',
    retention: '90 days',
    engines: '19 + blocking',
    policies: 'Unlimited',
    seats: '3 seats',
    icon: Shield,
    color: 'blue',
    cta: 'Start Free, Upgrade Anytime',
    ctaLink: 'https://app.trustscope.ai',
    features: {
      'Browser scanner': true,
      'Health Check imports (summary only)': false,
      'Store imports (traces persist)': '100K stored',
      '19 detection engines': true,
      'Real-time blocking': true,
      'Agent DNA': true,
      'OTel fanout (LangSmith, LangFuse, any OTLP)': true,
      'AI hybrid engines (6)': false,
      'Natural language policies': false,
      'AIUC-1 exports': false,
      'SIEM integration (Datadog)': false,
      'Evidence signing': false,
      'Evidence Room': false,
      'BYOK signing': false,
      'BYO Storage': false,
      'Support': 'Email',
      'Notifications': 'All + Slack + Email',
    },
  },
  {
    name: 'Enforce',
    price: { monthly: 249, annual: 2388 },
    description: 'AI engines + compliance exports',
    traces: '100,000/month',
    retention: '1 year',
    engines: '25 (6 AI hybrid)',
    policies: 'Natural language',
    seats: '5 seats',
    icon: Lock,
    color: 'gold',
    recommended: true,
    cta: 'Start Free, Upgrade Anytime',
    ctaLink: 'https://app.trustscope.ai',
    features: {
      'Browser scanner': true,
      'Health Check imports (summary only)': false,
      'Store imports (traces persist)': '500K stored',
      '19 detection engines': true,
      'Real-time blocking': true,
      'Agent DNA': true,
      'OTel fanout (LangSmith, LangFuse, any OTLP)': true,
      'AI hybrid engines (6)': true,
      'Natural language policies': true,
      'AIUC-1 exports': 'Validation packs',
      'SIEM integration (Datadog)': false,
      'Evidence signing': false,
      'Evidence Room': false,
      'BYOK signing': false,
      'BYO Storage': false,
      'Support': 'Email + Priority',
      'Notifications': 'All + Webhooks + MS Teams',
    },
  },
  {
    name: 'Govern',
    price: { monthly: 2000, annual: 19200 },
    description: 'Signed evidence + compliance proof',
    traces: '500,000+/month',
    retention: '7 years',
    engines: '25 + signing',
    policies: 'Unlimited',
    seats: 'Unlimited',
    icon: FileCheck,
    color: 'emerald',
    cta: 'Talk to Sales',
    ctaLink: '/contact',
    features: {
      'Browser scanner': true,
      'Health Check imports (summary only)': false,
      'Store imports (traces persist)': 'Unlimited',
      '19 detection engines': true,
      'Real-time blocking': true,
      'Agent DNA': true,
      'OTel fanout (LangSmith, LangFuse, any OTLP)': true,
      'AI hybrid engines (6)': true,
      'Natural language policies': true,
      'AIUC-1 exports': 'Full signed packs',
      'SIEM integration (Datadog)': true,
      'Evidence signing': 'Ed25519',
      'Evidence Room': true,
      'BYOK signing': true,
      'BYO Storage': 'Your PostgreSQL, our compute',
      'Support': 'Dedicated',
      'Notifications': 'All channels',
    },
  },
];

const FAQS = [
  {
    question: 'What happens if I hit my trace limit?',
    answer: 'We notify you at 80% and 100% usage. Monitor tier has a hard cap. Paid tiers can purchase additional traces at $0.002/trace overage.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes. Upgrade instantly, downgrade at next billing cycle. No contracts on monthly plans.',
  },
  {
    question: 'Do you offer a startup discount?',
    answer: 'Yes. Startups under $5M funding get 50% off the first year. Contact us with your funding details.',
  },
  {
    question: "What's the difference between Health Check and Store?",
    answer: 'Health Check analyzes traces and generates a findings summary, then discards the raw trace data. It\'s unlimited on the free Monitor tier — great for one-time audits. Paid tiers always use Store mode, which persists traces for replay, DNA fingerprinting, and evidence generation.',
  },
  {
    question: 'Is there an on-premise option?',
    answer: 'At launch, TrustScope is cloud-only across all tiers. Govern tier includes BYO Storage — your PostgreSQL database, our compute layer — for data sovereignty requirements. Full on-premises deployment is on our roadmap.',
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'Yes. Annual billing saves 20% across all paid tiers.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Credit card, ACH, wire transfer. Enterprise invoicing available on Govern tier.',
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes. Full data export available anytime via API or dashboard. Your data is always yours.',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <section className="pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start free. Scale with confidence.
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            No credit card required. Upgrade when you need more.
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !annual ? 'bg-[#C49B3A] text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                annual ? 'bg-[#C49B3A] text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual <span className="text-xs opacity-75">(20% off)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              const price = annual ? tier.price.annual : tier.price.monthly;
              const isGovern = tier.name === 'Govern';

              return (
                <div
                  key={tier.name}
                  className={`relative rounded-xl p-6 border-2 transition-all ${
                    tier.recommended
                      ? 'border-[#C49B3A] bg-[#C49B3A]/5 ring-2 ring-[#C49B3A]/20'
                      : 'border-slate-700 bg-[#1a1f2e]'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C49B3A] text-black text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMENDED
                    </div>
                  )}

                  <Icon
                    className={`w-8 h-8 mb-4 ${
                      tier.color === 'gold'
                        ? 'text-[#C49B3A]'
                        : tier.color === 'blue'
                        ? 'text-blue-400'
                        : tier.color === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  />

                  <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{tier.description}</p>

                  <div className="mb-4">
                    {isGovern ? (
                      <div className="text-3xl font-bold text-white">$2K+</div>
                    ) : price === 0 ? (
                      <div className="text-3xl font-bold text-white">Free</div>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold text-white">
                          ${annual ? Math.round(price / 12) : price}
                        </span>
                        <span className="text-slate-400">/mo</span>
                        {annual && price > 0 && (
                          <div className="text-xs text-slate-500">
                            ${price}/year billed annually
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href={tier.ctaLink}
                    className={`block text-center py-3 rounded-lg font-medium transition-colors mb-6 ${
                      tier.recommended
                        ? 'bg-[#C49B3A] hover:bg-[#D4A843] text-black'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {tier.cta}
                  </Link>

                  <div className="space-y-2 text-sm">
                    <div className="text-slate-300">
                      <strong>{tier.traces}</strong>
                    </div>
                    <div className="text-slate-400">{tier.retention} retention</div>
                    <div className="text-slate-400">{tier.engines}</div>
                    <div className="text-slate-400">{tier.seats}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Full Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-300">Feature</th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      className={`text-center py-4 px-4 font-semibold ${
                        tier.recommended ? 'text-[#C49B3A]' : 'text-slate-300'
                      }`}
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(TIERS[0].features).map((feature) => (
                  <tr key={feature} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-400">{feature}</td>
                    {TIERS.map((tier) => {
                      const value = tier.features[feature as keyof typeof tier.features];
                      return (
                        <td key={tier.name} className="text-center py-3 px-4">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-slate-600 mx-auto" />
                            )
                          ) : (
                            <span className="text-slate-300">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need custom volumes, on-prem deployment, or framework mapping?
            </h2>
            <p className="text-slate-400 mb-6">
              Govern tier includes dedicated support, custom integrations, and compliance mapping.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Talk to Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                <h3 className="font-medium text-white mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#C49B3A] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-slate-400 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to govern your AI agents?
          </h2>
          <p className="text-slate-400 mb-8">
            Start free. No credit card required. See results in 5 minutes.
          </p>
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Try the Scanner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
