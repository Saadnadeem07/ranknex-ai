"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Search, ExternalLink, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@/types";

interface BlogsListProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogsList({ initialPosts, categories }: BlogsListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete blog post.");
      }
    } catch {
      alert("Network error. Failed to delete blog post.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || post.categoryId === categoryFilter;
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Manage Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-1">Create, edit, publish, and delete blog articles.</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary py-2.5 px-5 text-sm inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Blog Post</span>
        </Link>
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-navy-900 border border-white/5 p-4 rounded-xl">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Category */}
        <div className="md:col-span-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-navy-900 border border-white/5 rounded-2xl overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-300">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Title */}
                    <td className="py-4 px-6 max-w-xs sm:max-w-sm lg:max-w-md">
                      <div className="font-semibold text-white line-clamp-1">{post.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{post.excerpt}</div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">{post.category?.name || "Uncategorized"}</td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          post.status === "PUBLISHED"
                            ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                            : "bg-slate-500/10 text-slate-400 border border-white/10"
                        }`}
                      >
                        {post.status.toLowerCase()}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex p-2 text-slate-400 hover:text-teal-400 bg-white/5 hover:bg-teal-500/10 border border-white/5 rounded-lg transition-all"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="inline-flex p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all"
                        title="Edit Post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="inline-flex p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-lg transition-all cursor-pointer disabled:opacity-40"
                        title="Delete Post"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No blog posts match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
