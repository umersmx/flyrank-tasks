import React from 'react';
import { StreamingChat } from '@/components/chat/StreamingChat';
import { Bot, Terminal, Code2, Shield, CheckCircle2 } from 'lucide-react';

export default function ChatPage() {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] dark:bg-[#020617]">
      {/* Top Application Header */}
      <nav className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shadow-xs">
            MU.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Geist'] text-sm font-bold text-slate-900 dark:text-slate-100">
                SMX AI
              </h1>
              <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded-full">
                FE-06 Streaming Chat
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              FlyRank Frontend AI Engineering · Capstone Central Interaction
            </p>
          </div>
        </div>

        {/* Evaluation Badges */}
        <div className="flex items-center gap-2 text-xs">
          <a
            href="https://github.com/umersmx/flyrank-tasks/tree/main/task%206"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium transition-colors shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub Source</span>
          </a>
        </div>
      </nav>

      {/* Main Chat Workspace */}
      <div className="flex-1 overflow-hidden p-0 sm:p-4">
        <StreamingChat />
      </div>
    </main>
  );
}
