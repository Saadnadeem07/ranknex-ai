'use client';

import { Users, Globe, TrendingUp, Bot } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';

const stats = [
  {
    icon: Users,
    value: 150,
    suffix: '+',
    label: 'Clients Served',
    description: 'Businesses trust us',
  },
  {
    icon: Globe,
    value: 5,
    suffix: '+',
    label: 'Countries',
    description: 'Global presence',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Client Retention',
    description: 'They stay & grow',
  },
  {
    icon: Bot,
    value: 1,
    suffix: 'st',
    prefix: '',
    label: 'AI-First Agency',
    description: 'In Pakistan',
    isSpecial: true,
  },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-16 pb-8">
      <div className="container">
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 md:p-10 glow-teal">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center group lg:px-4 lg:border-l lg:border-white/[0.06] lg:first:border-l-0"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 mb-4 ring-1 ring-teal-500/20 group-hover:bg-teal-500/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold font-heading gradient-text-teal mb-1.5 tracking-tight">
                      {stat.isSpecial ? (
                        <span>
                          <AnimatedCounter target={stat.value} duration={1000} />
                          {stat.suffix}
                        </span>
                      ) : (
                        <AnimatedCounter
                          target={stat.value}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                          duration={2000}
                        />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
