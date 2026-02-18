// Scanner TypeScript Interfaces

export type SampleType = 'healthcare' | 'financial' | 'support' | 'multiagent';

export type DetectedFormat =
  | 'langsmith'
  | 'langfuse'
  | 'otel'
  | 'har'
  | 'jsonl'
  | 'csv'
  | 'tsv'
  | 'json-array'
  | 'unknown';

// Statistical engines (10)
export type StatisticalEngine =
  | 'loop_killer'
  | 'velocity'
  | 'oscillation'
  | 'token_growth'
  | 'cost_velocity'
  | 'error_rate'
  | 'budget_caps'
  | 'context_expansion'
  | 'session_duration'
  | 'session_action_limit';

// Content engines (10)
export type ContentEngine =
  | 'pii_scanner'
  | 'secrets_scanner'
  | 'command_firewall'
  | 'blocked_phrases'
  | 'data_exfiltration'
  | 'prompt_injection'
  | 'jailbreak_detector'
  | 'action_label_mismatch'
  | 'toxicity_filter'
  | 'content_policy';

// AI Hybrid engines (7) - server only
export type AIHybridEngine =
  | 'semantic_firewall'
  | 'hallucination_detector'
  | 'reasoning_drift'
  | 'intent_classifier'
  | 'context_relevance'
  | 'output_consistency'
  | 'hate_speech_detector';

export type FindingEngine = StatisticalEngine | ContentEngine | AIHybridEngine;

// Legacy aliases for backward compatibility
export type LegacyEngine = 'pii' | 'secrets' | 'cost' | 'loop' | 'toxicity';

// Map legacy engine names to new names
export const LEGACY_ENGINE_MAP: Record<LegacyEngine, FindingEngine> = {
  pii: 'pii_scanner',
  secrets: 'secrets_scanner',
  cost: 'cost_velocity',
  loop: 'loop_killer',
  toxicity: 'toxicity_filter',
};

export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low';

export type FindingField = 'input' | 'output' | 'metadata' | 'raw';

export type ScanPhase =
  | 'detecting'
  | 'extracting'
  | 'classifying'
  | 'scanning_statistical'
  | 'scanning_pii'
  | 'scanning_secrets'
  | 'scanning_injection'
  | 'scanning_jailbreak'
  | 'scanning_commands'
  | 'scanning_toxicity'
  | 'scanning_cost'
  | 'scanning_loops'
  | 'redacting'
  | 'complete';

// Main → Worker messages
export type WorkerInMessage =
  | { type: 'SCAN_FILE'; payload: { content: string; fileName: string; fileType: string } }
  | { type: 'SCAN_SAMPLE'; payload: { sampleType: SampleType } }
  | { type: 'CANCEL' };

// Worker → Main messages
export type WorkerOutMessage =
  | { type: 'FORMAT_DETECTED'; payload: FormatDetectionResult }
  | { type: 'CONTENT_CLASSIFIED'; payload: ContentClassification }
  | { type: 'PROGRESS'; payload: ProgressUpdate }
  | { type: 'FINDING'; payload: Finding }
  | { type: 'COMPLETE'; payload: ScanComplete }
  | { type: 'ERROR'; payload: { message: string; details?: string } };

export interface FormatDetectionResult {
  format: DetectedFormat;
  displayName: string;
  confidence: number;
  traceCount: number;
}

export interface ProgressUpdate {
  phase: ScanPhase;
  phaseLabel: string;
  processed: number;
  total: number;
  percentage: number;
  findingsCount: number;
}

export interface Finding {
  id: string;
  engine: FindingEngine;
  category: string;
  severity: FindingSeverity;
  traceIndex: number;
  field: FindingField;
  matchedValue: string;
  redactedPreview: string;
  description: string;
}

export interface ScanSummary {
  totalTraces: number;
  totalFindings: number;
  byEngine: Record<FindingEngine, number>;
  bySeverity: Record<FindingSeverity, number>;
  byCategory: Record<string, number>;
  scanDurationMs: number;
}

export interface ContentClassification {
  hasMetadata: boolean;
  hasPrompts: boolean;
  hasResponses: boolean;
  hasToolCalls: boolean;
  hasSystemPrompts: boolean;
  hasEmbeddings: boolean;
  hasPii: boolean;
  hasSecrets: boolean;
  hasCosts: boolean;
  traceCount: number;
  modelNames: string[];
  dateRange?: { earliest: string; latest: string };
}

export interface ScanComplete {
  summary: ScanSummary;
  findings: Finding[];
  redactedContent: string;
  classification: ContentClassification;
}

// Internal trace representation
export interface ScannedTrace {
  index: number;
  raw: string;
  model?: string;
  input?: string;
  output?: string;
  tokensIn?: number;
  tokensOut?: number;
  cost?: number;
  timestamp?: string;
  toolCalls?: string[];
  metadata?: Record<string, unknown>;
}

// Scanner state for the UI
export interface ScannerState {
  status: 'idle' | 'scanning' | 'complete' | 'error';
  file: File | null;
  sampleType: SampleType | null;
  formatResult: FormatDetectionResult | null;
  progress: ProgressUpdate | null;
  findings: Finding[];
  summary: ScanSummary | null;
  classification: ContentClassification | null;
  redactedContent: string | null;
  error: string | null;
  offlineVerified: boolean;
}

// Pattern definition for detection engines
export interface DetectionPattern {
  pattern: RegExp;
  label: string;
  severity: FindingSeverity;
  example: string;
  redactTo: string;
  validate?: (match: string, context: string) => boolean;
}

// Cost anomaly thresholds
export interface CostAnomalyConfig {
  highTokenThreshold: number;
  highCostThreshold: number;
  growthThreshold: number;
  medianMultiplier: number;
}

// Loop detection config
export interface LoopDetectionConfig {
  identicalThreshold: number;
  similarThreshold: number;
  similarityCutoff: number;
  oscillationMinCycles: number;
}

// Model pricing (per 1M tokens)
export interface ModelPricing {
  input: number;
  output: number;
}
