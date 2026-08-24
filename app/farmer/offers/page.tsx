"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Coins,
  ShieldCheck,
  Scale,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Truck,
  Building2,
  Clock,
  Star,
  Award,
  AlertTriangle,
  RefreshCw,
  Send
} from "lucide-react";
import { MOCK_OFFERS, MockOffer } from "@/lib/mock-data/seed-data";
import { formatINR, getStatusBadgeClass } from "@/lib/utils/formatters";

export default function FarmerOffersPage() {
  const [offers, setOffers] = useState<MockOffer[]>(MOCK_OFFERS);
  const [selectedOffer, setSelectedOffer] = useState<MockOffer | null>(null);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterPrice, setCounterPrice] = useState(2600);
  const [counterNote, setCounterNote] = useState("");
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch offers from API
  React.useEffect(() => {
    async function fetchOffers() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/offers");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOffers(json.data);
        }
      } catch (err) {
        console.error("Failed to load offers:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const handleAccept = async (offer: MockOffer) => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setAcceptedOfferId(offer.id);
    setOffers(prev =>
      prev.map(o =>
        o.id === offer.id ? { ...o, status: "ACCEPTED" } : { ...o, status: "REJECTED" }
      )
    );

    try {
      await fetch("/api/offers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          action: "ACCEPT",
        }),
      });
    } catch (err) {
      console.error("Failed to accept offer on API:", err);
    }
  };

  const handleOpenCounter = (offer: MockOffer) => {
    setSelectedOffer(offer);
    setCounterPrice(offer.offeredPricePerUnit + 50);
    setCounterNote(`Can confirm immediately if you can adjust to ₹${offer.offeredPricePerUnit + 50}/Q for full 20 Quintals.`);
    setShowCounterModal(true);
  };

  const handleSendCounter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;

    setOffers(prev =>
      prev.map(o => {
        if (o.id === selectedOffer.id) {
          return {
            ...o,
            status: "COUNTERED",
            counterPricePerUnit: counterPrice,
            history: [
              ...o.history,
              {
                sender: "Ramesh Patil (Farmer)",
                text: `Counter-offer sent: ₹${counterPrice}/Q. ${counterNote}`,
                time: "Just now",
                price: counterPrice
              }
            ]
          };
        }
        return o;
      })
    );

    setShowCounterModal(false);

    try {
      await fetch("/api/offers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: selectedOffer.id,
          action: "COUNTER",
          counterPrice,
          message: counterNote,
        }),
      });
    } catch (err) {
      console.error("Failed to send counter offer on API:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Coins className="w-3.5 h-3.5" />
            <span>Smart Negotiation & Offer Realizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Incoming Buyer Offers for Lot #LST-101 (20 Q Tomatoes)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare offered prices against **Net Return in Hand**. A higher headline price with farmer transport responsibilities often yields less money than a direct farmgate pickup!
          </p>
        </div>

        <Link
          href="/compare?crop=Tomato&qty=20"
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Scale className="w-4 h-4 text-emerald-400" />
          <span>Launch Market Realizer</span>
        </Link>
      </div>

      {/* Acceptance Banner */}
      {acceptedOfferId && (
        <div className="p-6 rounded-2xl bg-emerald-600 text-white shadow-lg space-y-3 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Deal Accepted! Order #AGRI-ORD-8924 Generated</h2>
              <p className="text-xs text-emerald-100">
                100% Escrow deposit is locked. Transporter Gurukripa Reefer scheduled for pickup.
              </p>
            </div>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/farmer/dashboard"
              className="px-4 py-2 rounded-xl bg-white text-emerald-950 font-extrabold text-xs shadow-sm hover:bg-slate-100 transition-colors"
            >
              Track Live Shipment in Dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* Offers Side-by-Side Comparison Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const isTop = offer.isTopRecommended;
          const isAccepted = offer.status === "ACCEPTED";
          const isCountered = offer.status === "COUNTERED";

          return (
            <div
              key={offer.id}
              className={`rounded-2xl bg-white border p-6 flex flex-col justify-between space-y-5 relative transition-all shadow-sm ${
                isTop
                  ? "border-2 border-emerald-500 shadow-md bg-gradient-to-b from-emerald-50/30 to-white"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Recommended Top Badge */}
              {isTop && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white font-extrabold text-[10px] uppercase px-3.5 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Top Recommended Deal 🏆</span>
                </div>
              )}

              {/* Card Header: Buyer Profile */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {offer.buyerType}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {offer.buyerName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {offer.buyerRating}
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {offer.buyerReliabilityScore}% Reliability
                  </span>
                </div>
              </div>

              {/* Financial Metrics & Comparison Breakdown */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-600 font-medium">Offered Headline Price:</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatINR(offer.offeredPricePerUnit)} <span className="text-xs font-normal text-slate-500">/Q</span>
                  </span>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross Value ({offer.quantity} Q):</span>
                    <span className="font-semibold">{formatINR(offer.estimatedGrossINR)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Transport Responsibility:</span>
                    <span className={`font-bold ${offer.transportResponsibility === "BUYER_ARRANGES" ? "text-emerald-700" : "text-rose-700"}`}>
                      {offer.transportResponsibility === "BUYER_ARRANGES" ? "Buyer Arranges (₹0)" : `-₹${offer.estimatedTransportINR} (Farmer)`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Payment Security:</span>
                    <span className="font-medium text-slate-800">{offer.paymentTermLabel.split("(")[0]}</span>
                  </div>
                </div>

                {/* Net Realization Callout */}
                <div className={`p-3 rounded-lg border flex items-center justify-between font-bold ${
                  isTop ? "bg-emerald-600 text-white border-emerald-700" : "bg-white border-slate-200 text-slate-900"
                }`}>
                  <span className="text-xs">Estimated Net Return:</span>
                  <span className="text-base">{formatINR(offer.estimatedNetINR)}</span>
                </div>
              </div>

              {/* Recommendation Narrative */}
              <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Realization Analysis:</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  {offer.recommendationExplanation}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Offer Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] border ${getStatusBadgeClass(offer.status)}`}>
                    {offer.status}
                  </span>
                </div>

                {isAccepted ? (
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs text-center border border-emerald-300">
                    ✓ Accepted & Confirmed
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAccept(offer)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Deal</span>
                    </button>

                    <button
                      onClick={() => handleOpenCounter(offer)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Counter</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && selectedOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Counter-Offer Room</h3>
                <p className="text-xs text-slate-500">Negotiating with {selectedOffer.buyerName}</p>
              </div>
              <button
                onClick={() => setShowCounterModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendCounter} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-500">Current Buyer Offer</p>
                  <p className="font-bold text-slate-900">{formatINR(selectedOffer.offeredPricePerUnit)}/Q</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">Quantity</p>
                  <p className="font-bold text-slate-900">{selectedOffer.quantity} Quintals</p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Counter Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700 text-sm focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Counter Message / Terms</label>
                <textarea
                  rows={3}
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCounterModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Binding Counter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
