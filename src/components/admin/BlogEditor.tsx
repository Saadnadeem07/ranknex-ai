"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import { slugify } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@/types";

interface BlogEditorProps {
  initialData?: BlogPost;
  categories: BlogCategory[];
  mode: "create" | "edit";
}

interface BlogFormInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  tags: string;
  status: "DRAFT" | "PUBLISHED";
  metaTitle: string;
  metaDescription: string;
}

export default function BlogEditor({ initialData, categories, mode }: BlogEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormInput>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      categoryId: initialData?.categoryId || categories[0]?.id || "",
      tags: initialData?.tags || "",
      status: initialData?.status || "DRAFT",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
    },
  });

  const titleVal = watch("title");
  const slugVal = watch("slug");

  // Auto-generate slug from title (only in create mode or if slug is empty)
  useEffect(() => {
    if (mode === "create" && titleVal) {
      setValue("slug", slugify(titleVal));
    }
  }, [titleVal, mode, setValue]);

  const onSubmit = async (data: BlogFormInput) => {
    setIsSaving(true);
    setSubmitError("");

    const payload = {
      ...data,
      featuredImage,
    };

    try {
      const url = mode === "create" ? "/api/blogs" : `/api/blogs/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (res.ok) {
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setSubmitError(resData.error || "Failed to save blog post.");
      }
    } catch {
      setSubmitError("Network error. Failed to save blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-heading text-white">
              {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {mode === "create" ? "Scaffold and compose a new article." : "Refine your existing article content."}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Post...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Post</span>
            </>
          )}
        </button>
      </div>

      {submitError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          {submitError}
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.title ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="10 SEO Trends to Master in 2025"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-slate-300 mb-2">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                {...register("slug", { required: "Slug is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.slug ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="ten-seo-trends-2025"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1.5">{errors.slug.message}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-slate-300 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                rows={3}
                {...register("excerpt", { required: "Excerpt summary is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.excerpt ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="Provide a brief 2-3 sentence summary of the article. This is shown on blog cards and search cards..."
              ></textarea>
              {errors.excerpt && <p className="text-red-500 text-xs mt-1.5">{errors.excerpt.message}</p>}
            </div>

            {/* Rich Content Editor (HTML Textarea) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="content" className="block text-sm font-semibold text-slate-300">
                  Article Body <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide bg-white/5 border border-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-500" />
                  HTML Supported
                </span>
              </div>
              <textarea
                id="content"
                rows={16}
                {...register("content", { required: "Body content is required" })}
                className={`w-full bg-navy-950 border rounded-xl p-4 text-white text-sm font-mono placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.content ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="<h2>Introduction</h2><p>Write your article here using clean HTML formatting. Support tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc. to align with global CSS typography styles.</p>"
              ></textarea>
              {errors.content && <p className="text-red-500 text-xs mt-1.5">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main settings card */}
          <div className="card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl">
            {/* Status (Publish / Draft toggle) */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-slate-300 mb-2">
                Post Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>

            {/* Category selection */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-semibold text-slate-300 mb-2">
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Uploader */}
            <ImageUploader
              label="Featured Image"
              initialImageUrl={featuredImage}
              onUploadSuccess={setFeaturedImage}
            />

            {/* Tags (comma separated string) */}
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-slate-300 mb-2">
                Tags <span className="text-slate-500">(comma separated)</span>
              </label>
              <input
                type="text"
                id="tags"
                {...register("tags")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500"
                placeholder="SEO, Google, Traffic, Marketing"
              />
            </div>
          </div>

          {/* SEO meta configuration card */}
          <div className="card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white font-heading border-b border-white/5 pb-3">
              SEO Optimization
            </h3>

            {/* Meta Title */}
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-semibold text-slate-300 mb-2">
                Meta Title <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                id="metaTitle"
                {...register("metaTitle")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500"
                placeholder="Google-optimized title tag"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label htmlFor="metaDescription" className="block text-sm font-semibold text-slate-300 mb-2">
                Meta Description <span className="text-slate-500">(Optional)</span>
              </label>
              <textarea
                id="metaDescription"
                rows={3}
                {...register("metaDescription")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500"
                placeholder="Google-optimized meta description tag"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
