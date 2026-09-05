# FlyRank Portal Submission Guide (Task 6 - FE-06)

> **Assignment**: FE-06: Streaming AI chat interface  
> **Course Track**: Frontend AI Engineering (Week 4) · **Phase**: Build (core) · **Workload**: 6h  
> **Assignment Reference**: FlyRank Frontend AI Engineering Track

---

## 1. Submission Overview

In your FlyRank dashboard assignment modal on the right side for **"Streaming AI chat interface (FE-06)"**:
- **Deliverable Links**: Enter your public repository URLs and preview URLs (one per line).
- **Notes**: Enter structured technical context for the reviewer.
- **Files**: Upload your test logs or architecture documentation.

---

## 2. Field-by-Field Submission Content

### Field 1: `Deliverable links`
*Note: One public `https://` URL per line.*

Paste the following links:
```text
https://smxai-flyrank.vercel.app/
https://github.com/umersmx/flyrank-tasks/tree/main/task%206
https://github.com/umersmx/flyrank-tasks/blob/main/task%206/src/app/api/chat/route.ts
https://github.com/umersmx/flyrank-tasks/blob/main/task%206/src/components/chat/StreamingChat.tsx
https://github.com/umersmx/flyrank-tasks/blob/main/task%206/src/lib/ai/config.ts
```

---

### Field 2: `Notes` (Context for Reviewers)

Copy and paste the following text into the **Notes** box:

```text
Submission for FE-06: Streaming AI Chat Interface (FlyRank Frontend AI Engineering)

Summary of Deliverables:
1. Capstone Central Interaction: Built SMX AI's central streaming assistant interface in Next.js 14 App Router, TypeScript (strict), and Tailwind CSS.
2. Server Route Handler: Edge-ready route handler (/api/chat/route.ts) calling Claude via Server-Sent Events (SSE). Strictly isolates ANTHROPIC_API_KEY to server-side only, with zero-setup streaming simulation fallback for public preview review.
3. Central Model Configuration: System prompt, model hyperparameters (Claude 3.5 Sonnet, temp 0.7, max_tokens 1024), and conversation turn limits encapsulated in src/lib/ai/config.ts.
4. Client Streaming & The 4 Mentor Tips:
   - Auto-Scroll Pinning: Pins to bottom while tokens stream, releases pin immediately when user scrolls up, and displays a floating "Jump to latest ↓" button with unread token counter.
   - State-Resilient Stop Button: Aborting cleanly commits partial text to state/localStorage, instantly re-enables textarea, and preserves conversation history for subsequent sends ("Stop, then send again" works without state corruption).
   - Zero-Flicker Thinking Handoff: CSS cross-fade seamlessly transitions Claude thinking indicator into active token stream without blank frames.
   - Defensive Streaming Markdown: Buffers streamed chunks with active cursor tag to prevent layout snapping and Cumulative Layout Shift.
5. Stretch Goals & Responsiveness:
   - LocalStorage Persistence: Automatically persists conversation turns and restores state upon page refresh with a "Clear Chat" action.
   - Motion Pass: Smooth choreographed CSS micro-animations with full @media (prefers-reduced-motion: reduce) support.
   - Mobile-Friendly: Tested and verified at 375px phone width and 1280px desktop width.
6. Automated Tests: 100% pass across Vitest unit tests verifying token streaming, abort handling, and multi-turn state.

Preview URL: https://smxai-flyrank.vercel.app/
Repository Directory: https://github.com/umersmx/flyrank-tasks/tree/main/task%206
```

---

### Field 3: `Files` (What to Upload)

The brief requires:
> *"Preview URL where a reviewer can hold a streaming conversation, plus links to the route handler and chat component."*

Click **Choose Files** and upload:
1. **`README.md`** from `task 6/README.md` (or export to PDF).
2. *(Optional)* Automated test run output or screenshot of mobile chat at 375px.

Then click **Save submission**.

---

## 3. Evaluation Checklist (Pass / Revise)

- [x] **Responses visibly stream token by token**: SSE stream progressive rendering with active cursor.
- [x] **Generation can be stopped mid-stream without breaking state**: Partial message persists; input re-enables; next send works.
- [x] **Conversation state survives multiple turns**: Full multi-turn context preserved in state and localStorage.
- [x] **API key lives server-side only**: `ANTHROPIC_API_KEY` never sent to browser client.
- [x] **Usable at phone width**: Tested responsive layout with auto-expanding textarea and touch-friendly controls.
