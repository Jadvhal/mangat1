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
    setQuery(searchParams.get('q') || '');
    setSort(searchParams.get('sort') || 'default');
    setSelectedTypes(searchParams.get('origin')?.split(',').filter(Boolean) || []);
    setSelectedDemographics(searchParams.get('demographic')?.split(',').filter(Boolean) || []);
    setSelectedGenres(searchParams.get('genre')?.split(',').filter(Boolean) || []);
    setSelectedThemes(searchParams.get('theme')?.split(',').filter(Boolean) || []);
    setSelectedMature(searchParams.get('mature')?.split(',').filter(Boolean) || []);
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

  const FilterSection = ({ title, options, selected, setSelected }: { title: string, options: string[], selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> }) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-zinc-400 mb-3">{title}</h4>
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
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/5"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative w-full z-20">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search manga..."
            className="w-full bg-[#141414] border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors border",
            isFilterOpen || selectedTypes.length || selectedDemographics.length || selectedGenres.length || selectedThemes.length || selectedMature.length || sort !== 'default'
              ? "bg-white text-black border-white"
              : "bg-[#141414] text-zinc-300 border-white/10 hover:bg-white/5 hover:border-white/20"
          )}
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </form>

      {isFilterOpen && (
        <div className="absolute top-full right-0 mt-2 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#141414]">
            <h3 className="font-bold text-lg">Filters</h3>
            <button onClick={() => setIsFilterOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-zinc-400 mb-3">Sorting</h4>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-64 bg-[#141414] border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/20 cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>

            <FilterSection title="Filter by Type" options={FILTER_OPTIONS.types} selected={selectedTypes} setSelected={setSelectedTypes} />
            
            <div className="space-y-6 pt-4 border-t border-white/5">
              <h3 className="font-bold text-white">Filter by Genre</h3>
              <FilterSection title="Demographics" options={FILTER_OPTIONS.demographics} selected={selectedDemographics} setSelected={setSelectedDemographics} />
              <FilterSection title="Genres" options={FILTER_OPTIONS.genres} selected={selectedGenres} setSelected={setSelectedGenres} />
              <FilterSection title="Themes" options={FILTER_OPTIONS.themes} selected={selectedThemes} setSelected={setSelectedThemes} />
              <FilterSection title="Mature" options={FILTER_OPTIONS.mature} selected={selectedMature} setSelected={setSelectedMature} />
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-[#141414] flex justify-end gap-3">
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
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(false);
                handleSearch();
              }}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
