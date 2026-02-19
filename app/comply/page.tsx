'use client';

import Link from 'next/link';
import {
  ArrowRight,
  FileCheck,
  Shield,
  Scale,
  Lock,
  CheckCircle,
  AlertTriangle,
  Hash,
  Calendar,
} from 'lucide-react';
import { CTASection, TierBadge } from '@/components/ui';

// Metadata moved to layout or head for client component

const FRAMEWORKS = [
  { name: 'EU AI Act', coverage: '8 of 10', status: 'active' },
  { name: 'NIST AI RMF', coverage: '39 of 63', status: 'active' },
  { name: 'ISO 42001', coverage: '18 of 26', status: 'active' },
  { name: 'SOC 2', coverage: '6 of 10', status: 'active' },
  { name: 'HIPAA', coverage: 'AI controls', status: 'active' },
  { name: 'AIUC-1', coverage: 'Full mapping', status: 'primary' },
];

const AIUC_DOMAINS = [
  {
    domain: 'A',
    name: 'AI Governance',
    description: 'Policy coverage, org structure evidence',
    coverage: 85,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    domain: 'B',
    name: 'Data Management',
    description: 'PII detection, content controls',
    coverage: 92,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20',
  },
  {
    domain: 'C',
    name: 'AI Model Management',
    description: 'DNA tracking, drift detection',
    coverage: 88,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    domain: 'D',
    name: 'AI Application Security',
    description: 'Injection/jailbreak detection',
    coverage: 95,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
  },
  {
    domain: 'E',
    name: 'AI Operations',
    description: 'Monitoring, alerting, incident response',
    coverage: 90,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    domain: 'F',
    name: 'Fairness & Transparency',
    description: 'Bias detection (ML-powered, custom engine)',
    coverage: 75,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10 border-pink-500/20',
  },
];

const EVIDENCE_CHAIN = [
  { step: 'Trace ingested', icon: FileCheck },
  { step: 'Engines evaluate', icon: Shield },
  { step: 'Policy checked', icon: Scale },
  { step: 'Receipt generated', icon: Hash },
  { step: 'Hash chain linked', icon: Lock },
  { step: 'Framework mapped', icon: Calendar },
];

export default function ComplyPage() {
  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
              <Scale className="w-4 h-4" />
              AIUC-1 Ready
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your auditor asked about AI.
              <br />
              <span className="text-[#C49B3A]">Here's your answer.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              AIUC-1 evidence across all 6 domains. Connect your agents, see your evidence coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#C49B3A] hover:bg-[#D4A843] text-white transition-colors"
              >
                Run Compliance Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                Book Compliance Walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Compliance Paradox */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Compliance Paradox
          </h2>
          <div className="text-lg text-slate-400 space-y-4">
            <p>
              You need to prove your AI followed the rules — without exposing the sensitive
              data it processed.
            </p>
            <p>
              Traditional audit logs fail because they either show{' '}
              <span className="text-white">too much</span> (privacy risk) or{' '}
              <span className="text-white">too little</span> (audit gap).
            </p>
            <p className="text-white font-medium">
              TrustScope's evidence chain proves WHICH checks ran without revealing WHAT
              data was checked.
            </p>
          </div>
        </div>
      </section>

      {/* Framework Coverage */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Framework Coverage
            </h2>
            <p className="text-lg text-slate-400">
              We generate evidence for 14 compliance frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {FRAMEWORKS.map((framework) => (
              <div
                key={framework.name}
                className={`p-4 rounded-xl border ${
                  framework.status === 'primary'
                    ? 'bg-[#C49B3A]/10 border-[#C49B3A]/30'
                    : 'bg-[#1a1f2e] border-slate-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{framework.name}</span>
                  {framework.status === 'primary' && (
                    <span className="text-xs text-[#C49B3A] font-medium">PRIMARY</span>
                  )}
                </div>
                <span className="text-sm text-slate-500">{framework.coverage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AIUC-1 Domains */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AIUC-1 Domain Coverage
            </h2>
            <p className="text-lg text-slate-400">
              Our primary framework alignment across 6 domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AIUC_DOMAINS.map((domain) => (
              <div
                key={domain.domain}
                className={`p-5 rounded-xl border ${domain.bgColor}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-lg font-bold ${domain.color}`}
                  >
                    Domain {domain.domain}
                  </span>
                </div>
                <h3 className="font-medium text-white mb-1">{domain.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{domain.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-current ${domain.color}`}
                      style={{ width: `${domain.coverage}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${domain.color}`}>
                    {domain.coverage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Chain */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Evidence Chain
            </h2>
            <p className="text-lg text-slate-400">
              Every AI action generates verifiable proof
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {EVIDENCE_CHAIN.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1f2e] border border-slate-700/50">
                    <Icon className="w-4 h-4 text-[#C49B3A]" />
                    <span className="text-sm text-white">{step.step}</span>
                  </div>
                  {i < EVIDENCE_CHAIN.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Compliance-Ready Tiers
            </h2>
            <p className="text-lg text-slate-400">
              Most compliance teams start at Enforce
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <TierBadge tier="enforce" size="md" />
                <span className="text-xl font-bold text-white">$249/mo</span>
              </div>
              <ul className="space-y-2">
                {[
                  'Policy enforcement + blocking',
                  'AIUC-1 compliance exports',
                  'Evidence Packs (validation)',
                  '1-year retention',
                  '25 detection engines (6 AI)',
                  '5 seats included',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-[#C49B3A]/10 border border-[#C49B3A]/30">
              <div className="flex items-center justify-between mb-4">
                <TierBadge tier="govern" size="md" />
                <span className="text-xl font-bold text-white">$2K+/mo</span>
              </div>
              <ul className="space-y-2">
                {[
                  'Ed25519 + BYOK signing',
                  'Evidence Packs (full signed, court-ready)',
                  '7-year retention',
                  'Evidence Room portal',
                  'ZKP layer (beta)',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#C49B3A]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready for your next audit?"
        subtext="Connect your agents to start generating AIUC-1 evidence. Enforce tier includes validation packs, Govern tier includes signed evidence."
        primaryCTA={{ label: 'Get Started Free', href: 'https://app.trustscope.ai' }}
        secondaryCTA={{ label: 'Talk to Compliance Team', href: '/contact' }}
        variant="gradient"
      />
    </main>
  );
}
