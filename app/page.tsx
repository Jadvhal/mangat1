import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [popularRes, latestRes] = await Promise.all([
    fetchMangaList({ type: 'topview' }),
    fetchMangaList({ type: 'newest' })
  ]);

  const popular = popularRes.mangaList.slice(0, 2);
  const latest = latestRes.mangaList.slice(0, 12);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Manga</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popular.map((manga) => (
            <Link href={`/manga/${manga.id}`} key={manga.id} className="group flex bg-[#141414] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors h-80">
              <div className="w-[40%] relative flex-shrink-0">
                <Image src={manga.image} alt={manga.title} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-purple-400 transition-colors line-clamp-2">{manga.title}</h3>
                
                <div className="space-y-4 text-sm text-zinc-400 mb-6">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Latest Chapter</div>
                    <div className="text-white">{manga.chapter}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Views</div>
                    <div className="text-white">{manga.view}</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-sm text-zinc-400 line-clamp-3">{manga.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <div className="text-sm text-zinc-500 flex items-center mr-2">1 / {popularRes.metaData.totalPages}</div>
          <button className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {latest.map((manga) => (
            <Link href={`/manga/${manga.id}`} key={manga.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
              <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <h3 className="font-bold text-sm line-clamp-2">{manga.title}</h3>
                <p className="text-xs text-purple-400 mt-1">{manga.chapter}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
