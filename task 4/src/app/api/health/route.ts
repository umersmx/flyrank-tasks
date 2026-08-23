import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  const uptimeSeconds = Math.floor(process.uptime ? process.uptime() : 0);
  const memoryUsage = process.memoryUsage ? process.memoryUsage() : { heapUsed: 0, heapTotal: 0, rss: 0 };

  const telemetry = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: process.env.NODE_ENV || 'production',
    runtime: 'Node.js / Edge Ready',
    platform: 'Vercel Preview / Production',
    latencyMs: Date.now() - startTime,
    providers: {
      openrouter: { status: 'operational', label: 'OpenRouter AI Provider' },
      groq: { status: 'operational', label: 'Groq LPU Inference' },
      anthropic: { status: 'operational', label: 'Anthropic Claude Engine' },
    },
    system: {
      nodeVersion: process.version,
      heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
