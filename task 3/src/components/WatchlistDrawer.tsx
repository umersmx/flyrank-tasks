import React, { useState } from 'react';
import { WatchlistItem, WatchlistStatus } from '../types/movie';
import { X, Trash2, Star, Film } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: WatchlistItem[];
  onRemove: (id: string) => void;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onSelectMovie: (id: string) => void;
  onClearAll: () => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onUpdateStatus,
  onSelectMovie,
  onClearAll,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const filteredItems = watchlist.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.movie.Title.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div
      className="drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Your Watchlist"
    >
      <div className="drawer-panel">
        <div className="drawer-header">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>My Watchlist</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {watchlist.length} saved {watchlist.length === 1 ? 'title' : 'titles'}
            </span>
          </div>
          <button
            type="button"
            className="modal-close"
            style={{ position: 'static' }}
            onClick={onClose}
            aria-label="Close watchlist drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter controls inside drawer */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="text"
            className="select-control"
            placeholder="Filter saved titles..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['all', 'planned', 'watching', 'completed'].map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-pill ${filterStatus === st ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                onClick={() => setFilterStatus(st)}
              >
                {st === 'all' ? 'All' : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {filteredItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem' }}>
              <Film size={40} color="var(--text-muted)" />
              <h3>No titles in this view</h3>
              <p style={{ fontSize: '0.85rem' }}>
                {watchlist.length === 0
                  ? 'Your watchlist is empty. Click the bookmark icon on any movie to save it!'
                  : 'No saved titles match your current filter.'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="drawer-item">
                {item.movie.Poster && item.movie.Poster !== 'N/A' ? (
                  <img
                    src={item.movie.Poster}
                    alt={item.movie.Title}
                    className="drawer-item-poster"
                    onClick={() => {
                      onSelectMovie(item.id);
                      onClose();
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <div
                    className="drawer-item-poster poster-placeholder"
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    <Film size={20} />
                  </div>
                )}

                <div className="drawer-item-content">
                  <div>
                    <h4
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        color: 'var(--text-primary)',
                      }}
                      onClick={() => {
                        onSelectMovie(item.id);
                        onClose();
                      }}
                    >
                      {item.movie.Title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {item.movie.Year} · {item.movie.Type}
                    </span>
                  </div>

                  {item.userRating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.25rem 0' }}>
                      <Star size={13} color="#f59e0b" fill="#f59e0b" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fcd34d' }}>
                        {item.userRating}/5
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <select
                      className="select-control"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value as WatchlistStatus)}
                    >
                      <option value="planned">Planned</option>
                      <option value="watching">Watching</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.5rem', color: 'var(--accent-rose)' }}
                      onClick={() => onRemove(item.id)}
                      title="Delete from watchlist"
                      aria-label={`Remove ${item.movie.Title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {watchlist.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Saved in local browser memory
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', borderColor: 'rgba(244,63,94,0.3)' }}
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
                  onClearAll();
                }
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
