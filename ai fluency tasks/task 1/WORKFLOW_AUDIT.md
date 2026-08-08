# AI Workflow Audit (FL-01)

> **Track**: General AI Fluency · **Assignment**: FL-01 · **Phase**: Onboarding & Setup · **Workload**: 4 Hours  
> **Author**: Muhammad Umer  
> **Framework**: Adapted from Ethan Mollick's *Onboarding your AI Intern* Task Classification Framework

---

## 1. Executive Summary

The objective of this audit is to baseline a real-world weekly workflow across academic study, frontend AI engineering, side projects, and personal operations. By classifying recurring responsibilities across four distinct delegation tiers, this audit establishes where AI creates leverage, where human discretion is indispensable, and which three core workflows will be systematically optimized in milestones **FL-02 through FL-04**.

---

## 2. Weekly Task Audit (12 Recurring Tasks)

Each recurring task is drawn from my active weekly routine as a software engineering student and frontend AI developer.

| # | Recurring Task | Category | Classification | One-Line Rationale |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Physical Gym Workout Execution & Recovery** | Personal / Health | `just me` | Physical stimulus, kinesthetic feedback, and listening to bodily fatigue cannot be delegated or simulated. |
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

## 3. Deep Dive: Three Target Tasks for FL-02 to FL-04

From the 12 audited tasks, the following three recurring engineering workflows have been selected for deep-dive optimization across upcoming milestones:

### Target Task 1: TypeScript Interface & Zod Schema Scaffolding
* **Reused In**: FL-02 (Prompt Engineering & Few-Shot Templates)
* **Context**: Rapidly converting backend API responses, third-party webhook payloads, and form specs into strict, runtime-validated TypeScript definitions.
* **Current Bottleneck**: Hand-writing nested Zod schemas and derived TypeScript types consumes 20–30 minutes per API endpoint and frequently misses optional or nullable edge cases.
* **"Done Well" Success Definition**:
  1. **Zero Type Errors**: Generated schemas compile cleanly under TypeScript strict mode (`noImplicitAny: true`).
  2. **Edge Coverage**: Accurately handles union discriminators, optional parameters, and nullability without fallback `any`.
  3. **Runtime Validation Parity**: 100% of generated Zod schemas successfully validate real sample API fixture payloads.
  4. **Time Reduction**: Turnaround reduced from 25 minutes to under 3 minutes including human review.

---

### Target Task 2: Obscure Frontend Bug Triage & Root Cause Analysis (RCA)
* **Reused In**: FL-03 (Collaborative Problem Solving & Multi-Step Reasoning)
* **Context**: Diagnosing complex React 19 / Vite edge cases (e.g., race conditions during async submissions, memory leaks in `useEffect`, stale closures).
* **Current Bottleneck**: Navigating minified console stack traces and cross-file state mutations often results in trial-and-error console logging.
* **"Done Well" Success Definition**:
  1. **Root Cause Isolation**: AI accurately identifies the precise file, line, and lifecycle mechanism causing the regression within 2 conversational turns.
  2. **Non-Regressive Fix**: Proposed solution adheres strictly to existing architectural rules (e.g., WCAG accessibility, idempotency locks) without breaking sibling components.
  3. **Explanatory Clarity**: Provides a reproducible test case proving both the failure mode and the patch.
  4. **Resolution Velocity**: Reduces average triage time for non-trivial bugs by at least 50%.

---

### Target Task 3: Comprehensive Test Suite Generation (Vitest & Testing Library)
* **Reused In**: FL-04 (Automated Workflows & Verification Loops)
* **Context**: Authoring unit, integration, and accessibility tests for newly developed React components and custom hooks.
* **Current Bottleneck**: Writing comprehensive user-event interactions, asynchronous state transitions, and ARIA role assertions is frequently deprioritized due to time pressure.
* **"Done Well" Success Definition**:
  1. **Coverage Standard**: Achieves >85% branch coverage on target components including error boundaries and loading states.
  2. **Accessibility Assertions**: Explicitly validates WCAG AA requirements (`role="alert"`, `aria-describedby`, keyboard navigation).
  3. **Zero Flakiness**: Generated tests pass consistently across 5 consecutive local runs without arbitrary `waitFor` timeouts.
  4. **Maintainability**: Tests follow Arrange-Act-Assert structure with descriptive test names matching user behavior rather than implementation details.

---

## 4. Ethan Mollick Framework Reflection

| Classification Quadrant | Allocation Strategy | Guiding Principle |
| :--- | :---: | :--- |
| **Just Me** | ~25% of weekly energy | Reserved for physical presence, moral/ethical decisions, trust-building, and high-stakes security. |
| **Delegate with Review** | ~35% of weekly energy | Applied to structured, well-bounded mechanical outputs where the cost of verification is substantially lower than drafting from scratch. |
| **Collaborate with AI** | ~30% of weekly energy | Applied to high-ambiguity exploration, design trade-offs, and critical bug analysis where human judgment steers the AI's divergent ideas. |
| **Fully Automate** | ~10% of weekly energy | Reserved for deterministic, rules-based triggers where machine verification has 100% confidence (linting, CI pipelines). |
