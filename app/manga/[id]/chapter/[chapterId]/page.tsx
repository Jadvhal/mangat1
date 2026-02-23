import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchChapterDetail } from '@/lib/api';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

export default async function ChapterPage({ params }: { params: Promise<{ id: string, chapterId: string }> }) {
  const { id, chapterId } = await params;
  
  let chapter;
  try {
    chapter = await fetchChapterDetail(id, chapterId);
  } catch (error) {
    notFound();
  }

  // Find current index to get prev/next
  const currentIndex = chapter.chapterListIds.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex < chapter.chapterListIds.length - 1 ? chapter.chapterListIds[currentIndex + 1] : null;
  const nextChapter = currentIndex > 0 ? chapter.chapterListIds[currentIndex - 1] : null;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="sticky top-14 z-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4 px-6 flex items-center justify-between mb-8 -mx-6">
        <div className="flex-1 min-w-0">
          <Link href={`/manga/${id}`} className="text-sm text-zinc-400 hover:text-white transition-colors line-clamp-1">
            {chapter.title}
          </Link>
          <h1 className="text-lg font-bold text-white line-clamp-1">{chapter.currentChapter}</h1>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <div className="flex items-center bg-[#141414] rounded-lg border border-white/10 overflow-hidden">
            <Link 
              href={prevChapter ? `/manga/${id}/chapter/${prevChapter.id}` : '#'} 
              className={`p-2 hover:bg-white/10 transition-colors ${!prevChapter ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="px-4 text-sm font-medium border-x border-white/10">
              Ch. {chapter.currentChapter.split('Chapter ')[1]?.split(':')[0] || '??'}
            </div>
            <Link 
              href={nextChapter ? `/manga/${id}/chapter/${nextChapter.id}` : '#'} 
              className={`p-2 hover:bg-white/10 transition-colors ${!nextChapter ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {chapter.images.map((img, i) => (
          <div key={i} className="relative w-full max-w-3xl">
            {/* Using img tag instead of next/image for manga pages as they can have highly variable dimensions and we want them to flow naturally */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.image} 
              alt={img.title} 
              className="w-full h-auto object-contain bg-[#141414]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-4">
        {prevChapter && (
           <Link 
             href={`/manga/${id}/chapter/${prevChapter.id}`}
             className="px-6 py-3 bg-[#141414] hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-colors flex items-center gap-2"
           >
             <ChevronLeft className="w-5 h-5" />
             Previous Chapter
           </Link>
        )}
        {nextChapter && (
           <Link 
             href={`/manga/${id}/chapter/${nextChapter.id}`}
             className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
           >
             Next Chapter
             <ChevronRight className="w-5 h-5" />
           </Link>
        )}
      </div>
    </div>
  );
}
