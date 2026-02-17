// Content Classifier for Browser Scanner
import { ContentClassification, ScannedTrace } from './types';
import { PII_PATTERNS, SECRET_PATTERNS } from './patterns';

export function classifyContent(traces: ScannedTrace[]): ContentClassification {
  const classification: ContentClassification = {
    hasMetadata: false,
    hasPrompts: false,
    hasResponses: false,
    hasToolCalls: false,
    hasSystemPrompts: false,
    hasEmbeddings: false,
    hasPii: false,
    hasSecrets: false,
    hasCosts: false,
    traceCount: traces.length,
    modelNames: [],
  };

  const modelSet = new Set<string>();
  let earliestDate: Date | null = null;
  let latestDate: Date | null = null;

  for (const trace of traces) {
    // Check for metadata
    if (trace.metadata && Object.keys(trace.metadata).length > 0) {
      classification.hasMetadata = true;
    }

    // Check for prompts/inputs
    if (trace.input && trace.input.length > 0) {
      classification.hasPrompts = true;

      // Check for system prompts
      if (containsSystemPrompt(trace.input)) {
        classification.hasSystemPrompts = true;
      }
    }

    // Check for responses/outputs
    if (trace.output && trace.output.length > 0) {
      classification.hasResponses = true;
    }

    // Check for tool calls
    if (trace.toolCalls && trace.toolCalls.length > 0) {
      classification.hasToolCalls = true;
    }

    // Check for embeddings (look in raw content)
    if (containsEmbeddings(trace.raw)) {
      classification.hasEmbeddings = true;
    }

    // Check for costs
    if (trace.cost !== undefined || (trace.tokensIn !== undefined && trace.tokensOut !== undefined)) {
      classification.hasCosts = true;
    }

    // Collect model names
    if (trace.model) {
      modelSet.add(trace.model);
    }

    // Track date range
    if (trace.timestamp) {
      try {
        const date = new Date(trace.timestamp);
        if (!isNaN(date.getTime())) {
          if (!earliestDate || date < earliestDate) earliestDate = date;
          if (!latestDate || date > latestDate) latestDate = date;
        }
      } catch { /* ignore invalid dates */ }
    }

    // Quick PII/secrets check (just detect presence, not enumerate)
    const allText = `${trace.input || ''} ${trace.output || ''} ${trace.raw}`;

    if (!classification.hasPii) {
      for (const pattern of Object.values(PII_PATTERNS)) {
        if (pattern.pattern.test(allText)) {
          classification.hasPii = true;
          pattern.pattern.lastIndex = 0; // Reset regex
          break;
        }
        pattern.pattern.lastIndex = 0;
      }
    }

    if (!classification.hasSecrets) {
      for (const pattern of Object.values(SECRET_PATTERNS)) {
        if (pattern.pattern.test(allText)) {
          classification.hasSecrets = true;
          pattern.pattern.lastIndex = 0;
          break;
        }
        pattern.pattern.lastIndex = 0;
      }
    }
  }

  classification.modelNames = Array.from(modelSet);

  if (earliestDate && latestDate) {
    classification.dateRange = {
      earliest: earliestDate.toISOString(),
      latest: latestDate.toISOString(),
    };
  }

  return classification;
}

function containsSystemPrompt(input: string): boolean {
  const lowerInput = input.toLowerCase();

  // Check for explicit system role
  if (lowerInput.includes('"role":"system"') || lowerInput.includes("'role':'system'")) {
    return true;
  }
  if (lowerInput.includes('"role": "system"') || lowerInput.includes("'role': 'system'")) {
    return true;
  }

  // Check for system prompt markers
  const systemMarkers = [
    'system:',
    'system prompt:',
    '<system>',
    '[system]',
    '### system',
    '## system',
  ];

  return systemMarkers.some(marker => lowerInput.includes(marker));
}

function containsEmbeddings(raw: string): boolean {
  // Look for embedding arrays (long arrays of floats)
  const embeddingPatterns = [
    /"embedding":\s*\[/,
    /"embeddings":\s*\[/,
    /"vector":\s*\[/,
    /"vectors":\s*\[/,
    // Long float arrays
    /\[-?\d+\.\d+,\s*-?\d+\.\d+,\s*-?\d+\.\d+,\s*-?\d+\.\d+,/,
  ];

  return embeddingPatterns.some(pattern => pattern.test(raw));
}

// Generate content level recommendation based on classification
export type ContentLevel = 'full' | 'redacted' | 'metadata' | 'aggregated';

export interface ContentRecommendation {
  level: ContentLevel;
  reason: string;
  risks: string[];
}

export function recommendContentLevel(classification: ContentClassification): ContentRecommendation {
  const risks: string[] = [];

  if (classification.hasPii) {
    risks.push('PII detected in traces');
  }
  if (classification.hasSecrets) {
    risks.push('API keys or secrets detected');
  }
  if (classification.hasSystemPrompts) {
    risks.push('System prompts may contain proprietary logic');
  }
  if (classification.hasEmbeddings) {
    risks.push('Embeddings may leak training data');
  }

  // Determine recommendation
  if (classification.hasSecrets) {
    return {
      level: 'redacted',
      reason: 'Secrets detected — redaction required before upload',
      risks,
    };
  }

  if (classification.hasPii) {
    return {
      level: 'redacted',
      reason: 'PII detected — redaction recommended for compliance',
      risks,
    };
  }

  if (classification.hasSystemPrompts && classification.hasEmbeddings) {
    return {
      level: 'metadata',
      reason: 'System prompts and embeddings detected — consider metadata-only',
      risks,
    };
  }

  if (risks.length > 0) {
    return {
      level: 'redacted',
      reason: 'Potential sensitive content detected',
      risks,
    };
  }

  return {
    level: 'full',
    reason: 'No sensitive content detected — safe for full upload',
    risks: [],
  };
}

// Get human-readable classification summary
export function getClassificationSummary(classification: ContentClassification): string[] {
  const items: string[] = [];

  if (classification.hasPrompts) items.push('Prompts');
  if (classification.hasResponses) items.push('Responses');
  if (classification.hasToolCalls) items.push('Tool Calls');
  if (classification.hasSystemPrompts) items.push('System Prompts');
  if (classification.hasEmbeddings) items.push('Embeddings');
  if (classification.hasMetadata) items.push('Metadata');
  if (classification.hasCosts) items.push('Cost Data');

  return items;
}
