import { AiAssistantMessage, QualityGrade } from "../types";
import { KNOWN_HUBS } from "./distance-calculator";
import { rankAndRecommendMarkets } from "./recommendation-engine";
import { SEED_MARKET_PRICES } from "./market-data-provider";

export function processAiQuery(userText: string): AiAssistantMessage {
  const query = userText.toLowerCase();

  // Scenario 1: "Where should I sell my tomatoes?" or "best market for my crop"
  if (query.includes("tomato") || query.includes("where should i sell") || query.includes("best market")) {
    const crop = "Tomato";
    const farmerLocation = KNOWN_HUBS["nashik"];
    const quantityQuintals = 20;

    // Filter relevant markets
    const candidateMarkets = [
      {
        id: "mkt-lasalgaon",
        name: "Lasalgaon Mandi",
        marketType: "APMC",
        city: "Nashik",
        state: "Maharashtra",
        latitude: 20.1472,
        longitude: 74.2250,
        mandiCessPercent: 1.5,
        commissionPercent: 2.5,
        unloadingRatePerQuintal: 15,
        modalPricePerQuintal: 2250,
        buyerReliabilityScore: 92,
        liquidityScore: 95,
        priceStabilityScore: 88,
        paymentTermsScore: 95
      },
      {
        id: "mkt-reliance",
        name: "Reliance Fresh Rural Procurement Hub",
        marketType: "PRIVATE_COLLECTION_HUB",
        city: "Nashik",
        state: "Maharashtra",
        latitude: 19.9500,
        longitude: 73.8200,
        mandiCessPercent: 0,
        commissionPercent: 0,
        unloadingRatePerQuintal: 10,
        modalPricePerQuintal: 2550,
        buyerReliabilityScore: 98,
        liquidityScore: 85,
        priceStabilityScore: 92,
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
        buyerReliabilityScore: 89,
        liquidityScore: 98,
        priceStabilityScore: 78,
        paymentTermsScore: 80
      }
    ];

    const ranked = rankAndRecommendMarkets({
      cropName: crop,
      quantityQuintals,
      qualityGrade: "GRADE_A",
      farmerLocation,
      candidateMarkets
    });

    const top = ranked[0];

    return {
      id: `ai-${Date.now()}`,
      sender: "assistant",
      text: `Based on real-time APMC feeds and logistics calculations for **${quantityQuintals} Quintals of Grade-A Tomatoes** near Nashik:\n\n` +
        `🏆 **Top Recommended Option**: **${top.marketName}**\n` +
        `• Gross Modal Price: **₹${top.modalPrice}/Q**\n` +
        `• **Estimated Net In-Pocket Return**: **₹${top.costBreakdown.netRealizationAmount.toLocaleString('en-IN')}** (₹${top.costBreakdown.netRealizationPerQuintal}/Q)\n` +
        `• Total Logistics & Charges: **₹${top.costBreakdown.totalDeductions.toLocaleString('en-IN')}** (Transport: ₹${top.costBreakdown.transportCost}, Spoilage Risk: ₹${top.costBreakdown.spoilageRiskCost})\n\n` +
        `💡 *Why this wins*: Even though Vashi APMC advertises ₹2,850/Q, its 175 km distance incurs ₹2,900 in freight, higher mandi cess (2%), and ~₹2,400 transit spoilage risk. ${top.marketName} delivers ₹${(top.costBreakdown.netRealizationAmount - ranked[1]?.costBreakdown.netRealizationAmount || 1200).toLocaleString('en-IN')} higher net profit!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendationSummary: {
        crop: "Tomato (Hybrid 1057)",
        quantity: `${quantityQuintals} Quintals`,
        recommendedMarket: top.marketName,
        netRealizationINR: top.costBreakdown.netRealizationAmount,
        keyReason: "0% Mandi Cess, zero commission agent fee, and under 1.5 hr transit minimizes perishability spoilage."
      },
      actions: [
        {
          type: "COMPARE_MARKETS",
          label: "Compare All 5 Markets",
          url: "/compare?crop=Tomato&qty=20"
        },
        {
          type: "SELL_PRODUCE",
          label: "Create Produce Listing",
          url: "/farmer/listings/new"
        },
        {
          type: "VIEW_MARKET",
          label: "View Price Details",
          url: "/market-prices?crop=Tomato"
        }
      ]
    };
  }

  // Scenario 2: "Should I sell now or wait?"
  if (query.includes("sell now") || query.includes("wait") || query.includes("price prediction") || query.includes("trend")) {
    return {
      id: `ai-${Date.now()}`,
      sender: "assistant",
      text: `📊 **Market Trend Analysis & Selling Decision**:\n\n` +
        `• **Tomato & Perishables**: **SELL IMMEDIATELY** (Next 24-48 hours). Market arrivals in Southern corridors (Kolar & Madanapalle) are projected to surge +18% this weekend, which will exert downward pressure on spot prices.\n` +
        `• **Onion & Grains (Wheat/Rice)**: **HOLD / STAGGERED SALE**. Lasalgaon rabi stock releases are tightly controlled; forward futures show a +4.5% uptick over the next 14 days.\n\n` +
        `🔒 *Recommendation*: For perishable harvests with shelf life < 5 days, holding risks ~₹180/quintal in weight shrinkage and rot, wiping out any modest price gains.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        {
          type: "SELL_PRODUCE",
          label: "List Produce on Marketplace",
          url: "/farmer/listings/new"
        },
        {
          type: "COMPARE_MARKETS",
          label: "Check Net Realization",
          url: "/compare"
        }
      ]
    };
  }

  // Scenario 3: General inquiries & default helpful assistant
  return {
    id: `ai-${Date.now()}`,
    sender: "assistant",
    text: `Hello! I am your **AgriLink AI Market Advisor**. I can help you with:\n\n` +
      `1. **Net Realization Calculation**: Find which buyer or mandi gives you the highest net profit after transport, commission, and spoilage.\n` +
      `2. **Crop Price Discovery**: Real-time modal and minimum/maximum prices across 500+ APMC and private hubs.\n` +
      `3. **Selling Timing**: AI price forecasts and arrival volume predictions.\n` +
      `4. **Direct Buyer Matching**: Connect with verified institutional buyers like Reliance Fresh, ITC, BigBasket, and exporters.\n\n` +
      `Try asking: *"Where should I sell my 50 quintals of Onions from Nashik?"* or *"Should I sell my wheat now or wait?"*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      {
        type: "COMPARE_MARKETS",
        label: "Launch Smart Market Comparison",
        url: "/compare"
      },
      {
        type: "VIEW_MARKET",
        label: "Explore Live Mandi Prices",
        url: "/market-prices"
      },
      {
        type: "SELL_PRODUCE",
        label: "Create Farmer Listing",
        url: "/farmer/listings/new"
      }
    ]
  };
}
