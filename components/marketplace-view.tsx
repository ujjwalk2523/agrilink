"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  Coins,
  ArrowRight,
  Scale,
  Sparkles,
  Phone,
  MessageSquare,
  Building2,
  Truck,
  PlusCircle,
  FileCheck2,
  Eye
} from "lucide-react";
import { MOCK_PRODUCE_LISTINGS, MockListing } from "@/lib/mock-data/seed-data";
import { formatINR, getStatusBadgeClass } from "@/lib/utils/formatters";
import { useRole } from "@/lib/context/role-context";

export function MarketplaceView() {
  const { currentRole, isAuthenticated } = useRole();

  const [cropFilter, setCropFilter] = useState("ALL");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<MockListing | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Buyer offer form state
  const [offerPrice, setOfferPrice] = useState(2500);
  const [offerQuantity, setOfferQuantity] = useState(20);
  const [offerTransport, setOfferTransport] = useState("BUYER_ARRANGES");
  const [offerPayment, setOfferPayment] = useState("INSTANT_ESCROW");
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  const [listings, setListings] = useState<MockListing[]>(MOCK_PRODUCE_LISTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  // Fetch from backend API
  React.useEffect(() => {
    async function fetchListings() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/listings");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setListings(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListings();
  }, []);

  const filteredListings = listings.filter((lst) => {
    const matchCrop = cropFilter === "ALL" || lst.cropName.toLowerCase() === cropFilter.toLowerCase();
    const matchGrade = gradeFilter === "ALL" || lst.qualityGrade === gradeFilter;
    const matchSearch =
      !searchQuery ||
      lst.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCrop && matchGrade && matchSearch;
  });

  const handleOpenOffer = (listing: MockListing) => {
    setSelectedListing(listing);
    setOfferPrice(listing.expectedPricePerUnit);
    setOfferQuantity(listing.quantity);
    setOfferSubmitted(false);
    setShowOfferModal(true);
  };

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    try {
      setIsSubmittingOffer(true);
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: selectedListing.id,
          listingCrop: `${selectedListing.cropName} (${selectedListing.variety})`,
          listingQuantity: selectedListing.quantity,
          offeredPricePerUnit: offerPrice,
          quantity: offerQuantity,
          transportResponsibility: offerTransport,
          paymentTerms: offerPayment,
          notes: `Buyer purchase offer with ${offerTransport === "BUYER_ARRANGES" ? "Buyer Pickup" : "Farmer Delivery"}.`,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setOfferSubmitted(true);
        setTimeout(() => {
          setShowOfferModal(false);
          setOfferSubmitted(false);
        }, 2200);
      }
    } catch (err) {
      console.error("Failed to submit offer:", err);
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Role-Specific Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          {/* Contextual Badge */}
          {currentRole === "BUYER" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>Institutional Buyer Sourcing Desk</span>
            </div>
          )}
          {currentRole === "FARMER" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Direct Farmgate Produce Marketplace</span>
            </div>
          )}
          {currentRole === "TRANSPORTER" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Truck className="w-3.5 h-3.5" />
              <span>Agricultural Logistics & Freight Directory</span>
            </div>
          )}
          {currentRole === "FPO" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 text-xs font-bold border border-purple-400/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>FPO Cooperative Collective Catalog</span>
            </div>
          )}
          {currentRole === "ADMIN" && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-400/20 text-slate-300 text-xs font-bold border border-slate-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platform Trade & Listing Oversight</span>
            </div>
          )}

          {/* Contextual Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentRole === "BUYER" && "Direct Farmgate Produce Procurement"}
            {currentRole === "FARMER" && "Verified Farmer Produce Marketplace"}
            {currentRole === "TRANSPORTER" && "Produce Shipments & Freight Lots"}
            {currentRole === "FPO" && "FPO Collective Harvest Directory"}
            {currentRole === "ADMIN" && "Verified Agricultural Marketplace Directory"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentRole === "BUYER" && "Browse verified farm harvests, view assay inspection metrics, and place binding purchase offers with 100% escrow protection and farmgate pickup."}
            {currentRole === "FARMER" && "List your harvests, compare real net realization after transport & commission, and receive direct binding offers from corporate and wholesale buyers."}
            {currentRole === "TRANSPORTER" && "Find verified produce lots requiring transportation from farms to mandis and corporate processing centers."}
            {currentRole === "FPO" && "Pool member harvests into bulk commercial lots to command premium pricing from institutional agribusiness buyers."}
            {currentRole === "ADMIN" && "Live directory of all verified farmer produce listings, quality certificates, and binding escrow transactions across India."}
          </p>
        </div>

        {/* Role-Specific Action CTAs */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          {currentRole === "BUYER" && (
            <>
              <Link
                href="/buyer/orders"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>My Purchase Orders & QC</span>
              </Link>
              <Link
                href="/compare"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4 text-emerald-300" />
                <span>Check Net Prices</span>
              </Link>
            </>
          )}

          {currentRole === "FARMER" && (
            <>
              <Link
                href="/farmer/listings/new"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4 text-slate-950" />
                <span>+ List New Produce Lot</span>
              </Link>
              <Link
                href="/farmer/offers"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                <span>View My Offers</span>
              </Link>
            </>
          )}

          {currentRole === "TRANSPORTER" && (
            <Link
              href="/transporter/jobs"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4 text-slate-950" />
              <span>Open Haulage Job Board</span>
            </Link>
          )}

          {currentRole === "FPO" && (
            <Link
              href="/fpo/dashboard"
              className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Pool Member Harvest</span>
            </Link>
          )}

          {currentRole === "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin Governance Desk</span>
            </Link>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by crop, variety, or farmer location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Produce Categories</option>
              <option value="Tomato">Tomatoes</option>
              <option value="Onion">Onions</option>
              <option value="Wheat">Wheat</option>
              <option value="Green Chilli">Green Chilli</option>
              <option value="Mango">Mangoes</option>
            </select>
          </div>

          <div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Quality Grades</option>
              <option value="GRADE_A">Grade A (Premium / Export)</option>
              <option value="GRADE_B">Grade B (Standard)</option>
              <option value="ORGANIC">Certified Organic</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Showing <strong>{filteredListings.length}</strong> active produce listings</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protection Enabled
          </span>
        </div>
      </div>

      {/* Produce Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            {/* Image Header */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img
                src={listing.imageUrl}
                alt={listing.cropName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                  {listing.cropName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm">
                  {listing.qualityGrade}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-xs ${getStatusBadgeClass(listing.status)}`}>
                  {listing.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/75 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs">
                <span className="font-semibold">Expected: {formatINR(listing.expectedPricePerUnit)}/Q</span>
                <span className="text-emerald-300 font-bold">{listing.quantity} {listing.unit}</span>
              </div>
            </div>

            {/* Listing Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{listing.variety}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Location:
                    </span>
                    <span className="font-semibold text-slate-800">{listing.locationName}, {listing.state}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Harvest Date:
                    </span>
                    <span className="font-semibold text-slate-800">{listing.harvestDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Farmer:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {listing.farmerName} ({listing.farmerRating}★)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleOpenOffer(listing)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>{currentRole === "BUYER" ? "Make Purchase Offer" : "Make Binding Offer"}</span>
                </button>

                <Link
                  href={`/compare?crop=${encodeURIComponent(listing.cropName)}&qty=${listing.quantity}`}
                  className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center transition-colors"
                  title="Check Net Realization"
                >
                  <Scale className="w-4 h-4 text-emerald-600" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buyer Make Offer Modal */}
      {showOfferModal && selectedListing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Make Buyer Offer</h3>
                <p className="text-xs text-slate-500">Direct to {selectedListing.farmerName}</p>
              </div>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {offerSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900">Offer Submitted Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your binding offer of {formatINR(offerPrice)}/Q for {offerQuantity} Quintals has been sent. Escrow funds will only be debited once the farmer accepts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitOffer} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{selectedListing.cropName} ({selectedListing.variety})</p>
                    <p className="text-slate-500">{selectedListing.locationName} • {selectedListing.qualityGrade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500">Expected Price</p>
                    <p className="font-bold text-emerald-700">{formatINR(selectedListing.expectedPricePerUnit)}/Q</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Offered Price (₹/Quintal)</label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-700 text-sm focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Quantity (Quintals)</label>
                    <input
                      type="number"
                      max={selectedListing.quantity}
                      min={1}
                      value={offerQuantity}
                      onChange={(e) => setOfferQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transport Responsibility</label>
                  <select
                    value={offerTransport}
                    onChange={(e) => setOfferTransport(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-slate-50"
                  >
                    <option value="BUYER_ARRANGES">Buyer Arranges Farmgate Pickup (Recommended)</option>
                    <option value="FARMER_ARRANGES">Farmer Delivers to Buyer Hub</option>
                    <option value="PLATFORM_TRANSPORTER">AgriLink Verified Transporter Network</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Security Terms</label>
                  <select
                    value={offerPayment}
                    onChange={(e) => setOfferPayment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-slate-50"
                  >
                    <option value="INSTANT_ESCROW">100% Instant Escrow (Released on Weighment)</option>
                    <option value="POST_INSPECTION_24H">24-Hour Post QC Inspection Transfer</option>
                    <option value="DELIVERY_50_50">50% Advance Escrow + 50% on Delivery</option>
                  </select>
                </div>

                {/* Offer Summary Callout */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">Total Contract Value:</span>
                  <span className="font-extrabold text-base text-emerald-800">
                    {formatINR(offerPrice * offerQuantity)}
                  </span>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowOfferModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-sm"
                  >
                    Lock & Submit Offer
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
