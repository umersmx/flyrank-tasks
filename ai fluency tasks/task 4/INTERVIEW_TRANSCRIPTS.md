# Case Framing Interview Transcripts (Week 2)

> **Context**: Socratic interviews conducted with Claude to extract raw engineering decisions and shape them into three-beat case studies.  
> **Standing Voice Card**: `Direct. Candid. Plain. Technically precise. No buzzwords.`

---

## 🎙️ Session 1: Setting the Voice Card

```text
Prompt:
"Here is my voice card. Use it for everything you draft for me: direct, candid, plain, technically precise, no buzzwords. Short sentences. No 'passionate,' 'results-driven,' or 'dynamic.' Three words that sound like me: simple, defensive, verifiable. If a line sounds like a generic corporate AI bio, rewrite it the way a real software engineer would say it across a desk. Confirm you have it, then we will start."
```

> **Claude**: "Understood. Banning marketing fluff, passive voice, and generic superlatives. We will focus purely on: what broke, what you decided, and what actually changed. Let's start with your first project."

---

## 📦 Session 2: Interview for Case Study 1 (Generative Streaming UI)

> **Claude**: "Tell me about the generative UI component playground you built. What was the core problem that made you build it in the first place?"

**Muhammad Umer**:
> "Most generative AI web apps look great in scripted Twitter demos, but the minute you use them live with real network latency, they feel horribly janky. When tokens stream into a React component over SSE, the text stream triggers dozens of uncontrolled re-renders per second. The browser scroll jumps up and down, keyboard focus gets lost, and if the API drops mid-stream, standard React error boundaries catch the exception by crashing the entire screen to a blank white page."

> **Claude**: "Good, that's a physical, relatable problem. What did you actually decide to do about it in the code? What was your architectural approach?"

**Muhammad Umer**:
> "I decoupled the streaming buffer from the DOM tree. Instead of re-rendering on every single SSE token, I buffered tokens and flushed them on a 50ms animation frame throttle, which cut re-renders by 70%. Then, I wrapped every generative card (`ProductCard`, `ChartCard`, `WeatherCard`) in an isolated `ComponentErrorBoundary`. If the LLM generates corrupt JSON for a chart, only that specific card shows a fallback retry box—the rest of the dashboard stays fully interactive."

> **Claude**: "What did you try that completely failed?"

**Muhammad Umer**:
> "I tried parsing partial, incomplete JSON strings in real-time using regular expressions so I could render interactive charts while the model was still typing. It was a disaster. It kept choking on escaped strings and unclosed quotes. I scrapped the whole regex approach and decided to display an animated monospace token stream until the closing brace arrived, then validated the whole object with Zod before rendering."

> **Claude**: "What came of it? Give me the honest result, not an inflated metric."

**Muhammad Umer**:
> "We ran 50 simulated network drops and mid-stream disconnects, and not a single one crashed the page. Frame rate stayed at a steady 60fps during rapid generation with zero layout shifts. If I had to do it differently next time, I'd move the JSON parsing into a web worker off the main thread."

---

