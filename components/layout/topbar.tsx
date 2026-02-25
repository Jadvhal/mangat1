'use client';

import { Search, Sun, Moon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, Suspense, useEffect } from 'react';
import { useSidebar } from './sidebar-context';
import { useSettings } from '../settings-context';

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
        className="w-full dark:bg-[#141414] bg-white border dark:border-white/5 border-black/10 rounded-lg pl-4 pr-12 py-1.5 text-sm dark:text-white text-black dark:placeholder:text-zinc-500 placeholder:text-zinc-400 focus:outline-none dark:focus:border-white/20 focus:border-black/20 transition-colors"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none gap-1">
        <kbd className="dark:bg-white/10 bg-black/5 px-1.5 py-0.5 rounded text-[10px] dark:text-zinc-400 text-zinc-500 font-mono">ctrl</kbd>
        <kbd className="dark:bg-white/10 bg-black/5 px-1.5 py-0.5 rounded text-[10px] dark:text-zinc-400 text-zinc-500 font-mono">k</kbd>
      </div>
    </form>
  );
}

export function Topbar() {
  const { isCollapsed } = useSidebar();
  const { settings, updateSetting } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  const toggleTheme = () => {
    let currentTheme = settings.theme;
    if (currentTheme === 'System') {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
    }
    const newTheme = currentTheme === 'Dark' ? 'Light' : 'Dark';
    updateSetting('theme', newTheme);
  };

  const isDark = mounted && (settings.theme === 'Dark' || (settings.theme === 'System' && window.matchMedia('(prefers-color-scheme: dark)').matches));

  return (
    <header className="h-14 dark:bg-[#0a0a0a] bg-white border-b dark:border-white/5 border-black/5 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center">
        {isCollapsed && (
          <span className="font-medium dark:text-zinc-400 text-zinc-600 text-sm">Manga</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg dark:hover:bg-white/10 hover:bg-black/5 transition-colors dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <Suspense fallback={<div className="w-96 h-8 dark:bg-[#141414] bg-zinc-100 rounded-lg animate-pulse" />}>
          <SearchInput />
        </Suspense>
      </div>
    </header>
  );
}
