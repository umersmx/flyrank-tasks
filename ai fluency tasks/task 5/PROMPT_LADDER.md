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
