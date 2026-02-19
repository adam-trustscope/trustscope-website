/**
 * Injection Scanner for TrustScope Website Scanner
 * Top 15 high-signal injection patterns (browser-compatible, no lookbehinds)
 *
 * v21.3: Ported from dashboard scanner
 */

import type { Finding, FindingSeverity, ScannedTrace } from './types';

export interface InjectionPattern {
  id: string;
  name: string;
  description: string;
  pattern: RegExp;
  category: string;
  confidence: number;
}

// Top 15 high-signal injection patterns (browser-compatible)
export const INJECTION_PATTERNS: InjectionPattern[] = [
  // Instruction Override (high signal)
  {
    id: 'ignore_previous',
    name: 'Ignore Previous',
    description: 'Ignore previous instructions pattern',
    pattern: /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)/gi,
    category: 'instruction_override',
    confidence: 0.95,
  },
  {
    id: 'disregard',
    name: 'Disregard Instructions',
    description: 'Disregard instructions pattern',
    pattern: /disregard\s+(all\s+)?(previous|prior|above|earlier|your)/gi,
    category: 'instruction_override',
    confidence: 0.90,
  },
  {
    id: 'forget_instructions',
    name: 'Forget Instructions',
    description: 'Forget instructions pattern',
    pattern: /forget\s+(all\s+)?(previous|prior|your|everything|all)\s*(instructions?|rules?|prompts?)?/gi,
    category: 'instruction_override',
    confidence: 0.90,
  },
  {
    id: 'new_instructions',
    name: 'New Instructions',
    description: 'New/real instructions pattern',
    pattern: /(new|updated|revised|real)\s+instructions?\s*(are|follow|:)/gi,
    category: 'instruction_override',
    confidence: 0.80,
  },

  // System Extraction (high signal)
  {
    id: 'show_system',
    name: 'Show System Prompt',
    description: 'Attempt to reveal system prompt',
    pattern: /(show|reveal|display|print|output|tell)\s+(me\s+)?(your|the)\s+(system|initial|original|hidden)\s+(prompt|instructions?|message|rules?)/gi,
    category: 'system_extraction',
    confidence: 0.95,
  },
  {
    id: 'what_is_system',
    name: 'What Is System Prompt',
    description: 'Question about system prompt',
    pattern: /what\s+(are|is|were)\s+(your|the)\s+(system|initial|original|full)\s+(prompt|instructions?|rules?)/gi,
    category: 'system_extraction',
    confidence: 0.90,
  },
  {
    id: 'leak_prompt',
    name: 'Leak Prompt',
    description: 'Explicit prompt extraction attempt',
    pattern: /(leak|expose|dump|extract)\s+(your|the|system)\s+(prompt|instructions?)/gi,
    category: 'system_extraction',
    confidence: 0.95,
  },

  // Delimiter Attacks (high signal)
  {
    id: 'openai_delimiters',
    name: 'OpenAI Delimiters',
    description: 'OpenAI special tokens injection',
    pattern: /<\|(system|user|assistant|im_start|im_end|endoftext)\|>/g,
    category: 'delimiter_attack',
    confidence: 0.95,
  },
  {
    id: 'llama_delimiters',
    name: 'Llama Delimiters',
    description: 'Llama/Mistral special tokens',
    pattern: /\[\/?(?:INST|SYS)\]/g,
    category: 'delimiter_attack',
    confidence: 0.95,
  },
  {
    id: 'xml_injection',
    name: 'XML Injection',
    description: 'XML-style prompt injection',
    pattern: /<(?:system|instruction|prompt|rules?)>/gi,
    category: 'delimiter_attack',
    confidence: 0.85,
  },

  // Developer Mode (high signal)
  {
    id: 'enable_dev_mode',
    name: 'Enable Dev Mode',
    description: 'Developer mode activation attempt',
    pattern: /enable\s+(developer|dev|debug|admin|maintenance|god)\s+mode/gi,
    category: 'developer_mode',
    confidence: 0.90,
  },
  {
    id: 'jailbreak_command',
    name: 'Jailbreak Command',
    description: 'Explicit jailbreak command',
    pattern: /\/?(jailbreak|unlock|bypass|override)/gi,
    category: 'developer_mode',
    confidence: 0.85,
  },
  {
    id: 'admin_access',
    name: 'Admin Access',
    description: 'Admin privilege request',
    pattern: /(grant|give|enable)\s+(me\s+)?(admin|root|superuser)\s+(access|privileges?)/gi,
    category: 'developer_mode',
    confidence: 0.85,
  },

  // Encoding Attacks
  {
    id: 'base64_decode',
    name: 'Base64 Decode',
    description: 'Base64 decoding request',
    pattern: /(decode|decrypt|translate|convert)\s+(this|the|following)?\s*(from\s+)?(base64|b64)/gi,
    category: 'encoding_attack',
    confidence: 0.80,
  },

  // Hypothetical Framing
  {
    id: 'no_restrictions',
    name: 'No Restrictions',
    description: 'Imagine without restrictions',
    pattern: /imagine\s+(you\s+)?(had\s+no|didn'?t\s+have|without)\s+(restrictions?|rules?|limits?|guidelines?)/gi,
    category: 'hypothetical_framing',
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
 * Scan a trace for injection patterns
 */
export function scanForInjection(trace: ScannedTrace): Finding[] {
  const findings: Finding[] = [];
  const fieldsToScan: { field: 'input' | 'output' | 'raw'; value: string }[] = [
    { field: 'input', value: trace.input || '' },
    { field: 'output', value: trace.output || '' },
    { field: 'raw', value: trace.raw },
  ];

  for (const { field, value } of fieldsToScan) {
    if (!value || value.length < 5) continue;

    for (const pattern of INJECTION_PATTERNS) {
      pattern.pattern.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.pattern.exec(value)) !== null) {
        findings.push({
          id: generateId(),
          engine: 'prompt_injection',
          category: pattern.category,
          severity: confidenceToSeverity(pattern.confidence),
          traceIndex: trace.index,
          field,
          matchedValue: match[0].slice(0, 100),
          redactedPreview: '[INJECTION ATTEMPT]',
          description: `${pattern.name}: ${pattern.description}`,
        });
      }
    }
  }

  return findings;
}
