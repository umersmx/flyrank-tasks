# Accessible Component Fundamentals: Custom Implementation vs. Shadcn / Radix UI Analysis

**Assignment Code**: FE-05  
**Track**: Frontend AI Engineering  
**Focus**: Deep-dive accessibility audit, W3C WAI-ARIA APG pattern compliance, and comparative architectural gaps between scratch implementations and production-grade component primitives (Shadcn/UI & Radix UI).

---

## 1. Executive Summary

Building accessible components from scratch reveals that while standard W3C ARIA roles and keyboard event listeners are straightforward to implement conceptually, true enterprise-grade accessibility requires handling numerous browser quirks, cross-platform mobile edge cases, focus boundary escapes, nesting contexts, and CSS animation lifecycles.

In this assignment, we built three interactive accessible components from scratch in React + TypeScript:
1. **Modal Dialog** (`role="dialog"`, focus trap, focus restoration, `Escape` handler, backdrop click, scroll lock, portal).
2. **Tabs** (`role="tablist"`, `role="tab"`, `role="tabpanel"`, roving `tabIndex`, arrow navigation, `Home`/`End`, automatic/manual activation).
3. **Disclosure / Accordion** (`aria-expanded`, `aria-controls`, `role="region"`, `Enter`/`Space` keyboard control).

We then installed and analyzed **Shadcn/UI** (powered by `@radix-ui/react-dialog` and `@radix-ui/react-tabs`). Below is the comprehensive architectural comparison identifying key design decisions and concrete gaps.

---

## 2. Concrete Gaps: What Shadcn / Radix Handled That Our Scratch Version Missed

### Gap 1: Focus Trapping via Sentinel Guards vs. Keydown Interception
- **Our Implementation**:
  - We query all focusable elements inside the modal using query selectors (`button:not([disabled])`, `input`, `a[href]`, etc.) and intercept the `Tab` / `Shift+Tab` `keydown` event. When the user tabs past the last element, we programmatically focus the first element (and vice versa).
- **What Shadcn / Radix Handles**:
  - Radix injects **Sentinel Focus Guards** (`<span aria-hidden="true" data-radix-focus-guard tabIndex={0} />`) at the start and end of the DOM portal tree.
- **Why It Matters**:
  - `keydown` event listeners only catch keyboard events when focus is already inside the viewport/document. If a user clicks into the browser address bar, browser developer tools, or switches windows and then presses `Tab` back into the page, the browser's native focus algorithm bypasses JS `keydown` handlers.
  - The invisible sentinel guards catch native browser focus entry at the physical DOM boundary and bounce focus immediately back inside the active dialog.

---

### Gap 2: Layering & Dismissable Layer Stacking Context (`DismissableLayer`)
- **Our Implementation**:
  - Our scratch modal dialog listens to global `Escape` key and backdrop clicks.
- **What Shadcn / Radix Handles**:
  - Radix employs a centralized **Dismissable Layer Tree** (`@radix-ui/react-dismissable-layer`).
- **Why It Matters**:
  - In complex applications, a dialog frequently hosts other interactive overlays—such as a dropdown menu, select popover, date picker, or nested confirmation modal.
  - With naive global listeners, pressing `Escape` or clicking an outer backdrop will dismiss **both** the dropdown and the underlying modal simultaneously.
  - Radix's dismissable layers register themselves in a stack hierarchy; `Escape` or outside interactions only dismiss the topmost active layer, providing correct event propagation isolation.

---

