// Detection Engine Schema for UI
// Based on TrustScope v2 detection breakdown

export type EngineCategory = 'statistical' | 'content' | 'ai_hybrid';
export type EngineTier = 'monitor' | 'protect' | 'enforce' | 'govern';

export interface EngineDefinition {
  id: string;
  name: string;
  description: string;
  category: EngineCategory;
  tier: EngineTier;
  browserAvailable: boolean;
  subtypeCount?: number;
}

export interface SubtypeCategory {
  id: string;
  name: string;
  patternCount: number;
  examples: string[];
}

export interface EngineSubtypes {
  engineId: string;
  totalPatterns: number;
  categories: SubtypeCategory[];
}

// ============================================================
// ENGINE DEFINITIONS
// ============================================================

export const STATISTICAL_ENGINES: EngineDefinition[] = [
  {
    id: 'loop_killer',
    name: 'Loop Killer',
    description: 'Detects infinite loops and recursive patterns',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'velocity',
    name: 'Velocity Monitor',
    description: 'Tracks request rate and burst patterns',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'oscillation',
    name: 'Oscillation Detector',
    description: 'Identifies A-B-A-B behavioral patterns',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'token_growth',
    name: 'Token Growth',
    description: 'Monitors token usage growth over time',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'cost_velocity',
    name: 'Cost Velocity',
    description: 'Detects rapid cost increases',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'error_rate',
    name: 'Error Rate',
    description: 'Tracks error frequency and patterns',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'budget_caps',
    name: 'Budget Caps',
    description: 'Enforces spending limits per agent',
    category: 'statistical',
    tier: 'protect',
    browserAvailable: false,
  },
  {
    id: 'context_expansion',
    name: 'Context Expansion',
    description: 'Detects context window abuse',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'session_duration',
    name: 'Session Duration',
    description: 'Monitors unusually long sessions',
    category: 'statistical',
    tier: 'monitor',
    browserAvailable: true,
  },
  {
    id: 'session_action_limit',
    name: 'Session Action Limit',
    description: 'Caps actions per session',
    category: 'statistical',
    tier: 'protect',
    browserAvailable: false,
  },
];

export const CONTENT_ENGINES: EngineDefinition[] = [
  {
    id: 'pii_scanner',
    name: 'PII Scanner',
    description: '90 patterns across 10 categories',
    category: 'content',
    tier: 'monitor',
    browserAvailable: true,
    subtypeCount: 90,
  },
  {
    id: 'secrets_scanner',
    name: 'Secrets Scanner',
    description: '60 patterns across 9 categories',
    category: 'content',
    tier: 'monitor',
    browserAvailable: true,
    subtypeCount: 60,
  },
  {
    id: 'command_firewall',
    name: 'Command Firewall',
    description: '56 dangerous command patterns',
    category: 'content',
    tier: 'protect',
    browserAvailable: true,
    subtypeCount: 56,
  },
  {
    id: 'blocked_phrases',
    name: 'Blocked Phrases',
    description: 'Custom phrase blocklist',
    category: 'content',
    tier: 'protect',
    browserAvailable: false,
  },
  {
    id: 'data_exfiltration',
    name: 'Data Exfiltration',
    description: 'Detects data extraction attempts',
    category: 'content',
    tier: 'protect',
    browserAvailable: true,
  },
  {
    id: 'prompt_injection',
    name: 'Prompt Injection',
    description: '57 patterns across 8 categories',
    category: 'content',
    tier: 'protect',
    browserAvailable: true,
    subtypeCount: 57,
  },
  {
    id: 'jailbreak_detector',
    name: 'Jailbreak Detector',
    description: '46 patterns across 6 categories',
    category: 'content',
    tier: 'protect',
    browserAvailable: true,
    subtypeCount: 46,
  },
  {
    id: 'action_label_mismatch',
    name: 'Action Label Mismatch',
    description: 'Detects tool call inconsistencies',
    category: 'content',
    tier: 'protect',
    browserAvailable: true,
  },
  {
    id: 'toxicity_filter',
    name: 'Toxicity Filter',
    description: '6 keyword categories',
    category: 'content',
    tier: 'monitor',
    browserAvailable: true,
    subtypeCount: 6,
  },
  {
    id: 'content_policy',
    name: 'Content Policy',
    description: 'Custom content rules',
    category: 'content',
    tier: 'protect',
    browserAvailable: false,
  },
];

export const AI_HYBRID_ENGINES: EngineDefinition[] = [
  {
    id: 'semantic_firewall',
    name: 'Semantic Firewall',
    description: 'AI-powered intent analysis',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'hallucination_detector',
    name: 'Hallucination Detector',
    description: 'Fact verification against sources',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'reasoning_drift',
    name: 'Reasoning Drift',
    description: 'Detects logical inconsistencies',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'intent_classifier',
    name: 'Intent Classifier',
    description: 'Classifies user intent categories',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'context_relevance',
    name: 'Context Relevance',
    description: 'Ensures response relevance',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'output_consistency',
    name: 'Output Consistency',
    description: 'Cross-checks output patterns',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
  {
    id: 'hate_speech_detector',
    name: 'Hate Speech Detector',
    description: 'AI-powered hate speech detection',
    category: 'ai_hybrid',
    tier: 'enforce',
    browserAvailable: false,
  },
];

// ============================================================
// ENGINE SUBTYPES (Pattern Categories)
// ============================================================

export const PII_SUBTYPES: EngineSubtypes = {
  engineId: 'pii_scanner',
  totalPatterns: 90,
  categories: [
    { id: 'us_pii', name: 'US PII', patternCount: 10, examples: ['SSN', 'ITIN', 'Passport'] },
    { id: 'international_id', name: 'International ID', patternCount: 16, examples: ['UK NIN', 'Canadian SIN', 'German ID'] },
    { id: 'financial', name: 'Financial', patternCount: 4, examples: ['Bank Account', 'Routing Number'] },
    { id: 'cloud_keys', name: 'Cloud Keys', patternCount: 7, examples: ['AWS', 'GCP', 'Azure'] },
    { id: 'code_platforms', name: 'Code Platforms', patternCount: 10, examples: ['GitHub', 'GitLab', 'Bitbucket'] },
    { id: 'communication', name: 'Communication', patternCount: 15, examples: ['Slack', 'Discord', 'Twilio'] },
    { id: 'payment', name: 'Payment', patternCount: 5, examples: ['Stripe', 'PayPal', 'Square'] },
    { id: 'private_keys', name: 'Private Keys', patternCount: 9, examples: ['RSA', 'SSH', 'PGP'] },
    { id: 'generic_creds', name: 'Generic Credentials', patternCount: 8, examples: ['Password', 'API Key', 'Token'] },
    { id: 'contact_info', name: 'Contact Info', patternCount: 6, examples: ['Email', 'Phone', 'Address'] },
  ],
};

export const SECRETS_SUBTYPES: EngineSubtypes = {
  engineId: 'secrets_scanner',
  totalPatterns: 60,
  categories: [
    { id: 'cloud_providers', name: 'Cloud Providers', patternCount: 12, examples: ['AWS Keys', 'GCP Credentials', 'Azure Tokens'] },
    { id: 'ai_platforms', name: 'AI Platforms', patternCount: 8, examples: ['OpenAI', 'Anthropic', 'Cohere', 'HuggingFace'] },
    { id: 'databases', name: 'Databases', patternCount: 6, examples: ['PostgreSQL', 'MongoDB', 'Redis URLs'] },
    { id: 'code_repos', name: 'Code Repositories', patternCount: 8, examples: ['GitHub PAT', 'GitLab Token', 'Bitbucket'] },
    { id: 'communication', name: 'Communication', patternCount: 7, examples: ['Slack Bot', 'Discord Webhook', 'Twilio'] },
    { id: 'payment', name: 'Payment', patternCount: 5, examples: ['Stripe Secret', 'PayPal', 'Braintree'] },
    { id: 'auth_tokens', name: 'Auth Tokens', patternCount: 6, examples: ['JWT', 'Bearer Token', 'OAuth'] },
    { id: 'private_keys', name: 'Private Keys', patternCount: 5, examples: ['RSA', 'SSH', 'PEM Files'] },
    { id: 'generic', name: 'Generic Secrets', patternCount: 3, examples: ['API Keys', 'Passwords', 'Tokens'] },
  ],
};

export const PROMPT_INJECTION_SUBTYPES: EngineSubtypes = {
  engineId: 'prompt_injection',
  totalPatterns: 57,
  categories: [
    { id: 'instruction_override', name: 'Instruction Override', patternCount: 12, examples: ['Ignore previous', 'New instructions'] },
    { id: 'role_manipulation', name: 'Role Manipulation', patternCount: 8, examples: ['You are now', 'Pretend to be'] },
    { id: 'context_injection', name: 'Context Injection', patternCount: 7, examples: ['System prompt:', 'Developer mode'] },
    { id: 'encoding_attacks', name: 'Encoding Attacks', patternCount: 6, examples: ['Base64', 'Unicode', 'Hex encoding'] },
    { id: 'delimiter_attacks', name: 'Delimiter Attacks', patternCount: 8, examples: ['</system>', 'ENDOFPROMPT'] },
    { id: 'indirect_injection', name: 'Indirect Injection', patternCount: 5, examples: ['Hidden text', 'Invisible chars'] },
    { id: 'goal_hijacking', name: 'Goal Hijacking', patternCount: 6, examples: ['Instead of', 'Actually do'] },
    { id: 'payload_splitting', name: 'Payload Splitting', patternCount: 5, examples: ['Multi-turn attacks', 'Chained prompts'] },
  ],
};

export const JAILBREAK_SUBTYPES: EngineSubtypes = {
  engineId: 'jailbreak_detector',
  totalPatterns: 46,
  categories: [
    { id: 'dan_variants', name: 'DAN Variants', patternCount: 10, examples: ['DAN', 'STAN', 'DUDE'] },
    { id: 'roleplay_jailbreaks', name: 'Roleplay Jailbreaks', patternCount: 8, examples: ['Evil AI', 'Unfiltered mode'] },
    { id: 'hypothetical', name: 'Hypothetical Scenarios', patternCount: 7, examples: ['Pretend that', 'Imagine if'] },
    { id: 'token_manipulation', name: 'Token Manipulation', patternCount: 6, examples: ['Tokenizer tricks', 'Special chars'] },
    { id: 'context_abuse', name: 'Context Abuse', patternCount: 8, examples: ['Long context', 'Prompt stuffing'] },
    { id: 'known_exploits', name: 'Known Exploits', patternCount: 7, examples: ['Grandma exploit', 'Poem trick'] },
  ],
};

export const COMMAND_FIREWALL_SUBTYPES: EngineSubtypes = {
  engineId: 'command_firewall',
  totalPatterns: 56,
  categories: [
    { id: 'system_commands', name: 'System Commands', patternCount: 18, examples: ['rm -rf', 'sudo', 'chmod'] },
    { id: 'network_commands', name: 'Network Commands', patternCount: 14, examples: ['curl', 'wget', 'nc'] },
    { id: 'file_operations', name: 'File Operations', patternCount: 12, examples: ['cat /etc/passwd', 'read secrets'] },
    { id: 'code_execution', name: 'Code Execution', patternCount: 12, examples: ['eval', 'exec', 'subprocess'] },
  ],
};

export const TOXICITY_SUBTYPES: EngineSubtypes = {
  engineId: 'toxicity_filter',
  totalPatterns: 6,
  categories: [
    { id: 'hate_speech', name: 'Hate Speech', patternCount: 1, examples: ['Slurs', 'Discrimination'] },
    { id: 'violence', name: 'Violence', patternCount: 1, examples: ['Threats', 'Harm'] },
    { id: 'self_harm', name: 'Self Harm', patternCount: 1, examples: ['Suicide', 'Self-injury'] },
    { id: 'sexual', name: 'Sexual Content', patternCount: 1, examples: ['Explicit', 'NSFW'] },
    { id: 'profanity', name: 'Profanity', patternCount: 1, examples: ['Swear words'] },
    { id: 'harassment', name: 'Harassment', patternCount: 1, examples: ['Bullying', 'Threats'] },
  ],
};

// ============================================================
// AGGREGATED DATA FOR UI
// ============================================================

export const ALL_ENGINES = [
  ...STATISTICAL_ENGINES,
  ...CONTENT_ENGINES,
  ...AI_HYBRID_ENGINES,
];

export const ENGINE_SUBTYPES: Record<string, EngineSubtypes> = {
  pii_scanner: PII_SUBTYPES,
  secrets_scanner: SECRETS_SUBTYPES,
  prompt_injection: PROMPT_INJECTION_SUBTYPES,
  jailbreak_detector: JAILBREAK_SUBTYPES,
  command_firewall: COMMAND_FIREWALL_SUBTYPES,
  toxicity_filter: TOXICITY_SUBTYPES,
};

export const ENGINE_COUNTS = {
  statistical: STATISTICAL_ENGINES.length,
  content: CONTENT_ENGINES.length,
  ai_hybrid: AI_HYBRID_ENGINES.length,
  total: ALL_ENGINES.length,
  browserAvailable: ALL_ENGINES.filter(e => e.browserAvailable).length,
  serverOnly: ALL_ENGINES.filter(e => !e.browserAvailable).length,
};

export const PATTERN_COUNTS = {
  pii: PII_SUBTYPES.totalPatterns,
  secrets: SECRETS_SUBTYPES.totalPatterns,
  prompt_injection: PROMPT_INJECTION_SUBTYPES.totalPatterns,
  jailbreak: JAILBREAK_SUBTYPES.totalPatterns,
  command_firewall: COMMAND_FIREWALL_SUBTYPES.totalPatterns,
  toxicity: TOXICITY_SUBTYPES.totalPatterns,
  total:
    PII_SUBTYPES.totalPatterns +
    SECRETS_SUBTYPES.totalPatterns +
    PROMPT_INJECTION_SUBTYPES.totalPatterns +
    JAILBREAK_SUBTYPES.totalPatterns +
    COMMAND_FIREWALL_SUBTYPES.totalPatterns +
    TOXICITY_SUBTYPES.totalPatterns,
};

// Helper functions
export function getEngineById(id: string): EngineDefinition | undefined {
  return ALL_ENGINES.find(e => e.id === id);
}

export function getEnginesByCategory(category: EngineCategory): EngineDefinition[] {
  return ALL_ENGINES.filter(e => e.category === category);
}

export function getEnginesByTier(tier: EngineTier): EngineDefinition[] {
  return ALL_ENGINES.filter(e => e.tier === tier);
}

export function getBrowserAvailableEngines(): EngineDefinition[] {
  return ALL_ENGINES.filter(e => e.browserAvailable);
}

export function getServerOnlyEngines(): EngineDefinition[] {
  return ALL_ENGINES.filter(e => !e.browserAvailable);
}
