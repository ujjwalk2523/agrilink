import { NextResponse } from "next/server";
import { rankAndRecommendMarkets } from "@/lib/services/recommendation-engine";
import { KNOWN_HUBS } from "@/lib/services/distance-calculator";
import { SEED_MARKET_PRICES } from "@/lib/services/market-data-provider";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cropName, variety, quantityQuintals, qualityGrade, locationKey, customMarkets } = body;

    const farmerLocation = KNOWN_HUBS[locationKey] || KNOWN_HUBS["nashik"];

    const candidateMarkets = customMarkets || [
      {
        id: "mkt-lasalgaon",
        name: "Lasalgaon Mandi",
        marketType: "APMC",
        city: "Lasalgaon",
        state: "Maharashtra",
        latitude: 20.1472,
        longitude: 74.2250,
        mandiCessPercent: 1.5,
        commissionPercent: 2.5,
        unloadingRatePerQuintal: 15,
        modalPricePerQuintal: 2250,
        buyerReliabilityScore: 92,
        liquidityScore: 96,
        priceStabilityScore: 88,
        paymentTermsScore: 90
      },
      {
        id: "mkt-reliance-nashik",
        name: "Reliance Fresh Rural Hub",
        marketType: "PRIVATE_COLLECTION_HUB",
        city: "Nashik",
        state: "Maharashtra",
        latitude: 19.9500,
        longitude: 73.8200,
        mandiCessPercent: 0.0,
        commissionPercent: 0.0,
        unloadingRatePerQuintal: 10,
        modalPricePerQuintal: 2550,
        buyerReliabilityScore: 98,
        liquidityScore: 88,
        priceStabilityScore: 94,
        paymentTermsScore: 100
      },
      {
        id: "mkt-vashi",
        name: "Vashi APMC (Navi Mumbai)",
        marketType: "APMC",
        city: "Navi Mumbai",
        state: "Maharashtra",
        latitude: 19.0760,
        longitude: 72.8777,
        mandiCessPercent: 2.0,
        commissionPercent: 4.0,
        unloadingRatePerQuintal: 20,
        modalPricePerQuintal: 2850,
        buyerReliabilityScore: 86,
        liquidityScore: 98,
        priceStabilityScore: 76,
        paymentTermsScore: 80
      }
    ];

    const results = rankAndRecommendMarkets({
      cropName: cropName || "Tomato",
      variety: variety || "Hybrid 1057",
      quantityQuintals: quantityQuintals || 20,
      qualityGrade: qualityGrade || "GRADE_A",
      farmerLocation,
      candidateMarkets
    });

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to calculate market recommendations" },
      { status: 400 }
    );
  }
}
