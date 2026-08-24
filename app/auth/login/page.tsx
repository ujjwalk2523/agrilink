"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  Building2,
  Truck,
  Users2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Phone,
  Mail,
  CheckCircle2,
  LogIn
} from "lucide-react";
import { useRole } from "@/lib/context/role-context";
import { UserRole } from "@/lib/types";
import { MOCK_USERS } from "@/lib/mock-data/seed-data";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRole();

  const [activeTab, setActiveTab] = useState<"QUICK_DEMO" | "CREDENTIALS">("QUICK_DEMO");
  const [phoneOrEmail, setPhoneOrEmail] = useState("+91 98231 45678");
  const [password, setPassword] = useState("••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("FARMER");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = (role: UserRole) => {
    setIsLoading(true);
    login(role);
    setTimeout(() => {
      if (role === "FARMER") router.push("/farmer/dashboard");
      else if (role === "BUYER") router.push("/buyer/marketplace");
      else if (role === "TRANSPORTER") router.push("/transporter/dashboard");
      else if (role === "FPO") router.push("/fpo/dashboard");
      else router.push("/admin/dashboard");
    }, 400);
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickLogin(selectedRole);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Agri<span className="text-emerald-600">Link</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Sign In to AgriLink
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Choose your role to enter your dedicated agricultural workspace
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-xl bg-slate-200/80 grid grid-cols-2 text-xs font-bold text-center">
          <button
            onClick={() => setActiveTab("QUICK_DEMO")}
            className={`py-2 rounded-lg transition-all ${
              activeTab === "QUICK_DEMO"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ⚡ 1-Click Demo Profiles (All 5 Roles)
          </button>
          <button
            onClick={() => setActiveTab("CREDENTIALS")}
            className={`py-2 rounded-lg transition-all ${
              activeTab === "CREDENTIALS"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📱 Mobile / Email Login
          </button>
        </div>

        {/* Tab 1: 1-Click Demo Profile Switcher */}
        {activeTab === "QUICK_DEMO" && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 px-1">
              Select an account to log in and test full role-specific features:
            </p>

            {/* Farmer Card */}
            <div
              onClick={() => handleQuickLogin("FARMER")}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={MOCK_USERS.FARMER.avatar}
                  alt={MOCK_USERS.FARMER.name}
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{MOCK_USERS.FARMER.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      🌾 Farmer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{MOCK_USERS.FARMER.location} • 14.5 Acres</p>
                  <p className="text-[11px] text-emerald-700 font-medium">Net Realizer, Produce Listings & Offer Desk</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Log In →
              </span>
            </div>

            {/* Buyer Card */}
            <div
              onClick={() => handleQuickLogin("BUYER")}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={MOCK_USERS.BUYER.avatar}
                  alt={MOCK_USERS.BUYER.name}
                  className="w-12 h-12 rounded-xl object-cover border border-blue-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{MOCK_USERS.BUYER.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      🏢 Buyer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{MOCK_USERS.BUYER.location} • GST Verified</p>
                  <p className="text-[11px] text-blue-700 font-medium">Direct Sourcing, Escrow Offers & QC Desk</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Log In →
              </span>
            </div>

            {/* Transporter Card */}
            <div
              onClick={() => handleQuickLogin("TRANSPORTER")}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={MOCK_USERS.TRANSPORTER.avatar}
                  alt={MOCK_USERS.TRANSPORTER.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{MOCK_USERS.TRANSPORTER.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      🚚 Transporter
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{MOCK_USERS.TRANSPORTER.location} • 8 Fleet Trucks</p>
                  <p className="text-[11px] text-amber-700 font-medium">Load Board, Freight Quotes & Reefer Telemetry</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Log In →
              </span>
            </div>

            {/* FPO Card */}
            <div
              onClick={() => handleQuickLogin("FPO")}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={MOCK_USERS.FPO.avatar}
                  alt={MOCK_USERS.FPO.name}
                  className="w-12 h-12 rounded-xl object-cover border border-purple-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{MOCK_USERS.FPO.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      👥 FPO / Co-op
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{MOCK_USERS.FPO.location} • 480 Farmer Members</p>
                  <p className="text-[11px] text-purple-700 font-medium">Bulk Crop Pooling & Member Dividends</p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Log In →
              </span>
            </div>

            {/* Admin Card */}
            <div
              onClick={() => handleQuickLogin("ADMIN")}
              className="p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-800 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={MOCK_USERS.ADMIN.avatar}
                  alt={MOCK_USERS.ADMIN.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{MOCK_USERS.ADMIN.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                      🛡️ Admin
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">AgriTech Governance • 450 Mandis Synced</p>
                  <p className="text-[11px] text-slate-700 font-medium">KYC Approvals, Price Sync Gateway & Escrow Vault</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Log In →
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Standard Login Form */}
        {activeTab === "CREDENTIALS" && (
          <form onSubmit={handleStandardLogin} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Your Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="FARMER">🌾 Farmer (Individual Cultivator)</option>
                <option value="BUYER">🏢 Buyer (Wholesaler / Processor / Retailer)</option>
                <option value="TRANSPORTER">🚚 Transporter / Logistics Operator</option>
                <option value="FPO">👥 FPO / Cooperative Federation</option>
                <option value="ADMIN">🛡️ Platform Admin / Officer</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Registered Mobile or Email</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password / 6-Digit OTP</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? "Signing in..." : `Sign In as ${selectedRole}`}</span>
            </button>
          </form>
        )}

        {/* Register CTA */}
        <div className="text-center text-xs text-slate-500 pt-2">
          Don’t have an AgriLink account yet?{" "}
          <Link href="/auth/register" className="font-bold text-emerald-700 hover:underline">
            Create Free Account & Onboard KYC →
          </Link>
        </div>
      </div>
    </div>
  );
}
