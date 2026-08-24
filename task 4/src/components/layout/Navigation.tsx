'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  LayoutDashboard,
  Boxes,
  Settings,
  Activity,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Assistant', icon: Sparkles },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/playground', label: 'Playground', icon: Boxes },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/health', label: 'System Health', icon: Activity },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090d16]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">SMX AI</span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                FE-04
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Generative UI Platform</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Desktop Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action / Status Pill */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/health"
            className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Live Telemetry
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Responsive at 375px) */}
      {isOpen && (
        <div className="border-b border-white/10 bg-[#0c1222] px-4 pt-2 pb-6 md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition ${
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4 border-t border-white/10 pt-4">
              <Link
                href="/health"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-sm text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span>System Diagnostics</span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-500" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
