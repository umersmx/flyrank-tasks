# Submissions for Task 17: Build the Agent

This document contains copy-paste-ready submission content for the FlyRank portal submission modal for **Task 17: Build the Agent** (`FL-07 | Week 5 | Phase: Build (Core)`).

---

### Deliverable links:
```text
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%2017/agent.ts
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%2017/BUILD_LOG.md
```

*(Note: One URL per line as required by portal guidelines)*

---

### Notes:
```text
Task 17 — Build the Agent (General AI Fluency | Week 5 | FL-07)

1. Checkpoint 1 MVP Completed End-to-End:
- Implemented the SMX PR Review & Frontend Health Scout in TypeScript (ai fluency tasks/task 17/agent.ts).
- The agent runs 100% autonomously without mid-run hand-editing, completing its core job in 14.8 seconds: perceives git working tree diffs, runs local Vitest test suites, compiles Next.js App Router production builds, audits component ASTs for streaming layout-shift invariants, and outputs a structured review verdict.

2. Live Tool Connections in Active Use:
- Git Working Tree Tool: child_process stdio executing live git diff commands inside the repository.
- Automated Test Suite Tool: Headless Vitest runner (npm test -- --run) parsing test execution metrics across 8 test suites.
- Next.js Compiler Tool: Headless compiler (npm run build) verifying zero TypeScript compilation errors.
- Filesystem Invariant Inspector: Direct fs.readFileSync checking for the 60px scroll leash formula and checking colors against IDENTITY_KIT.md tokens.

3. Honest Build Log & Spec Deviations:
- Initial Vitest Hang: Spawning npm test initially hung because Vitest defaulted to interactive watch mode. Fixed by passing --run non-interactive flag with a 30s child process timeout.
- Spec Deviation (Pruning Remote GitHub PR Post): Pruned the remote GitHub API network write from the MVP to eliminate external API key failures in offline/local environments. Kept the execution 100% local, deterministic, and free.

4. Unedited Run Capture & Terminal Output:
- Raw terminal execution logged in BUILD_LOG.md and visually captured in agent-run-capture.svg.
- Result: 5 modified files perceived, 8/8 tests passed, Next.js build clean, 0 invariant violations -> Final Verdict: APPROVED.
```

---

### Files to upload:
- `agent.ts` (`c:\Users\umerf\Desktop\Code\flyrank-tasks\ai fluency tasks\task 17\agent.ts`)
- `BUILD_LOG.md` (`c:\Users\umerf\Desktop\Code\flyrank-tasks\ai fluency tasks\task 17\BUILD_LOG.md`)
- `agent-run-capture.svg` (`c:\Users\umerf\Desktop\Code\flyrank-tasks\ai fluency tasks\task 17\agent-run-capture.svg`)
