'use client';

type Tier = 'monitor' | 'protect' | 'enforce' | 'govern';
type Size = 'sm' | 'md';

interface TierBadgeProps {
  tier: Tier;
  size?: Size;
  showPrice?: boolean;
}

const TIER_CONFIG: Record<Tier, { label: string; price: string; colors: string }> = {
  monitor: {
    label: 'Monitor',
    price: 'Free',
    colors: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  },
  protect: {
    label: 'Protect',
    price: '$49/mo',
    colors: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  enforce: {
    label: 'Enforce',
    price: '$249/mo',
    colors: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  govern: {
    label: 'Govern',
    price: '$2K+/mo',
    colors: 'bg-[#C49B3A]/20 text-[#D4A843] border-[#C49B3A]/30',
  },
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export default function TierBadge({ tier, size = 'sm', showPrice = false }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${config.colors}
        ${SIZE_CLASSES[size]}
      `}
    >
      {config.label}
      {showPrice && (
        <span className="opacity-70">({config.price})</span>
      )}
    </span>
  );
}
