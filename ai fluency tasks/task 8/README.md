# Task 8: Decide Once: Build Your Identity Kit

[![Track: General AI Fluency](https://img.shields.io/badge/Track-General%20AI%20Fluency-blue.svg)](#)
[![Code: FL-03-ID](https://img.shields.io/badge/Code-FL--03--ID-green.svg)](#)
[![Phase: Foundations](https://img.shields.io/badge/Phase-Foundations-green.svg)](#)
[![Week: 3](https://img.shields.io/badge/When-Week%203-orange.svg)](#)
[![Workload: 2h](https://img.shields.io/badge/Workload-2h-purple.svg)](#)
[![Status: Complete](https://img.shields.io/badge/Status-Complete-success.svg)](#)

> **Assignment Reference**: [Decide Once: Build Your Identity Kit (FlyRank Week 3)](https://aifluency.flyrank.ai/week-03.html#identity-kit)  
> **Author**: Muhammad Umer  
> **Target Audience**: Frontend Engineering Manager / Tech Lead at an AI Startup  
> **Core Mandate**: *"The design is the frame, not the painting. Your work is the painting."*

---

## 📌 Executive Summary

> *"A consistent look is what separates a portfolio that feels intentional from one that feels thrown together; and it comes from a handful of decisions, not from talent. Make them once and every page, and every case study, inherits them."*

This repository directory contains the standalone deliverables for the FlyRank Week 3 assignment: **"Decide Once: Build Your Identity Kit"**.

To prevent the common trap of over-decorating with chaotic fonts, clashing gradients, and flashy visual noise, this identity kit makes a small set of deliberate choices once:
1. **Typography**: Exactly two free Google Fonts (**Geist Sans** for crisp headings + **Inter** for high-density body copy), with **Geist Mono** for code.
2. **Palette**: A restrained 4-color palette audited against **WCAG 2.1 AAA/AA** contrast standards (`#FAFAFA` canvas, `#0F172A` text, `#64748B` muted, `#059669` emerald signal accent).
3. **Brand Mark**: Clean vector monogram [`logo.svg`](logo.svg) and 32x32 browser tab [`favicon.svg`](favicon.svg).
4. **Standing Style Note**: Injected into Claude Project and workspace instructions to ensure all future UI generation maintains consistent visual discipline.

---

## 📂 Deliverables Directory Structure

```
ai fluency tasks/task 8/
├── README.md                              # Master showcase, executive summary & compliance matrix
├── IDENTITY_KIT.md                        # Master one-page identity spec (Fonts, Palette, Tokens, Style note)
├── CLAUDE_PROJECT_IDENTITY_UPDATE.md      # Claude Project custom instructions & consistency verification
├── SUBMISSION_TEMPLATE.md                 # Ready-to-copy portal submission fields (Links, Notes, Uploads)
├── logo.svg                               # Production vector wordmark for navigation header
├── favicon.svg                            # Scalable high-contrast browser tab favicon (32x32)
└── identity-spec-card.svg                 # Visual token specimen card showing swatches & typography
```

---

## 🔤 1. Typography System

| Role | Font Family | Weights | Optical Tracking | Rationale |
| :--- | :--- | :--- | :---: | :--- |
| **Headings** | **Geist Sans** | `600`, `700` | `-0.02em` | Engineered by Vercel for technical dashboards; geometric and authoritative. |
| **Body** | **Inter** | `400`, `500` | `normal` | Tall x-height, open counters, and high legibility across mobile and desktop displays. |
| **Code / Types** | **Geist Mono** | `400`, `500` | `normal` | Clean monospace for Zod schemas (`z.infer<T>`) and CLI inputs. |

---

## 🎨 2. The 4-Color Palette & Contrast Audit

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
