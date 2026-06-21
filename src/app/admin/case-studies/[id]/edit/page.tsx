import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/db";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import type { CaseStudy } from "@/types";

export const metadata: Metadata = {
  title: "Edit Case Study | RankNex Admin",
};

interface EditCaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const studyRaw = await prisma.caseStudy.findUnique({
    where: { id },
  });

  if (!studyRaw) {
    notFound();
  }

  // Serialize dates
  const caseStudy: CaseStudy = {
    ...studyRaw,
    createdAt: studyRaw.createdAt.toISOString(),
    updatedAt: studyRaw.updatedAt.toISOString(),
  } as unknown as CaseStudy;

  return (
    <div className="container mx-auto py-8 px-4">
      <CaseStudyEditor mode="edit" initialData={caseStudy} />
    </div>
  );
}
