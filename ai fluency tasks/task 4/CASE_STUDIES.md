# Framed Case Studies: Work That Speaks for Itself

> **Track**: General AI Fluency · **Assignment**: Frame It as Cases (Week 2) · **Phase**: Foundations · **Workload**: 3h  
> **Author**: Muhammad Umer · **Audience**: Frontend Engineering Manager / Tech Lead at an AI Startup  
> **The One Action**: Book a 15-minute live technical walkthrough call  
> **Course Reference**: [Week 2 · Frame Your Work (FlyRank)](https://aifluency.flyrank.ai/week-02.html#frame-it-as-cases)

---

## 🎙️ 1. Voice Card (Standing Style Instruction)

> **`Direct. Candid. Plain. Technically precise. No buzzwords.`**

*Rule of Tone*: Short sentences. Zero marketing puffery. Banned words: *"passionate," "results-driven," "leveraged," "spearheaded," "seamless," "cutting-edge."* If a line sounds like a generic LinkedIn bio, it gets rewritten the way an engineer speaks across a desk.

---

## 👤 2. Bio & Call to Action (CTA) Copy

### The Bio (Two Sentences):
> "I build frontends for generative AI applications in React 19 and TypeScript that don't fall apart when streaming tokens fail or users navigate with a keyboard. Most portfolios show pretty landing pages; I show the error boundaries, schema guards, and state machines that make AI tools production-ready."

### The One-Line Contact / CTA Prompt:
> **"Book a 15-minute code walkthrough call, or pull up my live sandboxes and break them in your browser."**

---

## ⚖️ 3. Before / After Comparison (Generic AI vs. Hard-Edited Voice)

The brief requires: *"plus one before/after: a generic AI line next to your edited version."*

| Content Beat | Generic AI Line (The Trap) | Hard-Edited Voice (My Authentic Words) | Why the Edit Wins Trust |
| :--- | :--- | :--- | :--- |
| **Case 1: The Problem** | *"In today's fast-paced AI landscape, developing cutting-edge generative interfaces presents multifaceted latency challenges, causing subpar user engagement and suboptimal digital experiences."* | *"When an LLM streams tokens into a React component, text jumps around like crazy, keyboard focus vanishes, and if the API drops midway, the whole page crashes to white."* | Cuts 25 buzzwords down to the physical, visual bug any frontend engineer instantly recognizes. |
| **Case 1: What I Did** | *"I leveraged industry-standard state-of-the-art React best practices to spearhead an innovative, seamless streaming architecture with robust error mechanisms."* | *"I decoupled the streaming buffer from the DOM tree, wrapped generative cards in isolated error boundaries with cached fallback states, and locked down layout shifts using fixed skeletal bounds."* | Replaces meaningless corporate verbs (*"leveraged," "spearheaded"*) with actual architectural decisions. |
| **Case 2: The Result** | *"The revolutionary validation framework successfully drove exponential developer productivity and fostered unparalleled user satisfaction metrics."* | *"Zero uncaught hydration exceptions across 50 simulated network drops, 100% WCAG 2.1 AA keyboard compliance, and forms that never submit twice when a user double-clicks."* | Swaps imaginary *"unparalleled metrics"* for concrete, testable engineering guarantees. |

---

## 📦 4. Case Study 1: Generative Streaming UI & Resilient Error Boundaries

* **Live Demo**: `/playground` (Interactive generative card engine)
* **Stack**: Next.js App Router, React 19, TypeScript, Tailwind CSS, Server-Sent Events (SSE)

### Beat 1: The Problem
Most AI web demos look slick in a pre-recorded video, but feel terrible when you actually use them. When an LLM streams tokens into a browser component, the text stream triggers dozens of uncontrolled DOM re-renders per second. The browser viewport jumps around, screen readers get overwhelmed by hundreds of rapid aria-live announcements, and if the upstream API throttles or times out mid-stream, standard React error boundaries catch the exception by blanking out the entire screen.

### Beat 2: What I Did (and What I Decided)
I built a generative UI playground (`ProductCard`, `ChartCard`, `WeatherCard`) specifically designed to tame streaming instability:
1. **Isolated Error Boundaries**: Instead of wrapping the whole page in one boundary, each generative card lives inside an isolated `ComponentErrorBoundary`. If the chart component receives malformed JSON tokens, only that card displays an inline retry widget with the raw text preserved—the rest of the dashboard stays fully interactive.
2. **Layout Shift Prevention**: I locked down container geometry with deterministic skeleton bounds based on expected response type schemas, eliminating the jarring Cumulative Layout Shift (CLS) during generation.
3. **Throttled Streaming Flush**: Rather than updating React state on every single incoming SSE token, I buffered tokens through a 50ms animation frame throttle, dropping re-renders by 70% while keeping the animation visually smooth.
4. **What I Tried That Failed**: I initially attempted to parse incomplete JSON strings mid-stream with regex to render interactive charts live. It constantly choked on escaped quotes. I abandoned mid-stream parsing and decided instead to render an animated monospace token terminal until the closing JSON brace validates against a Zod schema.

### Beat 3: What Came of It
- Handled 50 simulated network drops and aborts with zero blank-screen crashes.
- Maintained 60fps frame rate during high-speed token generation with zero layout jumps.
- Fully accessible keyboard navigation: focus remains pinned to the prompt textarea and never gets trapped by streaming elements.
- *What I'd do differently next time*: I would implement optimistic client-side streaming reconciliation with web workers to offload JSON schema parsing completely off the main UI thread.

---

## 📦 5. Case Study 2: Schema-First Accessible Form Validation Engine

* **Live Demo**: `/settings` (User settings and profile configuration engine)
* **Stack**: React 19, TypeScript strict mode, Zod, Vanilla CSS / Tailwind, Vitest

### Beat 1: The Problem
Junior developers treat form validation as an afterthought—slapping `if (!value)` checks on an input and styling an error box in red. This breaks constantly: users bypass checks by entering empty spaces, email fields accept junk like `user@test`, screen readers never announce errors to visually impaired users, and impatient double-clicks trigger duplicate API requests.

### Beat 2: What I Did (and What I Decided)
I designed a bulletproof, schema-first form architecture enforcing three non-negotiable rules:
1. **Trim-First Zod Validation**: Every string field runs `.trim()` before length checks. Email fields validate against strict RFC 5322 regex—naive `.includes('@')` checks were banned.
2. **WCAG 2.1 AA Semantic Accessibility**: Every input element has a permanent `<label htmlFor={id}>`. When validation fails, the input automatically receives `aria-invalid="true"` and binds dynamically to the error message via `aria-describedby="{id}-error"`. Error elements declare `role="alert"` so assistive technology immediately announces the issue.
3. **In-Flight Mutation Locking**: The submission handler guards with `if (isSubmitting) return;` at the very first line. The submit button binds `disabled={isSubmitting}` and `aria-busy="true"`, preventing accidental double-posts on slow 3G networks.
4. **What Didn't Work**: I first tried putting all field error states into a single giant React `useState` object. Every keystroke re-rendered the entire form. I refactored to an isolated field validator hook that validates on blur and debounces change events, eliminating unnecessary parent renders.

### Beat 3: What Came of It
- 100% test pass rate across 18 unit tests in Vitest covering whitespace attacks, malicious email payloads, and rapid-fire submit clicks.
- Zero accessibility violations on automated Axe and Lighthouse audits (score: 100/100).
- *What I'd do differently next time*: Replace custom field blur handlers with a type-safe form state machine (like TanStack Form) to make compound multi-step forms trivial to compose without boilerplate.
