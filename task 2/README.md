# Task 2: The AI-Assisted Workflow Drill (FE-02)

[![Vitest](https://img.shields.io/badge/Vitest-Passing-brightgreen.svg)](https://vitest.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org)
[![WCAG](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **Track**: Frontend AI Engineering · **Phase**: Foundations · **Estimated Hours**: 4h

This directory contains the implementation and comparative analysis for the **AI-Assisted Workflow Drill**, demonstrating the measurable difference between vague, unconstrained AI prompting and structured, test-verified prompt directing.

---

## 🌿 Branches Overview

The feature was implemented independently across two branches:
- **`feat/round-1-vague`**: Single vague prompt (`"make a user settings form with validation"`), unconstrained generation.
- **`feat/round-2-precise`**: Structured prompt with explicit schema, WCAG 2.1 AA a11y requirements, race condition protection, and unit tests.
- **`main`**: Production-ready implementation, passing test suites, and comparative report [WORKFLOW.md](WORKFLOW.md).

---

## 🛠️ Verification & Running Locally

```bash
# Navigate to task 2
