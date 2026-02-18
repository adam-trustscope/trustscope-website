'use client';

import { LucideIcon } from 'lucide-react';
import TierBadge from './TierBadge';

type Tier = 'monitor' | 'protect' | 'enforce' | 'govern';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tier?: Tier;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

const COLUMN_CLASSES = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export default function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`grid gap-4 ${COLUMN_CLASSES[columns]}`}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="relative p-6 rounded-xl bg-[#1a1f2e] border border-slate-700/50 hover:border-[#C49B3A]/30 transition-colors group"
          >
            {feature.tier && (
              <div className="absolute top-4 right-4">
                <TierBadge tier={feature.tier} size="sm" />
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-[#C49B3A]/10 transition-colors">
              <Icon className="w-6 h-6 text-slate-400 group-hover:text-[#C49B3A] transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
}
