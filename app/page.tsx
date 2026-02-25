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
    fetchMangaList({ type: 'newest', page: currentPage, limit: 36 })
  ]);

  const popular = popularRes.mangaList;
  const latest = latestRes.mangaList;

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-black">Popular Manga</h2>
        <PopularCarousel mangaList={popular} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-black">All Manga List</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {latest.map((manga) => (
            <Link href={`/manga/${manga.id}`} key={manga.id} className="group flex flex-col gap-2">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden border dark:border-white/5 border-black/5 dark:hover:border-white/20 hover:border-black/20 transition-colors">
                <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="font-medium text-sm dark:text-white text-black line-clamp-1 group-hover:text-purple-400 transition-colors">{manga.title}</h3>
                <p className="text-xs dark:text-zinc-500 text-zinc-500">{manga.chapter}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <Pagination currentPage={currentPage} totalPages={latestRes.metaData.totalPages} />
      </section>

      <footer className="mt-12 pt-6 border-t dark:border-white/10 border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm dark:text-zinc-500 text-zinc-500">
        <div>
          © 2026 Akari | v2.0.0 | AGPL-3.0.
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="dark:hover:text-white hover:text-black transition-colors">About</Link>
          <Link href="/privacy" className="dark:hover:text-white hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="dark:hover:text-white hover:text-black transition-colors">Terms</Link>
          <Link href="/github" className="dark:hover:text-white hover:text-black transition-colors">GitHub</Link>
          <Link href="/issues" className="dark:hover:text-white hover:text-black transition-colors">Report issues</Link>
        </div>
      </footer>
    </div>
  );
}
