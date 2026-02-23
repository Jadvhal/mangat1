import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  const [popularRes, latestRes] = await Promise.all([
    fetchMangaList({ type: 'topview', page: currentPage, limit: 2 }),
    fetchMangaList({ type: 'newest', limit: 12 })
  ]);

  const popular = popularRes.mangaList;
  const latest = latestRes.mangaList;

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Manga</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popular.map((manga, index) => (
            <div key={manga.id} className="group flex bg-[#141414] rounded-xl overflow-hidden border border-white/5 h-[400px] relative">
              <Link href={`/manga/${manga.id}`} className="w-[45%] relative flex-shrink-0">
                <Image src={manga.image} alt={manga.title} fill className="object-cover" referrerPolicy="no-referrer" />
              </Link>
              <div className="p-6 flex flex-col flex-1 relative">
                <Link href={`/manga/${manga.id}`} className="pb-3 border-b border-white/5">
                  <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors line-clamp-2">{manga.title}</h3>
                </Link>
                
                <div className="flex flex-col text-sm text-zinc-400">
                  <div className="py-3 border-b border-white/5">
                    <div className="text-xs text-zinc-500 mb-1">Author</div>
                    <div className="text-white font-medium">{manga.author}</div>
                  </div>
                  <div className="py-3 border-b border-white/5">
                    <div className="text-xs text-zinc-500 mb-1">Status</div>
                    <div className="text-white font-medium capitalize">{manga.status}</div>
                  </div>
                  <div className="py-3 border-b border-white/5">
                    <div className="text-xs text-zinc-500 mb-1">Type</div>
                    <div className="text-white font-medium capitalize">{manga.type}</div>
                  </div>
                </div>

                <div className="pt-3 mt-auto">
                  <div className="text-xs text-zinc-500 mb-2">Genres</div>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres?.slice(0, 6).map(genre => (
                      <span key={genre} className="bg-white/10 px-2.5 py-1 rounded-full text-xs text-zinc-300 font-medium">
                        {genre}
                      </span>
                    ))}
                    {manga.genres && manga.genres.length > 6 && (
                      <span className="bg-white/10 px-2.5 py-1 rounded-full text-xs text-zinc-300 font-medium">
                        +{manga.genres.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pagination inside the second card */}
                {index === 1 && (
                  <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <div className="text-sm text-zinc-500">{currentPage} / {popularRes.metaData.totalPages}</div>
                    <div className="flex gap-2">
                      {currentPage > 1 ? (
                        <Link href={`/?page=${currentPage - 1}`} className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-zinc-200 transition-colors">
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button disabled className="w-8 h-8 flex items-center justify-center bg-zinc-800 text-zinc-500 rounded cursor-not-allowed">
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      )}
                      {currentPage < popularRes.metaData.totalPages ? (
                        <Link href={`/?page=${currentPage + 1}`} className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-zinc-200 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <button disabled className="w-8 h-8 flex items-center justify-center bg-zinc-800 text-zinc-500 rounded cursor-not-allowed">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {latest.slice(0, 6).map((manga) => (
            <Link href={`/manga/${manga.id}`} key={`recent-${manga.id}`} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
              <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {latest.map((manga) => (
            <Link href={`/manga/${manga.id}`} key={manga.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
              <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-black text-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">2</button>
            <button className="w-12 h-8 flex items-center justify-center rounded border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">450</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/10 hover:bg-white/5 transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
        <div>
          © 2026 Akari | v2.0.0 | AGPL-3.0.
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/github" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="/issues" className="hover:text-white transition-colors">Report issues</Link>
        </div>
      </footer>
    </div>
  );
}
