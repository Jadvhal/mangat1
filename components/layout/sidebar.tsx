'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bookmark, TrendingUp, Search, Users, Drama, Mountain, OctagonAlert, Settings, User, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';

const navItems = [
  { icon: Home, href: '/', label: 'Home' },
  { icon: Bookmark, href: '/bookmarks', label: 'Bookmarks', shortcut: ['ctrl', 'shift', 'b'] },
  { icon: TrendingUp, href: '/popular', label: 'Popular' },
  { icon: Search, href: '/search', label: 'Search' },
];

const categoryItems = [
  { icon: Users, href: '/demographics', label: 'Demographics' },
  { icon: Drama, href: '/genres', label: 'Genres' },
  { icon: Mountain, href: '/themes', label: 'Themes' },
  { icon: OctagonAlert, href: '/mature', label: 'Mature' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <aside className={cn(
      "flex-shrink-0 border-r border-white/5 bg-[#0a0a0a] flex flex-col h-screen sticky top-0 transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className={cn("py-4 flex items-center h-14", isCollapsed ? "justify-center px-0" : "px-5 gap-3")}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
        {!isCollapsed && <span className="font-medium text-zinc-300">Manga</span>}
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-6 overflow-x-hidden">
        <nav className="flex flex-col px-3 gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg transition-colors text-sm font-medium group",
                  isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-3 py-2",
                  isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    {item.shortcut && (
                      <div className="flex items-center gap-1">
                        {item.shortcut.map(key => (
                          <kbd key={key} className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">{key}</kbd>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="h-px bg-white/5 mx-6 flex-shrink-0" />

        <nav className="flex flex-col px-3 gap-0.5">
          {categoryItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg transition-colors text-sm font-medium group",
                  isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-3 py-2",
                  isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto py-4 px-3 flex flex-col gap-0.5 border-t border-white/5 overflow-x-hidden">
        <Link
          href="/settings"
          className={cn(
            "flex items-center rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 group",
            isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-3 py-2"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 whitespace-nowrap">Settings</span>
              <div className="flex items-center gap-1">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">ctrl</kbd>
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">,</kbd>
              </div>
            </>
          )}
        </Link>
        <Link
          href="/login"
          className={cn(
            "flex items-center rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 group",
            isCollapsed ? "justify-center py-3 px-0" : "gap-3 px-3 py-2"
          )}
          title={isCollapsed ? "Login" : undefined}
        >
          <User className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 whitespace-nowrap">Login</span>
              <div className="flex items-center gap-1">
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">ctrl</kbd>
                <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-zinc-400 font-mono">.</kbd>
              </div>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}
