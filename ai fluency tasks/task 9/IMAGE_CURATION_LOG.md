# Kill Your Darlings: Curate Your Images (The Discernment Audit)

> **Track**: General AI Fluency · **Assignment**: Kill Your Darlings: Curate Your Images (Week 3) · **Phase**: Foundations · **Workload**: 2h  
> **Author**: Muhammad Umer · **Audience**: Technical Lead / Frontend Engineering Manager at an AI Startup  
> **Core Mandate**: *"AI lets you make any image in seconds, which is exactly why judgment matters more than generation. Choose what serves your proof, reject the rest, and know when a real screenshot beats anything generated."*  
> **Assignment Reference**: [https://aifluency.flyrank.ai/week-03.html#curate-your-images](https://aifluency.flyrank.ai/week-03.html#curate-your-images)

---

## 📌 Executive Summary

> *"The assignment isn't 'make images'—it's 'choose images that serve your proof and look like they belong together', and knowing when a real screenshot of your work beats anything generated."*

This document provides the complete **Image Curation Log & Discernment Audit** for Muhammad Umer's Frontend AI Engineering portfolio. It audits every visual need against the Week 3 Content Map, enforces an uncompromising standard of **real software captures for engineering proof**, mandates **authentic photography for personal identity**, and details clinical rejection post-mortems of four AI-generated concepts to demonstrate rigorous aesthetic and technical judgment.

---

## 🗺️ 1. Image Manifest: Mapped to Real Content Needs

> *"List the images your portfolio actually needs, match the content map. Most should be real: screenshots, photos, or visuals of your actual work."*

Every single image in the portfolio earns its place by answering a specific question an Engineering Manager asks when evaluating code quality and credibility:

| Asset ID | Placement (Content Map) | Asset Filename | Visual Category | Format & Spec | Core Question It Answers |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **IMG-01** | `Global Nav` | `logo.svg` | Vector Graphic | SVG (Scalable) | *Who built this, and do they have a disciplined visual identity?* |
| **IMG-02** | `Global Header` | `favicon.svg` | Vector Icon | SVG / 32x32 px | *Does the site feel finished and polished down to the browser tab?* |
| **IMG-03** | `Hero Section` | `muhammad-umer-portrait.jpg` | **Real Photo** | WebP / 480x480 (1:1) | *Who is the real human engineer behind this work?* |
| **IMG-04** | `Case 1: Lead` | `streaming-cls-comparison.png` | **Real Capture** | WebP / 1280x720 (16:9) | *Did they actually solve Cumulative Layout Shift during token streaming?* |
| **IMG-05** | `Case 1: Lead` | `error-boundary-recovery.png` | **Real Capture** | WebP / 1280x720 (16:9) | *What happens when the LLM stream drops—does the UI crash or recover gracefully?* |
| **IMG-06** | `Case 2: Forms` | `wcag-screenreader-audit.png` | **Real Capture** | WebP / 1280x720 (16:9) | *Did they truly test accessibility with assistive tech, or is it fake compliance?* |
| **IMG-07** | `Case 2: Forms` | `vitest-boundary-coverage.png` | **Real Capture** | WebP / 1280x720 (16:9) | *Are edge cases covered by automated test suites with zero regressions?* |
| **IMG-08** | `Standards` | `git-commit-history.png` | **Real Capture** | WebP / 1280x720 (16:9) | *Do they write clean, atomic Conventional Commits and maintain clean repos?* |
| **IMG-09** | `Architecture` | `content-map-diagram.svg` | Vector Diagram | SVG / 880x580 px | *Is the portfolio flow intentional and aligned with conversion?* |

---

## 📸 2. Real Captures for Work: Why Real Beats AI Every Time

> *"For your work, use real captures, clean, cropped, legible... Note where you chose a real capture over AI."*

### Decision 1: Case 1 Proof (Generative Streaming UI)
* **What I Used**: Real Chrome DevTools screenshot (`streaming-cls-comparison.png`) showing live token stream rate (60 tokens/sec) and container skeleton bounds.
* **Why Real Beats AI**: An AI-generated illustration of a "futuristic data dashboard" contains zero evidence. An engineering lead cannot inspect layout shift metrics or network waterfall timings on a synthetic render. A clean, cropped screenshot of real DOM elements with Chrome Performance Profiler running proves immediate technical authenticity.

### Decision 2: Case 2 Proof (Schema-First Form Engine)
* **What I Used**: Real terminal output capture (`vitest-boundary-coverage.png`) displaying 14 passing unit tests across input trimming, RFC 5322 email regex, and mutex double-click prevention.
* **Why Real Beats AI**: AI image generators love to draw abstract checkmarks or glowing green shields to represent "validation." Showing actual terminal output with test execution times (e.g. `✓ should reject whitespace-only names (1.4ms)`) turns a generic claim into undeniable proof.

---

## 👤 3. Personal Identity: The Real Photography Rule

> *"For anything that is you, use a real photo. Note where you made each call."*

* **Asset**: `muhammad-umer-portrait.jpg`
* **Execution**: Clean, natural-light photograph taken at a workstation with high-resolution lens. No digital airbrushing, no cartoon filters, and no synthetic generative recreation.
* **Where the Call Was Made**: In the Hero and About sections.
* **The Rationale**: Many junior AI interns use stylized Midjourney avatars (e.g., cyberpunk lighting, glowing headsets). To a hiring manager, this immediately triggers distrust. An engineering team is hiring a real person who will join their Slack, pull requests, and standups. A natural, professional photograph demonstrates maturity, confidence, and transparency.

---

## 🎨 4. Connective Tissue: Consistency Over Clutter

> *"For the connective tissue (hero texture, icons), generate options in one consistent style/mood that matches your kit; iterate the prompt to hold the style steady."*

* **Selected Approach**: Clean vector geometry and generous whitespace (`#FAFAFA`) accented by precision SVG icons (`MU.` monogram lockup, terminal brackets, and subtle grid dividers).
* **Why Not AI Textures?**: When AI generates "subtle background patterns," it almost always injects unwanted color shifts, asymmetrical artifacts, or organic noise that distracts from the text. Using SVG paths with our design tokens (`#E2E8F0` at 15% opacity) keeps the style mathematically consistent across all viewports.

---

## 🏆 5. The Final Image Set (The Keepers)

The complete "Keepers" set contains exactly **9 visual assets**:
1. **`logo.svg`**: Production vector brand mark.
2. **`favicon.svg`**: 32x32 scalable tab icon.
3. **`muhammad-umer-portrait.jpg`**: Authentic natural portrait.
4. **`streaming-cls-comparison.png`**: Real before/after capture of token stream layout stability.
5. **`error-boundary-recovery.png`**: Real capture of inline fallback retry card.
6. **`wcag-screenreader-audit.png`**: Real DevTools accessibility tree inspection.
7. **`vitest-boundary-coverage.png`**: Real terminal screenshot of 100% passing tests.
8. **`git-commit-history.png`**: Real terminal log showing Conventional Commits.
9. **`content-map-diagram.svg`**: Vector flow architecture diagram.

---

## 🚫 6. Ruthless Rejections: The Discernment Audit

> *"Curate ruthlessly. Write one or two lines on a generated image you rejected and why, this is the discernment part, and it's graded."*

To test and grade our discernment, four candidate AI-generated images were generated and systematically analyzed. Below are the clinical rejection post-mortems:

---

### ❌ Rejection 1: The "Neural Vortex" Hero Wallpaper
* **Model**: Midjourney v6 (`--style raw`)
* **Prompt**: *"Abstract minimal background of soft neural network connections, glowing nodes in slate and emerald, sleek glassmorphism, soft studio lighting, ultra-high resolution --ar 16:9"*
* **Visual Output**: An intricate, glowing web of electric cyan and neon mint fiber-optic tendrils undulating across a dark gradient.
* **The Clinical Rejection Note**:
  > *"**Rejected because it violently upstages the one-line claim.** While visually dazzling, the glowing filaments create intense chromatic contrast that immediately fatigues the reader's eyes before they can read my technical headline. It evokes the generic aesthetic of speculative Web3 landing pages rather than careful, rigorous frontend engineering. Binned in favor of clean `#FAFAFA` canvas whitespace."*

---

### ❌ Rejection 2: The "Floating 3D Glass Dashboard" UI Stand-In
* **Model**: DALL-E 3
* **Prompt**: *"Isometric 3D render of an AI chat dashboard interface with floating glass cards, clean charts, pastel mint accents, soft shadows on a light gray background"*
* **Visual Output**: An aesthetically pleasing floating glass tablet displaying miniature charts, pill buttons, and soft reflections.
* **The Clinical Rejection Note**:
  > *"**Rejected as fraudulent engineering proof.** A closer inspection reveals that the buttons have gibberish text, the chart axes lack numbers, and the glass edges have melted, non-Euclidean geometry. Submitting a fake AI render on a portfolio dedicated to React 19 architecture proves nothing about coding ability. Binned in favor of a real, cropped 1280x720 screenshot of my working Next.js sandbox."*

---

### ❌ Rejection 3: The "Cinematic Cyberpunk Coder" Avatar
* **Model**: Midjourney v6
* **Prompt**: *"Cinematic portrait of a male frontend developer at clean dual-monitor workstation, ambient blue and green backlighting, depth of field, 85mm lens, photorealistic --ar 1:1"*
* **Visual Output**: A moody, dramatic portrait of a programmer staring intensely at monitors in a dark room with heavy blue rim lighting.
* **The Clinical Rejection Note**:
  > *"**Rejected for severe uncanny-valley pretense.** The skin has an unnatural, plastic sheen, the headphone band melts into the hair, and the dark cyberpunk lighting communicates an anti-social gaming persona rather than an accessible engineering colleague. Binned in favor of an authentic daylight portrait with genuine eye contact."*

---

### ❌ Rejection 4: The "3D Floating Zod Shield" Icon
* **Model**: DALL-E 3
* **Prompt**: *"A modern 3D icon of a validation shield with a checkmark, glossy mint green and dark slate materials, floating, isolated on white background, minimal Apple-style"*
* **Visual Output**: A bulbous, highly reflective green plastic shield hovering over a heavy artificial drop shadow.
* **The Clinical Rejection Note**:
  > *"**Rejected due to clashing aesthetic skeuomorphism.** The glossy plastic sheen and exaggerated 3D drop shadow clash horribly with the flat, Swiss-minimalist typography (`Geist`) and subtle borders of our design system. It looks like a cheap mobile app badge. Binned in favor of a clean, lightweight 1.5px stroke vector icon."*

---

## ⚖️ 7. Discernment Matrix: AI Generation vs. Human Selection

| Dimension | Lazy AI Generation (The Amateur Trap) | Rigorous Curation (The Intentional Engineer) |
| :--- | :--- | :--- |
| **Visual Hierarchy** | Loud, saturated backgrounds that scream for attention. | Quiet gallery frame that directs 100% of attention to code artifacts. |
| **Proof Credibility** | Synthetic mockups with melted, impossible UI controls. | Real browser captures with DevTools, network tabs, and terminal passes. |
| **Human Authenticity** | Stylized, waxy AI avatars that undermine personal trust. | Real natural-light photography that builds immediate rapport. |
| **Style Consistency** | 4 clashing art styles (3D glass, cyberpunk, vector, flat). | 1 disciplined system: Geist typography, slate palette, SVG precision. |

---

## ✅ Evaluation Criteria Compliance Matrix

- [x] **Images map to real needs**: 9 assets mapped directly to specific content sections.
- [x] **Work shown with real captures, not AI stand-ins**: Real captures for streaming UI, error boundaries, WCAG audits, and test suites.
- [x] **Any AI-generated images share one consistent style**: Rejected chaotic AI styles in favor of a mathematically unified vector + screenshot system.
- [x] **A real photo is used where the subject is the person**: Authentic daylight photograph committed for personal identity.
- [x] **Rejection notes show genuine judgment**: 4 comprehensive diagnostic rejection post-mortems demonstrating why flashy AI visuals fail technical review.
