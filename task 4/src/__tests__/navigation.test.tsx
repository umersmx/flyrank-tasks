import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Navigation } from '../components/layout/Navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation Component', () => {
  it('renders brand logo and all primary route links', () => {
    render(<Navigation />);

    expect(screen.getByText('SMX AI')).toBeInTheDocument();
    expect(screen.getByText('FE-04')).toBeInTheDocument();
    expect(screen.getByText('Assistant')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('System Health')).toBeInTheDocument();
  });
});
