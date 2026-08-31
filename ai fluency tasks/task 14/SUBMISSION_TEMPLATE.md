# Submissions for Task 14: Agent Concepts and MCP Basics

This document contains copy-paste-ready submission content for the FlyRank portal submission modal for **Task 14: Agent Concepts and MCP Basics** (`FL-05`).

---

### Deliverable links:
```text
https://github.com/umersmx/flyrank-tasks/blob/main/ai%20fluency%20tasks/task%2014/AGENT_CONCEPTS_AND_MCP_BASICS.md
https://smxai-flyrank.vercel.app/
```

*(Note: One URL per line as required by portal guidelines)*

---

### Notes:
```text
Task 14 — Agent Concepts and MCP Basics (General AI Fluency | Week 4 | FL-05)

1. Workflow vs. Agent Distinction (In My Own Words):
- Workflow: A deterministic, human-authored DAG where execution order, transitions, and handoffs are hardcoded. The LLM acts purely as a processing node within fixed steps.
- Agent: An autonomous system where the LLM is the runtime decision-maker. Given an open objective and a toolkit of external functions, it enters a ReAct loop ([Thought] -> [Action] -> [Observation]), dynamically selecting tools and deciding its own stopping condition.
- Classification of FL-04 Pipeline (Task 13): Unambiguously a Workflow. Transitions between NotebookLM, Claude Prompt 1, 2, and 3 are fixed; the model has no autonomy to branch, select tools, or change sequencing.

2. MCP Primitives Understood:
- Tools: Model-controlled executables (functions that take real-world action: git_commit, run_command, fetch_url).
- Resources: Application-controlled data feeds (read-only URI context attached to the context window: file://, git://).
- Prompts: User-controlled slash commands / parameterized templates exposed by MCP servers.

3. Live Working MCP Connection (Evidence of 3 Tasks Chat Alone Could Not Do):
- Task 1 (Local Git Audit): Executed `run_command` over stdio MCP to inspect live repository logs, extracting real commit hashes (36b0ce5, 32ddee0) directly from disk. Chat alone has zero disk access.
- Task 2 (Local Artifact Inspection): Executed `view_file` over MCP to inspect 16.4KB of `AUTOMATION_WORKFLOW_V2.md`, confirming line-level presence of Section 5 without copy-paste or hallucination.
- Task 3 (Dynamic MCP Tool Discovery): Queried local filesystem MCP schema registry at `C:\Users\umerf\.gemini\antigravity-ide\mcp`, discovering active lazy tools (notebooks, visualization, data-agent-kit).

4. Upgrading FL-04 Pipeline to a True Agent:
- Replace static copy-paste handoffs with an autonomous ReAct loop equipped with 3 MCP servers (@modelcontextprotocol/server-fetch, server-filesystem, and server-github).
- Self-Healing Branching: If a docs URL 404s, the agent autonomously searches Brave Search MCP for mirrors rather than crashing.
