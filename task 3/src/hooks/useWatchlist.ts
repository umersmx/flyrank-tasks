import { useState, useEffect, useCallback, useMemo } from 'react';
import { MovieDetail, MovieSummary, WatchlistItem, WatchlistStatus } from '../types/movie';

const STORAGE_KEY = 'cinepulse_watchlist_v1';

export interface WatchlistStats {
  total: number;
  completed: number;
  watching: number;
  planned: number;
  avgRating: number;
  totalMovies: number;
  totalSeries: number;
}

export interface UseWatchlistReturn {
  watchlist: WatchlistItem[];
  addToWatchlist: (movie: MovieDetail | MovieSummary, status?: WatchlistStatus) => void;
  removeFromWatchlist: (id: string) => void;
  updateStatus: (id: string, status: WatchlistStatus) => void;
  updateUserRating: (id: string, rating: number) => void;
  updateNotes: (id: string, notes: string) => void;
  isInWatchlist: (id: string) => boolean;
  getWatchlistItem: (id: string) => WatchlistItem | undefined;
  stats: WatchlistStats;
  clearWatchlist: () => void;
}

export function useWatchlist(): UseWatchlistReturn {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load watchlist from localStorage:', e);
    }
    return [];
  });

  // Persist to localStorage whenever watchlist updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage:', e);
    }
  }, [watchlist]);

  const addToWatchlist = useCallback((movie: MovieDetail | MovieSummary, status: WatchlistStatus = 'planned') => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === movie.imdbID);
      if (exists) {
        return prev;
      }
      const newItem: WatchlistItem = {
        id: movie.imdbID,
        movie,
        addedAt: Date.now(),
        status,
      };
      return [newItem, ...prev];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateStatus = useCallback((id: string, status: WatchlistStatus) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }, []);

  const updateUserRating = useCallback((id: string, rating: number) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, userRating: rating } : item))
    );
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => watchlist.some((item) => item.id === id),
    [watchlist]
  );

  const getWatchlistItem = useCallback(
    (id: string) => watchlist.find((item) => item.id === id),
    [watchlist]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  const stats = useMemo<WatchlistStats>(() => {
    const total = watchlist.length;
    let completed = 0;
    let watching = 0;
    let planned = 0;
    let ratingSum = 0;
    let ratedCount = 0;
    let totalMovies = 0;
    let totalSeries = 0;

    for (const item of watchlist) {
      if (item.status === 'completed') completed++;
      if (item.status === 'watching') watching++;
      if (item.status === 'planned') planned++;

