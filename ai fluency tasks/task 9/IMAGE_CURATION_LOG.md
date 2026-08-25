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
