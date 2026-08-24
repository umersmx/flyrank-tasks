import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  Boxes,
  Activity,
  Layers,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { WeatherCard } from '@/components/generative-ui/WeatherCard';
import { StatsCard } from '@/components/generative-ui/StatsCard';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <section className="text-center py-10 sm:py-14 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next.js App Router · Generative UI Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Beyond Text: AI That Streams <span className="gradient-text">Interactive UI</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          SMX AI transforms conventional LLM text streaming into validated, interactive visual components — KPI dashboards, weather cards, charts, and product comparisons.
        </p>
      </section>

      {/* Interactive Chat Input Mockup (Client Triggerable) */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="glass-card p-2 sm:p-3 gradient-border shadow-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value="Compare Q3 revenue growth and generate a KPI dashboard with weather in Tokyo"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-200 outline-none cursor-default font-medium"
              aria-label="Example prompt"
            />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition hover:opacity-90"
              aria-label="Send prompt"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Try prompts:</span>
          <Link
            href="/playground"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            📊 SaaS KPI Metrics
          </Link>
          <Link
            href="/playground"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ☀️ Tokyo Weather Forecast
          </Link>
          <Link
            href="/playground"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            📈 Quarterly Revenue Chart
          </Link>
        </div>
      </div>

      {/* Live Component Preview Section */}
      <section className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Live Generative UI Stream Samples</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Preview of structured components rendered dynamically by LLM tool calls
            </p>
          </div>
          <Link
            href="/playground"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
          >
            <span>Explore All 5 Widgets</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherCard
            city="Tokyo, Japan"
            temperature={24}
            condition="sunny"
            humidity={58}
            windSpeed={14}
            forecast={[
              { day: 'Wed', high: 25, low: 18, condition: 'sunny' },
              { day: 'Thu', high: 23, low: 17, condition: 'cloudy' },
              { day: 'Fri', high: 21, low: 16, condition: 'rainy' },
            ]}
          />

          <StatsCard
            title="Q3 Performance Telemetry"
            description="AI generative analytics and streaming token throughput"
            stats={[
              { label: 'Token Throughput', value: '142 t/s', change: 18.4, trend: 'up' },
              { label: 'Avg Latency', value: '280 ms', change: -12.1, trend: 'up' },
              { label: 'Tool Reliability', value: '99.9%', change: 0.2, trend: 'up' },
            ]}
          />
        </div>
      </section>

      {/* Capstone Architecture Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Server Components First</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Engineered with Next.js App Router rules. Server Components render diagnostic telemetry and layouts, while interactive widgets use isolated client boundaries.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
            <Boxes className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zod Schema Validation</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Zero raw model injection. Every generative UI component is validated against strict Zod schemas before rendering, ensuring total runtime safety.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <Activity className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">Continuous Deployment Ready</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Connected to Vercel CI/CD with automated preview deployments on every Git push, zero exposed client secrets, and an active `/health` monitoring probe.
          </p>
        </div>
      </section>
    </div>
  );
}
