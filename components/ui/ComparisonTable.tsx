'use client';

import { Check, Minus } from 'lucide-react';

type Tier = 'monitor' | 'protect' | 'enforce' | 'govern';

interface Feature {
  name: string;
  description?: string;
  values: Record<Tier, string | boolean>;
}

interface FeatureGroup {
  name: string;
  features: Feature[];
}

interface ComparisonTableProps {
  groups: FeatureGroup[];
  recommendedTier?: Tier;
}

const TIER_HEADERS: Record<Tier, { label: string; price: string }> = {
  monitor: { label: 'Monitor', price: 'Free' },
  protect: { label: 'Protect', price: '$49/mo' },
  enforce: { label: 'Enforce', price: '$249/mo' },
  govern: { label: 'Govern', price: 'Contact' },
};

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-green-400 mx-auto" />;
  }
  if (value === false) {
    return <Minus className="w-5 h-5 text-slate-600 mx-auto" />;
  }
  return <span className="text-sm text-slate-300">{value}</span>;
}

export default function ComparisonTable({ groups, recommendedTier = 'enforce' }: ComparisonTableProps) {
  const tiers: Tier[] = ['monitor', 'protect', 'enforce', 'govern'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px]">
        {/* Header */}
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left py-4 px-4 text-slate-400 font-medium w-1/3">
              Feature
            </th>
            {tiers.map((tier) => {
              const isRecommended = tier === recommendedTier;
              return (
                <th
                  key={tier}
                  className={`
                    text-center py-4 px-4 w-1/6
                    ${isRecommended ? 'bg-[#C49B3A]/10' : ''}
                  `}
                >
                  {isRecommended && (
                    <div className="text-xs text-[#C49B3A] font-medium mb-1">
                      Recommended
                    </div>
                  )}
                  <div className="text-white font-semibold">{TIER_HEADERS[tier].label}</div>
                  <div className="text-sm text-slate-500">{TIER_HEADERS[tier].price}</div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {groups.map((group, groupIndex) => (
            <>
              {/* Group header */}
              <tr key={`group-${groupIndex}`} className="bg-slate-900/50">
                <td
                  colSpan={5}
                  className="py-3 px-4 text-sm font-semibold text-white"
                >
                  {group.name}
                </td>
              </tr>

              {/* Group features */}
              {group.features.map((feature, featureIndex) => (
                <tr
                  key={`feature-${groupIndex}-${featureIndex}`}
                  className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="text-slate-300 text-sm">{feature.name}</div>
                    {feature.description && (
                      <div className="text-xs text-slate-500 mt-0.5">{feature.description}</div>
                    )}
                  </td>
                  {tiers.map((tier) => (
                    <td
                      key={tier}
                      className={`
                        text-center py-4 px-4
                        ${tier === recommendedTier ? 'bg-[#C49B3A]/5' : ''}
                      `}
                    >
                      <CellValue value={feature.values[tier]} />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
