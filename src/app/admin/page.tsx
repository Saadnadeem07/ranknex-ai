import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import DashboardStats from "@/components/admin/DashboardStats";
import Link from "next/link";
import { FileText, Plus, Inbox, ArrowRight, MessageSquare, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch metrics in parallel
  const [
    totalBlogs,
    publishedBlogs,
    totalCaseStudies,
    unreadSubmissions,
    recentBlogs,
    recentSubmissions,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.caseStudy.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.blogPost.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, {session.user?.name || "Admin"}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blogs/new" className="btn-primary py-2.5 px-5 text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </Link>
          <Link href="/admin/case-studies/new" className="btn-secondary py-2.5 px-5 text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Case Study</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats
        totalBlogs={totalBlogs}
        publishedBlogs={publishedBlogs}
        totalCaseStudies={totalCaseStudies}
        unreadSubmissions={unreadSubmissions}
      />

      {/* Grid of Recents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent blog posts */}
        <div className="lg:col-span-7 card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              <span>Recent Blog Posts</span>
            </h3>
            <Link href="/admin/blogs" className="text-xs text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 group">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((post) => (
                <div key={post.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-white hover:text-teal-400 text-sm font-semibold transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{post.category?.name || "Uncategorized"}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.status === "PUBLISHED"
                        ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-white/10"
                    }`}
                  >
                    {post.status.toLowerCase()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">No blog posts created yet.</div>
            )}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="lg:col-span-5 card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Inbox className="w-5 h-5 text-teal-400" />
              <span>Recent Contact Submissions</span>
            </h3>
            <Link href="/admin/contacts" className="text-xs text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 group">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((sub) => (
                <div key={sub.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-white text-sm font-semibold line-clamp-1">{sub.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0 mt-0.5">
                      {formatDate(sub.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400 text-xs truncate max-w-[200px]">{sub.service}</span>
                    {!sub.read && (
                      <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">No submissions received yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
