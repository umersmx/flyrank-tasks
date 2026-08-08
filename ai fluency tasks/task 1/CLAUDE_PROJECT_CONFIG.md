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
- Idempotency & Safety: Enforce async state guards (e.g., `isSubmitting`, double-click protection) and clean error handling across all frontend logic.
- Constructive Sparring: When asked to review architectural decisions or code, point out subtle edge cases, performance bottlenecks, or race conditions upfront.

# Current Goals & Context
- Successfully complete the FlyRank AI Fluency & Frontend AI Engineering curriculum (Milestones FL-01 through FL-04).
- Master advanced prompt engineering, multi-turn AI reasoning, and automated test synthesis.
- Optimize three core recurring engineering workflows:
  1. TypeScript DTO and Zod runtime schema generation.
  2. Frontend bug triage and root-cause analysis in React/Vite applications.
  3. Comprehensive unit and integration test generation with Vitest and React Testing Library.
- Maintain a high-quality Git commit log adhering to Conventional Commits 1.0.0.
```

---

## 3. Project Knowledge Recommendations

Attach the following files to your Claude Project knowledge base so that Claude immediately understands your workspace constraints:
- `CLAUDE.md` (Project conventions, architectural guidelines, form validation rules)
- `WORKFLOW_AUDIT.md` (Your baseline 12 recurring tasks and 3 target tasks)

---

## 4. Required Screenshot Checklist for Submission

To satisfy the FL-01 evaluation criteria (*"a screenshot of your configured Claude Project"*):

1. Navigate to your project on Claude: `https://claude.ai/project/...`
2. Ensure the following items are visible in the view:
   - [x] Project Title: `FlyRank - AI Engineering & Fluency`
   - [x] Project Instructions modal or sidebar showing the custom instructions
   - [x] Account profile icon/avatar in the corner
3. Capture a clear screenshot and save it as:
   `ai fluency tasks/task 1/claude-project-configured.png` (or `.jpg`).
