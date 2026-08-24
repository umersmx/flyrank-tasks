import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets } from 'lucide-react';

export interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'windy';
  humidity: number;
  windSpeed: number;
  forecast?: { day: string; high: number; low: number; condition: string }[];
}

export function WeatherCard({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  forecast,
}: WeatherCardProps) {
  const getIcon = (cond: string) => {
    switch (cond.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-amber-400" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      case 'stormy':
        return <CloudLightning className="h-8 w-8 text-purple-400" />;
      case 'windy':
        return <Wind className="h-8 w-8 text-cyan-400" />;
      default:
        return <Cloud className="h-8 w-8 text-slate-400" />;
    }
  };

  return (
    <div className="glass-card overflow-hidden p-5 sm:p-6" data-testid="weather-card">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Weather Intelligence</span>
          <h3 className="text-2xl font-bold text-white mt-0.5">{city}</h3>
          <p className="text-xs text-slate-400 capitalize">{condition} skies</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
          {getIcon(condition)}
        </div>
      </div>

      <div className="my-6 flex items-baseline gap-2">
        <span className="text-5xl font-extrabold tracking-tight text-white">{temperature}°</span>
        <span className="text-lg font-medium text-slate-400">C</span>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Droplets className="h-4 w-4 text-sky-400" />
          <span>Humidity: <strong>{humidity}%</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Wind className="h-4 w-4 text-teal-400" />
          <span>Wind: <strong>{windSpeed} km/h</strong></span>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="text-[11px] font-semibold text-slate-400 mb-2">3-Day Forecast</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {forecast.map((f, i) => (
              <div key={i} className="rounded-lg bg-white/5 p-2">
                <span className="text-slate-400 block text-[10px]">{f.day}</span>
                <span className="font-bold text-white mt-1 block">{f.high}° / {f.low}°</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
