// Scanner Engine - Runs in main thread with async yielding for UI responsiveness
import { detectAndParse, getFormatResult } from './format-detector';
import { classifyContent } from './content-classifier';
import {
  PII_PATTERNS,
  SECRET_PATTERNS,
  COST_ANOMALY_CONFIG,
  LOOP_DETECTION_CONFIG,
  estimateCost,
  jaccardSimilarity,
  simpleHash,
} from './patterns';
import { scanForToxicity, getCategoryLabel, ToxicityCategory } from './toxicity-keywords';
import {
  Finding,
  ScannedTrace,
  ScanSummary,
  FindingEngine,
  FindingSeverity,
  ScanPhase,
  FormatDetectionResult,
  ContentClassification,
  ProgressUpdate,
} from './types';
import { generateSampleData } from './sample-data';
import type { SampleType } from './types';

// Phase labels for UI
const PHASE_LABELS: Record<ScanPhase, string> = {
  detecting: 'Detecting format...',
  extracting: 'Extracting traces...',
  classifying: 'Classifying content...',
  scanning_pii: 'Scanning for PII...',
  scanning_secrets: 'Scanning for secrets...',
  scanning_cost: 'Analyzing costs...',
  scanning_loops: 'Detecting loops...',
  scanning_toxicity: 'Checking content safety...',
  redacting: 'Preparing redacted output...',
  complete: 'Scan complete',
};

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Yield to main thread for UI responsiveness
function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

export interface ScanCallbacks {
  onFormatDetected: (result: FormatDetectionResult) => void;
  onContentClassified: (classification: ContentClassification) => void;
  onProgress: (progress: ProgressUpdate) => void;
  onFinding: (finding: Finding) => void;
  onComplete: (result: ScanResult) => void;
  onError: (error: string) => void;
}

export interface ScanResult {
  summary: ScanSummary;
  findings: Finding[];
  redactedContent: string;
  classification: ContentClassification;
}

export async function scanSampleData(sampleType: SampleType, callbacks: ScanCallbacks): Promise<void> {
  const { content, fileName } = generateSampleData(sampleType);
  await scanContent(content, fileName, 'application/json', callbacks);
}

export async function scanContent(
  content: string,
  fileName: string,
  fileType: string,
  callbacks: ScanCallbacks
): Promise<void> {
  const startTime = performance.now();
  const findings: Finding[] = [];

  try {
    // Phase 1: Detect format
    updateProgress(callbacks, 'detecting', 0, 1, 0);
    await yieldToMain();

    const parsed = detectAndParse(content, fileName, fileType);
    callbacks.onFormatDetected(getFormatResult(parsed));

    if (parsed.traces.length === 0) {
      callbacks.onComplete({
        summary: createEmptySummary(performance.now() - startTime),
        findings: [],
        redactedContent: content,
        classification: {
          hasMetadata: false,
          hasPrompts: false,
          hasResponses: false,
          hasToolCalls: false,
          hasSystemPrompts: false,
          hasEmbeddings: false,
          hasPii: false,
          hasSecrets: false,
          hasCosts: false,
          traceCount: 0,
          modelNames: [],
        },
      });
      return;
    }

    // Phase 2: Classify content
    updateProgress(callbacks, 'classifying', 0, parsed.traces.length, 0);
    await yieldToMain();

    const classification = classifyContent(parsed.traces);
    callbacks.onContentClassified(classification);

    const total = parsed.traces.length;

    // PII Detection
    updateProgress(callbacks, 'scanning_pii', 0, total, findings.length);
    for (let i = 0; i < parsed.traces.length; i++) {
      const trace = parsed.traces[i];
      const piiFindings = scanForPII(trace);
      for (const finding of piiFindings) {
        findings.push(finding);
        callbacks.onFinding(finding);
      }
      if (i % 20 === 0) {
        updateProgress(callbacks, 'scanning_pii', i, total, findings.length);
        await yieldToMain();
      }
    }

    // Secrets Detection
    updateProgress(callbacks, 'scanning_secrets', 0, total, findings.length);
    for (let i = 0; i < parsed.traces.length; i++) {
      const trace = parsed.traces[i];
      const secretFindings = scanForSecrets(trace);
      for (const finding of secretFindings) {
        findings.push(finding);
        callbacks.onFinding(finding);
      }
      if (i % 20 === 0) {
        updateProgress(callbacks, 'scanning_secrets', i, total, findings.length);
        await yieldToMain();
      }
    }

    // Cost Anomaly Detection
    updateProgress(callbacks, 'scanning_cost', 0, total, findings.length);
    await yieldToMain();
    const costFindings = scanForCostAnomalies(parsed.traces);
    for (const finding of costFindings) {
      findings.push(finding);
      callbacks.onFinding(finding);
    }

    // Loop Detection
    updateProgress(callbacks, 'scanning_loops', 0, total, findings.length);
    await yieldToMain();
    const loopFindings = scanForLoops(parsed.traces);
    for (const finding of loopFindings) {
      findings.push(finding);
      callbacks.onFinding(finding);
    }

    // Toxicity Detection
    updateProgress(callbacks, 'scanning_toxicity', 0, total, findings.length);
    for (let i = 0; i < parsed.traces.length; i++) {
      const trace = parsed.traces[i];
      const toxicityFindings = scanForToxicContent(trace);
      for (const finding of toxicityFindings) {
        findings.push(finding);
        callbacks.onFinding(finding);
      }
      if (i % 20 === 0) {
        updateProgress(callbacks, 'scanning_toxicity', i, total, findings.length);
        await yieldToMain();
      }
    }

    // Generate redacted content
    updateProgress(callbacks, 'redacting', 0, 1, findings.length);
    await yieldToMain();
    const redactedContent = generateRedactedContent(content);

    // Complete
    const scanDurationMs = performance.now() - startTime;
    const summary = createSummary(findings, parsed.traces.length, scanDurationMs);

    updateProgress(callbacks, 'complete', total, total, findings.length);

    callbacks.onComplete({
      summary,
      findings,
      redactedContent,
      classification,
    });
  } catch (error) {
    callbacks.onError(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}

function updateProgress(
  callbacks: ScanCallbacks,
  phase: ScanPhase,
  processed: number,
  total: number,
  findingsCount: number
): void {
  callbacks.onProgress({
    phase,
    phaseLabel: PHASE_LABELS[phase],
    processed,
    total,
    percentage: total > 0 ? Math.round((processed / total) * 100) : 0,
    findingsCount,
  });
}

// PII Detection
function scanForPII(trace: ScannedTrace): Finding[] {
  const findings: Finding[] = [];
  const fieldsToScan: { field: 'input' | 'output' | 'raw'; value: string }[] = [
    { field: 'input', value: trace.input || '' },
    { field: 'output', value: trace.output || '' },
    { field: 'raw', value: trace.raw },
  ];

  for (const { field, value } of fieldsToScan) {
    if (!value) continue;

    for (const [category, pattern] of Object.entries(PII_PATTERNS)) {
      pattern.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.pattern.exec(value)) !== null) {
        if (pattern.validate && !pattern.validate(match[0], value)) {
          continue;
        }

        findings.push({
          id: generateId(),
          engine: 'pii',
          category,
          severity: pattern.severity,
          traceIndex: trace.index,
          field,
          matchedValue: match[0],
          redactedPreview: pattern.redactTo,
          description: `${pattern.label} detected`,
        });
      }
    }
  }

  return findings;
}

// Secrets Detection
function scanForSecrets(trace: ScannedTrace): Finding[] {
  const findings: Finding[] = [];
  const fieldsToScan: { field: 'input' | 'output' | 'raw'; value: string }[] = [
    { field: 'input', value: trace.input || '' },
    { field: 'output', value: trace.output || '' },
    { field: 'raw', value: trace.raw },
  ];

  for (const { field, value } of fieldsToScan) {
    if (!value) continue;

    for (const [category, pattern] of Object.entries(SECRET_PATTERNS)) {
      pattern.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.pattern.exec(value)) !== null) {
        if (pattern.validate && !pattern.validate(match[0], value)) {
          continue;
        }

        findings.push({
          id: generateId(),
          engine: 'secrets',
          category,
          severity: pattern.severity,
          traceIndex: trace.index,
          field,
          matchedValue: maskSecret(match[0]),
          redactedPreview: pattern.redactTo,
          description: `${pattern.label} detected`,
        });
      }
    }
  }

  return findings;
}

function maskSecret(value: string): string {
  if (value.length <= 8) return '***';
  return value.substring(0, 4) + '...' + value.substring(value.length - 4);
}

// Cost Anomaly Detection
function scanForCostAnomalies(traces: ScannedTrace[]): Finding[] {
  const findings: Finding[] = [];
  const costs: number[] = [];

  for (const trace of traces) {
    let cost = trace.cost;
    if (cost === undefined && trace.model && trace.tokensIn !== undefined && trace.tokensOut !== undefined) {
      cost = estimateCost(trace.model, trace.tokensIn, trace.tokensOut) ?? undefined;
    }
    if (cost !== undefined) {
      costs.push(cost);
    }
  }

  if (costs.length === 0) return findings;

  const sorted = [...costs].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];

  let prevCost: number | null = null;

  for (let i = 0; i < traces.length; i++) {
    const trace = traces[i];
    let cost = trace.cost;

    if (cost === undefined && trace.model && trace.tokensIn !== undefined && trace.tokensOut !== undefined) {
      cost = estimateCost(trace.model, trace.tokensIn, trace.tokensOut) ?? undefined;
    }

    if (cost === undefined) continue;

    const totalTokens = (trace.tokensIn || 0) + (trace.tokensOut || 0);
    if (totalTokens > COST_ANOMALY_CONFIG.highTokenThreshold) {
      findings.push({
        id: generateId(),
        engine: 'cost',
        category: 'high_tokens',
        severity: 'medium',
        traceIndex: trace.index,
        field: 'metadata',
        matchedValue: `${totalTokens.toLocaleString()} tokens`,
        redactedPreview: '',
        description: `High token usage: ${totalTokens.toLocaleString()} tokens`,
      });
    }

    if (cost > COST_ANOMALY_CONFIG.highCostThreshold) {
      findings.push({
        id: generateId(),
        engine: 'cost',
        category: 'high_cost',
        severity: 'high',
        traceIndex: trace.index,
        field: 'metadata',
        matchedValue: `$${cost.toFixed(4)}`,
        redactedPreview: '',
        description: `High cost request: $${cost.toFixed(4)}`,
      });
    }

    if (prevCost !== null && prevCost > 0) {
      const growth = (cost - prevCost) / prevCost;
      if (growth > COST_ANOMALY_CONFIG.growthThreshold) {
        findings.push({
          id: generateId(),
          engine: 'cost',
          category: 'cost_growth',
          severity: 'medium',
          traceIndex: trace.index,
          field: 'metadata',
          matchedValue: `+${(growth * 100).toFixed(0)}%`,
          redactedPreview: '',
          description: `Cost increased ${(growth * 100).toFixed(0)}% from previous request`,
        });
      }
    }

    if (median > 0 && cost > median * COST_ANOMALY_CONFIG.medianMultiplier) {
      findings.push({
        id: generateId(),
        engine: 'cost',
        category: 'above_median',
        severity: 'low',
        traceIndex: trace.index,
        field: 'metadata',
        matchedValue: `${(cost / median).toFixed(1)}x median`,
        redactedPreview: '',
        description: `Cost ${(cost / median).toFixed(1)}x above median ($${median.toFixed(4)})`,
      });
    }

    prevCost = cost;
  }

  return findings;
}

// Loop Detection
function scanForLoops(traces: ScannedTrace[]): Finding[] {
  const findings: Finding[] = [];

  if (traces.length < 3) return findings;

  const inputHashes: string[] = [];
  const inputs: string[] = [];

  for (const trace of traces) {
    const input = trace.input || '';
    inputHashes.push(simpleHash(input));
    inputs.push(input);
  }

  // Identical input detection
  let consecutiveIdentical = 1;
  let identicalStart = 0;

  for (let i = 1; i < inputHashes.length; i++) {
    if (inputHashes[i] === inputHashes[i - 1] && inputs[i].length > 10) {
      consecutiveIdentical++;
    } else {
      if (consecutiveIdentical >= LOOP_DETECTION_CONFIG.identicalThreshold) {
        findings.push({
          id: generateId(),
          engine: 'loop',
          category: 'identical_inputs',
          severity: 'high',
          traceIndex: identicalStart,
          field: 'input',
          matchedValue: `${consecutiveIdentical} identical requests`,
          redactedPreview: '',
          description: `Detected ${consecutiveIdentical} consecutive identical inputs (potential infinite loop)`,
        });
      }
      consecutiveIdentical = 1;
      identicalStart = i;
    }
  }

  if (consecutiveIdentical >= LOOP_DETECTION_CONFIG.identicalThreshold) {
    findings.push({
      id: generateId(),
      engine: 'loop',
      category: 'identical_inputs',
      severity: 'high',
      traceIndex: identicalStart,
      field: 'input',
      matchedValue: `${consecutiveIdentical} identical requests`,
      redactedPreview: '',
      description: `Detected ${consecutiveIdentical} consecutive identical inputs (potential infinite loop)`,
    });
  }

  // Similar input detection
  let consecutiveSimilar = 1;
  let similarStart = 0;

  for (let i = 1; i < inputs.length; i++) {
    if (inputs[i].length > 10 && inputs[i - 1].length > 10) {
      const similarity = jaccardSimilarity(inputs[i], inputs[i - 1]);
      if (similarity >= LOOP_DETECTION_CONFIG.similarityCutoff) {
        consecutiveSimilar++;
      } else {
        if (consecutiveSimilar >= LOOP_DETECTION_CONFIG.similarThreshold) {
          findings.push({
            id: generateId(),
            engine: 'loop',
            category: 'similar_inputs',
            severity: 'medium',
            traceIndex: similarStart,
            field: 'input',
            matchedValue: `${consecutiveSimilar} similar requests`,
            redactedPreview: '',
            description: `Detected ${consecutiveSimilar} consecutive similar inputs (>90% similarity)`,
          });
        }
        consecutiveSimilar = 1;
        similarStart = i;
      }
    }
  }

  if (consecutiveSimilar >= LOOP_DETECTION_CONFIG.similarThreshold) {
    findings.push({
      id: generateId(),
      engine: 'loop',
      category: 'similar_inputs',
      severity: 'medium',
      traceIndex: similarStart,
      field: 'input',
      matchedValue: `${consecutiveSimilar} similar requests`,
      redactedPreview: '',
      description: `Detected ${consecutiveSimilar} consecutive similar inputs (>90% similarity)`,
    });
  }

  // Oscillation detection
  if (inputs.length >= 4) {
    for (let i = 0; i < inputs.length - 3; i++) {
      const hashA = inputHashes[i];
      const hashB = inputHashes[i + 1];

      if (hashA === hashB) continue;

      let cycles = 0;
      for (let j = i; j < inputs.length - 1; j += 2) {
        if (inputHashes[j] === hashA && inputHashes[j + 1] === hashB) {
          cycles++;
        } else {
          break;
        }
      }

      if (cycles >= LOOP_DETECTION_CONFIG.oscillationMinCycles) {
        findings.push({
          id: generateId(),
          engine: 'loop',
          category: 'oscillation',
          severity: 'high',
          traceIndex: i,
          field: 'input',
          matchedValue: `${cycles} A-B cycles`,
          redactedPreview: '',
          description: `Detected oscillating pattern: ${cycles} back-and-forth cycles`,
        });
        break;
      }
    }
  }

  return findings;
}

// Toxicity Detection
function scanForToxicContent(trace: ScannedTrace): Finding[] {
  const findings: Finding[] = [];
  const fieldsToScan: { field: 'input' | 'output'; value: string }[] = [
    { field: 'input', value: trace.input || '' },
    { field: 'output', value: trace.output || '' },
  ];

  for (const { field, value } of fieldsToScan) {
    if (!value || value.length < 5) continue;

    const result = scanForToxicity(value);

    if (result.found) {
      for (const [category, count] of Object.entries(result.categories)) {
        if (count > 0) {
          const severity: FindingSeverity =
            result.highestSeverity === 'high' ? 'high' :
            result.highestSeverity === 'medium' ? 'medium' : 'low';

          findings.push({
            id: generateId(),
            engine: 'toxicity',
            category: category as ToxicityCategory,
            severity,
            traceIndex: trace.index,
            field,
            matchedValue: `${count} instance(s)`,
            redactedPreview: '[CONTENT FLAGGED]',
            description: `${getCategoryLabel(category as ToxicityCategory)}: ${count} instance(s) detected`,
          });
        }
      }
    }
  }

  return findings;
}

// Generate redacted content
function generateRedactedContent(originalContent: string): string {
  let redacted = originalContent;

  // Redact secrets
  for (const [, pattern] of Object.entries(SECRET_PATTERNS)) {
    pattern.pattern.lastIndex = 0;
    redacted = redacted.replace(pattern.pattern, pattern.redactTo);
    pattern.pattern.lastIndex = 0;
  }

  // Redact PII
  for (const [, pattern] of Object.entries(PII_PATTERNS)) {
    pattern.pattern.lastIndex = 0;
    redacted = redacted.replace(pattern.pattern, (match) => {
      if (pattern.validate && !pattern.validate(match, redacted)) {
        return match;
      }
      return pattern.redactTo;
    });
    pattern.pattern.lastIndex = 0;
  }

  return redacted;
}

// Create summary
function createSummary(findings: Finding[], totalTraces: number, scanDurationMs: number): ScanSummary {
  const byEngine: Record<FindingEngine, number> = {
    pii: 0,
    secrets: 0,
    cost: 0,
    loop: 0,
    toxicity: 0,
  };

  const bySeverity: Record<FindingSeverity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  const byCategory: Record<string, number> = {};

  for (const finding of findings) {
    byEngine[finding.engine]++;
    bySeverity[finding.severity]++;
    byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
  }

  return {
    totalTraces,
    totalFindings: findings.length,
    byEngine,
    bySeverity,
    byCategory,
    scanDurationMs,
  };
}

function createEmptySummary(scanDurationMs: number): ScanSummary {
  return {
    totalTraces: 0,
    totalFindings: 0,
    byEngine: { pii: 0, secrets: 0, cost: 0, loop: 0, toxicity: 0 },
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byCategory: {},
    scanDurationMs,
  };
}
