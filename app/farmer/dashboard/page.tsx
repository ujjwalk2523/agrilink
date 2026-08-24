"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  Scale,
  Plus,
  Coins,
  TrendingUp,
  Truck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Package,
  AlertTriangle
} from "lucide-react";
import { useRole } from "@/lib/context/role-context";
import { MOCK_PRODUCE_LISTINGS, MOCK_OFFERS, MOCK_ORDERS } from "@/lib/mock-data/seed-data";
import { formatINR, getStatusBadgeClass } from "@/lib/utils/formatters";

export default function FarmerDashboardPage() {
  const { currentUser } = useRole();

  const activeListings = MOCK_PRODUCE_LISTINGS.filter(l => l.farmerName.includes("Patil"));
  const pendingOffers = MOCK_OFFERS.filter(o => o.status === "PENDING");
  const inTransitOrders = MOCK_ORDERS.filter(o => o.orderStatus === "IN_TRANSIT");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              Farmer Command Center
            </span>
            <span className="text-xs text-emerald-200">
              Kisan ID: MH-NSK-4920
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name} 🌾
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser.location} • {currentUser.details.totalLandAcres} Acres ({currentUser.details.irrigation})
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/compare"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4" />
            <span>Smart Compare Net Realization</span>
          </Link>
          <Link
            href="/farmer/listings/new"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs backdrop-blur-md transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>New Produce Listing</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Net Realized Revenue YTD</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{formatINR(348500)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs local mandi baseline
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Produce Lots</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{activeListings.length} Lots</p>
          <p className="text-[11px] text-slate-500">70 Quintals total volume listed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pending Buyer Offers</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{pendingOffers.length} New</p>
          <Link href="/farmer/offers" className="text-[11px] text-amber-700 font-semibold hover:underline block">
            1 Top recommended offer waiting →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Shipments In Transit</span>
            <Truck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-700">{inTransitOrders.length} Reefer</p>
          <p className="text-[11px] text-slate-500">MH-12-QE-4501 arriving in 1h 45m</p>
        </div>
      </div>

      {/* Recommended Offer Alert Box */}
      {pendingOffers.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="bg-amber-300 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                High-Yield Opportunity 🏆
              </span>
              <span className="text-xs font-bold text-emerald-100">Reliance Fresh Procurement</span>
            </div>
            <h3 className="font-extrabold text-base sm:text-lg">
              Received ₹2,550/Q offer for 20 Quintals Tomatoes (Net Return: ₹48,600)
            </h3>
            <p className="text-xs text-emerald-100">
              Buyer arranges farmgate pickup. 0% Mandi Cess & 0% Agent Commission. Escrow 100% secured.
            </p>
          </div>

          <Link
            href="/farmer/offers"
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-extrabold text-xs shadow-md hover:bg-slate-100 transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Review & Accept Deal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Main Grid: Produce Listings & Live Shipment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Active Produce Lots */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">My Produce Listings</h2>
            <Link href="/farmer/listings/new" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              + Post New Lot
            </Link>
          </div>

          <div className="space-y-3">
            {activeListings.map((lst) => (
              <div
                key={lst.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={lst.imageUrl}
                    alt={lst.cropName}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900">{lst.cropName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(lst.status)}`}>
                        {lst.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{lst.variety} • {lst.quantity} {lst.unit} ({lst.qualityGrade})</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Expected: {formatINR(lst.expectedPricePerUnit)}/Q • Harvested: {lst.harvestDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/compare?crop=${encodeURIComponent(lst.cropName)}&qty=${lst.quantity}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1"
                  >
                    <Scale className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Net Realizer</span>
                  </Link>

                  <Link
                    href="/farmer/offers"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs"
                  >
                    {lst.offersCount} Offers →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Live Order Tracking & Quick AI */}
        <div className="space-y-6">
          {/* Active Shipment Status */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Live Delivery Tracker</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 animate-pulse">
                IN TRANSIT
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-900">Order #AGRI-ORD-8924</p>
                <p className="text-slate-600">20 Q Tomatoes to Reliance Fresh DC</p>
                <p className="text-emerald-700 font-semibold">Reefer Temp: 13.8°C (Optimal)</p>
              </div>

              <div className="space-y-2 relative pl-4 border-l-2 border-emerald-500">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[21px] top-1"></span>
                  <p className="font-bold text-slate-800">Farmgate Loaded & Weighed</p>
                  <p className="text-[10px] text-slate-400">Dindori, Nashik (11:30 AM)</p>
                </div>
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping absolute -left-[21px] top-1"></span>
                  <p className="font-bold text-emerald-700">En Route: Mumbai-Nashik Expy</p>
                  <p className="text-[10px] text-slate-500">Km 84 • Est. arrival 03:45 PM</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                <span className="font-semibold">Escrow Secured:</span>
                <span className="font-extrabold">₹51,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
