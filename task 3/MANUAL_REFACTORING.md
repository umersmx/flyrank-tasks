# Manual Improvements, Corrections & Refactorings (FE-03)

This document details the concrete mistakes, performance pitfalls, and edge cases caught in AI-generated code during the development of **CinePulse AI**, along with the manual engineering fixes applied.

---

## 🔍 Overview of Deficiencies Caught

| # | Category | AI Initial Proposal | Manual Fix / Refactoring | Impact |
|---|---|---|---|---|
| **1** | **Concurrency / Race Condition** | Uncontrolled `fetch()` in `useEffect` | Added `AbortController` in `useRef` to cancel stale inflight requests | Prevents out-of-order query responses from overwriting active state |
| **2** | **Memory Leak** | Raw `setTimeout` without lifecycle cleanup | Encapsulated into reusable `useDebounce` hook with `clearTimeout` | Eliminates memory leaks and unmounted component state updates |
| **3** | **Broken Image Resilience** | Direct `<img src={Poster} />` rendering | Added `onError` event handler and custom glassmorphic placeholder | Prevents broken image icons when OMDb returns dead/unreachable poster URLs |
| **4** | **Event Bubbling** | Unintercepted card action clicks | Applied `e.stopPropagation()` on watchlist bookmark button | Stops modal from unintentionally opening when user clicks the bookmark button |
| **5** | **Accessibility (a11y)** | Unfocusable `<div>` cards and modals | Added `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space), and Escape key listener | Achieves full keyboard navigability and WCAG AA compliance |
| **6** | **Storage Resilience** | Unchecked `JSON.parse()` on `localStorage` | Added defensive `try/catch` and array runtime validation | Eliminates crashes from corrupt or quota-restricted browser storage |

---

## 🛠️ Deep Dive: Refactoring Examples

### 1. Eliminating Async Race Conditions with `AbortController`

#### ❌ AI-Generated Code (Vulnerable to Race Conditions):
```typescript
// AI Draft: Rapid keystrokes trigger multiple queries.
// If query "D" finishes after query "Dune", the UI displays stale results for "D".
useEffect(() => {
  setLoading(true);
  searchMovies(query).then((res) => {
    setMovies(res.movies);
    setLoading(false);
  });
}, [query]);
```

#### ✅ Manual Refactoring:
```typescript
// Refactored in useMovieSearch.ts:
const abortControllerRef = useRef<AbortController | null>(null);

const executeSearch = useCallback(async () => {
  if (abortControllerRef.current) {
    abortControllerRef.current.abort(); // Cancel previous in-flight request
  }

  const controller = new AbortController();
  abortControllerRef.current = controller;

  setLoading(true);
  try {
    const result = await searchMovies(activeFilter, page, controller.signal);
    setMovies(result.movies);
    setTotalResults(result.total);
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return; // Gracefully ignore intentional cancellation
    }
    setError(err instanceof Error ? err.message : 'Search failed');
  } finally {
    setLoading(false);
  }
}, [debouncedQuery, filter, page]);
```

---

### 2. Preventing Card Event Bubbling

#### ❌ AI-Generated Code:
```tsx
// AI Draft: Clicking the bookmark button triggers card onClick, opening the modal
<div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
  <button onClick={() => onToggleWatchlist(movie)}>Bookmark</button>
</div>
```

#### ✅ Manual Refactoring:
```tsx
// Refactored in MovieCard.tsx:
const handleWatchlistClick = (e: React.MouseEvent) => {
  e.stopPropagation(); // Prevents triggering card onSelect modal
  onToggleWatchlist(movie);
};

<article
  className="movie-card"
  onClick={() => onSelect(movie.imdbID)}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="button"
  aria-label={`${movie.Title}, ${movie.Type} released in ${movie.Year}`}
>
  {/* ... */}
  <button
    type="button"
    className={`card-watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
    onClick={handleWatchlistClick}
    aria-label={inWatchlist ? `Remove ${movie.Title}` : `Add ${movie.Title}`}
  >
    <Bookmark size={18} fill={inWatchlist ? '#ffffff' : 'none'} />
  </button>
</article>
```

---

### 3. Defensive LocalStorage Initialization

#### ❌ AI-Generated Code:
```typescript
// AI Draft: Throws unhandled TypeError if storage contains malformed JSON
const [watchlist, setWatchlist] = useState(
  JSON.parse(localStorage.getItem('watchlist') || '[]')
);
```

#### ✅ Manual Refactoring:
```typescript
// Refactored in useWatchlist.ts:
const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load watchlist from localStorage:', e);
  }
  return [];
});
```
