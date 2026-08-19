import React, { useEffect, useState } from 'react';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { WatchlistItem, WatchlistStatus } from '../types/movie';
import {
  X,
  Star,
  Clock,
  Calendar,
  Award,
  DollarSign,
  Bookmark,
  Share2,
  Check,
  ImageOff,
} from 'lucide-react';

interface MovieModalProps {
  imdbId: string | null;
  onClose: () => void;
  watchlistItem?: WatchlistItem;
  onAddToWatchlist: (movie: any, status?: WatchlistStatus) => void;
  onRemoveFromWatchlist: (id: string) => void;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onUpdateUserRating: (id: string, rating: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  imdbId,
  onClose,
  watchlistItem,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onUpdateStatus,
  onUpdateUserRating,
  onUpdateNotes,
}) => {
  const { movie, loading, error } = useMovieDetails(imdbId);
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState(watchlistItem?.notes || '');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setNotes(watchlistItem?.notes || '');
  }, [watchlistItem]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!imdbId) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNotesBlur = () => {
    if (watchlistItem && notes !== watchlistItem.notes) {
      onUpdateNotes(imdbId, notes);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Movie details"
    >
      <div className="modal-content">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="skeleton" style={{ height: '300px', width: '100%' }} />
            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>Loading title intelligence...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--accent-rose)', fontSize: '1.1rem' }}>{error}</p>
            <button type="button" className="btn btn-secondary" style={{ marginTop: '1.5rem' }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : movie ? (
          <div className="modal-movie-grid">
            {/* Poster Column */}
            <div>
              {movie.Poster && movie.Poster !== 'N/A' && !imgError ? (
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} Poster`}
                  className="modal-poster"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="poster-placeholder"
                  style={{
                    height: '380px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <ImageOff size={48} />
                  <span>No Poster</span>
                </div>
              )}

              {/* Watchlist Controls on Left */}
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {watchlistItem ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244,63,94,0.3)' }}
                      onClick={() => onRemoveFromWatchlist(movie.imdbID)}
                    >
                      <Bookmark size={16} fill="var(--accent-rose)" /> Remove from Watchlist
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</label>
                      <select
                        className="select-control"
                        value={watchlistItem.status}
                        onChange={(e) => onUpdateStatus(movie.imdbID, e.target.value as WatchlistStatus)}
                      >
                        <option value="planned">Planned to Watch</option>
                        <option value="watching">Currently Watching</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {/* Star Rating */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Your Rating</label>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.2rem',
                            }}
                            onClick={() => onUpdateUserRating(movie.imdbID, star)}
                            aria-label={`Rate ${star} out of 5 stars`}
                          >
                            <Star
                              size={20}
                              color="#f59e0b"
                              fill={(watchlistItem.userRating || 0) >= star ? '#f59e0b' : 'none'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onAddToWatchlist(movie, 'planned')}
                  >
                    <Bookmark size={16} /> Add to Watchlist
                  </button>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="modal-details">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <h2 className="modal-title">{movie.Title}</h2>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={handleShare}
                    title="Share Movie Link"
                  >
                    {copied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
                    {copied ? 'Copied' : 'Share'}
                  </button>
                </div>
                <div className="modal-pill-row" style={{ marginTop: '0.5rem' }}>
                  <span className="badge badge-gold">
                    <Star size={12} fill="#f59e0b" /> {movie.imdbRating || 'N/A'} IMDb
                  </span>
                  {movie.Runtime && (
                    <span className="badge">
                      <Clock size={12} /> {movie.Runtime}
                    </span>
                  )}
                  {movie.Year && (
                    <span className="badge">
                      <Calendar size={12} /> {movie.Year}
                    </span>
                  )}
                  {movie.Rated && <span className="badge">{movie.Rated}</span>}
                </div>
              </div>

              {/* Genre Pills */}
              {movie.Genre && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {movie.Genre.split(',').map((g) => (
                    <span
                      key={g.trim()}
                      className="filter-pill"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                    >
                      {g.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Plot */}
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Overview</h4>
                <p className="modal-plot">{movie.Plot || 'No synopsis available.'}</p>
              </div>

              {/* Meta Table */}
              <div className="modal-meta-table">
                <span className="modal-meta-label">Director:</span>
                <span className="modal-meta-val">{movie.Director || 'N/A'}</span>

                <span className="modal-meta-label">Cast:</span>
                <span className="modal-meta-val">{movie.Actors || 'N/A'}</span>

                <span className="modal-meta-label">Writer:</span>
                <span className="modal-meta-val">{movie.Writer || 'N/A'}</span>

                {movie.Awards && movie.Awards !== 'N/A' && (
                  <>
                    <span className="modal-meta-label">Awards:</span>
                    <span className="modal-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Award size={14} color="#f59e0b" /> {movie.Awards}
                    </span>
                  </>
                )}

                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <>
                    <span className="modal-meta-label">Box Office:</span>
                    <span className="modal-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <DollarSign size={14} color="#10b981" /> {movie.BoxOffice}
                    </span>
                  </>
                )}
              </div>

              {/* Personal Notes (if in watchlist) */}
              {watchlistItem && (
                <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Personal Notes & Review
                  </label>
                  <textarea
                    className="select-control"
                    style={{ width: '100%', minHeight: '70px', resize: 'vertical' }}
                    placeholder="Add your reflections, review, or thoughts here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleNotesBlur}
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
