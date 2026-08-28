# Task 5: Accessible Component Fundamentals (FE-05)

This repository contains the complete implementation for **Task 5 (FE-05): Accessible Component Fundamentals** for the FlyRank Frontend AI Engineering track.

---

## 🎯 Assignment Brief & Objectives

1. **Build three interactive components from scratch in React + TypeScript**:
   - **Modal Dialog**: `role="dialog"`, `aria-modal="true"`, focus trapping (`Tab` / `Shift+Tab`), focus return to trigger on close, `Escape` key close handler, backdrop dismiss, and background scroll locking.
   - **Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, roving `tabIndex` (`0` for selected, `-1` for unselected), keyboard navigation (`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End`), automatic and manual activation modes.
   - **Disclosure / Accordion**: `aria-expanded="true|false"`, `aria-controls`, `role="region"`, `aria-labelledby`, `Enter` and `Space` toggle keyboard controls.
2. **Implement each against W3C WAI-ARIA Authoring Practices Guide (APG)**.
3. **Install Shadcn/UI (Radix UI primitives)** and add its Dialog and Tabs.
4. **Write `NOTES.md`** detailing architectural gaps and edge cases handled by Shadcn / Radix that scratch versions missed.
5. **Interactive Playground**: A testing dashboard with a live focus inspector and a11y telemetry HUD.

---

## 📂 Project Structure

```
task 5/
├── NOTES.md                      # In-depth architectural analysis of gaps vs Shadcn/Radix
├── README.md                     # Project documentation
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript strict configuration
├── tailwind.config.ts            # Tailwind CSS design system
├── vitest.config.ts              # Test runner configuration
└── src/
    ├── app/
    │   ├── globals.css           # Design tokens and styles
    │   ├── layout.tsx            # Next.js Root Layout
    │   ├── page.tsx              # Overview & Evaluation Checklist
    │   └── playground/
    │       └── page.tsx          # Interactive Component Playground & A11y HUD
    ├── components/
    │   ├── accessible/           # Built from Scratch (Zero UI libraries)
