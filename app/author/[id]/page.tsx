import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMangaByAuthor } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authorName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const mangaList = getMangaByAuthor(authorName);

  if (mangaList.length === 0) {
    // We'll still show the page even if no manga is found, or we could 404.
    // Let's just show an empty state.
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{authorName}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mangaList.map((manga) => (
          <Link href={`/manga/${manga.id}`} key={manga.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
            <Image src={manga.cover} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <h3 className="font-bold text-sm line-clamp-2">{manga.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {mangaList.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-zinc-400 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="bg-white text-black w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold">
            1
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-zinc-400 transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
