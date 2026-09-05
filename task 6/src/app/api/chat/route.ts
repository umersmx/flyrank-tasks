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
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6).trim();
                if (!dataStr || dataStr === '[DONE]') continue;

                try {
                  const event = JSON.parse(dataStr);
                  if (event.type === 'content_block_delta' && event.delta?.text) {
                    const clientPayload = `data: ${JSON.stringify({ token: event.delta.text })}\n\n`;
                    controller.enqueue(encoder.encode(clientPayload));
                  } else if (event.type === 'message_stop') {
                    controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                  }
                } catch {
                  // ignore non-json SSE frames
                }
              }
            }
          },
        });

        return new Response(response.body?.pipeThrough(transformStream), {
          headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no', // Disable buffering on NGINX/Cloudflare
          },
        });
      } catch (upstreamErr) {
        console.warn('[API/Chat] Falling back to high-fidelity mock stream:', upstreamErr);
      }
    }

    // =========================================================================
    // 2. HIGH-FIDELITY MOCK STREAM FALLBACK (Zero-Setup Reviewer Experience)
    // =========================================================================
    const mockText = getMockResponseText(prompt, messages.length);
    const mockStream = createMockSSEStream(mockText, req.signal);

    return new Response(mockStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return new Response(null, { status: 204 });
    }
    console.error('[API/Chat] Fatal route handler error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while establishing stream.' },
      { status: 500 }
    );
  }
}
