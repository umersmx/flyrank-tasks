import { useState, useEffect, useRef, useCallback } from 'react';
import { MovieSummary } from '../types/movie';
import { FilterState } from '../types/filter';
import { searchMovies } from '../services/omdbApi';
import { useDebounce } from './useDebounce';

export interface UseMovieSearchReturn {
  movies: MovieSummary[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  source: 'omdb' | 'mock';
  page: number;
  setPage: (page: number) => void;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  refetch: () => void;
}

const INITIAL_FILTER: FilterState = {
  query: '',
  type: 'all',
  year: '',
  genre: 'all',
  sortBy: 'rating-desc',
};

export function useMovieSearch(): UseMovieSearchReturn {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'omdb' | 'mock'>('mock');

  const debouncedQuery = useDebounce(filter.query, 450);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Reset page to 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, filter.type, filter.year, filter.genre, filter.sortBy]);

  const executeSearch = useCallback(async () => {
    // Abort previous in-flight request to avoid race conditions
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const activeFilter: FilterState = {
        ...filter,
        query: debouncedQuery,
      };

      const result = await searchMovies(activeFilter, page, controller.signal);
      setMovies(result.movies);
      setTotalResults(result.total);
      setSource(result.source);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Ignored: intentional cancellation of stale request
        return;
      }
      const message = err instanceof Error ? err.message : 'Failed to search movies';
      setError(message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, filter, page]);

  useEffect(() => {
    executeSearch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [executeSearch]);

  return {
    movies,
    totalResults,
    loading,
    error,
    source,
    page,
    setPage,
    filter,
    setFilter,
    refetch: executeSearch,
  };
}
