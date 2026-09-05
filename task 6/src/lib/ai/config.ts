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
