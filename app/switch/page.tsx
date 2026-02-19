'use client';

import Link from 'next/link';
import {
  ArrowRight,
  GitCompare,
  FileCheck,
  Users,
  Shield,
  Dna,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
} from 'lucide-react';
import { CTASection, StatsBar } from '@/components/ui';

// Metadata moved to layout or head for client component

const DNA_STRANDS = [
  { name: 'Model', description: 'Which model processed the request' },
  { name: 'System Prompt', description: 'Instruction adherence patterns' },
  { name: 'Tool Usage', description: 'Which tools and how often' },
  { name: 'Output Format', description: 'JSON, markdown, prose patterns' },
  { name: 'Response Length', description: 'Token distribution' },
  { name: 'Latency', description: 'Response time patterns' },
  { name: 'Error Patterns', description: 'Failure modes and recovery' },
  { name: 'Cost Profile', description: 'Token and dollar costs' },
];

const MIGRATION_STEPS = [
  {
    step: 1,
    title: 'Capture baseline DNA',
    description: 'Upload traces from your current production model',
    icon: Upload,
  },
  {
    step: 2,
    title: 'Run candidate model',
    description: 'Upload traces from your candidate model (Replay and Shadow routing coming soon)',
    icon: GitCompare,
  },
  {
    step: 3,
    title: 'Compare 8 strands',
    description: 'Automated divergence analysis across all behavioral dimensions',
    icon: Dna,
  },
  {
    step: 4,
    title: 'Human review + approve',
    description: 'Your team reviews divergence and approves (Enforce+ for approval workflows)',
    icon: Users,
  },
  {
    step: 5,
    title: 'Signed evidence pack',
    description: 'Cryptographic proof the migration was governed',
    icon: FileCheck,
  },
];

export default function SwitchPage() {
  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
              <Clock className="w-4 h-4" />
              Model deprecation? Prove the new one is safe.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Switching models?
              <br />
              <span className="text-[#C49B3A]">Prove the new one is safe.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              8-strand behavioral DNA comparison. Signed evidence. 15 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#C49B3A] hover:bg-[#D4A843] text-white transition-colors"
              >
                Compare Models Now — Free with Protect tier
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://docs.trustscope.ai/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                View Documentation
              </Link>
            </div>
          </div>

          {/* Two-panel upload visualization */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700/50 border-dashed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Before Traces</div>
                  <div className="text-sm text-slate-500">Current production model</div>
                </div>
              </div>
              <div className="text-center py-8 text-slate-500 text-sm">
                Drop GPT-4 traces here
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700/50 border-dashed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-white">After Traces</div>
                  <div className="text-sm text-slate-500">Candidate replacement model</div>
                </div>
              </div>
              <div className="text-center py-8 text-slate-500 text-sm">
                Drop GPT-4o traces here
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">The Problem</h2>
          <div className="text-lg text-slate-400 space-y-4">
            <p>
              Model deprecations happen 4-8 times per year. Each one affects thousands of
              companies. Your agent worked fine on GPT-4. Does it work on GPT-4o? On Claude
              3.5? On Gemini?
            </p>
            <p className="text-white font-medium">
              You don't know until production breaks.
            </p>
          </div>

          {/* Timeline visual */}
          <div className="mt-8 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
              <span>2023</span>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
            <div className="relative h-2 bg-slate-800 rounded-full">
              {/* Deprecation markers */}
              {[15, 30, 45, 55, 70, 85].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-amber-500 rounded-full -top-0.5"
                  style={{ left: `${pos}%` }}
                  title="Model deprecation event"
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              Every dot is a company scrambling without evidence.
            </p>
          </div>
        </div>
      </section>

      {/* DNA Comparison Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              8-Strand Behavioral DNA Comparison
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We compare your agents across 8 behavioral dimensions. Not just "does it work"
              — but "does it behave the same way?"
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {DNA_STRANDS.map((strand, i) => (
              <div
                key={strand.name}
                className="p-4 rounded-xl bg-[#1a1f2e] border border-slate-700/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Dna className="w-4 h-4 text-[#C49B3A]" />
                  <span className="text-sm font-medium text-white">{strand.name}</span>
                </div>
                <p className="text-xs text-slate-500">{strand.description}</p>
              </div>
            ))}
          </div>

          {/* Example comparison */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-amber-500/10 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-4">
              <GitCompare className="w-5 h-5 text-[#C49B3A]" />
              <span className="font-medium text-white">Example Comparison</span>
            </div>
            <p className="text-slate-300 mb-4">
              <span className="text-white font-medium">GPT-4 agent vs GPT-4o:</span>{' '}
              94% behavioral match. But response length dropped 23% and tool usage
              patterns changed.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                6 strands matched
              </div>
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                2 strands diverged
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Workflow */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Governed Migration Workflow
            </h2>
            <p className="text-lg text-slate-400">
              Five steps to a safe, documented model switch
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {MIGRATION_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-4 rounded-xl bg-[#1a1f2e] border border-slate-700/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C49B3A]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#C49B3A]" />
                    </div>
                    <span className="text-xs font-medium text-[#C49B3A]">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-medium text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Evidence Output */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Evidence You Can Show
            </h2>
            <p className="text-lg text-slate-400">
              Every migration produces a signed evidence pack
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#C49B3A]/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-[#C49B3A]" />
              </div>
              <div>
                <div className="font-medium text-white">Migration Evidence Pack</div>
                <div className="text-sm text-slate-500">Cryptographically signed</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'DNA comparison report (before/after)',
                'Divergence analysis per strand',
                'Human disposition record (who approved, when, why)',
                'Cryptographic signature chain',
                'AIUC-1 mapping (which domains affected)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar
        stats={[
          { number: 8, label: 'DNA Strands' },
          { number: 90, label: 'Avg Match Rate', suffix: '%', prefix: '~' },
          { number: 15, label: 'Minutes to Compare', prefix: '<' },
        ]}
      />

      {/* CTA */}
      <CTASection
        headline="Ready to switch models safely?"
        subtext="Upload traces from your current and candidate models. Get a signed comparison report."
        primaryCTA={{ label: 'Compare Models Now', href: '/scanner' }}
        secondaryCTA={{ label: 'View Documentation', href: 'https://docs.trustscope.ai/getting-started' }}
        variant="gradient"
      />
    </main>
  );
}
