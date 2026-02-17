'use client';

import { Stethoscope, Landmark, HeadphonesIcon, Users, Sparkles } from 'lucide-react';
import { SampleType } from '@/lib/scanner/types';

interface SampleDataButtonsProps {
  onSelect: (sampleType: SampleType) => void;
  disabled?: boolean;
}

const SAMPLE_OPTIONS = [
  {
    type: 'healthcare' as SampleType,
    label: 'Healthcare AI',
    icon: Stethoscope,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20',
    findings: ['SSNs', 'Medical IDs', 'API Keys', 'Cost Spikes'],
    traceCount: '~60 traces',
  },
  {
    type: 'financial' as SampleType,
    label: 'Financial Bot',
    icon: Landmark,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20',
    findings: ['Credit Cards', 'SSNs', 'DB URLs', 'Bearer Tokens'],
    traceCount: '~70 traces',
  },
  {
    type: 'support' as SampleType,
    label: 'Customer Support',
    icon: HeadphonesIcon,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20',
    findings: ['Emails', 'Toxicity', 'Anthropic Key', 'Oscillation'],
    traceCount: '~55 traces',
  },
  {
    type: 'multiagent' as SampleType,
    label: 'Multi-Agent',
    icon: Users,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20',
    findings: ['Loops', 'Cost Growth', 'Mixed Keys', 'DB URLs'],
    traceCount: '~80 traces',
  },
];

export default function SampleDataButtons({ onSelect, disabled }: SampleDataButtonsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
        <Sparkles className="w-4 h-4" />
        <span>No file? Try a synthetic dataset to see the scanner in action</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SAMPLE_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            disabled={disabled}
            className={`
              flex flex-col items-start gap-3 p-4 rounded-xl text-left
              border transition-all duration-200
              ${option.bgColor}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <option.icon className={`w-5 h-5 ${option.color}`} />
              <span className="font-medium text-white">{option.label}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {option.findings.slice(0, 2).map((finding) => (
                <span
                  key={finding}
                  className="bg-white/10 rounded px-1.5 py-0.5 text-[10px] text-slate-400"
                >
                  {finding}
                </span>
              ))}
              {option.findings.length > 2 && (
                <span className="text-[10px] text-slate-500">
                  +{option.findings.length - 2} more
                </span>
              )}
            </div>

            <span className="text-xs text-slate-500">{option.traceCount}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
