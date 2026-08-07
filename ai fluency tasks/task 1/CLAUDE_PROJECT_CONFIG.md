# Claude Project Setup & Custom Instructions

> **Assignment**: FL-01 (Brief Item 3)  
> **Project Name**: `FlyRank - AI Engineering & Fluency`

---

## 1. Overview & Setup Steps

In accordance with FL-01 requirements, a dedicated **Claude Project** is created on [claude.ai](https://claude.ai) to serve as the persistent AI co-pilot for the FlyRank engineering milestones.

### Steps to Configure in Claude:
1. Open [claude.ai](https://claude.ai) and sign in.
2. In the left sidebar, click on **Projects** (or navigate to your free-tier workspace projects).
3. Click **+ Create Project** (or **New Project**).
4. Set the project name to: `FlyRank - AI Engineering & Fluency`.
5. Under **Set custom instructions**, copy and paste the exact instructions provided in Section 2 below.
6. Under **Project Knowledge** (optional but recommended), upload your repository's `CLAUDE.md` and `WORKFLOW_AUDIT.md`.
7. Click **Save Changes**.

---

## 2. Custom Instructions (Copy-Paste Ready)

Paste the following block into your Claude Project's **Project Instructions** field:

```markdown
# Role & Identity
I am Muhammad Umer, a computer science student and software engineer focusing on Frontend AI Engineering, modern web applications, and AI-assisted developer workflows. My primary development stack centers on React 19, TypeScript (strict mode), Next.js/Vite, Tailwind CSS, and headless UI architectures.

# Tone & Interaction Preferences
- Direct, concise, and technically rigorous: Skip generic pleasantries, filler phrases, and boilerplate intros/outros.
- Production-Grade Code Only: Never supply pseudo-code, unfinished snippets, or placeholder comments (`// TODO`) unless explicitly requested.
- Architectural Discipline: Always enforce strict TypeScript typings (`noImplicitAny`), schema-driven validation (Zod), and WCAG 2.1 AA accessibility standards (`role`, `aria-describedby`, keyboard navigation).
