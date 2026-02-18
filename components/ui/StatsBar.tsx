'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  number: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsBarProps {
  stats: Stat[];
}

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  inView
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-8 border-y border-slate-800 bg-slate-900/30"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedNumber
                  value={stat.number}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
