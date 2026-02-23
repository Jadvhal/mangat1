import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link href={`/?page=${currentPage - 1}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 border border-white/10 hover:text-white hover:bg-white/5 transition-colors">
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
        <Link href={`/?page=1`} className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${currentPage === 1 ? 'bg-white text-black' : 'border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
          1
        </Link>
        
        {currentPage > 3 && <span className="text-zinc-500">...</span>}
        
        {currentPage > 2 && (
          <Link href={`/?page=${currentPage - 1}`} className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">
            {currentPage - 1}
          </Link>
        )}
        
        {currentPage !== 1 && currentPage !== totalPages && (
          <button className="w-8 h-8 flex items-center justify-center rounded bg-white text-black text-sm font-medium">
            {currentPage}
          </button>
        )}
        
        {currentPage === 1 && totalPages > 1 && (
          <Link href={`/?page=2`} className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">
            2
          </Link>
        )}
        
        {currentPage < totalPages - 1 && (
          <Link href={`/?page=${currentPage + 1}`} className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium transition-colors">
            {currentPage + 1}
          </Link>
        )}
        
        {currentPage < totalPages - 2 && <span className="text-zinc-500">...</span>}
        
        {totalPages > 1 && (
          <Link href={`/?page=${totalPages}`} className={`w-auto px-2 min-w-[2rem] h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${currentPage === totalPages ? 'bg-white text-black' : 'border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'}`}>
            {totalPages}
          </Link>
        )}
      </div>

      {currentPage < totalPages ? (
        <Link href={`/?page=${currentPage + 1}`} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/10 hover:bg-white/5 transition-colors">
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
