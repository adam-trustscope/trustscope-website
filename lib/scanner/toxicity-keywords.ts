// Toxicity Keywords for Browser Scanner
// Categories: hate_speech, violence, self_harm, sexual, profanity
// Word-boundary matching only - report category counts, NOT actual matched terms

export type ToxicityCategory = 'hate_speech' | 'violence' | 'self_harm' | 'sexual' | 'profanity';

export interface ToxicityKeyword {
  word: string;
  category: ToxicityCategory;
  severity: 'high' | 'medium' | 'low';
}

// Curated keyword list - words that clearly indicate problematic content
// These are chosen to minimize false positives while catching obvious violations
export const TOXICITY_KEYWORDS: ToxicityKeyword[] = [
  // Hate Speech (slurs and derogatory terms)
  { word: 'nigger', category: 'hate_speech', severity: 'high' },
  { word: 'nigga', category: 'hate_speech', severity: 'high' },
  { word: 'faggot', category: 'hate_speech', severity: 'high' },
  { word: 'kike', category: 'hate_speech', severity: 'high' },
  { word: 'chink', category: 'hate_speech', severity: 'high' },
  { word: 'spic', category: 'hate_speech', severity: 'high' },
  { word: 'wetback', category: 'hate_speech', severity: 'high' },
  { word: 'tranny', category: 'hate_speech', severity: 'high' },
  { word: 'retard', category: 'hate_speech', severity: 'medium' },
  { word: 'cripple', category: 'hate_speech', severity: 'medium' },

  // Violence
  { word: 'kill yourself', category: 'violence', severity: 'high' },
  { word: 'murder', category: 'violence', severity: 'medium' },
  { word: 'massacre', category: 'violence', severity: 'high' },
  { word: 'genocide', category: 'violence', severity: 'high' },
  { word: 'terrorist', category: 'violence', severity: 'medium' },
  { word: 'bomb threat', category: 'violence', severity: 'high' },
  { word: 'shoot up', category: 'violence', severity: 'high' },
  { word: 'school shooting', category: 'violence', severity: 'high' },
  { word: 'mass shooting', category: 'violence', severity: 'high' },

  // Self Harm
  { word: 'suicide', category: 'self_harm', severity: 'high' },
  { word: 'self-harm', category: 'self_harm', severity: 'high' },
  { word: 'cut myself', category: 'self_harm', severity: 'high' },
  { word: 'end my life', category: 'self_harm', severity: 'high' },
  { word: 'want to die', category: 'self_harm', severity: 'high' },
  { word: 'kill myself', category: 'self_harm', severity: 'high' },
  { word: 'overdose', category: 'self_harm', severity: 'medium' },

  // Sexual (explicit terms only)
  { word: 'rape', category: 'sexual', severity: 'high' },
  { word: 'molest', category: 'sexual', severity: 'high' },
  { word: 'pedophile', category: 'sexual', severity: 'high' },
  { word: 'incest', category: 'sexual', severity: 'high' },
  { word: 'child porn', category: 'sexual', severity: 'high' },
  { word: 'underage', category: 'sexual', severity: 'medium' },

  // Profanity (severe only - not common swear words)
  { word: 'fuck you', category: 'profanity', severity: 'medium' },
  { word: 'motherfucker', category: 'profanity', severity: 'medium' },
  { word: 'cocksucker', category: 'profanity', severity: 'medium' },
  { word: 'cunt', category: 'profanity', severity: 'medium' },
];

// Build category map for quick lookup
export const KEYWORDS_BY_CATEGORY: Record<ToxicityCategory, ToxicityKeyword[]> = {
  hate_speech: TOXICITY_KEYWORDS.filter(k => k.category === 'hate_speech'),
  violence: TOXICITY_KEYWORDS.filter(k => k.category === 'violence'),
  self_harm: TOXICITY_KEYWORDS.filter(k => k.category === 'self_harm'),
  sexual: TOXICITY_KEYWORDS.filter(k => k.category === 'sexual'),
  profanity: TOXICITY_KEYWORDS.filter(k => k.category === 'profanity'),
};

export interface ToxicityResult {
  found: boolean;
  categories: Record<ToxicityCategory, number>;
  totalMatches: number;
  highestSeverity: 'high' | 'medium' | 'low' | null;
}

// Scan text for toxicity - returns category counts only, NOT matched terms
export function scanForToxicity(text: string): ToxicityResult {
  const lowerText = text.toLowerCase();
  const categories: Record<ToxicityCategory, number> = {
    hate_speech: 0,
    violence: 0,
    self_harm: 0,
    sexual: 0,
    profanity: 0,
  };

  let totalMatches = 0;
  let highestSeverity: 'high' | 'medium' | 'low' | null = null;

  for (const keyword of TOXICITY_KEYWORDS) {
    // Word boundary matching
    const regex = new RegExp(`\\b${escapeRegex(keyword.word)}\\b`, 'gi');
    const matches = lowerText.match(regex);

    if (matches) {
      categories[keyword.category] += matches.length;
      totalMatches += matches.length;

      if (!highestSeverity || severityRank(keyword.severity) > severityRank(highestSeverity)) {
        highestSeverity = keyword.severity;
      }
    }
  }

  return {
    found: totalMatches > 0,
    categories,
    totalMatches,
    highestSeverity,
  };
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function severityRank(severity: 'high' | 'medium' | 'low'): number {
  switch (severity) {
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
}

// Get human-readable category label
export function getCategoryLabel(category: ToxicityCategory): string {
  switch (category) {
    case 'hate_speech': return 'Hate Speech';
    case 'violence': return 'Violence';
    case 'self_harm': return 'Self-Harm';
    case 'sexual': return 'Sexual Content';
    case 'profanity': return 'Profanity';
    default: return category;
  }
}
