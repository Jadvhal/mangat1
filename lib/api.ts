const API_BASE_URL = 'https://api.mangadex.org';
const UPLOADS_BASE_URL = 'https://uploads.mangadex.org';

export interface ApiMangaItem {
  id: string;
  image: string;
  title: string;
  chapter: string;
  view: string;
  description: string;
  author?: string;
  status?: string;
  type?: string;
  genres?: string[];
}

export interface ApiMangaListResponse {
  mangaList: ApiMangaItem[];
  metaData: {
    totalStories: number;
    totalPages: number;
    type: { id: string; type: string }[];
    state: { id: string; type: string }[];
    category: { id: string; type: string }[];
  };
}

export interface ApiMangaDetail {
  imageUrl: string;
  name: string;
  author: string;
  status: string;
  updated: string;
  view: string;
  genres: string[];
  chapterList: {
    id: string;
    path: string;
    name: string;
    view: string;
    createdAt: string;
  }[];
}

export interface ApiChapterDetail {
  title: string;
  currentChapter: string;
  chapterListIds: { id: string; name: string }[];
  images: { title: string; image: string }[];
}

// Fallback data in case the API is down or rate limited
const fallbackMangaListResponse: ApiMangaListResponse = {
  mangaList: [
    {
      id: "manga-oa952283",
      image: "https://picsum.photos/seed/fallback1/400/600",
      title: "Attack On Titan (Fallback)",
      chapter: "chapter-139",
      view: "105.8M",
      description: "A story about a boy who fights titans."
    },
    {
      id: "manga-fv982830",
      image: "https://picsum.photos/seed/fallback1/400/600",
      title: "Attack On Titan Anthology (Fallback)",
      chapter: "chapter-1",
      view: "1.2M",
      description: "Anthology of Attack on Titan."
    }
  ],
  metaData: {
    totalStories: 2,
    totalPages: 1,
    type: [{ id: "newest", type: "Newest" }],
    state: [{ id: "Completed", type: "Completed" }],
    category: [{ id: "all", type: "ALL" }]
  }
};

function getCoverUrl(mangaId: string, relationships: any[]): string {
  const coverRel = relationships?.find((rel: any) => rel.type === 'cover_art');
  if (coverRel?.attributes?.fileName) {
    return `${UPLOADS_BASE_URL}/covers/${mangaId}/${coverRel.attributes.fileName}.256.jpg`;
  }
  return 'https://picsum.photos/seed/fallback/400/600';
}

function getOriginalCoverUrl(mangaId: string, relationships: any[]): string {
  const coverRel = relationships?.find((rel: any) => rel.type === 'cover_art');
  if (coverRel?.attributes?.fileName) {
    return `${UPLOADS_BASE_URL}/covers/${mangaId}/${coverRel.attributes.fileName}`;
  }
  return 'https://picsum.photos/seed/fallback/400/600';
}

export async function fetchMangaList(params?: { page?: number; limit?: number; type?: string; category?: string; state?: string }): Promise<ApiMangaListResponse> {
  try {
    const limit = params?.limit || 12;
    const offset = params?.page ? (params.page - 1) * limit : 0;
    
    const url = new URL(`${API_BASE_URL}/manga`);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('includes[]', 'cover_art');
    url.searchParams.append('includes[]', 'author');
    url.searchParams.append('hasAvailableChapters', 'true');
    url.searchParams.append('availableTranslatedLanguage[]', 'en');
    
    // Default sorting
    if (params?.type === 'topview') {
      url.searchParams.append('order[followedCount]', 'desc');
    } else if (params?.type === 'newest') {
      url.searchParams.append('order[latestUploadedChapter]', 'desc');
    } else {
      url.searchParams.append('order[followedCount]', 'desc');
    }

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn(`Failed to fetch manga list: ${res.status} ${res.statusText}`);
      return fallbackMangaListResponse;
    }
    
    const data = await res.json();
    
    const mangaList: ApiMangaItem[] = data.data.map((manga: any) => {
      const authorRel = manga.relationships?.find((rel: any) => rel.type === 'author');
      const authorName = authorRel?.attributes?.name || 'Unknown Author';
      
      const genres = manga.attributes.tags
        ?.filter((tag: any) => tag.attributes.group === 'genre')
        .map((tag: any) => tag.attributes.name.en) || [];

      return {
        id: manga.id,
        image: getCoverUrl(manga.id, manga.relationships),
        title: manga.attributes.title.en || Object.values(manga.attributes.title)[0] || 'Unknown Title',
        chapter: `Ch. ${manga.attributes.lastChapter || '?'}`,
        view: 'N/A', // MangaDex doesn't provide views directly in this endpoint
        description: manga.attributes.description?.en || 'No description available.',
        author: authorName,
        status: manga.attributes.status || 'Unknown',
        type: manga.attributes.publicationDemographic || 'Manga',
        genres: genres
      };
    });

    return {
      mangaList,
      metaData: {
        totalStories: data.total,
        totalPages: Math.ceil(data.total / limit),
        type: [{ id: "newest", type: "Newest" }, { id: "topview", type: "Top View" }],
        state: [],
        category: []
      }
    };
  } catch (error) {
    console.error('Error fetching manga list:', error);
    return fallbackMangaListResponse;
  }
}

export async function fetchMangaDetail(id: string): Promise<ApiMangaDetail> {
  try {
    // Fetch manga details
    const url = new URL(`${API_BASE_URL}/manga/${id}`);
    url.searchParams.append('includes[]', 'cover_art');
    url.searchParams.append('includes[]', 'author');
    
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch manga detail: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const manga = data.data;

    // Fetch chapters
    const feedUrl = new URL(`${API_BASE_URL}/manga/${id}/feed`);
    feedUrl.searchParams.append('translatedLanguage[]', 'en');
    feedUrl.searchParams.append('order[chapter]', 'desc');
    feedUrl.searchParams.append('limit', '100');
    
    const feedRes = await fetch(feedUrl.toString(), { next: { revalidate: 3600 } });
    const feedData = feedRes.ok ? await feedRes.json() : { data: [] };
    
    const authorRel = manga.relationships.find((rel: any) => rel.type === 'author');
    const authorName = authorRel?.attributes?.name || 'Unknown Author';

    const genres = manga.attributes.tags
      .filter((tag: any) => tag.attributes.group === 'genre')
      .map((tag: any) => tag.attributes.name.en);

    return {
      imageUrl: getOriginalCoverUrl(manga.id, manga.relationships),
      name: manga.attributes.title.en || Object.values(manga.attributes.title)[0] || 'Unknown Title',
      author: authorName,
      status: manga.attributes.status,
      updated: manga.attributes.updatedAt ? new Date(manga.attributes.updatedAt).toLocaleDateString() : 'Unknown',
      view: 'N/A',
      genres: genres,
      chapterList: feedData.data.map((ch: any) => ({
        id: ch.id,
        path: `/manga/${id}/chapter/${ch.id}`,
        name: `Chapter ${ch.attributes.chapter || '?'} ${ch.attributes.title ? `- ${ch.attributes.title}` : ''}`,
        view: 'N/A',
        createdAt: new Date(ch.attributes.publishAt).toLocaleDateString()
      }))
    };
  } catch (error) {
    console.error(`Error fetching manga detail for ${id}:`, error);
    throw error;
  }
}

export async function fetchChapterDetail(mangaId: string, chapterId: string): Promise<ApiChapterDetail> {
  try {
    // Fetch chapter info
    const chUrl = new URL(`${API_BASE_URL}/chapter/${chapterId}`);
    chUrl.searchParams.append('includes[]', 'manga');
    const chRes = await fetch(chUrl.toString(), { next: { revalidate: 3600 } });
    if (!chRes.ok) throw new Error('Failed to fetch chapter info');
    const chData = await chRes.json();
    const chapter = chData.data;

    const mangaRel = chapter.relationships.find((rel: any) => rel.type === 'manga');
    const mangaTitle = mangaRel?.attributes?.title?.en || 'Unknown Manga';

    // Fetch all chapters for navigation
    const feedUrl = new URL(`${API_BASE_URL}/manga/${mangaId}/feed`);
    feedUrl.searchParams.append('translatedLanguage[]', 'en');
    feedUrl.searchParams.append('order[chapter]', 'desc');
    feedUrl.searchParams.append('limit', '500');
    const feedRes = await fetch(feedUrl.toString(), { next: { revalidate: 3600 } });
    const feedData = feedRes.ok ? await feedRes.json() : { data: [] };

    // Fetch images
    const serverUrl = new URL(`${API_BASE_URL}/at-home/server/${chapterId}`);
    const serverRes = await fetch(serverUrl.toString());
    if (!serverRes.ok) throw new Error('Failed to fetch chapter images');
    const serverData = await serverRes.json();

    const host = serverData.baseUrl;
    const hash = serverData.chapter.hash;
    const images = serverData.chapter.data.map((filename: string) => ({
      title: filename,
      image: `${host}/data/${hash}/${filename}`
    }));

    return {
      title: mangaTitle,
      currentChapter: `Chapter ${chapter.attributes.chapter || '?'} ${chapter.attributes.title ? `- ${chapter.attributes.title}` : ''}`,
      chapterListIds: feedData.data.map((ch: any) => ({
        id: ch.id,
        name: `Chapter ${ch.attributes.chapter || '?'}`
      })),
      images
    };
  } catch (error) {
    console.error(`Error fetching chapter detail for ${mangaId}/${chapterId}:`, error);
    throw error;
  }
}

export async function searchManga(query: string, page: number = 1): Promise<{ mangaList: ApiMangaItem[], metaData: { totalPages: number } }> {
  try {
    const limit = 12;
    const offset = (page - 1) * limit;
    
    const url = new URL(`${API_BASE_URL}/manga`);
    url.searchParams.append('title', query);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('includes[]', 'cover_art');
    url.searchParams.append('availableTranslatedLanguage[]', 'en');

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.warn(`Failed to search manga: ${res.status} ${res.statusText}`);
      return { mangaList: [], metaData: { totalPages: 0 } };
    }
    
    const data = await res.json();
    
    const mangaList: ApiMangaItem[] = data.data.map((manga: any) => {
      const authorRel = manga.relationships?.find((rel: any) => rel.type === 'author');
      const authorName = authorRel?.attributes?.name || 'Unknown Author';
      
      const genres = manga.attributes.tags
        ?.filter((tag: any) => tag.attributes.group === 'genre')
        .map((tag: any) => tag.attributes.name.en) || [];

      return {
        id: manga.id,
        image: getCoverUrl(manga.id, manga.relationships),
        title: manga.attributes.title.en || Object.values(manga.attributes.title)[0] || 'Unknown Title',
        chapter: `Ch. ${manga.attributes.lastChapter || '?'}`,
        view: 'N/A',
        description: manga.attributes.description?.en || 'No description available.',
        author: authorName,
        status: manga.attributes.status || 'Unknown',
        type: manga.attributes.publicationDemographic || 'Manga',
        genres: genres
      };
    });

    return {
      mangaList,
      metaData: {
        totalPages: Math.ceil(data.total / limit)
      }
    };
  } catch (error) {
    console.error(`Error searching manga for ${query}:`, error);
    return { mangaList: [], metaData: { totalPages: 0 } };
  }
}
