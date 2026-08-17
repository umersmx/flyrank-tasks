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
