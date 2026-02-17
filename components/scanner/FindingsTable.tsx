'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Key, DollarSign, RefreshCw, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Finding, FindingEngine, FindingSeverity } from '@/lib/scanner/types';

interface FindingsTableProps {
  findings: Finding[];
}

const ENGINE_CONFIG: Record<FindingEngine, { icon: typeof Shield; label: string; color: string; bgColor: string; description: string }> = {
  pii: {
    icon: Shield,
    label: 'Personal Information (PII)',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    description: 'Sensitive personal data that could identify individuals'
  },
  secrets: {
    icon: Key,
    label: 'Secrets & Credentials',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    description: 'API keys, tokens, and other credentials'
  },
  cost: {
    icon: DollarSign,
    label: 'Cost Anomalies',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    description: 'Unusual token usage or spending patterns'
  },
  loop: {
    icon: RefreshCw,
    label: 'Loop Detection',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
    description: 'Repetitive or stuck agent behavior'
  },
  toxicity: {
    icon: AlertTriangle,
    label: 'Content Safety',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
    description: 'Potentially problematic language or content'
  },
};

const SEVERITY_DOTS: Record<FindingSeverity, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

const CATEGORY_LABELS: Record<string, { label: string; description: string }> = {
  // PII
  ssn: { label: 'Social Security Numbers', description: 'US SSN format (XXX-XX-XXXX)' },
  email: { label: 'Email Addresses', description: 'Personal or work email addresses' },
  phone: { label: 'Phone Numbers', description: 'US phone number formats' },
  credit_card: { label: 'Credit Card Numbers', description: 'Valid card numbers (Luhn checked)' },
  date_of_birth: { label: 'Dates of Birth', description: 'MM/DD/YYYY format dates' },
  ip_address: { label: 'IP Addresses', description: 'IPv4 addresses' },
  medical_record: { label: 'Medical Record IDs', description: 'MRN and patient identifiers' },
  drivers_license: { label: "Driver's Licenses", description: 'State ID patterns' },
  // Secrets
  openai_key: { label: 'OpenAI API Keys', description: 'Keys starting with sk-' },
  anthropic_key: { label: 'Anthropic API Keys', description: 'Keys starting with sk-ant-' },
  aws_access_key: { label: 'AWS Access Keys', description: 'AKIA... format keys' },
  aws_secret_key: { label: 'AWS Secret Keys', description: '40-character secret keys' },
  bearer_token: { label: 'Bearer Tokens', description: 'Authorization header tokens' },
  private_key: { label: 'Private Keys', description: 'RSA/SSH private key headers' },
  generic_api_key: { label: 'Generic API Keys', description: 'api_key= patterns' },
  database_url: { label: 'Database URLs', description: 'Connection strings with credentials' },
  github_token: { label: 'GitHub Tokens', description: 'ghp_, gho_ format tokens' },
  google_api_key: { label: 'Google API Keys', description: 'AIza... format keys' },
  // Cost
  high_tokens: { label: 'High Token Usage', description: 'Requests exceeding 10K tokens' },
  high_cost: { label: 'High Cost Requests', description: 'Individual requests over $1.00' },
  cost_growth: { label: 'Cost Spikes', description: 'Sudden increases between requests' },
  above_median: { label: 'Above Average Cost', description: 'Significantly higher than median' },
  // Loop
  identical_inputs: { label: 'Identical Loops', description: 'Same input repeated 3+ times' },
  similar_inputs: { label: 'Similar Patterns', description: 'Very similar inputs repeated' },
  oscillation: { label: 'Back-and-Forth', description: 'A-B-A-B oscillation patterns' },
  // Toxicity
  hate_speech: { label: 'Hate Speech', description: 'Discriminatory language' },
  violence: { label: 'Violence', description: 'Violent or threatening content' },
  self_harm: { label: 'Self-Harm', description: 'Self-harm related content' },
  sexual: { label: 'Sexual Content', description: 'Explicit sexual content' },
  profanity: { label: 'Profanity', description: 'Strong language' },
};

export default function FindingsTable({ findings }: FindingsTableProps) {
  const [expandedEngines, setExpandedEngines] = useState<Set<FindingEngine>>(() => new Set(['pii', 'secrets'] as FindingEngine[]));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());
  const [showValues, setShowValues] = useState(false);

  // Group findings by engine then category
  const grouped = findings.reduce((acc, finding) => {
    if (!acc[finding.engine]) {
      acc[finding.engine] = {};
    }
    if (!acc[finding.engine][finding.category]) {
      acc[finding.engine][finding.category] = [];
    }
    acc[finding.engine][finding.category].push(finding);
    return acc;
  }, {} as Record<FindingEngine, Record<string, Finding[]>>);

  const toggleEngine = (engine: FindingEngine) => {
    const newExpanded = new Set(expandedEngines);
    if (newExpanded.has(engine)) {
      newExpanded.delete(engine);
    } else {
      newExpanded.add(engine);
    }
    setExpandedEngines(newExpanded);
  };

  const toggleCategory = (key: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  if (findings.length === 0) {
    return null;
  }

  const engineOrder: FindingEngine[] = ['secrets', 'pii', 'cost', 'loop', 'toxicity'];
  const sortedEngines = engineOrder.filter(e => grouped[e]);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Detailed Findings</h3>
        <button
          onClick={() => setShowValues(!showValues)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          {showValues ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showValues ? 'Hide Values' : 'Show Values'}
        </button>
      </div>

      <p className="text-sm text-slate-500">
        Click each section to expand and see specific findings. Values are partially masked for security.
      </p>

      {/* Findings by engine */}
      <div className="space-y-3">
        {sortedEngines.map((engine) => {
          const config = ENGINE_CONFIG[engine];
          const Icon = config.icon;
          const categories = grouped[engine];
          const totalCount = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);
          const isExpanded = expandedEngines.has(engine);

          return (
            <div key={engine} className={`border rounded-xl overflow-hidden ${config.bgColor}`}>
              {/* Engine header */}
              <button
                onClick={() => toggleEngine(engine)}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}>
                  {isExpanded ? (
                    <ChevronDown className={`w-4 h-4 ${config.color}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 ${config.color}`} />
                  )}
                </div>
                <Icon className={`w-5 h-5 ${config.color}`} />
                <div className="flex-1">
                  <span className="font-medium">{config.label}</span>
                  <span className="text-slate-500 ml-2">({totalCount})</span>
                </div>
                <span className="text-xs text-slate-500 hidden md:block">{config.description}</span>
              </button>

              {/* Categories */}
              {isExpanded && (
                <div className="border-t border-white/10">
                  {Object.entries(categories).map(([category, categoryFindings]) => {
                    const categoryKey = `${engine}-${category}`;
                    const isCategoryExpanded = expandedCategories.has(categoryKey);
                    const categoryInfo = CATEGORY_LABELS[category] || { label: category, description: '' };

                    return (
                      <div key={category} className="border-b border-white/5 last:border-0">
                        {/* Category header */}
                        <button
                          onClick={() => toggleCategory(categoryKey)}
                          className="w-full flex items-center gap-3 px-4 py-3 pl-16 hover:bg-white/5 transition-colors text-left"
                        >
                          {isCategoryExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                          )}
                          <div className="flex-1">
                            <span className="text-sm font-medium">{categoryInfo.label}</span>
                            <span className="text-slate-500 ml-2">({categoryFindings.length})</span>
                          </div>
                          <span className="text-xs text-slate-600 hidden md:block">{categoryInfo.description}</span>
                        </button>

                        {/* Individual findings */}
                        {isCategoryExpanded && (
                          <div className="bg-slate-900/50 px-4 py-3 pl-20">
                            <div className="space-y-2">
                              {categoryFindings.slice(0, 10).map((finding) => (
                                <div
                                  key={finding.id}
                                  className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                                >
                                  <span
                                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${SEVERITY_DOTS[finding.severity]}`}
                                    title={finding.severity}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                      <span className="bg-white/10 px-1.5 py-0.5 rounded">
                                        Trace #{finding.traceIndex}
                                      </span>
                                      <span>in {finding.field}</span>
                                      <span className={`uppercase text-[10px] ${
                                        finding.severity === 'critical' ? 'text-red-400' :
                                        finding.severity === 'high' ? 'text-orange-400' :
                                        finding.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                      }`}>
                                        {finding.severity}
                                      </span>
                                    </div>
                                    {showValues ? (
                                      <code className="text-sm text-slate-300 font-mono bg-white/5 px-2 py-1 rounded block">
                                        {finding.matchedValue}
                                      </code>
                                    ) : (
                                      <div className="text-sm text-slate-400">
                                        {finding.description}
                                        <span className="text-slate-600 ml-2">→ {finding.redactedPreview}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              {categoryFindings.length > 10 && (
                                <p className="text-xs text-slate-500 py-2 text-center">
                                  + {categoryFindings.length - 10} more findings in this category
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
