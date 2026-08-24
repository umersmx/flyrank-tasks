import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { WeatherCard } from '../components/generative-ui/WeatherCard';
import { StatsCard } from '../components/generative-ui/StatsCard';
import { DataTable } from '../components/generative-ui/DataTable';

describe('Generative UI Components', () => {
  it('renders WeatherCard with temperature and city', () => {
    render(
      <WeatherCard
        city="Tokyo"
        temperature={24}
        condition="sunny"
        humidity={50}
        windSpeed={12}
      />
    );

    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('24°')).toBeInTheDocument();
    expect(screen.getByTestId('weather-card')).toBeInTheDocument();
  });

  it('renders StatsCard with metrics', () => {
    render(
      <StatsCard
        title="Test KPIs"
        stats={[
          { label: 'Active Users', value: '1,200', change: 10, trend: 'up' },
        ]}
      />
    );

    expect(screen.getByText('Test KPIs')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
  });

  it('renders DataTable with columns and rows', () => {
    render(
      <DataTable
        title="Models"
        columns={[
          { key: 'name', header: 'Model Name' },
          { key: 'provider', header: 'Provider' },
        ]}
        rows={[
          { name: 'Claude', provider: 'Anthropic' },
        ]}
      />
    );

    expect(screen.getByText('Models')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
    expect(screen.getByText('Anthropic')).toBeInTheDocument();
  });
});
