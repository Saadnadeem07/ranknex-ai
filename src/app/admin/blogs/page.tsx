import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import BlogsList from "./BlogsList";
import type { BlogPost, BlogCategory } from "@/types";

export const metadata: Metadata = {
  title: "Manage Blogs | RankNex Admin",
};

export default async function AdminBlogsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all posts and categories
  const [postsRaw, categoriesRaw] = await Promise.all([
    prisma.blogPost.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  // Serialize dates
  const posts: BlogPost[] = postsRaw.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  })) as unknown as BlogPost[];

  const categories: BlogCategory[] = categoriesRaw.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));

  return <BlogsList initialPosts={posts} categories={categories} />;
}
