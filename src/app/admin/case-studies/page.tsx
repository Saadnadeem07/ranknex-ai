import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import CaseStudiesList from "./CaseStudiesList";
import type { CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Manage Case Studies | RankNex Admin",
};

export default async function AdminCaseStudiesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all case studies
  const studiesRaw = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates
  const caseStudies: CaseStudy[] = studiesRaw.map((study) => ({
    ...study,
    createdAt: study.createdAt.toISOString(),
    updatedAt: study.updatedAt.toISOString(),
  })) as unknown as CaseStudy[];

  return <CaseStudiesList initialStudies={caseStudies} />;
}
