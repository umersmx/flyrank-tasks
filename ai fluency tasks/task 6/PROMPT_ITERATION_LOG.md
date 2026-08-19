# Prompt Iteration Log: Prompting Fundamentals on Real Tasks v2 (FL-02)

> **Track**: General AI Fluency · **Assignment**: FL-02 (Prompting Fundamentals on Real Tasks v2) · **Phase**: Foundations · **Workload**: 6h  
> **Author**: Muhammad Umer · **Track Domain**: Frontend AI Engineering (React 19 / TypeScript)  
> **Selected FL-01 Target Task**: **Target Task 1: TypeScript Interface & Zod Schema Scaffolding from Raw API Fixtures**

---

## 📌 1. Task Background & Problem Statement

In **FL-01**, I audited my recurring weekly engineering workflows and identified **TypeScript & Zod Scaffolding** as my primary high-leverage delegation candidate:
* **The Real Bottleneck**: Hand-writing nested Zod schemas and derived TypeScript types for third-party webhook payloads, LLM JSON outputs, and backend REST APIs takes 20–30 minutes per endpoint, frequently missing optional/nullable edge cases or falling back to sloppy `any`.
* **The Goal**: Engineer a prompt that ingests messy, real-world JSON API fixture payloads and outputs 100% strict, compile-ready Zod schemas with inferred TypeScript types, explicit null/undefined handling, and `.trim()` sanitization in under 60 seconds.

---

## 🪜 2. The 6-Run Progression (Naive Baseline + 5 Named Techniques)

---

### Run 0: The Naive Baseline Prompt (Pre-Track Habit)

#### The Prompt:
```text
Convert this JSON into a Zod schema and TypeScript types:
{
  "user_id": "usr_98231",
  "display_name": "Umer Farooq",
  "email": "umer@example.com",
  "role": "admin",
  "preferences": {
    "theme": "dark",
    "notifications_enabled": true,
    "digest_frequency": "weekly"
  },
  "billing_address": null,
  "tags": ["beta_tester", "enterprise"]
}
```

#### The Output:
```typescript
import { z } from 'zod';

export const schema = z.object({
  user_id: z.string(),
  display_name: z.string(),
  email: z.string(),
  role: z.string(),
  preferences: z.object({
    theme: z.string(),
    notifications_enabled: z.boolean(),
    digest_frequency: z.string(),
  }),
  billing_address: z.any(),
  tags: z.array(z.string()),
});

export type UserType = z.infer<typeof schema>;
```

#### Note on Run 0:
* **Technique Applied**: None (Naive one-line prompt).
* **Observed Output Difference**: Baseline.
* **Critique of Weaknesses**: The output is naive and dangerous in production:
  1. `billing_address` was lazily typed as `z.any()`, completely bypassing type safety.
  2. `role` and `theme` were typed as loose `z.string()` instead of strict enum/literal unions (`'admin' | 'member'`, `'dark' | 'light'`).
  3. No string trimming or email format validation.
  4. Generically named `schema` and `UserType` with conversational filler text before and after.

---

### Run 1: Technique 1 — Role Assignment

#### The Prompt:
```text
You are a Principal TypeScript Architect and Senior Data Validation Specialist specializing in high-reliability runtime systems.

Convert this JSON into a Zod schema and TypeScript types:
{
  "user_id": "usr_98231",
  "display_name": "Umer Farooq",
  "email": "umer@example.com",
  "role": "admin",
  "preferences": {
    "theme": "dark",
    "notifications_enabled": true,
    "digest_frequency": "weekly"
  },
  "billing_address": null,
  "tags": ["beta_tester", "enterprise"]
}
```

#### The Output:
```typescript
import { z } from 'zod';

export const UserProfileSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  display_name: z.string().min(1, "Display name cannot be empty"),
  email: z.string().email("Invalid email format"),
  role: z.enum(["admin", "user", "guest"]),
  preferences: z.object({
    theme: z.enum(["dark", "light", "system"]),
    notifications_enabled: z.boolean(),
    digest_frequency: z.enum(["daily", "weekly", "never"]),
  }),
  billing_address: z.record(z.unknown()).nullable(),
  tags: z.array(z.string()),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
```

#### Note on Run 1 (Observed Output Difference):
* **What Changed in Prompt**: Added a high-competence professional persona (*Principal TypeScript Architect*).
* **Observed Difference in Output**: The model completely stopped using `z.any()`! It intuitively inferred that `billing_address` was a nullable object (`z.record(z.unknown()).nullable()`), recognized `email` as a candidate for `.email()` validation, converted string fields into plausible `z.enum()` unions, and applied domain-appropriate naming (`UserProfileSchema` instead of `schema`).
* **Remaining Weakness**: It hallucinated enum variants (`"user"`, `"guest"`, `"system"`, `"daily"`) that were never in the payload, and it did not enforce input sanitization like `.trim()`.

---

### Run 2: Technique 2 — Context and Motivation

#### The Prompt:
```text
You are a Principal TypeScript Architect and Senior Data Validation Specialist specializing in high-reliability runtime systems.

Context & Motivation:
We are building a mission-critical SaaS dashboard in React 19 and Next.js where external API payloads frequently arrive with unexpected whitespace, missing optional fields, and null values. If our validation runtime crashes or accepts un-sanitized whitespace strings, it causes hydration errors, database corruption, and broken form state downstream. We need bulletproof Zod validation that fails fast on malicious input, sanitizes whitespace, and strictly distinguishes between nullable and optional fields.

Convert this JSON into a Zod schema and TypeScript types:
{
  "user_id": "usr_98231",
  "display_name": "Umer Farooq",
  "email": "umer@example.com",
  "role": "admin",
  "preferences": {
    "theme": "dark",
    "notifications_enabled": true,
    "digest_frequency": "weekly"
  },
  "billing_address": null,
  "tags": ["beta_tester", "enterprise"]
}
```

#### The Output:
```typescript
import { z } from 'zod';

export const BillingAddressSchema = z.object({
  street: z.string().trim().min(1),
  city: z.string().trim().min(1),
  postal_code: z.string().trim().min(1),
  country: z.string().trim().min(2),
});

export const UserProfileSchema = z.object({
  user_id: z.string().trim().min(1, 'User ID is required'),
  display_name: z.string().trim().min(1, 'Display name cannot be empty'),
  email: z.string().trim().email('Invalid email address'),
  role: z.enum(['admin', 'member', 'owner']),
  preferences: z.object({
    theme: z.enum(['dark', 'light']),
    notifications_enabled: z.boolean(),
    digest_frequency: z.enum(['daily', 'weekly', 'monthly']),
  }),
  billing_address: BillingAddressSchema.nullable().optional(),
  tags: z.array(z.string().trim()),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type BillingAddress = z.infer<typeof BillingAddressSchema>;
```

#### Note on Run 2 (Observed Output Difference):
* **What Changed in Prompt**: Provided the architectural context (Next.js/React 19, whitespace sensitivity, runtime crash prevention) and the motivation (why failure hurts downstream state).
* **Observed Difference in Output**: Understanding *why* whitespace breaks forms motivated the model to prepend `.trim()` to every string field automatically. Furthermore, it decoupled `BillingAddressSchema` into its own reusable sub-schema and explicitly typed it as `.nullable().optional()`.
* **Remaining Weakness**: It invented sub-fields for `BillingAddressSchema` (`street`, `city`, etc.) based on pure guesswork, and still surrounded the code with 3 paragraphs of explanatory advice on how to use Zod.

---

### Run 3: Technique 3 — Few-Shot Examples

#### The Prompt:
```text
You are a Principal TypeScript Architect and Senior Data Validation Specialist specializing in high-reliability runtime systems.

Context & Motivation:
We are building a mission-critical SaaS dashboard in React 19 and Next.js where external API payloads frequently arrive with unexpected whitespace, missing optional fields, and null values. If our validation runtime crashes or accepts un-sanitized whitespace strings, it causes hydration errors, database corruption, and broken form state downstream. We need bulletproof Zod validation that fails fast on malicious input, sanitizes whitespace, and strictly distinguishes between nullable and optional fields.

Here are examples of our exact architectural standards:

<example_1>
Input JSON:
{
  "order_id": "ord_101",
  "status": "pending",
  "note": null
}

Expected Zod & TypeScript Output:
import { z } from 'zod';

export const OrderStatusEnum = z.enum(['pending', 'processing', 'completed', 'cancelled']);

export const OrderSchema = z.object({
  order_id: z.string().trim().min(1, 'Order ID cannot be empty'),
  status: OrderStatusEnum,
  note: z.string().trim().nullable(),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
</example_1>

<example_2>
Input JSON:
{
  "product_id": 402,
  "sku": "SKU-PRO-01",
  "metadata": null
}

Expected Zod & TypeScript Output:
import { z } from 'zod';

export const ProductSchema = z.object({
  product_id: z.number().int().positive('Product ID must be a positive integer'),
  sku: z.string().trim().regex(/^SKU-[A-Z0-9-]+$/, 'Invalid SKU pattern'),
  metadata: z.record(z.string(), z.unknown()).nullable(),
});

export type Product = z.infer<typeof ProductSchema>;
</example_2>

Now convert this JSON following the exact patterns shown above:
{
  "user_id": "usr_98231",
  "display_name": "Umer Farooq",
  "email": "umer@example.com",
  "role": "admin",
  "preferences": {
    "theme": "dark",
    "notifications_enabled": true,
    "digest_frequency": "weekly"
  },
  "billing_address": null,
  "tags": ["beta_tester", "enterprise"]
}
```

#### The Output:
```typescript
import { z } from 'zod';

export const UserRoleEnum = z.enum(['admin', 'member', 'viewer']);
export const UserThemeEnum = z.enum(['dark', 'light']);
export const DigestFrequencyEnum = z.enum(['daily', 'weekly', 'monthly']);

export const UserPreferencesSchema = z.object({
  theme: UserThemeEnum,
  notifications_enabled: z.boolean(),
  digest_frequency: DigestFrequencyEnum,
});

export const UserProfileSchema = z.object({
  user_id: z.string().trim().min(1, 'User ID cannot be empty'),
  display_name: z.string().trim().min(1, 'Display name cannot be empty'),
  email: z.string().trim().email('Invalid email address format'),
  role: UserRoleEnum,
  preferences: UserPreferencesSchema,
  billing_address: z.record(z.string(), z.unknown()).nullable(),
  tags: z.array(z.string().trim().min(1)),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserTheme = z.infer<typeof UserThemeEnum>;
export type DigestFrequency = z.infer<typeof DigestFrequencyEnum>;
```

#### Note on Run 3 (Observed Output Difference):
* **What Changed in Prompt**: Added two high-fidelity `<example>` blocks illustrating how we expect null objects, enums, regexes, and standalone type exports to be formatted.
* **Observed Difference in Output**: The model matched our exact codebase naming conventions! It stopped inventing fake address fields and correctly adopted `z.record(z.string(), z.unknown()).nullable()` directly from Example 2. It also exported separate enum types (`UserRole`, `UserTheme`, `DigestFrequency`) matching our project standard.
* **Remaining Weakness**: It still included conversational text ("Here is your generated schema...") and didn't explain its internal decisions regarding optional vs. nullable fields.

---

### Run 4: Technique 4 — Output Structure

#### The Prompt:
```text
You are a Principal TypeScript Architect and Senior Data Validation Specialist specializing in high-reliability runtime systems.

Context & Motivation:
We are building a mission-critical SaaS dashboard in React 19 and Next.js where external API payloads frequently arrive with unexpected whitespace, missing optional fields, and null values. If our validation runtime crashes or accepts un-sanitized whitespace strings, it causes hydration errors, database corruption, and broken form state downstream. We need bulletproof Zod validation that fails fast on malicious input, sanitizes whitespace, and strictly distinguishes between nullable and optional fields.

[Examples 1 & 2 omitted here for brevity, included in execution]

Output Structure Instructions:
- Emit ONLY a single valid TypeScript code block.
- ZERO conversational filler, zero introductory phrases ("Sure!"), and zero post-code explanations.
- The output must begin immediately with ````typescript and end with ````.
- Structure the file in this strict sequence:
  1. Zod import
  2. Enum declarations (if any)
  3. Sub-object schemas (if any)
  4. Root object schema (strictly named with PascalCase + 'Schema')
  5. Inferred TypeScript type exports (prefixed with `export type`)

Now convert this JSON:
{
  "user_id": "usr_98231",
