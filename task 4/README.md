# Task 4: Capstone Skeleton, Deployed (FE-04)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-brightgreen.svg)](https://vitest.dev)
[![Deployment](https://img.shields.io/badge/Vercel-Deployed-000000.svg)](https://smxai-flyrank.vercel.app/)

> **Track**: Frontend AI Engineering · **Code**: `FE-04` · **Phase**: Foundations · **Estimated Hours**: 4h

This directory contains the production-ready skeleton for **SMX AI**, an AI-powered Generative UI platform and the official capstone project for the FlyRank Frontend AI Engineering track.

---

## 🌐 Live Preview & Telemetry Links

- **Live Preview URL**: [https://smxai-flyrank.vercel.app/](https://smxai-flyrank.vercel.app/)
- **Live System Health Check**: [https://smxai-flyrank.vercel.app/health](https://smxai-flyrank.vercel.app/health)
- **JSON Telemetry API**: [https://smxai-flyrank.vercel.app/api/health](https://smxai-flyrank.vercel.app/api/health)
- **GitHub Repository**: [https://github.com/umersmx/flyrank-tasks](https://github.com/umersmx/flyrank-tasks)

---

## 🗺️ Routed Screens in the Spec

| Route | Page Name | Type | Description |
|:---|:---|:---:|:---|
| `/` | **Home / Assistant** | Server | Main generative UI workspace with streaming preview blocks and prompt shortcuts. |
| `/dashboard` | **Analytics & Telemetry** | Server | Operational KPI grid, tool invocation distribution, and model latency benchmarks. |
| `/playground` | **Component Showcase** | Client | Interactive catalog testing all 5 Generative UI widgets (Weather, Stats, Tables, Charts, Products). |
| `/settings` | **System Settings** | Client | Model selector (OpenRouter, Groq, Anthropic), temperature, and prompt configuration. |
| `/health` | **Diagnostics & Probes** | Server | Health-check page fetching and rendering live server uptime, memory, and provider probes. |
| `/api/health` | **Health Endpoint** | API | JSON endpoint returning runtime telemetry for uptime monitors. |

---

## 📋 Evaluation Criteria Adherence

1. **Preview URL loads with zero build errors**: Tested and verified with continuous preview deployments on Vercel.
2. **Every screen from the spec exists as a routed placeholder**: All 5 routes (`/`, `/dashboard`, `/playground`, `/settings`, `/health`) are implemented and accessible via navigation.
3. **Responsive at 375px and 1280px**:
   - `375px` (Mobile): Hamburger navigation drawer, stacked grids, and scrollable data tables.
   - `1280px` (Desktop): Full horizontal navbar, multi-column KPI grids, and side-by-side charts.
4. **No secrets in the repo**: All API keys are server-side only; `.env.example` provided for safe team onboarding.
5. **Server Components by default**: Interactive state is isolated inside Client Components (`"use client"`), keeping initial HTML payload lightweight and SEO-friendly.

---

## 🚀 Running Locally

```bash
# 1. Navigate to task 4
cd "task 4"

# 2. Install dependencies
npm install

# 3. Run automated tests
npm test

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```
