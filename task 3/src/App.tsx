import { useState, useCallback } from 'react';
import { useMovieSearch } from './hooks/useMovieSearch';
import { useWatchlist } from './hooks/useWatchlist';
import { getStoredApiKey } from './services/omdbApi';
import { MovieSummary } from './types/movie';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { MovieGrid } from './components/MovieGrid';
import { MovieModal } from './components/MovieModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { StatsModal } from './components/StatsModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Sparkles } from 'lucide-react';

export function App() {
  const {
    movies,
    totalResults,
    loading,
    error,
    source,
    filter,
    setFilter,
    refetch,
  } = useMovieSearch();

  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateStatus,
    updateUserRating,
    updateNotes,
    isInWatchlist,
    getWatchlistItem,
    stats,
    clearWatchlist,
  } = useWatchlist();

  // Modals & Drawers state
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState<boolean>(false);
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(() => !!getStoredApiKey());

  const handleToggleWatchlist = useCallback(
    (movie: MovieSummary) => {
      if (isInWatchlist(movie.imdbID)) {
        removeFromWatchlist(movie.imdbID);
      } else {
        addToWatchlist(movie, 'planned');
      }
    },
    [isInWatchlist, removeFromWatchlist, addToWatchlist]
  );

  const handleSearchQueryChange = (query: string) => {
    setFilter((prev) => ({ ...prev, query }));
  };

  const handleKeyChange = () => {
    setHasCustomKey(!!getStoredApiKey());
    refetch();
  };

  const handleResetFilters = () => {
    setFilter({
      query: '',
      type: 'all',
      year: '',
      genre: 'all',
      sortBy: 'rating-desc',
    });
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasCustomKey={hasCustomKey}
      />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>Frontend AI Engineering · Week 3 (FE-03)</span>
          </div>
          <h1 className="hero-title">
            Discover & Curate Your Next <span className="gradient-text">Masterpiece</span>
          </h1>
          <p className="hero-subtitle">
            Explore ratings, cast intelligence, synopsis breakdowns, and manage your personalized entertainment journey with AI-assisted state management.
          </p>

          {/* Real-time Debounced Search */}
          <SearchBar
            value={filter.query}
            onChange={handleSearchQueryChange}
          />
        </section>

        {/* Dynamic Filters & Sorters */}
        <FilterBar
          filter={filter}
          onChange={setFilter}
          totalResults={totalResults}
          source={source}
        />

        {/* Results Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          isInWatchlist={isInWatchlist}
          onToggleWatchlist={handleToggleWatchlist}
          onSelectMovie={(id) => setSelectedMovieId(id)}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Movie Details Modal */}
      <MovieModal
        imdbId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
        watchlistItem={selectedMovieId ? getWatchlistItem(selectedMovieId) : undefined}
        onAddToWatchlist={addToWatchlist}
        onRemoveFromWatchlist={removeFromWatchlist}
        onUpdateStatus={updateStatus}
        onUpdateUserRating={updateUserRating}
        onUpdateNotes={updateNotes}
      />

      {/* Watchlist Side Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={removeFromWatchlist}
        onUpdateStatus={updateStatus}
        onSelectMovie={(id) => setSelectedMovieId(id)}
        onClearAll={clearWatchlist}
      />

      {/* Analytics Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      {/* OMDb API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        onKeyChange={handleKeyChange}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <strong>CinePulse AI</strong> · Built for FlyRank Frontend AI Engineering Assignment 3
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Demonstrating ViewModel separation, custom hooks architecture, OMDb API parallelization, and localStorage state persistence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
