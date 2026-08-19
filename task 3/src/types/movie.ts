export interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode' | string;
  Poster: string;
}

export interface RatingSource {
  Source: string;
  Value: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingSource[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode' | string;
  BoxOffice?: string;
  Production?: string;
  Response: string;
  Error?: string;
}

export type WatchlistStatus = 'planned' | 'watching' | 'completed';

export interface WatchlistItem {
  id: string; // matches imdbID
  movie: MovieDetail | MovieSummary;
  addedAt: number;
  status: WatchlistStatus;
  userRating?: number; // 1-5
  notes?: string;
}

export interface OmdbSearchResponse {
  Search?: MovieSummary[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}
