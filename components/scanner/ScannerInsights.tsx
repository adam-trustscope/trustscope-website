'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Eye, EyeOff, Search } from 'lucide-react';
import { Finding, ScanSummary, ScannedTrace } from '@/lib/scanner/types';

interface ScannerInsightsProps {
  summary: ScanSummary;
  findings: Finding[];
  traces: ScannedTrace[];
}

interface RiskScore {
  score: number;
  label: string;
  band: string;
}

interface TimelineBar {
  key: string;
  label: string;
  startIndex: number;
  endIndex: number;
  traceIndex: number;
  count: number;
  categories: string[];
  severityRank: number;
}

const ENGINE_WEIGHTS: Record<string, number> = {
  secrets_scanner: 5.2,
  secrets: 5.2,
  pii_scanner: 4.6,
  pii: 4.6,
  prompt_injection: 4.5,
  jailbreak_detector: 4.5,
  command_firewall: 4.2,
  loop_killer: 2.7,
  loop: 2.7,
  cost_velocity: 2.2,
  cost: 2.2,
  toxicity_filter: 1.4,
};

const SEVERITY_WEIGHTS: Record<string, number> = {
  critical: 1.5,
  high: 1.1,
  medium: 0.8,
  low: 0.4,
};

function calculateRiskScore(findings: Finding[], totalTraces: number): RiskScore {
  const weighted = findings.reduce((sum, finding) => {
    const engineWeight = ENGINE_WEIGHTS[finding.engine] ?? 1.5;
    const severityWeight = SEVERITY_WEIGHTS[finding.severity] ?? 1;
    return sum + engineWeight * severityWeight;
  }, 0);

  const denominator = Math.max(totalTraces, 1) * 6;
  const score = Math.min(100, Math.round(100 * (1 - Math.exp(-weighted / denominator))));

  if (score >= 90) return { score, label: 'Severe exposure', band: 'Critical' };
  if (score >= 75) return { score, label: 'Elevated exposure', band: 'High' };
  if (score >= 55) return { score, label: 'Moderate exposure', band: 'Moderate' };
  if (score >= 35) return { score, label: 'Managed exposure', band: 'Low' };
  return { score, label: 'Low exposure', band: 'Minimal' };
}

function maskSensitive(value: string): string {
  return value
    .replace(/sk-proj-[A-Za-z0-9_-]+/g, '[OPENAI KEY REDACTED]')
    .replace(/sk-ant-api03-[A-Za-z0-9_-]+/g, '[ANTHROPIC KEY REDACTED]')
    .replace(/AKIA[0-9A-Z]{16}/g, '[AWS ACCESS KEY REDACTED]')
    .replace(/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g, '[GITHUB TOKEN REDACTED]')
    .replace(/\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s'"]+/gi, '[DATABASE URL REDACTED]')
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [TOKEN REDACTED]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN REDACTED]')
    .replace(/\b(?:\d[ -]*?){13,16}\b/g, '[CARD REDACTED]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[EMAIL REDACTED]')
    .replace(
      /(?<![A-Za-z0-9])(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}(?![A-Za-z0-9])/g,
      '[PHONE REDACTED]'
    );
}

function truncateText(value: string, max = 1100): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}\n... (truncated)`;
}

function renderRedactedPreview(source: string, findings: Finding[]) {
  let working = source;
  const replacements: string[] = [];
  const seen = new Set<string>();

  const ordered = [...findings].sort((a, b) => b.matchedValue.length - a.matchedValue.length);
  for (const finding of ordered) {
    if (!finding.matchedValue) continue;
    const dedupeKey = `${finding.matchedValue}::${finding.redactedPreview}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    const marker = `@@${replacements.length}@@`;
    replacements.push(finding.redactedPreview || '[REDACTED]');
    working = working.split(finding.matchedValue).join(marker);
  }

  working = maskSensitive(working);
  const parts = working.split(/(@@\d+@@)/g).filter(Boolean);

  return parts.map((part, index) => {
    const markerMatch = part.match(/^@@(\d+)@@$/);
    if (!markerMatch) {
      return <span key={`plain-${index}`}>{part}</span>;
    }

    const replacement = replacements[Number(markerMatch[1])] || '[REDACTED]';
    return (
      <mark
        key={`mark-${index}`}
        className="mx-[1px] rounded bg-[color:rgba(184,150,78,.28)] px-1 py-0.5 text-[var(--text-primary)]"
      >
        {replacement}
      </mark>
    );
  });
}

function formatPercent(value: number): string {
  return `${value.toFixed(value >= 10 ? 0 : 1)}%`;
}

function rankSeverity(severity: string): number {
  if (severity === 'critical') return 4;
  if (severity === 'high') return 3;
  if (severity === 'medium') return 2;
  if (severity === 'low') return 1;
  return 0;
}

function severityColorClass(rank: number): string {
  if (rank >= 4) return 'bg-[var(--status-danger)]';
  if (rank === 3) return 'bg-[var(--status-warning)]';
  if (rank === 2) return 'bg-[var(--interactive)]';
  if (rank === 1) return 'bg-[var(--status-success)]';
  return 'bg-[var(--border-hover)]';
}

function formatTraceOption(traceIndex: number, model: string, count: number): string {
  return `Trace #${traceIndex} · ${model} · ${count} finding${count === 1 ? '' : 's'}`;
}

function describeTraceImpact(findings: Finding[]): string {
  const engines = new Set(findings.map((finding) => finding.engine));
  if (engines.has('secrets_scanner')) {
    return 'Credential exposure risk: generated output includes token or secret-like values.';
  }
  if (engines.has('pii_scanner')) {
    return 'Data exposure risk: personal or regulated identifiers appear in model traffic.';
  }
  if (engines.has('prompt_injection') || engines.has('jailbreak_detector') || engines.has('command_firewall')) {
    return 'Control bypass risk: model behavior indicates prompt/control boundary pressure.';
  }
  if (engines.has('loop_killer') || engines.has('cost_velocity')) {
    return 'Operational risk: loop or cost anomaly pattern may create spend/runtime escalation.';
  }
  return 'Governance risk detected on this trace. Review raw and redacted views before rollout.';
}

export default function ScannerInsights({ summary, findings, traces }: ScannerInsightsProps) {
  const [selectedTraceIndex, setSelectedTraceIndex] = useState<number | null>(null);
  const [showRawValues, setShowRawValues] = useState(false);
  const [tracePickerOpen, setTracePickerOpen] = useState(false);
  const [traceQuery, setTraceQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  const findingsByTrace = useMemo(() => {
    const map = new Map<number, Finding[]>();
    for (const finding of findings) {
      const current = map.get(finding.traceIndex) ?? [];
      current.push(finding);
      map.set(finding.traceIndex, current);
    }
    return map;
  }, [findings]);

  const tracesWithFindings = useMemo(() => {
    return Array.from(findingsByTrace.entries())
      .map(([traceIndex, traceFindings]) => ({
        traceIndex,
        count: traceFindings.length,
        model: traces[traceIndex]?.model || 'Unknown model',
      }))
      .sort((a, b) => (b.count - a.count) || (a.traceIndex - b.traceIndex))
      .slice(0, 40);
  }, [findingsByTrace, traces]);

  useEffect(() => {
    if (!tracesWithFindings.length) {
      setSelectedTraceIndex(null);
      return;
    }
    const isValid = selectedTraceIndex !== null && tracesWithFindings.some((item) => item.traceIndex === selectedTraceIndex);
    if (!isValid) {
      setSelectedTraceIndex(tracesWithFindings[0].traceIndex);
    }
  }, [tracesWithFindings, selectedTraceIndex]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!pickerRef.current) return;
      if (!pickerRef.current.contains(event.target as Node)) {
        setTracePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  const selectedTrace = selectedTraceIndex !== null ? traces[selectedTraceIndex] : null;
  const selectedFindings = selectedTraceIndex !== null ? findingsByTrace.get(selectedTraceIndex) ?? [] : [];
  const selectedFindingBadges = useMemo(() => {
    const badgeMap = new Map<string, { category: string; severity: string; count: number }>();
    for (const finding of selectedFindings) {
      const key = finding.category;
      const existing = badgeMap.get(key);
      if (existing) {
        existing.count += 1;
        if (rankSeverity(finding.severity) > rankSeverity(existing.severity)) {
          existing.severity = finding.severity;
        }
      } else {
        badgeMap.set(key, { category: finding.category, severity: finding.severity, count: 1 });
      }
    }
    return Array.from(badgeMap.values()).sort(
      (a, b) => rankSeverity(b.severity) - rankSeverity(a.severity)
    );
  }, [selectedFindings]);

  const risk = useMemo(() => calculateRiskScore(findings, summary.totalTraces), [findings, summary.totalTraces]);

  const modelBreakdown = useMemo(() => {
    const byModel = new Map<string, number>();
    for (const finding of findings) {
      const model = traces[finding.traceIndex]?.model || 'Unknown model';
      byModel.set(model, (byModel.get(model) ?? 0) + 1);
    }
    const total = findings.length || 1;
    return Array.from(byModel.entries())
      .map(([model, count]) => ({
        model,
        count,
        pct: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }, [findings, traces]);

  const timelineBars = useMemo<TimelineBar[]>(() => {
    const maxBars = 160;
    if (!traces.length) return [];

    const bucketSize = Math.max(1, Math.ceil(traces.length / maxBars));
    const bars: TimelineBar[] = [];

    for (let start = 0; start < traces.length; start += bucketSize) {
      const end = Math.min(traces.length - 1, start + bucketSize - 1);
      let count = 0;
      let representativeTrace = start;
      let representativeCount = -1;
      let maxSeverityRank = 0;
      const categories = new Set<string>();

      for (let idx = start; idx <= end; idx++) {
        const traceFindings = findingsByTrace.get(idx) ?? [];
        count += traceFindings.length;
        if (traceFindings.length > representativeCount) {
          representativeTrace = idx;
          representativeCount = traceFindings.length;
        }

        for (const finding of traceFindings) {
          categories.add(finding.category);
          maxSeverityRank = Math.max(maxSeverityRank, rankSeverity(finding.severity));
        }
      }

      bars.push({
        key: `${start}-${end}`,
        label: start === end ? `Trace #${start}` : `Trace #${start}-${end}`,
        startIndex: start,
        endIndex: end,
        traceIndex: representativeTrace,
        count,
        categories: Array.from(categories).slice(0, 3),
        severityRank: maxSeverityRank,
      });
    }

    return bars;
  }, [traces.length, findingsByTrace]);

  const maxTimelineCount = useMemo(
    () => Math.max(1, ...timelineBars.map((bar) => bar.count)),
    [timelineBars]
  );

  const timelineShift = useMemo(() => {
    if (timelineBars.length < 10) return null;
    for (let i = 4; i < timelineBars.length - 4; i++) {
      const previous = timelineBars.slice(i - 4, i);
      const upcoming = timelineBars.slice(i, i + 4);
      const prevAvg = previous.reduce((sum, bar) => sum + bar.count, 0) / previous.length;
      const nextAvg = upcoming.reduce((sum, bar) => sum + bar.count, 0) / upcoming.length;

      if (nextAvg >= Math.max(prevAvg * 2, prevAvg + 2) && nextAvg - prevAvg >= 2) {
        return timelineBars[i];
      }
    }
    return null;
  }, [timelineBars]);

  const timelineFirstHit = useMemo(
    () => timelineBars.find((bar) => bar.count > 0) ?? null,
    [timelineBars]
  );

  const timelinePeak = useMemo(() => {
    if (!timelineBars.length) return null;
    return timelineBars.reduce((max, bar) => (bar.count > max.count ? bar : max), timelineBars[0]);
  }, [timelineBars]);

  const filteredTraceOptions = useMemo(() => {
    const query = traceQuery.trim().toLowerCase();
    if (!query) return tracesWithFindings.slice(0, 24);
    return tracesWithFindings
      .filter((item) => {
        const label = formatTraceOption(item.traceIndex, item.model, item.count).toLowerCase();
        return label.includes(query);
      })
      .slice(0, 24);
  }, [traceQuery, tracesWithFindings]);

  const selectedTraceLabel = useMemo(() => {
    if (selectedTraceIndex === null) return 'Select a trace';
    const selected = tracesWithFindings.find((item) => item.traceIndex === selectedTraceIndex);
    if (!selected) return `Trace #${selectedTraceIndex}`;
    return formatTraceOption(selected.traceIndex, selected.model, selected.count);
  }, [selectedTraceIndex, tracesWithFindings]);

  const traceImpact = useMemo(() => describeTraceImpact(selectedFindings), [selectedFindings]);

  if (!findings.length || !traces.length) return null;

  return (
    <div className="space-y-4">
      <div id="scanner-insights" className="scroll-mt-28 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="card !p-5">
          <p className="eyebrow mb-2">Risk index (directional)</p>
          <div className="flex items-end gap-3">
            <p className="text-6xl font-black leading-none text-[var(--text-primary)]">{risk.score}</p>
            <p className="pb-1 text-sm font-semibold text-[var(--text-secondary)]">/100</p>
          </div>
          <p className="mt-2 text-sm font-semibold text-[var(--brand)]">
            {risk.label} · Band: {risk.band}
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            This index is a local, heuristic score from finding severity and engine type. It is for triage, not certification.
          </p>
        </div>

        <div className="card !p-5">
          <p className="eyebrow mb-3">Model / agent map</p>
          <div className="space-y-3">
            {modelBreakdown.slice(0, 6).map((row) => (
              <div key={row.model} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--text-primary)]">{row.model}</span>
                  <span className="text-[var(--text-muted)]">
                    {row.count} findings ({formatPercent(row.pct)})
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-hover)]">
                  <div
                    className="h-2 rounded-full bg-[var(--interactive)]"
                    style={{ width: `${Math.max(row.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="scanner-timeline" className="card scroll-mt-28 !p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Timeline view</p>
            <h3 className="mt-1 text-xl font-bold">See where risk starts</h3>
          </div>
          {timelineShift ? (
            <p className="text-xs text-[var(--text-muted)]">Shift detected near {timelineShift.label}</p>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">No abrupt shifts detected</p>
          )}
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-[740px] items-end gap-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
            {timelineBars.map((bar) => {
              const height = bar.count > 0 ? Math.max(8, Math.round((bar.count / maxTimelineCount) * 56)) : 6;
              const colorClass = severityColorClass(bar.severityRank);
              const titleParts = [bar.label, `${bar.count} findings`];
              if (bar.categories.length > 0) {
                titleParts.push(`Top: ${bar.categories.join(', ')}`);
              }
              return (
                <button
                  key={bar.key}
                  type="button"
                  disabled={bar.count === 0}
                  onClick={() => setSelectedTraceIndex(bar.traceIndex)}
                  title={titleParts.join(' · ')}
                  className={`group flex w-3 items-end justify-center rounded-sm transition-opacity ${
                    bar.count === 0 ? 'cursor-default opacity-45' : 'hover:opacity-100'
                  } ${
                    selectedTraceIndex === bar.traceIndex ? 'opacity-100' : 'opacity-80'
                  }`}
                >
                  <span className={`block w-2 rounded-sm ${colorClass}`} style={{ height }} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--status-danger)]" />
            critical
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--status-warning)]" />
            high
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--interactive)]" />
            medium
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--status-success)]" />
            low
          </span>
          <span>Click a colored bar to jump to that trace.</span>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.09em] text-[var(--text-subtle)]">First activity</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {timelineFirstHit ? `${timelineFirstHit.label} (${timelineFirstHit.count})` : 'No findings'}
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.09em] text-[var(--text-subtle)]">Shift point</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {timelineShift ? `${timelineShift.label} (${timelineShift.count})` : 'No abrupt shift'}
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.09em] text-[var(--text-subtle)]">Peak window</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {timelinePeak ? `${timelinePeak.label} (${timelinePeak.count})` : 'No peak'}
            </p>
          </div>
        </div>
      </div>

      <div id="scanner-trace" className="card scroll-mt-28 !p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Trace detail view</p>
            <h3 className="mt-1 text-xl font-bold">Inspect where issues happened</h3>
          </div>
          <button
            onClick={() => setShowRawValues((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            {showRawValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showRawValues ? 'Hide raw values' : 'Show raw values'}
          </button>
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-xs uppercase tracking-[0.09em] text-[var(--text-subtle)]">Trace selection</label>
          <p className="mb-1.5 text-[11px] text-[var(--text-muted)]">Showing top 40 hotspot traces by finding count.</p>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => {
                setTracePickerOpen((open) => !open);
                setTraceQuery('');
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-left text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)]"
            >
              <span className="truncate pr-3">{selectedTraceLabel}</span>
              <ChevronsUpDown className="h-4 w-4 text-[var(--text-muted)]" />
            </button>

            {tracePickerOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_14px_42px_rgba(0,0,0,.45)]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <input
                    autoFocus
                    type="text"
                    value={traceQuery}
                    onChange={(event) => setTraceQuery(event.target.value)}
                    placeholder="Search trace #, model, finding count"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] py-2 pl-8 pr-2 text-xs text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--interactive)]"
                  />
                </div>

                <div className="mt-2 max-h-64 overflow-auto">
                  {filteredTraceOptions.length > 0 ? (
                    <div className="space-y-1">
                      {filteredTraceOptions.map((item) => {
                        const label = formatTraceOption(item.traceIndex, item.model, item.count);
                        const isSelected = selectedTraceIndex === item.traceIndex;
                        return (
                          <button
                            key={item.traceIndex}
                            type="button"
                            onClick={() => {
                              setSelectedTraceIndex(item.traceIndex);
                              setTracePickerOpen(false);
                              setTraceQuery('');
                            }}
                            className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                              isSelected
                                ? 'bg-[color:rgba(37,99,235,.16)] text-[var(--text-primary)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                            }`}
                          >
                            <span className="truncate pr-2">{label}</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-[var(--interactive)]" />}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-md bg-[var(--bg)] px-2 py-2 text-xs text-[var(--text-muted)]">No traces match that search.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedTrace && (
          <div className="space-y-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-2.5">
              <p className="text-xs text-[var(--text-subtle)]">
                {selectedFindings.length} finding{selectedFindings.length === 1 ? '' : 's'} on this trace
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{traceImpact}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedFindingBadges.map((badge) => (
                  <span
                    key={badge.category}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    {badge.category} · {badge.severity}
                    {badge.count > 1 ? ` ×${badge.count}` : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-2 xl:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
                <p className="eyebrow mb-2">Original trace (display-safe)</p>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-[var(--text-secondary)]">
                  {truncateText(
                    showRawValues
                      ? `${selectedTrace.input || '[No input]'}\n\n${selectedTrace.output || '[No output]'}`
                      : maskSensitive(`${selectedTrace.input || '[No input]'}\n\n${selectedTrace.output || '[No output]'}`)
                  )}
                </pre>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
                <p className="eyebrow mb-2">Policy-redacted trace</p>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-[var(--text-secondary)]">
                  {renderRedactedPreview(
                    truncateText(`${selectedTrace.input || '[No input]'}\n\n${selectedTrace.output || '[No output]'}`),
                    selectedFindings
                  )}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
