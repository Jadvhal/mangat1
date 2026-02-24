import Image from 'next/image';
import Link from 'next/link';
import { getMangaByGenre } from '@/lib/mock-data';
import { ChevronDown } from 'lucide-react';

export default async function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const genreName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const mangaList = getMangaByGenre(genreName);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white text-black">{genreName}</h1>
        <button className="flex items-center gap-2 dark:bg-[#141414] bg-white border dark:border-white/10 border-black/10 dark:hover:border-white/20 hover:border-black/20 px-4 py-2 rounded-lg text-sm dark:text-zinc-300 text-zinc-700 transition-colors shadow-sm">
          Most Popular
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {mangaList.map((manga) => (
          <Link href={`/manga/${manga.id}`} key={manga.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border dark:border-white/5 border-black/5 dark:hover:border-white/20 hover:border-black/20 transition-colors shadow-sm">
            <Image src={manga.cover} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <h3 className="font-bold text-sm line-clamp-2 text-white">{manga.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{manga.author}</p>
            </div>
          </Link>
        ))}
        {mangaList.length === 0 && (
          <div className="col-span-full text-center py-12 dark:text-zinc-500 text-zinc-500">
            No manga found for this genre.
          </div>
        )}
      </div>
    </div>
  );
}
