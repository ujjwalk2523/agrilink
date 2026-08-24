import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "AgriLink | Agricultural Market Intelligence & Direct Marketplace",
  description: "Discover true net realization for your agricultural produce. Compare APMC and direct corporate buyers after transport, cess, commissions, and spoilage risk.",
  keywords: ["agriculture marketplace", "mandi prices", "net realization calculator", "eNAM", "APMC price comparison", "farmer produce", "direct buyers", "crop intelligence"],
  authors: [{ name: "AgriLink Technologies" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased text-slate-900 bg-slate-50 flex flex-col">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
