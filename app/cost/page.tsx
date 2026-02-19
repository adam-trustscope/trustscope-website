'use client';

import Link from 'next/link';
import {
  ArrowRight,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Wallet,
  PieChart,
  Ban,
} from 'lucide-react';
import { CTASection, FeatureGrid } from '@/components/ui';

// Metadata moved to layout or head for client component

const COST_ENGINES = [
  {
    icon: TrendingUp,
    title: 'Cost Velocity',
    description: 'Detect sudden spending increases before they spiral',
  },
  {
    icon: Wallet,
    title: 'Budget Caps',
    description: 'Set hard limits per agent. Alert at 80%, block at 100%',
  },
  {
    icon: BarChart3,
    title: 'Token Growth',
    description: 'Track token usage patterns and flag anomalies',
  },
  {
    icon: AlertTriangle,
    title: 'Cost Spike',
    description: 'Real-time alerts when costs exceed thresholds',
  },
];

export default function CostPage() {
  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm mb-6">
              <DollarSign className="w-4 h-4" />
              Cost Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your AI spend spiked.
              <br />
              <span className="text-[#C49B3A]">Here's why.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Token-level cost tracking. Budget anomaly detection. Per-agent cost
              attribution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#C49B3A] hover:bg-[#D4A843] text-white transition-colors"
              >
                Analyze Your Costs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://docs.trustscope.ai/cost"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                Cost Optimization Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Visibility */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See Where Your Money Goes
            </h2>
            <p className="text-lg text-slate-400">
              Per-agent, per-model, per-day cost breakdown
            </p>
          </div>

          {/* Mock cost breakdown */}
          <div className="max-w-4xl mx-auto p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <PieChart className="w-6 h-6 text-[#C49B3A]" />
                <span className="font-medium text-white">Cost Breakdown</span>
              </div>
              <span className="text-sm text-slate-500">Last 7 days</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-slate-400">CustomerBot</span>
                <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                </div>
                <span className="w-20 text-right font-mono text-white">$47/day</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-slate-400">ResearchAgent</span>
                <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }} />
                </div>
                <span className="w-20 text-right font-mono text-white">$16/day</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-32 text-sm text-slate-400">CodeReview</span>
                <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '8%' }} />
                </div>
                <span className="w-20 text-right font-mono text-white">$6/day</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-400">Optimization Found</div>
                  <p className="text-sm text-slate-400 mt-1">
                    CustomerBot: 68% of cost is GPT-4 calls that could use GPT-4o-mini.
                    <span className="text-amber-400 font-medium"> Estimated savings: $31/day ($930/month)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Engines */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cost Detection Engines
            </h2>
            <p className="text-lg text-slate-400">
              Automatic anomaly detection and budget enforcement
            </p>
          </div>

          <FeatureGrid features={COST_ENGINES} columns={4} />
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real-Time Anomaly Detection
            </h2>
            <p className="text-lg text-slate-400">
              Catch cost spikes before they hit your invoice
            </p>
          </div>

          {/* Mock anomaly visualization */}
          <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <span className="font-medium text-white">Cost Timeline</span>
              <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                Spike Detected
              </span>
            </div>

            {/* Simple bar chart visualization */}
            <div className="flex items-end gap-1 h-32 mb-4">
              {[20, 22, 25, 23, 21, 24, 85, 28, 26, 24, 22, 25].map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${
                    i === 6 ? 'bg-red-500' : 'bg-slate-700'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <div className="font-medium text-red-400">Cost Spike Detected</div>
                  <p className="text-sm text-slate-400 mt-1">
                    340% above daily average at 2:47 PM. Root cause: Agent entered loop,
                    made 847 redundant API calls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Enforcement */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Budget Enforcement
            </h2>
            <p className="text-lg text-slate-400">
              Set limits. Get alerts. Auto-block if needed.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50">
            <div className="font-mono text-sm">
              <div className="text-slate-500 mb-2"># Budget policy configuration</div>
              <div className="text-white">
                <span className="text-purple-400">policies</span>:
              </div>
              <div className="text-white pl-4">
                - <span className="text-blue-400">name</span>: "CustomerBot Budget"
              </div>
              <div className="text-white pl-4">
                <span className="text-blue-400">agent</span>: "customer-bot"
              </div>
              <div className="text-white pl-4">
                <span className="text-blue-400">daily_limit</span>:{' '}
                <span className="text-green-400">100.00</span>
              </div>
              <div className="text-white pl-4">
                <span className="text-blue-400">alert_at</span>:{' '}
                <span className="text-green-400">0.8</span>
                <span className="text-slate-500"> # 80%</span>
              </div>
              <div className="text-white pl-4">
                <span className="text-blue-400">block_at</span>:{' '}
                <span className="text-green-400">1.0</span>
                <span className="text-slate-500"> # 100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Take control of AI costs"
        subtext="Drop a trace file on our homepage scanner. See your cost breakdown in seconds — nothing leaves your browser."
        primaryCTA={{ label: 'Analyze Costs', href: '/' }}
        secondaryCTA={{ label: 'Read Cost Guide', href: '/docs/cost' }}
        variant="gradient"
      />
    </main>
  );
}
