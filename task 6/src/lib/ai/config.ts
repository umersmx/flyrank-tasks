/**
 * ============================================================================
 * AI Model Configuration & System Prompt Module
 * ============================================================================
 * 
 * This module is the single source of truth for AI model orchestration,
 * system prompt engineering, and safety guardrails across the SMX AI
 * Streaming Chat Interface.
 * 
 * Keeping prompt engineering and model hyperparameters centralized in this
 * module ensures:
 * 1. Consistent conversational voice and architectural reasoning across routes.
 * 2. Rapid model swapping (e.g. Claude 3.5 Sonnet -> Claude 3.5 Haiku) without
 *    touching route handlers or UI components.
 * 3. Clear auditability for token usage, latency budgets, and security bounds.
 */

export interface ModelConfig {
  /** Anthropic Claude model identifier */
  model: string;
  /** Maximum generation tokens per streaming completion */
  maxTokens: number;
  /** Sampling temperature: 0.0 for deterministic code, 0.7 for conversational flexibility */
  temperature: number;
  /** Nucleus sampling probability cutoff */
  topP: number;
  /** Maximum number of previous conversation turns retained to prevent context overflow */
  maxHistoryTurns: number;
}

/**
 * Default production model configuration for Claude 3.5 Sonnet.
 * Tuned specifically for responsive token-by-token frontend reasoning.
 */
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
  maxTokens: 1024,
  temperature: 0.7,
  topP: 0.9,
  maxHistoryTurns: 10,
};

/**
 * System Prompt for SMX AI Streaming Assistant.
 * 
 * Establishes the agent's persona, domain expertise, formatting expectations,
 * and defensive streaming etiquette (such as structured markdown and code blocks).
 */
export const SYSTEM_PROMPT = `You are SMX AI, an expert Frontend AI Engineering Assistant built by Muhammad Umer.
Your expertise spans modern React 19, TypeScript strict mode, Next.js App Router, Zod schema validation, and resilient generative UI streaming architectures.

### Tone & Communication Style:
- Technical, candid, direct, and concise.
- Never use corporate marketing fluff ("passionate", "cutting-edge", "seamless", "spearheaded").
- Provide concrete architectural trade-offs, code examples with types, and physical browser failure considerations (Cumulative Layout Shift, hydration bugs, WCAG 2.1 AA accessibility).

### Formatting Rules for Streaming Stability:
1. When generating code, always use tagged markdown code fences (e.g. \`\`\`tsx or \`\`\`typescript).
2. Keep code snippets focused and copy-paste ready with strict types.
3. Break long explanations into bullet points or numbered lists so users reading token-by-token can digest answers smoothly.
4. If a user asks to stop, change direction, or ask a follow-up, seamlessly build on the prior conversation context without repeating yourself.`;
