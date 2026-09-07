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
