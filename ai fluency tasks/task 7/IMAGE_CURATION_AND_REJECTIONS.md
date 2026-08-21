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

---

### Rejection Case 2: The "Floating Isometric 3D Generative Card"

```markdown
Prompt Tested:
"Isometric 3D render of a software dashboard card floating in mid-air, sleek glass container with glowing data streams, minimal technical UI elements, pastel mint and matte gray materials, clean studio lighting on light gray backdrop --ar 4:3"
```

* **What the AI Delivered**: An attractive floating glass tablet with simulated UI buttons, miniature floating bar charts, and subtle drop shadows.
* **Why It Was Rejected (The Judgment Call)**:
  > *"This image is a fraudulent stand-in for engineering proof. While aesthetically pleasing at first glance, the simulated UI controls have nonsensical button labels, the charts have no axes or actual data points, and the glass reflections look completely melted. Presenting an AI-generated faux UI on a case study about React 19 component architecture is an immediate red flag for any engineering manager—it proves I know how to type an image prompt, but conceals whether I can actually build responsive DOM components. Real screenshots of my working Next.js sandbox with real DevTools overlays beat this fake render 100 times out of 100."*
* **The Decision**: **Rejected with extreme prejudice.** Replaced with a real 1280x720 capture of the interactive Next.js playground (`streaming-cls-comparison.png`).

---

### Rejection Case 3: The "Cyberpunk Coder Silhouette" Avatar

```markdown
Prompt Tested:
"Professional editorial portrait of a young male software engineer sitting at a clean developer workspace, dual monitors displaying code in background, soft natural lighting, realistic photography style, authentic, candid, 35mm lens --ar 1:1"
```

* **What the AI Delivered**: An uncannily smooth portrait of a person in a darkened room, bathed in blue monitor light, with distorted fingers typing on an impossible mechanical keyboard.
* **Why It Was Rejected (The Judgment Call)**:
  > *"Using a synthetic AI person to represent yourself in an internship application is the fastest way to kill professional credibility. The waxy skin texture, asymmetrical headphone cups, and distorted keyboard keys trigger the uncanny valley immediately. A hiring manager hiring an intern wants to work with a real, authentic colleague. Even an imperfect, candid smartphone photo in good natural daylight communicates 10x more trustworthiness and confidence than a glossy, synthetic AI avatar."*
* **The Decision**: **Discarded.** Replaced with an authentic, natural-light portrait (`muhammad-umer-portrait.jpg`).

---

## ⚖️ 4. Comparison Table: Amateur Trap vs. Intentional Restraint

| Dimension | The Amateur Trap (Unchecked AI Generation) | The Intentional Move (Ruthless Human Curation) |
| :--- | :--- | :--- |
| **Hero Background** | Swirling 3D neon vortex that steals visual focus. | Clean canvas (`#FAFAFA`), quiet typography, letting the one-line claim breathe. |
| **Project Previews** | AI-generated isometric 3D mockups with melted, fake buttons. | Authentic, 1:1 cropped screenshots of actual running React 19 code with inspector tabs. |
| **Profile Image** | Stylized Midjourney avatar with airbrushed skin and six fingers. | Real photograph taken in natural daylight with genuine eye contact. |
| **Visual Variety** | 4 different visual styles (flat vector, 3D glass, cyberpunk, pastel). | 1 consistent visual system: Geist typography, monochrome slate hierarchy, 1 emerald accent. |
| **Mental Model** | *"Look at how many cool images AI can generate!"* | *"Look at the architectural trade-offs I made in this codebase."* |

---

## 📌 5. The Golden Rule of Portfolio Curation

> **"If an image does not prove a claim, eliminate it. If an image competes with the work, quiet it down. When in doubt, whitespace wins."**

---

## ✅ Evaluation Checklist

- [x] **Images match the content map**: Every image maps directly to a section in `THROUGH_LINE_CONTENT_MAP.md`.
- [x] **Real captures for work**: Generative streaming UI and Zod form engine use real software captures, zero AI mockups.
- [x] **Real photo for personal identity**: Explicitly committed to authentic photography; AI avatars banned.
- [x] **Three explicit AI rejection notes**: Deep, articulate post-mortems exposing AI slop, fake UI representations, and visual competition.
- [x] **Rejection notes show genuine engineering judgment**: Focuses on recruiter psychology, cognitive load, and proof integrity rather than superficial preference.
