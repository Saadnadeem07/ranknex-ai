"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Loader2 } from "lucide-react";
import type { BlogPost, BlogCategory } from "@/types";

interface BlogContentProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  initialTotalPages: number;
}

export default function BlogContent({
  initialPosts,
  categories,
  initialTotalPages,
}: BlogContentProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Avoid double fetching on initial load
    if (search === "" && category === "all" && page === 1) {
      setPosts(initialPosts);
      setTotalPages(initialTotalPages);
      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: "9",
          search,
          category,
        });
        const res = await fetch(`/api/blogs?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [search, category, page, initialPosts, initialTotalPages]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleCategoryChange = (slug: string) => {
    setCategory(slug);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      {/* Decorative gradients */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-10" />
      <div className="orb orb-cyan w-80 h-80 bottom-12 -left-36 opacity-8" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          tag="Insights & Trends"
          title={<>RankNex AI <span className="gradient-text">Knowledge Base</span></>}
          subtitle="Explore the latest articles, growth hacks, and insights in SEO, AI automation, and digital marketing compiled by our specialist team."
        />

        {/* Filters and Search */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12 bg-navy-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <CategoryFilter
              categories={categories}
              activeCategory={category}
              onCategoryChange={handleCategoryChange}
            />
            <BlogSearch onSearch={handleSearch} />
          </div>
        </ScrollReveal>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
          </div>
        ) : posts.length > 0 ? (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <ScrollReveal key={post.id} delay={idx * 0.05} direction="up">
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-navy-900/30 rounded-2xl border border-white/5">
            <h4 className="text-xl font-semibold text-white mb-2">No Articles Found</h4>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We couldn&apos;t find any blog posts matching your search query or selected category. Try checking your spelling or selecting another category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <ScrollReveal delay={0.1} className="mt-16 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-navy-800 border border-white/5 text-slate-300 hover:text-white hover:border-teal-500 disabled:opacity-40 disabled:hover:border-white/5 cursor-pointer"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                onClick={() => handlePageChange(pNum)}
                className={`w-10 h-10 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  page === pNum
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                    : "bg-navy-800 border border-white/5 text-slate-300 hover:text-white hover:border-teal-500/50"
                }`}
              >
                {pNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-navy-800 border border-white/5 text-slate-300 hover:text-white hover:border-teal-500 disabled:opacity-40 disabled:hover:border-white/5 cursor-pointer"
            >
              Next
            </button>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
}
