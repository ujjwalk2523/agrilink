import { NextRequest, NextResponse } from "next/server";
import { MOCK_OFFERS, MockOffer } from "@/lib/mock-data/seed-data";

let activeOffers: MockOffer[] = [...MOCK_OFFERS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get("listingId");
    const buyerId = searchParams.get("buyerId");
    const status = searchParams.get("status");

    let filtered = [...activeOffers];

    if (listingId) {
      filtered = filtered.filter((o) => o.listingId === listingId);
    }

    if (buyerId) {
      filtered = filtered.filter((o) => o.buyerId === buyerId);
    }

    if (status && status !== "ALL") {
      filtered = filtered.filter((o) => o.status === status);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      listingId,
      listingCrop = "Tomato",
      listingQuantity = 20,
      buyerId = "usr-buyer-1",
      buyerName = "Aditya Agro Corp",
      buyerType = "Corporate Retail Buyer",
      buyerRating = 4.95,
      buyerReliabilityScore = 98.4,
      offeredPricePerUnit,
      quantity,
      pickupDate,
      paymentTerms = "INSTANT_ESCROW",
      transportResponsibility = "BUYER_ARRANGES",
      notes = "",
    } = body;

    if (!listingId || !offeredPricePerUnit || !quantity) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (listingId, offeredPricePerUnit, quantity)" },
        { status: 400 }
      );
    }

    const price = Number(offeredPricePerUnit);
    const qty = Number(quantity);
    const gross = price * qty;
    const transportEst = transportResponsibility === "BUYER_ARRANGES" ? 0 : 2500;
    const netEst = gross - transportEst - (transportResponsibility === "BUYER_ARRANGES" ? 0 : gross * 0.04);

    const paymentTermLabels: Record<string, string> = {
      INSTANT_ESCROW: "100% Escrow Deposited (Instant Bank Release on weighment)",
      POST_INSPECTION_24H: "Bank Transfer 24 Hours Post QC Inspection",
      DELIVERY_50_50: "50% Advance Escrow + 50% on Delivery",
      CREDIT_7_DAYS: "7-Day Commercial Credit Slip",
    };

    const newOffer: MockOffer = {
      id: `off-${Date.now()}`,
      listingId,
      listingCrop,
      listingQuantity: Number(listingQuantity),
      buyerId,
      buyerName,
      buyerType,
      buyerRating,
      buyerReliabilityScore,
      offeredPricePerUnit: price,
      quantity: qty,
      pickupDate: pickupDate || new Date().toISOString().split("T")[0],
      paymentTerms,
      paymentTermLabel: paymentTermLabels[paymentTerms] || "Instant Escrow",
      transportResponsibility,
      notes: notes || "Binding offer with full escrow deposit in AgriLink vault.",
      status: "PENDING",
      isTopRecommended: transportResponsibility === "BUYER_ARRANGES",
      recommendationExplanation: `Direct offer of ₹${price}/Q for ${qty} Quintals. ${transportResponsibility === "BUYER_ARRANGES" ? "Zero freight deduction yields high net realization." : "Farmer arranges transport."}`,
      estimatedGrossINR: gross,
      estimatedTransportINR: transportEst,
      estimatedNetINR: Math.round(netEst),
      createdAt: "Just now",
      history: [
        {
          sender: buyerName,
          text: `Submitted offer for ${qty} Q @ ₹${price}/Q with ${transportResponsibility === "BUYER_ARRANGES" ? "Buyer Pickup" : "Farmer Delivery"}.`,
          time: "Just now",
          price,
        },
      ],
    };

    activeOffers.unshift(newOffer);

    return NextResponse.json({
      success: true,
      message: "Purchase offer submitted successfully with escrow guarantee",
      data: newOffer,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit offer" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { offerId, action, counterPrice, message } = body;

    if (!offerId || !action) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (offerId, action)" },
        { status: 400 }
      );
    }

    const offerIndex = activeOffers.findIndex((o) => o.id === offerId);
    if (offerIndex === -1) {
      return NextResponse.json(
        { success: false, error: `Offer with ID ${offerId} not found` },
        { status: 404 }
      );
    }

    const offer = activeOffers[offerIndex];

    if (action === "COUNTER") {
      const newPrice = Number(counterPrice) || offer.offeredPricePerUnit;
      offer.status = "COUNTERED";
      offer.counterPricePerUnit = newPrice;
      offer.history.push({
        sender: "Farmer (Ramesh Patil)",
        text: message || `Counter-offered revised price of ₹${newPrice}/Quintal.`,
        time: "Just now",
        price: newPrice,
      });

      return NextResponse.json({
        success: true,
        message: `Counter-offer of ₹${newPrice}/Q sent to ${offer.buyerName}`,
        data: offer,
      });
    } else if (action === "ACCEPT") {
      offer.status = "ACCEPTED";
      offer.history.push({
        sender: "Farmer (Ramesh Patil)",
        text: "Deal Accepted! Escrow locked and transport scheduled.",
        time: "Just now",
      });

      // Generate confirmed order summary
      const confirmedOrder = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        offerId: offer.id,
        listingId: offer.listingId,
        buyerName: offer.buyerName,
        crop: offer.listingCrop,
        quantity: offer.quantity,
        finalPricePerUnit: offer.counterPricePerUnit || offer.offeredPricePerUnit,
        totalAmount: (offer.counterPricePerUnit || offer.offeredPricePerUnit) * offer.quantity,
        escrowStatus: "LOCKED_IN_VAULT",
        pickupDate: offer.pickupDate,
        trackingStatus: "PICKUP_SCHEDULED",
      };

      return NextResponse.json({
        success: true,
        message: "Deal successfully accepted! Confirmed order generated and escrow locked.",
        data: {
          offer,
          order: confirmedOrder,
        },
      });
    } else if (action === "REJECT") {
      offer.status = "REJECTED";
      offer.history.push({
        sender: "Farmer (Ramesh Patil)",
        text: message || "Offer rejected.",
        time: "Just now",
      });

      return NextResponse.json({
        success: true,
        message: "Offer rejected",
        data: offer,
      });
    }

    return NextResponse.json(
      { success: false, error: `Invalid action '${action}'` },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update offer" },
      { status: 500 }
    );
  }
}
