'use client';

import { useState, ReactNode } from 'react';
import { Eye, Shield, BadgeCheck } from 'lucide-react';

type Pillar = 'know' | 'control' | 'prove';

interface PillarContent {
  know: ReactNode;
  control: ReactNode;
  prove: ReactNode;
}

interface PillarTabsProps {
  content: PillarContent;
}

const PILLAR_CONFIG: Record<Pillar, { label: string; icon: typeof Eye; color: string; bgColor: string }> = {
  know: {
    label: 'Know',
    icon: Eye,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
  },
  control: {
    label: 'Control',
    icon: Shield,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/30',
  },
  prove: {
    label: 'Prove',
    icon: BadgeCheck,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/30',
  },
};

export default function PillarTabs({ content }: PillarTabsProps) {
  const [active, setActive] = useState<Pillar>('know');
  const pillars: Pillar[] = ['know', 'control', 'prove'];

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
          {pillars.map((pillar) => {
            const config = PILLAR_CONFIG[pillar];
            const Icon = config.icon;
            const isActive = active === pillar;

            return (
              <button
                key={pillar}
                onClick={() => setActive(pillar)}
                className={`
                  relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                  ${isActive
                    ? `${config.bgColor} border ${config.color}`
                    : 'text-slate-400 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? config.color : ''}`} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className={`
        p-6 rounded-xl border transition-all
        ${PILLAR_CONFIG[active].bgColor}
      `}>
        {content[active]}
      </div>
    </div>
  );
}
