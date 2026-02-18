// Browser Scanner Web Worker
// Runs all detection engines in a background thread
// Zero network requests - everything runs locally

import { detectAndParse, getFormatResult } from '../lib/scanner/format-detector';
import { classifyContent } from '../lib/scanner/content-classifier';
import {
  PII_PATTERNS,
  SECRET_PATTERNS,
  COST_ANOMALY_CONFIG,
  LOOP_DETECTION_CONFIG,
  estimateCost,
  jaccardSimilarity,
  simpleHash,
} from '../lib/scanner/patterns';
import { scanForToxicity, getCategoryLabel, ToxicityCategory } from '../lib/scanner/toxicity-keywords';
import {
  WorkerInMessage,
  WorkerOutMessage,
  Finding,
  ScannedTrace,
  ScanSummary,
  FindingEngine,
  FindingSeverity,
  ScanPhase,
} from '../lib/scanner/types';
import { generateSampleData, SampleType } from '../lib/scanner/sample-data';

// Worker context
const ctx: Worker = self as unknown as Worker;

// Post message helper
function postMessage(message: WorkerOutMessage): void {
  ctx.postMessage(message);
}

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Phase labels for UI
const PHASE_LABELS: Record<ScanPhase, string> = {
  detecting: 'Detecting format...',
  extracting: 'Extracting traces...',
  classifying: 'Classifying content...',
  scanning_statistical: 'Running statistical analysis...',
  scanning_pii: 'Scanning for PII...',
  scanning_secrets: 'Scanning for secrets...',
  scanning_injection: 'Detecting prompt injection...',
  scanning_jailbreak: 'Detecting jailbreak attempts...',
  scanning_commands: 'Checking for dangerous commands...',
  scanning_toxicity: 'Checking content safety...',
  scanning_cost: 'Analyzing costs...',
  scanning_loops: 'Detecting loops...',
  redacting: 'Preparing redacted output...',
  complete: 'Scan complete',
};

// Main message handler
ctx.onmessage = async (event: MessageEvent<WorkerInMessage>) => {
  const message = event.data;

  try {
    switch (message.type) {
      case 'SCAN_FILE':
        await scanFile(message.payload.content, message.payload.fileName, message.payload.fileType);
        break;

      case 'SCAN_SAMPLE':
        await scanSample(message.payload.sampleType as SampleType);
        break;

      case 'CANCEL':
        // Worker will be terminated by main thread
        break;
    }
  } catch (error) {
    postMessage({
      type: 'ERROR',
      payload: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      },
    });
  }
};

async function scanSample(sampleType: SampleType): Promise<void> {
  const { content, fileName } = generateSampleData(sampleType);
  await scanFile(content, fileName, 'application/json');
}

async function scanFile(content: string, fileName: string, fileType: string): Promise<void> {
  const startTime = performance.now();
  const findings: Finding[] = [];

  // Phase 1: Detect format
  updateProgress('detecting', 0, 1, findings.length);
  const parsed = detectAndParse(content, fileName, fileType);

  postMessage({
    type: 'FORMAT_DETECTED',
    payload: getFormatResult(parsed),
  });

  if (parsed.traces.length === 0) {
    postMessage({
      type: 'COMPLETE',
      payload: {
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
      },
    });
    return;
  }

  // Phase 2: Classify content
  updateProgress('classifying', 0, parsed.traces.length, findings.length);
  const classification = classifyContent(parsed.traces);

  postMessage({
    type: 'CONTENT_CLASSIFIED',
    payload: classification,
  });

  // Phase 3-7: Run detection engines
  const total = parsed.traces.length;

  // PII Detection
  updateProgress('scanning_pii', 0, total, findings.length);
  for (let i = 0; i < parsed.traces.length; i++) {
    const trace = parsed.traces[i];
    const piiFindings = scanForPII(trace);
    for (const finding of piiFindings) {
      findings.push(finding);
      postMessage({ type: 'FINDING', payload: finding });
    }
    if (i % 50 === 0) {
      updateProgress('scanning_pii', i, total, findings.length);
      await yieldToMain();
    }
  }

  // Secrets Detection
  updateProgress('scanning_secrets', 0, total, findings.length);
  for (let i = 0; i < parsed.traces.length; i++) {
    const trace = parsed.traces[i];
    const secretFindings = scanForSecrets(trace);
    for (const finding of secretFindings) {
      findings.push(finding);
      postMessage({ type: 'FINDING', payload: finding });
    }
    if (i % 50 === 0) {
      updateProgress('scanning_secrets', i, total, findings.length);
      await yieldToMain();
    }
  }

  // Cost Anomaly Detection
  updateProgress('scanning_cost', 0, total, findings.length);
  const costFindings = scanForCostAnomalies(parsed.traces);
  for (const finding of costFindings) {
    findings.push(finding);
    postMessage({ type: 'FINDING', payload: finding });
  }

  // Loop Detection
  updateProgress('scanning_loops', 0, total, findings.length);
  const loopFindings = scanForLoops(parsed.traces);
  for (const finding of loopFindings) {
    findings.push(finding);
    postMessage({ type: 'FINDING', payload: finding });
  }

  // Toxicity Detection
  updateProgress('scanning_toxicity', 0, total, findings.length);
  for (let i = 0; i < parsed.traces.length; i++) {
    const trace = parsed.traces[i];
    const toxicityFindings = scanForToxicContent(trace);
    for (const finding of toxicityFindings) {
      findings.push(finding);
      postMessage({ type: 'FINDING', payload: finding });
    }
    if (i % 50 === 0) {
      updateProgress('scanning_toxicity', i, total, findings.length);
      await yieldToMain();
    }
  }

  // Phase 8: Generate redacted content
  updateProgress('redacting', 0, 1, findings.length);
  const redactedContent = generateRedactedContent(content, findings);

  // Complete
  const scanDurationMs = performance.now() - startTime;
  const summary = createSummary(findings, parsed.traces.length, scanDurationMs);

  updateProgress('complete', total, total, findings.length);

  postMessage({
    type: 'COMPLETE',
    payload: {
      summary,
      findings,
      redactedContent,
      classification,
    },
  });
}

function updateProgress(phase: ScanPhase, processed: number, total: number, findingsCount: number): void {
  postMessage({
    type: 'PROGRESS',
    payload: {
      phase,
      phaseLabel: PHASE_LABELS[phase],
      processed,
      total,
      percentage: total > 0 ? Math.round((processed / total) * 100) : 0,
      findingsCount,
    },
  });
}

// Yield to main thread for UI responsiveness
function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
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
        // Run validation if present
        if (pattern.validate && !pattern.validate(match[0], value)) {
          continue;
        }

        findings.push({
          id: generateId(),
          engine: 'pii_scanner',
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
        // Run validation if present
        if (pattern.validate && !pattern.validate(match[0], value)) {
          continue;
        }

        findings.push({
          id: generateId(),
          engine: 'secrets_scanner',
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

  // Calculate costs for all traces
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

  // Calculate median
  const sorted = [...costs].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];

  // Scan for anomalies
  let prevCost: number | null = null;

  for (let i = 0; i < traces.length; i++) {
    const trace = traces[i];
    let cost = trace.cost;

    if (cost === undefined && trace.model && trace.tokensIn !== undefined && trace.tokensOut !== undefined) {
      cost = estimateCost(trace.model, trace.tokensIn, trace.tokensOut) ?? undefined;
    }

    if (cost === undefined) continue;

    // High token count
    const totalTokens = (trace.tokensIn || 0) + (trace.tokensOut || 0);
    if (totalTokens > COST_ANOMALY_CONFIG.highTokenThreshold) {
      findings.push({
        id: generateId(),
        engine: 'cost_velocity',
        category: 'high_tokens',
        severity: 'medium',
        traceIndex: trace.index,
        field: 'metadata',
        matchedValue: `${totalTokens.toLocaleString()} tokens`,
        redactedPreview: '',
        description: `High token usage: ${totalTokens.toLocaleString()} tokens`,
      });
    }

    // High cost
    if (cost > COST_ANOMALY_CONFIG.highCostThreshold) {
      findings.push({
        id: generateId(),
        engine: 'cost_velocity',
        category: 'high_cost',
        severity: 'high',
        traceIndex: trace.index,
        field: 'metadata',
        matchedValue: `$${cost.toFixed(4)}`,
        redactedPreview: '',
        description: `High cost request: $${cost.toFixed(4)}`,
      });
    }

    // Cost growth
    if (prevCost !== null && prevCost > 0) {
      const growth = (cost - prevCost) / prevCost;
      if (growth > COST_ANOMALY_CONFIG.growthThreshold) {
        findings.push({
          id: generateId(),
          engine: 'cost_velocity',
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

    // Above median threshold
    if (median > 0 && cost > median * COST_ANOMALY_CONFIG.medianMultiplier) {
      findings.push({
        id: generateId(),
        engine: 'cost_velocity',
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

  // Track consecutive identical/similar inputs
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
          engine: 'loop_killer',
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

  // Check final sequence
  if (consecutiveIdentical >= LOOP_DETECTION_CONFIG.identicalThreshold) {
    findings.push({
      id: generateId(),
      engine: 'loop_killer',
      category: 'identical_inputs',
      severity: 'high',
      traceIndex: identicalStart,
      field: 'input',
      matchedValue: `${consecutiveIdentical} identical requests`,
      redactedPreview: '',
      description: `Detected ${consecutiveIdentical} consecutive identical inputs (potential infinite loop)`,
    });
  }

  // Similar input detection (Jaccard similarity)
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
            engine: 'loop_killer',
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
      engine: 'loop_killer',
      category: 'similar_inputs',
      severity: 'medium',
      traceIndex: similarStart,
      field: 'input',
      matchedValue: `${consecutiveSimilar} similar requests`,
      redactedPreview: '',
      description: `Detected ${consecutiveSimilar} consecutive similar inputs (>90% similarity)`,
    });
  }

  // Oscillation detection (A-B-A-B pattern)
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
          engine: 'loop_killer',
          category: 'oscillation',
          severity: 'high',
          traceIndex: i,
          field: 'input',
          matchedValue: `${cycles} A-B cycles`,
          redactedPreview: '',
          description: `Detected oscillating pattern: ${cycles} back-and-forth cycles`,
        });
        break; // Only report once
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
      // Report by category, not by individual match
      for (const [category, count] of Object.entries(result.categories)) {
        if (count > 0) {
          const severity: FindingSeverity =
            result.highestSeverity === 'high' ? 'high' :
            result.highestSeverity === 'medium' ? 'medium' : 'low';

          findings.push({
            id: generateId(),
            engine: 'toxicity_filter',
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
function generateRedactedContent(originalContent: string, findings: Finding[]): string {
  let redacted = originalContent;

  // Group findings by what needs to be redacted (support both new and legacy engine names)
  const piiAndSecretFindings = findings.filter(
    f => f.engine === 'pii_scanner' || f.engine === 'secrets_scanner' ||
         (f.engine as string) === 'pii' || (f.engine as string) === 'secrets'
  );

  // Sort by match length descending to handle overlapping matches
  const sortedFindings = [...piiAndSecretFindings].sort(
    (a, b) => b.matchedValue.length - a.matchedValue.length
  );

  for (const finding of sortedFindings) {
    // For secrets, we need to reconstruct the full value from masked version
    // For PII, we have the full matched value
    const isPii = finding.engine === 'pii_scanner' || (finding.engine as string) === 'pii';
    const searchValue = !isPii
      ? finding.matchedValue // Already masked, need to find original
      : finding.matchedValue;

    if (isPii) {
      // Escape special regex characters
      const escaped = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      redacted = redacted.replace(regex, finding.redactedPreview);
    }
  }

  // For secrets, re-run the patterns to find and replace
  for (const [, pattern] of Object.entries(SECRET_PATTERNS)) {
    pattern.pattern.lastIndex = 0;
    redacted = redacted.replace(pattern.pattern, pattern.redactTo);
    pattern.pattern.lastIndex = 0;
  }

  // For PII patterns too
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
  // Initialize byEngine dynamically from findings
  const byEngine: Record<string, number> = {};

  const bySeverity: Record<FindingSeverity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  const byCategory: Record<string, number> = {};

  for (const finding of findings) {
    byEngine[finding.engine] = (byEngine[finding.engine] || 0) + 1;
    bySeverity[finding.severity]++;
    byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;
  }

  return {
    totalTraces,
    totalFindings: findings.length,
    byEngine: byEngine as Record<FindingEngine, number>,
    bySeverity,
    byCategory,
    scanDurationMs,
  };
}

function createEmptySummary(scanDurationMs: number): ScanSummary {
  return {
    totalTraces: 0,
    totalFindings: 0,
    byEngine: {} as Record<FindingEngine, number>,
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byCategory: {},
    scanDurationMs,
  };
}
