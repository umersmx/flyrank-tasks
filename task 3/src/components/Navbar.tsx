import React from 'react';
import { Film, Bookmark, BarChart3, KeyRound } from 'lucide-react';

interface NavbarProps {
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenStats: () => void;
  onOpenApiKey: () => void;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  watchlistCount,
  onOpenWatchlist,
  onOpenStats,
  onOpenApiKey,
  hasCustomKey,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-wrapper">
            <Film size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-title gradient-text">CinePulse AI</span>
              <span className="brand-badge">FE-03</span>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenApiKey}
            title={hasCustomKey ? 'Custom OMDb Key Active' : 'Configure OMDb API Key'}
            aria-label="API Key Settings"
          >
            <KeyRound size={16} color={hasCustomKey ? '#10b981' : '#94a3b8'} />
            <span style={{ display: 'none', minWidth: '0' }} className="nav-btn-label">API Key</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenStats}
            title="Watchlist Analytics & Stats"
            aria-label="Watchlist Analytics"
          >
            <BarChart3 size={16} />
            <span style={{ display: 'none', minWidth: '0' }} className="nav-btn-label">Stats</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-icon-only"
            onClick={onOpenWatchlist}
            aria-label={`View Watchlist (${watchlistCount} items)`}
          >
            <Bookmark size={18} />
            {watchlistCount > 0 && <span className="btn-badge">{watchlistCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
