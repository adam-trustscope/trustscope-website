'use client';

import { Lock } from 'lucide-react';

const SERVER_ENGINES = [
  'Prompt Injection Detection',
  'Jailbreak Attempt Detection',
  'Hallucination Scoring',
  'Groundedness Verification',
  'Semantic Similarity',
  'Topic Drift Analysis',
  'Sentiment Analysis',
  'Intent Classification',
  'Entity Extraction',
  'PII Classification (ML)',
  'Toxicity Scoring (ML)',
  'Bias Detection',
  'Fact Checking',
  'Citation Verification',
  'Multi-turn Coherence',
  'Tool Call Validation',
  'Response Quality Scoring',
  'Embedding Similarity',
  'Knowledge Base Alignment',
];

export default function ServerEnginePreview() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Lock className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h4 className="font-medium text-white">19 Server-Side Engines</h4>
          <p className="text-sm text-slate-400">Available with TrustScope cloud</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 opacity-50">
        {SERVER_ENGINES.map((engine) => (
          <span
            key={engine}
            className="bg-white/5 border border-white/10 text-slate-500 text-xs px-2.5 py-1 rounded"
          >
            {engine}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <a
          href="https://app.trustscope.ai"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          Start free trial to unlock all engines →
        </a>
      </div>
    </div>
  );
}
