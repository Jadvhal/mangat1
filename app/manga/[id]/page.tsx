import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchMangaDetail } from '@/lib/api';
import { Bookmark, Star, ArrowUpDown } from 'lucide-react';

export default async function MangaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let manga;
  try {
    manga = await fetchMangaDetail(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold">{manga.name}</h1>
        <div className="flex gap-2">
          <div className="bg-[#2b2d42] text-white px-2 py-1 rounded text-xs font-bold">A</div>
          <div className="bg-[#3f51b5] text-white px-2 py-1 rounded text-xs font-bold">MAL</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Cover */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src={manga.imageUrl} alt={manga.name} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Middle: Details & Actions */}
        <div className="flex-1 flex flex-col min-w-[300px]">
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
            <div>
              <div className="text-zinc-500 mb-2 text-sm font-bold">Author:</div>
              <Link href={`/author/${manga.author.toLowerCase().replace(/ /g, '-')}`} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-sm inline-block transition-colors">
                {manga.author}
              </Link>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 text-sm font-bold">Status:</div>
              <div className="bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-full text-sm inline-block capitalize">
                {manga.status}
              </div>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 text-sm font-bold">Updated:</div>
              <div className="bg-white/10 px-3 py-1.5 rounded-full text-sm inline-block">
                {manga.updated}
              </div>
            </div>
            <div>
              <div className="text-zinc-500 mb-2 text-sm font-bold">Views:</div>
              <div className="bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-full text-sm inline-block">
                {manga.view}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-zinc-500 mb-2 text-sm font-bold">Genres:</div>
            <div className="flex flex-wrap gap-2">
              {manga.genres.map(genre => (
                <Link href={`/genre/${genre.toLowerCase()}`} key={genre} className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 transition-colors">
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-6 flex-1 flex flex-col items-center justify-center min-h-[160px]">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-8 h-8 text-zinc-700" />
              ))}
            </div>
            <div className="text-zinc-500 text-sm font-medium">0.0 / 5</div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <Bookmark className="w-5 h-5" />
                Bookmark
              </button>
              <button className="flex-1 bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-medium transition-colors">
                Continue Reading
              </button>
            </div>
            <div className="flex justify-between items-center bg-[#141414] border border-white/5 rounded-lg px-4 py-2 text-sm text-zinc-400 cursor-pointer hover:bg-white/5 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              <span>Select list</span>
            </div>
          </div>
        </div>

        {/* Right: Synopsis */}
        <div className="w-full lg:w-[400px] xl:w-[500px] flex-shrink-0">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6 h-full">
            <p className="text-zinc-300 text-sm leading-relaxed">
              {/* The API doesn't return a synopsis in the detail endpoint based on docs, so we'll leave this empty or add a placeholder */}
              No synopsis available.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: Chapters */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex gap-6 items-baseline">
            <h2 className="text-2xl font-bold text-white">Chapters</h2>
            <h2 className="text-xl font-bold text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">Recommendations</h2>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Find Latest Read
            </button>
            <button className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort Ascending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {manga.chapterList.map(chapter => (
            <Link href={`/manga/${id}/chapter/${chapter.id}`} key={chapter.id} className="bg-[#141414] border border-white/5 hover:border-white/20 rounded-xl p-5 transition-colors group">
              <div className="font-bold text-lg mb-3 group-hover:text-purple-400 transition-colors line-clamp-1">{chapter.name}</div>
              <div className="text-sm text-zinc-500 mb-1">Views: {chapter.view}</div>
              <div className="text-sm text-zinc-500">Released: {chapter.createdAt}</div>
            </Link>
          ))}
          {manga.chapterList.length === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-500">
              No chapters available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
