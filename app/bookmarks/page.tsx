import Image from 'next/image';
import Link from 'next/link';
import { getBookmarks } from '@/lib/mock-data';
import { Search, X, Check, ChevronDown } from 'lucide-react';

export default function Bookmarks() {
  const bookmarks = getBookmarks();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button className="dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Export Bookmarks
        </button>
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 dark:text-zinc-500 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search bookmarks..."
            className="w-full dark:bg-[#141414] bg-white border dark:border-white/10 border-black/10 rounded-lg pl-10 pr-4 py-2 text-sm dark:text-white text-black dark:placeholder:text-zinc-500 placeholder:text-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookmarks.map((manga) => (
          <div key={manga.id} className="dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 rounded-xl p-4 flex gap-4 relative group shadow-sm">
            <Link href={`/manga/${manga.id}`} className="w-24 h-36 relative flex-shrink-0 rounded-lg overflow-hidden">
              <Image src={manga.cover} alt={manga.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </Link>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <Link href={`/manga/${manga.id}`} className="text-lg font-bold hover:text-purple-400 transition-colors line-clamp-1 dark:text-white text-black">
                  {manga.title}
                </Link>
                <div className="text-sm dark:text-zinc-400 text-zinc-600 mt-1">
                  Latest: Ch. {manga.latestChapter}
                </div>
                <div className="text-sm dark:text-zinc-500 text-zinc-500">
                  Released: {manga.releasedAgo}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 dark:text-white text-black text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  {manga.unreadCount === 0 ? 'Read Latest' : 'Continue Reading'}
                  <span className="dark:text-zinc-400 text-zinc-600 text-xs">• Ch. {manga.latestChapter - (manga.unreadCount || 0)}</span>
                </button>
                {manga.unreadCount !== undefined && manga.unreadCount > 0 && (
                  <div className="dark:bg-white bg-black dark:text-black text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                    {manga.unreadCount} new
                  </div>
                )}
                <button className="p-2 dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 rounded-lg transition-colors dark:text-white text-black">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 bg-red-500/20 text-red-600 dark:text-red-500 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-purple-500/20 text-purple-600 dark:text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
