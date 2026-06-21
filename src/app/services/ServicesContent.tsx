'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  MousePointerClick,
  PenTool,
  Monitor,
  Palette,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    slug: '/services/seo',
    description:
      'Dominate search results with AI-driven SEO strategies. Technical audits, on-page optimization, link building, local SEO, and GEO — engineered for sustainable rankings.',
    features: ['Technical SEO', 'On-Page & Off-Page', 'Local SEO', 'GEO Optimization'],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    slug: '/services/social-media',
    description:
      'Build engaged communities and drive revenue through strategic social media management across Instagram, Facebook, LinkedIn, TikTok, and X.',
    features: ['Content Strategy', 'Community Management', 'Paid Social', 'Analytics'],
  },
  {
    icon: MousePointerClick,
    title: 'PPC Advertising',
    slug: '/services/ppc-advertising',
    description:
      'Maximize every advertising dollar with data-driven Google Ads, Meta Ads, and programmatic campaigns that convert clicks into customers.',
    features: ['Google Ads', 'Meta Ads', 'Retargeting', 'Conversion Tracking'],
  },
  {
    icon: PenTool,
    title: 'Content Writing & Strategy',
    slug: '/services/content-writing',
    description:
      'Compelling, SEO-optimized content that educates, engages, and converts. From blog posts and landing pages to whitepapers and email sequences.',
    features: ['Blog Content', 'Copywriting', 'Content Strategy', 'SEO Writing'],
  },
  {
    icon: Monitor,
    title: 'Web Design & Development',
    slug: '/services/web-designing',
    description:
      'High-performance websites built for speed, conversions, and search engines. Custom designs, responsive development, and ongoing maintenance.',
    features: ['Custom Design', 'Next.js / React', 'Speed Optimization', 'Maintenance'],
  },
  {
    icon: Palette,
    title: 'Strategic Branding',
    slug: '/services/branding',
    description:
      'Build a brand that commands attention and earns trust. Logo design, visual identity systems, brand strategy, and positioning that sets you apart.',
    features: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Guidelines'],
  },
];

export default function ServicesContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
        <div className="orb orb-cyan w-72 h-72 top-1/3 -left-36 opacity-8" />

        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide text-teal-500 border border-teal-500/20 bg-teal-500/5 mb-6"
            >
              Our Services
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
            >
              Full-Stack <span className="gradient-text">Digital Marketing</span>{' '}
              Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              From search engine optimization to brand identity — every service we offer
              is powered by AI intelligence, backed by data, and focused on one thing:
              growing your business.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.08}>
                <Link href={service.slug} className="block h-full group">
                  <div className="card p-8 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
                      <service.icon className="w-7 h-7 text-teal-500" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-teal-500 transition-colors">
                      {service.title}
                    </h2>

                    <p className="text-slate-400 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-3 py-1 rounded-full bg-navy-700/50 text-slate-300 border border-white/5"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-teal-500 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            tag="Why RankNex AI"
            title={
              <>
                What Makes Our Services{' '}
                <span className="gradient-text">Different</span>
              </>
            }
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Intelligence',
                desc: 'Every strategy is informed by machine learning analysis of your market, competitors, and audience behavior.',
              },
              {
                icon: Search,
                title: 'Integrated Approach',
                desc: 'Our services work together seamlessly. SEO informs content, content fuels social, social drives conversions.',
              },
              {
                icon: MessageCircle,
                title: 'Transparent Reporting',
                desc: 'Real-time dashboards, weekly updates, and monthly deep-dives. You always know exactly how your investment is performing.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-7 h-7 text-teal-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="card p-12 md:p-16 text-center relative overflow-hidden">
              <div className="orb orb-teal w-64 h-64 -top-32 -right-32 opacity-20" />
              <div className="orb orb-cyan w-48 h-48 -bottom-24 -left-24 opacity-15" />

              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 relative z-10">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Book a free consultation. We&apos;ll audit your digital presence and recommend
                the exact services that will drive the biggest impact for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/contact" className="btn-primary">
                  <span>Get Your Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/9203224044150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
