'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
  isStreaming?: boolean;
  isStopped?: boolean;
}

export type ChatStatus = 'idle' | 'thinking' | 'streaming' | 'stopped' | 'error';

interface UseStreamingChatOptions {
  apiEndpoint?: string;
  storageKey?: string;
  initialMessages?: Message[];
  onToken?: (token: string) => void;
  onFinish?: (message: Message) => void;
}

export function useStreamingChat({
  apiEndpoint = '/api/chat',
  storageKey = 'smx_ai_chat_history_v1',
  initialMessages = [],
  onToken,
  onFinish,
}: UseStreamingChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [unreadTokensCount, setUnreadTokensCount] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isHydratedRef = useRef(false);

  // ---------------------------------------------------------------------------
  // 1. LocalStorage Rehydration & Persistence (Stretch Goal)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn('[useStreamingChat] Failed to load history from localStorage:', e);
    } finally {
      isHydratedRef.current = true;
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isHydratedRef.current || typeof window === 'undefined') return;
    try {
      // Persist completed turns to localStorage
      const cleanMessages = messages.map((m) => ({
        ...m,
        isStreaming: false,
      }));
      localStorage.setItem(storageKey, JSON.stringify(cleanMessages));
    } catch (e) {
      console.warn('[useStreamingChat] Failed to save history to localStorage:', e);
    }
  }, [messages, storageKey]);

  // ---------------------------------------------------------------------------
  // 2. Stop Generation Handler (Mentor Tip: Treat stop as state, not UI toggle)
  // ---------------------------------------------------------------------------
  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setStatus('stopped');

    // Freeze partial assistant message so it persists in the transcript
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === 'assistant' && last.isStreaming) {
        return [
          ...prev.slice(0, -1),
          {
            ...last,
            isStreaming: false,
            isStopped: true,
          },
        ];
      }
      return prev;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // 3. Clear Chat History
  // ---------------------------------------------------------------------------
  const clearChat = useCallback(() => {
    stop();
    setMessages([]);
    setStatus('idle');
    setError(null);
    setUnreadTokensCount(0);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.warn('[useStreamingChat] Failed to clear localStorage:', e);
      }
    }
  }, [stop, storageKey]);

  // ---------------------------------------------------------------------------
  // 4. Send Message & Consume Server-Sent Events (SSE) Stream
  // ---------------------------------------------------------------------------
  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      // Abort any ongoing stream cleanly before starting new turn
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      setError(null);
      setUnreadTokensCount(0);

      const userMessageId = `user_${Date.now()}`;
      const assistantMessageId = `assistant_${Date.now() + 1}`;

      const userMessage: Message = {
        id: userMessageId,
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      };

      // Optimistically append user message
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);

      // Transition to thinking state immediately
      setStatus('thinking');

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const res = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
        }

        if (!res.body) {
          throw new Error('Response body is null or streaming is unsupported.');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let hasStartedStreaming = false;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine.startsWith('data: ')) continue;

            const dataPart = trimmedLine.slice(6);
            if (dataPart === '[DONE]') break;

            try {
              const parsed = JSON.parse(dataPart);
              const token = parsed.token || '';

              if (token) {
                accumulatedText += token;

                // Mentor Tip: The thinking indicator and first token are a handoff, not a swap.
                // As soon as the first token arrives, flip status from 'thinking' to 'streaming'
                if (!hasStartedStreaming) {
                  hasStartedStreaming = true;
                  setStatus('streaming');

                  // Create initial assistant message in state
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantMessageId,
                      role: 'assistant',
                      content: accumulatedText,
                      createdAt: Date.now(),
                      isStreaming: true,
                    },
                  ]);
                } else {
                  // Incrementally update assistant message content
                  setMessages((prev) => {
                    const lastIndex = prev.length - 1;
                    if (lastIndex < 0) return prev;
                    const updated = [...prev];
                    updated[lastIndex] = {
                      ...updated[lastIndex],
                      content: accumulatedText,
                      isStreaming: true,
                    };
                    return updated;
                  });
                }

                setUnreadTokensCount((c) => c + 1);
                onToken?.(token);
              }
            } catch {
              // Ignore partial JSON chunks during transport
            }
          }
        }

        // Stream completed successfully
        setStatus('idle');
        setMessages((prev) => {
          const lastIndex = prev.length - 1;
          if (lastIndex < 0) return prev;
          const updated = [...prev];
          updated[lastIndex] = {
            ...updated[lastIndex],
            isStreaming: false,
          };
          onFinish?.(updated[lastIndex]);
          return updated;
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Handled cleanly in stop()
          return;
        }

        console.error('[useStreamingChat] Stream error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected stream failure occurred.');
        setStatus('error');
      } finally {
        abortControllerRef.current = null;
      }
    },
    [apiEndpoint, messages, onFinish, onToken]
  );

  return {
    messages,
    status,
    error,
    isLoading: status === 'thinking' || status === 'streaming',
    isThinking: status === 'thinking',
    isStreaming: status === 'streaming',
    unreadTokensCount,
    setUnreadTokensCount,
    sendMessage,
    stop,
    clearChat,
  };
}
