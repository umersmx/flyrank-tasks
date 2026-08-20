# Kill Your Darlings: Image Curation & AI Rejection Notes

> **Track**: General AI Fluency · **Assignment**: Consistency, Not Talent (Week 3) · **Phase**: Foundations · **Workload**: 6h  
> **Author**: Muhammad Umer · **Audience**: Frontend Engineering Manager / Tech Lead at an AI-First Startup  
> **Core Principle**: *"AI can generate a hundred images in minutes. The skill is not making them. It is judging which one serves the work, and knowing when a real screenshot beats anything generated."*  
> **Course Reference**: [Week 3 · Map It & Give It a Face (FlyRank)](https://aifluency.flyrank.ai/week-03.html#curate-your-images)

---

## 🎯 1. Image Strategy: The Hierarchy of Proof

In a technical portfolio for an engineering manager, images are **evidence**, not wallpaper. If an image doesn't prove an engineering capability, demonstrate a user experience, or verify identity, it has no business being on the page.

### The Three Visual Categories
1. **Work Evidence (Real Captures Only)**: Live component screens, architecture diagrams, error states, and terminal test passes. **Strict Rule**: Never use an AI-generated mock or synthetic UI template to represent real software engineering.
2. **Personal Identity (Real Photography Only)**: Authentic portrait photo of Muhammad Umer. AI avatars or stylized digital renders erode trust and scream insecure pretense.
3. **Connective Tissue (Restraint over Decoration)**: For backgrounds and dividers, generous white space and clean vector geometry beat noisy AI illustrations every single time.

---

## 🖼️ 2. The Portfolio Image Manifest (Matching Content Map)

Every required visual asset on the portfolio is cataloged below with its exact role, format, and authenticity standard:

| # | Placement / Section | Asset Name | Visual Type | Format & Dimensions | Authenticity Rule & Content Description |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **IMG-01** | `Global Nav` | `logo.svg` | Vector Graphic | SVG (Scalable) | Minimalist `MU.` slate lockup with emerald signal dot. |
| **IMG-02** | `Global Header` | `favicon.svg` | Vector Icon | SVG / 32x32 px | High-contrast browser favicon for tab recognition. |
| **IMG-03** | `Hero / Header` | `muhammad-umer-portrait.jpg` | **Real Photo** | WebP / 480x480 px (1:1) | Real natural-light photograph of Muhammad Umer at desk. No AI airbrushing or digital filtering. |
| **IMG-04** | `Case 1: Lead` | `streaming-cls-comparison.png` | **Real Capture** | WebP / 1280x720 px (16:9) | Side-by-side browser screenshot: chaotic layout shift without bounds vs. rock-solid skeleton bounds during 60 tokens/sec streaming. |
| **IMG-05** | `Case 1: Lead` | `error-boundary-retry.png` | **Real Capture** | WebP / 1280x720 px (16:9) | Crisp capture of isolated `ComponentErrorBoundary` catching a malformed JSON token while the rest of the dashboard remains fully interactive. |
| **IMG-06** | `Case 2: Form` | `wcag-screenreader-audit.png` | **Real Capture** | WebP / 1280x720 px (16:9) | Real Chrome DevTools Accessibility tree and VoiceOver caption panel demonstrating `role="alert"` and `aria-describedby` error announcements. |
| **IMG-07** | `Case 2: Form` | `vitest-boundary-coverage.png` | **Real Capture** | WebP / 1280x720 px (16:9) | Real terminal screenshot showing 100% pass on Zod schema edge cases (whitespace trimming, RFC 5322 regex). |
| **IMG-08** | `Connective` | `content-map-diagram.svg` | Vector Diagram | SVG / 880x580 px | Clean technical flow diagram showing the through-line from Hero to 15-min booking. |

---

## 🚫 3. Ruthless Curation: Generated AI Image Rejection Notes

> *"Curate ruthlessly and write one or two lines on a generated image you rejected and why. The rejection note shows genuine judgment, not just 'I liked this one.'"*

To test visual options for the Hero connective tissue and card backdrops, I generated multiple candidate images using modern AI image models (Midjourney v6 and DALL-E 3). Below is the clinical post-mortem of why **all three generated concepts were rejected**.

---

### Rejection Case 1: The "Abstract AI Neural Glow" Hero Wallpaper

```markdown
Prompt Tested:
"A minimal high-tech abstract 3D render of glowing neural threads connecting in a dark void, glassmorphic refraction, subtle mint green and slate accents, futuristic clean software engineering background, ultra-high resolution --ar 16:9 --style raw"
```

* **What the AI Delivered**: A visually striking, swirling vortex of neon cyan filaments, glowing translucent glass rods, and dramatic depth of field with chromatic aberration.
* **Why It Was Rejected (The Judgment Call)**:
  > *"This image fails because it commits the cardinal sin of portfolio design: **it upstages the work**. The violent cyan lighting and high-contrast glowing filaments scream 'crypto marketing agency' rather than thoughtful software engineering. If placed in the hero section, a technical lead's eyes would be drawn to the decorative 3D noise instead of my one-line claim and live streaming code sandbox. Furthermore, it has the unmistakable 'AI-slop' aesthetic—every junior developer portfolio uses this exact generic glass prompt."*
* **The Decision**: **Bin it completely.** Replaced with clean, generous whitespace (`#FAFAFA`) and high-contrast typography (`Geist` / `#0F172A`).

