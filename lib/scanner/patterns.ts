// Detection Patterns for Browser Scanner
import { DetectionPattern, ModelPricing, CostAnomalyConfig, LoopDetectionConfig } from './types';

// Luhn algorithm for credit card validation
export function isValidLuhn(num: string): boolean {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// PII Detection Patterns (8 patterns)
export const PII_PATTERNS: Record<string, DetectionPattern> = {
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    label: 'Social Security Number',
    severity: 'critical',
    example: '123-45-6789',
    redactTo: '[SSN REDACTED]',
  },
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    label: 'Email Address',
    severity: 'high',
    example: 'user@example.com',
    redactTo: '[EMAIL REDACTED]',
  },
  phone: {
    pattern: /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g,
    label: 'Phone Number',
    severity: 'high',
    example: '(555) 123-4567',
    redactTo: '[PHONE REDACTED]',
  },
  credit_card: {
    pattern: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    label: 'Credit Card Number',
    severity: 'critical',
    example: '4111111111111111',
    redactTo: '[CC REDACTED]',
    validate: (match) => isValidLuhn(match),
  },
  date_of_birth: {
    pattern: /\b(?:0[1-9]|1[0-2])[\/\-](?:0[1-9]|[12]\d|3[01])[\/\-](?:19|20)\d{2}\b/g,
    label: 'Date of Birth',
    severity: 'high',
    example: '03/15/1990',
    redactTo: '[DOB REDACTED]',
  },
  ip_address: {
    pattern: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
    label: 'IP Address',
    severity: 'medium',
    example: '192.168.1.100',
    redactTo: '[IP REDACTED]',
  },
  medical_record: {
    pattern: /\b(?:MRN|MED|PAT|PATIENT)[-:\s]?\d{6,12}\b/gi,
    label: 'Medical Record ID',
    severity: 'critical',
    example: 'MRN-12345678',
    redactTo: '[MED-ID REDACTED]',
  },
  drivers_license: {
    pattern: /\b[A-Z]\d{7,8}\b/g,
    label: "Driver's License",
    severity: 'high',
    example: 'D1234567',
    redactTo: '[DL REDACTED]',
  },
};

// Secrets Detection Patterns (10 patterns)
export const SECRET_PATTERNS: Record<string, DetectionPattern> = {
  openai_key: {
    pattern: /\bsk-[a-zA-Z0-9]{20,}\b/g,
    label: 'OpenAI API Key',
    severity: 'critical',
    example: 'sk-abc123...',
    redactTo: '[OPENAI-KEY REDACTED]',
  },
  anthropic_key: {
    pattern: /\bsk-ant-[a-zA-Z0-9\-]{20,}\b/g,
    label: 'Anthropic API Key',
    severity: 'critical',
    example: 'sk-ant-abc123...',
    redactTo: '[ANTHROPIC-KEY REDACTED]',
  },
  aws_access_key: {
    pattern: /\bAKIA[0-9A-Z]{16}\b/g,
    label: 'AWS Access Key',
    severity: 'critical',
    example: 'AKIAIOSFODNN7EXAMPLE',
    redactTo: '[AWS-KEY REDACTED]',
  },
  aws_secret_key: {
    pattern: /\b[A-Za-z0-9\/+=]{40}\b/g,
    label: 'AWS Secret Key',
    severity: 'critical',
    example: 'wJalrXUtnFEMI/K7MDENG...',
    redactTo: '[AWS-SECRET REDACTED]',
    // Only flag when near aws/AWS/amazon context
    validate: (match, context) => {
      const lowerContext = context.toLowerCase();
      return lowerContext.includes('aws') || lowerContext.includes('amazon') || lowerContext.includes('secret');
    },
  },
  bearer_token: {
    pattern: /\bBearer\s+[A-Za-z0-9\-._~+\/]+=*/g,
    label: 'Bearer Token',
    severity: 'high',
    example: 'Bearer eyJhbGciOi...',
    redactTo: '[BEARER REDACTED]',
  },
  private_key: {
    pattern: /-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----/g,
    label: 'Private Key',
    severity: 'critical',
    example: '-----BEGIN RSA PRIVATE KEY-----',
    redactTo: '[PRIVATE-KEY REDACTED]',
  },
  generic_api_key: {
    pattern: /\b(?:api[_-]?key|apikey|api[_-]?secret|api[_-]?token)\s*[:=]\s*['"]?[A-Za-z0-9\-._]{16,}['"]?/gi,
    label: 'Generic API Key',
    severity: 'high',
    example: 'api_key=abc123def456...',
    redactTo: '[API-KEY REDACTED]',
  },
  database_url: {
    pattern: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s'"]+/gi,
    label: 'Database Connection String',
    severity: 'critical',
    example: 'postgresql://user:pass@host:5432/db',
    redactTo: '[DB-URL REDACTED]',
  },
  github_token: {
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/g,
    label: 'GitHub Token',
    severity: 'critical',
    example: 'ghp_abc123...',
    redactTo: '[GITHUB-TOKEN REDACTED]',
  },
  google_api_key: {
    pattern: /\bAIza[0-9A-Za-z\-_]{35}\b/g,
    label: 'Google API Key',
    severity: 'high',
    example: 'AIzaSyA...',
    redactTo: '[GOOGLE-KEY REDACTED]',
  },
};

// Model Pricing (per 1M tokens, current as of Feb 2026)
export const MODEL_PRICING: Record<string, ModelPricing> = {
  // OpenAI
  'gpt-4o': { input: 2.50, output: 10.00 },
  'gpt-4o-mini': { input: 0.15, output: 0.60 },
  'gpt-4.1': { input: 2.00, output: 8.00 },
  'gpt-4.1-mini': { input: 0.40, output: 1.60 },
  'gpt-4.1-nano': { input: 0.10, output: 0.40 },
  'gpt-4-turbo': { input: 10.00, output: 30.00 },
  'gpt-4': { input: 30.00, output: 60.00 },
  'gpt-3.5-turbo': { input: 0.50, output: 1.50 },
  'gpt-5': { input: 1.25, output: 10.00 },
  'gpt-5-mini': { input: 0.25, output: 2.00 },
  'gpt-5-nano': { input: 0.05, output: 0.40 },
  'gpt-5.1': { input: 1.25, output: 10.00 },
  'gpt-5.2': { input: 1.75, output: 14.00 },
  'o3-mini': { input: 1.10, output: 4.40 },
  'o4-mini': { input: 1.10, output: 4.40 },

  // Anthropic
  'claude-opus-4-6': { input: 5.00, output: 25.00 },
  'claude-opus-4-5': { input: 5.00, output: 25.00 },
  'claude-sonnet-4-5': { input: 3.00, output: 15.00 },
  'claude-sonnet-4': { input: 3.00, output: 15.00 },
  'claude-haiku-4-5': { input: 1.00, output: 5.00 },
  'claude-3-5-sonnet': { input: 3.00, output: 15.00 },
  'claude-3-5-haiku': { input: 0.80, output: 4.00 },
  'claude-3-opus': { input: 15.00, output: 75.00 },
  'claude-3-sonnet': { input: 3.00, output: 15.00 },
  'claude-3-haiku': { input: 0.25, output: 1.25 },

  // Google
  'gemini-2.0-flash': { input: 0.10, output: 0.40 },
  'gemini-2.0-pro': { input: 1.25, output: 10.00 },
  'gemini-1.5-pro': { input: 1.25, output: 5.00 },
  'gemini-1.5-flash': { input: 0.075, output: 0.30 },

  // Mistral
  'mistral-large': { input: 2.00, output: 6.00 },
  'mistral-small': { input: 0.10, output: 0.30 },
  'codestral': { input: 0.30, output: 0.90 },

  // Meta (via API providers)
  'llama-3.1-405b': { input: 3.00, output: 3.00 },
  'llama-3.1-70b': { input: 0.50, output: 0.50 },
  'llama-3.1-8b': { input: 0.05, output: 0.05 },
};

// Fuzzy match model name to pricing
export function getModelPricing(modelName: string): ModelPricing | null {
  const normalized = modelName.toLowerCase();

  // Direct match
  if (MODEL_PRICING[normalized]) {
    return MODEL_PRICING[normalized];
  }

  // Prefix match (e.g., "gpt-4o-2024-08-06" → "gpt-4o")
  for (const key of Object.keys(MODEL_PRICING)) {
    if (normalized.startsWith(key) || normalized.includes(key)) {
      return MODEL_PRICING[key];
    }
  }

  return null;
}

// Estimate cost from tokens and model
export function estimateCost(
  model: string,
  tokensIn: number,
  tokensOut: number
): number | null {
  const pricing = getModelPricing(model);
  if (!pricing) return null;

  const inputCost = (tokensIn / 1_000_000) * pricing.input;
  const outputCost = (tokensOut / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

// Cost anomaly detection config
export const COST_ANOMALY_CONFIG: CostAnomalyConfig = {
  highTokenThreshold: 10000,
  highCostThreshold: 1.00,
  growthThreshold: 0.50,
  medianMultiplier: 3.0,
};

// Loop detection config
export const LOOP_DETECTION_CONFIG: LoopDetectionConfig = {
  identicalThreshold: 3,
  similarThreshold: 5,
  similarityCutoff: 0.90,
  oscillationMinCycles: 2,
};

// Jaccard similarity for loop detection
export function jaccardSimilarity(a: string, b: string): number {
  const wordsA = a.toLowerCase().split(/\s+/);
  const wordsB = b.toLowerCase().split(/\s+/);
  const setA = new Set(wordsA);
  const setB = new Set(wordsB);

  let intersectionCount = 0;
  wordsA.forEach(word => {
    if (setB.has(word)) intersectionCount++;
  });

  const unionCount = setA.size + setB.size - intersectionCount;

  if (unionCount === 0) return 0;
  return intersectionCount / unionCount;
}

// Simple hash function for loop detection
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}
