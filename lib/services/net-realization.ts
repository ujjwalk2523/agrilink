import { CostDeductions, NetRealizationInput } from "../types";
import { calculateRoadDistanceKm, estimateTransitHours } from "./distance-calculator";

// Default crop perishability and shelf life reference
export const CROP_PERISHABILITY_METRICS: Record<string, { perishabilityIndex: number; shelfLifeHours: number }> = {
  "tomato": { perishabilityIndex: 0.75, shelfLifeHours: 72 },
  "onion": { perishabilityIndex: 0.20, shelfLifeHours: 720 },
  "potato": { perishabilityIndex: 0.15, shelfLifeHours: 960 },
  "wheat": { perishabilityIndex: 0.03, shelfLifeHours: 8760 },
  "rice": { perishabilityIndex: 0.03, shelfLifeHours: 8760 },
  "basmati rice": { perishabilityIndex: 0.03, shelfLifeHours: 8760 },
  "mango": { perishabilityIndex: 0.65, shelfLifeHours: 96 },
  "green chilli": { perishabilityIndex: 0.55, shelfLifeHours: 120 },
  "soybean": { perishabilityIndex: 0.05, shelfLifeHours: 4320 },
  "cotton": { perishabilityIndex: 0.02, shelfLifeHours: 8760 },
  "mustard": { perishabilityIndex: 0.04, shelfLifeHours: 4320 },
  "capsicum": { perishabilityIndex: 0.70, shelfLifeHours: 96 }
};

/**
 * Pure calculation engine for net realization of agricultural produce
 */
export function calculateNetRealization(input: NetRealizationInput): CostDeductions {
  const {
    cropName,
    quantityQuintals,
    farmerLocation,
    destinationMarket,
    customTransportRatePerKmPerTon
  } = input;

  // 1. Distance & Transit
  const distanceKm = calculateRoadDistanceKm(
    farmerLocation.latitude,
    farmerLocation.longitude,
    destinationMarket.latitude,
    destinationMarket.longitude
  );
  const transitHours = estimateTransitHours(distanceKm);

  // 2. Gross Selling Value
  const grossSellingValue = destinationMarket.modalPricePerQuintal * quantityQuintals;

  // 3. Transport Cost
  // 1 Metric Ton = 10 Quintals
  const weightTons = Math.max(quantityQuintals / 10, 0.5);
  const baseBookingFee = 450; // INR base terminal/fuel dispatch fee
  const ratePerKmPerTon = customTransportRatePerKmPerTon || 3.8; // INR per km per metric ton
  const rawTransport = baseBookingFee + (distanceKm * ratePerKmPerTon * weightTons);
  // Cap minimum transport according to commercial tempo/mini-truck minimum fare
  const transportCost = Math.round(Math.max(rawTransport, 800));

  // 4. Market Charges (Mandi Cess / APMC tax)
  const mandiCessPercent = destinationMarket.mandiCessPercent || 0;
  const marketChargesMandiCess = Math.round((grossSellingValue * mandiCessPercent) / 100);

  // 5. Commission Agent Fee (Aadath)
  const commissionPercent = destinationMarket.commissionPercent || 0;
  const commissionAgentFee = Math.round((grossSellingValue * commissionPercent) / 100);

  // 6. Loading & Unloading / Bagging / Porter charges
  const unloadingRate = destinationMarket.unloadingRatePerQuintal || 15;
  const unloadingHandlingCost = Math.round(unloadingRate * quantityQuintals);

  // 7. Estimated Spoilage Cost
  const cropKey = cropName.toLowerCase().trim();
  const perishMetrics = CROP_PERISHABILITY_METRICS[cropKey] || {
    perishabilityIndex: input.perishabilityIndex ?? 0.35,
    shelfLifeHours: input.shelfLifeHours ?? 168
  };

  // Spoilage increases with longer transit distance and higher perishability
  const perishFactor = perishMetrics.perishabilityIndex;
  // Spoilage percentage curve: baseline 0.5% + transit time penalty
  const spoilageRate = Math.min(
    0.18, // Max 18% spoilage ceiling for extreme distances
    perishFactor * (0.008 + (transitHours / perishMetrics.shelfLifeHours) * 0.4)
  );
  const spoilageRiskCost = Math.round(grossSellingValue * spoilageRate);

  // 8. Total Deductions & Net Realization
  const totalDeductions =
    transportCost +
    marketChargesMandiCess +
    commissionAgentFee +
    unloadingHandlingCost +
    spoilageRiskCost;

  const netRealizationAmount = Math.max(0, grossSellingValue - totalDeductions);
  const netRealizationPerQuintal = Math.round((netRealizationAmount / quantityQuintals) * 100) / 100;
  const netMarginPercentage = Math.round((netRealizationAmount / grossSellingValue) * 1000) / 10;

  return {
    grossSellingValue,
    distanceKm,
    estimatedTransitHours: transitHours,
    transportCost,
    marketChargesMandiCess,
    commissionAgentFee,
    unloadingHandlingCost,
    spoilageRiskCost,
    totalDeductions,
    netRealizationAmount,
    netRealizationPerQuintal,
    netMarginPercentage
  };
}
