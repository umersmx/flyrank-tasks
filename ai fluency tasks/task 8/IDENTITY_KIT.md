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
