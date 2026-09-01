# Task 15: Explain It Like You Built It

**Track:** General AI Fluency  
**Week:** Week 5  
**Phase:** Build  
**Status:** Completed & Validated ✅

---

## Overview

The line between *"I built this"* and *"AI built something I can't explain"* is the credibility line employers test. You don't have to understand everything, but you have to genuinely own what you shipped, the same way you own the work it shows. Picking one real piece and explaining it proves you stayed the human in the loop.

This directory contains the complete deliverable package for **Task 15: Explain It Like You Built It**, breaking down the **Smart Auto-Scroll & Viewport Lock Physics in Streaming Chat** (`task 6/src/components/chat/StreamingChat.tsx`).

---

## Deliverables Index

1. [`EXPLAIN_IT_LIKE_YOU_BUILT_IT.md`](./EXPLAIN_IT_LIKE_YOU_BUILT_IT.md)
   - Plain-English breakdown of DOM scroll geometry (`scrollHeight`, `scrollTop`, `clientHeight`) using the "Cash Register Receipt & The Window" analogy.
   - The mathematical breakdown of the 60-pixel leash threshold.
   - Analysis of the naive auto-scroll failure mode and why users hate fighting the mouse wheel.
   - The floating "Jump to latest" beacon UX pattern.
   - Human-in-the-loop insights: DOM reflow performance costs and JSDOM unit test headless rendering limitations.
2. [`scroll-physics-diagram.svg`](./scroll-physics-diagram.svg)
   - Visual SVG diagram comparing the naive continuous scroll against the smart 60px leash formula.
3. [`SUBMISSION_TEMPLATE.md`](./SUBMISSION_TEMPLATE.md)
   - Copy-paste ready submission card formatted for the FlyRank portal modal fields (`Deliverable links`, `Notes`, `Files`).

---

## Evaluation Criteria Pass/Revise Verification

| Criterion | Evaluation Standard | Status | Verification Detail |
| :--- | :--- | :---: | :--- |
| **It's a real piece of their build, not a generic tutorial topic** | Directly references a specific subsystem from an actual repository task. | **PASS** | Evaluates the exact auto-scroll pinning logic in `task 6/src/components/chat/StreamingChat.tsx` (lines 38–49). |
| **The explanation is in their own words and actually correct** | Mathematically accurate DOM physics explained in clear, jargon-free English. | **PASS** | Accurately explains `distance = scrollHeight - scrollTop - clientHeight <= 60` with cash register receipt metaphor. |
| **It demonstrates learning, not pasted output** | Discusses non-obvious engineering gotchas, browser reflows, and test suite debugging. | **PASS** | Explains why `el.scrollTo` failed in JSDOM unit testing and how passive scroll listeners prevent frame drops. |
