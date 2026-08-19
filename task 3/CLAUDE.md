# Claude Guidelines — Task 3 (FE-03)

## Commands
- `npm run dev`: Start Vite development server
- `npm test`: Run automated Vitest test suite
- `npm run build`: Typecheck with `tsc` and produce production build in `dist/`

## Code Standards
- **Strict Typing**: Zero implicit `any`. All props and state must have explicit interfaces.
- **Custom Hook Encapsulation**: Keep business logic, search debounce, and localStorage sync inside dedicated hooks in `src/hooks/`.
- **Defensive Data Handling**: Always provide fallback empty arrays/objects for network payloads. Ensure broken image URLs gracefully fallback to the placeholder component.
- **Commit Format**: Follow Conventional Commits format (e.g. `feat(task-3): ...`, `docs(task-3): ...`).
