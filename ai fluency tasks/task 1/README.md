# Task 1: AI Workflow Audit and Tool Setup (FL-01)

[![Track: General AI Fluency](https://img.shields.io/badge/Track-General%20AI%20Fluency-blue.svg)](#)
[![Code: FL-01](https://img.shields.io/badge/Code-FL--01-green.svg)](#)
[![Week: 1](https://img.shields.io/badge/When-Week%201-orange.svg)](#)
[![Workload: 4h](https://img.shields.io/badge/Workload-4h-purple.svg)](#)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-success.svg)](#)

> **Phase**: Setup / Onboarding · **Author**: Muhammad Umer  
> **Course**: FlyRank AI Fluency Track

---

## 📌 Executive Summary

This repository directory contains the complete deliverables for **FL-01: AI Workflow Audit and Tool Setup**. 

The goal of this onboarding milestone is to conduct an honest, empirical audit of recurring weekly engineering and academic tasks using Ethan Mollick's *Onboarding your AI Intern* framework, initialize the core free AI toolkit (Claude, ChatGPT, Anthropic Academy), configure a dedicated Claude Project with role-aligned custom instructions, and define measurable "done well" success metrics for the three target tasks carried forward into **FL-02 through FL-04**.

---

## 📂 Deliverables Directory Structure

```
ai fluency tasks/task 1/
├── README.md                     # Master assignment documentation & executive summary
├── WORKFLOW_AUDIT.md             # 1-2 page weekly audit table (12 tasks) + 3 target tasks deep dive
├── CLAUDE_PROJECT_CONFIG.md      # Custom instructions & project setup guide for Claude.ai
├── TOOLKIT_SETUP.md              # Toolkit matrix, Anthropic Academy module 1 notes & evidence
├── SUBMISSION_TEMPLATE.md        # Exact text & instructions for the FlyRank portal submission modal
├── claude-project-configured.png # Screenshot placeholder: Configured Claude Project
└── anthropic-academy-enrolled.png# Screenshot placeholder: Anthropic Academy course enrollment
```

---

## 📋 Part 1: Weekly Workflow Audit Summary (12 Real Tasks)

> Full detailed rationale and analysis available in [WORKFLOW_AUDIT.md](file:///c:/Users/umerf/Desktop/Code/flyrank-tasks/ai%20fluency%20tasks/task%201/WORKFLOW_AUDIT.md).

| # | Recurring Task | Category | Classification | One-Line Rationale |
| :-: | :--- | :--- | :---: | :--- |
| **1** | **Physical Gym Workout Execution & Recovery** | Personal / Health | `just me` | Physical stimulus, kinesthetic feedback, and bodily fatigue cannot be delegated or simulated. |
| **2** | **Live Team Standups & Client Alignment Calls** | Professional / Comms | `just me` | Spontaneous human rapport, emotional nuance, and real-time accountability require authentic human presence. |
| **3** | **Production API Keys & Secret Management** | Security / DevOps | `just me` | Credential generation, environment vaulting, and access authorization pose unacceptable data leakage risks if exposed to LLM contexts. |
| **4** | **TypeScript DTOs & Schema Definitions (Zod)** | Frontend Engineering | `delegate to AI with review` | AI rapidly converts JSON payloads into strict Zod/TypeScript types, requiring quick verification against edge cases. |
| **5** | **Boilerplate Unit & Component Test Scaffolding** | QA / Testing | `delegate to AI with review` | Generating repetitive Vitest / React Testing Library mocks is mechanical, but test assertions must be verified manually. |
| **6** | **Changelog & Release Notes Generation** | Documentation | `delegate to AI with review` | LLMs synthesize Git commit logs into polished release summaries, needing only sanity checks for internal vs. public notes. |
| **7** | **Complex Component Architecture & State Design** | Architecture / Dev | `collaborate with AI` | High-level component tree structuring benefits from iterative sparring on performance, prop-drilling, and atomic state trade-offs. |
| **8** | **Frontend Debugging & Obscure Hydration Errors** | Engineering / Debugging | `collaborate with AI` | Analyzing stack traces and race conditions is accelerated by brainstorming potential edge cases while validating fixes in runtime. |
| **9** | **Academic Paper Synthesis & Concept Mapping** | Education / Study | `collaborate with AI` | Dissecting dense algorithmic or distributed systems papers requires interactive probing, counter-examples, and clarifying questions. |
| **10** | **Technical Cover Letters & Proposal Framing** | Career / Outbound | `collaborate with AI` | Combining personal voice and achievements with AI structuring produces compelling outreach without sounding generic. |
| **11** | **Git Pre-Commit Linting & Code Formatting** | Tooling / Quality | `fully automate` | Deterministic Husky/ESLint/Prettier hooks run instantly on staged files with zero manual cognitive overhead or review needed. |
| **12** | **Weekly Dependency Vulnerability Scanning** | Maintenance / Security | `fully automate` | Scheduled GitHub Dependabot and `npm audit` bots identify and submit PRs for CVE patches autonomously. |

---

## 🎯 Part 2: Three Target Tasks for FL-02 to FL-04 (With Success Definitions)

### 1. TypeScript Interface & Zod Schema Scaffolding (Target for FL-02)
* **Goal**: Transform API responses, payload schemas, and form fields into strict, type-safe TypeScript interfaces and Zod validation schemas.
* **"Done Well" Success Definition**:
  - Compiles under strict mode (`noImplicitAny: true`) with zero errors.
  - Covers 100% of union discriminators, optional parameters, and nullability without `any`.
  - Passes validation against real sample API fixtures with 0 runtime schema violations.
  - Cycle time reduced from 25 minutes to under 3 minutes.

### 2. Frontend Bug Triage & Root Cause Analysis (Target for FL-03)
* **Goal**: Rapidly diagnose obscure runtime exceptions, hydration mismatches, and race conditions in React 19/Vite codebases.
* **"Done Well" Success Definition**:
