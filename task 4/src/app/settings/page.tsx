'use client';

import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Shield,
  Key,
  Save,
  Check,
  Cpu,
  RefreshCw,
} from 'lucide-react';

export default function SettingsPage() {
  const [provider, setProvider] = useState('openrouter');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a helpful, intelligent AI assistant powered by advanced generative UI. When appropriate, use structured tool cards (weather, stats, data table, chart, product) to present your answers visually.'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          <Settings className="h-4 w-4" />
          <span>System Parameters</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
          Model & Environment Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure runtime inference providers, token budgets, and generative UI system instructions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Model Selection */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Cpu className="h-4 w-4 text-indigo-400" />
            <span>AI Inference Provider</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'openrouter', name: 'OpenRouter Free', desc: 'openrouter/free (Default)' },
              { id: 'groq', name: 'Groq LPU', desc: 'llama-3.3-70b-versatile' },
              { id: 'anthropic', name: 'Anthropic Claude', desc: 'claude-3-5-sonnet-latest' },
            ].map((p) => (
              <label
                key={p.id}
                className={`flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition ${
                  provider === p.id
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{p.name}</span>
                  <input
                    type="radio"
                    name="provider"
                    value={p.id}
                    checked={provider === p.id}
                    onChange={(e) => setProvider(e.target.value)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-xs text-slate-400 font-mono">{p.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hyperparameters */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Sliders className="h-4 w-4 text-purple-400" />
            <span>Generation Parameters</span>
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Sampling Temperature: {temperature.toFixed(2)}</span>
                <span className="text-slate-500">More Deterministic ↔ More Creative</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Max Output Token Budget: {maxTokens} tokens</span>
                <span className="text-slate-500">Safety Cap</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="250"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* System Prompt */}
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
            <Key className="h-4 w-4 text-pink-400" />
            <span>System Prompt Directives</span>
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Custom system instructions guiding when the model initiates visual tool calls.
          </p>
          <textarea
            rows={4}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-slate-200 outline-none focus:border-indigo-500 transition font-mono"
          />
        </div>

        {/* Security Alert */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-start gap-3">
          <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-white mb-0.5">Zero Secret Exposure Principle (FE-04 Spec)</strong>
            <span>
              All API keys (`OPENROUTER_API_KEY`, `GROQ_API_KEY`) remain strictly encapsulated on the server runtime. No client code bundle contains private keys.
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:opacity-90"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saved ? 'Configuration Saved' : 'Save System Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
