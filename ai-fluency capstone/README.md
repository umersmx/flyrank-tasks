# General AI Fluency · Impact Project (FL Capstone)

[![Track: General AI Fluency](https://img.shields.io/badge/Track-General%20AI%20Fluency-blue.svg)](#)
[![Type: Capstone](https://img.shields.io/badge/Type-Capstone-green.svg)](#)
[![Code: FL](https://img.shields.io/badge/Code-FL-orange.svg)](#)
[![Workload: 12h](https://img.shields.io/badge/Workload-12h-purple.svg)](#)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-success.svg)](#)

> **Assignment Reference**: [General AI Fluency · Impact Project / Send the Link (FlyRank Week 10)](https://aifluency.flyrank.ai/week-10.html#send-the-link)  
> **Author**: Muhammad Umer  
> **Track**: Frontend AI Engineering (React 19 / TypeScript)

---

## 📌 Executive Summary

> *"A portfolio that never gets a second project goes stale and stops proving anything new. The difference between a class artifact and a career platform is one simple habit, set up now while you still remember how everything works."*

This repository directory contains the **Impact Project Capstone Deliverables** for the FlyRank General AI Fluency track. 

Rather than treating the portfolio as a one-time class project that decays the moment the cohort ends, this capstone establishes a sustainable, low-friction **operating system for ongoing portfolio growth**:
1. A 5-step standard operating procedure for drafting, vetting, and committing future case studies in under 20 minutes.
2. A concrete, named next project from my active development pipeline (*Semantic Movie Discovery & Watchlist Engine*).
3. A verified iCalendar reminder file (`next-case-reminder.ics`) to enforce a recurring maintenance habit.
4. A permanently preserved Claude Project build context ensuring future updates require only a quick conversation rather than a cold rebuild.
5. An authentic build-in-public story documenting one real architectural win and one real engineering break.

---

## 📂 Deliverables Directory Structure

```
ai-fluency capstone/
├── README.md                            # Master capstone showcase, executive summary & compliance matrix
├── CAPSTONE_IMPACT_PROJECT.md           # Primary deliverable: Full SOP, named next project, reminder specs, preserved context & story
├── CLAUDE_PROJECT_CAPSTONE_PRESERVED.md # Permanent Claude Project configuration & knowledge base documentation
├── next-case-reminder.ics               # Standard iCalendar (.ics) file with recurring bi-weekly reminder alarms
└── SUBMISSION_TEMPLATE.md               # Ready-to-copy portal URLs, reviewer notes, and file upload instructions
```

---

## 🛠️ 1. The "How to Add the Next Case" SOP (In 5 Steps)

* **Exact Codebase Location**: `src/data/cases.ts` (mapped dynamically to `/#work` via `CaseStudyCard.tsx`).
* **The 20-Minute Pipeline**:
  1. **Isolate Artifacts**: Gather a 10-second UI video clip, the GitHub PR/commit, and one honest break/lesson.
  2. **Run the 5-Min Claude Interview**: Use the preserved Claude Project with the quick-prompt to extract the Three Beats (*Problem, What I Did & Decided, What Came of It*).
  3. **Voice Card Audit**: Check against `Direct. Candid. Plain. Technically precise. No buzzwords.` Cut corporate filler.
  4. **Append to `src/data/cases.ts`**: Insert the new typed case study object.
  5. **Conventional Commit & Deploy**: Commit with `feat(portfolio): add {name} case study` and push to main for automatic deployment.

---

## 🎯 2. The Named Next Real Piece of Work

* **Project Title**: **Semantic Movie Discovery & Resilient Watchlist Engine** (Task 3 in `flyrank-tasks`)
* **Pre-Framed Three Beats**:
  - **Beat 1: The Problem**: Keystroke search requests triggered TMDB rate limits, network thrashing, and erratic UI race conditions where older requests overwrote newer ones. Modals caused keyboard focus traps.
  - **Beat 2: What I Did & Decided**: Built an AbortController-backed `useDebounce` hook to cancel pending HTTP requests, implemented schema-guarded localStorage caching, and enforced WCAG 2.1 AA keyboard focus trapping in `MovieModal`. *Discarded client-side full regex search on 2,000 items due to 120ms thread blocking.*
  - **Beat 3: What Came of It**: Cut redundant API traffic by 75%, achieved 0ms perceived input lag, and scored 100/100 on accessibility. *Next time: offload fuzzy matching to an IndexedDB web worker.*

---

## ⏰ 3. Concrete Reminder Set (iCalendar Export)

* **Reminder Event**: `[Portfolio Maintenance] Ship Next Case Study: Semantic Movie Discovery`
* **Trigger Schedule**: Bi-weekly on Mondays at 10:00 AM.
* **Asset**: Standalone importable [`next-case-reminder.ics`](file:///c:/Users/umerf/Desktop/Code/flyrank-tasks/ai-fluency%20capstone/next-case-reminder.ics) configured with 15-minute popup alarm triggers.

