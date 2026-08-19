import React from 'react';
import { MovieSummary } from '../types/movie';
import { MovieCard } from './MovieCard';
import { Film, AlertCircle } from 'lucide-react';

interface MovieGridProps {
  movies: MovieSummary[];
  loading: boolean;
  error: string | null;
  isInWatchlist: (id: string) => boolean;
  onToggleWatchlist: (movie: MovieSummary) => void;
  onSelectMovie: (imdbId: string) => void;
  onResetFilters?: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading,
  error,
  isInWatchlist,
  onToggleWatchlist,
  onSelectMovie,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div className="movie-grid" aria-label="Loading movies">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="movie-card skeleton" style={{ height: '380px' }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <AlertCircle size={48} color="var(--accent-rose)" />
        <h2>Unable to load titles</h2>
        <p style={{ maxWidth: '400px' }}>{error}</p>
        {onResetFilters && (
          <button type="button" className="btn btn-primary" onClick={onResetFilters}>
            Try Resetting Filters
          </button>
        )}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <Film size={48} color="var(--text-muted)" />
        <h2>No matching titles found</h2>
        <p style={{ maxWidth: '450px' }}>
          Try searching for another movie or TV series, changing the filter criteria, or adding your OMDb API key in settings.
        </p>
        {onResetFilters && (
          <button type="button" className="btn btn-secondary" onClick={onResetFilters}>
            Show Curated Library
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="movie-grid" aria-label="Movie search results">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          inWatchlist={isInWatchlist(movie.imdbID)}
          onToggleWatchlist={onToggleWatchlist}
          onSelect={onSelectMovie}
        />
      ))}
    </section>
  );
};
