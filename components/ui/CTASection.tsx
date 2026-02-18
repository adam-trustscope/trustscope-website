'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface CTASectionProps {
  headline: string;
  subtext?: string;
  primaryCTA: CTAButton;
  secondaryCTA?: CTAButton;
  variant?: 'default' | 'gradient';
}

export default function CTASection({
  headline,
  subtext,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
}: CTASectionProps) {
  return (
    <section
      className={`
        py-16 md:py-24 px-4
        ${variant === 'gradient'
          ? 'bg-gradient-to-r from-[#0f1117] via-[#1a1f2e] to-[#0f1117] border-y border-[#C49B3A]/20'
          : 'bg-slate-900/30 border-y border-slate-800'
        }
      `}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {headline}
        </h2>
        {subtext && (
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {subtext}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryCTA.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-[#C49B3A] hover:bg-[#D4A843] text-white"
          >
            {primaryCTA.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
