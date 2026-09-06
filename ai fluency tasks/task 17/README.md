# Task 17: Build the Agent

**Track:** General AI Fluency  
**Code:** `FL-07`  
**Week:** Week 5  
**Workload:** 10h  
**Status:** Completed & Validated ✅

---

## Overview

This is Checkpoint 1, the MVP. An agent that completes its core job end to end with at least one live tool connection is the artifact everything else in your submission orbits.

This directory contains the full deliverable package for **Task 17: Build the Agent**, delivering the working **SMX PR Review & Frontend Health Scout** autonomous agent.

---

## Deliverables Index

1. [`agent.ts`](./agent.ts)
   - Working TypeScript scripted agent executable via `npx tsx "ai fluency tasks/task 17/agent.ts"`.
   - Autonomous ReAct loop: Perceives git working tree diffs, executes headless Vitest test suites, compiles Next.js production builds, audits component ASTs against design-token and streaming layout-shift invariants, and outputs a structured review report.
2. [`BUILD_LOG.md`](./BUILD_LOG.md)
   - Unedited build log showing real iteration, what broke (interactive Vitest hanging, JSDOM scroll fallbacks, Next.js build timeouts), what was cut from the FL-06 spec (remote GitHub API network write pruned to maintain local offline determinism), and raw terminal run logs.
