"use client";

import { FileText, CheckCircle2, Briefcase, Inbox } from "lucide-react";

interface DashboardStatsProps {
  totalBlogs: number;
  publishedBlogs: number;
  totalCaseStudies: number;
  unreadSubmissions: number;
}

export default function DashboardStats({
  totalBlogs,
  publishedBlogs,
  totalCaseStudies,
  unreadSubmissions,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Total Blog Posts",
      value: totalBlogs,
      icon: FileText,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Published Articles",
      value: publishedBlogs,
      icon: CheckCircle2,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      label: "Case Studies",
      value: totalCaseStudies,
      icon: Briefcase,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Unread Leads",
      value: unreadSubmissions,
      icon: Inbox,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="card bg-navy-900 border border-white/5 p-6 rounded-2xl flex items-center justify-between shadow-xl"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {stat.label}
              </span>
              <span className="text-3xl font-extrabold text-white font-heading block">
                {stat.value}
              </span>
            </div>
            <div className={`p-4 rounded-xl border ${stat.color} shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
