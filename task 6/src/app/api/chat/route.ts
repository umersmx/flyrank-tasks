import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_MODEL_CONFIG, SYSTEM_PROMPT } from '@/lib/ai/config';
import { createMockSSEStream, getMockResponseText } from '@/lib/ai/mock-stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  stream?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: "messages" array is required.' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const prompt = lastUserMessage?.content || 'Hello';

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // =========================================================================
    // 1. LIVE CLAUDE ANTHROPIC STREAMING (When ANTHROPIC_API_KEY is configured)
    // =========================================================================
    if (apiKey && apiKey.trim() !== '' && !apiKey.includes('your_anthropic_api_key')) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: DEFAULT_MODEL_CONFIG.model,
            max_tokens: DEFAULT_MODEL_CONFIG.maxTokens,
            temperature: DEFAULT_MODEL_CONFIG.temperature,
            system: SYSTEM_PROMPT,
            messages: messages
              .filter((m) => m.role === 'user' || m.role === 'assistant')
              .slice(-DEFAULT_MODEL_CONFIG.maxHistoryTurns)
              .map((m) => ({ role: m.role, content: m.content })),
            stream: true,
          }),
          signal: req.signal,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[API/Chat] Anthropic upstream error:', errorText);
          // Fall through to mock stream gracefully if rate limited or invalid key
          throw new Error(`Anthropic upstream error: ${response.status}`);
        }

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        // Transform Anthropic raw SSE into clean client SSE: data: {"token": "..."}\n\n
        const transformStream = new TransformStream({
          transform(chunk, controller) {
            const text = decoder.decode(chunk, { stream: true });
            const lines = text.split('\n');

            for (const line of lines) {
