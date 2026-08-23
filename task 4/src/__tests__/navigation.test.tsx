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

