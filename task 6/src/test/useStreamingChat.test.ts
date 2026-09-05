import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStreamingChat } from '@/hooks/useStreamingChat';

describe('useStreamingChat Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('initializes with idle status and empty messages', () => {
    const { result } = renderHook(() => useStreamingChat({ storageKey: 'test_key_1' }));
    expect(result.current.status).toBe('idle');
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('streams tokens and appends completed assistant message', async () => {
    // Setup mock SSE response stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "Hello"}\n\n'));
        controller.enqueue(encoder.encode('data: {"token": " world"}\n\n'));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: stream,
    });

    const { result } = renderHook(() => useStreamingChat({ storageKey: 'test_key_2' }));

    await act(async () => {
      await result.current.sendMessage('Hi Claude');
    });

    // Both user message and completed assistant message exist
    expect(result.current.messages.length).toBe(2);
    expect(result.current.messages[0].role).toBe('user');
    expect(result.current.messages[0].content).toBe('Hi Claude');
    expect(result.current.messages[1].role).toBe('assistant');
    expect(result.current.messages[1].content).toBe('Hello world');
    expect(result.current.messages[1].isStreaming).toBe(false);
    expect(result.current.status).toBe('idle');
  });

  it('persists partial assistant message and re-enables when stopped mid-stream', async () => {
    const encoder = new TextEncoder();
    let streamController: ReadableStreamDefaultController<Uint8Array>;

    const stream = new ReadableStream({
      start(controller) {
        streamController = controller;
        controller.enqueue(encoder.encode('data: {"token": "Partial response"}\n\n'));
      },
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: stream,
    });

    const { result } = renderHook(() => useStreamingChat({ storageKey: 'test_key_3' }));

    // Start sending
    act(() => {
      result.current.sendMessage('Test stop');
    });

    // Wait for the first token to process
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Trigger stop mid-stream
    act(() => {
      result.current.stop();
    });

    expect(result.current.status).toBe('stopped');
    expect(result.current.isLoading).toBe(false);

    // Partial message persisted
    const lastMsg = result.current.messages[result.current.messages.length - 1];
    expect(lastMsg.role).toBe('assistant');
    expect(lastMsg.content).toContain('Partial response');
    expect(lastMsg.isStopped).toBe(true);
    expect(lastMsg.isStreaming).toBe(false);
  });

  it('allows sending a new message immediately after stopping (Stop, then send again)', async () => {
    const encoder = new TextEncoder();

    // First call stream
    const firstStream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "First partial"}\n\n'));
      },
    });

    // Second call stream
    const secondStream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"token": "Second completed"}\n\n'));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, body: firstStream })
      .mockResolvedValueOnce({ ok: true, body: secondStream });

    const { result } = renderHook(() => useStreamingChat({ storageKey: 'test_key_4' }));

    // 1. Send first
    act(() => {
      result.current.sendMessage('First prompt');
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 40));
    });

    // 2. Stop
    act(() => {
      result.current.stop();
    });
    expect(result.current.status).toBe('stopped');

    // 3. Send again
    await act(async () => {
      await result.current.sendMessage('Second prompt');
    });

    // History contains: User 1 -> Assistant (stopped) -> User 2 -> Assistant (complete)
    expect(result.current.messages.length).toBe(4);
    expect(result.current.messages[0].content).toBe('First prompt');
    expect(result.current.messages[1].content).toContain('First partial');
    expect(result.current.messages[1].isStopped).toBe(true);
    expect(result.current.messages[2].content).toBe('Second prompt');
    expect(result.current.messages[3].content).toBe('Second completed');
    expect(result.current.status).toBe('idle');
  });
});
