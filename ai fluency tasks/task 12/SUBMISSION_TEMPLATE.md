# FlyRank Portal Submission Guide (Task 12)

> **Assignment**: Three Roads: Choose Your Stack with AI  
> **Course Track**: General AI Fluency (Week 4) · **Phase**: Build · **Workload**: 2h  
> **Assignment Reference**: [https://aifluency.flyrank.ai/week-04.html#three-roads](https://aifluency.flyrank.ai/week-04.html#three-roads)

---

## 1. Submission Overview

In your FlyRank dashboard assignment modal on the right side for **"Three Roads: Choose Your Stack with AI"**:
- **Deliverable Links**: Enter your public repository URLs and live preview URLs (one per line).
- **Notes**: Enter structured technical context and decision rationale.
- **Files**: Upload your architecture document or trade-offs matrix SVG.

---

## 2. Field-by-Field Submission Content

### Field 1: `Deliverable links`
*Note: One public `https://` URL per line.*

Paste the following URLs:
```text
https://smxai-flyrank.vercel.app/
https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%2012
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%2012/THREE_ROADS_STACK_DECISION.md
```

---

### Field 2: `Notes` (Context for Reviewers)

Copy and paste the following text into the **Notes** box:

```text
Submission for Week 4: Three Roads: Choose Your Stack with AI (General AI Fluency)

Summary of Deliverables:
1. Four Strict Grounding Constraints:
   - Free only (zero monthly fees forever).
   - Honest skill level (Proficient in React/TypeScript/Tailwind, strict 2-week deadline).
   - Sitemap & content map execution (5-stage content flow from Task 10).
   - Display requirements: Must natively showcase interactive React 19 token streaming sandboxes, code diffs, and responsive touch controls.
   - The Backend Question: Answered honestly: "Not Yet" (zero persistent databases; serverless route handlers only).

2. Three Genuine Architectural Roads Evaluated:
   - Road 1 (Simplest): Vanilla HTML5 + Tailwind CDN on GitHub Pages (100% static).
     Trade-off: Fails to show my work well—imperative DOM manipulation directly contradicts my claim as a React 19 / TypeScript engineer.
   - Road 2 (Balanced): React 19 + Vite (SPA) on Netlify / Cloudflare Pages.
     Trade-off: Great developer experience, but duplicates effort since my Capstone is already live on Next.js 14.
   - Road 3 (Chosen Winner): Next.js 14 App Router on Vercel Edge Network.
     Trade-off: Requires managing Next.js runtime defaults, but delivers 100% component and token reuse with the Capstone.

3. Authentic Personal Rationale ("Can I maintain this?"):
   - "I chose Next.js 14 on Vercel because it is already live, verified, and shares direct parity with my SMX AI Capstone. I can maintain this within two weeks because I answered the backend question honestly: 'Not yet'. There are zero databases, zero authentication systems, and zero stateful servers to babysit."

Master Directory: https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%2012
```

---

### Field 3: `Files` (What to Upload)

The brief requires:
> *"The written rationale (chosen stack + alternatives considered + why)."*

Click **Choose Files** and upload:
1. **`THREE_ROADS_STACK_DECISION.md`** (or export to PDF).
2. **`stack-tradeoffs-matrix.svg`** (Visual architectural comparison matrix).

Then click **Save submission**.

---

## 3. Evaluation Checklist (Pass / Revise)

- [x] **Three genuine options with trade-offs were considered**: Road 1 (Vanilla), Road 2 (Vite), Road 3 (Next.js).
- [x] **The chosen stack is free, matches real needs, and displays work properly**: Next.js 14 on Vercel Hobby Tier.
- [x] **The rationale is in own words and includes "can I maintain this"**: Authentic first-person engineering voice.
- [x] **The backend question is answered honestly**: Answered "Not yet" (static-first client architecture).
