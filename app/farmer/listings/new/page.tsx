"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  Upload,
  Coins,
  MapPin,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Scale,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";

export default function NewProduceListingPage() {
  const router = useRouter();

  const [crop, setCrop] = useState("Tomato");
  const [variety, setVariety] = useState("Hybrid 1057");
  const [quantity, setQuantity] = useState(20);
  const [unit, setUnit] = useState("Quintal");
  const [qualityGrade, setQualityGrade] = useState("GRADE_A");
  const [expectedPrice, setExpectedPrice] = useState(2500);
  const [minPrice, setMinPrice] = useState(2200);
  const [locationName, setLocationName] = useState("Dindori, Nashik");
  const [state, setState] = useState("Maharashtra");
  const [harvestDate, setHarvestDate] = useState("2026-08-26");
  const [description, setDescription] = useState(
    "Fresh harvest greenhouse tomatoes, uniform 60-70mm grading, packed in 25kg crates. 0% chemical residues."
  );
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropName: crop,
          variety,
          quantity: Number(quantity),
          unit,
          qualityGrade,
          expectedPricePerUnit: Number(expectedPrice),
          minimumFloorPrice: Number(minPrice),
          locationName,
          state,
          harvestDate,
          description,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/farmer/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Failed to publish listing:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/farmer/dashboard" className="text-xs font-semibold text-emerald-600 hover:underline">
              ← Farmer Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Post New Produce Listing</h1>
          <p className="text-xs text-slate-500">Reach thousands of verified institutional buyers and aggregators</p>
        </div>

        <Link
          href={`/compare?crop=${encodeURIComponent(crop)}&qty=${quantity}`}
          className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shrink-0"
        >
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>Check Benchmark Net Return</span>
        </Link>
      </div>

      {isSuccess ? (
        <div className="p-12 rounded-2xl bg-white border border-emerald-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Listing Published Successfully!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your produce lot for <strong>{quantity} {unit} of {crop} ({variety})</strong> is now live on the marketplace. Verified buyers are being notified!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Produce Classification */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>Crop & Classification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Basmati Rice">Basmati Rice</option>
                  <option value="Green Chilli">Green Chilli</option>
                  <option value="Mango">Mango</option>
                  <option value="Potato">Potato</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Variety / Strain</label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quality Grade</label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="GRADE_A">Grade A (Premium / Export Quality)</option>
                  <option value="GRADE_B">Grade B (Standard Market Grade)</option>
                  <option value="GRADE_C">Grade C (Processing / Puree Grade)</option>
                  <option value="ORGANIC">Certified Organic (No Chemicals)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lot Quantity</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="flex-1 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-28 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50"
                  >
                    <option value="Quintal">Quintal</option>
                    <option value="Metric Ton">Metric Ton</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Harvest / Plucking Date</label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing & Location */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>Pricing & Farmgate Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full text-sm font-bold text-emerald-700 px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">Total lot value: {formatINR(expectedPrice * quantity)}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Minimum Acceptable Price (₹ / Q)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">Auto-reject counter-offers below this floor</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Village / Taluka / District</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description & Photo */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>Produce Description & Visual Verification</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lot Notes & Packaging</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                placeholder="Mention crate packaging, grading standard, moisture..."
              />
            </div>

            {/* Photo simulator */}
            <div className="p-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800">Produce Photo Attached</p>
              <p className="text-[11px] text-slate-500">
                1 image verified with geotag & timestamp (Dindori Farmgate)
              </p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              href="/farmer/dashboard"
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Publishing Lot..." : "Publish Produce Listing"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
