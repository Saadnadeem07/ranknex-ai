'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import Link from 'next/link';
import ParticleBackground from '@/components/ui/ParticleBackground';
import GradientOrbs from '@/components/ui/GradientOrbs';
import HeroVisual from '@/components/home/HeroVisual';
import { getWhatsAppUrl } from '@/lib/utils';

const trustPoints = ['No Long-Term Contracts', 'Free SEO Audit', 'Results in 90 Days'];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 gradient-bg" />
      <ParticleBackground particleCount={36} connectionDistance={110} />
      <GradientOrbs
        orbs={[
          { color: 'teal', size: 500, top: '-15%', right: '-10%', delay: 0 },
          { color: 'cyan', size: 400, bottom: '-15%', left: '-10%', delay: 3 },
          { color: 'teal', size: 250, top: '60%', left: '50%', delay: 5 },
        ]}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      {/* Central spotlight glow behind headline */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(0,201,167,0.10), transparent)' }}
      />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-8 glow-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
              AI-Powered Digital Marketing Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="text-white">AI-Powered Digital</span>
            <br />
            <span className="text-white">Marketing &amp; </span>
            <span className="gradient-text animate-gradient">IT Solutions</span>
            <span className="block mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
              Pakistan Talent, International Standards
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            RankNex AI helps businesses in the UK, US, and Pakistan grow online
            through smart SEO, AI-driven marketing, and full-stack development —
            delivered by a team that combines AI tools with real human expertise,
            at a fraction of the cost.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link href="/contact" className="btn-primary group text-base w-full sm:w-auto justify-center">
              <span>Get Your Free Audit</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={getWhatsAppUrl('Hi RankNex AI! I\'d like to discuss growing my business online.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group text-base w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {trustPoints.map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-slate-300 bg-white/[0.03] border border-white/10 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-teal-500/15 text-teal-400">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {point}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero dashboard visual */}
        <HeroVisual />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
}
