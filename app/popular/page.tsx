import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { Pagination } from '@/components/pagination';
import { TimeFilter } from '@/components/time-filter';

export const dynamic = 'force-dynamic';

export default async function PopularPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedSearchParams = await searchParams;
  
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  
  const timeParam = resolvedSearchParams.time;
  const currentTime = typeof timeParam === 'string' ? timeParam : '30d';

  const { mangaList, metaData } = await fetchMangaList({ 
    page: currentPage, 
    limit: 36,
    type: 'topview',
    time: currentTime
  });

  return (
    <div className="space-y-8 pb-12">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular</h2>
          <TimeFilter />
        </div>
        
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
          <div className="text-zinc-500 py-12 text-center">
            No popular manga found for this time period.
          </div>
        )}
      </section>
    </div>
  );
}
