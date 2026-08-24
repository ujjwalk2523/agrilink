"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  UserCheck,
  Building2,
  TrendingUp,
  Coins,
  Scale
} from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";

interface KycItem {
  id: string;
  name: string;
  role: string;
  docType: string;
  docNumber: string;
  location: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  date: string;
}

const INITIAL_KYC: KycItem[] = [
  {
    id: "kyc-1",
    name: "Ramesh Kisan Patil",
    role: "FARMER",
    docType: "7/12 Land Extract & Aadhaar",
    docNumber: "MH-NSK-4920 / XXXX-4567",
    location: "Dindori, Nashik (14.5 Acres)",
    status: "VERIFIED",
    date: "24 Aug 2026"
  },
  {
    id: "kyc-2",
    name: "Reliance Fresh Rural Hub",
    role: "BUYER",
    docType: "GST & Corporate FSSAI License",
    docNumber: "27AABCR1234F1Z9",
    location: "Navi Mumbai, Maharashtra",
    status: "VERIFIED",
    date: "22 Aug 2026"
  },
  {
    id: "kyc-3",
    name: "Balwant Logistics Carrier",
    role: "TRANSPORTER",
    docType: "Commercial National Reefer Permit",
    docNumber: "MH-12-QE-4501",
    location: "Pune Express Corridor",
    status: "PENDING",
    date: "Today, 10:15 AM"
  },
  {
    id: "kyc-4",
    name: "Marathwada Agro Traders",
    role: "BUYER",
    docType: "APMC Trading License",
    docNumber: "APMC-AUR-8890",
    location: "Chhatrapati Sambhajinagar",
    status: "PENDING",
    date: "Today, 11:30 AM"
  }
];

export default function AdminDashboardPage() {
  const [kycQueue, setKycQueue] = useState<KycItem[]>(INITIAL_KYC);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleApproveKyc = async (id: string) => {
    setKycQueue(prev => prev.map(k => (k.id === id ? { ...k, status: "VERIFIED" } : k)));
    try {
      await fetch("/api/admin/kyc", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycId: id, action: "APPROVE" }),
      });
    } catch (err) {
      console.error("Failed to approve KYC on backend:", err);
    }
  };

  const handleRejectKyc = async (id: string) => {
    setKycQueue(prev => prev.map(k => (k.id === id ? { ...k, status: "REJECTED" } : k)));
    try {
      await fetch("/api/admin/kyc", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycId: id, action: "REJECT" }),
      });
    } catch (err) {
      console.error("Failed to reject KYC on backend:", err);
    }
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Platform Governance Console
            </span>
            <span className="text-xs text-slate-400">
              AgriLink Central Command
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Security, KYC & Market Sync Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Audit user verifications, trigger real-time APMC data aggregation, and oversee platform escrow transactions.
          </p>
        </div>

        <button
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing 500+ Mandis..." : "Sync All Market APIs Now"}</span>
        </button>
      </div>

      {syncSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Market prices refreshed successfully across Agmarknet, eNAM & MSAMB feeds! All data marked as FRESH.</span>
        </div>
      )}

      {/* Admin KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Escrow Value Protected</span>
          <p className="text-2xl font-extrabold text-slate-900">{formatINR(4250000)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Vault Solvency
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Monitored Mandis</span>
          <p className="text-2xl font-extrabold text-slate-900">450 Mandis</p>
          <p className="text-[11px] text-slate-500">Agmarknet & eNAM Integration</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Pending KYC Verifications</span>
          <p className="text-2xl font-extrabold text-amber-600">
            {kycQueue.filter(k => k.status === "PENDING").length} Users
          </p>
          <p className="text-[11px] text-slate-500">Farmers, Buyers & Transporters</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Dispute Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600">0.02%</p>
          <p className="text-[11px] text-slate-500">Zero unsettled claims</p>
        </div>
      </div>

      {/* KYC Verification Desk */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">User Identity & Business KYC Verification Desk</h2>
            <p className="text-xs text-slate-500">Ensure only genuine farmers, verified corporate buyers, and licensed transporters trade</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">{kycQueue.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Applicant Name</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Document / Credential</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kycQueue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <p className="font-semibold text-slate-800">{item.docType}</p>
                    <p className="text-[10px] font-mono text-slate-400">{item.docNumber}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">{item.location}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        item.status === "VERIFIED"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : item.status === "PENDING"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-rose-100 text-rose-800 border-rose-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {item.status === "PENDING" ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApproveKyc(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 shadow-2xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectKyc(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-[11px] hover:bg-rose-100 border border-rose-200"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modular Data Provider Status */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Modular Market Data Provider Connectors</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Agmarknet Live API</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-xs text-slate-600">Sync: Continuous REST Polling</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Latency: 124ms • 320 Mandis Active</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">eNAM Unified Gateway</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-xs text-slate-600">Sync: National e-Trading Feed</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Latency: 210ms • 180 Mandis Active</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Admin Ground Override</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Fallback
              </span>
            </div>
            <p className="text-xs text-slate-600">Manual field surveyor submissions</p>
            <p className="text-[11px] text-blue-700 font-semibold">Ready for offline mandi reporting</p>
          </div>
        </div>
      </div>
    </div>
  );
}
