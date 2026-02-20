'use client';

import { Landmark, HeadphonesIcon, Stethoscope, Users } from 'lucide-react';
import { SampleType } from '@/lib/scanner/types';

interface SampleDataButtonsProps {
  onSelect: (sampleType: SampleType) => void;
  active?: SampleType | null;
  disabled?: boolean;
}

const SAMPLE_OPTIONS = [
  {
    type: 'support_bot' as SampleType,
    label: 'Support Bot',
    subtitle: 'AI answering customer questions',
    tags: ['customer emails', 'prompt injection', 'cost spikes'],
    icon: HeadphonesIcon,
  },
  {
    type: 'code_assistant' as SampleType,
    label: 'Code Assistant',
    subtitle: 'AI writing and reviewing code',
    tags: ['API keys', 'loop retries', 'token burn'],
    icon: Users,
  },
  {
    type: 'claims_processor' as SampleType,
    label: 'Claims Processor',
    subtitle: 'AI reviewing insurance claims',
    tags: ['diagnosis codes', 'policy numbers', 'member IDs'],
    icon: Stethoscope,
  },
  {
    type: 'research_pipeline' as SampleType,
    label: 'Research Pipeline',
    subtitle: 'Multi-agent research workflow',
    tags: ['scraped PII', 'agent cascades', 'cost anomalies'],
    icon: Users,
  },
  {
    type: 'financial_advisor' as SampleType,
    label: 'Financial Advisor',
    subtitle: 'AI handling regulated client data',
    tags: ['account IDs', 'SSNs', 'credentials'],
    icon: Landmark,
  },
];

export default function SampleDataButtons({ onSelect, active, disabled }: SampleDataButtonsProps) {
  return (
    <div className="min-w-0 space-y-2 pt-1">
      <span className="text-xs font-medium text-[var(--text-subtle)]">Try sample:</span>
      <div className="flex w-full gap-2 overflow-x-auto pb-1">
        {SAMPLE_OPTIONS.map((option) => {
          const isActive = active === option.type;
          const visibleTags = option.tags.slice(0, 2);
          const hiddenTagCount = Math.max(0, option.tags.length - visibleTags.length);
          return (
            <button
              key={option.type}
              onClick={() => onSelect(option.type)}
              disabled={disabled}
              className={`w-[215px] shrink-0 rounded-lg border p-3 text-left transition-all duration-150 ${
                isActive
                  ? 'border-[var(--interactive)] bg-[color:rgba(37,99,235,.14)] shadow-[0_0_0_1px_rgba(37,99,235,.18)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]'
              } ${disabled ? 'opacity-60' : ''} ${!disabled ? 'active:scale-[0.99]' : ''}`}
            >
              <div className="flex items-center gap-2">
                <option.icon className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
                <span className={`text-sm font-semibold ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {option.label}
                </span>
              </div>
              <p className="mt-0.5 min-h-[30px] overflow-hidden text-xs text-[var(--text-muted)]">{option.subtitle}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--text-subtle)]"
                  >
                    {tag}
                  </span>
                ))}
                {hiddenTagCount > 0 && (
                  <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--text-subtle)]">
                    +{hiddenTagCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
