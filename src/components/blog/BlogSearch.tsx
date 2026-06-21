'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function BlogSearch({ onSearch, initialQuery = '' }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(value);
        }, 400);
      };
    })(),
    [onSearch]
  );

  const handleChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search articles..."
        className="w-full rounded-xl border border-white/10 bg-navy-800/60 py-3 pl-11 pr-10 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition-all focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
