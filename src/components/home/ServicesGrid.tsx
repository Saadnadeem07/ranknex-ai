'use client';

import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  MousePointerClick,
  PenTool,
  MonitorSmartphone,
  Palette,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GradientOrbs from '@/components/ui/GradientOrbs';

const services = [
  {
    icon: Search,
    title: 'SEO Services',
    description:
      'Dominate search results with AI-powered SEO strategies. We combine technical optimization, strategic content, and smart link building to drive organic traffic that converts.',
    href: '/services/seo',
    color: 'teal',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description:
      'Build brand authority across platforms with data-driven social campaigns. From content creation to community management, we turn followers into loyal customers.',
    href: '/services/social-media-marketing',
    color: 'cyan',
  },
  {
    icon: MousePointerClick,
    title: 'PPC Advertising',
    description:
      'Maximize ROI with precision-targeted ad campaigns on Google, Facebook, and LinkedIn. Every dollar works harder with our AI-optimized bidding strategies.',
    href: '/services/ppc-advertising',
    color: 'teal',
  },
  {
    icon: PenTool,
    title: 'Content Writing',
    description:
      'Engage your audience with expert content that ranks. Our AI-enhanced writers create blog posts, web copy, and thought-leadership content that builds trust and drives action.',
    href: '/services/content-writing',
    color: 'cyan',
  },
  {
    icon: MonitorSmartphone,
    title: 'Web Design & Development',
    description:
      'Launch high-performance websites built for speed, conversions, and SEO. From custom designs to full-stack development, we build digital experiences that win.',
    href: '/services/web-designing',
    color: 'teal',
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    description:
      'Stand out from the crowd with strategic brand identity design. From logo design to complete brand guidelines, we create visual identities that resonate with your audience.',
    href: '/services/branding',
    color: 'cyan',
  },
];

export default function ServicesGrid() {
  return (
    <section className="section relative overflow-hidden">
      <GradientOrbs
        orbs={[
          { color: 'teal', size: 300, top: '10%', right: '-5%', delay: 0 },
          { color: 'cyan', size: 250, bottom: '10%', left: '-5%', delay: 3 },
        ]}
      />

      <div className="container relative z-10">
        <SectionHeading
          tag="Our Services"
          title={<>Comprehensive Digital Solutions <span className="gradient-text font-bold">That Deliver Results</span></>}
          subtitle="From SEO to full-stack development, we provide end-to-end digital services powered by AI — designed to grow your business faster and smarter."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Link href={service.href} className="block h-full">
                  <motion.div
                    className="card group h-full flex flex-col"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-colors duration-300 ${
                        service.color === 'teal'
                          ? 'bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20'
                          : 'bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400/20'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-teal-500 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                      {service.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-teal-500 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
