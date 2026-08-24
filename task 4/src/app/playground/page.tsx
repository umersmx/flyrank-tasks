'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Sun,
  BarChart2,
  Table,
  PieChart,
  ShoppingBag,
  Code2,
  Sparkles,
} from 'lucide-react';
import { WeatherCard } from '@/components/generative-ui/WeatherCard';
import { StatsCard } from '@/components/generative-ui/StatsCard';
import { DataTable } from '@/components/generative-ui/DataTable';
import { ChartCard } from '@/components/generative-ui/ChartCard';
import { ProductCard } from '@/components/generative-ui/ProductCard';

type WidgetTab = 'all' | 'weather' | 'stats' | 'table' | 'chart' | 'product';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<WidgetTab>('all');

  const TABS = [
    { id: 'all', label: 'All 5 Widgets', icon: Boxes },
    { id: 'weather', label: 'WeatherCard', icon: Sun },
    { id: 'stats', label: 'StatsCard', icon: BarChart2 },
    { id: 'table', label: 'DataTable', icon: Table },
    { id: 'chart', label: 'ChartCard', icon: PieChart },
    { id: 'product', label: 'ProductCard', icon: ShoppingBag },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Boxes className="h-4 w-4" />
          <span>Interactive Component Catalog</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Generative UI Playground
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore and inspect the 5 structured UI components registered in the AI tool schema registry.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as WidgetTab)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Component Grid */}
      <div className="space-y-8">
        {/* Weather */}
        {(activeTab === 'all' || activeTab === 'weather') && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">1. Weather Component</span>
              <span className="text-[11px] font-mono text-indigo-400">tool: generateWeatherCard</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard
                city="San Francisco, CA"
                temperature={18}
                condition="cloudy"
                humidity={72}
                windSpeed={19}
                forecast={[
                  { day: 'Mon', high: 19, low: 12, condition: 'cloudy' },
                  { day: 'Tue', high: 21, low: 13, condition: 'sunny' },
                  { day: 'Wed', high: 17, low: 11, condition: 'rainy' },
                ]}
              />
              <WeatherCard
                city="London, UK"
                temperature={14}
                condition="rainy"
                humidity={88}
                windSpeed={24}
                forecast={[
                  { day: 'Mon', high: 15, low: 9, condition: 'rainy' },
                  { day: 'Tue', high: 14, low: 8, condition: 'rainy' },
                  { day: 'Wed', high: 16, low: 10, condition: 'cloudy' },
                ]}
              />
            </div>
          </section>
        )}

        {/* Stats */}
        {(activeTab === 'all' || activeTab === 'stats') && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">2. KPI Stats Component</span>
              <span className="text-[11px] font-mono text-purple-400">tool: generateStatsCard</span>
            </div>
            <StatsCard
              title="Cloud Infrastructure Telemetry"
              description="Real-time cluster resources and network throughput"
              stats={[
                { label: 'CPU Utilization', value: '42.8%', change: -4.2, trend: 'up' },
                { label: 'Memory Allocated', value: '18.4 GB', change: 2.1, trend: 'up' },
                { label: 'Active Edge Connections', value: '3,842', change: 14.8, trend: 'up' },
              ]}
            />
          </section>
        )}

        {/* DataTable */}
        {(activeTab === 'all' || activeTab === 'table') && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">3. Data Table Component</span>
              <span className="text-[11px] font-mono text-emerald-400">tool: generateDataTable</span>
            </div>
            <DataTable
              title="Top Performing LLM Models (2026)"
              description="Comparative benchmark across inference speed and context window"
              columns={[
                { key: 'model', header: 'Model Architecture' },
                { key: 'provider', header: 'Inference Provider' },
                { key: 'speed', header: 'Speed (t/s)', align: 'right' },
                { key: 'context', header: 'Context Window', align: 'right' },
                { key: 'cost', header: 'Cost / 1M Tokens', align: 'right' },
              ]}
              rows={[
                { model: 'Claude 3.5 Sonnet', provider: 'Anthropic', speed: '95 t/s', context: '200k', cost: '$3.00' },
                { model: 'Llama 3.3 70B', provider: 'Groq LPU', speed: '280 t/s', context: '128k', cost: '$0.59' },
                { model: 'GPT-4o Mini', provider: 'OpenAI', speed: '130 t/s', context: '128k', cost: '$0.15' },
                { model: 'Gemini 2.0 Flash', provider: 'Google Cloud', speed: '210 t/s', context: '1M', cost: '$0.10' },
              ]}
            />
          </section>
        )}

        {/* Chart */}
        {(activeTab === 'all' || activeTab === 'chart') && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">4. Visual Chart Component</span>
              <span className="text-[11px] font-mono text-pink-400">tool: generateChart</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title="Weekly Token Consumption"
                description="Prompt and completion volume across past 7 days"
                type="bar"
                data={[
                  { label: 'Mon', value: 450, color: '#6366f1' },
                  { label: 'Tue', value: 720, color: '#8b5cf6' },
                  { label: 'Wed', value: 890, color: '#ec4899' },
                  { label: 'Thu', value: 610, color: '#f59e0b' },
                  { label: 'Fri', value: 980, color: '#10b981' },
                  { label: 'Sat', value: 340, color: '#3b82f6' },
                  { label: 'Sun', value: 520, color: '#6366f1' },
                ]}
              />

              <ChartCard
                title="UI Component Usage Share"
                description="Distribution of generated visual outputs"
                type="horizontal-bar"
                data={[
                  { label: 'Data Tables', value: 42, color: '#6366f1' },
                  { label: 'KPI Stats', value: 31, color: '#a855f7' },
                  { label: 'Charts', value: 18, color: '#ec4899' },
                  { label: 'Weather Cards', value: 9, color: '#10b981' },
                ]}
              />
            </div>
          </section>
        )}

        {/* Product Card */}
        {(activeTab === 'all' || activeTab === 'product') && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">5. Product Recommendation Component</span>
              <span className="text-[11px] font-mono text-cyan-400">tool: generateProductCard</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductCard
                name="SMX AI Enterprise Workspace"
                category="Developer Tier"
                price="$49 / mo"
                rating={4.9}
                description="Full access to streaming Generative UI, high-speed Groq LPU inference, custom tool registries, and priority edge routing."
                features={[
                  'Unlimited streaming generative UI widgets',
                  'Sub-200ms time-to-first-token execution',
                  'Dedicated SOC-2 compliant private endpoints',
                  '24/7 priority SLA support',
                ]}
                inStock={true}
              />
              <ProductCard
                name="SMX Edge AI Appliance"
                category="Hardware Acceleration"
                price="$1,299"
                rating={4.8}
                description="On-premises hardware inference module designed for private local Generative UI streaming with zero external telemetry."
                features={[
                  '64GB Unified Memory with 800GB/s bandwidth',
                  'Pre-installed local model runtime',
                  'Zero outbound data transmission',
                ]}
                inStock={true}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
