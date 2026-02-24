import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { Pagination } from '@/components/pagination';

export const dynamic = 'force-dynamic';

export default async function DemographicsPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ demographic: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const demographic = resolvedParams.demographic;
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  const { mangaList, metaData } = await fetchMangaList({ 
    page: currentPage, 
    limit: 36,
    demographic: demographic
  });

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {demographic} Manga
        </h2>
        
        {mangaList.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mangaList.map((manga) => (
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
            
            <Pagination currentPage={currentPage} totalPages={metaData.totalPages} />
          </>
        ) : (
          <div className="dark:text-zinc-500 text-zinc-500 py-12 text-center">
            No manga found for this demographic.
          </div>
        )}
      </section>
    </div>
  );
}
