'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, Suspense } from 'react';

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-96">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search manga..."
        className="w-full bg-[#141414] border border-white/5 rounded-lg pl-4 pr-12 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none gap-1">
        <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">ctrl</kbd>
        <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">k</kbd>
      </div>
    </form>
  );
}

export function Topbar() {
  return (
    <header className="h-14 bg-[#0a0a0a] flex items-center justify-end px-6 sticky top-0 z-10">
      <Suspense fallback={<div className="w-96 h-8 bg-[#141414] rounded-lg animate-pulse" />}>
        <SearchInput />
      </Suspense>
    </header>
  );
}
