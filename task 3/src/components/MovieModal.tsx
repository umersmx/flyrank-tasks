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
