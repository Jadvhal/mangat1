'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaginationInner({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 border border-white/5 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
      )}
      
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return <span key={`ellipsis-${index}`} className="text-zinc-500 px-1">...</span>;
          }
          
          const isCurrent = page === currentPage;
          
          return (
            <Link 
              key={`page-${page}`} 
              href={createPageUrl(page)} 
              className={`min-w-[2rem] px-2 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${isCurrent ? 'bg-white text-black' : 'border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/10 hover:bg-white/5 transition-colors">
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button disabled className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 border border-white/5 cursor-not-allowed">
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function Pagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center gap-2 mt-8 h-10" />}>
      <PaginationInner currentPage={currentPage} totalPages={totalPages} />
    </Suspense>
  );
}
