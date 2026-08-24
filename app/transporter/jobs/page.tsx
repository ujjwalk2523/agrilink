"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  Upload
} from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";

interface OpenTransportJob {
  id: string;
  orderNumber: string;
  crop: string;
  weightTons: number;
  origin: string;
  destination: string;
  distanceKm: number;
  pickupDeadline: string;
  requiresReefer: boolean;
  estBudget: number;
  status: "OPEN" | "QUOTE_SENT" | "ASSIGNED";
}

const INITIAL_JOBS: OpenTransportJob[] = [
  {
    id: "job-101",
    orderNumber: "AGRI-ORD-8930",
    crop: "Wheat (Sharbati Gold)",
    weightTons: 10,
    origin: "Sehore Grain Terminal, MP",
    destination: "Indore APMC Choithram Yard",
    distanceKm: 145,
    pickupDeadline: "Tomorrow, 08:00 AM",
    requiresReefer: false,
    estBudget: 5800,
    status: "OPEN"
  },
  {
    id: "job-102",
    orderNumber: "AGRI-ORD-8935",
    crop: "Alphonso Mango",
    weightTons: 3,
    origin: "Ratnagiri Orchards, MH",
    destination: "Vashi APMC Export Terminal",
    distanceKm: 330,
    pickupDeadline: "26 Aug, 06:00 AM",
    requiresReefer: true,
    estBudget: 12500,
    status: "OPEN"
  }
];

export default function TransporterJobsPage() {
  const [jobs, setJobs] = useState<OpenTransportJob[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<OpenTransportJob | null>(null);
  const [quoteAmount, setQuoteAmount] = useState(6000);
  const [quoteNotes, setQuoteNotes] = useState("Tata 1109 available for immediate pickup tomorrow morning.");
  const [isQuoteSent, setIsQuoteSent] = useState(false);

  const [activeJobMilestone, setActiveJobMilestone] = useState("IN_TRANSIT");

  const handleOpenQuote = (job: OpenTransportJob) => {
    setSelectedJob(job);
    setQuoteAmount(job.estBudget);
    setIsQuoteSent(false);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setJobs(prev =>
      prev.map(j => (j.id === selectedJob.id ? { ...j, status: "QUOTE_SENT" } : j))
    );
    setIsQuoteSent(true);
    setTimeout(() => {
      setSelectedJob(null);
      setIsQuoteSent(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/transporter/dashboard" className="text-xs font-semibold text-amber-700 hover:underline">
              ← Transporter Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Transport Load Board & Trips</h1>
          <p className="text-xs text-slate-500">Discover agricultural freight requests and submit competitive haulage bids</p>
        </div>
      </div>

      {/* Active Trip Milestone Updater */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-base text-slate-900">Active Trip Dispatch Console: #AGRI-ORD-8924</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            Assigned Vehicle: MH-12-QE-4501
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => setActiveJobMilestone("PICKUP_COMPLETED")}
            className={`p-3 rounded-xl border font-bold transition-all ${
              activeJobMilestone === "PICKUP_COMPLETED"
                ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            ✓ 1. Farmgate Loaded (11:30 AM)
          </button>

          <button
            onClick={() => setActiveJobMilestone("IN_TRANSIT")}
            className={`p-3 rounded-xl border font-bold transition-all ${
              activeJobMilestone === "IN_TRANSIT"
                ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            🚚 2. In Transit (Km 84)
          </button>

          <button
            onClick={() => setActiveJobMilestone("DELIVERED")}
            className={`p-3 rounded-xl border font-bold transition-all ${
              activeJobMilestone === "DELIVERED"
                ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            📦 3. Mark Delivered at DC
          </button>

          <button
            onClick={() => setActiveJobMilestone("POD_UPLOADED")}
            className={`p-3 rounded-xl border font-bold transition-all ${
              activeJobMilestone === "POD_UPLOADED"
                ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            📄 4. Upload Sign & POD
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>Status synced to Buyer & Farmer tracking portals instantly</span>
          <span className="font-semibold text-emerald-700">Freight Payout: ₹2,900 auto-credited upon POD</span>
        </div>
      </div>

      {/* Open Load Requests */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Available Agricultural Freight Requests</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400 bg-white shadow-2xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">{job.orderNumber}</span>
                  {job.requiresReefer ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      ❄️ Reefer Required
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Open / Tarp Truck
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900">{job.crop} ({job.weightTons} Metric Tons)</h3>

                <div className="space-y-1 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>From:</strong> {job.origin}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span><strong>To:</strong> {job.destination} ({job.distanceKm} km)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pickup Window: {job.pickupDeadline}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">Target Freight Budget</p>
                  <p className="text-base font-extrabold text-slate-900">{formatINR(job.estBudget)}</p>
                </div>

                {job.status === "QUOTE_SENT" ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    ✓ Quote Submitted
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenQuote(job)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Submit Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Quote Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Submit Haulage Quote</h3>
                <p className="text-xs text-slate-500">{selectedJob.crop} • {selectedJob.origin} → {selectedJob.destination}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {isQuoteSent ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Quote Submitted to Buyer/Farmer!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Quoted Freight Amount (₹)</label>
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700 text-sm focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Dispatch & Notes</label>
                  <textarea
                    rows={3}
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 shadow-sm"
                  >
                    Confirm & Send Quote
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
