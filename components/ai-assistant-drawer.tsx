"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Mic,
  MicOff,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Scale,
  ShoppingBag,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { AiAssistantMessage } from "@/lib/types";
import { processAiQuery } from "@/lib/services/ai-assistant";

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: AiAssistantMessage[] = [
  {
    id: "msg-0",
    sender: "assistant",
    text: `🌾 Namaste! I am your **AgriLink Market Advisor**.\n\nAsk me anything about crop prices, actual net realizations, whether to sell now or store, or which buyers offer the most secure payment terms.\n\nHow can I assist your farm business today?`,
    timestamp: "Just now",
    actions: [
      {
        type: "COMPARE_MARKETS",
        label: "Compare Tomato Selling Options",
        url: "/compare?crop=Tomato&qty=20"
      },
      {
        type: "VIEW_MARKET",
        label: "Check Live Mandi Prices",
        url: "/market-prices"
      }
    ]
  }
];

const SUGGESTED_CHIPS = [
  "Where should I sell my 20 Quintals of Tomatoes?",
  "Should I sell my harvest now or wait?",
  "Compare Pune APMC vs Reliance Collection Center",
  "Which buyers offer 100% Instant Escrow?"
];

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const [messages, setMessages] = useState<AiAssistantMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AiAssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setMessages((prev) => [...prev, json.data]);
          } else {
            const fallback = processAiQuery(query);
            setMessages((prev) => [...prev, fallback]);
          }
        })
        .catch(() => {
          const fallback = processAiQuery(query);
          setMessages((prev) => [...prev, fallback]);
        })
        .finally(() => {
          setIsTyping(false);
        });
    } catch {
      const fallback = processAiQuery(query);
      setMessages((prev) => [...prev, fallback]);
      setIsTyping(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice transcription after 2.5s
      setTimeout(() => {
        setIsListening(false);
        handleSend("Where should I sell my 20 Quintals of Tomatoes?");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Bot className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base">AgriLink AI Advisor</h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-medium">
                  Live Intelligence
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">Real-time Net Realization & Selling Decision Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                }`}
              >
                {/* Message Body with clean formatting */}
                <div className="whitespace-pre-line space-y-2">
                  {msg.text}
                </div>

                {/* Structured Recommendation Summary Card */}
                {msg.recommendationSummary && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                      <span>{msg.recommendationSummary.crop}</span>
                      <span className="bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded">
                        {msg.recommendationSummary.quantity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700">
                      <span className="font-semibold text-emerald-800">Top Market: </span>
                      {msg.recommendationSummary.recommendedMarket}
                    </div>
                    <div className="text-xs text-slate-700">
                      <span className="font-semibold text-emerald-800">Net Realization: </span>
                      <span className="font-bold text-emerald-700">₹{msg.recommendationSummary.netRealizationINR.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic pt-1 border-t border-emerald-200/60">
                      {msg.recommendationSummary.keyReason}
                    </p>
                  </div>
                )}

                {/* Actionable Button CTAs */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                    {msg.actions.map((act, i) => (
                      <Link
                        key={i}
                        href={act.url}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-2xs"
                      >
                        {act.type === "COMPARE_MARKETS" && <Scale className="w-3.5 h-3.5" />}
                        {act.type === "VIEW_MARKET" && <TrendingUp className="w-3.5 h-3.5" />}
                        {act.type === "SELL_PRODUCE" && <ShoppingBag className="w-3.5 h-3.5" />}
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 w-fit text-xs text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Analyzing market freight, commissions & net return...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SUGGESTED_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          {isListening && (
            <div className="mb-2 p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-800 animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Listening to your voice in Hindi / Marathi / English...
              </span>
              <button
                onClick={() => setIsListening(false)}
                className="text-[11px] font-bold text-amber-900 underline"
              >
                Cancel
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? "bg-rose-500 text-white border-rose-600 animate-pulse"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
              title="Voice Assistant (Multilingual)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about crop prices, net returns, best market..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
