"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { parseCaseStudyMetrics } from "@/lib/utils";
import type { CaseStudy } from "@/types";

interface CaseStudiesContentProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesContent({ caseStudies }: CaseStudiesContentProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const industries = ["All", ...Array.from(new Set(caseStudies.map((cs) => cs.clientIndustry)))];

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.clientIndustry === activeFilter);

  return (
    <main className="relative overflow-hidden bg-navy-950 text-slate-300 pt-32 pb-20">
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

        {/* Empty state */}
        {filteredStudies.length === 0 && (
          <p className="text-center text-slate-500 py-16">No case studies published yet.</p>
        )}

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => {
            const metrics = parseCaseStudyMetrics(study.metrics);
            return (
              <ScrollReveal key={study.id} delay={idx * 0.05} direction="up">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group card !p-0 h-full flex flex-col justify-between overflow-hidden bg-navy-900/40 hover:border-teal-500/30 border border-white/5 rounded-2xl transition-all"
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
                      <p className="text-slate-400 text-sm line-clamp-3">{study.challenge}</p>
                    </div>
                  </div>

                  {/* Metrics + CTA footer */}
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
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </main>
  );
}
