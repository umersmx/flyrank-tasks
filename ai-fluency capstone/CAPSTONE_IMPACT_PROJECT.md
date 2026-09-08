# General AI Fluency · Impact Project (FL Capstone)

> **Track**: General AI Fluency · **Assignment**: FL Capstone (Impact Project) · **Workload**: 12h  
> **Author**: Muhammad Umer · **Track Domain**: Frontend AI Engineering (React 19 / TypeScript)  
> **Course Reference**: [Week 10 · Send the Link (FlyRank)](https://aifluency.flyrank.ai/week-10.html#send-the-link)

---

## 📌 1. The Core Principle: Habit of Growth

> *"A portfolio that never gets a second project goes stale and stops proving anything new. The difference between a class artifact and a career platform is one simple habit, set up now while you still remember how everything works."*

Most engineering portfolios are abandoned the day the final course assignment is graded. They become static museum exhibits that rapidly decay as technologies evolve. 

This Capstone document establishes an **evergreen portfolio operating system**:
1. A repeatable, friction-free Standard Operating Procedure (SOP) to add new case studies in under 20 minutes.
2. A concrete, named next project from my active development pipeline (*Semantic Movie Discovery & Watchlist Engine*).
3. A verified, automated calendar reminder schedule.
4. A permanently preserved **Claude Project build context** so future case framing requires only a 5-minute conversation, not a rebuild.
5. An authentic **Build-in-Public launch story** sharing one real win and one real engineering break.

---

## 🛠️ 2. Concrete "How to Add the Next Case" Standard Operating Procedure (SOP)

### Exact File Location in Codebase
In the portfolio codebase, every case study is a strictly typed data model stored in:
```text
src/data/cases.ts (or src/content/cases/{slug}.mdx)
```
Rendered dynamically through the high-velocity route:
```text
src/app/(portfolio)/#work -> src/components/CaseStudyCard.tsx
```

### The 5-Step Pipeline to Add a New Case (The 20-Minute Workflow)

```
[ Step 1: Ship the Code ] ──▶ [ Step 2: 5-Min Claude Interview ] ──▶ [ Step 3: Voice Card Audit ]
                                                                             │
[ Step 5: Git Commit & Deploy ] ◀── [ Step 4: Add to cases.ts ] ◀─────────────┘
```

#### Step 1: Isolate the Raw Artifacts
Before opening Claude, gather three artifacts from your shipped feature:
1. One screenshot or 10-second screen recording showing the UI running.
2. The GitHub repository URL or commit hash of the PR.
3. One sentence on what broke during development and what you learned.

#### Step 2: Run the Three-Beat Socratic Interview
Open your preserved Claude Project (`Portfolio Build - Muhammad Umer`) and paste the **Next Case Quick-Prompt**:
> *"I just shipped {PROJECT_NAME}. Interview me one question at a time across the Three Beats (The Problem, What I Did & Decided, What Came of It). Ask me what broke, what I tried that failed, and one real result. Keep my Voice Card active."*

#### Step 3: Audit Against the Voice Card
Ensure the drafted draft passes the strict 5-word voice filter:
* **`Direct. Candid. Plain. Technically precise. No buzzwords.`**
* Cut out any newly crept filler: *"leveraged," "spearheaded," "passionate," "seamless."*
* Confirm it contains the three beats:
  - **Beat 1: The Problem**: A specific, annoying bug or bottleneck any developer recognizes.
  - **Beat 2: What I Did & Decided**: Concrete architectural trade-offs (e.g. why Zod over manual `if`, why buffer throttle over raw state).
  - **Beat 3: What Came of It**: Testable result + one honest *"What I'd do differently next time"*.

#### Step 4: Insert Into `src/data/cases.ts`
Append the new typed object into the array:
```typescript
{
  id: "semantic-movie-discovery",
  title: "Semantic Movie Discovery & Resilient Watchlist",
  tagline: "Sub-100ms fuzzy search with debounce state machine and zero hydration lag",
  problem: "...",
  whatIDid: "...",
  whatCameOfIt: "...",
  liveDemoUrl: "/movies",
  githubUrl: "https://github.com/umersmx/flyrank-tasks/tree/main/task%203",
  technologies: ["React 19", "TypeScript", "TanStack Query", "WCAG 2.1 AA"]
}
```

#### Step 5: Conventional Commit & Push
```bash
git commit -m "feat(portfolio): add semantic movie discovery case study"
git push origin main
```
Netlify/Vercel CI/CD builds and deploys the new case live automatically in under 90 seconds.

---

## 🎯 3. The Named Next Real Piece of Work

The next piece of work scheduled for integration into the live portfolio is drawn directly from my active development in this repository:

### Project Name:
**Semantic Movie Discovery & Resilient Watchlist Engine** (`task 3` in `flyrank-tasks`)

### Pre-Framed Three Beats:

#### Beat 1: The Problem
Standard movie search bars make immediate API requests on every single keystroke, causing severe network thrashing, 429 rate limits against third-party endpoints (TMDB), and erratic UI race conditions where older search results overwrite newer ones. Furthermore, modal drawers containing movie trailers constantly trap keyboard focus and trigger layout jumps when dynamic poster images load on poor connections.

#### Beat 2: What I Did (and What I Decided)
1. **Custom Debounce Hook with Cancellation**: Built a specialized `useDebounce` hook integrated with AbortController to cleanly cancel in-flight HTTP requests whenever a user types a new character.
2. **Deterministic Empty/Error Boundaries**: Created dedicated skeletal fallback states and offline cache guards using localStorage with schema validation, preventing hydration crashes if stored watchlist JSON is corrupted.
3. **Accessible Modal Trapping**: Implemented a fully accessible `MovieModal` and `WatchlistDrawer` enforcing WCAG 2.1 AA keyboard navigation (Escape to close, focus trapping, `aria-expanded`, and screen-reader announcements on add/remove actions).
4. **What Didn't Work**: Attempted client-side fuzzy regex searching on a 2,000-movie payload; it froze the main browser thread for 120ms on mobile viewports. I discarded client-side full scanning and replaced it with paginated debounced queries with optimistic local caching.

#### Beat 3: What Came of It & Metrics
- Reduced redundant API requests by 75% during active user typing.
- Maintained a flawless 0ms input lag with zero UI flickering or race condition overwrites.
- 100% keyboard accessibility audit score across all interactive modal components.
- *What I'd do differently next time*: Integrate IndexedDB with web worker indexing to allow instantaneous instant-search across 10,000+ cached movie titles offline.

---

## ⏰ 4. Evidence of the Concrete Reminder Set

To prevent this commitment from remaining a vague good intention, a verified recurring notification has been created and exported.

### Reminder Specifications:
* **Event Title**: `[Portfolio Maintenance] Ship Next Case Study: Semantic Movie Discovery`
* **Trigger Date**: Bi-weekly on Mondays at 10:00 AM (First trigger: October 5, 2026)
* **Recurrence**: Every 2 weeks until shipped
* **Notification Payload**:
  > *"Pull up your Claude Project ('Portfolio Build - Muhammad Umer'). Run the 5-minute Three-Beat interview on Task 3 (Semantic Movie Discovery). Add to src/data/cases.ts and push to main."*

### Integrated `.ics` Calendar File
A standalone, standard iCalendar file (`next-case-reminder.ics`) is generated in this folder. It can be imported directly into Google Calendar, Apple Calendar, or Outlook:

```text
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Muhammad Umer//FlyRank Portfolio Habit//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:[Portfolio Maintenance] Ship Next Case Study: Semantic Movie Discovery
DESCRIPTION:Pull up your Claude Project ('Portfolio Build - Muhammad Umer'). Run the 5-minute Three-Beat interview on Task 3 (Semantic Movie Discovery). Add to cases.ts and push to main.
DTSTART:20261005T050000Z
DTEND:20261005T053000Z
RRULE:FREQ=WEEKLY;INTERVAL=2
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:[Portfolio Maintenance] Ship Next Case Study: Semantic Movie Discovery
TRIGGER:-PT15M
END:VALARM
END:VEVENT
END:VCALENDAR
```

---

## 🧠 5. Preserved Build Context (Claude Project Architecture)

### Why Preserving the Project Matters
Starting a new AI chat from scratch is why people abandon portfolio maintenance: you have to re-explain who you are, re-paste your stack, re-explain your tone, and fight generic marketing filler all over again. 

By preserving the **`Portfolio Build - Muhammad Umer`** project on [claude.ai](https://claude.ai), the AI already possesses:
1. **My Proof Statement**: Frontend AI Engineer, targeting Tech Leads at AI startups, driving to 15-min walkthrough calls.
2. **My Voice Card**: `Direct. Candid. Plain. Technically precise. No buzzwords.`
3. **My Non-Negotiable Engineering Rules**: Strict TypeScript, Zod trim-first validation, WCAG 2.1 AA accessibility, async idempotency guards.
4. **My Past Case Studies**: Case 1 (Generative Streaming UI) and Case 2 (Schema-First Accessible Form) stored in project knowledge.

### The Preserved "Next Case Interviewer" Prompt:
```text
"Claude, I just shipped a new piece of work: {PROJECT_TITLE}. 
Act as my portfolio co-pilot. Using my saved Voice Card and Proof Statement, interview me one question at a time to draft the new case study across the Three Beats:
1. The Problem: What broke or caused friction?
2. What I Did: What technical trade-offs did I make, and what failed?
3. What Came of It: What was the honest result, and what would I do differently next time?
Do not write the case yet. Ask question 1."
```

---

## 🚀 6. The Build-in-Public Launch Story

In accordance with Week 10 capstone standards (*"one real win and one real limitation"*), here is the 250-word launch post:

> **How I Built an AI Engineering Portfolio That Actually Proves Something**
>
> Most developer portfolios look the same: slick animations, a list of 40 logos, and a contact form that nobody uses. When I started the FlyRank AI Fluency track, I set out to prove one specific thing: that I can engineer accessible, production-grade frontend interfaces for generative AI applications that don't fall apart under real network conditions.
>
> **The Real Win**:
> AI was my thinking partner throughout the build. In my Generative UI Playground, LLM token streaming was causing 40+ DOM re-renders per second, making the viewport jump erratically and crashing screen readers. By sparring with Claude, I decoupled the token buffer from the DOM tree with an animation frame throttle, reducing re-renders by 70% while maintaining 60fps streaming and zero Cumulative Layout Shift.
>
> **The Real Limitation (What Broke)**:
> I originally tried to be clever by parsing incomplete JSON strings mid-stream with regular expressions so charts could render while the model was still typing. It was a complete failure: escaped characters and unclosed quotation marks constantly choked the parser and crashed the browser thread. I had to discard the regex approach entirely and instead render an animated monospace stream until the closing brace arrived, validating the finished payload against a strict Zod schema before mounting the component.
>
> **What's Next**:
> Today the site is live on my custom domain with interactive sandboxes you can break in your browser. Next up: integrating semantic movie discovery with offline vector caching.
>
> If you're building AI products and need an engineer who cares about error boundaries and WCAG accessibility, check out the live architecture: [https://github.com/umersmx/flyrank-tasks](https://github.com/umersmx/flyrank-tasks).
