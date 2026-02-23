'use client';

import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Topbar() {
  const pathname = usePathname();
  
  let breadcrumb = <span>Manga</span>;
  
  if (pathname.startsWith('/manga/')) {
    const id = pathname.split('/')[2];
    // In a real app, we would fetch the manga title here.
    // For now, we just format the ID.
    const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    breadcrumb = (
      <>
        <Link href="/" className="hover:text-white transition-colors">Manga</Link>
        <span className="text-zinc-600">&gt;</span>
        <span className="text-white">{title}</span>
      </>
    );
  } else if (pathname.startsWith('/author/')) {
    const id = pathname.split('/')[2];
    const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    breadcrumb = (
      <>
        <Link href="/authors" className="hover:text-white transition-colors">Author</Link>
        <span className="text-zinc-600">&gt;</span>
        <span className="text-white">{title}</span>
      </>
    );
  } else if (pathname.startsWith('/genre/')) {
    const id = pathname.split('/')[2];
    const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    breadcrumb = (
      <>
        <Link href="/genres" className="hover:text-white transition-colors">Genre</Link>
        <span className="text-zinc-600">&gt;</span>
        <span className="text-white">{title}</span>
      </>
    );
  } else if (pathname === '/bookmarks') {
    breadcrumb = <span className="text-white">Bookmarks</span>;
  }

  return (
    <header className="h-14 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
        <div className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">335</div>
        {breadcrumb}
      </div>

      <div className="relative w-96">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-zinc-500" />
        </div>
        <input
          type="text"
          placeholder="Search manga..."
          className="w-full bg-[#141414] border border-white/10 rounded-lg pl-10 pr-12 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none gap-1">
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">ctrl</kbd>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">k</kbd>
        </div>
      </div>
    </header>
  );
}
