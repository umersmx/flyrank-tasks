# Personal Agent Design Document: "SMX PR Review & Frontend Health Scout"

**Track:** General AI Fluency  
**Code:** `FL-06`  
**Phase:** Build (Core)  
**Workload:** 4h  
**Target Build Scope:** Exactly 10 Build Hours  
**Author:** Muhammad Umer (Frontend AI Engineer)  
**Repository:** `https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%2016`

---

## 1. Executive Summary & Why This Job

> *"The capstone is a working personal AI agent, and agents fail at the design stage more often than the build stage. A tight spec is the difference between a 10-hour build and a 30-hour swamp."*

As a Frontend AI Engineer maintaining Next.js 14 applications with streaming AI chat interfaces and React 19 components, my single biggest operational drain is **Code Review & Layout Shift Triage**. Every pull request or dependency bump (e.g. updating `@ai-sdk/react`, Tailwind CSS, or Vitest) introduces risks:
1. Accidental removal of streaming scroll-pinning logic.
2. Unhandled Promise rejections that crash chunked HTTP responses.
3. Accessible keyboard traps or missing ARIA tags in interactive modals.
4. Spurious token regressions or unmemoized re-renders.

### One Job Done Well:
**"The SMX PR Review & Frontend Health Scout"** has one singular mission:
*Given a GitHub Pull Request URL or local git diff, autonomously checkout the branch, run headless unit tests and build validation, analyze modified React components against our design-token and streaming-ergonomics ruleset, and post a structured, formatted markdown PR review containing an actionable PASS/REVISE verdict.*

It does **not** write generic product features. It does **not** manage databases. It does **one job**: Automated, high-fidelity frontend code review and layout shift triage.

---

## 2. User Persona, Operating Cadence, and 10-Hour Scope Budget

* **The User:** Muhammad Umer (Solo frontend engineer & repository owner).
* **Usage Frequency:** Triggered 2–4 times per week upon opening a PR or preparing a task submission branch.
* **10-Hour Build Scope Budget:**
  - *Hour 1–2:* Setup MCP server connections (`@modelcontextprotocol/server-github`, `@modelcontextprotocol/server-filesystem`).
  - *Hour 3–4:* Author System Instructions & Ruleset schemas (Design token rules, streaming layout-shift invariants).
  - *Hour 5–6:* Implement Autonomous ReAct execution loop (Diff retrieval -> Local build & test -> Component AST lint).
  - *Hour 7–8:* Build and calibrate the 5 Eval Cases with automated assertions.
  - *Hour 9–10:* Guardrail boundary enforcement (Strict read-only permissions, mandatory human confirmation before PR comment submission).

---

## 3. Tool Inventory & Access Plan

| Tool / Data Source | MCP / API Primitive | Access Plan & Auth | Permissions & Scope |
| :--- | :--- | :--- | :--- |
| **GitHub PR & Git Diffs** | `@modelcontextprotocol/server-github` | Personal Access Token (`GITHUB_TOKEN` with `repo:status`, `pull_requests:write`) | Read PR metadata, diffs; draft PR reviews. |
| **Local Filesystem & Working Tree** | `@modelcontextprotocol/server-filesystem` | Local stdio MCP connection constrained strictly to `c:\Users\umerf\Desktop\Code\flyrank-tasks` | Read modified source files, inspect AST, write review report. |
| **CLI & Build Runner** | `run_command` over stdio | Local PowerShell runtime inside repository working directory | Execute `npm test`, `npm run build`, and `git diff`. |
| **FlyRank Design Token Spec** | Local Resource: `file:///.../task 8/IDENTITY_KIT.md` | Read-only static MCP Resource | Enforce typography (`Geist`, `Inter`), colors (`#0F172A`, `#059669`), and contrast thresholds. |

---

## 4. Draft System Instructions (The "Brain")

```text
You are the "SMX PR Review & Frontend Health Scout", an autonomous agent designed to review pull requests in the flyrank-tasks repository.

OBJECTIVE:
Analyze the code changes in the target branch, run automated tests, and produce a senior-staff-level Frontend AI Code Review.

