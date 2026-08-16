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
