import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScrollToBottomButtonProps {
  isVisible: boolean;
  unreadCount: number;
  onClick: () => void;
}

/**
 * Floating "Jump to latest" affordance.
 * 
 * Mentor Tip #1: When a user scrolls up during a live token stream,
 * pinning must immediately release. This button appears with unread token count,
 * allowing the user to snap back to the bottom anytime.
 */
export function ScrollToBottomButton({
  isVisible,
  unreadCount,
  onClick,
}: ScrollToBottomButtonProps) {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-24 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-lg hover:shadow-xl hover:bg-slate-800 dark:hover:bg-white text-xs font-semibold transition-all duration-150 animate-bounce focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border border-slate-700/30"
