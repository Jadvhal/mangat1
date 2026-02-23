import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { PopularCarousel } from '@/components/popular-carousel';
import { Pagination } from '@/components/pagination';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  const [popularRes, latestRes] = await Promise.all([
    fetchMangaList({ type: 'topview', limit: 24 }),
    fetchMangaList({ type: 'newest', page: currentPage, limit: 24 })
  ]);

  const popular = popularRes.mangaList;
  const latest = latestRes.mangaList;

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Manga</h2>
        <PopularCarousel mangaList={popular} />
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
        
        <Pagination currentPage={currentPage} totalPages={latestRes.metaData.totalPages} />
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
