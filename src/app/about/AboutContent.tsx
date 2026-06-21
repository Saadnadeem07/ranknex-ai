'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Users,
  Cpu,
  Globe,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: TrendingUp,
    title: 'Results Over Rhetoric',
    description:
      'We measure success in revenue growth, qualified leads, and market share — not vanity metrics.',
  },
  {
    icon: ShieldCheck,
    title: 'Radical Transparency',
    description:
      'Every strategy, every decision, every dollar spent — fully visible to you. No black boxes.',
  },
  {
    icon: Cpu,
    title: 'AI-First Thinking',
    description:
      'We leverage machine learning and predictive analytics to make smarter decisions, faster.',
  },
  {
    icon: Users,
    title: 'Partnership Mindset',
    description:
      'Your business goals become ours. We operate as an extension of your team, not a vendor.',
  },
  {
    icon: Lightbulb,
    title: 'Relentless Innovation',
    description:
      'The digital landscape evolves daily. We stay two steps ahead so you never fall behind.',
  },
  {
    icon: Globe,
    title: 'Global Standards, Local Insight',
    description:
      'Based in Pakistan, serving the world. We bring global best practices with local market understanding.',
  },
];

export default function AboutContent() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
        <div className="orb orb-cyan w-72 h-72 top-1/2 -left-36 opacity-8" />

        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide text-teal-500 border border-teal-500/20 bg-teal-500/5 mb-6"
            >
              About RankNex AI
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
            >
              We Don&apos;t Just Rank You —{' '}
              <span className="gradient-text">We Grow You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
              RankNex AI is a Pakistan-based, globally capable digital marketing agency
              that combines artificial intelligence with battle-tested marketing
              strategies to deliver measurable, sustainable growth for businesses of
              every size.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <SectionHeading
                  tag="Our Story"
                  title={
                    <>
                      Born From <span className="gradient-text">Frustration</span>,
                      Built for <span className="gradient-text">Results</span>
                    </>
                  }
                  align="left"
                />
                <div className="space-y-5 text-slate-300 leading-relaxed -mt-8">
                  <p>
                    RankNex AI was founded on a simple observation: most businesses were
                    paying for marketing that didn&apos;t work. Agencies were charging premium
                    fees for generic strategies, recycled playbooks, and reports packed with
                    numbers that meant nothing to the bottom line.
                  </p>
                  <p>
                    We knew there had to be a better way. By combining the analytical power
                    of artificial intelligence with the creative intuition of experienced
                    marketers, we built an agency model that delivers what actually matters
                    — qualified leads, revenue growth, and market dominance.
                  </p>
                  <p>
                    Today, we serve businesses across Pakistan, the UK, the Middle East, and
                    North America. Our team operates from Lahore, but our standards are
                    global, our ambitions are boundless, and our results speak louder than
                    any pitch deck ever could.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                <div className="card-glass p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">AI + Human</h3>
                      <p className="text-slate-400">The perfect combination</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '150+', label: 'Projects Delivered' },
                      { value: '40+', label: 'Active Clients' },
                      { value: '5+', label: 'Countries Served' },
                      { value: '97%', label: 'Client Retention' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-navy-900/50 rounded-lg p-4 text-center"
                      >
                        <div className="text-2xl font-bold gradient-text-teal">
                          {stat.value}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <SectionHeading
            tag="Mission & Vision"
            title={
              <>
                The <span className="gradient-text">Purpose</span> Behind Every Pixel
              </>
            }
            subtitle="Every strategy we build, every campaign we run, and every line of code we write is guided by a clear mission and an ambitious vision."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="card p-8 h-full">
                <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-teal-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                  Our Mission
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  To democratize access to world-class digital marketing by combining AI-driven
                  intelligence with human creativity — empowering businesses in Pakistan and
                  beyond to compete and win on the global stage. We exist to make high-performance
                  marketing accessible, transparent, and genuinely results-driven.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="card p-8 h-full">
                <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                  Our Vision
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  To become the most trusted AI-powered digital marketing agency in South Asia
                  by 2028 — known not for flashy promises, but for consistent, compounding
                  results. We envision a future where every business, regardless of size or
                  budget, has access to the same calibre of marketing intelligence that
                  Fortune 500 companies enjoy.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why RankNex AI Exists */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            tag="Why We Exist"
            title={
              <>
                The Problem <span className="gradient-text">We Solve</span>
              </>
            }
            subtitle="The digital marketing industry has a trust problem. We're here to fix it."
          />

          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="space-y-8">
                {[
                  {
                    icon: Zap,
                    title: 'Generic Strategies Don\'t Work',
                    description:
                      'Most agencies apply the same cookie-cutter approach to every client. We build custom strategies powered by AI analysis of your specific market, competitors, and audience.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Vanity Metrics Are Meaningless',
                    description:
                      'Impressions and likes don\'t pay the bills. We focus on metrics that matter — conversion rates, cost per acquisition, customer lifetime value, and revenue growth.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Transparency Shouldn\'t Be Optional',
                    description:
                      'You deserve to know exactly where your money goes, what\'s working, and what isn\'t. We provide real-time dashboards, detailed reporting, and honest counsel — always.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section">
        <div className="container">
          <SectionHeading
            tag="Our Values"
            title={
              <>
                What We <span className="gradient-text">Stand For</span>
              </>
            }
            subtitle="Six principles that guide every decision we make and every result we deliver."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="card p-7 h-full group">
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors">
                    <value.icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Expertise Positioning */}
      <section className="section section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <SectionHeading
                tag="Our Team"
                title={
                  <>
                    Pakistan-Based.{' '}
                    <span className="gradient-text">Globally Capable.</span>
                  </>
                }
                align="left"
              />
              <div className="space-y-5 text-slate-300 leading-relaxed -mt-8">
                <p>
                  Our team brings together SEO architects, paid media specialists, content
                  strategists, brand designers, and data scientists — all unified by a
                  commitment to performance that compounds over time.
                </p>
                <p>
                  Operating from Lahore, Pakistan, we deliver work that meets and exceeds
                  international standards. Our clients in the UK, UAE, and North America
                  don&apos;t see us as an offshore team — they see us as their growth partners.
                </p>
                <p>
                  Every team member is trained in the latest AI tools, platform algorithms,
                  and conversion optimization techniques. We invest heavily in learning so
                  our clients never have to worry about being left behind.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'SEO & GEO Experts', desc: 'Technical, on-page, off-page & local' },
                  { title: 'Paid Media Pros', desc: 'Google Ads, Meta Ads, TikTok Ads' },
                  { title: 'Content Strategists', desc: 'Copywriting, blogs & brand voice' },
                  { title: 'Design & Dev', desc: 'UI/UX, web development & branding' },
                ].map((role, i) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="card-glass p-5 text-center"
                  >
                    <h4 className="text-white font-semibold mb-1">{role.title}</h4>
                    <p className="text-slate-400 text-sm">{role.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
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
                Ready to See What <span className="gradient-text">AI-Powered Marketing</span> Can Do?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Get a free, no-obligation audit of your digital presence. We&apos;ll show you
                exactly where you&apos;re leaving money on the table — and how to capture it.
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
