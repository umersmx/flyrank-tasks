import { describe, it, expect } from 'vitest';
import { searchMovies, getMovieDetails } from '../services/omdbApi';

describe('OMDb API & Mock Fallback Service', () => {
  it('searches mock dataset when no API key is set', async () => {
    const result = await searchMovies({
      query: 'Inception',
      type: 'all',
      year: '',
      genre: 'all',
      sortBy: 'rating-desc',
    });

    expect(result.source).toBe('mock');
    expect(result.movies.length).toBeGreaterThan(0);
    expect(result.movies[0].Title).toBe('Inception');
  });

  it('filters by media type correctly in mock mode', async () => {
    const result = await searchMovies({
      query: '',
      type: 'series',
      year: '',
      genre: 'all',
      sortBy: 'rating-desc',
    });

    expect(result.movies.length).toBeGreaterThan(0);
    expect(result.movies.every((m) => m.Type === 'series')).toBe(true);
  });

  it('retrieves detailed movie information for a valid imdbID', async () => {
