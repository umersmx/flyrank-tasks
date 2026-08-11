# AI-Assisted Workflow Drill: Comparative Analysis (FE-02)

## 1. Context & Prompts
In this drill, we implemented a User Settings Form with validation twice to evaluate how prompt specificity, constraints, and verification loops impact production readiness.
- **Round 1 Prompt (Vague)**: `"make a user settings form with validation"` on branch `feat/round-1-vague`.
- **Round 2 Prompt (Precise)**: Structured specification on branch `feat/round-2-precise` defining TypeScript types (`UserSettingsFormData`), WCAG 2.1 AA accessibility attributes, RFC 5322 regex validation, submission state transitions (`idle | submitting | success | error`), and automated Vitest test requirements.

---

## 2. Concrete Code Diffs & Correctness

Examining the direct Git diff between `feat/round-1-vague` and `feat/round-2-precise` exposes fundamental architectural differences:

```diff
- // Round 1: Ad-hoc validation allowing bypasses
- if (!name) { setError('Please enter your name'); return; }
- if (!email || !email.includes('@')) { setError('Please enter a valid email'); return; }
+ // Round 2: Schema validation with trimming and RFC regex
+ const trimmedName = data.fullName.trim();
+ if (!trimmedName) { errors.fullName = 'Full name is required and cannot be blank.'; }
+ if (!EMAIL_REGEX.test(trimmedEmail)) { errors.email = 'Please provide a valid email address.'; }
```

In Round 1, validation lived as unstructured string checks directly in the UI handler. In Round 2, validation is isolated into pure, testable functions in `src/utils/validation.ts` returning structured `FormErrors`.

---

## 3. Concrete AI Mistakes Caught



<!-- milestone review step 37 verified 2026-08-11 -->
