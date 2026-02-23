'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bookmark, TrendingUp, Search, Users, LayoutGrid, Mountain, AlertCircle, Settings, UserCircle, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: Bookmark, href: '/bookmarks', label: 'Bookmarks', shortcut: ['ctrl', 'shift', 'b'] },
  { icon: TrendingUp, href: '/popular', label: 'Popular' },
  { icon: Search, href: '/search', label: 'Search' },
];

const categoryItems = [
  { icon: Users, href: '/demographics', label: 'Demographics' },
  { icon: LayoutGrid, href: '/genres', label: 'Genres' },
  { icon: Mountain, href: '/themes', label: 'Themes' },
  { icon: AlertCircle, href: '/mature', label: 'Mature' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#0a0a0a] flex flex-col h-screen sticky top-0">
      <div className="p-4 flex items-center gap-3 border-b border-white/10 h-14">
        <div className="bg-purple-600 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-xs">
          1
        </div>
        <span className="font-semibold text-zinc-300">Manga</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <div className="flex items-center gap-1">
                    {item.shortcut.map(key => (
                      <kbd key={key} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 font-mono">{key}</kbd>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <nav className="flex flex-col gap-1">
          {categoryItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                  isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-3 flex flex-col gap-1 border-t border-white/10">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <Settings className="w-4 h-4" />
          <span className="flex-1">Settings</span>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 font-mono">ctrl ,</kbd>
        </Link>
        <Link
          href="/account"
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5"
        >
          <UserCircle className="w-4 h-4 text-purple-500" />
          <span className="flex-1">Account</span>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 font-mono">ctrl .</kbd>
        </Link>
      </div>
    </aside>
  );
}
