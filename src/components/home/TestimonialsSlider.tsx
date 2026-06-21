'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    name: 'James Richardson',
    role: 'CEO, TechVentures UK',
    location: 'London, United Kingdom',
    content:
      'RankNex AI completely transformed our online presence. Within 4 months, our organic traffic increased by 320% and we\'re now ranking on page 1 for our top 15 keywords. The ROI has been incredible — easily the best investment we\'ve made in marketing.',
    rating: 5,
    avatar: 'JR',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Director, HealthPlus',
    location: 'New York, USA',
    content:
      'Working with RankNex AI has been a game-changer. Their AI-driven approach to PPC cut our cost-per-lead by 45% while increasing conversions. The team is responsive, transparent, and genuinely cares about results. Highly recommended.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Founder, UrbanStyle Pk',
    location: 'Lahore, Pakistan',
    content:
      'As a startup, we needed an agency that could deliver maximum impact on a tight budget. RankNex AI delivered beyond our expectations — our e-commerce sales grew 250% in just 6 months. Their AI tools give them an unfair advantage.',
    rating: 5,
    avatar: 'AH',
  },
  {
    name: 'Emma Thompson',
    role: 'Owner, Bloom Interiors',
    location: 'Manchester, United Kingdom',
    content:
      'I was skeptical about hiring an overseas agency, but RankNex AI shattered every concern. Communication is seamless, reports are detailed, and the results speak for themselves. My website traffic is up 200% and leads have never been stronger.',
    rating: 5,
    avatar: 'ET',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, DataFlow Solutions',
    location: 'San Francisco, USA',
    content:
      'Their web development and SEO combo is unbeatable. RankNex AI rebuilt our site for speed and SEO from the ground up. Load times dropped by 60%, and organic sessions doubled within 3 months. Truly exceptional work at an incredible price point.',
    rating: 5,
    avatar: 'MC',
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleManualNav = (fn: () => void) => {
    setIsAutoPlaying(false);
    fn();
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="section section-alt relative overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          tag="Testimonials"
          title={<>What Our Clients <span className="gradient-text font-bold">Say About Us</span></>}
          subtitle="Don&apos;t just take our word for it. Here&apos;s what businesses across the globe say about working with RankNex AI."
        />

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Quote decoration */}
              <Quote className="absolute -top-4 -left-2 md:-left-6 w-12 h-12 text-teal-500/10" />

              {/* Testimonial card */}
              <div className="card-glass min-h-[280px] md:min-h-[240px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonials[current].rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-500 text-amber-500"
                          />
                        )
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 italic">
                      &ldquo;{testimonials[current].content}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                        {testimonials[current].avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {testimonials[current].name}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {testimonials[current].role}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {testimonials[current].location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrent(index);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 10000);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === current
                          ? 'w-8 bg-teal-500'
                          : 'w-2 bg-navy-700 hover:bg-navy-600'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleManualNav(prev)}
                    className="w-10 h-10 rounded-xl border border-navy-700 flex items-center justify-center text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleManualNav(next)}
                    className="w-10 h-10 rounded-xl border border-navy-700 flex items-center justify-center text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
