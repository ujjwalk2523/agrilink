"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Scale,
  Sparkles,
  MapPin,
  TrendingUp,
  Truck,
  ShieldCheck,
  Coins,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Info,
  ArrowRight,
  RefreshCw,
  Award,
  Layers,
  HelpCircle
} from "lucide-react";
import { formatINR, formatQuantity } from "@/lib/utils/formatters";
import { KNOWN_HUBS } from "@/lib/services/distance-calculator";
import { CandidateMarket, rankAndRecommendMarkets } from "@/lib/services/recommendation-engine";
import { QualityGrade, RankedMarketOption } from "@/lib/types";

// Pre-configured candidate markets database for comparison
const ALL_MARKET_CANDIDATES: Record<string, CandidateMarket[]> = {
  "Tomato": [
    {
      id: "mkt-lasalgaon",
      name: "Lasalgaon Mandi (Asia's Largest Onion & Veg Hub)",
      marketType: "APMC",
      city: "Lasalgaon",
      state: "Maharashtra",
      latitude: 20.1472,
      longitude: 74.2250,
      mandiCessPercent: 1.5,
      commissionPercent: 2.5,
      unloadingRatePerQuintal: 15,
      modalPricePerQuintal: 2250,
      minPricePerQuintal: 1800,
      maxPricePerQuintal: 2400,
      buyerReliabilityScore: 92,
      liquidityScore: 96,
      priceStabilityScore: 88,
      paymentTermsScore: 90,
      paymentTermLabel: "Same-day Mandi RTGS",
      buyerName: "Lasalgaon Licensed APMC Traders"
    },
    {
      id: "mkt-reliance-nashik",
      name: "Reliance Fresh Rural Procurement Hub",
      marketType: "PRIVATE_COLLECTION_HUB",
      city: "Nashik",
      state: "Maharashtra",
      latitude: 19.9500,
      longitude: 73.8200,
      mandiCessPercent: 0.0,
      commissionPercent: 0.0,
      unloadingRatePerQuintal: 10,
      modalPricePerQuintal: 2550,
      minPricePerQuintal: 2400,
      maxPricePerQuintal: 2600,
      buyerReliabilityScore: 98,
      liquidityScore: 88,
      priceStabilityScore: 94,
      paymentTermsScore: 100,
      paymentTermLabel: "100% Instant Escrow Release",
      buyerName: "Reliance Retail Agri Division"
    },
    {
      id: "mkt-pune",
      name: "Pune APMC (Gultekdi)",
      marketType: "APMC",
      city: "Pune",
      state: "Maharashtra",
      latitude: 18.5204,
      longitude: 73.8567,
      mandiCessPercent: 1.5,
      commissionPercent: 3.0,
      unloadingRatePerQuintal: 18,
      modalPricePerQuintal: 2500,
      minPricePerQuintal: 2100,
      maxPricePerQuintal: 2750,
      buyerReliabilityScore: 88,
      liquidityScore: 92,
      priceStabilityScore: 82,
      paymentTermsScore: 85,
      paymentTermLabel: "24-Hour Mandi Slip Clearing",
      buyerName: "Pune Wholesale Vegetable Association"
    },
    {
      id: "mkt-vashi",
      name: "Vashi APMC (Navi Mumbai)",
      marketType: "APMC",
      city: "Navi Mumbai",
      state: "Maharashtra",
      latitude: 19.0760,
      longitude: 72.8777,
      mandiCessPercent: 2.0,
      commissionPercent: 4.0,
      unloadingRatePerQuintal: 20,
      modalPricePerQuintal: 2850,
      minPricePerQuintal: 2400,
      maxPricePerQuintal: 3100,
      buyerReliabilityScore: 86,
      liquidityScore: 98,
      priceStabilityScore: 76,
      paymentTermsScore: 80,
      paymentTermLabel: "Mandi Commission Agent Cheque",
      buyerName: "Vashi APMC Terminal Merchants"
    },
    {
      id: "mkt-surat",
      name: "Surat APMC",
      marketType: "APMC",
      city: "Surat",
      state: "Gujarat",
      latitude: 21.1702,
      longitude: 72.8311,
      mandiCessPercent: 1.0,
      commissionPercent: 3.5,
      unloadingRatePerQuintal: 16,
      modalPricePerQuintal: 2700,
      minPricePerQuintal: 2200,
      maxPricePerQuintal: 2900,
      buyerReliabilityScore: 90,
      liquidityScore: 90,
      priceStabilityScore: 80,
      paymentTermsScore: 85,
      paymentTermLabel: "Next-day Bank Settlement",
      buyerName: "Surat Central Fruit & Veg Yard"
    }
  ],
  "Onion": [
    {
      id: "mkt-lasalgaon",
      name: "Lasalgaon Mandi (Asia's Largest Onion Hub)",
      marketType: "APMC",
      city: "Lasalgaon",
      state: "Maharashtra",
      latitude: 20.1472,
      longitude: 74.2250,
      mandiCessPercent: 1.5,
      commissionPercent: 2.0,
      unloadingRatePerQuintal: 12,
      modalPricePerQuintal: 2400,
      buyerReliabilityScore: 96,
      liquidityScore: 100,
      priceStabilityScore: 90,
      paymentTermsScore: 95,
      paymentTermLabel: "Instant Weighment RTGS"
    },
    {
      id: "mkt-vashi",
      name: "Vashi APMC (Navi Mumbai)",
      marketType: "APMC",
      city: "Navi Mumbai",
      state: "Maharashtra",
      latitude: 19.0760,
      longitude: 72.8777,
      mandiCessPercent: 2.0,
      commissionPercent: 3.5,
      unloadingRatePerQuintal: 15,
      modalPricePerQuintal: 2750,
      buyerReliabilityScore: 90,
      liquidityScore: 95,
      priceStabilityScore: 85,
      paymentTermsScore: 85,
      paymentTermLabel: "APMC Commission Agent Credit"
    },
    {
      id: "mkt-surat",
      name: "Surat APMC",
      marketType: "APMC",
      city: "Surat",
      state: "Gujarat",
      latitude: 21.1702,
      longitude: 72.8311,
      mandiCessPercent: 1.0,
      commissionPercent: 2.5,
      unloadingRatePerQuintal: 14,
      modalPricePerQuintal: 2600,
      buyerReliabilityScore: 92,
      liquidityScore: 88,
      priceStabilityScore: 88,
      paymentTermsScore: 90,
      paymentTermLabel: "24-Hour RTGS Transfer"
    }
  ],
  "Wheat": [
    {
      id: "mkt-indore",
      name: "Indore APMC (Choithram)",
      marketType: "APMC",
      city: "Indore",
      state: "Madhya Pradesh",
      latitude: 22.7196,
      longitude: 75.8577,
      mandiCessPercent: 1.5,
      commissionPercent: 2.0,
      unloadingRatePerQuintal: 10,
      modalPricePerQuintal: 3200,
      buyerReliabilityScore: 94,
      liquidityScore: 95,
      priceStabilityScore: 92,
      paymentTermsScore: 95,
      paymentTermLabel: "Direct eNAM Bank Payout"
    },
    {
      id: "mkt-itc-hub",
      name: "ITC e-Choupal Integrated Hub",
      marketType: "PRIVATE_COLLECTION_HUB",
      city: "Indore",
      state: "Madhya Pradesh",
      latitude: 22.8000,
      longitude: 75.9200,
      mandiCessPercent: 0.0,
      commissionPercent: 0.0,
      unloadingRatePerQuintal: 8,
      modalPricePerQuintal: 3250,
      buyerReliabilityScore: 99,
      liquidityScore: 90,
      priceStabilityScore: 98,
      paymentTermsScore: 100,
      paymentTermLabel: "Direct Corporate Escrow Instant Transfer"
    },
    {
      id: "mkt-jaipur",
      name: "Muhana Mandi (Jaipur)",
      marketType: "APMC",
      city: "Jaipur",
      state: "Rajasthan",
      latitude: 26.9124,
      longitude: 75.7873,
      mandiCessPercent: 1.6,
      commissionPercent: 3.0,
      unloadingRatePerQuintal: 12,
      modalPricePerQuintal: 3380,
      buyerReliabilityScore: 88,
      liquidityScore: 90,
      priceStabilityScore: 84,
      paymentTermsScore: 85,
      paymentTermLabel: "Mandi Slip Payout"
    }
  ]
};

export default function SmartComparePage() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato");
  const [variety, setVariety] = useState("Hybrid 1057");
  const [quantity, setQuantity] = useState(20);
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>("GRADE_A");
  const [selectedLocationKey, setSelectedLocationKey] = useState("nashik");
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  const farmerLocation = KNOWN_HUBS[selectedLocationKey] || KNOWN_HUBS["nashik"];

  // Compute rankings
  const rankedOptions = useMemo(() => {
    const candidates = ALL_MARKET_CANDIDATES[selectedCrop] || ALL_MARKET_CANDIDATES["Tomato"];
    return rankAndRecommendMarkets({
      cropName: selectedCrop,
      variety,
      quantityQuintals: quantity,
      qualityGrade,
      farmerLocation,
      candidateMarkets: candidates
    });
  }, [selectedCrop, variety, quantity, qualityGrade, farmerLocation]);

  const topOption = rankedOptions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Core Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Smart Market Comparison & Net Realization Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Raw mandi prices don’t tell the whole story. We calculate your actual in-pocket profit after deducting road freight, mandi cess, commission agent fees, handling charges, and transit spoilage risk.
          </p>
        </div>
      </div>

      {/* Input Configuration Panel */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Configure Your Harvest Lot</span>
          </h2>
          <button
            onClick={() => setShowFormulaInfo(!showFormulaInfo)}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            <span>How is Net Realization calculated?</span>
          </button>
        </div>

        {/* Formula Explanation Alert */}
        {showFormulaInfo && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <p className="font-bold">📐 The AgriLink Net Realization & Recommendation Formula:</p>
            <div className="p-3 bg-white/80 rounded-lg font-mono text-[11px] text-emerald-900 border border-emerald-200/80">
              Net Realization = Gross Selling Value - (Transport Cost + APMC Mandi Cess + Commission Agent Fee + Unloading Handling + Transit Spoilage Cost)
            </div>
            <p className="text-slate-700">
              <strong>Multi-Factor Weights:</strong> 40% Net Realization • 20% Distance/Transit • 15% Buyer Reliability • 10% Payment Terms (Escrow) • 10% Market Demand/Liquidity • 5% Price Stability.
            </p>
          </div>
        )}

        {/* Parameter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                if (e.target.value === "Tomato") setVariety("Hybrid 1057");
                if (e.target.value === "Onion") setVariety("Nasik Red (Gavran)");
                if (e.target.value === "Wheat") setVariety("Sharbati Gold");
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Tomato">Tomato (Vegetable)</option>
              <option value="Onion">Onion (Rabi Crop)</option>
              <option value="Wheat">Wheat (Food Grain)</option>
            </select>
          </div>

          {/* Variety */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Variety / Strain</label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (Quintals)</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={500}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                {(quantity / 10).toFixed(1)} MT
              </span>
            </div>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Quality Grade</label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as QualityGrade)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="GRADE_A">Grade A (Premium / Export)</option>
              <option value="GRADE_B">Grade B (Standard Mandi)</option>
              <option value="GRADE_C">Grade C (Processing Grade)</option>
              <option value="ORGANIC">Certified Organic</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Farmer Location</label>
            <select
              value={selectedLocationKey}
              onChange={(e) => setSelectedLocationKey(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="nashik">Dindori / Nashik (Maharashtra)</option>
              <option value="lasalgaon">Lasalgaon (Maharashtra)</option>
              <option value="pune">Pune Rural (Maharashtra)</option>
              <option value="indore">Indore / Sehore (MP)</option>
              <option value="kolar">Kolar (Karnataka)</option>
              <option value="surat">Surat (Gujarat)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 1 Recommendation Spotlight Card */}
      {topOption && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-500 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-bl-xl shadow-sm flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>#1 TOP RECOMMENDED SELLING OPTION</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  Score: {topOption.scoring.totalCompositeScore}/100
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {topOption.location} ({topOption.distanceKm} km away)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {topOption.marketName}
              </h2>
            </div>

            {/* Metrics Highlight Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-emerald-200/80 shadow-2xs">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Headline Modal Quote</p>
                <p className="text-lg font-bold text-slate-900">₹{topOption.modalPrice} <span className="text-xs font-normal text-slate-500">/Q</span></p>
              </div>

              <div>
                <p className="text-[11px] text-slate-500 font-medium">Gross Batch Value</p>
                <p className="text-lg font-bold text-slate-900">{formatINR(topOption.costBreakdown.grossSellingValue)}</p>
              </div>

              <div>
                <p className="text-[11px] text-rose-600 font-medium">Total Deductions</p>
                <p className="text-lg font-bold text-rose-600">-{formatINR(topOption.costBreakdown.totalDeductions)}</p>
              </div>

              <div className="bg-emerald-600 text-white p-2.5 rounded-lg -m-1">
                <p className="text-[10px] uppercase font-bold text-emerald-100">Actual Net Realization</p>
                <p className="text-xl font-extrabold">{formatINR(topOption.costBreakdown.netRealizationAmount)}</p>
                <p className="text-[10px] text-emerald-100">₹{topOption.costBreakdown.netRealizationPerQuintal}/Q ({topOption.costBreakdown.netMarginPercentage}% Net)</p>
              </div>
            </div>

            {/* Why this option is recommended (Natural Language Explanation) */}
            <div className="p-4 rounded-xl bg-emerald-100/60 border border-emerald-300 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Why AgriLink Recommends This Option:</span>
              </div>
              <p className="leading-relaxed text-xs text-slate-800">
                {topOption.recommendationReason}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200">
                <div>
                  <p className="font-bold text-[11px] text-emerald-900 mb-1">Key Advantages:</p>
                  <ul className="space-y-1">
                    {topOption.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {topOption.cons.length > 0 && (
                  <div>
                    <p className="font-bold text-[11px] text-slate-700 mb-1">Considerations:</p>
                    <ul className="space-y-1">
                      {topOption.cons.map((con, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/farmer/listings/new?crop=${selectedCrop}&qty=${quantity}&price=${topOption.costBreakdown.netRealizationPerQuintal}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <span>Create Produce Listing for this Market</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/farmer/offers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                <span>Compare Active Buyer Offers</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full Side-by-Side Ranked Comparison Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">All Evaluated Markets & Direct Buyers</h3>
            <p className="text-xs text-slate-500">Ranked by 6-factor composite algorithm</p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {rankedOptions.length} candidate destinations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Rank & Market</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Distance / Transit</th>
                <th className="py-3 px-3">Headline Modal</th>
                <th className="py-3 px-3 text-rose-700">Deductions Breakdown</th>
                <th className="py-3 px-3 text-emerald-800">Net Realization</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedOptions.map((opt) => {
                const isTop = opt.rank === 1;
                return (
                  <tr
                    key={opt.marketId}
                    className={`hover:bg-slate-50 transition-colors ${
                      isTop ? "bg-emerald-50/40 font-medium" : ""
                    }`}
                  >
                    {/* Rank & Market */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            opt.rank === 1
                              ? "bg-emerald-600 text-white"
                              : opt.rank === 2
                              ? "bg-teal-600 text-white"
                              : opt.rank === 3
                              ? "bg-amber-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          #{opt.rank}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{opt.marketName}</p>
                          <p className="text-[10px] text-slate-500">{opt.location}</p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          opt.marketType === "PRIVATE_COLLECTION_HUB"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {opt.marketType === "PRIVATE_COLLECTION_HUB" ? "Direct Corporate" : "APMC Mandi"}
                      </span>
                    </td>

                    {/* Distance & Transit */}
                    <td className="py-3.5 px-3 text-slate-600">
                      <p className="font-semibold text-slate-800">{opt.distanceKm} km</p>
                      <p className="text-[10px] text-slate-500">~{opt.costBreakdown.estimatedTransitHours} hrs transit</p>
                    </td>

                    {/* Headline Price */}
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">₹{opt.modalPrice} <span className="text-[10px] font-normal text-slate-500">/Q</span></p>
                      <p className="text-[10px] text-slate-500">{formatINR(opt.costBreakdown.grossSellingValue)} Gross</p>
                    </td>

                    {/* Deductions Breakdown */}
                    <td className="py-3.5 px-3 text-[11px] text-slate-600 space-y-0.5">
                      <div className="flex items-center justify-between gap-4">
                        <span>Freight:</span>
                        <span className="text-rose-700 font-medium">-{formatINR(opt.costBreakdown.transportCost)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Mandi Cess & Agent:</span>
                        <span className="text-rose-700 font-medium">
                          -{formatINR(opt.costBreakdown.marketChargesMandiCess + opt.costBreakdown.commissionAgentFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Transit Spoilage:</span>
                        <span className="text-rose-700 font-medium">-{formatINR(opt.costBreakdown.spoilageRiskCost)}</span>
                      </div>
                    </td>

                    {/* Net Realization */}
                    <td className="py-3.5 px-3">
                      <p className="font-extrabold text-sm text-emerald-700">
                        {formatINR(opt.costBreakdown.netRealizationAmount)}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-600">
                        ₹{opt.costBreakdown.netRealizationPerQuintal}/Q ({opt.costBreakdown.netMarginPercentage}%)
                      </p>
                    </td>

                    {/* Composite Score */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">
                          {opt.scoring.totalCompositeScore}
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-3">
                      <Link
                        href={`/farmer/listings/new?crop=${selectedCrop}&qty=${quantity}&price=${opt.costBreakdown.netRealizationPerQuintal}`}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors inline-block"
                      >
                        Sell Here
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
