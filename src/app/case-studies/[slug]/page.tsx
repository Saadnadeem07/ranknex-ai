import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import { parseCaseStudyMetrics } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Info, Compass, LineChart, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Render on-demand so the page never reaches the database at build time.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({ where: { slug } }).catch(() => null);

  if (!study || !study.published) {
    return { title: "Case Study Not Found" };
  }

  const description = study.challenge.slice(0, 160);
  return {
    title: `${study.title} | RankNex AI Case Study`,
    description,
    alternates: { canonical: `https://ranknexai.com/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description,
      url: `https://ranknexai.com/case-studies/${study.slug}`,
      type: "article",
      images: study.coverImage ? [{ url: study.coverImage }] : [],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({ where: { slug } }).catch(() => null);

  if (!study || !study.published) {
    notFound();
  }

  const metrics = parseCaseStudyMetrics(study.metrics);

  const related = await prisma.caseStudy
    .findMany({
      where: { published: true, NOT: { id: study.id } },
      orderBy: { createdAt: "desc" },
      take: 3,
    })
    .catch(() => []);

  const sections = [
    { title: "The Challenge", body: study.challenge, Icon: Info, tone: "text-red-400 bg-red-500/10" },
    { title: "Our Strategy", body: study.strategy, Icon: Compass, tone: "text-teal-400 bg-teal-500/10" },
    { title: "The Results", body: study.results, Icon: LineChart, tone: "text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <main className="relative overflow-hidden bg-navy-950 text-slate-300 pt-32 pb-20">
      {/* Background orbs */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
      <div className="orb orb-cyan w-72 h-72 top-1/2 -left-36 opacity-5" />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back link */}
        <ScrollReveal delay={0}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Case Studies
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-5 mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-teal-500/10 text-teal-400 border border-teal-500/20">
              {study.clientIndustry}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              {study.title}
            </h1>
          </div>
        </ScrollReveal>

        {/* Cover image */}
        {study.coverImage && (
          <ScrollReveal delay={0.15} className="relative h-[250px] sm:h-[400px] w-full rounded-2xl overflow-hidden mb-12 bg-navy-800">
            <Image
              src={study.coverImage}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </ScrollReveal>
        )}

        {/* Metrics banner */}
        {metrics.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8 mb-12">
              {metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold font-heading gradient-text-teal">
                    {m.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Challenge / Strategy / Results */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <ScrollReveal key={s.title} delay={0.1 + i * 0.05}>
              <div className="flex gap-4 sm:gap-5">
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 ${s.tone}`}>
                  <s.Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-white font-bold font-heading text-lg sm:text-xl mb-2">{s.title}</h2>
                  <p className="text-slate-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-between items-center bg-teal-500/[0.06] border border-teal-500/15 p-6 sm:p-8 rounded-2xl">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold font-heading text-lg">Want results like these?</h3>
              <p className="text-slate-400 text-sm mt-1">Get a free, no-obligation marketing audit for your business.</p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              <span>Get a Free Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Related case studies */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/5">
            <ScrollReveal delay={0.1}>
              <h3 className="text-2xl font-bold font-heading text-white mb-8">More Case Studies</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((r, idx) => (
                <ScrollReveal key={r.id} delay={idx * 0.05} direction="up">
                  <Link href={`/case-studies/${r.slug}`} className="group block h-full">
                    <article className="card h-full flex flex-col overflow-hidden !p-0 bg-navy-900/40 hover:border-teal-500/30 transition-all border border-white/5 rounded-2xl">
                      <div className="relative h-36 w-full bg-navy-800 overflow-hidden">
                        {r.coverImage ? (
                          <Image
                            src={r.coverImage}
                            alt={r.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 250px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-700">
                            <TrendingUp className="w-9 h-9 text-navy-600" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="text-white font-bold text-sm leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                          {r.title}
                        </h4>
                        <span className="mt-3 text-xs text-teal-500 group-hover:underline">Read case study →</span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
