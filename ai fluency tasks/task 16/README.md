# Task 16: Design Your Personal Agent

**Track:** General AI Fluency  
**Code:** `FL-06`  
**Week:** Week 5  
**Workload:** 4h (10-Hour Build Scope)  
**Status:** Completed & Validated ✅

---

## Overview

The capstone is a working personal AI agent, and agents fail at the design stage more often than the build stage. A tight spec is the difference between a 10-hour build and a 30-hour swamp.

This directory contains the full deliverable package for **Task 16: Design Your Personal Agent**, establishing the architectural specification for the **SMX PR Review & Frontend Health Scout**.

---

## Deliverables Index

1. [`PERSONAL_AGENT_DESIGN_DOC.md`](./PERSONAL_AGENT_DESIGN_DOC.md)
   - 2-page detailed design document.
   - One job done well: Automated PR review, Vitest execution, and streaming layout shift triage.
   - User profile and strict 10-hour build budget breakdown.
   - Complete tool inventory and authentication plan (GitHub MCP, Filesystem MCP, local CLI runner).
   - Draft system instructions defining the autonomous ReAct perception-action loop.
   - 5 pre-build evaluation cases covering clean merges, streaming bugs, compiler failures, design token drift, and prompt injections.
   - Safety guardrails specifying what the agent must NEVER do.
   - Platform justification comparing the Scripted MCP approach against OpenAI Custom GPTs, Claude Projects, and n8n.
2. [`personal-agent-architecture.svg`](./personal-agent-architecture.svg)
   - Visual SVG diagram illustrating the autonomous ReAct cycle, the 5 eval benchmarks, and the human safety firewall.
3. [`SUBMISSION_TEMPLATE.md`](./SUBMISSION_TEMPLATE.md)
   - Formatted copy-paste ready submission card for the FlyRank portal modal fields (`Deliverable links`, `Notes`, `Files`).

---

## Evaluation Criteria Pass/Revise Verification

| Criterion | Evaluation Standard | Status | Verification Detail |
| :--- | :--- | :---: | :--- |
| **Scope achievable in roughly 10 build hours** | Single focused task with clearly delineated hourly milestones. | **PASS** | Tightly constrained to PR code review & Vitest execution; 10-hour budget explicitly allocated across MCP, rulesets, loop, evals, and guardrails. |
| **Every tool and data source has a realistic access plan** | Concrete API keys, tokens, and MCP connection configs. | **PASS** | GitHub MCP (scoped PAT), Filesystem MCP (local stdio sandbox), CLI runner (`run_command`), and Identity Kit (local markdown resource). |
| **Five+ eval cases defined before building** | Clear edge cases with expected outputs and pass/fail assertions. | **PASS** | 5 detailed cases: (1) Clean PR, (2) Bad Scroll Pinning, (3) TypeScript mismatch, (4) Design Token violation, (5) Prompt injection attempt. |
| **Guardrails specified for risky or irreversible actions** | Explicit boundaries on destructive commands and writes. | **PASS** | Strictly prohibits `git push --force`, `git merge`, public unconfirmed GitHub comments ("Two-Key Turn" protocol), and blocks `*.env*` files. |
| **Platform choice justified against at least one alternative** | Technical trade-off analysis comparing cost, agility, and local system access. | **PASS** | Scripted MCP Agent ($0, native CLI) justified against OpenAI Custom GPTs ($20/mo, sandboxed) and n8n (unnecessary Docker DevOps). |
