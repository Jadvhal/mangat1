import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { Pagination } from '@/components/pagination';
import { SearchFilter } from '@/components/search-filter';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  const sort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : 'default';
  const origin = typeof resolvedSearchParams.origin === 'string' ? resolvedSearchParams.origin : undefined;
  const demographic = typeof resolvedSearchParams.demographic === 'string' ? resolvedSearchParams.demographic : undefined;
  const genre = typeof resolvedSearchParams.genre === 'string' ? resolvedSearchParams.genre : undefined;
  const theme = typeof resolvedSearchParams.theme === 'string' ? resolvedSearchParams.theme : undefined;
  const mature = typeof resolvedSearchParams.mature === 'string' ? resolvedSearchParams.mature : undefined;

  const { mangaList, metaData } = await fetchMangaList({
    page: currentPage,
    limit: 36,
    title: query,
    sort,
    origin,
    demographic,
    genre,
    theme,
    mature
  });

  return (
    <div className="space-y-8 pb-12">
      <section className="space-y-6">
        <SearchFilter />
        
        {mangaList.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mangaList.map((manga) => (
                <Link href={`/manga/${manga.id}`} key={manga.id} className="group flex flex-col gap-2">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
                    <Image src={manga.image} alt={manga.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{manga.title}</h3>
                    <p className="text-xs text-zinc-500">{manga.chapter}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <Pagination currentPage={currentPage} totalPages={metaData.totalPages} />
          </>
        ) : (
          <div className="text-zinc-500 py-24 text-center flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-white mb-2">
              {query || origin || demographic || genre || theme || mature ? 'No results found.' : 'Enter a search term or select a genre to find manga'}
            </p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </section>
    </div>
  );
}
