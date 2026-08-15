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
1. Validation Schema: Define an isolated Zod schema ({SCHEMA_NAME}). All string inputs must be explicitly .trim()med before validation. Infer TypeScript types directly from the schema.
2. Zero Dependency Bloat: Do NOT use external form libraries (e.g., react-hook-form, Formik). Implement validation using native React 19 hooks and Zod .safeParse().
3. Error Mapping: Map validation failures into a strongly-typed record keyed by field name: Partial<Record<keyof FormData, string>>.

# Non-Negotiable Accessibility (WCAG 2.1 AA)
1. Semantic Linking: Every input must link to a persistent <label htmlFor={id}> matching the input's id.
2. Error States: When invalid, inputs must declare aria-invalid="true" and aria-describedby="{id}-error".
3. Screen Reader Alerts: Field errors must declare role="alert". Async submission feedback banners must declare role="status" and aria-live="polite".

# Mutation Safety & Idempotency
1. Double-Click Lock: Maintain an isSubmitting state. The submission handler must immediately guard with: if (isSubmitting) return;
2. Trigger Attributes: The submit button must dynamically reflect disabled={isSubmitting} and aria-busy={isSubmitting}.
3. Error Recovery: Wrap async calls in try/catch/finally to guarantee isSubmitting resets even if the API rejects.
```

---

## ✅ Evaluation Criteria Compliance Matrix

| Evaluation Criteria | Requirement | Status | Verification Detail |
| :--- | :--- | :---: | :--- |
| **Six runs total** | Baseline plus five, each tied to exactly one named layer | **PASS** | Run 0 through Run 5 explicitly isolated in [PROMPT_LADDER.md](file:///c:/Users/umerf/Desktop/Code/flyrank-tasks/ai%20fluency%20tasks/task%205/PROMPT_LADDER.md) |
| **Notes describe changes in output** | Describes the resulting output behavior, not just prompt text | **PASS** | 4 structured notes per version focusing on output changes |
| **Honest "made it worse" moment** | Candor on where a change degraded output | **PASS** | Run 2 unprompted dependency bloat analyzed in Section 6 |
| **Final prompt works for a stranger** | Clean, parameterized, and self-contained | **PASS** | Reusable markdown template in Section 5 |
