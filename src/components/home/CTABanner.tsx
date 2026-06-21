'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import GradientOrbs from '@/components/ui/GradientOrbs';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getWhatsAppUrl } from '@/lib/utils';

export default function CTABanner() {
  return (
    <section className="section relative overflow-hidden">
      <GradientOrbs
        orbs={[
          { color: 'teal', size: 500, top: '-30%', left: '-10%', delay: 0 },
          { color: 'cyan', size: 400, bottom: '-30%', right: '-10%', delay: 2 },
        ]}
      />

      <div className="container relative z-10">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-navy-800/80 to-cyan-400/10" />
            <div className="absolute inset-0 border border-teal-500/15 rounded-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Content */}
            <div className="relative px-6 py-16 md:px-16 md:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Sparkle icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/15 text-teal-500 mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-5 leading-tight max-w-3xl mx-auto">
                  Ready to{' '}
                  <span className="gradient-text">Dominate Your Market</span>
                  {' '}with AI-Powered Growth?
                </h2>

                <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
                  Get a free, no-obligation SEO audit and discover exactly how
                  RankNex AI can transform your digital presence. Most clients
                  see measurable results within 90 days.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="btn-primary group text-base">
                    <span>Get Your Free Audit</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={getWhatsAppUrl('Hi RankNex AI! I want to get a free SEO audit for my business.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary group text-base"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Micro-trust */}
                <p className="mt-8 text-xs text-slate-500">
                  ✓ Free Audit &nbsp;·&nbsp; ✓ No Contracts &nbsp;·&nbsp; ✓ Results in 90 Days &nbsp;·&nbsp; ✓ Cancel Anytime
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
