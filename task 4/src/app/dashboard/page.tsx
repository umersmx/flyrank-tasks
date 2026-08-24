import React from 'react';
import {
  LayoutDashboard,
  Activity,
  Zap,
  Boxes,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { ChartCard } from '@/components/generative-ui/ChartCard';
import { StatsCard } from '@/components/generative-ui/StatsCard';
import { DataTable } from '@/components/generative-ui/DataTable';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          <LayoutDashboard className="h-4 w-4" />
          <span>Platform Telemetry</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Analytics & Model Telemetry
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Real-time metrics on generative UI tool invocations, token efficiency, and provider response times.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="mb-8">
        <StatsCard
          title="Core Operational KPIs"
          description="Cumulative figures across preview and production runs"
          stats={[
            { label: 'Total UI Tool Invocations', value: '14,820', change: 24.5, trend: 'up' },
            { label: 'Avg Generation Latency', value: '240 ms', change: -8.3, trend: 'up' },
            { label: 'Token Efficiency Ratio', value: '98.4%', change: 1.2, trend: 'up' },
            { label: 'Zod Validation Success', value: '100%', change: 0.0, trend: 'neutral' },
            { label: 'Avg Response Cost', value: '$0.0004', change: -15.0, trend: 'up' },
            { label: 'Streaming Uptime', value: '99.98%', change: 0.1, trend: 'up' },
          ]}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Tool Calling Distribution"
          description="Breakdown of visual component types chosen by AI models"
          type="bar"
          data={[
            { label: 'Stats Card', value: 4200, color: '#6366f1' },
            { label: 'Data Table', value: 3600, color: '#a855f7' },
            { label: 'Chart Card', value: 3100, color: '#ec4899' },
            { label: 'Weather', value: 2400, color: '#06b6d4' },
            { label: 'Product Card', value: 1520, color: '#10b981' },
          ]}
        />

        <ChartCard
          title="Provider Latency Benchmarks (ms)"
          description="Time-to-first-token comparison across integrated model providers"
          type="horizontal-bar"
          data={[
            { label: 'Groq Llama-3 (LPU Engine)', value: 180, color: '#10b981' },
            { label: 'OpenRouter Free Tier', value: 340, color: '#6366f1' },
            { label: 'Anthropic Claude 3.5 Sonnet', value: 420, color: '#a855f7' },
            { label: 'OpenAI GPT-4o Mini', value: 290, color: '#3b82f6' },
          ]}
        />
      </div>

      {/* Recent Tool Execution Log */}
      <div>
        <DataTable
          title="Recent Generative UI Execution Trace"
          description="Verified tool execution logs with runtime validation states"
          columns={[
            { key: 'id', header: 'Trace ID' },
            { key: 'tool', header: 'Tool Component' },
            { key: 'provider', header: 'AI Provider' },
            { key: 'tokens', header: 'Tokens', align: 'right' },
            { key: 'latency', header: 'Latency', align: 'right' },
            { key: 'status', header: 'Schema Validation' },
          ]}
          rows={[
            { id: 'tr_9821a', tool: 'generateStatsCard', provider: 'OpenRouter / Claude', tokens: '420 t', latency: '210 ms', status: '✓ Passed (Zod)' },
            { id: 'tr_9820b', tool: 'generateWeatherCard', provider: 'Groq LPU', tokens: '310 t', latency: '175 ms', status: '✓ Passed (Zod)' },
            { id: 'tr_9819c', tool: 'generateChart', provider: 'OpenRouter Free', tokens: '580 t', latency: '320 ms', status: '✓ Passed (Zod)' },
            { id: 'tr_9818d', tool: 'generateDataTable', provider: 'Anthropic Claude 3.5', tokens: '890 t', latency: '410 ms', status: '✓ Passed (Zod)' },
            { id: 'tr_9817e', tool: 'generateProductCard', provider: 'Groq LPU', tokens: '350 t', latency: '190 ms', status: '✓ Passed (Zod)' },
          ]}
        />
      </div>
    </div>
  );
}
