'use client';

import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Topbar() {
  const pathname = usePathname();
  
  return (
    <header className="h-14 bg-[#0a0a0a] flex items-center justify-end px-6 sticky top-0 z-10">
      <div className="relative w-96">
        <input
          type="text"
          placeholder="Search manga..."
          className="w-full bg-[#141414] border border-white/5 rounded-lg pl-4 pr-12 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none gap-1">
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">ctrl</kbd>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">k</kbd>
        </div>
      </div>
    </header>
  );
}
