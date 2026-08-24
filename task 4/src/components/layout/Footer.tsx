import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Activity, GitBranch } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#070a12] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">SMX AI — Capstone Application</p>
              <p className="text-xs text-slate-500">FlyRank Frontend AI Engineering Track (FE-04)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <Link href="/health" className="flex items-center gap-1.5 transition hover:text-white">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>Health Check</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              <span>Zero-Secret Client Bundle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5 text-purple-400" />
              <span>CI/CD Preview Deployments</span>
            </div>
          </div>
