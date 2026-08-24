import React from 'react';
import { PieChart } from 'lucide-react';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartCardProps {
  title: string;
  description?: string;
  type?: 'bar' | 'horizontal-bar';
  data: ChartDataPoint[];
}

const DEFAULT_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

export function ChartCard({ title, description, type = 'bar', data }: ChartCardProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="glass-card p-5 sm:p-6" data-testid="chart-card">
      <div className="flex items-center gap-2 mb-1">
        <PieChart className="h-4 w-4 text-pink-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">Visual Distribution</span>
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      {description && <p className="text-xs text-slate-400 mb-4">{description}</p>}

      {type === 'bar' ? (
        <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6 border-b border-white/10 pb-2">
          {data.map((item, idx) => {
            const heightPercent = (item.value / maxValue) * 100;
            const barColor = item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition">
                  {item.value}
                </span>
                <div
                  className="w-full rounded-t-lg transition-all duration-500 ease-out hover:opacity-85"
                  style={{
                    height: `${Math.max(heightPercent, 6)}%`,
                    backgroundColor: barColor,
                    boxShadow: `0 0 16px ${barColor}40`,
                  }}
                />
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-full" title={item.label}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {data.map((item, idx) => {
            const widthPercent = (item.value / maxValue) * 100;
            const barColor = item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-400 font-bold">{item.value}</span>
                </div>
