import type { Metadata } from "next";
import type { ReactNode } from "react";
import { themeBootstrapScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Starter",
  description:
    "Production-ready Next.js SaaS starter with pricing, billing math, a dashboard, and auth-ready session flow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
