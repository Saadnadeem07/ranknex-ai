import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/db";
import BlogEditor from "@/components/admin/BlogEditor";
import type { BlogPost } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Blog Post | RankNex Admin",
};

export default async function AdminEditBlogPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  // Fetch target post and categories
  const [postRaw, categoriesRaw] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!postRaw) {
    notFound();
  }

  // Serialize dates for page boundary passing
  const post: BlogPost = {
    ...postRaw,
    publishedAt: postRaw.publishedAt ? postRaw.publishedAt.toISOString() : null,
    createdAt: postRaw.createdAt.toISOString(),
    updatedAt: postRaw.updatedAt.toISOString(),
  } as unknown as BlogPost;

  const categories = categoriesRaw.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return <BlogEditor initialData={post} categories={categories} mode="edit" />;
}
