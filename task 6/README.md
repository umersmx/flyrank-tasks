# Task 6: Streaming AI Chat Interface (FE-06)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-brightgreen.svg)](https://vitest.dev)
[![Deployment](https://img.shields.io/badge/Vercel-Deployed-000000.svg)](https://smxai-flyrank.vercel.app/)

> **Track**: Frontend AI Engineering · **Code**: `FE-06` · **Phase**: Build (core) · **Estimated Hours**: 6h  
> **Course Reference**: [Streaming AI Chat Interface (FlyRank FE-06)](https://internship.flyrank.ai)  
> **Author**: Muhammad Umer  
> **Capstone Integration**: SMX AI Generative Chat Engine

---

## 📌 Executive Summary

> *"Streaming chat is the defining UI pattern of the AI era and the heart of most 2026 frontend job postings."*

This repository contains the complete production implementation for **FE-06: Streaming AI Chat Interface**. 

Built as the core interaction engine for **SMX AI**, this application implements an edge-ready, token-by-token streaming conversation flow powered by Claude 3.5 Sonnet over Server-Sent Events (SSE). It strictly isolates all API credentials to the server layer and rigorously solves the four notorious UI streaming failure modes:
1. **Auto-Scroll Pinning**: Pins to the bottom while the user is reading live tokens, automatically releases the pin the instant the user scrolls up, and displays a floating **"Jump to latest ↓"** badge with unread token counts.
2. **State-Resilient Stop Handling**: Treats aborting as a state machine transition rather than a UI toggle—partial tokens persist, the input instantly re-enables, and subsequent sends seamlessly build on prior conversation turns without state corruption ("Stop, then send again" works every time).
3. **Zero-Flicker Thinking Handoff**: The thinking indicator cross-fades directly into the active streaming message without blank frames or layout jumping.
4. **Defensive Streaming Markdown**: Safely buffers incomplete markdown code fences and symbols to prevent layout thrashing and Cumulative Layout Shift (CLS).

---

## 📂 Project Structure

```
task 6/
├── README.md                      # Master architecture, test report & compliance matrix
├── SUBMISSION_TEMPLATE.md         # Ready-to-copy portal submission fields (Links, Notes, Uploads)
├── package.json                   # Dependencies: next, react, lucide-react, vitest
├── tsconfig.json                  # TypeScript strict configuration
├── tailwind.config.ts             # Design tokens matching SMX AI design system
├── vitest.config.ts               # Test runner configuration
├── .env.example                   # Server-side environment variables template
└── src/
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts       # Server Route Handler: Claude API + SSE stream transform
    │   ├── globals.css            # Design tokens, custom scrollbars, reduced-motion styles
    │   ├── layout.tsx             # Root Layout with mobile-first viewport meta
    │   └── page.tsx               # Main Chat Workspace & header navigation
    ├── components/
    │   └── chat/
    │       ├── StreamingChat.tsx  # Master chat orchestrator with auto-scroll logic
    │       ├── ChatMessage.tsx    # Distinct User / Assistant bubbles, code blocks & copy
    │       ├── ChatInput.tsx      # Mobile-friendly auto-resizing textarea with stop/send controls
    │       ├── ThinkingIndicator.tsx # Zero-flicker thinking-to-token handoff widget
    │       └── ScrollToBottomButton.tsx # Smart "jump to latest" button with unread badge
    ├── hooks/
    │   └── useStreamingChat.ts    # Custom resilient SSE stream hook with abort & localStorage
    ├── lib/
    │   ├── ai/
    │   │   ├── config.ts          # Centralized, well-commented system prompt and model params
    │   │   └── mock-stream.ts     # Realistic token generator for zero-key review and testing
    │   └── utils.ts               # cn() utility and formatting helpers
    └── test/
        ├── setup.ts               # Vitest environment setup with mocks
        ├── useStreamingChat.test.ts # Stream assembly, stop state, and multi-turn tests
        └── StreamingChat.test.tsx # Component UI tests (keyboard shortcuts, stop button)
```

---

## 🏗️ Architecture & Implementation Highlights

### 1. Server Route Handler (`src/app/api/chat/route.ts`)
- **Server-Side API Key Isolation**: `ANTHROPIC_API_KEY` is never prefixed with `NEXT_PUBLIC_` and never bundled into client JS.
- **SSE Stream Protocol**: Implements `text/event-stream` with `X-Accel-Buffering: no` to prevent intermediate proxies (NGINX, Cloudflare) from buffering tokens.
- **Zero-Key Reviewer Fallback**: When `ANTHROPIC_API_KEY` is not present (e.g. running on public review deploys or local test setups), the route gracefully falls back to `mock-stream.ts`, emitting realistic tokens at 15–35ms intervals so reviewers can immediately test token-by-token streaming, stopping, and multi-turn persistence without paying for an API key.

### 2. Centralized Model Configuration (`src/lib/ai/config.ts`)
- The system prompt, model parameters (`claude-3-5-sonnet-20241022`), max token limits (`1024`), temperature (`0.7`), and conversation history cutoffs (`10` turns) live in a single, well-commented module.

### 3. Client State & The 4 Mentor Tips
- **Mentor Tip 1 (Smart Auto-Scroll)**:
  `checkIfAtBottom` measures `scrollHeight - scrollTop - clientHeight < 60px`. If the user scrolls up to review prior code, auto-scrolling is released immediately, and a floating button appears with the unread token count.
- **Mentor Tip 2 (State-Resilient Stop Button)**:
  Aborting cancels the network stream, flags the assistant message with `isStopped: true`, commits the partial text to state and `localStorage`, and instantly re-enables the textarea. Sending another prompt ("Stop, then send again") works without history corruption.
- **Mentor Tip 3 (Thinking-to-Token Handoff)**:
  `ThinkingIndicator` transitions smoothly into `ChatMessage` via CSS opacity handoffs, eliminating blank-frame flickers.
- **Mentor Tip 4 (Defensive Markdown)**:
  Text streams render inside whitespace-safe containers with blinking active cursor tags, preventing layout snapping during mid-stream chunks.

### 4. Stretch Goals Implemented
- **Motion Pass**: Choreographed micro-interactions for message entry and buttons, with full `@media (prefers-reduced-motion: reduce)` support.
- **LocalStorage Persistence**: Messages automatically save to `localStorage` (`smx_ai_chat_history_v1`) and rehydrate on page load with a clean "Clear Chat" action.

---

## 🧪 Automated Testing & Verification

Run the Vitest test suite:
```bash
cd "task 6"
npm test
```

### Verified Test Cases:
1. **Initial State**: Verifies clean initialization with `status: 'idle'` and empty messages.
2. **Token-by-Token Streaming**: Validates that incoming SSE chunks are decoded and appended progressively into a completed assistant message.
3. **Mid-Stream Abort & Persistence**: Confirms that clicking Stop persists the partial message, marks it stopped, and re-enables the input.
4. **"Stop, Then Send Again"**: Validates that stopping turn 1 and immediately sending turn 2 correctly preserves both turns in conversation history without state corruption.
5. **Component Integration**: Validates empty-state suggestion buttons, textarea auto-resizing, and send/stop button toggle behavior.

---

## ✅ Evaluation Criteria Compliance Matrix

| Evaluation Criteria | Requirement | Task 6 Implementation Detail | Status |
| :--- | :--- | :--- | :---: |
| **1. Token-by-token streaming** | Responses visibly stream token by token. | Consumes SSE chunks with animated cursor and incremental state updates. | 🟢 **PASS** |
| **2. Mid-stream stop without breaking** | Generation can be stopped mid-stream without breaking state. | AbortController cleanly halts stream; partial text commits to history; input re-enables. | 🟢 **PASS** |
| **3. Conversation state survives turns** | Conversation state survives multiple turns. | Multi-turn history preserved in React state and persisted to `localStorage`. | 🟢 **PASS** |
| **4. API key server-side only** | API key lives server-side only. | `ANTHROPIC_API_KEY` read only in `/api/chat/route.ts`; zero client exposure. | 🟢 **PASS** |
| **5. Usable at phone width** | Usable at phone width (375px). | Responsive layout with auto-expanding textarea, touch targets, and mobile padding. | 🟢 **PASS** |

---

## 🚀 Running Locally

```bash
# 1. Navigate to task 6
cd "task 6"

# 2. Install dependencies
npm install

# 3. Configure API Key (Optional)
cp .env.example .env.local
# Add ANTHROPIC_API_KEY=your_key (or leave empty to use realistic mock streaming)

# 4. Start local development server
npm run dev
# Open http://localhost:3000

# 5. Run test suite
npm test
```
