# Free AI Toolkit Setup Matrix

> **Assignment**: Draw the Path: Portfolio Sitemap + Toolkit (Brief Item 2)  
> **Requirement**: Configure free tier accounts across Claude, ChatGPT, Gemini, and Perplexity

---

## 1. Multi-Tool Environment Matrix

To prevent vendor lock-in and enable cross-model validation during the 8-week portfolio build, the following four primary AI engines are initialized on their free tiers:

| Tool | Provider | Platform URL | Primary Role in Portfolio Build | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Claude** | Anthropic | [claude.ai](https://claude.ai) | **Primary Tutor & Project Workspace**: Houses persistent proof statement, reviews TypeScript code, guides architectural trade-offs. | Active |
| **ChatGPT** | OpenAI | [chatgpt.com](https://chatgpt.com) | **Comparative Validator**: Cross-checks prompt outputs, generates alternative UX copy, stress-tests reasoning. | Active |
| **Gemini** | Google | [gemini.google.com](https://gemini.google.com) | **Multimodal & Large Context**: Analyzes visual design wireframes, layout mockups, and large dependency trees. | Active |
| **Perplexity** | Perplexity AI | [perplexity.ai](https://perplexity.ai) | **Real-Time Research & Docs**: Live citations for latest React 19 APIs, Next.js routing patterns, and WCAG AA guidelines. | Active |

---

## 2. Multi-Model Comparative Strategy (Why 4 Tools?)

1. **Epistemic Vigilance (Ethan Mollick's Diligence)**:
   - No single model is infallible. When deciding on sensitive frontend patterns (e.g. streaming SSR error handling in React 19), asking both Claude and ChatGPT reveals subtle discrepancies or deprecated API usages.
2. **Real-Time Knowledge via Perplexity**:
   - Standard LLMs have training cutoff dates. Perplexity grounds technical queries against live GitHub issues and official documentation for packages like Zod, TanStack Query, and Tailwind v4.
3. **Multimodal Feedback via Gemini**:
   - Uploading screenshot sketches of sitemaps and wireframes to Gemini allows rapid feedback on visual hierarchy and readability before writing CSS.
