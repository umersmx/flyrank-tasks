'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ThinkingIndicator } from './ThinkingIndicator';
import { ScrollToBottomButton } from './ScrollToBottomButton';
import { Sparkles, Trash2, ShieldCheck, Activity } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'How do you prevent Cumulative Layout Shift (CLS) when streaming tokens?',
  'Why is the stop button a state problem rather than a UI problem?',
  'Explain the thinking-indicator to token handoff in React 19.',
  'How do you handle WCAG 2.1 AA screen reader announcements during streaming?',
];

export function StreamingChat() {
  const {
    messages,
    status,
    error,
    isThinking,
    isLoading,
    unreadTokensCount,
    setUnreadTokensCount,
    sendMessage,
    stop,
    clearChat,
  } = useStreamingChat();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // ---------------------------------------------------------------------------
  // Smart Auto-Scroll Pinning (Mentor Tip #1)
  // ---------------------------------------------------------------------------
  const checkIfAtBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return true;
    const threshold = 60; // pixels from bottom
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distance <= threshold;
    setIsAtBottom(atBottom);
    if (atBottom) {
      setUnreadTokensCount(0);
    }
    return atBottom;
  }, [setUnreadTokensCount]);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      el.scrollTop = el.scrollHeight;
    }
    setIsAtBottom(true);
    setUnreadTokensCount(0);
  }, [setUnreadTokensCount]);

  // Auto-scroll when new messages or streaming tokens arrive (ONLY if already pinned)
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(false);
    }
  }, [messages, isAtBottom, scrollToBottom]);

  return (
    <div className="relative flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto bg-white dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top Telemetry & Controls Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLoading ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isLoading ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="text-xs font-bold tracking-tight text-slate-800 dark:text-slate-200">
              SMX AI Assistant
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            <Activity className="w-3 h-3 text-emerald-500" />
            Claude 3.5 Sonnet (SSE Stream)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            API Key Server-Side Only
          </span>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors"
              title="Clear conversation history"
              aria-label="Clear conversation history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Scrollable Chat Transcript */}
      <div
        ref={scrollContainerRef}
        onScroll={checkIfAtBottom}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scroll-smooth overscroll-contain"
        role="log"
        aria-live="polite"
        aria-label="Chat messages history"
      >
        {/* Empty State / Welcome */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60%] text-center px-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-['Geist'] text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
              Streaming AI Chat Interface
            </h2>
            <p className="font-['Inter'] text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Demonstrating visible token-by-token streaming, smart auto-scroll pinning,
              state-resilient abort control, and zero-flicker thinking handoffs.
            </p>

            {/* Quick Starter Prompts */}
            <div className="w-full space-y-2 text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                Suggested Prompts
              </span>
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 p-2.5 rounded-lg transition-colors shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render Message Stream */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Thinking Indicator (Zero-Flicker Transition) */}
        <ThinkingIndicator isVisible={isThinking} />

        {/* Network / Stream Error Banner */}
        {error && (
          <div
            role="alert"
            className="p-3 text-xs bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-lg flex items-center justify-between"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => {
                const lastUser = [...messages].reverse().find((m) => m.role === 'user');
                if (lastUser) sendMessage(lastUser.content);
              }}
              className="font-semibold underline ml-2 hover:text-rose-900 dark:hover:text-rose-100"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Floating "Jump to latest" Affordance */}
      <ScrollToBottomButton
        isVisible={!isAtBottom && (messages.length > 0 || isThinking)}
        unreadCount={unreadTokensCount}
        onClick={() => scrollToBottom(true)}
      />

      {/* Message Input & Action Triggers */}
      <ChatInput
        isLoading={isLoading}
        onSend={sendMessage}
        onStop={stop}
        placeholder={
          isThinking
            ? 'Claude is generating tokens...'
            : 'Ask SMX AI about streaming architecture, layout shifts, or tests...'
        }
      />
    </div>
  );
}
