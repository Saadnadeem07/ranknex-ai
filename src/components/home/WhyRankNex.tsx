'use client';

import {
  Bot,
  ShieldCheck,
  Zap,
  DollarSign,
  BarChart3,
  HeartHandshake,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const differentiators = [
  {
    icon: Bot,
    title: 'AI-First Approach',
    description:
      'We leverage cutting-edge AI tools for keyword research, content optimization, and performance analytics — giving you a competitive edge that manual agencies simply can\'t match.',
  },
  {
    icon: DollarSign,
    title: 'Global Quality, Local Pricing',
    description:
      'Get international-grade digital marketing at a fraction of Western agency costs. Our Pakistan-based team delivers the same quality at 60-70% lower rates.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Reporting',
    description:
      'No black-box strategies. You get real-time dashboards, monthly detailed reports, and direct access to your account manager. We believe in complete transparency.',
  },
  {
    icon: Zap,
    title: 'Speed & Efficiency',
    description:
      'AI-powered workflows mean faster turnaround on campaigns, content, and website builds. What takes others weeks, we deliver in days without sacrificing quality.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description:
      'Every strategy is backed by data. We use advanced analytics, A/B testing, and machine learning insights to continuously optimize your campaigns for maximum ROI.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Partnership',
    description:
      'We don\'t do cookie-cutter plans. Every client gets a dedicated strategist, custom roadmap, and the attention your business deserves. Your success is our reputation.',
  },
];

export default function WhyRankNex() {
  return (
    <section className="section section-alt relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          tag="Why Choose Us"
          title={<>Why Businesses Choose <span className="gradient-text font-bold">RankNex AI</span></>}
          subtitle="We're not just another digital agency. We combine the power of AI with battle-tested marketing strategies to deliver results that matter."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div className="card-glass group h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-teal-500 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
