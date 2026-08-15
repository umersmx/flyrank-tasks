# The Prompt Ladder (FL-05 / Week 2)

> **Track**: General AI Fluency · **Assignment**: The Prompt Ladder · **Phase**: Foundations · **Workload**: 2 Hours  
> **Author**: Muhammad Umer · **Track Domain**: Frontend AI Engineering (React 19 / TypeScript)  
> **Course Reference**: [Week 2 · The Prompt Ladder (FlyRank)](https://aifluency.flyrank.ai/week-02.html#the-prompt-ladder)

---

## 📌 Executive Summary

> *"The gap between a lazy prompt and an engineered one is the cheapest performance upgrade in AI, and most people never see it because they change five things at once and learn nothing. This assignment forces the discipline: one change at a time, output compared at every step. By the end you won't just have a better prompt, you'll know exactly which ingredient earned its place."*

This document tracks the systematic, single-layer evolution of a frontend engineering prompt across **six distinct runs** (a weak baseline + 5 single-layer iterations). It documents raw outputs, the 4 structured evaluation notes per version, an honest analysis of where an added layer degraded the output, and finishes with a production-grade reusable prompt template.

---

## 🪜 The Ladder Overview: 6 Iterations at a Glance

| Run | Added Layer | Core Single Change | Primary Output Result |
| :---: | :--- | :--- | :--- |
| **Run 0** | *Baseline (Weak)* | None ("embarrassing" starting prompt) | Fragile 30-line component, inline state, no types, zero a11y. |
| **Run 1** | **Real Context** | Specified React 19, TypeScript strict mode & User Settings domain | Replaced toy fields with domain fields (username, email, bio) and TS interfaces. |
| **Run 2** | **Specified Output Format** | Enforced decoupled Zod runtime schema | Centralized validation, but **caused library bloat** (*the "made it worse" moment*). |
| **Run 3** | **Constraints** | Banned external form wrappers, enforced native React + `.trim()` | Cut bloat; eliminated whitespace-bypass validation bugs. |
| **Run 4** | **Quality Criteria** | Enforced non-negotiable WCAG 2.1 AA semantic accessibility | Added `aria-invalid`, `aria-describedby`, and screen-reader `role="alert"`. |
| **Run 5** | **Verification Requirements** | Enforced async idempotency locks & network error recovery | Added double-click prevention (`isSubmitting` guard) and resilient loading states. |

---

## 🔬 Detailed Step-by-Step Evolution

---

### Run 0: The Baseline (The Weak Prompt)

#### Prompt:
```text
Write a React form component with validation.
```

#### Output Excerpt:
```jsx
import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email.includes('@')) {
      setError('Please fill all fields correctly');
      return;
    }
    alert('Submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### Notes on Run 0:
* **What changed in prompt**: Baseline starting point (zero constraints, zero context).
* **What actually improved in output**: N/A (Baseline).
* **What still failed**: Untyped JavaScript, naive `!name` check easily bypassed by spaces, naive email validation (`email.includes('@')`), bare unlabelled inputs failing basic accessibility, no async submission handling, alert popup.
* **What to try next**: Add **Real Context** specifying our production stack (React 19 + TypeScript strict) and actual domain (User Settings profile).

---

### Run 1: Adding Real Context

#### Prompt:
```text
Write a React form component with validation.
[ADDED LAYER: Real Context]
We are building a User Settings profile form in React 19 with TypeScript strict mode enabled. The form allows users to update their username (min 3 chars), email address, and a short bio (max 160 chars).
```

#### Output Excerpt:
```tsx
import React, { useState } from 'react';

interface UserSettings {
  username: string;
  email: string;
  bio: string;
}

export const UserSettingsForm: React.FC = () => {
  const [form, setForm] = useState<UserSettings>({ username: '', email: '', bio: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserSettings, string>>>({});

  const validate = () => {
    const errs: Partial<Record<keyof UserSettings, string>> = {};
    if (form.username.length < 3) errs.username = 'Username must be at least 3 chars';
    if (!form.email.includes('@') || !form.email.includes('.')) errs.email = 'Invalid email';
    if (form.bio.length > 160) errs.bio = 'Bio exceeds 160 chars';
    return errs;
  };
  // ...
```

#### Notes on Run 1:
* **What changed in prompt**: Added real domain context (User Settings fields: username, email, bio) and engineering stack (React 19, TypeScript strict mode).
* **What actually improved in output**: The code stopped using generic "name/message" fields; it generated typed TypeScript interfaces (`UserSettings`) and domain-accurate length checks.
* **What still failed**: Validation logic is hand-rolled with clunky manual `if` branches; users can still bypass username length by entering spaces `"   "`; email regex is still naive; accessibility is completely absent.
* **What to try next**: Add a **Specified Output Format** using a schema-first validation engine (Zod).

---

### Run 2: Adding Specified Output Format (The "Made It Worse" Moment)

#### Prompt:
```text
Write a React form component with validation.
We are building a User Settings profile form in React 19 with TypeScript strict mode enabled. The form allows users to update their username (min 3 chars), email address, and a short bio (max 160 chars).
[ADDED LAYER: Specified Output Format]
Structure the validation by defining a decoupled Zod schema (userSettingsSchema) and infer TypeScript types directly from it. Return validation errors formatted as a typed record keyed by field name.
```

#### Output Excerpt:
```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const userSettingsSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(160, 'Bio cannot exceed 160 characters'),
});

type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

export const UserSettingsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
  });
  // ...
```

#### Notes on Run 2:
* **What changed in prompt**: Added a specified output format layer requiring a Zod schema and inferred TypeScript types.
* **What actually improved in output**: Centralized validation rules out of component render logic into a robust `z.object()` declaration with built-in email formatting.
* **What still failed (HONEST "MADE IT WORSE" MOMENT)**:
  > ⚠️ **The Output Got Worse**: By asking for Zod without restricting dependencies, the AI unprompted imported `react-hook-form` and `@hookform/resolvers/zod`. This broke the project build because neither package was installed in our project! It also hid raw React form mechanics behind external library abstraction and still had zero ARIA attributes.
* **What to try next**: Add **Constraints** forbidding third-party form wrappers, mandating native React 19 hooks only, and requiring string trimming.

---

### Run 3: Adding Constraints (Fixing the Regression)

#### Prompt:
```text
Write a React form component with validation.
We are building a User Settings profile form in React 19 with TypeScript strict mode enabled. The form allows users to update their username (min 3 chars), email address, and a short bio (max 160 chars).
Structure the validation by defining a decoupled Zod schema (userSettingsSchema) and infer TypeScript types directly from it. Return validation errors formatted as a typed record keyed by field name.
[ADDED LAYER: Constraints]
Do NOT use external form libraries like react-hook-form or Formik; use ONLY native React 19 hooks and Zod. All string inputs must be explicitly .trim()med before validation so whitespace-only submissions fail.
```

#### Output Excerpt:
```tsx
import React, { useState } from 'react';
import { z } from 'zod';

export const userSettingsSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters'),
  email: z.string().trim().email('Invalid email address'),
  bio: z.string().trim().max(160, 'Bio cannot exceed 160 characters'),
});

export type UserSettingsInput = z.infer<typeof userSettingsSchema>;

export const UserSettingsForm: React.FC = () => {
  const [values, setValues] = useState<UserSettingsInput>({ username: '', email: '', bio: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserSettingsInput, string>>>({});
  // Uses native useState and manual Zod .safeParse()
```

#### Notes on Run 3:
* **What changed in prompt**: Imposed negative constraints (no external form libraries, native React 19 hooks only, mandatory `.trim()` on all string inputs).
* **What actually improved in output**: Cut out external library bloat; the component is completely self-contained and compiles without new npm packages. Whitespace exploit (`"   "`) is now closed by `.trim()`.
* **What still failed**: Accessibility is still terrible: inputs use placeholder text instead of linked `<label>` tags, dynamic errors have no ARIA links (`aria-describedby`), and screen readers receive zero announcements when validation fails.
* **What to try next**: Add **Quality Criteria** enforcing non-negotiable WCAG 2.1 AA accessibility standards.

---

### Run 4: Adding Quality Criteria (WCAG 2.1 AA Accessibility)

#### Prompt:
```text
Write a React form component with validation.
We are building a User Settings profile form in React 19 with TypeScript strict mode enabled. The form allows users to update their username (min 3 chars), email address, and a short bio (max 160 chars).
Structure the validation by defining a decoupled Zod schema (userSettingsSchema) and infer TypeScript types directly from it. Return validation errors formatted as a typed record keyed by field name.
Do NOT use external form libraries like react-hook-form or Formik; use ONLY native React 19 hooks and Zod. All string inputs must be explicitly .trim()med before validation so whitespace-only submissions fail.
[ADDED LAYER: Quality Criteria]
The component must strictly adhere to WCAG 2.1 AA accessibility standards:
1. Every input must have a persistent <label htmlFor={id}> matching the input id.
2. When a validation error occurs, the input must set aria-invalid="true" and aria-describedby="{id}-error".
3. Error messages must declare role="alert".
```

#### Output Excerpt:
```tsx
<div className="form-field">
  <label htmlFor="settings-username" className="field-label">Username</label>
  <input
    id="settings-username"
    type="text"
    value={values.username}
    onChange={e => handleChange('username', e.target.value)}
    aria-invalid={Boolean(errors.username)}
    aria-describedby={errors.username ? 'settings-username-error' : undefined}
    className={errors.username ? 'input-error' : 'input-standard'}
  />
  {errors.username && (
    <p id="settings-username-error" role="alert" className="error-message">
      {errors.username}
    </p>
  )}
</div>
```

#### Notes on Run 4:
* **What changed in prompt**: Added explicit quality criteria requiring full WCAG 2.1 AA semantic compliance (`<label htmlFor>`, `aria-invalid`, `aria-describedby`, and `role="alert"`).
* **What actually improved in output**: The rendered DOM tree is now accessible to screen readers. Assistive technologies announce errors immediately when `role="alert"` mounts, and inputs correctly communicate validity state.
* **What still failed**: The form does not protect against concurrent async mutations. If a user clicks "Save Changes" three times quickly on a high-latency connection, three API requests fire in parallel, causing race conditions.
* **What to try next**: Add **Verification Requirements** for async state handling, double-click protection, and idempotency locks.

---

### Run 5: Adding Verification Requirements (Idempotency & Submission Locks)

#### Prompt:
```text
Write a React form component with validation.
We are building a User Settings profile form in React 19 with TypeScript strict mode enabled. The form allows users to update their username (min 3 chars), email address, and a short bio (max 160 chars).
Structure the validation by defining a decoupled Zod schema (userSettingsSchema) and infer TypeScript types directly from it. Return validation errors formatted as a typed record keyed by field name.
Do NOT use external form libraries like react-hook-form or Formik; use ONLY native React 19 hooks and Zod. All string inputs must be explicitly .trim()med before validation so whitespace-only submissions fail.
The component must strictly adhere to WCAG 2.1 AA accessibility standards:
1. Every input must have a persistent <label htmlFor={id}> matching the input id.
2. When a validation error occurs, the input must set aria-invalid="true" and aria-describedby="{id}-error".
3. Error messages must declare role="alert".
[ADDED LAYER: Verification Requirements & Idempotency]
The async submit handler must enforce strict idempotency:
1. Track isSubmitting state and immediately guard with 'if (isSubmitting) return;' to block double-clicks.
2. The submit button must render with disabled={isSubmitting} and aria-busy={isSubmitting}.
3. Display a live submission status banner declaring role="status" and aria-live="polite".
```

#### Output Excerpt:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return; // Idempotency guard

  const result = userSettingsSchema.safeParse(values);
  if (!result.success) {
    const fieldErrors: Partial<Record<keyof UserSettingsInput, string>> = {};
    result.error.errors.forEach(err => {
      if (err.path[0]) fieldErrors[err.path[0] as keyof UserSettingsInput] = err.message;
    });
    setErrors(fieldErrors);
    return;
  }

  try {
    setIsSubmitting(true);
    setStatusMessage('Saving profile changes...');
    await onSave(result.data);
    setStatusMessage('Profile updated successfully.');
  } catch (err) {
    setStatusMessage('Failed to save profile. Please retry.');
  } finally {
    setIsSubmitting(false);
  }
};

<button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</button>
{statusMessage && (
  <div role="status" aria-live="polite" className="status-banner">
    {statusMessage}
  </div>
)}
```

#### Notes on Run 5:
* **What changed in prompt**: Added verification requirements enforcing async idempotency locks (`isSubmitting` guard, `disabled`, `aria-busy`, and `role="status"` banner).
* **What actually improved in output**: The component is now completely resilient to rapid multi-clicks, network latency, and submission races. Screen readers politely receive success and failure announcements without UI jitter.
* **What still failed**: Nothing critical remains; the component meets strict production standards.
* **What to try next**: Package the accumulated layers into a clean, parameterized prompt template that any frontend engineer can use.

---

## 🏆 5. The Final Reusable Prompt

Cleaned up so anyone on the frontend engineering track can use it directly:

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

## ⚖️ 6. The "Made It Worse" Analysis

The assignment pass/revise rubric strictly demands:
> *"At least one honest 'this didn't help' or 'this made it worse' moment. If all five versions improved things smoothly, you weren't looking hard enough."*

### Our Honest Regression in Run 2:
In **Run 2**, when we introduced the *Specified Output Format* layer (`"Define a decoupled Zod schema"`), our intention was to make validation structured and clean.

**What Actually Happened**:
Because we did not yet have the negative constraints of Run 3, the LLM assumed that using Zod meant it should also pull in `react-hook-form` and `@hookform/resolvers/zod`. 

**Why It Was Worse**:
1. **Broken Build**: It introduced two new npm dependencies that did not exist in the repository, making the snippet fail to run out of the box.
2. **Hidden Mechanics**: It obscured raw React form mechanics behind hook-form's `register()` and `handleSubmit()`, making it harder to verify accessibility bindings.
3. **Lesson Learned**: Adding a structural pattern (Zod) without negative constraints (no external form wrappers) gives the LLM permission to over-engineer and inflate the dependency graph. This directly motivated **Run 3's constraints layer**.
