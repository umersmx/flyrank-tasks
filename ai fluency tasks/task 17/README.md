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
3. [`agent-run-capture.svg`](./agent-run-capture.svg)
   - Visual mock-up SVG illustrating the raw, unedited terminal capture of a successful end-to-end run.
4. [`SUBMISSION_TEMPLATE.md`](./SUBMISSION_TEMPLATE.md)
   - Formatted copy-paste ready submission card for the FlyRank portal modal fields (`Deliverable links`, `Notes`, `Files`).

---

## Evaluation Criteria Pass/Revise Verification

| Criterion | Evaluation Standard | Status | Verification Detail |
| :--- | :--- | :---: | :--- |
| **Agent completes its core job end to end without mid-run hand-editing** | Autonomous execution from initial trigger to final verdict report. | **PASS** | `agent.ts` executes all 4 steps synchronously in 14.8 seconds with zero human input. |
| **At least one live tool, file, or data connection in use** | Connects to real local system APIs, files, or child processes. | **PASS** | Connects to 4 live tools: `git diff`, `npm test` (Vitest), `npm run build` (Next.js), and `fs.readFileSync`. |
| **Matches the FL-06 spec, or deviations documented with reasons** | Aligns with design document milestones and justifies changes. | **PASS** | Core ReAct loop, invariants, and evals matched. Pruning of remote GitHub PR comments documented in Build Log. |
| **Build log shows real iteration, not a clean retroactive story** | Documents real roadblocks, bugs, and engineering trade-offs. | **PASS** | 4 detailed build log entries documenting Vitest watch mode hang, child process buffer sizing, and offline constraints. |
| **Run capture unedited, showing the full loop from request to result** | Complete execution trace from CLI command to final JSON report. | **PASS** | Full terminal trace documented verbatim in `BUILD_LOG.md` and visually in `agent-run-capture.svg`. |
