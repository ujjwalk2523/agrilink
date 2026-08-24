"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  TrendingUp,
  Scale,
  ShieldCheck,
  Truck,
  Building2,
  Users2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Percent,
  MapPin,
  Clock,
  Coins
} from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";
import { useRole } from "@/lib/context/role-context";

export default function LandingPage() {
  const { setRole } = useRole();
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState(20);

  // Quick teaser calculations for hero
  const demoGrossMandi = 2850 * quantity; // Vashi APMC headline
  const demoDeductionsMandi = Math.round(2900 + (demoGrossMandi * 0.02) + (demoGrossMandi * 0.04) + (20 * 20) + (demoGrossMandi * 0.042));
  const demoNetMandi = demoGrossMandi - demoDeductionsMandi;

  const demoGrossCorporate = 2550 * quantity; // Direct Farmgate Hub
  const demoDeductionsCorporate = 0 + 0 + 0 + (20 * 10) + 0; // 0 transport, 0 cess, 0 commission, low handling
  const demoNetCorporate = demoGrossCorporate - demoDeductionsCorporate;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Next-Gen Agricultural Market Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Don’t Just Check the Price. <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                Know Your True Net Return.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Highest headline mandi prices often lose money after freight, 4% commission agent fees, APMC taxes, and transit spoilage. AgriLink calculates your **Actual In-Pocket Realization** and connects you directly with verified buyers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Scale className="w-4 h-4 text-slate-950" />
                <span>Launch Smart Market Comparison</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/market-prices"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Explore Live APMC Prices</span>
              </Link>
            </div>
          </div>

          {/* Interactive Live Comparison Teaser Card */}
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-white/95 text-slate-900 shadow-2xl p-6 sm:p-8 backdrop-blur-md border border-white/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Live Net Realization Simulation
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                  Why High Headline Mandi Prices Can Mislead Farmers
                </h3>
              </div>

              {/* Quick interactive parameters */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Tomato">Tomato (Hybrid 1057)</option>
                  <option value="Onion">Onion (Nasik Red)</option>
                  <option value="Wheat">Wheat (Sharbati)</option>
                </select>

                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={10}>10 Quintals (1 MT)</option>
                  <option value={20}>20 Quintals (2 MT)</option>
                  <option value={50}>50 Quintals (5 MT)</option>
                </select>
              </div>
            </div>

            {/* Side-by-side comparison visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Option A: Distant High-Headline APMC */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Option A: Distant City APMC</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                    High Headline Illusion
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-slate-800">Headline Quote:</p>
                  <p className="text-xl font-extrabold text-slate-900">₹2,850 <span className="text-xs font-normal text-slate-500">/Q</span></p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-rose-100">
                  <div className="flex justify-between">
                    <span>Gross Value ({quantity} Q):</span>
                    <span className="font-semibold">{formatINR(demoGrossMandi)}</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>- Transport (175 km freight):</span>
                    <span>-₹2,900</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>- APMC Cess (2%) & Commission (4%):</span>
                    <span>-{formatINR(demoGrossMandi * 0.06)}</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>- Transit Spoilage Risk (Perishable):</span>
                    <span>-{formatINR(demoGrossMandi * 0.042)}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-100/70 border border-rose-300 flex items-center justify-between text-rose-950 font-bold">
                  <span className="text-xs">Actual Net In-Pocket:</span>
                  <span className="text-base sm:text-lg">{formatINR(demoNetMandi)}</span>
                </div>
              </div>

              {/* Option B: Direct Corporate Procurement Hub */}
              <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/60 p-5 space-y-3 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-lg shadow-sm">
                  Recommended Choice 🏆
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Option B: Direct Verified Buyer Hub</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    True Maximum Profit
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-slate-800">Headline Quote:</p>
                  <p className="text-xl font-extrabold text-slate-900">₹2,550 <span className="text-xs font-normal text-slate-500">/Q</span></p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-emerald-100">
                  <div className="flex justify-between">
                    <span>Gross Value ({quantity} Q):</span>
                    <span className="font-semibold">{formatINR(demoGrossCorporate)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>- Transport (Farmgate Pickup):</span>
                    <span>₹0 (Buyer Arranges)</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>- Mandi Cess & Commission:</span>
                    <span>₹0 (Direct Corporate)</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>- Spoilage Risk:</span>
                    <span>₹0 (Instant Weighment)</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-600 text-white border border-emerald-700 flex items-center justify-between font-extrabold shadow-sm">
                  <span className="text-xs">Actual Net In-Pocket:</span>
                  <span className="text-base sm:text-lg">{formatINR(demoNetCorporate)}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-100 text-xs text-slate-700 flex items-center justify-between flex-wrap gap-2">
              <span className="font-semibold text-emerald-800">
                💰 You take home <span className="text-emerald-700 font-extrabold underline">{formatINR(demoNetCorporate - demoNetMandi)} MORE CASH</span> with Option B despite a lower headline quote!
              </span>
              <Link
                href="/compare"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                Run full multi-market test →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent 6-Factor Recommendation Engine Breakdown */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Percent className="w-3.5 h-3.5" /> Transparent Formula
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Multi-Factor Scoring Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            We don’t rely on black-box algorithms. Every market recommendation is scored transparently across 6 critical operational factors:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold">
                40%
              </div>
              <Coins className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Net Realization Yield</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Actual cash in hand after deducting transport, commission agent fee, mandi cess, handling, and estimated transit spoilage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold">
                20%
              </div>
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Distance & Transit Time</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Logistics proximity. Closer collection centers minimize perishable weight loss, diesel overhead, and transit vibration damage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold">
                15%
              </div>
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Buyer Reliability Score</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Verified business registration, historical fulfillment rate, prompt weighment, and zero unfair rejection track record.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold">
                10%
              </div>
              <Coins className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Payment Terms & Security</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Preference for 100% instant escrow lock-in and same-day bank release vs risky 7-to-15 day credit slips.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-extrabold">
                10%
              </div>
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Market Demand & Liquidity</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Daily arrival volume metrics ensure sufficient institutional demand to absorb your full harvest without unsold carryover.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold">
                5%
              </div>
              <Clock className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Price Stability</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Low standard deviation across 7-day rolling quotes protects you from flash intraday price crashes while your truck is in transit.
            </p>
          </div>
        </div>
      </section>

      {/* Experience All 5 Roles in 1 Click */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Role-Based Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineered for Every Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Select any role below to experience its tailored workspace and tools:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Farmer */}
            <Link
              href="/farmer/dashboard"
              onClick={() => setRole("FARMER")}
              className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-emerald-500 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">1. Farmer</h4>
              <p className="text-xs text-slate-400 mt-1">
                Net Realization Calculator, list produce, compare offers & multi-turn negotiation room.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400 mt-3 group-hover:underline">
                Enter Portal →
              </span>
            </Link>

            {/* Buyer */}
            <Link
              href="/buyer/marketplace"
              onClick={() => setRole("BUYER")}
              className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-blue-500 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">2. Verified Buyer</h4>
              <p className="text-xs text-slate-400 mt-1">
                Browse verified produce listings, filter by location radius, submit binding offers & escrow contracts.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-blue-400 mt-3 group-hover:underline">
                Enter Portal →
              </span>
            </Link>

            {/* Transporter */}
            <Link
              href="/transporter/dashboard"
              onClick={() => setRole("TRANSPORTER")}
              className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-500 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">3. Transporter</h4>
              <p className="text-xs text-slate-400 mt-1">
                Fleet management, reefer temperature monitoring, transport job bidding & live route tracking.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-amber-400 mt-3 group-hover:underline">
                Enter Portal →
              </span>
            </Link>

            {/* FPO */}
            <Link
              href="/fpo/dashboard"
              onClick={() => setRole("FPO")}
              className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-purple-500 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">4. FPO / Co-op</h4>
              <p className="text-xs text-slate-400 mt-1">
                Member farmer pooling, bulk commodity aggregation (100+ MT lots) & collective institutional auctions.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-purple-400 mt-3 group-hover:underline">
                Enter Portal →
              </span>
            </Link>

            {/* Admin */}
            <Link
              href="/admin/dashboard"
              onClick={() => setRole("ADMIN")}
              className="p-5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-emerald-400 transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-600/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">5. Admin</h4>
              <p className="text-xs text-slate-400 mt-1">
                KYC verification desk, modular price sync monitoring, dispute resolution & platform audit logs.
              </p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-400 mt-3 group-hover:underline">
                Enter Portal →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-12 bg-emerald-600 text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Maximize Your Agricultural Profits?</h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Join thousands of progressive farmers, FPOs, and corporate buyers leveraging transparent Net Realization intelligence.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-colors"
            >
              Calculate Net Realization Now
            </Link>
            <Link
              href="/farmer/listings/new"
              className="px-6 py-3 rounded-xl bg-emerald-800/60 border border-white/20 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-800 transition-colors"
            >
              Post Free Produce Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
