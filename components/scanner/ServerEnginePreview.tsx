'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const TIER_ENGINES = [
  {
    tier: 'Monitor',
    count: 15,
    color: 'text-[var(--text-secondary)]',
    list: 'PII scanner, secrets scanner, command firewall, blocked phrases, data exfiltration, loop killer, velocity, oscillation, token growth, cost velocity, error rate, budget caps, context expansion, session duration, session action limit.',
  },
  {
    tier: 'Protect',
    count: 5,
    color: 'text-[var(--interactive)]',
    list: 'ML classification engines for PII confidence, toxicity scoring, intent analysis, and contextual risk refinement.',
  },
  {
    tier: 'Enforce',
    count: 6,
    color: 'text-[var(--status-warning)]',
    list: 'AI hybrid engines for prompt injection, jailbreak detection, hallucination scoring, groundedness checks, response quality, and deep-pass reasoning verification.',
  },
];

export default function ServerEnginePreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="eyebrow">This was one file</p>
      <h4 className="mt-2 text-2xl font-bold">Imagine this running on every request.</h4>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
        Browser mode runs a local subset for fast triage. Cloud mode continuously runs the full 27-engine governance stack with alerting and blocking.
      </p>

      <div className="mt-5 grid gap-0 overflow-hidden rounded-xl border border-[var(--border)] md:grid-cols-2">
        <div className="border-b border-[var(--border)] bg-[var(--bg)] p-4 md:border-b-0 md:border-r">
          <p className="eyebrow mb-2">Browser</p>
          <ul className="space-y-1 text-sm text-[var(--text-muted)]">
            <li>6 local engines</li>
            <li>One-time scan</li>
            <li>No runtime blocking</li>
          </ul>
        </div>
        <div className="bg-[var(--surface)] p-4">
          <p className="eyebrow mb-2 text-[var(--interactive)]">Cloud</p>
          <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
            <li>27 engines (15 + 5 + 7)</li>
            <li>Continuous monitoring</li>
            <li>Inline blocking and evidence chain</li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 flex w-full items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-left text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]"
      >
        {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        All 27 engines by tier
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {TIER_ENGINES.map((tier) => (
            <div key={tier.tier} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-xs font-semibold uppercase tracking-wide ${tier.color}`}>{tier.tier}</span>
                <span className="text-xs text-[var(--text-subtle)]">{tier.count} engines</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">{tier.list}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
