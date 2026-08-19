import { MovieDetail, MovieSummary, OmdbSearchResponse } from '../types/movie';
import { FilterState } from '../types/filter';
import { MOCK_MOVIES } from './mockData';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';
const STORAGE_KEY_API_KEY = 'cinepulse_omdb_key';

export const getStoredApiKey = (): string => {
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
};

export const setStoredApiKey = (key: string): void => {
  if (key.trim()) {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  }
};

// In-memory cache to avoid duplicate network requests
const searchCache = new Map<string, { data: MovieSummary[]; total: number }>();
const detailsCache = new Map<string, MovieDetail>();

export async function searchMovies(
  filter: FilterState,
  page: number = 1,
  signal?: AbortSignal
): Promise<{ movies: MovieSummary[]; total: number; source: 'omdb' | 'mock' }> {
  const apiKey = getStoredApiKey();
  const trimmedQuery = filter.query.trim();

  // If no API key is provided, or query matches mock data, search local mock database
  if (!apiKey) {
    return filterMockMovies(filter);
  }

  // If query is empty and we have an API key, fallback to curated mock list
  if (!trimmedQuery) {
    return filterMockMovies(filter);
  }

  const cacheKey = `${trimmedQuery}_${filter.type}_${filter.year}_${page}`;
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!;
    return { movies: cached.data, total: cached.total, source: 'omdb' };
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    s: trimmedQuery,
    page: String(page),
  });

  if (filter.type !== 'all') {
    params.set('type', filter.type);
  }
  if (filter.year) {
    params.set('y', filter.year);
  }

  try {
    const response = await fetch(`${OMDB_BASE_URL}?${params.toString()}`, { signal });
    if (!response.ok) {
      throw new Error(`OMDb API responded with status ${response.status}`);
    }

    const data: OmdbSearchResponse = await response.json();

    if (data.Response === 'False' || !data.Search) {
      // If OMDb has no results, also check if mock data has matching titles as fallback
      const mockResults = filterMockMovies(filter);
      if (mockResults.movies.length > 0) {
        return mockResults;
      }
      return { movies: [], total: 0, source: 'omdb' };
    }

    const total = parseInt(data.totalResults || '0', 10);
    searchCache.set(cacheKey, { data: data.Search, total });

    return { movies: data.Search, total, source: 'omdb' };
  } catch (err: unknown) {
    if (signal?.aborted) {
      throw err;
    }
    console.warn('OMDb API request failed, falling back to mock dataset:', err);
    return filterMockMovies(filter);
  }
}

export async function getMovieDetails(
  imdbId: string,
  signal?: AbortSignal
): Promise<{ movie: MovieDetail; source: 'omdb' | 'mock' }> {
  // Check in-memory cache first
  if (detailsCache.has(imdbId)) {
    return { movie: detailsCache.get(imdbId)!, source: 'omdb' };
  }

  // Check mock data
  const mockMovie = MOCK_MOVIES.find((m) => m.imdbID === imdbId);

  const apiKey = getStoredApiKey();
  if (!apiKey) {
    if (mockMovie) {
      return { movie: mockMovie, source: 'mock' };
    }
    throw new Error('Movie not found in offline dataset. Add an OMDb API Key to search all titles.');
  }

  try {
    const params = new URLSearchParams({
      apikey: apiKey,
      i: imdbId,
      plot: 'full',
    });

    const response = await fetch(`${OMDB_BASE_URL}?${params.toString()}`, { signal });
    if (!response.ok) {
      throw new Error(`OMDb API responded with status ${response.status}`);
    }

    const data: MovieDetail = await response.json();
    if (data.Response === 'False') {
      if (mockMovie) return { movie: mockMovie, source: 'mock' };
      throw new Error(data.Error || 'Movie details not found');
    }

    detailsCache.set(imdbId, data);
    return { movie: data, source: 'omdb' };
  } catch (err: unknown) {
    if (signal?.aborted) throw err;
    if (mockMovie) return { movie: mockMovie, source: 'mock' };
    throw err;
  }
}

function filterMockMovies(filter: FilterState): { movies: MovieSummary[]; total: number; source: 'mock' } {
  let list = [...MOCK_MOVIES];

  if (filter.query.trim()) {
    const q = filter.query.trim().toLowerCase();
    list = list.filter(
      (m) =>
        m.Title.toLowerCase().includes(q) ||
        m.Director.toLowerCase().includes(q) ||
        m.Actors.toLowerCase().includes(q) ||
        m.Genre.toLowerCase().includes(q)
    );
  }

  if (filter.type !== 'all') {
    list = list.filter((m) => m.Type.toLowerCase() === filter.type.toLowerCase());
  }

  if (filter.year) {
    list = list.filter((m) => m.Year.includes(filter.year));
  }

  if (filter.genre && filter.genre !== 'all') {
    list = list.filter((m) => m.Genre.toLowerCase().includes(filter.genre.toLowerCase()));
  }

  // Sorting
  list.sort((a, b) => {
    if (filter.sortBy === 'year-desc') {
      return parseInt(b.Year) - parseInt(a.Year);
    }
    if (filter.sortBy === 'year-asc') {
      return parseInt(a.Year) - parseInt(b.Year);
    }
    if (filter.sortBy === 'title-asc') {
      return a.Title.localeCompare(b.Title);
    }
    if (filter.sortBy === 'rating-desc') {
      return parseFloat(b.imdbRating || '0') - parseFloat(a.imdbRating || '0');
    }
    return 0;
  });

  const summaries: MovieSummary[] = list.map((m) => ({
    Title: m.Title,
    Year: m.Year,
    imdbID: m.imdbID,
    Type: m.Type,
    Poster: m.Poster,
  }));

  return { movies: summaries, total: summaries.length, source: 'mock' };
}
