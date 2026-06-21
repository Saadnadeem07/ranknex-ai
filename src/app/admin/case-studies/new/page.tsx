import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

export const metadata: Metadata = {
  title: "New Case Study | RankNex Admin",
};

export default async function NewCaseStudyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <CaseStudyEditor mode="create" />
    </div>
  );
}
