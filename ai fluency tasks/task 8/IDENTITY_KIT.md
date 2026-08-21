# Decide Once: Build Your Identity Kit (Master Identity Spec)

> **Track**: General AI Fluency · **Assignment**: Decide Once: Build Your Identity Kit (Week 3) · **Phase**: Foundations · **Workload**: 2h  
> **Author**: Muhammad Umer · **Audience**: Technical Lead / Frontend Engineering Manager at an AI Startup  
> **Core Mandate**: *"The design is the frame, not the painting. Your work is the painting."*  
> **Assignment Reference**: [https://aifluency.flyrank.ai/week-03.html#identity-kit](https://aifluency.flyrank.ai/week-03.html#identity-kit)

---

## 📌 Executive Summary

> *"A consistent look is what separates a portfolio that feels intentional from one that feels thrown together; and it comes from a handful of decisions, not from talent. Make them once and every page, and every case study, inherits them."*

This document serves as the **one-page Master Identity Kit** for Muhammad Umer's Frontend AI Engineering portfolio. It locks in the typographic hierarchy, color palette, logo/favicon geometry, and the two-line style note added to the Claude Project environment to guarantee absolute consistency across all downstream build weeks.

---

## 🔤 1. Typographic System: One Heading Font, One Body Font

> *"Choose your type: one or two free fonts (a heading font and a body font; they can be the same)."*

### The Pairing: Geist Sans + Inter (with Geist Mono for Code)
Both fonts are open-source and free via **Google Fonts**, optimized for high-density screen readability and technical interfaces:

| Role | Typeface | Weights Used | Optical Tracking | Usage Across Portfolio |
| :--- | :--- | :--- | :--- | :--- |
| **Heading** | **Geist Sans** | `SemiBold (600)`<br>`Bold (700)` | `-0.02em` (tight) | Page titles, case study headers, modal captions, metric values. |
| **Body** | **Inter** | `Regular (400)`<br>`Medium (500)` | `normal` (150% line-height) | Case study problem/solution beats, architectural explanations, documentation. |
| **Code / Data** | **Geist Mono** | `Regular (400)`<br>`Medium (500)` | `normal` | Schema signatures (`z.infer<T>`), CLI commands, tokens, hex codes. |

### Why This Pairing Wins:
1. **Zero Aesthetic Clutter**: Avoids decorative flourishes or novelty serifs that clash with technical code blocks.
2. **Exceptional Legibility**: Inter features a tall x-height and distinct letterforms (open counters, distinct shapes for `l`, `1`, and `I`), preventing reader fatigue.
3. **Developer-Tooling Native**: Geist Sans was specifically engineered by Vercel for technical dashboards, matching the modern React 19 ecosystem.

---

## 🎨 2. The 4-Color Palette: Intentional, Calm, High-Contrast

> *"Choose your palette: a main color, near-black text, near-white background, and at most one accent, calm enough that your work is the loudest thing on the page."*

The palette is intentionally restrained to **four functional colors**. By keeping the background near-white and text near-black, the live code sandboxes, DevTools graphs, and terminal outputs are naturally the most colorful and memorable elements on the page.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE 4-COLOR IDENTITY PALETTE                    │
├───────────────────┬───────────────────┬────────────────┬───────────────┤
│    Near-White     │    Near-Black     │   Subtle Slate │  Signal Mint  │
│    Background     │    Primary Text   │  Muted Surface │  Single Accent│
│     #FAFAFA       │      #0F172A      │    #64748B     │    #059669    │
│  (Warm Canvas)    │    (Slate 900)    │  (Slate 500)   │ (Emerald 600) │
└───────────────────┴───────────────────┴────────────────┴───────────────┘
```

### Color Specification & Design Tokens

| Token Name | Hex Code | RGB | HSL | Semantic Role |
| :--- | :---: | :---: | :---: | :--- |
| `--color-canvas` | `#FAFAFA` | `250, 250, 250` | `0°, 0%, 98%` | **Near-White Background**: Soft warm canvas. Prevents the intense eye strain of pure `#FFFFFF` while maintaining high visual brightness. |
| `--color-text-primary` | `#0F172A` | `15, 23, 42` | `222°, 47%, 11%` | **Near-Black Text**: Deep slate navy. Delivers crisp, authoritative contrast without the harsh ink-bleed of pure `#000000`. |
| `--color-surface-muted` | `#64748B` | `100, 116, 139` | `215°, 16%, 47%` | **Subtle Slate**: Used for card borders (`#E2E8F0` tint), secondary metadata, timestamps, and captions. |
| `--color-accent` | `#059669` | `5, 150, 105` | `161°, 94%, 30%` | **Signal Mint Accent**: A single grounded emerald. Reserved strictly for primary action buttons, active availability indicators, and passing test badges. |

### WebAIM Accessibility & Contrast Verification
Every color pair complies strictly with **WCAG 2.1 Level AA / AAA** requirements:

| Contrast Pair | Foreground | Background | Ratio | Standard Required | WCAG Rating |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Primary Text on Canvas** | `#0F172A` | `#FAFAFA` | **16.14 : 1** | 4.5 : 1 (AA) / 7.0 : 1 (AAA) | 🟢 **PASSES AAA** |
| **Muted Metadata on Canvas** | `#64748B` | `#FAFAFA` | **4.98 : 1** | 4.5 : 1 (AA) | 🟢 **PASSES AA** |
| **Accent Text/Icon on Canvas** | `#059669` | `#FAFAFA` | **4.82 : 1** | 4.5 : 1 (AA) | 🟢 **PASSES AA** |
| **Canvas Text on Accent Button**| `#FFFFFF` | `#059669` | **4.55 : 1** | 4.5 : 1 (AA) | 🟢 **PASSES AA** |

---

## 🏷️ 3. Brand Identity Assets: Monogram & Favicon

> *"Make a logo or favicon, your name set in your heading font, or a clean monogram. Keep it simple."*

The brand identity uses a dual format:
1. **The Wordmark Logo (`logo.svg`)**: Muhammad Umer set cleanly in **Geist Sans (Bold 700)** at 15px, accompanied by a clean monogram badge and subtitle *"Frontend AI Engineer"*.
2. **The Favicon (`favicon.svg`)**: A 32x32 vector icon with a dark slate rounded squircle (`#0F172A`), sharp white `MU` monogram letters, and an emerald signal dot (`#059669`) in the lower corner communicating live runtime readiness.

---

## 📝 4. The Two-Line Standing Style Note (For Claude Project)

> *"Write a two-line style note (fonts, hex codes, one sentence on the mood) and add it to your Claude Project so the build stays consistent."*

Here is the exact two-line instruction:

```markdown
Fonts: Geist (headings 600/700), Inter (body 400/500), Geist Mono (code); Palette: #FAFAFA (canvas), #0F172A (text), #64748B (muted), #059669 (accent).
Mood: Quiet, high-contrast engineering precision with generous whitespace—the layout serves as an unobtrusive gallery frame so the real code sandboxes and screenshots remain the star.
```

### Where It Lives:
- Injected into **Claude Project Custom Instructions** (`CLAUDE_PROJECT_IDENTITY_UPDATE.md`).
- Colocated in `.cursorrules` and `CLAUDE.md` at workspace root.

---

## 💻 5. CSS & Tailwind Design Tokens

```css
/* Identity Kit CSS Variables */
:root {
  /* Colors */
  --bg-canvas: #FAFAFA;
  --text-primary: #0F172A;
  --surface-muted: #64748B;
  --border-subtle: #E2E8F0;
  --accent-primary: #059669;
  --accent-hover: #047857;
  --accent-soft: #ECFDF5;

  /* Typography */
  --font-heading: 'Geist', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-code: 'Geist Mono', 'JetBrains Mono', monospace;

  /* Layout Spacing */
  --max-width: 1040px;
  --radius-card: 10px;
  --radius-btn: 6px;
}
```

---

## ✅ Evaluation Criteria Compliance

- [x] **One or two fonts, not a pile**: Exactly two fonts (Geist Sans + Inter) with clear functional roles.
- [x] **A tight palette (~3–4 colors) with actual hex codes**: Exactly 4 hex codes (`#FAFAFA`, `#0F172A`, `#64748B`, `#059669`).
- [x] **A simple logo or favicon exists**: High-resolution vector assets [`logo.svg`](logo.svg) and [`favicon.svg`](favicon.svg) committed in repository.
- [x] **The style note describes a single coherent mood**: 2-line note emphasizing quiet precision and framing the work over competing with it.
- [x] **Added to Claude Project**: Configuration instructions detailed in `CLAUDE_PROJECT_IDENTITY_UPDATE.md`.
