# FlyRank Frontend AI Engineering - Project Conventions & Rules

This document defines the architectural guidelines, tech stack standards, and engineering conventions for the FlyRank Frontend AI Engineering assignments and capstone development.

---

## 1. Tech Stack Overview

- **Runtime & Environment**: Node.js (LTS v20+ / v25+), Git
- **Primary Framework**: React 19 / Next.js / Vite
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS / Vanilla CSS Modules (design-token driven, responsive, accessible)
- **State Management**: React Context, TanStack Query, or lightweight atomic state (Zustand)
- **Testing**: Vitest / React Testing Library / Playwright
- **Package Manager**: `npm` / `pnpm`

---

## 2. Git & Commit Guidelines

All commits must adhere strictly to **Conventional Commits 1.0.0**:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types:
- `feat`: A new feature or capability
- `fix`: A bug fix
- `docs`: Documentation only changes (README, guides, specifications)
- `style`: Formatting, whitespace, semi-colons (no production code logic change)
- `refactor`: Code restructuring without changing external behavior
- `perf`: Performance optimizations
- `test`: Adding or correcting unit/integration tests
- `build`: Changes to build systems, bundlers, or external dependencies
- `ci`: CI/CD configuration files and scripts
- `chore`: Repository maintenance, gitignore, licensing, tooling updates

---

## 3. Frontend Architecture & Code Standards

### Component Guidelines
- Use functional components with typed TypeScript interfaces:
  ```tsx
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }
  ```
- Colocate styles, tests, and component-specific utilities when appropriate.
- Keep components focused on a single responsibility.
- Use semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<article>`, `<section>`, `<button>`).
- Enforce accessibility (a11y): proper `aria-*` attributes, high contrast colors, and keyboard navigability.

### State & Logic Separation
- Separate UI presentation from business logic using custom hooks (`useFeatureName`).
- Prevent direct side-effects inside render pipelines; utilize standard React lifecycle hooks or query wrappers.

---

## 4. AI-Assisted Development Workflow

When collaborating with AI assistants (Claude Code, Cursor, Antigravity):
1. **Explicit Context**: Provide relevant schema, file paths, and target requirements before executing modifications.
2. **Incremental Validation**: Always run builds, type-checks, and test suites after AI edits.
3. **No Unfinished Placeholders**: Never introduce `// TODO` or placeholder implementations without explicit user sign-off.
4. **Code Quality First**: Verify adherence to project conventions and design consistency.

---

## 5. Form Engineering & Validation Rules (FE-02 Learned Rules)

The following three project rules are strictly enforced and testable:

1. **Schema-First Form Validation & Trimming**:
   - Every form must define an explicit data schema and validate inputs using isolated validator functions or Zod schemas.
   - String inputs must be `.trim()`med before length/presence checks; bare truthy checks `if (!value)` fail code review because whitespace strings bypass them.
   - Email fields must validate against RFC 5322 regex; naive `.includes('@')` checks fail review.

2. **Non-Negotiable WCAG 2.1 AA Form Accessibility**:
   - Every input must be linked to a `<label htmlFor={id}>` matching the input's `id`.
   - Dynamic error states must set `aria-invalid={Boolean(error)}` and link to the error message element via `aria-describedby="{id}-error"`.
   - Error messages must declare `role="alert"`, and async submission banners must declare `role="status"` with `aria-live="polite"`.

3. **In-Flight Mutation Locking & Idempotency**:
   - Every form submitting asynchronous actions must track an `isSubmitting` state.


<!-- milestone review step 185 verified 2026-09-08 -->
