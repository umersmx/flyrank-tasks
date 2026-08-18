import { useState, useEffect } from 'react';
import { MovieDetail } from '../types/movie';
import { getMovieDetails } from '../services/omdbApi';

export interface UseMovieDetailsReturn {
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
  source: 'omdb' | 'mock';
}

export function useMovieDetails(imdbId: string | null): UseMovieDetailsReturn {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'omdb' | 'mock'>('mock');

  useEffect(() => {
    if (!imdbId) {
      setMovie(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getMovieDetails(imdbId, controller.signal)
      .then((res) => {
        setMovie(res.movie);
        setSource(res.source);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : 'Could not fetch movie details';
