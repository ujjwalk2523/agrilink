"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const TICKER_ITEMS = [
  { crop: "Tomato (Hybrid)", mandi: "Lasalgaon", price: "₹2,250/Q", change: "+4.2%", trend: "up" },
  { crop: "Tomato (Grade A)", mandi: "Vashi APMC", price: "₹2,850/Q", change: "+12.0%", trend: "up" },
  { crop: "Onion (Nasik Red)", mandi: "Lasalgaon", price: "₹2,400/Q", change: "+1.8%", trend: "up" },
  { crop: "Wheat (Sharbati)", mandi: "Indore Mandi", price: "₹3,200/Q", change: "+3.5%", trend: "up" },
  { crop: "Green Chilli (Teja)", mandi: "Guntur Yard", price: "₹8,600/Q", change: "+8.4%", trend: "up" },
  { crop: "Basmati Rice (1121)", mandi: "Karnal", price: "₹4,800/Q", change: "+2.1%", trend: "up" },
  { crop: "Potato (Jyoti)", mandi: "Agra Mandi", price: "₹1,450/Q", change: "-1.5%", trend: "down" },
  { crop: "Soybean (JS 335)", mandi: "Indore", price: "₹4,600/Q", change: "-0.8%", trend: "down" }
];

export function LivePriceTicker() {
  return (
    <div className="w-full bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 overflow-hidden relative flex items-center">
      <div className="flex items-center gap-2 bg-emerald-700/90 text-white px-2.5 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wider shrink-0 z-10 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
        Live Mandi Ticker
      </div>

      <div className="flex items-center gap-8 whitespace-nowrap overflow-x-auto no-scrollbar pl-4 text-slate-300">
        {TICKER_ITEMS.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-2 text-xs">
            <span className="font-medium text-white">{item.crop}</span>
            <span className="text-slate-400">({item.mandi})</span>
            <span className="font-semibold text-emerald-400">{item.price}</span>
            <span
              className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded ${
                item.trend === "up"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  : "bg-rose-950 text-rose-300 border border-rose-800"
              }`}
            >
              {item.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-0.5 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5 text-rose-400" />
              )}
              {item.change}
            </span>
            <span className="text-slate-700 mx-1">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
