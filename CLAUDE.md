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


<!-- milestone review step 59 verified 2026-08-15 -->
