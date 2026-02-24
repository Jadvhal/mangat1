import Image from 'next/image';
import Link from 'next/link';
import { fetchMangaList } from '@/lib/api';
import { Pagination } from '@/components/pagination';

export const dynamic = 'force-dynamic';

export default async function GenresPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ genre: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const genre = decodeURIComponent(resolvedParams.genre);
  const pageParam = resolvedSearchParams.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  const { mangaList, metaData } = await fetchMangaList({ 
    page: currentPage, 
    limit: 36,
    genre: genre
  });

  return (
    <div className="space-y-8 pb-12">
      <section>
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {genre} Manga
        </h2>
        
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
            No manga found for this genre.
          </div>
        )}
      </section>
    </div>
  );
}
