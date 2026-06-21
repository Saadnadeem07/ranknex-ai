'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQ from '@/components/ui/FAQ';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, CheckCircle2, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageTemplateProps {
  tag: string;
  headline: string;
  headlineAccent: string;
  description: string;
  features: Feature[];
  processSteps: ProcessStep[];
  benefits: string[];
  faqs: FAQItem[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export default function ServicePageTemplate({
  tag,
  headline,
  headlineAccent,
  description,
  features,
  processSteps,
  benefits,
  faqs,
  ctaTitle = 'Ready to Get Started?',
  ctaDescription = "Book a free consultation and discover how we can accelerate your growth. No obligations, no pressure — just honest, actionable insights.",
}: ServicePageTemplateProps) {
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
              {tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6"
            >
              {headline}{' '}
              <span className="gradient-text">{headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-10"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact" className="btn-primary">
                <span>Get a Free Consultation</span>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features / What We Offer */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            tag="What We Deliver"
            title={
              <>
                Key Features &{' '}
                <span className="gradient-text">Capabilities</span>
              </>
            }
            subtitle="Every engagement is tailored to your business, but these core capabilities form the foundation of our approach."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <div className="card p-7 h-full group">
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-5 group-hover:bg-teal-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-teal-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <SectionHeading
                tag="Why It Matters"
                title={
                  <>
                    Benefits That Impact Your{' '}
                    <span className="gradient-text">Bottom Line</span>
                  </>
                }
                align="left"
              />
              <div className="space-y-4 -mt-8">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="card-glass p-8">
                <h3 className="text-xl font-bold text-white mb-6 font-heading">
                  Our Process
                </h3>
                <div className="space-y-6">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-500 font-bold text-sm">
                          {step.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            tag="FAQ"
            title={
              <>
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </>
            }
            subtitle="Get answers to the most common questions about our services."
          />

          <div className="max-w-3xl mx-auto">
            <FAQ items={faqs} />
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
                {ctaTitle}
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                {ctaDescription}
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
