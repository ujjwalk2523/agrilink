"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Database,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SEED_MARKET_PRICES, NormalizedPriceRecord } from "@/lib/services/market-data-provider";
import { formatINR, formatDateTime, getStatusBadgeClass } from "@/lib/utils/formatters";

export default function MarketPricesPage() {
  const [cropFilter, setCropFilter] = useState("ALL");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState<NormalizedPriceRecord[]>(SEED_MARKET_PRICES);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Manual fallback admin form state
  const [adminCrop, setAdminCrop] = useState("Tomato");
  const [adminVariety, setAdminVariety] = useState("Hybrid 1057");
  const [adminMarket, setAdminMarket] = useState("");
  const [adminState, setAdminState] = useState("Maharashtra");
  const [adminMin, setAdminMin] = useState(2000);
  const [adminMax, setAdminMax] = useState(2600);
  const [adminModalPrice, setAdminModalPrice] = useState(2350);

  const filteredPrices = prices.filter((p) => {
    const matchCrop = cropFilter === "ALL" || p.cropName.toLowerCase() === cropFilter.toLowerCase();
    const matchState = stateFilter === "ALL" || p.state.toLowerCase() === stateFilter.toLowerCase();
    const matchType = typeFilter === "ALL" || p.marketType === typeFilter;
    const matchSearch =
      !searchQuery ||
      p.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCrop && matchState && matchType && matchSearch;
  });

  const handleAddManualPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminMarket) return;

    const newRecord: NormalizedPriceRecord = {
      cropName: adminCrop,
      variety: adminVariety,
      marketName: adminMarket,
      marketType: "APMC",
      state: adminState,
      district: "Local Hub",
      minPrice: Number(adminMin),
      maxPrice: Number(adminMax),
      modalPrice: Number(adminModalPrice),
      dailyArrivals: 150,
      trend: "STABLE",
      dataSource: "Admin Manual Field Entry",
      sourceTimestamp: new Date(),
      lastSyncedAt: new Date(),
      freshnessStatus: "FRESH",
      qualityGrade: "GRADE_A"
    };

    setPrices([newRecord, ...prices]);
    setShowAdminModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Database className="w-3.5 h-3.5" />
            <span>Agmarknet & eNAM Live Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Agricultural Market Price Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Explore real-time modal, min, and max prices across 500+ APMC mandis and direct corporate hubs. Verify data freshness and jump directly to Net Realization calculation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setShowAdminModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Manual Price Entry Fallback</span>
          </button>

          <Link
            href="/compare"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Scale className="w-4 h-4" />
            <span>Calculate Net Realization</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search crop, variety, or mandi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Crop Selector */}
          <div>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Crops (Vegetables, Grains, Fruits)</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
              <option value="Wheat">Wheat</option>
              <option value="Basmati Rice">Basmati Rice</option>
              <option value="Potato">Potato</option>
              <option value="Green Chilli">Green Chilli</option>
              <option value="Mango">Mango</option>
              <option value="Soybean">Soybean</option>
            </select>
          </div>

          {/* State Selector */}
          <div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All States / UTs</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          {/* Market Type */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Market Types</option>
              <option value="APMC">APMC Mandis</option>
              <option value="PRIVATE_COLLECTION_HUB">Direct Corporate Hubs</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Found <strong>{filteredPrices.length}</strong> live market price records</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> eNAM / Agmarknet sync active
          </span>
        </div>
      </div>

      {/* Market Prices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrices.map((record, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 space-y-4 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">{record.cropName}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {record.qualityGrade}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700">{record.variety}</p>
                </div>

                {/* Price Trend Badge */}
                <div
                  className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shrink-0 ${
                    record.trend === "BULLISH"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : record.trend === "BEARISH"
                      ? "bg-rose-100 text-rose-800 border border-rose-200"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {record.trend === "BULLISH" ? (
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  ) : record.trend === "BEARISH" ? (
                    <TrendingDown className="w-3 h-3 text-rose-600" />
                  ) : null}
                  <span>{record.trend}</span>
                </div>
              </div>

              {/* Mandi & Location */}
              <div className="text-xs text-slate-600 space-y-0.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" /> {record.marketName}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 pl-4">
                  <MapPin className="w-3 h-3" /> {record.district}, {record.state}
                </p>
              </div>
            </div>

            {/* Price Figures */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600 font-medium">Modal Price (Benchmark):</span>
                <span className="text-xl font-extrabold text-emerald-700">
                  {formatINR(record.modalPrice)} <span className="text-xs font-normal text-slate-500">/Quintal</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-200">
                <span>Min: <strong>{formatINR(record.minPrice)}</strong></span>
                <span>Max: <strong>{formatINR(record.maxPrice)}</strong></span>
                <span>Arrivals: <strong>{record.dailyArrivals} Q</strong></span>
              </div>
            </div>

            {/* Source & Freshness Footer */}
            <div className="space-y-3 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[170px]" title={record.dataSource}>
                  📡 {record.dataSource}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadgeClass(
                    record.freshnessStatus
                  )}`}
                >
                  {record.freshnessStatus}
                </span>
              </div>

              <Link
                href={`/compare?crop=${encodeURIComponent(record.cropName)}`}
                className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
              >
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                <span>Calculate Net Realization</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Admin Price Entry Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Manual Price Entry Fallback</h3>
              </div>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Allows admin or field surveyors to input fallback ground prices when external mandi API sync is delayed.
            </p>

            <form onSubmit={handleAddManualPrice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Crop</label>
                <input
                  type="text"
                  value={adminCrop}
                  onChange={(e) => setAdminCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Variety</label>
                <input
                  type="text"
                  value={adminVariety}
                  onChange={(e) => setAdminVariety(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandi / Market Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nashik APMC Yard #2"
                  value={adminMarket}
                  onChange={(e) => setAdminMarket(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Price (₹)</label>
                  <input
                    type="number"
                    value={adminMin}
                    onChange={(e) => setAdminMin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Modal Price (₹)</label>
                  <input
                    type="number"
                    value={adminModalPrice}
                    onChange={(e) => setAdminModalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-emerald-700"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Price (₹)</label>
                  <input
                    type="number"
                    value={adminMax}
                    onChange={(e) => setAdminMax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                >
                  Publish Price Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
