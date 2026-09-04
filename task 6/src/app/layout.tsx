import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SMX AI · Streaming AI Chat Interface (FE-06)',
  description:
    'Production-grade streaming chat interface built with Next.js 14 App Router, Claude 3.5 Sonnet, smart auto-scroll, and state-resilient stop controls.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
