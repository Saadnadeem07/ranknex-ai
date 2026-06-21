"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Search, ExternalLink, Loader2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { CaseStudy } from "@/types";

interface CaseStudiesListProps {
  initialStudies: CaseStudy[];
}

export default function CaseStudiesList({ initialStudies }: CaseStudiesListProps) {
  const [studies, setStudies] = useState<CaseStudy[]>(initialStudies);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study? This action cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStudies(studies.filter((s) => s.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete case study.");
      }
    } catch {
      alert("Network error. Failed to delete case study.");
    } finally {
      setDeletingId(null);
    }
  };

  const industries = ["all", ...Array.from(new Set(studies.map((s) => s.clientIndustry)))];

  const filteredStudies = studies.filter((study) => {
    const matchesSearch = study.title.toLowerCase().includes(search.toLowerCase()) ||
      study.challenge.toLowerCase().includes(search.toLowerCase());
    
    const matchesIndustry = industryFilter === "all" || study.clientIndustry === industryFilter;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Manage Case Studies</h1>
          <p className="text-slate-400 text-sm mt-1">Manage, showcase, and publish customer success metrics.</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn-primary py-2.5 px-5 text-sm inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Case Study</span>
        </Link>
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-navy-900 border border-white/5 p-4 rounded-xl">
        {/* Search */}
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search case studies..."
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Industry filter */}
        <div className="sm:col-span-4">
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Industries</option>
            {industries.filter(ind => ind !== "all").map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card bg-navy-900 border border-white/5 rounded-2xl overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Case Study</th>
                <th className="py-4 px-6">Industry</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-300">
              {filteredStudies.length > 0 ? (
                filteredStudies.map((study) => (
                  <tr key={study.id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Title */}
                    <td className="py-4 px-6 max-w-xs sm:max-w-sm lg:max-w-md">
                      <div className="font-semibold text-white line-clamp-1">{study.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{study.metrics}</div>
                    </td>

                    {/* Industry */}
                    <td className="py-4 px-6">{study.clientIndustry}</td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          study.published
                            ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                            : "bg-slate-500/10 text-slate-400 border border-white/10"
                        }`}
                      >
                        {study.published ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="py-4 px-6">
                      {study.featured ? (
                        <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">Standard</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      {study.published && (
                        <Link
                          href="/case-studies"
                          className="inline-flex p-2 text-slate-400 hover:text-teal-400 bg-white/5 hover:bg-teal-500/10 border border-white/5 rounded-lg transition-all"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/case-studies/${study.id}/edit`}
                        className="inline-flex p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all"
                        title="Edit Case Study"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(study.id)}
                        disabled={deletingId === study.id}
                        className="inline-flex p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-lg transition-all cursor-pointer disabled:opacity-40"
                        title="Delete Case Study"
                      >
                        {deletingId === study.id ? (
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
                    No case studies match your filter criteria.
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
