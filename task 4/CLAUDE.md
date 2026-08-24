# Claude Guidelines — Task 4 (FE-04 Capstone)

## Commands
- `npm run dev`: Start Next.js development server
- `npm test`: Run automated Vitest test suite
- `npm run build`: Compile Next.js production build (`next build`)

## Architecture Principles
- **App Router Layout**: Place shared UI (Navigation, Footer) in `src/app/layout.tsx`.
- **Diagnostic Health Checks**: Keep `/api/health` dynamic (`export const dynamic = 'force-dynamic'`) to ensure fresh telemetry on every probe.
- **Tailwind Consistency**: Utilize defined theme variables (`var(--card-bg)`, `var(--border-color)`, `glass-card`).
- **Commit Format**: Conventional Commits (e.g., `feat(task-4): ...`, `docs(task-4): ...`).
