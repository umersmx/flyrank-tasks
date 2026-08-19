import React, { useState } from 'react';
import { MovieSummary } from '../types/movie';
import { Bookmark, Film, ImageOff } from 'lucide-react';

interface MovieCardProps {
  movie: MovieSummary;
  inWatchlist: boolean;
  onToggleWatchlist: (movie: MovieSummary) => void;
  onSelect: (imdbId: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  inWatchlist,
  onToggleWatchlist,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A' && !imageError;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist(movie);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(movie.imdbID);
    }
  };

  return (
    <article
      className="movie-card"
      onClick={() => onSelect(movie.imdbID)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${movie.Title}, ${movie.Type} released in ${movie.Year}`}
    >
      <div className="card-poster-wrapper">
        {hasValidPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="card-poster"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <ImageOff size={32} />
            <span style={{ fontSize: '0.8rem' }}>No Poster Available</span>
          </div>
        )}

        <span className="card-type-tag">{movie.Type}</span>

        <button
          type="button"
          className={`card-watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
          onClick={handleWatchlistClick}
          aria-label={inWatchlist ? `Remove ${movie.Title} from Watchlist` : `Add ${movie.Title} to Watchlist`}
          title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        >
          <Bookmark size={18} fill={inWatchlist ? '#ffffff' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="card-meta">
          <span>{movie.Year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Film size={14} color="var(--text-muted)" />
            <span style={{ textTransform: 'capitalize' }}>{movie.Type}</span>
          </span>
        </div>
      </div>
    </article>
  );
};
