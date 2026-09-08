# FlyRank Portal Submission Guide (FL Capstone)

> **Assignment**: General AI Fluency · Impact Project (Capstone)  
> **Course Track**: General AI Fluency · **Code**: FL · **Workload**: 12h

---

## 1. Submission Overview

In your FlyRank dashboard assignment modal on the right side:
- **Deliverable Links**: Enter your public repository URLs.
- **Notes**: Enter concise context for the reviewer.
- **Files**: Upload your capstone document, calendar reminder, or screenshot.

---

## 2. Field-by-Field Submission Content

### Field 1: `Deliverable Links`
*Note: One public `https://` URL per line.*

Paste your GitHub repository links:
```text
https://github.com/umersmx/ai-fluency-capstone
https://github.com/umersmx/ai-fluency-capstone/blob/main/CAPSTONE_IMPACT_PROJECT.md
```
*(Monorepo mirror: https://github.com/umersmx/flyrank-tasks/tree/main/ai-fluency%20capstone)*

---

### Field 2: `Notes` (Context for Reviewers)

Copy and paste the following text into the **Notes** box:

```text
Submission for General AI Fluency · Impact Project (Capstone)

Summary of Deliverables:
1. 'How to Add the Next Case' SOP: Concrete 5-step engineering pipeline detailing exactly where new case studies live (src/data/cases.ts), how the 3-beat interview runs in Claude, how the Voice Card audits the draft, and how conventional commits trigger CI/CD deployment in under 20 minutes.
2. Named Next Real Piece of Work: Selected 'Semantic Movie Discovery & Resilient Watchlist Engine' (Task 3 from active repository). Pre-framed into the Three Beats (Problem: keystroke network thrashing and modal focus traps; What I Did: AbortController debounce hook, schema-guarded localStorage cache, WCAG AA modal focus trapping; What Came of It: 75% traffic cut, 0ms input lag, 100/100 accessibility).
3. Evidence of Reminder Set: Configured recurring bi-weekly reminder alarms with an exportable standard iCalendar (.ics) file included in the repository (next-case-reminder.ics).
4. Preserved Build Context: Fully documented persistent Claude Project ('Portfolio Build - Muhammad Umer') containing identity kit, standing Voice Card, technical guidelines, and past case history to ensure future updates require zero cold starts.
5. Build-in-Public Launch Story: 250-word authentic post highlighting one real win (decoupling streaming token buffers with a 50ms throttle for 60fps UI) and one real limitation (failed regex JSON parsing replaced with schema validation).

Repository Folder: https://github.com/umersmx/flyrank-tasks/tree/main/ai-fluency%20capstone
```

---

### Field 3: `Files` (What to Upload)

The brief requires:
> *"The short 'how to add the next case' note + the named next piece + evidence of the reminder set."*

Click **Choose Files** and upload:
1. **`CAPSTONE_IMPACT_PROJECT.md`** from `ai-fluency capstone/CAPSTONE_IMPACT_PROJECT.md` (or export it as a PDF).
2. **`next-case-reminder.ics`** (the iCalendar reminder file).
3. *(Optional)* A screenshot of your active Claude Project workspace or calendar event.

---

## 3. Evaluation Checklist (Pass / Revise)

- [x] **Concrete "how to add the next case" note**: Documented 5-step SOP with exact codebase paths and Three-Beat structure.
- [x] **Specific next piece of work named**: Real project (*Semantic Movie Discovery & Watchlist Engine*) pre-framed with honest trade-offs.
- [x] **Reminder set with evidence**: Dedicated iCalendar `.ics` file generated with bi-weekly recurrence and alarms.
- [x] **Build context preserved**: Claude Project instructions, Voice Card, and knowledge library fully preserved.
- [x] **Honest launch story**: Documents real streaming win and real regex failure.
