'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Zap,
} from 'lucide-react';
import { CTASection, TierBadge, FeatureGrid } from '@/components/ui';

// Metadata moved to layout or head for client component

const THREAT_STATS = [
  { stat: '34%', label: 'of deployments leaked PII in 2025' },
  { stat: '23%', label: 'vulnerable to prompt injection' },
  { stat: '12%', label: 'had secrets in responses' },
];

// Note: Stats based on OWASP Agentic Top 10 research and industry incident reports

const OWASP_MAPPING = [
  {
    code: 'AG01',
    name: 'Agentic Misuse',
    engine: 'Session limits, approval workflows',
  },
  {
    code: 'AG02',
    name: 'Tool Misuse',
    engine: 'Command Firewall, Tool Risk Scoring',
  },
  {
    code: 'AG03',
    name: 'Privilege Escalation',
    engine: 'Delegation policies',
  },
  {
    code: 'AG04',
    name: 'Prompt Injection',
    engine: 'Pattern + AI detection',
  },
  {
    code: 'AG05',
    name: 'Data Exfiltration',
    engine: 'Data flow monitoring',
  },
  {
    code: 'AG06',
    name: 'Jailbreaking',
    engine: 'Pattern + AI detection',
  },
];

const SECURITY_ENGINES = [
  {
    icon: Shield,
    title: 'PII Scanner',
    description: '88 patterns for SSN, email, phone, credit cards. All tiers (alert) · Protect+ (block) · ML-powered (Presidio)',
    tier: 'monitor' as const,
  },
  {
    icon: Lock,
    title: 'Secrets Scanner',
    description: '50+ patterns for API keys, AWS creds, private keys. All tiers (alert) · Protect+ (block)',
    tier: 'monitor' as const,
  },
  {
    icon: AlertTriangle,
    title: 'Prompt Injection',
    description: 'Pattern pre-filter + AI verification for <1% false positives. All tiers (alert) · Protect+ (block) · ML-powered (Prompt Guard 2)',
    tier: 'monitor' as const,
  },
  {
    icon: Ban,
    title: 'Jailbreak Detection',
    description: 'Two-stage detection for known and novel attacks. All tiers (alert) · Protect+ (block) · ML-powered (Prompt Guard 2)',
    tier: 'monitor' as const,
  },
  {
    icon: Eye,
    title: 'Toxicity Filter',
    description: 'Content safety across multiple categories. All tiers (alert) · Protect+ (block) · ML-powered (Detoxify)',
    tier: 'monitor' as const,
  },
  {
    icon: Zap,
    title: 'Command Firewall',
    description: 'Block dangerous system operations inline. All tiers (alert) · Protect+ (block) · Pattern-based',
    tier: 'monitor' as const,
  },
];

const AI_HYBRID_ENGINES = [
  {
    icon: Shield,
    title: 'Semantic Firewall',
    description: 'Enforce+ · AI Hybrid (LLM-powered) — understands intent, not just patterns',
    tier: 'enforce' as const,
  },
  {
    icon: AlertTriangle,
    title: 'Hallucination Detector',
    description: 'Enforce+ · AI Hybrid (LLM-powered) — catches factual inconsistencies',
    tier: 'enforce' as const,
  },
  {
    icon: Eye,
    title: 'Reasoning Drift',
    description: 'Enforce+ · AI Hybrid (LLM-powered) — detects when agent reasoning goes off-track',
    tier: 'enforce' as const,
  },
];

export default function SecurePage() {
  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
              <Shield className="w-4 h-4" />
              Runtime Protection
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Block what your AI
              <br />
              <span className="text-[#C49B3A]">shouldn't do.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              PII leaks. Prompt injections. Jailbreaks. See them. Stop them. Prove you
              stopped them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#C49B3A] hover:bg-[#D4A843] text-white transition-colors"
              >
                Scan for Security Issues
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://docs.trustscope.ai/security"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
              >
                Read OWASP Mapping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="py-20 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            The Threat Landscape
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {THREAT_STATS.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-center"
              >
                <div className="text-4xl font-bold text-red-400 mb-2">{item.stat}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500">
            Based on OWASP Agentic Top 10 research and industry incident reports
          </p>
        </div>
      </section>

      {/* OWASP Mapping */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              OWASP Top 10 for Agentic Applications
            </h2>
            <p className="text-lg text-slate-400">
              How each risk maps to TrustScope engines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OWASP_MAPPING.map((item) => (
              <div
                key={item.code}
                className="p-4 rounded-xl bg-[#1a1f2e] border border-slate-700/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                    {item.code}
                  </span>
                  <span className="font-medium text-white">{item.name}</span>
                </div>
                <p className="text-sm text-slate-500">{item.engine}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Engines */}
      <section className="py-20 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security Detection Engines
            </h2>
            <p className="text-lg text-slate-400">
              19 engines protect your AI agents at all tiers. 25 with AI hybrid at Enforce+.
            </p>
          </div>

          <FeatureGrid features={SECURITY_ENGINES} columns={3} />

          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              +6 AI Hybrid Engines (Enforce+)
            </h3>
            <FeatureGrid features={AI_HYBRID_ENGINES} columns={3} />
          </div>
        </div>
      </section>

      {/* Inline Blocking */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not Just Detection — Prevention
            </h2>
            <p className="text-lg text-slate-400">
              Evidence of prevention, not just detection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What was blocked */}
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium text-green-400">What Happened</span>
              </div>
              <div className="font-mono text-sm bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-500">Request:</div>
                <div className="text-white mb-2">"What's my account balance?"</div>
                <div className="text-slate-500">Response:</div>
                <div className="text-green-400">"Your balance is $[REDACTED]"</div>
                <div className="mt-2 text-xs text-green-500">
                  PII blocked: Credit card number
                </div>
              </div>
            </div>

            {/* What would have happened */}
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-400">Without Protection</span>
              </div>
              <div className="font-mono text-sm bg-slate-900/50 p-4 rounded-lg">
                <div className="text-slate-500">Request:</div>
                <div className="text-white mb-2">"What's my account balance?"</div>
                <div className="text-slate-500">Response:</div>
                <div className="text-red-400">
                  "Your balance is $5,432.10. Card ending 4532-XXXX-XXXX-1234"
                </div>
                <div className="mt-2 text-xs text-red-500">
                  PII exposed: Credit card number
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Secure your AI agents"
        subtext="Upload traces to scan for security issues. See what you're missing."
        primaryCTA={{ label: 'Scan for Issues', href: '/scanner' }}
        secondaryCTA={{ label: 'Read Security Docs', href: '/docs/security' }}
        variant="gradient"
      />
    </main>
  );
}
