"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  TrendingUp,
  Package,
  Award
} from "lucide-react";
import { MOCK_ORDERS, MockOrder } from "@/lib/mock-data/seed-data";
import { formatINR, getStatusBadgeClass } from "@/lib/utils/formatters";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(MOCK_ORDERS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Buyer Enterprise Procurement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Order Fulfillment & Quality Inspection Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track farmgate pickups, live reefer telemetry, and automated optical QC inspections with escrow settlement release.
          </p>
        </div>

        <Link
          href="/buyer/marketplace"
          className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors shrink-0 flex items-center gap-1.5"
        >
          <Package className="w-4 h-4" />
          <span>Browse Produce Marketplace</span>
        </Link>
      </div>

      {/* Orders Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">Procurement Purchase Orders</h2>
          <div className="space-y-3">
            {orders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-50/60 border-blue-500 shadow-md"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-extrabold text-xs text-slate-900">{order.orderNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <p className="font-bold text-sm text-slate-800">{order.listingCrop}</p>
                  <p className="text-xs text-slate-500">{order.quantityQuintals} Quintals • {order.farmerName}</p>

                  <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-slate-200/80">
                    <span className="font-bold text-emerald-700">{formatINR(order.totalAmount)}</span>
                    <span className="text-[11px] text-slate-400">{order.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Live Milestones */}
        {selectedOrder && (
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order Ref:</span>
                  <h3 className="font-extrabold text-xl text-slate-900">{selectedOrder.orderNumber}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                    Escrow: {selectedOrder.escrowStatus}
                  </span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <p className="text-slate-500">Agreed Price</p>
                  <p className="font-bold text-slate-900 text-base">{formatINR(selectedOrder.agreedPricePerUnit)}/Q</p>
                </div>
                <div>
                  <p className="text-slate-500">Total Lot Volume</p>
                  <p className="font-bold text-slate-900 text-base">{selectedOrder.quantityQuintals} Q (2 MT)</p>
                </div>
                <div>
                  <p className="text-slate-500">Total Escrow Value</p>
                  <p className="font-extrabold text-emerald-700 text-base">{formatINR(selectedOrder.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Transporter</p>
                  <p className="font-bold text-slate-900">{selectedOrder.transporterName.split(" ")[0]} Logistics</p>
                </div>
              </div>

              {/* Transit Route & Live Milestones */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Shipment Milestones & GPS Telemetry</span>
                </h4>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                  <p className="font-bold">🚚 Current Location & Sensor Status:</p>
                  <p className="text-slate-700">{selectedOrder.currentMilestone}</p>
                  {selectedOrder.temperatureCelsius && (
                    <p className="font-semibold text-emerald-800 pt-1">
                      ❄️ Reefer Temperature: {selectedOrder.temperatureCelsius}°C (Within Grade-A Target 12-15°C)
                    </p>
                  )}
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-emerald-500">
                  {selectedOrder.milestones.map((m, idx) => (
                    <div key={idx} className="relative text-xs">
                      <span
                        className={`w-3 h-3 rounded-full absolute -left-[23px] top-0.5 ${
                          m.status === "completed"
                            ? "bg-emerald-600"
                            : m.status === "current"
                            ? "bg-amber-500 animate-ping"
                            : "bg-slate-300"
                        }`}
                      />
                      <p className={`font-bold ${m.status === "current" ? "text-amber-700 text-sm" : "text-slate-800"}`}>
                        {m.title}
                      </p>
                      {m.time && <p className="text-[11px] text-slate-400">{m.time}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Inspection Report */}
              {selectedOrder.qualityCheck && (
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Quality & Assay Inspection Certification</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      PASSED QC
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">Assigned Grade:</p>
                      <p className="font-bold text-slate-900">{selectedOrder.qualityCheck.gradeAssigned}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Moisture Content:</p>
                      <p className="font-bold text-slate-900">{selectedOrder.qualityCheck.moisturePercent}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Defect Tolerance:</p>
                      <p className="font-bold text-slate-900">{selectedOrder.qualityCheck.visualDefectRate}% (Max 5% allowed)</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                    Verified by: {selectedOrder.qualityCheck.inspectedBy}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
