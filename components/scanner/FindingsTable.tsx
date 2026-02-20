'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Shield } from 'lucide-react';
import { Finding, FindingEngine, FindingSeverity } from '@/lib/scanner/types';

interface FindingsTableProps {
  findings: Finding[];
}

const ENGINE_CONFIG: Partial<Record<FindingEngine | string, { label: string; color: string; bgColor: string }>> = {
  pii_scanner: {
    label: 'Personal Information (PII)',
    color: 'text-[var(--interactive)]',
    bgColor: 'bg-[color:rgba(37,99,235,.12)] border-[color:rgba(37,99,235,.35)]',
  },
  secrets_scanner: {
    label: 'Secrets & Credentials',
    color: 'text-[var(--status-danger)]',
    bgColor: 'bg-[color:rgba(220,38,38,.12)] border-[color:rgba(220,38,38,.35)]',
  },
  prompt_injection: {
    label: 'Prompt Injection',
    color: 'text-[var(--status-danger)]',
    bgColor: 'bg-[color:rgba(220,38,38,.12)] border-[color:rgba(220,38,38,.35)]',
  },
  jailbreak_detector: {
    label: 'Jailbreak Attempts',
    color: 'text-[var(--status-danger)]',
    bgColor: 'bg-[color:rgba(220,38,38,.12)] border-[color:rgba(220,38,38,.35)]',
  },
  command_firewall: {
    label: 'Command Firewall',
    color: 'text-[var(--status-warning)]',
    bgColor: 'bg-[color:rgba(217,119,6,.12)] border-[color:rgba(217,119,6,.35)]',
  },
  toxicity_filter: {
    label: 'Content Safety',
    color: 'text-[var(--status-warning)]',
    bgColor: 'bg-[color:rgba(217,119,6,.12)] border-[color:rgba(217,119,6,.35)]',
  },
  loop_killer: {
    label: 'Loop Detection',
    color: 'text-[var(--interactive)]',
    bgColor: 'bg-[color:rgba(37,99,235,.12)] border-[color:rgba(37,99,235,.35)]',
  },
  cost_velocity: {
    label: 'Cost Anomalies',
    color: 'text-[var(--status-warning)]',
    bgColor: 'bg-[color:rgba(217,119,6,.12)] border-[color:rgba(217,119,6,.35)]',
  },
  pii: {
    label: 'Personal Information (PII)',
    color: 'text-[var(--interactive)]',
    bgColor: 'bg-[color:rgba(37,99,235,.12)] border-[color:rgba(37,99,235,.35)]',
  },
  secrets: {
    label: 'Secrets & Credentials',
    color: 'text-[var(--status-danger)]',
    bgColor: 'bg-[color:rgba(220,38,38,.12)] border-[color:rgba(220,38,38,.35)]',
  },
  cost: {
    label: 'Cost Anomalies',
    color: 'text-[var(--status-warning)]',
    bgColor: 'bg-[color:rgba(217,119,6,.12)] border-[color:rgba(217,119,6,.35)]',
  },
  loop: {
    label: 'Loop Detection',
    color: 'text-[var(--interactive)]',
    bgColor: 'bg-[color:rgba(37,99,235,.12)] border-[color:rgba(37,99,235,.35)]',
  },
};

const DEFAULT_ENGINE_CONFIG = {
  label: 'Detection',
  color: 'text-[var(--text-secondary)]',
  bgColor: 'bg-[var(--surface)] border-[var(--border)]',
};

const SEVERITY_DOTS: Record<FindingSeverity, string> = {
  critical: 'bg-[var(--status-danger)]',
  high: 'bg-[var(--status-warning)]',
  medium: 'bg-[var(--border-hover)]',
  low: 'bg-[var(--status-success)]',
};

export default function FindingsTable({ findings }: FindingsTableProps) {
  const [expandedEngines, setExpandedEngines] = useState<Set<string>>(() => new Set(['secrets_scanner', 'pii_scanner']));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showValues, setShowValues] = useState(false);

  const grouped = findings.reduce((acc, finding) => {
    if (!acc[finding.engine]) {
      acc[finding.engine] = {};
    }
    if (!acc[finding.engine][finding.category]) {
      acc[finding.engine][finding.category] = [];
    }
    acc[finding.engine][finding.category].push(finding);
    return acc;
  }, {} as Record<FindingEngine, Record<string, Finding[]>>);

  const ordered = [
    'secrets_scanner',
    'secrets',
    'pii_scanner',
    'pii',
    'prompt_injection',
    'jailbreak_detector',
    'command_firewall',
    'cost_velocity',
    'cost',
    'loop_killer',
    'loop',
    'toxicity_filter',
  ].filter((engine) => grouped[engine as FindingEngine]) as FindingEngine[];

  if (!findings.length) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Detailed findings</h3>
        <button
          onClick={() => setShowValues((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
        >
          {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showValues ? 'Hide values' : 'Show values'}
        </button>
      </div>

      <p className="text-sm text-[var(--text-subtle)]">
        Expand each section to inspect categories and affected traces.
      </p>

      <div className="space-y-3">
        {ordered.map((engine) => {
          const config = ENGINE_CONFIG[engine] || DEFAULT_ENGINE_CONFIG;
          const categories = grouped[engine];
          const totalCount = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);
          const isExpanded = expandedEngines.has(engine);

          return (
            <div key={engine} className={`overflow-hidden rounded-xl border transition-colors hover:border-[var(--border-hover)] ${config.bgColor}`}>
              <button
                onClick={() => {
                  const next = new Set(expandedEngines);
                  if (next.has(engine)) next.delete(engine);
                  else next.add(engine);
                  setExpandedEngines(next);
                }}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:rgba(255,255,255,.08)]">
                  {isExpanded ? (
                    <ChevronDown className={`h-4 w-4 ${config.color}`} />
                  ) : (
                    <ChevronRight className={`h-4 w-4 ${config.color}`} />
                  )}
                </div>
                <Shield className={`h-4 w-4 ${config.color}`} />
                <div className="flex-1">
                  <span className={`font-semibold ${config.color}`}>{config.label}</span>
                  <span className="ml-2 text-[var(--text-subtle)]">({totalCount})</span>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--border)] bg-[color:rgba(9,9,11,.35)]">
                  {Object.entries(categories).map(([category, categoryFindings]) => {
                    const categoryKey = `${engine}-${category}`;
                    const isCategoryOpen = expandedCategories.has(categoryKey);

                    return (
                      <div key={category} className="border-b border-[var(--border)] last:border-b-0">
                        <button
                          onClick={() => {
                            const next = new Set(expandedCategories);
                            if (next.has(categoryKey)) next.delete(categoryKey);
                            else next.add(categoryKey);
                            setExpandedCategories(next);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 pl-14 text-left transition-colors hover:bg-[var(--surface-hover)]"
                        >
                          {isCategoryOpen ? (
                            <ChevronDown className="h-4 w-4 text-[var(--text-subtle)]" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-[var(--text-subtle)]" />
                          )}
                          <div className="flex-1 text-sm text-[var(--text-secondary)]">
                            {category}
                            <span className="ml-2 text-xs text-[var(--text-subtle)]">({categoryFindings.length})</span>
                          </div>
                        </button>

                        {isCategoryOpen && (
                          <div className="space-y-1 bg-[var(--surface)] px-4 py-3 pl-20">
                            {categoryFindings.slice(0, 12).map((finding) => (
                              <div key={finding.id} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 transition-colors hover:border-[var(--border-hover)]">
                                <div className="mb-1 flex items-center gap-2 text-xs text-[var(--text-subtle)]">
                                  <span className={`h-2 w-2 rounded-full ${SEVERITY_DOTS[finding.severity]}`} />
                                  <span>Trace #{finding.traceIndex}</span>
                                  <span>•</span>
                                  <span>{finding.field}</span>
                                  <span className="uppercase">{finding.severity}</span>
                                </div>
                                <div className="text-sm leading-relaxed text-[var(--text-secondary)]">
                                  {showValues ? finding.matchedValue : finding.redactedPreview || '[REDACTED]'}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
