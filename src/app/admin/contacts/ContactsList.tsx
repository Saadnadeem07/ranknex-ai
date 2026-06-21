"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Loader2, 
  Eye, 
  X, 
  Inbox,
  ExternalLink,
  Copy,
  Check,
  ArrowLeft
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { ContactSubmission } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ContactsList() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [unreadFilter, setUnreadFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<ContactSubmission | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [copiedText, setCopiedText] = useState<"email" | "phone" | null>(null);

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const url = `/api/contacts?page=${currentPage}&limit=${limit}&unread=${unreadFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions);
        setTotalSubmissions(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, unreadFilter]);

  // Mark submission as read/unread
  const handleToggleRead = async (submission: ContactSubmission, forceReadState?: boolean) => {
    const nextReadState = forceReadState !== undefined ? forceReadState : !submission.read;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submission.id, read: nextReadState }),
      });
      if (res.ok) {
        // Update local state
        setSubmissions(prev =>
          prev.map(s => (s.id === submission.id ? { ...s, read: nextReadState } : s))
        );
        if (activeSubmission && activeSubmission.id === submission.id) {
          setActiveSubmission({ ...activeSubmission, read: nextReadState });
        }
        // Adjust unread counter
        if (nextReadState && !submission.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        } else if (!nextReadState && submission.read) {
          setUnreadCount(prev => prev + 1);
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Error updating submission status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Delete submission
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission? This action cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contacts?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (activeSubmission?.id === id) {
          setActiveSubmission(null);
        }
        // Refetch to fill the page if needed
        fetchSubmissions();
      } else {
        alert("Failed to delete submission.");
      }
    } catch (err) {
      console.error("Error deleting submission:", err);
      alert("Network error. Failed to delete submission.");
    } finally {
      setDeletingId(null);
    }
  };

  // View submission details (and mark read if unread)
  const handleViewDetails = (submission: ContactSubmission) => {
    setActiveSubmission(submission);
    if (!submission.read) {
      handleToggleRead(submission, true);
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Client-side filtering for service filter and search
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      (sub.company && sub.company.toLowerCase().includes(search.toLowerCase())) ||
      sub.message.toLowerCase().includes(search.toLowerCase());

    const matchesService = serviceFilter === "all" || sub.service.toLowerCase() === serviceFilter.toLowerCase();

    return matchesSearch && matchesService;
  });

  // Services list for dropdown filter
  const services = ["all", "SEO Optimization", "Social Media Marketing", "PPC Advertising", "Content Writing", "Web Designing", "Branding Solutions", "General Inquiry"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Client Submissions</h1>
          <p className="text-slate-400 text-sm mt-1">
            Review and follow up with leads, service requests, and general messages.
          </p>
        </div>
        
        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider animate-pulse">
            <Inbox className="w-3.5 h-3.5" />
            <span>{unreadCount} Unread Message{unreadCount > 1 ? "s" : ""}</span>
          </span>
        )}
      </div>

      {/* Filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-navy-900 border border-white/5 p-4 rounded-xl shadow-lg">
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company, message..."
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Service filter */}
        <div className="md:col-span-3">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-navy-950 border border-white/10 rounded-lg py-2 px-3 text-slate-300 text-sm focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="all">All Services</option>
            {services.filter(s => s !== "all").map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Unread button */}
        <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3">
          <button
            onClick={() => {
              setUnreadFilter(false);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              !unreadFilter
                ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                : "bg-transparent text-slate-400 border-white/5 hover:text-white"
            }`}
          >
            All Submissions
          </button>
          <button
            onClick={() => {
              setUnreadFilter(true);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              unreadFilter
                ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                : "bg-transparent text-slate-400 border-white/5 hover:text-white"
            }`}
          >
            Unread Only
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="card bg-navy-900 border border-white/5 rounded-2xl overflow-hidden !p-0 shadow-2xl relative">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            <span>Loading submissions...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Sender Details</th>
                  <th className="py-4 px-6">Service Requested</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub) => (
                    <tr 
                      key={sub.id} 
                      className={`hover:bg-white/[0.01] transition-all cursor-pointer ${
                        !sub.read ? "bg-teal-500/[0.02] border-l-2 border-l-teal-500" : ""
                      }`}
                      onClick={() => handleViewDetails(sub)}
                    >
                      {/* Name & Email & Company */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${!sub.read ? "text-white font-bold" : "text-slate-200"}`}>
                            {sub.name}
                          </span>
                          {!sub.read && (
                            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block animate-pulse" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <span>{sub.email}</span>
                          {sub.company && (
                            <>
                              <span className="hidden sm:inline text-slate-700">•</span>
                              <span className="italic flex items-center gap-1 text-[11px] text-slate-400">
                                <Building className="w-3 h-3" /> {sub.company}
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Service Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-navy-950 border border-white/10 text-slate-300">
                          {sub.service}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-slate-400">
                        {formatDate(sub.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleRead(sub);
                          }}
                          className="flex items-center gap-1.5 text-xs text-left cursor-pointer transition-colors"
                        >
                          {sub.read ? (
                            <span className="text-slate-500 hover:text-teal-400 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-slate-600" />
                              <span>Read</span>
                            </span>
                          ) : (
                            <span className="text-teal-400 font-bold hover:text-slate-400 flex items-center gap-1">
                              <Circle className="w-4 h-4 fill-teal-500/20" />
                              <span>Unread</span>
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleViewDetails(sub)}
                          className="inline-flex p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          disabled={deletingId === sub.id}
                          className="inline-flex p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-lg transition-all cursor-pointer disabled:opacity-40"
                          title="Delete Submission"
                        >
                          {deletingId === sub.id ? (
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
                    <td colSpan={5} className="py-16 text-center text-slate-500">
                      No submissions found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.01]">
            <span className="text-xs text-slate-500">
              Showing page {currentPage} of {totalPages} ({totalSubmissions} submissions)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1.5 text-slate-400 hover:text-white border border-white/10 rounded-lg bg-navy-950 disabled:opacity-40 disabled:hover:text-slate-400 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 text-slate-400 hover:text-white border border-white/10 rounded-lg bg-navy-950 disabled:opacity-40 disabled:hover:text-slate-400 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Side-Drawer / Modal Overlay */}
      <AnimatePresence>
        {activeSubmission && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubmission(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body (Slide from Right) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-navy-900 border-l border-white/10 shadow-2xl h-full flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveSubmission(null)}
                    className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all cursor-pointer sm:hidden"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-white">Submission Details</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Received on {formatDate(activeSubmission.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSubmission(null)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all cursor-pointer hidden sm:block"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                {/* Status indicator banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-navy-950 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">Status:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        activeSubmission.read
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-teal-500/10 text-teal-400 border border-teal-500/20 animate-pulse"
                      }`}
                    >
                      {activeSubmission.read ? "Read" : "Unread"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(activeSubmission)}
                      disabled={isUpdatingStatus}
                      className="px-3 py-1 text-xs font-semibold rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                    >
                      {isUpdatingStatus ? "Updating..." : activeSubmission.read ? "Mark as Unread" : "Mark as Read"}
                    </button>
                  </div>
                </div>

                {/* Sender card */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Sender Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="bg-navy-950 p-4 rounded-xl border border-white/5 space-y-1">
                      <span className="text-xs text-slate-500 block">Name</span>
                      <span className="text-white font-medium">{activeSubmission.name}</span>
                    </div>

                    {/* Service */}
                    <div className="bg-navy-950 p-4 rounded-xl border border-white/5 space-y-1">
                      <span className="text-xs text-slate-500 block">Service Requested</span>
                      <span className="text-teal-400 font-semibold">{activeSubmission.service}</span>
                    </div>

                    {/* Email */}
                    <div className="bg-navy-950 p-4 rounded-xl border border-white/5 space-y-1 relative group">
                      <span className="text-xs text-slate-500 block">Email Address</span>
                      <div className="flex items-center justify-between gap-2">
                        <a href={`mailto:${activeSubmission.email}`} className="text-white hover:text-teal-400 font-medium truncate flex items-center gap-1.5 group-hover:underline">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{activeSubmission.email}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                        </a>
                        <button
                          onClick={() => copyToClipboard(activeSubmission.email, "email")}
                          className="text-slate-500 hover:text-white p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="Copy Email"
                        >
                          {copiedText === "email" ? (
                            <Check className="w-3.5 h-3.5 text-teal-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="bg-navy-950 p-4 rounded-xl border border-white/5 space-y-1 relative group">
                      <span className="text-xs text-slate-500 block">Phone Number</span>
                      <div className="flex items-center justify-between gap-2">
                        {activeSubmission.phone ? (
                          <>
                            <a href={`tel:${activeSubmission.phone}`} className="text-white hover:text-teal-400 font-medium truncate flex items-center gap-1.5 group-hover:underline">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{activeSubmission.phone}</span>
                              <ExternalLink className="w-3 h-3 text-slate-500 inline" />
                            </a>
                            <button
                              onClick={() => copyToClipboard(activeSubmission.phone!, "phone")}
                              className="text-slate-500 hover:text-white p-1 rounded hover:bg-white/5 transition-all cursor-pointer"
                              title="Copy Phone"
                            >
                              {copiedText === "phone" ? (
                                <Check className="w-3.5 h-3.5 text-teal-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </>
                        ) : (
                          <span className="text-slate-600 italic">Not Provided</span>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    {activeSubmission.company && (
                      <div className="bg-navy-950 p-4 rounded-xl border border-white/5 space-y-1 sm:col-span-2">
                        <span className="text-xs text-slate-500 block">Company Name</span>
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Building className="w-4 h-4 text-slate-400" />
                          <span>{activeSubmission.company}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Message Content</h3>
                  <div className="bg-navy-950 p-6 rounded-xl border border-white/5 text-slate-200 text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                    {activeSubmission.message}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 bg-navy-950 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(activeSubmission.id)}
                  disabled={deletingId === activeSubmission.id}
                  className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  {deletingId === activeSubmission.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>Delete Submission</span>
                </button>

                <button
                  onClick={() => setActiveSubmission(null)}
                  className="btn-secondary py-2 px-5 text-xs cursor-pointer font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
