# Task 6: Prompting Fundamentals on Real Tasks v2 (FL-02)

[![Track: General AI Fluency](https://img.shields.io/badge/Track-General%20AI%20Fluency-blue.svg)](#)
[![Code: FL-02](https://img.shields.io/badge/Code-FL--02-green.svg)](#)
[![Phase: Foundations](https://img.shields.io/badge/Phase-Foundations-green.svg)](#)
[![Week: 2](https://img.shields.io/badge/When-Week%202-orange.svg)](#)
[![Workload: 6h](https://img.shields.io/badge/Workload-6h-purple.svg)](#)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-success.svg)](#)

> **Assignment Reference**: [FL-02: Prompting Fundamentals on Real Tasks v2 (FlyRank Week 2)](https://aifluency.flyrank.ai/week-02.html)  
> **Author**: Muhammad Umer  
> **Selected FL-01 Target Task**: **Target Task 1: TypeScript Interface & Zod Schema Scaffolding from Raw API Fixtures**

---

## 📌 Executive Summary

> *"The gap between a lazy prompt and an engineered one is the cheapest performance upgrade in AI. Practicing on your own tasks, not toy examples, makes the techniques stick."*

This repository directory documents the complete **FL-02 Prompt Iteration Log**. Starting from an authentic engineering target task identified in my **FL-01 weekly audit** (scaffolding strict Zod schemas and TypeScript types from raw JSON API payloads), this assignment systematically builds across **six iterations**, applying five named prompting techniques, conducting an honest **Claude vs. ChatGPT cross-model benchmark**, and distilling the findings into a **reusable production prompt template**.

---

## 📂 Deliverables Directory Structure

```
ai fluency tasks/task 6/
├── README.md                      # Master task showcase, executive summary & compliance matrix
├── PROMPT_ITERATION_LOG.md        # Primary deliverable: 6 runs, 5 named techniques, cross-model comparison, final template
├── ANTHROPIC_TUTORIAL_NOTES.md    # Key takeaways from the Anthropic Prompt Engineering Interactive Tutorial
└── SUBMISSION_TEMPLATE.md         # Ready-to-copy GitHub URLs, reviewer notes, and file upload instructions
```

---

## 🪜 The 6-Run Progression (5 Named Techniques)

| Run | Named Technique | Core Prompt Addition | Observed Difference in Output |
| :---: | :--- | :--- | :--- |
| **Run 0** | *Baseline (Naive)* | None (`"Convert this JSON into Zod schema"`) | Lazy `z.any()` on null fields, loose strings, no trim, conversational filler. |
| **Run 1** | **Role Assignment** | *Principal TypeScript Architect* | Completely eliminated `z.any()`, added domain enums, inferred email validation. |
| **Run 2** | **Context & Motivation** | Mission-critical Next.js dashboard; runtime crash prevention | Added `.trim()` to all strings, decoupled address into its own sub-schema. |
| **Run 3** | **Few-Shot Examples** | 2 concrete input/output XML fixture examples | Adopted exact project naming conventions (`*Enum`, `*Schema`), typed unknown records. |
| **Run 4** | **Output Structure** | Zero conversation constraint, strict 5-stage file sequence | Emitted 100% clean, copy-pasteable TypeScript code with zero chatter. |
| **Run 5** | **Step Decomposition** | Two-stage pipeline: `<field_audit>` before code emission | Model caught defensive length boundaries and correctly typed `.nullable().optional()`. |

---

## ⚖️ Cross-Model Comparison (Claude 3.5 Sonnet vs. ChatGPT GPT-4o)

| Dimension | Claude 3.5 Sonnet | ChatGPT (GPT-4o) | Key Observed Contrast |
| :--- | :--- | :--- | :--- |
| **Tone & Constraints** | 100% compliant with zero conversational chatter. | Followed XML, but added an introductory sentence. | Claude adhered to negative constraints more strictly. |
| **Edge Case Accuracy** | Typed null object as `z.record(z.string(), z.unknown()).nullable().optional()`. | Typed as `z.lazy(() => BillingAddressSchema).nullable()`, hallucinating missing fields. | Claude respected data boundaries without inventing schema structure. |
| **Code Structure** | Exported modular standalone enums and all inferred types. | Inlined enums into root schema; exported only the root type. | Claude's modular output is superior for UI dropdown reuse. |
| **Failure Points** | Conservative on enum variants. | Speculated 5 unprompted enum permissions. | GPT-4o risks adding unsupported backend enum variants. |

---

## 🏆 Final Reusable Prompt Template

```markdown
# Role & Mandate
You are a Principal TypeScript Architect specializing in high-reliability runtime data validation using Zod.

# Context & Objective
Convert raw JSON payload fixtures into production-grade, runtime-safe Zod schemas and derived TypeScript types for {SCHEMA_NAME}. The schema must fail fast on malicious inputs, sanitize whitespace, and strictly differentiate between nullable and optional properties.

# Step Decomposition Instructions
Execute the conversion sequentially across two distinct stages:

STAGE 1: FIELD AUDIT (<field_audit>)
Analyze each payload key inside <field_audit> tags:
- Primitive type & data shape.
- Optional vs. Nullable policy (explain why a key is required, nullable, or optional).
- Sanitation & boundary checks (trimming, email regex, min/max lengths, integer checks).
