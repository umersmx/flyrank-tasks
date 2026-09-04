import React, { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  isLoading: boolean;
  onSend: (message: string) => void;
  onStop: () => void;
  placeholder?: string;
}

/**
 * Mobile-friendly ChatInput with auto-expanding height,
 * keyboard shortcuts (Enter to send, Shift+Enter for newline),
 * and state-resilient Stop button.
 */
export function ChatInput({
  isLoading,
  onSend,
  onStop,
  placeholder = 'Ask SMX AI about streaming UI, layout shifts, or architecture...',
}: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && text.trim()) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="relative border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 sm:p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 focus-within:border-emerald-500 dark:focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all shadow-xs">
        {/* Auto-expanding Input Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          aria-label="Chat input prompt"
          className="w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none max-h-40 leading-relaxed"
        />

