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
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen selection:bg-emerald-500 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
