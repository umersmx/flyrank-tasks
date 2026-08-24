import React from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart2 } from 'lucide-react';

export interface StatItem {
  label: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface StatsCardProps {
  title: string;
  description?: string;
  stats: StatItem[];
}

export function StatsCard({ title, description, stats }: StatsCardProps) {
  return (
    <div className="glass-card p-5 sm:p-6" data-testid="stats-card">
      <div className="flex items-center gap-2 mb-1">
        <BarChart2 className="h-4 w-4 text-indigo-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">KPI Telemetry</span>
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {description && <p className="text-xs text-slate-400 mb-4">{description}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5 transition hover:bg-white/[0.06]">
            <span className="text-xs text-slate-400 block">{stat.label}</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-extrabold text-white">{stat.value}</span>
              {stat.change !== undefined && (
                <div
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    stat.trend === 'up'
                      ? 'text-emerald-400'
                      : stat.trend === 'down'
                      ? 'text-rose-400'
                      : 'text-slate-400'
                  }`}
                >
                  {stat.trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
                  {stat.trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
                  {stat.trend === 'neutral' && <Minus className="h-3.5 w-3.5" />}
                  <span>{stat.change > 0 ? `+${stat.change}%` : `${stat.change}%`}</span>
                </div>
