import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import { formatDate, readingTime } from "@/lib/utils";
import { generateArticleSchema } from "@/lib/seo";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {
      title: "Article Not Found",
    };
  }

  const defaultDesc = post.excerpt;

  return {
    title: `${post.metaTitle || post.title} | RankNex AI`,
    description: post.metaDescription || defaultDesc,
    alternates: {
      canonical: `https://ranknexai.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ranknexai.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch related posts (same category, excluding this one)
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      NOT: { id: post.id },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const shareUrl = `https://ranknexai.com/blog/${post.slug}`;
  const timeToRead = readingTime(post.content);

  // Article Schema
  const articleSchema = generateArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    featuredImage: post.featuredImage,
  });

  return (
    <main className="relative overflow-hidden bg-navy-950 text-slate-300" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Background Orbs */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
      <div className="orb orb-cyan w-72 h-72 top-1/2 -left-36 opacity-5" />

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Link */}
        <ScrollReveal delay={0}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </ScrollReveal>

        {/* Article Header */}
        <ScrollReveal delay={0.1}>
          <div className="space-y-6 mb-10">
            {post.category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-teal-500/10 text-teal-400 border border-teal-500/20">
                {post.category.name}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-white/5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-500" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500" />
                <span>{timeToRead}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="text-white font-semibold">RankNex AI Team</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Image */}
        {post.featuredImage && (
          <ScrollReveal delay={0.2} className="relative h-[250px] sm:h-[400px] w-full rounded-2xl overflow-hidden mb-12 bg-navy-800">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </ScrollReveal>
        )}

        {/* Article Body & Share */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-9">
            <ScrollReveal delay={0.25}>
              <div
                className="blog-content prose prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </ScrollReveal>

            {/* Tags */}
            {post.tags && (
              <ScrollReveal delay={0.3} className="mt-12 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-800 text-xs font-semibold text-slate-400 border border-white/5"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {tag.trim()}
                  </span>
                ))}
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar Share */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 h-fit space-y-6">
            <ScrollReveal delay={0.3}>
              <div className="card p-6 bg-navy-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                <h4 className="text-white font-bold font-heading mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Share2 className="w-4 h-4 text-teal-500" />
                  Share Article
                </h4>
                <div className="flex lg:flex-col gap-3">
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center lg:justify-start gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 text-[#1877F2] font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="hidden lg:inline">Facebook</span>
                  </a>

                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center lg:justify-start gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 text-[#1DA1F2] font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="hidden lg:inline">Twitter</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center lg:justify-start gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 text-[#0A66C2] font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden lg:inline">LinkedIn</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/5">
            <ScrollReveal delay={0.1}>
              <h3 className="text-2xl font-bold font-heading text-white mb-8">
                Related Articles
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost, idx) => (
                <ScrollReveal key={rPost.id} delay={idx * 0.05} direction="up">
                  <Link href={`/blog/${rPost.slug}`} className="group block">
                    <article className="card h-full flex flex-col overflow-hidden !p-0 bg-navy-900/30 hover:border-teal-500/30 transition-all border border-white/5 rounded-2xl">
                      {/* Image */}
                      <div className="relative h-44 w-full bg-navy-800 overflow-hidden">
                        {rPost.featuredImage ? (
                          <Image
                            src={rPost.featuredImage}
                            alt={rPost.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 250px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-700">
                            <span className="text-2xl font-bold text-navy-600">
                              {rPost.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Title */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="text-white font-bold text-sm leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                          {rPost.title}
                        </h4>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                          <span>{formatDate(rPost.publishedAt || rPost.createdAt)}</span>
                          <span className="text-teal-500 group-hover:underline flex items-center gap-1">
                            Read Post
                          </span>
                        </div>
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
