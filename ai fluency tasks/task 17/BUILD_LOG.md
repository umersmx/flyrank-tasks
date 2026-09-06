# Build Log: Building the SMX PR Review & Frontend Health Scout

**Track:** General AI Fluency  
**Code:** `FL-07`  
**Phase:** Build (Core)  
**Workload:** 10h  
**Agent Implemented:** `ai fluency tasks/task 17/agent.ts`  
**Author:** Muhammad Umer (Frontend AI Engineer)  
**Repository:** `https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%2017`

---

## 1. Executive Summary & MVP Milestone Overview

> *"Why it matters: This is Checkpoint 1, the MVP. An agent that completes its core job end to end with at least one live tool connection is the artifact everything else in your submission orbits."*

In **Task 16 (`FL-06`)**, we authored the complete architectural design document for the **SMX PR Review & Frontend Health Scout**. 

For **Task 17 (`FL-07`)**, we built and executed the **Checkpoint 1 MVP**: a working TypeScript agent that connects live to the operating system's filesystem, git tree, and test runners over stdio tools. It completes its core job—from git diff perception through headless Vitest suite execution, Next.js production build compilation, and AST invariant verification—**100% autonomously without mid-run hand-editing**.

---

## 2. Real Tool Connections in Active Use

The MVP agent utilizes three distinct live system tools over child processes and filesystem interfaces:

1. **Live Git Working Tree Diff Tool (`git diff`)**:
   - Executes `git diff --name-only HEAD~1 HEAD` inside `c:\Users\umerf\Desktop\Code\flyrank-tasks`.
   - Returns real modified file lists from disk (not mocked strings).
2. **Headless Test Suite Runner (`Vitest`)**:
   - Executes `npm test -- --run` inside `task 6/`.
   - Captures live terminal stdout/stderr, parsing for pass/fail thresholds across 8 unit and integration tests.
3. **Compiler Verification Tool (`Next.js Build`)**:
   - Executes `npm run build` inside `task 6/`.
   - Verifies zero TypeScript syntax errors (`tsc`) and Next.js App Router route integrity.
4. **Filesystem AST Invariant Inspector (`IDENTITY_KIT.md` & Component Files)**:
   - Reads `task 6/src/components/chat/StreamingChat.tsx` directly from disk.
   - Enforces the 60px scroll threshold formula and disallows unapproved hex color codes.

---

## 3. The Unedited Build Log: Real Iteration, Not a Clean Retrospective

### Entry 1: Scoping the MVP Down to 1 Core Job
* **What I Planned (from FL-06 Spec):** Full GitHub REST API integration posting comments to remote pull requests via `@modelcontextprotocol/server-github`.
* **What Broke:** Initial testing of GitHub PR comment posting failed because remote PR branches require write access permissions and network API keys that would fail in offline or CI environments.
* **What I Changed / Cut:** Cut the remote GitHub API network dependency from the MVP. Kept the execution 100% focused on **local pre-merge git diffs, local Vitest runner execution, and AST linting**. The agent outputs its review directly to stdout and writes a local report. This ensures 100% reliability, zero cost, and instant execution.

### Entry 2: Vitest Execution in Child Process
* **What Broke:** When `agent.ts` spawned `npm test` inside `task 6/`, Vitest defaulted to interactive watch mode (`vitest watch`), causing the agent process to hang indefinitely without returning a stopping condition.
* **How I Fixed It:** Updated the tool invocation arguments to explicitly pass the non-interactive flag: `npm test -- --run`. Set a defensive 30,000ms timeout on the child process to prevent hanging.

### Entry 3: JSDOM Scroll Mock Compatibility
* **What Broke:** Vitest reported an unhandled rejection when checking `el.scrollTo` during component mount.
* **How I Fixed It:** Reinforced the defensive check inside `StreamingChat.tsx` (`typeof el.scrollTo === 'function' ? ... : el.scrollTop = el.scrollHeight`) and verified that the agent correctly parses this invariant without throwing false alarms.

### Entry 4: Next.js Production Build Timing
* **What Happened:** Running `npm run build` takes ~12 seconds on Windows.
* **How Handled:** Configured the child process buffer with a 60-second window. The agent successfully awaited the exit code `0` before proceeding to AST inspection.

---

## 4. End-to-End Unedited Run Capture (Terminal Log)

The following execution trace is the **raw, unedited output** from running `npx tsx 'ai fluency tasks/task 17/agent.ts'` end-to-end:
