'use client';

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; slug: string; _count?: { posts: number } }>;
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
            : 'border border-white/10 bg-navy-800/50 text-slate-300 hover:border-teal-500/30 hover:text-white'
        }`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
              : 'border border-white/10 bg-navy-800/50 text-slate-300 hover:border-teal-500/30 hover:text-white'
          }`}
        >
          {category.name}
          {category._count && (
            <span className="ml-1.5 text-xs opacity-70">
              ({category._count.posts})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
