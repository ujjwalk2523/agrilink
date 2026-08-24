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
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  MapPin
} from "lucide-react";
import { useRole } from "@/lib/context/role-context";
import { UserRole } from "@/lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useRole();

  const [role, setRole] = useState<UserRole>("FARMER");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [location, setLocation] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    login(role);
    setTimeout(() => {
      if (role === "FARMER") router.push("/farmer/dashboard");
      else if (role === "BUYER") router.push("/buyer/marketplace");
      else if (role === "TRANSPORTER") router.push("/transporter/dashboard");
      else router.push("/fpo/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
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
            Create Free Account & Onboard KYC
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Join the verified agricultural marketplace network
          </p>
        </div>

        <form onSubmit={handleRegister} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 text-xs">
          {/* Role Selection */}
          <div>
            <label className="block font-bold text-slate-800 mb-2">Select Your Platform Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setRole("FARMER")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  role === "FARMER"
                    ? "bg-emerald-50 border-emerald-600 text-emerald-900 font-extrabold shadow-2xs"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Sprout className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span>Farmer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("BUYER")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  role === "BUYER"
                    ? "bg-blue-50 border-blue-600 text-blue-900 font-extrabold shadow-2xs"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span>Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("TRANSPORTER")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  role === "TRANSPORTER"
                    ? "bg-amber-50 border-amber-600 text-amber-900 font-extrabold shadow-2xs"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Truck className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                <span>Transporter</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("FPO")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  role === "FPO"
                    ? "bg-purple-50 border-purple-600 text-purple-900 font-extrabold shadow-2xs"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Users2 className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                <span>FPO / Co-op</span>
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name / Entity Name</label>
              <input
                type="text"
                placeholder={role === "FARMER" ? "e.g. Ramesh Patil" : "e.g. Aditya Agro Foods Ltd"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Village / District / City</label>
              <input
                type="text"
                placeholder="e.g. Dindori, Nashik"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* KYC Doc Field */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {role === "FARMER" && "7/12 Land Record Number or Aadhaar"}
                {role === "BUYER" && "GSTIN or APMC Trade License"}
                {role === "TRANSPORTER" && "Commercial Vehicle Registration / Permit"}
                {role === "FPO" && "FPO Registration Number (SFAC / NABARD)"}
              </label>
              <input
                type="text"
                placeholder="e.g. MH-NSK-4920"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All profiles are verified against government land/corporate registries for 100% fraud protection.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Onboarding Profile..." : "Complete Registration & Launch Portal"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/auth/login" className="font-bold text-emerald-700 hover:underline">
            Sign In to your account →
          </Link>
        </div>
      </div>
    </div>
  );
}
