import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antital — Figma-like Sidebar",
  description: "Rapid replication of Figma left sidebar (Pages + Layers)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
