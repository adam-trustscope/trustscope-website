/**
 * Jailbreak Scanner for TrustScope Website Scanner
 * Top 10 jailbreak patterns (DAN, STAN, etc.) - browser-compatible, no lookbehinds
 *
 * v21.3: Ported from dashboard scanner
 */

import type { Finding, FindingSeverity, ScannedTrace } from './types';

export interface JailbreakPattern {
  id: string;
  name: string;
  description: string;
  pattern: RegExp;
  category: string;
  confidence: number;
  knownJailbreak?: string;
}

// Top 10 jailbreak patterns (browser-compatible)
export const JAILBREAK_PATTERNS: JailbreakPattern[] = [
  // DAN Variants (most common)
  {
    id: 'dan_explicit',
    name: 'DAN Mode',
    description: 'DAN (Do Anything Now) jailbreak',
    pattern: /\bDAN\b(\s+(mode|version|v\d+|prompt))?/gi,
    category: 'dan_variants',
    confidence: 0.90,
    knownJailbreak: 'DAN (Do Anything Now)',
  },
  {
    id: 'do_anything_now',
    name: 'Do Anything Now',
    description: 'Explicit DAN phrase',
    pattern: /do\s+anything\s+now/gi,
    category: 'dan_variants',
    confidence: 0.95,
    knownJailbreak: 'DAN',
  },
  {
    id: 'stan',
    name: 'STAN Mode',
    description: 'STAN (Strive To Avoid Norms) jailbreak',
    pattern: /\bSTAN\b(\s+(mode|prompt))?/gi,
    category: 'dan_variants',
    confidence: 0.85,
    knownJailbreak: 'STAN (Strive To Avoid Norms)',
  },
  {
    id: 'jailbroken_mode',
    name: 'Jailbroken Mode',
    description: 'Explicit jailbroken mode request',
    pattern: /jailbroken?\s+(mode|version|ai|assistant)/gi,
    category: 'dan_variants',
    confidence: 0.90,
  },
  {
    id: 'developer_mode_chatgpt',
    name: 'Developer Mode ChatGPT',
    description: 'ChatGPT developer mode jailbreak',
    pattern: /chatgpt\s+(with\s+)?developer\s+mode/gi,
    category: 'dan_variants',
    confidence: 0.90,
    knownJailbreak: 'Developer Mode',
  },

  // Persona Exploits
  {
    id: 'uncensored_mode',
    name: 'Uncensored Mode',
    description: 'Uncensored AI request',
    pattern: /(un)?censored\s+(mode|version|ai)/gi,
    category: 'persona_exploits',
    confidence: 0.85,
  },
  {
    id: 'without_safety',
    name: 'Without Safety',
    description: 'Disable safety filters request',
    pattern: /(without|no|disable)\s+(safety|content)\s+(filters?|guidelines?|restrictions?)/gi,
    category: 'persona_exploits',
    confidence: 0.90,
  },
  {
    id: 'unrestricted',
    name: 'Unrestricted Mode',
    description: 'Unrestricted AI request',
    pattern: /unrestricted\s+(mode|version|ai|access)/gi,
    category: 'persona_exploits',
    confidence: 0.85,
  },

  // Emotional Manipulation
  {
    id: 'grandma_exploit',
    name: 'Grandma Exploit',
    description: 'Grandma/family story exploit',
    pattern: /(my\s+)?(grandmother|grandma|grandpa|grandfather|nana)\s+(used\s+to|would|always)/gi,
    category: 'emotional_manipulation',
    confidence: 0.70,
    knownJailbreak: 'Grandma Exploit',
  },

  // Fiction Framing
  {
    id: 'simulation_no_rules',
    name: 'Simulation No Rules',
    description: 'Simulation where rules do not apply',
    pattern: /(this\s+is\s+)?(a\s+)?simulation.*(rules?|restrictions?)\s+(don'?t|do\s+not)\s+apply/gi,
    category: 'fiction_framing',
    confidence: 0.85,
  },
];

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Map confidence to severity
function confidenceToSeverity(confidence: number): FindingSeverity {
  if (confidence >= 0.9) return 'high';
  if (confidence >= 0.8) return 'medium';
  return 'low';
}

/**
 * Scan a trace for jailbreak patterns
 */
export function scanForJailbreak(trace: ScannedTrace): Finding[] {
  const findings: Finding[] = [];
  const fieldsToScan: { field: 'input' | 'output' | 'raw'; value: string }[] = [
    { field: 'input', value: trace.input || '' },
    { field: 'output', value: trace.output || '' },
    { field: 'raw', value: trace.raw },
  ];

  for (const { field, value } of fieldsToScan) {
    if (!value || value.length < 5) continue;

    for (const pattern of JAILBREAK_PATTERNS) {
      pattern.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.pattern.exec(value)) !== null) {
        const knownJailbreak = pattern.knownJailbreak
          ? ` (Known: ${pattern.knownJailbreak})`
          : '';

        findings.push({
          id: generateId(),
          engine: 'jailbreak_detector',
          category: pattern.category,
          severity: confidenceToSeverity(pattern.confidence),
          traceIndex: trace.index,
          field,
          matchedValue: match[0].slice(0, 100),
          redactedPreview: '[JAILBREAK ATTEMPT]',
          description: `${pattern.name}: ${pattern.description}${knownJailbreak}`,
        });
      }
    }
  }

  return findings;
}
