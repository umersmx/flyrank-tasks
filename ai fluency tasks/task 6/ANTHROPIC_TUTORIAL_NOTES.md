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

