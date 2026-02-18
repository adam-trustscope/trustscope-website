'use client';

import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Code2,
  ArrowRight,
  Zap,
  Server,
  Terminal,
  Webhook,
  Cpu,
  Smartphone,
  Globe,
  BarChart3,
  Github,
  MessageCircle,
  ShieldCheck,
  Fingerprint,
  ScrollText,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  Scale,
} from 'lucide-react';
import BrowserScanner from '@/components/scanner/BrowserScanner';
import { PillarTabs, StatsBar, CTASection } from '@/components/ui';

const INTEGRATION_METHODS = [
  { icon: Globe, name: 'Gateway Proxy', desc: 'Zero code changes', href: 'https://docs.trustscope.ai/gateway' },
  { icon: Terminal, name: 'Python SDK', desc: '4 lines to integrate', href: 'https://docs.trustscope.ai/sdk/python' },
  { icon: Code2, name: 'Node.js SDK', desc: 'TypeScript-first', href: 'https://docs.trustscope.ai/sdk/node' },
  { icon: Smartphone, name: 'React Native', desc: 'Mobile agents', href: 'https://docs.trustscope.ai/sdk/react-native' },
  { icon: Terminal, name: 'CLI', desc: 'npx @trustscope/cli', href: 'https://docs.trustscope.ai/cli' },
  { icon: Cpu, name: 'MCP Server', desc: '9 tools in your IDE', href: 'https://docs.trustscope.ai/mcp' },
  { icon: BarChart3, name: 'OpenTelemetry', desc: 'OTLP-compatible', href: 'https://docs.trustscope.ai/otel' },
  { icon: Webhook, name: 'Webhooks', desc: 'Push to any system', href: 'https://docs.trustscope.ai/webhooks' },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Connect',
    description: 'Gateway, SDK, MCP, or CLI. Pick your method.',
    code: `export OPENAI_BASE_URL="https://gateway.trustscope.ai/v1"`,
  },
  {
    step: 2,
    title: 'Detect',
    description: '25 engines scan every trace in real-time.',
    code: `# PII, secrets, injections, loops, anomalies...`,
  },
  {
    step: 3,
    title: 'Enforce',
    description: 'Policies block violations before damage.',
    code: `@ts.enforce(policies=["pii_block", "cost_limit"])`,
  },
  {
    step: 4,
    title: 'Prove',
    description: 'Evidence packs satisfy any framework.',
    code: `# AIUC-1, SOC 2, EU AI Act, NIST AI RMF...`,
  },
];

const USE_CASES = [
  {
    title: 'Switching Models?',
    description: 'Prove the new one is safe with 8-strand DNA comparison.',
    href: '/switch',
    icon: RefreshCw,
  },
  {
    title: 'Auditor Asking?',
    description: 'Generate AIUC-1 evidence packs in minutes.',
    href: '/comply',
    icon: Scale,
  },
  {
    title: 'AI Security Incident?',
    description: 'Block threats inline with proof of prevention.',
    href: '/secure',
    icon: AlertTriangle,
  },
];

const TIERS = [
  {
    name: 'Monitor',
    price: 'Free',
    traces: '5K/mo',
    highlight: 'See everything',
    icon: Eye,
    color: 'text-slate-400',
    borderColor: 'border-slate-600',
  },
  {
    name: 'Protect',
    price: '$49',
    traces: '25K/mo',
    highlight: 'Block threats',
    icon: Shield,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/50',
  },
  {
    name: 'Enforce',
    price: '$249',
    traces: '100K/mo',
    highlight: 'AI engines + AIUC-1',
    icon: Lock,
    color: 'text-[#C49B3A]',
    borderColor: 'border-[#C49B3A]',
    recommended: true,
  },
  {
    name: 'Govern',
    price: '$2K+',
    traces: '500K+/mo',
    highlight: 'Signed evidence',
    icon: FileCheck,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
  },
];

const STATS = [
  { number: 25, label: 'Detection Engines' },
  { number: 417, label: 'API Endpoints', suffix: '+' },
  { number: 87, label: 'Database Tables' },
  { number: 7, label: 'Patents Filed' },
  { number: 14, label: 'Compliance Frameworks' },
];

export default function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* 1. HERO - Scanner IS the hero */}
      <section className="pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What is your AI actually doing?
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Drop a file. Browser scans locally. Nothing leaves your machine.
            </p>
          </div>
          <BrowserScanner />
        </div>
      </section>

      {/* 2. TRUST PROOF BAR */}
      <section className="py-6 px-4 bg-slate-800/30 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Lock className="w-4 h-4 text-green-400" />
              <span>Scans run in your browser</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="w-4 h-4 text-green-400" />
              <span>Zero network calls</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-4 h-4 text-green-400" />
              <span>Works offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE PILLARS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Know. Control. Prove.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Three pillars of AI governance. One platform.
            </p>
          </div>
          <PillarTabs
            content={{
              know: (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">25 Detection Engines</h3>
                  <p className="text-slate-300 mb-4">
                    Every AI action analyzed in real-time. PII, secrets, injections, anomalies, loops, toxicity — see it all.
                  </p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      19 statistical engines (all tiers)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      6 AI hybrid engines (Enforce+)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Shadow mode preview on free tier
                    </li>
                  </ul>
                </div>
              ),
              control: (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">50+ Policy Types</h3>
                  <p className="text-slate-300 mb-4">
                    Enforce your rules inline. Block violations before they cause damage. Natural language policies on Enforce tier.
                  </p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Rate limits and budget caps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Content filtering and redaction
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Human approval workflows
                    </li>
                  </ul>
                </div>
              ),
              prove: (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Cryptographic Evidence</h3>
                  <p className="text-slate-300 mb-4">
                    Generate auditor-consumable evidence for any framework. Hash chains, Ed25519 signatures, AIUC-1 mapping.
                  </p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      14 compliance frameworks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Evidence packs on demand
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      7-year retention on Govern
                    </li>
                  </ul>
                </div>
              ),
            }}
          />
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400">Four steps to governed AI agents</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                  <div className="w-10 h-10 rounded-full bg-[#C49B3A]/20 text-[#C49B3A] flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                  <code className="block text-xs text-slate-500 bg-slate-900/50 rounded p-2 overflow-x-auto">
                    {item.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTEGRATION METHODS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              8 Ways to Connect
            </h2>
            <p className="text-slate-400">Pick your integration. All tiers supported.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INTEGRATION_METHODS.map((method) => (
              <a
                key={method.name}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-4 hover:border-[#C49B3A]/30 transition-colors group"
              >
                <method.icon className="w-6 h-6 text-slate-400 group-hover:text-[#C49B3A] mb-3 transition-colors" />
                <h3 className="font-medium text-white text-sm mb-1">{method.name}</h3>
                <p className="text-xs text-slate-500">{method.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NUMBERS BAR */}
      <section className="py-16 px-4 bg-slate-900/50 border-y border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <StatsBar stats={STATS} />
        </div>
      </section>

      {/* 7. USE CASES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Brings You Here?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6 hover:border-[#C49B3A]/30 transition-colors group"
              >
                <useCase.icon className="w-8 h-8 text-[#C49B3A] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#C49B3A] transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-slate-400 mb-4">{useCase.description}</p>
                <span className="text-[#C49B3A] text-sm flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING PREVIEW */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Free. Scale with Confidence.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`bg-[#1a1f2e] border-2 ${tier.borderColor} rounded-xl p-6 text-center relative ${
                  tier.recommended ? 'ring-2 ring-[#C49B3A]/50' : ''
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C49B3A] text-black text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <tier.icon className={`w-8 h-8 ${tier.color} mx-auto mb-3`} />
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <div className="text-2xl font-bold text-white mb-1">
                  {tier.price}
                  {tier.price !== 'Free' && tier.price !== '$2K+' && (
                    <span className="text-sm text-slate-500">/mo</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-3">{tier.traces}</p>
                <p className="text-sm text-slate-400">{tier.highlight}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-[#C49B3A] hover:text-[#D4A843] font-medium inline-flex items-center gap-1"
            >
              Compare all features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. OPEN SOURCE & COMMUNITY */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Open Source CLI
          </h2>
          <p className="text-slate-400 mb-8">
            MIT-licensed. 9,084 lines of local governance.
          </p>
          <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6 mb-8">
            <code className="text-[#C49B3A] text-lg">npx @trustscope/mcp-server</code>
            <p className="text-slate-500 text-sm mt-2">9 governance tools in your IDE. No signup.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/trustscope"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://discord.gg/trustscope"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Discord</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-[#0f1117]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start with what you have.
          </h2>
          <p className="text-slate-400 mb-8">
            Drop a trace file above. See what's hiding. Then decide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToTop}
              className="bg-[#C49B3A] hover:bg-[#D4A843] text-black font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Try the Scanner
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="https://app.trustscope.ai"
              className="border border-slate-600 hover:bg-slate-800 text-white px-8 py-4 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
