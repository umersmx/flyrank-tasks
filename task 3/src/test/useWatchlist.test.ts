import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWatchlist } from '../hooks/useWatchlist';
import { MovieSummary } from '../types/movie';

const mockMovie: MovieSummary = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg',
};

describe('useWatchlist hook', () => {
  it('initializes with empty watchlist', () => {
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.watchlist).toEqual([]);
    expect(result.current.stats.total).toBe(0);
  });

  it('adds movie to watchlist and computes statistics', () => {
    const { result } = renderHook(() => useWatchlist());

    act(() => {
      result.current.addToWatchlist(mockMovie, 'planned');
    });

    expect(result.current.watchlist.length).toBe(1);
    expect(result.current.isInWatchlist('tt1375666')).toBe(true);
    expect(result.current.stats.total).toBe(1);
    expect(result.current.stats.planned).toBe(1);
    expect(result.current.stats.totalMovies).toBe(1);
  });

  it('updates status and user ratings', () => {
    const { result } = renderHook(() => useWatchlist());

    act(() => {
      result.current.addToWatchlist(mockMovie, 'planned');
    });

    act(() => {
      result.current.updateStatus('tt1375666', 'completed');
      result.current.updateUserRating('tt1375666', 5);
    });

    const item = result.current.getWatchlistItem('tt1375666');
    expect(item?.status).toBe('completed');
    expect(item?.userRating).toBe(5);
    expect(result.current.stats.completed).toBe(1);
    expect(result.current.stats.avgRating).toBe(5);
  });

  it('removes movie from watchlist', () => {
    const { result } = renderHook(() => useWatchlist());

    act(() => {
      result.current.addToWatchlist(mockMovie, 'planned');
    });
    expect(result.current.watchlist.length).toBe(1);

    act(() => {
      result.current.removeFromWatchlist('tt1375666');
    });
    expect(result.current.watchlist.length).toBe(0);
    expect(result.current.isInWatchlist('tt1375666')).toBe(false);
  });
});
