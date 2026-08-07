# Task 1: Environment and AI Toolchain (FE-01)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Node](https://img.shields.io/badge/Node.js-LTS%20v20%2B-green.svg)](https://nodejs.org)

> **Track**: Frontend AI Engineering · **Phase**: Setup · **Estimated Hours**: 3h

---

## 📌 Objectives & Scope

1. **Toolchain Setup**: Configure local development environment with Node.js LTS, Git, and AI-first editors (Claude Code & Cursor IDE).
2. **Capstone Foundations**: Establish repository structure with standard `.gitignore`, MIT `LICENSE`, and AI engineering guidelines (`CLAUDE.md` and `.cursorrules`).
3. **Commit Disciplines**: Implement Conventional Commits 1.0.0 standards across all milestones.
4. **AI-Assisted Critique Loop**: Use AI assistant to critique initial documentation and apply substantial architectural and workflow enhancements.

---

## 🛠️ Environment Prerequisites

Ensure the following tools are installed and configured:

```bash
# Verify Node.js LTS and Git
node -v      # v20+ or v25+
git --version # 2.40+

# AI Tooling
claude --version  # Claude Code CLI
cursor --version  # Cursor IDE
```

---

## 📂 Deliverables & Repository Structure

```
task 1/
├── .gitignore        # Comprehensive ignore rules for frontend/AI workspaces
├── LICENSE           # MIT License
├── CLAUDE.md         # Architecture rules & AI assistant conventions
├── .cursorrules      # Cursor IDE configuration rules
├── AI_CRITIQUE.md    # AI critique log & improvement summary
└── README.md         # Enhanced task documentation
```

---

## 🔄 Conventional Commits Format

All commits in this repository strictly adhere to [Conventional Commits 1.0.0](https://www.conventionalcommits.org/):

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `chore` | Build tasks, toolchain, dependencies | `chore: initialize repository with .gitignore and MIT license` |
| `docs` | Documentation and specification updates | `docs: add initial README stub and CLAUDE.md conventions` |
| `feat` | New user-facing features or capabilities | `feat(ui): add modern responsive navigation component` |
| `fix` | Bug fixes and patches | `fix(auth): resolve session token expiration handler` |
| `refactor` | Code restructuring without behavioral changes | `refactor(state): migrate context to atomic store` |

---

