import { Metadata } from "next";
import prisma from "@/lib/db";
import CaseStudiesContent from "./CaseStudiesContent";
import type { CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Case Studies & Results | Digital Marketing Client Stories - RankNex AI",
  description: "Read our case studies to see how RankNex AI helped brands grow organic traffic, lower cost-per-acquisition (CPA), and scale leads globally.",
  keywords: [
    "digital marketing case studies",
    "seo results client stories",
    "paid advertising case studies",
    "conversion optimization success",
    "ranknex ai results"
  ],
  alternates: {
    canonical: "https://ranknexai.com/case-studies",
  },
  openGraph: {
    title: "Case Studies & Client Success Stories | RankNex AI",
    description: "Proof in numbers. Real growth results and case studies from search engine optimization, PPC advertising, and web development.",
    url: "https://ranknexai.com/case-studies",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default async function CaseStudiesPage() {
  const studiesRaw = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const caseStudies: CaseStudy[] = studiesRaw.map((study) => ({
    ...study,
    createdAt: study.createdAt.toISOString(),
    updatedAt: study.updatedAt.toISOString(),
  })) as unknown as CaseStudy[];

  return <CaseStudiesContent caseStudies={caseStudies} />;
}
