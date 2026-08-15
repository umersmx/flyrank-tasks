# FlyRank Portal Submission Guide (Task 5)

> **Assignment**: The Prompt Ladder  
> **Course Track**: General AI Fluency (Week 2) · **Phase**: Foundations · **Workload**: 2h

---

## 1. Submission Overview

In your FlyRank dashboard assignment modal on the right side:
- **Deliverable Links**: Enter your public repository URLs.
- **Notes**: Enter concise context for the reviewer.
- **Files**: Upload your prompt ladder document or PDF.

---

## 2. Field-by-Field Submission Content

### Field 1: `Deliverable Links`
*Note: One public `https://` URL per line.*

Paste your GitHub repository links:
```text
https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%205
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%205/PROMPT_LADDER.md
```

---

### Field 2: `Notes` (Context for Reviewers)

Copy and paste the following text into the **Notes** box:

```text
Submission for Week 2: The Prompt Ladder

Summary of Deliverables:
1. Six Runs Total: Started with an intentionally weak baseline ('Write a React form component with validation') and added exactly one named layer per iteration:
   - Run 1 (Real Context): React 19, TS strict, User Settings fields.
   - Run 2 (Specified Output Format): Decoupled Zod schema validation.
   - Run 3 (Constraints): Banned external form wrappers, enforced native React hooks + .trim().
   - Run 4 (Quality Criteria): WCAG 2.1 AA semantic accessibility (aria-invalid, aria-describedby, role='alert').
   - Run 5 (Verification Requirements): Async idempotency locks (isSubmitting guard, disabled, aria-busy, status banner).
2. Four Notes Per Version: Each run details (a) what changed in prompt, (b) what improved in output, (c) what still failed, and (d) what to try next—focusing on output behavior rather than prompt phrasing.
3. Honest 'Made It Worse' Moment: In Run 2, introducing Zod caused the LLM to unprompted import react-hook-form and resolvers, breaking the project build and overcomplicating code. This regression directly motivated Run 3's negative constraints layer.
4. Reusable Final Prompt: Fully cleaned and parameterized template ready for any frontend engineer to generate production-ready accessible forms.

Repository Folder: https://github.com/umersmx/flyrank-tasks/tree/main/ai%20fluency%20tasks/task%205
```

---

### Field 3: `Files` (What to Upload)

The brief requires:
> *"A prompt ladder document containing the weak baseline plus five versions, the output (or a representative excerpt) for each, your four notes per version, and the final reusable prompt."*

Click **Choose Files** and upload:
1. **`PROMPT_LADDER.md`** from `ai fluency tasks/task 5/PROMPT_LADDER.md` (or export it as a PDF).

---

## 3. Evaluation Checklist (Pass / Revise)

- [x] **Six runs total**: Baseline plus five, each tied to exactly one named layer.
- [x] **Notes describe changes in the output**: Focused on resulting behavior, not just prompt changes.
- [x] **Honest "made it worse" moment**: Documented in Run 2 (dependency bloat from react-hook-form).
- [x] **Final prompt works for a stranger**: Clean, modular, parameterized template provided.
