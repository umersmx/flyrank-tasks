import React from 'react';
import { FilterState, MediaTypeFilter, SortOption } from '../types/filter';
import { Sparkles } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChange: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
  source: 'omdb' | 'mock';
}

const MEDIA_TYPES: { label: string; value: MediaTypeFilter }[] = [
  { label: 'All Formats', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episodes', value: 'episode' },
];

const GENRES = [
  'All Genres',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Crime',
  'Drama',
  'Fantasy',
  'History',
  'Mystery',
  'Sci-Fi',
  'Thriller',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChange,
  totalResults,
  source,
}) => {
  const handleTypeChange = (type: MediaTypeFilter) => {
    onChange((prev) => ({ ...prev, type }));
  };

  const handleGenreChange = (genre: string) => {
    onChange((prev) => ({ ...prev, genre }));
  };

  const handleYearChange = (year: string) => {
    onChange((prev) => ({ ...prev, year }));
  };

  const handleSortChange = (sortBy: SortOption) => {
    onChange((prev) => ({ ...prev, sortBy }));
  };

  const handleReset = () => {
    onChange({
      query: '',
      type: 'all',
      year: '',
      genre: 'all',
      sortBy: 'rating-desc',
    });
  };

  const isFiltered =
    filter.query !== '' ||
    filter.type !== 'all' ||
    filter.year !== '' ||
    (filter.genre !== '' && filter.genre !== 'all');

  return (
    <div className="filter-bar">
      {/* Media Type Tabs */}
      <div className="filter-group">
        {MEDIA_TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            className={`filter-pill ${filter.type === t.value ? 'active' : ''}`}
            onClick={() => handleTypeChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="filter-group">
        {/* Genre Selector */}
        <select
          className="select-control"
          value={filter.genre || 'all'}
          onChange={(e) => handleGenreChange(e.target.value)}
          aria-label="Filter by genre"
        >
          {GENRES.map((g) => (
            <option key={g} value={g === 'All Genres' ? 'all' : g}>
              {g}
            </option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          className="select-control"
          value={filter.year}
          onChange={(e) => handleYearChange(e.target.value)}
          aria-label="Filter by year"
        >
          <option value="">Any Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="201">2010s</option>
          <option value="200">2000s</option>
          <option value="199">1990s</option>
        </select>

        {/* Sort Options */}
        <select
          className="select-control"
          value={filter.sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          aria-label="Sort movies"
        >
          <option value="rating-desc">Highest Rated</option>
          <option value="year-desc">Newest First</option>
          <option value="year-asc">Oldest First</option>
          <option value="title-asc">Title (A-Z)</option>
        </select>

        {isFiltered && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      {/* Info Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: 'space-between', marginTop: '0.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>
          Found <strong style={{ color: 'var(--text-primary)' }}>{totalResults}</strong> titles
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`source-badge ${source}`}>
            <Sparkles size={12} />
            {source === 'omdb' ? 'Live OMDb Data' : 'Curated Offline Dataset'}
          </span>
        </div>
      </div>
    </div>
  );
};
