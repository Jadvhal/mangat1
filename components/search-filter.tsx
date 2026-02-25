'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTER_OPTIONS = {
  types: ['Manga', 'Manhwa', 'Manhua'],
  demographics: ['Josei', 'Seinen', 'Shoujo', 'Shounen'],
  genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Isekai', 'Romance', 'Slice of Life', 'Sports', 'Thriller'],
  themes: ['Doujinshi', 'Ecchi', 'Gender Bender', 'Harem', 'Historical', 'Horror', 'Martial Arts', 'Mecha', 'Mystery', 'Other', 'Psychological', 'School Life', 'Sci-fi', 'Supernatural', 'Tragedy', 'Yaoi', 'Yuri'],
  mature: ['Adult', 'Hentai', 'Mature', 'Shoujo Ai', 'Shounen Ai', 'Smut']
};

const FilterSection = ({ title, options, selected, setSelected, toggleSelection }: { title: string, options: string[], selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, toggleSelection: (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => void }) => (
  <div className="mb-6">
    <h4 className="text-sm font-medium dark:text-zinc-400 text-zinc-600 mb-3">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggleSelection(opt, selected, setSelected)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
              isSelected 
                ? "dark:bg-white bg-black dark:text-black text-white dark:border-white border-black" 
                : "bg-transparent dark:text-zinc-300 text-zinc-700 dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-black/30 dark:hover:bg-white/5 hover:bg-black/5"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

export function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [sort, setSort] = useState(searchParams.get('sort') || 'default');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('origin')?.split(',').filter(Boolean) || []);
  const [selectedDemographics, setSelectedDemographics] = useState<string[]>(searchParams.get('demographic')?.split(',').filter(Boolean) || []);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(searchParams.get('genre')?.split(',').filter(Boolean) || []);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(searchParams.get('theme')?.split(',').filter(Boolean) || []);
  const [selectedMature, setSelectedMature] = useState<string[]>(searchParams.get('mature')?.split(',').filter(Boolean) || []);

  // Sync state with URL when it changes externally
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const s = searchParams.get('sort') || 'default';
    const t = searchParams.get('origin')?.split(',').filter(Boolean) || [];
    const d = searchParams.get('demographic')?.split(',').filter(Boolean) || [];
    const g = searchParams.get('genre')?.split(',').filter(Boolean) || [];
    const th = searchParams.get('theme')?.split(',').filter(Boolean) || [];
    const m = searchParams.get('mature')?.split(',').filter(Boolean) || [];

    if (query !== q) setQuery(q);
    if (sort !== s) setSort(s);
    if (JSON.stringify(selectedTypes) !== JSON.stringify(t)) setSelectedTypes(t);
    if (JSON.stringify(selectedDemographics) !== JSON.stringify(d)) setSelectedDemographics(d);
    if (JSON.stringify(selectedGenres) !== JSON.stringify(g)) setSelectedGenres(g);
    if (JSON.stringify(selectedThemes) !== JSON.stringify(th)) setSelectedThemes(th);
    if (JSON.stringify(selectedMature) !== JSON.stringify(m)) setSelectedMature(m);
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (sort !== 'default') params.set('sort', sort);
    if (selectedTypes.length) params.set('origin', selectedTypes.join(','));
    if (selectedDemographics.length) params.set('demographic', selectedDemographics.join(','));
    if (selectedGenres.length) params.set('genre', selectedGenres.join(','));
    if (selectedThemes.length) params.set('theme', selectedThemes.join(','));
    if (selectedMature.length) params.set('mature', selectedMature.join(','));
    
    router.push(`/search?${params.toString()}`);
  };

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="relative w-full z-20">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 dark:text-zinc-500 text-zinc-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search manga..."
            className="w-full dark:bg-[#141414] bg-white border dark:border-white/10 border-black/10 dark:text-white text-black rounded-xl pl-10 pr-4 py-3 focus:outline-none dark:focus:border-white/20 focus:border-black/20 focus:ring-1 dark:focus:ring-white/20 focus:ring-black/20 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors border",
            isFilterOpen || selectedTypes.length || selectedDemographics.length || selectedGenres.length || selectedThemes.length || selectedMature.length || sort !== 'default'
              ? "dark:bg-white bg-black dark:text-black text-white dark:border-white border-black"
              : "dark:bg-[#141414] bg-white dark:text-zinc-300 text-zinc-700 dark:border-white/10 border-black/10 dark:hover:bg-white/5 hover:bg-black/5 dark:hover:border-white/20 hover:border-black/20"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </form>

      {isFilterOpen && (
        <div className="absolute top-full right-0 mt-2 w-full max-w-2xl dark:bg-[#0a0a0a] bg-white border dark:border-white/10 border-black/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-4 border-b dark:border-white/10 border-black/10 flex justify-between items-center dark:bg-[#141414] bg-white">
            <h3 className="font-bold text-lg dark:text-white text-black">Filters</h3>
            <button onClick={() => setIsFilterOpen(false)} className="dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="mb-6">
              <h4 className="text-sm font-medium dark:text-zinc-400 text-zinc-600 mb-3">Sorting</h4>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-64 dark:bg-[#141414] bg-white border dark:border-white/10 border-black/10 dark:text-white text-black text-sm rounded-lg px-4 py-2.5 focus:outline-none dark:focus:border-white/20 focus:border-black/20 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            <FilterSection title="Filter by Type" options={FILTER_OPTIONS.types} selected={selectedTypes} setSelected={setSelectedTypes} toggleSelection={toggleSelection} />
            
            <div className="space-y-6 pt-4 border-t dark:border-white/5 border-black/5">
              <h3 className="font-bold dark:text-white text-black">Filter by Genre</h3>
              <FilterSection title="Demographics" options={FILTER_OPTIONS.demographics} selected={selectedDemographics} setSelected={setSelectedDemographics} toggleSelection={toggleSelection} />
              <FilterSection title="Genres" options={FILTER_OPTIONS.genres} selected={selectedGenres} setSelected={setSelectedGenres} toggleSelection={toggleSelection} />
              <FilterSection title="Themes" options={FILTER_OPTIONS.themes} selected={selectedThemes} setSelected={setSelectedThemes} toggleSelection={toggleSelection} />
              <FilterSection title="Mature" options={FILTER_OPTIONS.mature} selected={selectedMature} setSelected={setSelectedMature} toggleSelection={toggleSelection} />
            </div>
          </div>
          
          <div className="p-4 border-t dark:border-white/10 border-black/10 dark:bg-[#141414] bg-white flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setSort('default');
                setSelectedTypes([]);
                setSelectedDemographics([]);
                setSelectedGenres([]);
                setSelectedThemes([]);
                setSelectedMature([]);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(false);
                handleSearch();
              }}
              className="px-6 py-2 rounded-lg text-sm font-medium dark:bg-white bg-black dark:text-black text-white dark:hover:bg-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
