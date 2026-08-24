"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Coins,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";
import { useRole } from "@/lib/context/role-context";
import { formatINR } from "@/lib/utils/formatters";

export default function TransporterDashboardPage() {
  const { currentUser } = useRole();

  const vehicles = currentUser.details.activeVehicles || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-800 via-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Transporter Fleet Control
            </span>
            <span className="text-xs text-amber-200">
              {currentUser.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentUser.name} 🚚
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentUser.location} • Base Rate: ₹{currentUser.details.ratePerKmPerTon}/km/MT • Operating Radius: {currentUser.details.operatingRadius}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/transporter/jobs"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Open Load Board (2 Available)</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Freight Revenue (This Month)</span>
          <p className="text-2xl font-extrabold text-slate-900">{formatINR(184200)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 24 trips completed
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Fleet Vehicles</span>
          <p className="text-2xl font-extrabold text-slate-900">{vehicles.length} Trucks</p>
          <p className="text-[11px] text-slate-500">1 Reefer in transit, 2 Available</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">On-Time Delivery Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600">99.2%</p>
          <p className="text-[11px] text-slate-500">4.8★ Transporter Rating</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Transit Jobs</span>
          <p className="text-2xl font-extrabold text-amber-600">1 Job Live</p>
          <p className="text-[11px] text-slate-500">Nashik → Navi Mumbai (Km 84)</p>
        </div>
      </div>

      {/* Fleet Vehicles Registry */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Registered Vehicles & Cold Chain Units</h2>
            <p className="text-xs text-slate-500">Live GPS tracking and temperature sensors connected</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Vehicle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vehicles.map((v: any) => (
            <div key={v.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{v.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    v.status === "In Transit"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {v.status}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-600">Reg: {v.reg}</p>
              {v.temp && (
                <p className="text-xs text-emerald-700 font-semibold">
                  ❄️ Reefer Telemetry: {v.temp}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Job Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 uppercase">
            Active Job #AGRI-ORD-8924
          </span>
          <h3 className="text-lg font-extrabold">20 Quintals Tomatoes (MH-12-QE-4501)</h3>
          <p className="text-xs text-amber-100">
            Dindori Farmgate (Nashik) → Reliance Fresh DC (Navi Mumbai). Current Location: Km 84 Expressway.
          </p>
        </div>

        <Link
          href="/transporter/jobs"
          className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-sm hover:bg-slate-100 transition-colors shrink-0"
        >
          Update Milestone & POD →
        </Link>
      </div>
    </div>
  );
}
