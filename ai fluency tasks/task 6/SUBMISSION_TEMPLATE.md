# FlyRank Portal Submission Guide (Task 6)

> **Assignment**: FL-02: Prompting Fundamentals on Real Tasks v2  
> **Course Track**: General AI Fluency (Week 2) · **Phase**: Foundations · **Workload**: 6h

---

## 1. Submission Overview

In your FlyRank dashboard assignment modal on the right side:
- **Deliverable Links**: Enter your public repository URLs.
- **Notes**: Enter concise context for the reviewer.
- **Files**: Upload your prompt iteration log or PDF.

---

## 2. Field-by-Field Submission Content

### Field 1: `Deliverable Links`
*Note: One public `https://` URL per line.*

Paste your GitHub repository links:
```text
https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%206
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%206/PROMPT_ITERATION_LOG.md
```

---

### Field 2: `Notes` (Context for Reviewers)

Copy and paste the following text into the **Notes** box:

```text
Submission for FL-02: Prompting Fundamentals on Real Tasks v2

Summary of Deliverables:
1. Grounded in FL-01 Audit: Selected Target Task 1 from my week 1 audit: 'TypeScript Interface & Zod Schema Scaffolding from Raw API Fixtures'.
2. Six Runs Total (5 Named Techniques):
   - Run 0 (Baseline): Naive one-line prompt ('Convert this JSON into a Zod schema') producing lazy z.any() and loose strings.
   - Run 1 (Role Assignment): Assigned 'Principal TypeScript Architect', immediately eliminating z.any() and adding enum unions.
   - Run 2 (Context & Motivation): Added Next.js/React 19 runtime crash context, automatically introducing .trim() sanitization and decoupled sub-schemas.
   - Run 3 (Few-Shot Examples): Added 2 XML examples matching project conventions, leading to strict PascalCase naming and typed unknown records.
   - Run 4 (Output Structure): Enforced zero conversational chatter and 5-stage file sequencing, resulting in 100% clean copy-pasteable code.
   - Run 5 (Step Decomposition): Introduced two-stage pipeline with <field_audit> before code emission, catching max-length boundaries and nullable/optional nuances.
3. Observed Output Notes: Each run includes structured notes detailing the specific difference observed in output behavior rather than prompt phrasing.
4. Cross-Model Comparison: Benchmarked final prompt across Claude 3.5 Sonnet and ChatGPT GPT-4o on Tone, Accuracy, Code Structure, and Failure Points (Claude was stricter on zero chatter and unknown data boundaries; GPT-4o hallucinated sub-keys).
5. Reusable Template: Parameterized prompt template ready for any frontend engineer to scaffold production-grade Zod schemas without personal context.

Repository Folder: https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%206
```

---

### Field 3: `Files` (What to Upload)

The brief requires:
> *"A prompt iteration log: the task, all six versions with outputs, a note per iteration on what changed and why, the cross-model comparison, the final template."*

Click **Choose Files** and upload:
1. **`PROMPT_ITERATION_LOG.md`** from `ai fluency tasks/task 6/PROMPT_ITERATION_LOG.md` (or export it as a PDF).
2. *(Optional)* **`ANTHROPIC_TUTORIAL_NOTES.md`** covering key tutorial takeaways.

---

## 3. Evaluation Checklist (Pass / Revise)

- [x] **Five+ iterations beyond naive version**: Six runs total, each tied to a named technique.
- [x] **Each note explains observed output difference**: Focuses on output behavior (e.g. elimination of `any`, addition of `.trim()`).
- [x] **Cross-model comparison says something specific**: Detailed dimension-by-dimension comparison between Claude and GPT-4o.
- [x] **Final template is reusable**: Parameterized markdown template ready for any developer.
- [x] **Work is on a real task from FL-01 audit**: Grounded in Target Task 1 (TypeScript/Zod Scaffolding).
