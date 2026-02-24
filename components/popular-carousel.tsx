'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ApiMangaItem } from '@/lib/api';

export function PopularCarousel({ mangaList }: { mangaList: ApiMangaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(mangaList.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentManga = mangaList.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  if (mangaList.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {currentManga.map((manga, index) => (
        <div key={manga.id} className="group flex dark:bg-[#141414] bg-white rounded-xl overflow-hidden border dark:border-white/5 border-black/5 h-[400px] relative shadow-sm">
          <Link href={`/manga/${manga.id}`} className="w-[45%] relative flex-shrink-0">
            <Image src={manga.image} alt={manga.title} fill className="object-cover" referrerPolicy="no-referrer" />
          </Link>
          <div className="p-6 flex flex-col flex-1 relative">
            <Link href={`/manga/${manga.id}`} className="pb-3 border-b dark:border-white/5 border-black/5">
              <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors line-clamp-2 dark:text-white text-black">{manga.title}</h3>
            </Link>
            
            <div className="flex flex-col text-sm dark:text-zinc-400 text-zinc-600">
              <div className="py-3 border-b dark:border-white/5 border-black/5">
                <div className="text-xs dark:text-zinc-500 text-zinc-500 mb-1">Author</div>
                <div className="dark:text-white text-black font-medium">{manga.author}</div>
              </div>
              <div className="py-3 border-b dark:border-white/5 border-black/5">
                <div className="text-xs dark:text-zinc-500 text-zinc-500 mb-1">Status</div>
                <div className="dark:text-white text-black font-medium capitalize">{manga.status}</div>
              </div>
              <div className="py-3 border-b dark:border-white/5 border-black/5">
                <div className="text-xs dark:text-zinc-500 text-zinc-500 mb-1">Type</div>
                <div className="dark:text-white text-black font-medium capitalize">{manga.type}</div>
              </div>
            </div>

            <div className="pt-3 mt-auto">
              <div className="text-xs dark:text-zinc-500 text-zinc-500 mb-2">Genres</div>
              <div className="flex flex-wrap gap-2">
                {manga.genres?.slice(0, 6).map(genre => (
                  <span key={genre} className="dark:bg-white/10 bg-black/5 px-2.5 py-1 rounded-full text-xs dark:text-zinc-300 text-zinc-700 font-medium">
                    {genre}
                  </span>
                ))}
                {manga.genres && manga.genres.length > 6 && (
                  <span className="dark:bg-white/10 bg-black/5 px-2.5 py-1 rounded-full text-xs dark:text-zinc-300 text-zinc-700 font-medium">
                    +{manga.genres.length - 6}
                  </span>
                )}
              </div>
            </div>

            {/* Pagination inside the second card (or first if only 1 item) */}
            {(index === 1 || currentManga.length === 1) && (
              <div className="absolute bottom-6 right-6 flex items-center gap-3">
                <div className="text-sm dark:text-zinc-500 text-zinc-500">{currentIndex + 1} / {totalPages}</div>
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="w-8 h-8 flex items-center justify-center dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black dark:hover:bg-zinc-700 hover:bg-zinc-300 rounded transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={handleNext} className="w-8 h-8 flex items-center justify-center dark:bg-white bg-black dark:text-black text-white dark:hover:bg-zinc-200 hover:bg-zinc-800 rounded transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
