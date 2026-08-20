# Anthropic Prompt Engineering Tutorial: Key Takeaways

> **Course Reference**: Anthropic Interactive Prompt Engineering Tutorial (Basics Chapters)  
> **Assignment Reference**: FL-02 (Brief Item 1)

---

## 1. Chapter 1: Clear, Direct & Detailed Instructions
- **Golden Rule**: Treat the model as a brilliant but literal intern. If you don't explicitly forbid something (like introductory conversational filler or `any` types), it will assume it has creative freedom.
- **Specificity Over Brevity**: Providing exact validation boundaries (`min(1)`, `.trim()`, regex) eliminates ambiguity.

---

## 2. Chapter 2: Role Prompting (Assigning Roles)
- Giving Claude a persona (e.g. *"Principal TypeScript Architect"*) sets the baseline vocabulary, technical depth, and expected engineering standards.
- A strong role prevents the model from generating beginner tutorials or toy examples.

---

## 3. Chapter 3: Separating Data and Instructions (XML Tags)
- Wrapping context, examples, and data payloads in explicit XML tags (e.g. `<example>`, `<field_audit>`, `<input_json>`) prevents prompt injection and structural confusion.
- Claude natively parses and respects XML tag boundaries with high fidelity.

---

## 4. Chapter 4: Few-Shot Prompting
- Providing 1–2 concrete examples of desired input/output pairs is more effective than paragraphs of abstract explanation.
- Calibrates naming conventions (e.g. `PascalCaseSchema`, `PascalCaseEnum`), code formatting, and edge case strategies immediately.

---

## 5. Chapter 5: Step Decomposition & Chain-of-Thought
- Forcing the model to "think out loud" or perform an initial audit stage (e.g. `<field_audit>`) before emitting code drastically reduces logical oversights.
- When the model evaluates nullability and optionality explicitly first, the resulting code has zero type errors.
