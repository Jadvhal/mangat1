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
        <h1 className="text-4xl font-bold dark:text-white text-black">{manga.name}</h1>
        <div className="flex gap-2">
          <div className="bg-[#2b2d42] text-white px-2 py-1 rounded text-xs font-bold shadow-sm">A</div>
          <div className="bg-[#3f51b5] text-white px-2 py-1 rounded text-xs font-bold shadow-sm">MAL</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Cover */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden border dark:border-white/10 border-black/10 shadow-2xl">
            <Image src={manga.imageUrl} alt={manga.name} fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Middle: Details & Actions */}
        <div className="flex-1 flex flex-col min-w-[300px]">
          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-6">
            <div>
              <div className="dark:text-zinc-500 text-zinc-500 mb-2 text-sm font-bold">Author:</div>
              <Link href={`/author/${manga.author.toLowerCase().replace(/ /g, '-')}`} className="dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 px-3 py-1.5 rounded-full text-sm inline-block transition-colors dark:text-white text-black">
                {manga.author}
              </Link>
            </div>
            <div>
              <div className="dark:text-zinc-500 text-zinc-500 mb-2 text-sm font-bold">Status:</div>
              <div className="bg-purple-500/20 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-full text-sm inline-block capitalize">
                {manga.status}
              </div>
            </div>
            <div>
              <div className="dark:text-zinc-500 text-zinc-500 mb-2 text-sm font-bold">Updated:</div>
              <div className="dark:bg-white/10 bg-black/5 px-3 py-1.5 rounded-full text-sm inline-block dark:text-white text-black">
                {manga.updated}
              </div>
            </div>
            <div>
              <div className="dark:text-zinc-500 text-zinc-500 mb-2 text-sm font-bold">Views:</div>
              <div className="bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm inline-block">
                {manga.view}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="dark:text-zinc-500 text-zinc-500 mb-2 text-sm font-bold">Genres:</div>
            <div className="flex flex-wrap gap-2">
              {manga.genres.map(genre => (
                <Link href={`/genre/${genre.toLowerCase()}`} key={genre} className="dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 px-3 py-1.5 rounded-full text-xs font-medium dark:text-zinc-300 text-zinc-700 transition-colors">
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 rounded-xl p-8 mb-6 flex-1 flex flex-col items-center justify-center min-h-[160px] shadow-sm">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-8 h-8 dark:text-zinc-700 text-zinc-300" />
              ))}
            </div>
            <div className="dark:text-zinc-500 text-zinc-500 text-sm font-medium">0.0 / 5</div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <Bookmark className="w-5 h-5" />
                Bookmark
              </button>
              <button className="flex-1 dark:bg-white bg-black dark:text-black text-white dark:hover:bg-zinc-200 hover:bg-zinc-800 py-3 rounded-xl font-medium transition-colors">
                Continue Reading
              </button>
            </div>
            <div className="flex justify-between items-center dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 rounded-lg px-4 py-2 text-sm dark:text-zinc-400 text-zinc-600 cursor-pointer dark:hover:bg-white/5 hover:bg-black/5 transition-colors shadow-sm">
              <ArrowUpDown className="w-4 h-4" />
              <span>Select list</span>
            </div>
          </div>
        </div>

        {/* Right: Synopsis */}
        <div className="w-full lg:w-[400px] xl:w-[500px] flex-shrink-0">
          <div className="dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 rounded-xl p-6 h-full shadow-sm">
            <h3 className="text-xl font-bold mb-4 dark:text-white text-black">Synopsis</h3>
            <div className="dark:text-zinc-300 text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">
              {manga.description}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Chapters */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6 border-b dark:border-white/10 border-black/10 pb-4">
          <div className="flex gap-6 items-baseline">
            <h2 className="text-2xl font-bold dark:text-white text-black">Chapters</h2>
            <h2 className="text-xl font-bold dark:text-zinc-500 text-zinc-500 dark:hover:text-zinc-300 hover:text-zinc-700 cursor-pointer transition-colors">Recommendations</h2>
          </div>
          <div className="flex gap-2">
            <button className="dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10 dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Find Latest Read
            </button>
            <button className="dark:bg-white bg-black dark:hover:bg-zinc-200 hover:bg-zinc-800 dark:text-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort Ascending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {manga.chapterList.map(chapter => (
            <Link href={`/manga/${id}/chapter/${chapter.id}`} key={chapter.id} className="dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 dark:hover:border-white/20 hover:border-black/20 rounded-xl p-5 transition-colors group shadow-sm">
              <div className="font-bold text-lg mb-3 group-hover:text-purple-500 transition-colors line-clamp-1 dark:text-white text-black">{chapter.name}</div>
              <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-1">Views: {chapter.view}</div>
              <div className="text-sm dark:text-zinc-500 text-zinc-500">Released: {chapter.createdAt}</div>
            </Link>
          ))}
          {manga.chapterList.length === 0 && (
            <div className="col-span-full text-center py-12 dark:text-zinc-500 text-zinc-500">
              No chapters available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
