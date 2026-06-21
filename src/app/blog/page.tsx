import { Metadata } from "next";
import prisma from "@/lib/db";
import BlogContent from "./BlogContent";
import type { BlogPost, BlogCategory } from "@/types";

export const metadata: Metadata = {
  title: "SEO, AI & Digital Marketing Blog | RankNex AI",
  description: "Stay ahead with RankNex AI's latest articles and insights on search engine optimization, AI automation solutions, PPC advertising, and brand strategy.",
  keywords: [
    "digital marketing blog",
    "seo tips and tricks",
    "ai marketing articles",
    "google ads strategy blog",
    "ranknex ai blog",
    "content marketing guides"
  ],
  alternates: {
    canonical: "https://ranknexai.com/blog",
  },
  openGraph: {
    title: "Blog & Industry Insights | RankNex AI",
    description: "Expert digital growth strategies, guides, and tips in search engine optimization, conversion marketing, and artificial intelligence tools.",
    url: "https://ranknexai.com/blog",
    siteName: "RankNex AI",
    locale: "en_US",
    type: "website",
  },
};

export default async function BlogPage() {
  // Fetch initial posts (Page 1, limit 9)
  const postsRaw = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 9,
  });

  // Fetch categories with post count
  const categoriesRaw = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: {
          posts: {
            where: { status: "PUBLISHED" },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const total = await prisma.blogPost.count({
    where: { status: "PUBLISHED" },
  });

  // Serialize dates for Next.js boundary passing
  const initialPosts: BlogPost[] = postsRaw.map((post) => ({
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  })) as unknown as BlogPost[];

  const categories: BlogCategory[] = categoriesRaw.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    _count: {
      posts: cat._count.posts,
    },
  })) as unknown as BlogCategory[];

  const initialTotalPages = Math.ceil(total / 9) || 1;

  return (
    <BlogContent
      initialPosts={initialPosts}
      categories={categories}
      initialTotalPages={initialTotalPages}
    />
  );
}
