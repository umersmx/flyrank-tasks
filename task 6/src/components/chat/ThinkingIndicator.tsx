import React from 'react';
import { Bot } from 'lucide-react';

interface ThinkingIndicatorProps {
  isVisible: boolean;
}

/**
 * ThinkingIndicator Component.
 * 
 * Mentor Tip #3: The thinking indicator and the first token are a handoff,
 * not a swap. This component uses CSS opacity & scale transitions so that
 * when the first token arrives, it smoothly transitions into the message bubble
 * with zero layout jump or single-frame flickering.
 */
export function ThinkingIndicator({ isVisible }: ThinkingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 transition-opacity duration-200 ease-out"
    >
      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5 shadow-xs">
        <Bot className="w-4 h-4" />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Claude is thinking
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
