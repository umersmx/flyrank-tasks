import React from 'react';
import { WatchlistStats } from '../hooks/useWatchlist';
import { X, Trophy, CheckCircle, Film, Star, Percent } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: WatchlistStats;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
}) => {
  if (!isOpen) return null;

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Watchlist Analytics & Stats"
    >
      <div className="modal-content" style={{ maxWidth: '580px', padding: '2rem' }}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
            <Trophy size={18} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Watchlist Analytics</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Real-time intelligence from your entertainment journey
            </p>
          </div>
        </div>

        {/* 4-Stat Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Film size={16} color="#6366f1" />
              <span>Total Saved</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {stats.totalMovies} Movies · {stats.totalSeries} TV Series
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <CheckCircle size={16} color="#10b981" />
              <span>Completed</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#6ee7b7' }}>
              {stats.completed}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {stats.watching} In-Progress · {stats.planned} Planned
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Percent size={16} color="#a855f7" />
              <span>Completion Rate</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
              {completionRate}%
            </div>
            {/* Visual Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '999px',
                marginTop: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${completionRate}%`,
                  height: '100%',
                  background: 'var(--accent-gradient)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Star size={16} color="#f59e0b" />
              <span>Avg Rating</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#fcd34d' }}>
              {stats.avgRating > 0 ? `${stats.avgRating} / 5` : 'N/A'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Personal star reviews
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%' }}
          onClick={onClose}
        >
          Close Insights
        </button>
      </div>
    </div>
  );
};
