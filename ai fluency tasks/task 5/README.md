# Task 5: The Prompt Ladder

[![Track: General AI Fluency](https://img.shields.io/badge/Track-General%20AI%20Fluency-blue.svg)](#)
[![Phase: Foundations](https://img.shields.io/badge/Phase-Foundations-green.svg)](#)
[![Week: 2](https://img.shields.io/badge/When-Week%202-orange.svg)](#)
[![Workload: 2h](https://img.shields.io/badge/Workload-2h-purple.svg)](#)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-success.svg)](#)

> **Assignment Reference**: [The Prompt Ladder (FlyRank Week 2)](https://aifluency.flyrank.ai/week-02.html#the-prompt-ladder)  
> **Author**: Muhammad Umer  
> **Track**: Frontend AI Engineering (React 19 / TypeScript)

---

## 📌 Executive Summary

> *"The gap between a lazy prompt and an engineered one is the cheapest performance upgrade in AI, and most people never see it because they change five things at once and learn nothing. This assignment forces the discipline: one change at a time, output compared at every step. By the end you won't just have a better prompt, you'll know exactly which ingredient earned its place."*

This repository directory documents the complete **Prompt Ladder** for a real engineering task in React 19 / TypeScript: starting from a weak, embarrassing baseline prompt, systematically adding **one named layer at a time across five iterations**, recording 4 structured notes per run, identifying a genuine regression where the output got worse, and delivering a clean, production-grade reusable prompt template.

---

## 📂 Deliverables Directory Structure

```
ai fluency tasks/task 5/
├── README.md                 # Master task showcase, executive summary & compliance matrix
├── PROMPT_LADDER.md          # Primary deliverable: All 6 runs, 4 notes per run, made-it-worse reflection, final prompt
└── SUBMISSION_TEMPLATE.md    # Ready-to-copy GitHub URLs, reviewer notes, and file upload instructions
```

---

## 🪜 The 6-Run Progression (One Named Layer Per Run)

| Run | Named Layer Added | Change in Prompt | Change in Output (The Result) |
| :---: | :--- | :--- | :--- |
| **Run 0** | *Baseline (Weak)* | None | Naive 30-line JS form; untyped, insecure, zero accessibility. |
| **Run 1** | **Real Context** | React 19, TS strict, User Settings fields | Generated domain fields (`username`, `email`, `bio`) and TS interfaces. |
| **Run 2** | **Specified Output Format** | Decoupled Zod schema validation | Centralized schema, but **pulled in uninstalled dependencies (bloat)**. |
| **Run 3** | **Constraints** | Banned external wrappers; enforced `.trim()` | Cut dependency bloat; eliminated whitespace bypass bugs. |
| **Run 4** | **Quality Criteria** | Enforced WCAG 2.1 AA accessibility | Added `aria-invalid`, `aria-describedby`, and screen-reader `role="alert"`. |
| **Run 5** | **Verification Requirements** | Async idempotency locks & error recovery | Added double-click protection (`isSubmitting` guard) and resilient loading state. |

---

## ⚠️ The Honest "Made It Worse" Moment

In **Run 2**, adding the *Specified Output Format* layer (`"Zod schema validation"`) caused the LLM to hallucinate dependencies:
- It unprompted imported `react-hook-form` and `@hookform/resolvers/zod`.
- This broke the project build because neither library was installed.
- It obscured raw React form mechanics behind external abstractions without adding any accessibility.

**Takeaway**: Asking an AI model for an advanced structural pattern without negative constraints creates permission for dependency bloat. This directly informed **Run 3's constraints layer** banning external form wrappers.

---

## 🏆 The Final Reusable Prompt (Parameter Ready)

```markdown
# Context & Objective
Act as a Principal Frontend Engineer. Author a production-grade React 19 form component in strict TypeScript for {FORM_NAME} with the following fields:
{FIELD_SPECIFICATIONS}

# Architecture & Validation
