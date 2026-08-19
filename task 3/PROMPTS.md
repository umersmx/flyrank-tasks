# Prompt Engineering Log — CinePulse AI (FE-03)

This document captures the structured prompts and iterative refinements used with AI development assistants to build **CinePulse AI**, satisfying FlyRank Week 3 assignment requirements.

---

## 🎯 Development Prompt Sequence

### 1. Phase 1: Architectural Foundation & ViewModel Separation
```text
Role: Senior React & TypeScript Architect.
Goal: Design the core data architecture for a movie & media discovery application named "CinePulse AI".
Requirements:
1. Define strict TypeScript interfaces for MovieSummary, MovieDetail, OmdbSearchResponse, FilterState, and WatchlistItem.
2. Follow the MVVM / Custom Hook pattern to separate presentation components from data-fetching and state logic.
3. Design a useMovieSearch hook that handles query debouncing, media type filtering (movies, series, episodes), year filters, sort orders, and pagination.
4. Integrate AbortController to cancel stale inflight network requests when the user types rapidly.
Output: Strict TypeScript definitions and the useMovieSearch ViewModel hook.
```

### 2. Phase 2: Resilient API Client with Fallback Mock Dataset
```text
Task: Implement the OMDb API service layer in `src/services/omdbApi.ts` with graceful offline fallback.
Specifications:
1. Provide in-memory caching for query and detail lookups to avoid redundant API hits.
2. Support custom user OMDb API keys stored in localStorage.
3. Provide a fallback dataset of 15+ curated blockbuster titles (Inception, Interstellar, The Dark Knight, Oppenheimer, etc.) with complete synopsis, ratings, and cast info so the app runs out-of-the-box without requiring an API key.
4. Ensure all network fetch calls accept an optional AbortSignal and handle network failures gracefully.
```

### 3. Phase 3: Watchlist State Management & Analytics
```text
Task: Build a custom hook `useWatchlist` managing user bookmarks, watch status, and personal ratings.
Specifications:
1. Persist state in localStorage with error handling for quota and corrupted data.
2. Actions: addToWatchlist, removeFromWatchlist, updateStatus (planned | watching | completed), updateUserRating (1-5 stars), updateNotes (custom review text).
3. Compute derived analytics: total saved, completion count, in-progress count, planned count, average personal rating, and media format ratios (movies vs TV series).
```

### 4. Phase 4: Accessible Component System & Glassmorphic Dark UI
```text
Task: Build modern React 18 UI components with Lucide icons and Vanilla CSS.
Components:
- Navbar: Brand logo, API key modal trigger, analytics trigger, and watchlist count badge.
- SearchBar: Debounced input with clear button and accessible ARIA attributes.
- FilterBar: Media format tabs, genre picker, year selector, and sorting dropdown.
- MovieCard: Image error handling with fallback placeholder, bookmark toggle with stopPropagation, and keyboard navigation (Enter/Space to open details).
- MovieModal: Comprehensive dialog with Escape key listener, full plot synopsis, rating badges (IMDb, Metacritic), director/cast metadata table, and review notes editor.
- WatchlistDrawer: Side panel with search, status filtering, rating stars, and clear all.
- StatsModal: Visual analytics dashboard with progress bars.
```

### 5. Phase 5: Automated Testing with Vitest
```text
Task: Write unit tests for custom hooks and service functions using Vitest and @testing-library/react.
Test coverage:
- useDebounce: Verify timer delay, immediate return, and timer cleanup.
- useWatchlist: Verify initialization, add/remove items, status update, user rating, and statistics calculation.
- omdbApi: Verify search filter execution and mock fallback dataset query matching.
```
