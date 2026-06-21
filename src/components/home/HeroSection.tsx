'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ParticleBackground from '@/components/ui/ParticleBackground';
import GradientOrbs from '@/components/ui/GradientOrbs';
import { getWhatsAppUrl } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-bg" />
      <ParticleBackground particleCount={60} connectionDistance={100} />
      <GradientOrbs
        orbs={[
          { color: 'teal', size: 500, top: '-15%', right: '-10%', delay: 0 },
          { color: 'cyan', size: 400, bottom: '-15%', left: '-10%', delay: 3 },
          { color: 'teal', size: 250, top: '60%', left: '50%', delay: 5 },
        ]}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
     <div className="container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/10 text-teal-500 border border-teal-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              AI-Powered Digital Marketing Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-white">AI-Powered Digital</span>
            <br />
            <span className="text-white">Marketing & </span>
            <span className="gradient-text">IT Solutions</span>
            <br />
            <span className="text-slate-300 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium block mt-3">
              Pakistan Talent, International Standards
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            RankNex AI helps businesses in the UK, US, and Pakistan grow online
            through smart SEO, AI-driven marketing, and full-stack development —
            delivered by a team that combines AI tools with real human expertise,
            at a fraction of the cost.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/contact" className="btn-primary group text-base">
              <span>Get Your Free Audit</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={getWhatsAppUrl('Hi RankNex AI! I\'d like to discuss growing my business online.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No Long-Term Contracts
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free SEO Audit
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Results in 90 Days
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
