"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users2,
  Sprout,
  Coins,
  ShieldCheck,
  TrendingUp,
  Scale,
  Building2,
  Package,
  Plus,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useRole } from "@/lib/context/role-context";
import { MOCK_FPO_BATCHES, FpoBatch } from "@/lib/mock-data/seed-data";
import { formatINR } from "@/lib/utils/formatters";

export default function FpoDashboardPage() {
  const { currentUser } = useRole();
  const [batches, setBatches] = useState<FpoBatch[]>(MOCK_FPO_BATCHES);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-900 via-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30">
              FPO Collective Aggregation Hub
            </span>
            <span className="text-xs text-purple-200">
              {currentUser.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser.location} • {currentUser.details.memberCount} Smallholder Farmer Members • FY Turnover: {currentUser.details.collectiveTurnoverFY}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/compare"
            className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4" />
            <span>Bulk Net Realizer</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Aggregated Volume (Current Season)</span>
          <p className="text-2xl font-extrabold text-slate-900">{currentUser.details.totalAggregatedVolumeMT} MT</p>
          <p className="text-[11px] text-purple-700 font-semibold">Soybean, Wheat & Tomatoes</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Farmer Members</span>
          <p className="text-2xl font-extrabold text-slate-900">{currentUser.details.memberCount}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Aadhaar & Land KYC Verified
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Collective Bulk Premium Gained</span>
          <p className="text-2xl font-extrabold text-emerald-600">+₹180 / Q</p>
          <p className="text-[11px] text-slate-500">Aggregated bargaining power advantage</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Controlled CA Cold Storage</span>
          <p className="text-2xl font-extrabold text-purple-700">2,000 MT</p>
          <p className="text-[11px] text-slate-500">Mohadi Aggregation Facility</p>
        </div>
      </div>

      {/* Bulk Aggregation Lots */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Collective Produce Aggregation Pools</h2>
            <p className="text-xs text-slate-500">Pooled from member farmers for institutional bulk contracts</p>
          </div>
          <button className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Aggregation Batch</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-purple-300 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {batch.status}
                  </span>
                  <span className="text-xs font-bold text-purple-900">{batch.totalPooledMetricTons} Metric Tons</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">{batch.cropName}</h3>
                <p className="text-xs text-slate-600">{batch.variety}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contributing Farmers:</span>
                    <span className="font-bold text-slate-800">{batch.contributingFarmersCount} Members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Base:</span>
                    <span className="font-semibold text-slate-800">{formatINR(batch.expectedPricePerQuintal)}/Q</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span className="font-bold">Highest Institutional Bid:</span>
                    <span className="font-extrabold">{formatINR(batch.highestBidPerQuintal)}/Q</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  📍 {batch.pickupLocation}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{batch.closingTime}</span>
                <button className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-900 hover:bg-purple-100 font-bold border border-purple-200">
                  Manage Pool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Payout & Dividend Split Calculator Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-lg font-extrabold">Automated Member Payout & Dividend Distributor</h3>
          <p className="text-xs text-purple-100 leading-relaxed">
            When a bulk auction closes, AgriLink automatically calculates net returns, deducts storage fees, and disperses pro-rata bank payouts to all 480 member accounts with transparent weighbridge slips.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1 shrink-0">
          <p className="font-bold text-purple-200">Member Net Gain Metric:</p>
          <p className="text-xl font-extrabold text-white">₹56,16,000</p>
          <p className="text-[10px] text-purple-200">Disbursed directly via NPCI / Aadhaar DBT</p>
        </div>
      </div>
    </div>
  );
}
