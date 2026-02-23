'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bookmark, TrendingUp, Users, LayoutGrid, Info, Settings, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: Bookmark, href: '/bookmarks', label: 'Bookmarks' },
  { icon: TrendingUp, href: '/trending', label: 'Trending' },
  { icon: Users, href: '/authors', label: 'Authors' },
  { icon: LayoutGrid, href: '/genres', label: 'Genres' },
  { icon: Info, href: '/about', label: 'About' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 flex-shrink-0 border-r border-white/10 bg-[#0a0a0a] flex flex-col items-center py-4 h-screen sticky top-0">
      <div className="mb-8">
        <Flame className="w-8 h-8 text-purple-500" />
      </div>
      
      <nav className="flex-1 flex flex-col gap-4 w-full items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "p-3 rounded-xl transition-colors hover:bg-white/10",
                isActive ? "text-white bg-white/10" : "text-zinc-500"
              )}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 w-full items-center">
        <Link
          href="/settings"
          className="p-3 rounded-xl transition-colors hover:bg-white/10 text-zinc-500"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </aside>
  );
}
