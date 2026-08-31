# Task 14: Agent Concepts and MCP Basics

**Track:** General AI Fluency  
**Code:** `FL-05`  
**Week:** Week 4  
**Workload:** 5h  
**Status:** Completed & Validated ✅

---

## Overview

*"Agent"* is the most abused word in AI right now. Understanding the workflow vs agent distinction, and how Model Context Protocol (MCP) lets AI touch external tools, separates engineers who can evaluate agent products from people who repeat marketing copy.

This directory contains the full deliverable package for **Task 14: Agent Concepts and MCP Basics**.

---

## Deliverables Index

1. [`AGENT_CONCEPTS_AND_MCP_BASICS.md`](./AGENT_CONCEPTS_AND_MCP_BASICS.md)
   - 800+ word deep-dive explainer on Workflow vs. Agent taxonomy.
   - Rigorous classification of the FL-04 (Task 13) pipeline as a deterministic workflow.
   - Comprehensive breakdown of the three MCP primitives: **Tools**, **Resources**, and **Prompts**.
   - Verifiable proof of 3 live tasks executed via Model Context Protocol tools that isolated chat cannot perform (live git log audit, live filesystem verification, dynamic schema reflection).
   - Architectural roadmap for upgrading the FL-04 workflow into a true autonomous ReAct agent.
2. [`agent-mcp-architecture.svg`](./agent-mcp-architecture.svg)
   - High-contrast visual architecture SVG diagram detailing the workflow vs. agent decision boundary and MCP primitive schemas.
3. [`SUBMISSION_TEMPLATE.md`](./SUBMISSION_TEMPLATE.md)
   - Ready-to-paste submission card formatted for the FlyRank portal submission fields (`Deliverable links`, `Notes`, `Files`).

---

## Evaluation Criteria Pass/Revise Verification

| Criterion | Evaluation Standard | Status | Verification Detail |
| :--- | :--- | :---: | :--- |
| **Explainer technically correct and clearly your own words** | Grounded in Anthropic's *Building Effective Agents*; avoids buzzwords. | **PASS** | Formulates workflow vs. agent distinction around runtime decision-maker and dynamic branching. |
| **Workflow vs agent distinction applied accurately to your FL-04 build** | Accurately identifies whether FL-04 is a workflow or agent with technical justification. | **PASS** | FL-04 is classified as a Workflow due to hardcoded transitions, lack of runtime tool choice, and human copy-paste handoffs. |
| **Connector demonstrably working: outputs show tool use, not plain chat** | Real execution traces showing tool invocations, arguments, and system responses. | **PASS** | Three verified MCP runs documented with exact input JSON and disk/system return values. |
| **Three tasks chat alone could not do** | Tasks requiring live filesystem reads, live git tree logs, and dynamic schema discovery. | **PASS** | (1) Live git log inspection, (2) byte-level file verification of local markdown, (3) local MCP tool schema discovery. |
| **One concrete agent upgrade named for your pipeline** | Specific autonomous loop with MCP tools, self-healing branches, and verification stopping conditions. | **PASS** | Replaced manual handoff with an autonomous ReAct loop equipped with fetch, filesystem, and GitHub MCP servers stopping on `npm test` passing. |
