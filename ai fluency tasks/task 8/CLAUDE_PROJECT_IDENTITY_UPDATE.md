# Claude Project Configuration: Standing Identity Style Note

> **Track**: General AI Fluency · **Assignment**: Decide Once: Build Your Identity Kit (Week 3) · **Phase**: Foundations  
> **Author**: Muhammad Umer · **Audience**: Technical Lead / Frontend Engineering Manager  
> **Assignment Reference**: [https://aifluency.flyrank.ai/week-03.html#identity-kit](https://aifluency.flyrank.ai/week-03.html#identity-kit)

---

## 🎯 1. Integration Objective

The brief mandates:
> *"Write a two-line style note (fonts, hex codes, one sentence on the mood) and add it to your Claude Project so the build stays consistent."*

By storing this style note directly in the **Claude Project Custom Instructions** (alongside our **Proof Statement** from Week 1 and **Voice Card** from Week 2), Claude maintains unbroken visual and architectural discipline during upcoming build sessions (Week 4: Pick the Stack; Week 5: Ship the Ugly Version).

---

## 📝 2. The Injected Instructions Block

The following instructions have been added to the project settings of the **Muhammad Umer - Frontend AI Portfolio Tutor** workspace:

```markdown
### 🎨 VISUAL IDENTITY & DESIGN SYSTEM (WEEK 3 IDENTITY KIT)
Fonts: Geist (headings 600/700), Inter (body 400/500), Geist Mono (code); Palette: #FAFAFA (canvas), #0F172A (text), #64748B (muted), #059669 (accent).
Mood: Quiet, high-contrast engineering precision with generous whitespace—the layout serves as an unobtrusive gallery frame so the real code sandboxes and screenshots remain the star.

### 📐 UI IMPLEMENTATION RULES:
1. Always apply `#FAFAFA` as the root background and `#0F172A` as the default text color; never generate dark purple, neon, or gradient mesh hero sections.
2. Reserve `#059669` (Signal Mint) strictly for interactive primary CTA triggers, focus rings, and passing test indicators.
3. Every card boundary must use subtle borders (`border: 1px solid #E2E8F0` or `#64748B` at 15% opacity), never heavy drop shadows or blurred glassmorphic backdrops.
4. When writing sample UI components or HTML/JSX, apply the semantic tokens `--font-heading` and `--font-body`.
```

---

