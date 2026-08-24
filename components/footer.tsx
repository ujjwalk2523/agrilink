import React from "react";
import Link from "next/link";
import { Sprout, ShieldCheck, Database, Award, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Value Proposition */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Agri<span className="text-emerald-400">Link</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agricultural market intelligence and smart selling platform. We empower farmers to discover true net realization and connect directly with verified buyers.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protection</span>
            </div>
          </div>

          {/* Col 2: Core Platform Engines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Engines</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/compare" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Net Realization Calculator <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/market-prices" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Mandi Price Discovery (APMC & eNAM) <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Produce Marketplace <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/farmer/listings/new" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  List Your Produce <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Role Workspaces</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/farmer/dashboard" className="hover:text-emerald-400 transition-colors">Farmer Command Center</Link></li>
              <li><Link href="/buyer/marketplace" className="hover:text-emerald-400 transition-colors">Enterprise Buyer Procurement</Link></li>
              <li><Link href="/transporter/dashboard" className="hover:text-emerald-400 transition-colors">Transporter Fleet & Loads</Link></li>
              <li><Link href="/fpo/dashboard" className="hover:text-emerald-400 transition-colors">FPO Bulk Aggregation Desk</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-emerald-400 transition-colors">Admin Governance & Price Sync</Link></li>
            </ul>
          </div>

          {/* Col 4: Data Integrations & Freshness */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Data Integrations</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                <Database className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-white font-medium text-[11px]">Agmarknet & eNAM Synced</p>
                  <p className="text-[10px] text-slate-400">Live feeds from 500+ APMC mandis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-white font-medium text-[11px]">NABARD & SFAC Compliant</p>
                  <p className="text-[10px] text-slate-400">Institutional FPO integration ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AgriLink Technologies Ltd. All rights reserved. Built for Bharat’s Agricultural Transformation.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Security & Escrow Vault</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
