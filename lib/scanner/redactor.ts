// Redactor Engine for Browser Scanner
// Redacts PII and secrets while maintaining valid JSON/CSV structure

import { PII_PATTERNS, SECRET_PATTERNS } from './patterns';
import { Finding } from './types';

export interface RedactionResult {
  content: string;
  redactionCount: number;
  categories: Record<string, number>;
}

// Full redaction using all patterns
export function redactContent(content: string): RedactionResult {
  let redacted = content;
  let redactionCount = 0;
  const categories: Record<string, number> = {};

  // Redact secrets first (they're more specific)
  for (const [category, pattern] of Object.entries(SECRET_PATTERNS)) {
    pattern.pattern.lastIndex = 0;
    const matches = redacted.match(pattern.pattern) || [];

    if (matches.length > 0) {
      // Filter with validation if present
      const validMatches = matches.filter(match => {
        if (pattern.validate) {
          return pattern.validate(match, redacted);
        }
        return true;
      });

      if (validMatches.length > 0) {
        categories[category] = (categories[category] || 0) + validMatches.length;
        redactionCount += validMatches.length;
      }

      // Reset and replace
      pattern.pattern.lastIndex = 0;
      redacted = redacted.replace(pattern.pattern, (match) => {
        if (pattern.validate && !pattern.validate(match, redacted)) {
          return match;
        }
        return pattern.redactTo;
      });
    }
    pattern.pattern.lastIndex = 0;
  }

  // Redact PII
  for (const [category, pattern] of Object.entries(PII_PATTERNS)) {
    pattern.pattern.lastIndex = 0;
    const matches = redacted.match(pattern.pattern) || [];

    if (matches.length > 0) {
      // Filter with validation if present
      const validMatches = matches.filter(match => {
        if (pattern.validate) {
          return pattern.validate(match, redacted);
        }
        return true;
      });

      if (validMatches.length > 0) {
        categories[category] = (categories[category] || 0) + validMatches.length;
        redactionCount += validMatches.length;
      }

      // Reset and replace
      pattern.pattern.lastIndex = 0;
      redacted = redacted.replace(pattern.pattern, (match) => {
        if (pattern.validate && !pattern.validate(match, redacted)) {
          return match;
        }
        return pattern.redactTo;
      });
    }
    pattern.pattern.lastIndex = 0;
  }

  return {
    content: redacted,
    redactionCount,
    categories,
  };
}

// Selective redaction based on findings
export function redactFromFindings(content: string, findings: Finding[]): string {
  let redacted = content;

  // Get unique PII/secret findings
  const piiAndSecrets = findings.filter(f => f.engine === 'pii' || f.engine === 'secrets');

  // Group by category to use correct redaction text
  const redactionMap = new Map<string, string>();

  for (const finding of piiAndSecrets) {
    if (finding.engine === 'pii') {
      const pattern = PII_PATTERNS[finding.category];
      if (pattern) {
        redactionMap.set(finding.matchedValue, pattern.redactTo);
      }
    } else if (finding.engine === 'secrets') {
      const pattern = SECRET_PATTERNS[finding.category];
      if (pattern) {
        // For secrets, we have masked values, so we need to use pattern-based replacement
        redacted = redacted.replace(pattern.pattern, pattern.redactTo);
        pattern.pattern.lastIndex = 0;
      }
    }
  }

  // Apply PII redactions
  redactionMap.forEach((replacement, original) => {
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    redacted = redacted.replace(regex, replacement);
  });

  return redacted;
}

// Validate that redacted JSON is still valid
export function validateRedactedJson(content: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(content);
    return { valid: true };
  } catch (e) {
    return {
      valid: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

// Get summary of what was redacted
export function getRedactionSummary(result: RedactionResult): string[] {
  const summary: string[] = [];

  for (const [category, count] of Object.entries(result.categories)) {
    const label = getCategoryLabel(category);
    summary.push(`${count} ${label}${count > 1 ? 's' : ''}`);
  }

  return summary;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    ssn: 'Social Security Number',
    email: 'Email Address',
    phone: 'Phone Number',
    credit_card: 'Credit Card',
    date_of_birth: 'Date of Birth',
    ip_address: 'IP Address',
    medical_record: 'Medical Record ID',
    drivers_license: "Driver's License",
    openai_key: 'OpenAI API Key',
    anthropic_key: 'Anthropic API Key',
    aws_access_key: 'AWS Access Key',
    aws_secret_key: 'AWS Secret Key',
    bearer_token: 'Bearer Token',
    private_key: 'Private Key',
    generic_api_key: 'API Key',
    database_url: 'Database URL',
    github_token: 'GitHub Token',
    google_api_key: 'Google API Key',
  };

  return labels[category] || category;
}
