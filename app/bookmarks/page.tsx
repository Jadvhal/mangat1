import Image from 'next/image';
import Link from 'next/link';
import { getBookmarks } from '@/lib/mock-data';
import { Search, X, Check, ChevronDown } from 'lucide-react';

export default function Bookmarks() {
  const bookmarks = getBookmarks();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Export Bookmarks
        </button>
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search bookmarks..."
            className="w-full bg-[#141414] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookmarks.map((manga) => (
          <div key={manga.id} className="bg-[#141414] border border-white/5 rounded-xl p-4 flex gap-4 relative group">
            <Link href={`/manga/${manga.id}`} className="w-24 h-36 relative flex-shrink-0 rounded-lg overflow-hidden">
              <Image src={manga.cover} alt={manga.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </Link>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <Link href={`/manga/${manga.id}`} className="text-lg font-bold hover:text-purple-400 transition-colors line-clamp-1">
                  {manga.title}
                </Link>
                <div className="text-sm text-zinc-400 mt-1">
                  Latest: Ch. {manga.latestChapter}
                </div>
                <div className="text-sm text-zinc-500">
                  Released: {manga.releasedAgo}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  {manga.unreadCount === 0 ? 'Read Latest' : 'Continue Reading'}
                  <span className="text-zinc-400 text-xs">• Ch. {manga.latestChapter - (manga.unreadCount || 0)}</span>
                </button>
                {manga.unreadCount !== undefined && manga.unreadCount > 0 && (
                  <div className="bg-white text-black text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                    {manga.unreadCount} new
                  </div>
                )}
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-purple-500/20 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
