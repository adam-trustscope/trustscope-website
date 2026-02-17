'use client';

import { MessageSquare, Bot, Wrench, Settings, Database, Calendar, Cpu } from 'lucide-react';
import { ContentClassification as ContentClassificationType } from '@/lib/scanner/types';

interface ContentClassificationProps {
  classification: ContentClassificationType;
}

export default function ContentClassification({ classification }: ContentClassificationProps) {
  const items = [
    { label: 'Prompts', present: classification.hasPrompts, icon: MessageSquare },
    { label: 'Responses', present: classification.hasResponses, icon: Bot },
    { label: 'Tool Calls', present: classification.hasToolCalls, icon: Wrench },
    { label: 'System Prompts', present: classification.hasSystemPrompts, icon: Settings },
    { label: 'Embeddings', present: classification.hasEmbeddings, icon: Database },
    { label: 'Metadata', present: classification.hasMetadata, icon: Cpu },
  ];

  const presentItems = items.filter(item => item.present);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h4 className="text-sm font-medium text-slate-400 mb-3">Content Classification</h4>

      {/* Content types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presentItems.map(item => {
          const Icon = item.icon;
          return (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full"
            >
              <Icon className="w-3 h-3" />
              {item.label}
            </span>
          );
        })}
        {presentItems.length === 0 && (
          <span className="text-slate-500 text-sm">No content classification available</span>
        )}
      </div>

      {/* Models */}
      {classification.modelNames.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Cpu className="w-4 h-4" />
          <span>Models: {classification.modelNames.join(', ')}</span>
        </div>
      )}

      {/* Date range */}
      {classification.dateRange && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(classification.dateRange.earliest).toLocaleDateString()} - {new Date(classification.dateRange.latest).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
}
