"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  X,
  Compass,
  Target,
  LineChart,
  ArrowRight,
  ExternalLink,
  Info,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { CaseStudy } from "@/types";

interface CaseStudiesContentProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesContent({ caseStudies }: CaseStudiesContentProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const industries = ["All", ...Array.from(new Set(caseStudies.map((cs) => cs.clientIndustry)))];

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.clientIndustry === activeFilter);

  // Parse metrics text (e.g. "Metric: Value, Metric2: Value2") into badges
  const parseMetrics = (metricsString: string | null) => {
    if (!metricsString) return [];
    return metricsString.split(",").map((m) => {
      const parts = m.split(":");
      return {
        label: parts[0]?.trim() || "",
        value: parts[1]?.trim() || "",
      };
    });
  };

  return (
    <main className="relative overflow-hidden bg-navy-950 text-slate-300" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      {/* Background Orbs */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
      <div className="orb orb-cyan w-72 h-72 top-1/2 -left-36 opacity-5" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          tag="Our Success Stories"
          title={<>We Deliver Measurable <span className="gradient-text">Business Growth</span></>}
          subtitle="Explore our real-world case studies showcasing how we help brands in the UK, US, and Pakistan increase rankings, optimize ad spend, and scale inbound leads."
        />

        {/* Filter Tabs */}
        {industries.length > 2 && (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveFilter(industry)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    activeFilter === industry
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                      : "border border-white/10 bg-navy-900/50 text-slate-300 hover:border-teal-500/30 hover:text-white"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => {
            const metrics = parseMetrics(study.metrics);
            return (
              <ScrollReveal key={study.id} delay={idx * 0.05} direction="up">
                <div
                  onClick={() => setSelectedStudy(study)}
                  className="group cursor-pointer card h-full flex flex-col justify-between overflow-hidden !p-0 bg-navy-900/40 hover:border-teal-500/30 border border-white/5 rounded-2xl transition-all"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-48 w-full bg-navy-800 overflow-hidden">
                      {study.coverImage ? (
                        <Image
                          src={study.coverImage}
                          alt={study.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 330px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-700">
                          <TrendingUp className="w-12 h-12 text-navy-600" />
                        </div>
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-navy-950/80 border border-white/10 px-3 py-1 text-xs font-semibold text-teal-400 backdrop-blur-sm">
                        {study.clientIndustry}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white font-heading group-hover:text-teal-400 transition-colors line-clamp-2">
                        {study.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3">
                        {study.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badges Footer */}
                  <div className="p-6 pt-0 space-y-4">
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                        {metrics.slice(0, 3).map((m, index) => (
                          <div key={index} className="text-center">
                            <div className="text-sm font-bold text-teal-400">{m.value}</div>
                            <div className="text-[10px] text-slate-500 font-semibold uppercase truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-teal-400 font-bold group-hover:text-teal-300 transition-colors">
                      <span>View Results Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Modal Detail Overlay */}
        <AnimatePresence>
          {selectedStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
              onClick={() => setSelectedStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-navy-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Title */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-3">
                    {selectedStudy.clientIndustry}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white pr-10">
                    {selectedStudy.title}
                  </h2>
                </div>

                {/* Metrics Highlights Banner */}
                {selectedStudy.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-navy-950 p-6 rounded-xl border border-white/5 text-center">
                    {parseMetrics(selectedStudy.metrics).map((m, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                          {m.label}
                        </div>
                        <div className="text-2xl font-bold text-teal-400">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Three-part story layout */}
                <div className="space-y-6">
                  {/* Challenge */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-400 shrink-0 mt-0.5">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-heading mb-1.5">The Challenge</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedStudy.challenge}</p>
                    </div>
                  </div>

                  {/* Strategy */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 shrink-0 mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-heading mb-1.5">Our Strategy</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedStudy.strategy}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-heading mb-1.5">The Results</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{selectedStudy.results}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5 my-4" />

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-teal-500/5 border border-teal-500/10 p-5 rounded-xl">
                  <div className="text-left">
                    <h5 className="text-white font-bold text-sm">Want similar results for your business?</h5>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Contact us today for a free custom marketing audit.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setSelectedStudy(null)}
                    className="btn-primary py-2.5 px-5 text-xs inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Get a Free Consultation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
