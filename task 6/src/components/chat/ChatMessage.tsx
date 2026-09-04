import React, { useState } from 'react';
import { Bot, User, Copy, Check, StopCircle } from 'lucide-react';
import { formatMessageTime } from '@/lib/utils';
import type { Message } from '@/hooks/useStreamingChat';

interface ChatMessageProps {
  message: Message;
}

/**
 * ChatMessage Component.
 * 
 * Renders distinct user and assistant messages with defensive streaming
 * formatting, copy actions, and mid-stream stop badges.
 */
export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <article
      className={`group flex items-start gap-3 transition-all duration-150 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
      aria-label={`${isUser ? 'User' : 'Assistant'} message`}
    >
      {/* Avatar Badge */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-xs border ${
          isUser
            ? 'bg-slate-900 border-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
            : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble Container */}
      <div
        className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-xs text-sm leading-relaxed ${
          isUser
            ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 rounded-tr-sm'
            : 'bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm'
        }`}
      >
        {/* Message Content with Streaming Handling */}
        <div className="whitespace-pre-wrap break-words font-sans selection:bg-emerald-200 selection:text-emerald-900">
          {message.content}

          {/* Active Streaming Token Cursor */}
          {message.isStreaming && (
            <span
              className="inline-block w-2 h-4 ml-1 bg-emerald-500 animate-pulse align-middle"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Footer Metadata & Controls */}
        <div
          className={`flex items-center gap-2 mt-2 pt-1 text-[11px] ${
            isUser ? 'text-slate-400 justify-end' : 'text-slate-400 dark:text-slate-500 justify-between'
