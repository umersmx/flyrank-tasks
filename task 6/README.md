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
