import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FE-05: Accessible Component Fundamentals",
  description: "W3C WAI-ARIA compliant scratch components vs Shadcn/Radix UI playground and comparison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
