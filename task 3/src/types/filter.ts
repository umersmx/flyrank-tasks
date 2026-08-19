export type MediaTypeFilter = 'all' | 'movie' | 'series' | 'episode';

export type SortOption = 'year-desc' | 'year-asc' | 'title-asc' | 'rating-desc';

export interface FilterState {
  query: string;
  type: MediaTypeFilter;
  year: string;
  genre: string;
  sortBy: SortOption;
