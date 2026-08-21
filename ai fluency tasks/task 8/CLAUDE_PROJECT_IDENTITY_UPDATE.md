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

## 🧪 3. Verification Prompt: Pressure-Testing Consistency

To verify that Claude adheres strictly to the identity kit when scaffolding frontend components, we ran the following prompt:

### Prompt:
> *"Scaffold a hero section component in React 19 for my portfolio, introducing my one-line claim and primary CTA button."*

### Observed AI Output:
```tsx
import React from 'react';

export function PortfolioHero() {
  return (
    <section className="bg-[#FAFAFA] text-[#0F172A] py-20 px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#64748B]">
          Available for Fall 2026 Roles
        </span>
      </div>

      <h1 className="font-['Geist'] text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
        I engineer resilient frontends for generative AI web apps—taming streaming layout shifts, token errors, and accessibility in React 19 and TypeScript.
      </h1>

      <p className="font-['Inter'] text-lg text-[#64748B] max-w-2xl mb-8 leading-relaxed">
        Most AI demos look slick until tokens fail mid-stream or users navigate with a keyboard. I build the error boundaries, schema guards, and state machines that keep production interfaces bulletproof.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#059669] hover:bg-[#047857] text-white font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
        >
          Book 15-Min Walkthrough
        </a>
        <a
          href="#work"
          className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#E2E8F0] hover:bg-white text-[#0F172A] font-medium transition-colors"
        >
          Explore Case Studies ↓
        </a>
      </div>
    </section>
  );
}
```

### Verification Result:
- ✅ Background is strictly `#FAFAFA`, with text `#0F172A`.
- ✅ Heading uses `Geist` at `font-bold` (`700`); body copy uses `Inter`.
- ✅ Accent `#059669` is used exclusively for the primary CTA and status dot.
- ✅ Zero decorative orbs, neon glows, or clashing colors.
