# Task 3: React App Development with AI (FE-03)

[![Vitest](https://img.shields.io/badge/Vitest-Passing-brightgreen.svg)](https://vitest.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg)](https://vitejs.dev)

> **Track**: Frontend AI Engineering · **Week**: 3 · **Phase**: Foundations · **Estimated Hours**: 6h

This directory contains **CinePulse AI**, a production-grade movie and media discovery application built with React, TypeScript, and Vite using AI as a pair programming development assistant.

---

## 🌟 Application Features

- 🔍 **Real-time Debounced Search**: Fast querying across movies, series, and episodes with active debouncing (450ms) and automatic request cancellation via `AbortController`.
- 🌐 **OMDb API Integration & Fallback Mode**: Full support for custom user OMDb API keys alongside a rich offline mock dataset (15+ blockbuster titles), ensuring immediate functionality without requiring API keys.
- 📑 **Watchlist State Management**: Add/remove titles, update status (`Planned`, `Watching`, `Completed`), assign 1-5 star ratings, and write personal reviews saved to `localStorage`.
- 📊 **Analytics Dashboard**: Real-time stats computing total titles saved, format ratio (Movies vs TV Series), completion rate %, and average personal ratings.
- 🎛️ **Advanced Filtering & Sorters**: Filter by media type, genre tags, release year, and sort by rating, release date, or title.
- 🎬 **Deep-Dive Details Modal**: High-resolution poster preview, IMDb/Metacritic rating cards, synopsis, cast, director, box office figures, and link sharing.
- ♿ **WCAG 2.1 AA Accessibility & Keyboard Nav**: Escape key modal closing, tab indexing, Enter/Space card inspection, and ARIA labels.

---

## 📁 Project Structure

```
task 3/
├── .cursorrules               # Cursor IDE rules for task 3
├── CLAUDE.md                  # Development guidelines for Claude Code
├── PROMPTS.md                 # Complete log of prompts used during development
├── AI_ASSISTANCE.md           # Breakdown of how AI assisted throughout the lifecycle
├── MANUAL_REFACTORING.md      # Concrete examples of manual improvements & bug fixes
├── README.md                  # Project overview and setup instructions
├── index.html                 # HTML5 entry with Google Fonts
├── package.json               # Dependencies and build/test scripts
├── tsconfig.json              # Strict TypeScript configuration
├── vite.config.ts             # Vite & Vitest configuration
└── src/
    ├── main.tsx               # React DOM root
    ├── App.tsx                # Main container
    ├── index.css              # Glassmorphic dark design system
    ├── types/
    │   ├── movie.ts           # Movie & Watchlist data interfaces
    │   └── filter.ts          # Search and filter types
    ├── services/
    │   ├── omdbApi.ts         # OMDb API client with in-memory caching
    │   └── mockData.ts        # 15+ curated blockbuster dataset
    ├── hooks/
    │   ├── useDebounce.ts     # Debounce utility hook
    │   ├── useMovieSearch.ts  # MVVM search hook with AbortController
    │   ├── useWatchlist.ts    # LocalStorage watchlist state & analytics
    │   └── useMovieDetails.ts # Single title detail fetcher
    ├── components/
    │   ├── Navbar.tsx         # Brand header with actions
    │   ├── SearchBar.tsx      # Debounced search bar
    │   ├── FilterBar.tsx      # Filter & sort controls
    │   ├── MovieGrid.tsx      # Grid renderer with loading skeletons
    │   ├── MovieCard.tsx      # Poster card with bookmark toggle
    │   ├── MovieModal.tsx     # Fullscreen title intelligence modal
    │   ├── WatchlistDrawer.tsx# Saved titles side drawer
    │   ├── StatsModal.tsx     # Watchlist analytics dashboard
    │   └── ApiKeyModal.tsx    # OMDb API key switcher
    └── test/
        ├── setup.ts           # Vitest environment & localStorage mock
        ├── useDebounce.test.ts# Debounce timing tests
        ├── useWatchlist.test.ts# Watchlist state & stats tests
        └── omdbApi.test.ts    # Service query tests
```

---

## 🚀 Running Locally

```bash
# 1. Navigate to task 3
cd "task 3"

# 2. Install dependencies
npm install

# 3. Run automated tests
npm test

# 4. Start local development server
npm run dev

# 5. Typecheck & production build
npm run build
```

---

## 📑 Required Assignment Deliverables

Per FlyRank Week 3 assignment instructions:
1. **The completed application**: React + TypeScript source files in `src/`.
2. **Prompts used during development**: Documented in [PROMPTS.md](PROMPTS.md).
3. **Explanation of AI assistance**: Documented in [AI_ASSISTANCE.md](AI_ASSISTANCE.md).
4. **Examples of manual improvements & refactoring**: Documented in [MANUAL_REFACTORING.md](MANUAL_REFACTORING.md).
