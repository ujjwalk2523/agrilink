"use client";

import React, { useState } from "react";
import { RoleProvider } from "@/lib/context/role-context";
import { LivePriceTicker } from "./ui/live-price-ticker";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AiAssistantDrawer } from "./ai-assistant-drawer";
import { Bot, Sparkles } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <RoleProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Ticker */}
        <LivePriceTicker />

        {/* Global Navigation */}
        <Navbar onOpenAiAssistant={() => setIsAiOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Floating AI Trigger Button */}
        <button
          onClick={() => setIsAiOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group border-2 border-white/40"
          title="Talk with AgriLink AI Market Advisor"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-wide">Agri AI Advisor</span>
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>

        {/* Global AI Assistant Drawer */}
        <AiAssistantDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

        {/* Global Footer */}
        <Footer />
      </div>
    </RoleProvider>
  );
}
