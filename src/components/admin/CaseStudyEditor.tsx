"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import { slugify } from "@/lib/utils";
import type { CaseStudy } from "@/types";

interface CaseStudyEditorProps {
  initialData?: CaseStudy;
  mode: "create" | "edit";
}

interface CaseStudyFormInput {
  title: string;
  slug: string;
  clientIndustry: string;
  metrics: string;
  challenge: string;
  strategy: string;
  results: string;
  featured: boolean;
  published: boolean;
}

export default function CaseStudyEditor({ initialData, mode }: CaseStudyEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CaseStudyFormInput>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      clientIndustry: initialData?.clientIndustry || "",
      metrics: initialData?.metrics || "",
      challenge: initialData?.challenge || "",
      strategy: initialData?.strategy || "",
      results: initialData?.results || "",
      featured: initialData?.featured || false,
      published: initialData?.published || false,
    },
  });

  const titleVal = watch("title");

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === "create" && titleVal) {
      setValue("slug", slugify(titleVal));
    }
  }, [titleVal, mode, setValue]);

  const onSubmit = async (data: CaseStudyFormInput) => {
    setIsSaving(true);
    setSubmitError("");

    const payload = {
      ...data,
      coverImage,
    };

    try {
      const url = mode === "create" ? "/api/case-studies" : `/api/case-studies/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (res.ok) {
        router.push("/admin/case-studies");
        router.refresh();
      } else {
        setSubmitError(resData.error || "Failed to save case study.");
      }
    } catch {
      setSubmitError("Network error. Failed to save case study.");
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
            href="/admin/case-studies"
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-heading text-white">
              {mode === "create" ? "New Case Study" : "Edit Case Study"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {mode === "create" ? "Publish a new client success story." : "Refine your existing success story details."}
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
              <span>Saving Study...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Case Study</span>
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
                Case Study Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.title ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="E-Commerce Brand Grows Organic Revenue by 185%"
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
                placeholder="ecommerce-revenue-growth"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1.5">{errors.slug.message}</p>}
            </div>

            {/* Challenge */}
            <div>
              <label htmlFor="challenge" className="block text-sm font-semibold text-slate-300 mb-2">
                The Challenge <span className="text-red-500">*</span>
              </label>
              <textarea
                id="challenge"
                rows={4}
                {...register("challenge", { required: "Challenge description is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.challenge ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="What was the client's starting situation? Detail their organic search bottleneck, keyword stagnation, high CPC dependency, or layout design issues..."
              ></textarea>
              {errors.challenge && <p className="text-red-500 text-xs mt-1.5">{errors.challenge.message}</p>}
            </div>

            {/* Strategy */}
            <div>
              <label htmlFor="strategy" className="block text-sm font-semibold text-slate-300 mb-2">
                Our Strategy <span className="text-red-500">*</span>
              </label>
              <textarea
                id="strategy"
                rows={4}
                {...register("strategy", { required: "Strategy description is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.strategy ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="Describe our AI-powered solution. What keywords did we map out? What content structures did we deploy? What ad-bidding optimizations did we launch?"
              ></textarea>
              {errors.strategy && <p className="text-red-500 text-xs mt-1.5">{errors.strategy.message}</p>}
            </div>

            {/* Results */}
            <div>
              <label htmlFor="results" className="block text-sm font-semibold text-slate-300 mb-2">
                The Results <span className="text-red-500">*</span>
              </label>
              <textarea
                id="results"
                rows={4}
                {...register("results", { required: "Results description is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.results ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="Detail the metrics and long-term business impact. Did they rank in local Maps? Did they drop cost per lead? Quote specific revenue growth values..."
              ></textarea>
              {errors.results && <p className="text-red-500 text-xs mt-1.5">{errors.results.message}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card bg-navy-900 border border-white/5 p-6 rounded-2xl space-y-6 shadow-xl">
            {/* Status (Publish / Draft toggle) */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm font-semibold text-slate-300">Publish Success Story</span>
              <input
                type="checkbox"
                id="published"
                {...register("published")}
                className="w-4 h-4 text-teal-500 focus:ring-teal-500/20 rounded border-white/10 bg-navy-950 accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Featured study toggle */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm font-semibold text-slate-300">Feature on Homepage</span>
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="w-4 h-4 text-teal-500 focus:ring-teal-500/20 rounded border-white/10 bg-navy-950 accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Client Industry */}
            <div>
              <label htmlFor="clientIndustry" className="block text-sm font-semibold text-slate-300 mb-2">
                Client Industry <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="clientIndustry"
                {...register("clientIndustry", { required: "Industry is required" })}
                className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.clientIndustry ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-teal-500"
                }`}
                placeholder="E-Commerce, Technology, Healthcare"
              />
              {errors.clientIndustry && (
                <p className="text-red-500 text-xs mt-1.5">{errors.clientIndustry.message}</p>
              )}
            </div>

            {/* Metrics */}
            <div>
              <label htmlFor="metrics" className="block text-sm font-semibold text-slate-300 mb-2">
                Metrics Highlights <span className="text-slate-500">(comma separated)</span>
              </label>
              <input
                type="text"
                id="metrics"
                {...register("metrics")}
                className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500"
                placeholder="Organic Traffic: +320%, ROAS: 4.5x, CPA: -52%"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Format: <strong>Label: Value</strong> separated by commas.
              </span>
            </div>

            {/* Image Uploader */}
            <ImageUploader
              label="Cover Image"
              initialImageUrl={coverImage}
              onUploadSuccess={setCoverImage}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
