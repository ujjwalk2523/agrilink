import { GeoLocation, QualityGrade, RankedMarketOption } from "../types";
import { calculateNetRealization } from "./net-realization";

export interface CandidateMarket {
  id: string;
  name: string;
  marketType: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  mandiCessPercent: number;
  commissionPercent: number;
  unloadingRatePerQuintal: number;
  modalPricePerQuintal: number;
  minPricePerQuintal?: number;
  maxPricePerQuintal?: number;
  buyerReliabilityScore?: number; // 0 - 100
  liquidityScore?: number;        // 0 - 100
  priceStabilityScore?: number;   // 0 - 100
  paymentTermsScore?: number;     // 0 - 100
  paymentTermLabel?: string;
  buyerName?: string;
}

export interface RecommendationRequest {
  cropName: string;
  variety?: string;
  quantityQuintals: number;
  qualityGrade: QualityGrade;
  farmerLocation: GeoLocation;
  candidateMarkets: CandidateMarket[];
}

export function rankAndRecommendMarkets(request: RecommendationRequest): RankedMarketOption[] {
  const { cropName, variety, quantityQuintals, qualityGrade, farmerLocation, candidateMarkets } = request;

  if (!candidateMarkets || candidateMarkets.length === 0) {
    return [];
  }

  // 1. Calculate net realization for each candidate market
  const calculatedList = candidateMarkets.map(market => {
    const costBreakdown = calculateNetRealization({
      cropName,
      variety,
      quantityQuintals,
      qualityGrade,
      farmerLocation,
      destinationMarket: market
    });

    return {
      market,
      costBreakdown
    };
  });

  // Find max net realization to normalize the 40% net realization component
  const maxNetRealization = Math.max(...calculatedList.map(item => item.costBreakdown.netRealizationAmount), 1);
  const minDistance = Math.min(...calculatedList.map(item => item.costBreakdown.distanceKm));

  // 2. Score each market based on transparent 6-factor weightings
  const scoredList = calculatedList.map(item => {
    const { market, costBreakdown } = item;

    // Component 1: Net Realization (40%)
    const netRatio = Math.max(0, costBreakdown.netRealizationAmount / maxNetRealization);
    const netScore = Math.min(100, Math.round(netRatio * 100));

    // Component 2: Distance / Proximity (20%)
    // Markets within 40km get 95-100, 100km get ~85, 300km get ~60, 600km+ drop to ~30
    let distanceScore = 100 - (costBreakdown.distanceKm * 0.12);
    if (distanceScore < 20) distanceScore = 20;
    distanceScore = Math.round(Math.min(100, distanceScore));

    // Component 3: Buyer & Market Reliability (15%)
    const buyerReliability = market.buyerReliabilityScore ?? 88;

    // Component 4: Payment Terms & Security (10%)
    const paymentTerms = market.paymentTermsScore ?? 90;

    // Component 5: Market Demand & Liquidity (10%)
    const marketDemand = market.liquidityScore ?? 85;

    // Component 6: Price Stability (5%)
    const priceStability = market.priceStabilityScore ?? 82;

    // Composite Weighted Score
    const compositeScore = Math.round(
      (netScore * 0.40) +
      (distanceScore * 0.20) +
      (buyerReliability * 0.15) +
      (paymentTerms * 0.10) +
      (marketDemand * 0.10) +
      (priceStability * 0.05)
    );

    const scoring = {
      netRealizationScore: netScore,
      distanceScore,
      buyerReliabilityScore: buyerReliability,
      paymentTermsScore: paymentTerms,
      marketDemandScore: marketDemand,
      priceStabilityScore: priceStability,
      totalCompositeScore: compositeScore
    };

    return {
      market,
      costBreakdown,
      scoring
    };
  });

  // 3. Sort descending by composite score
  scoredList.sort((a, b) => b.scoring.totalCompositeScore - a.scoring.totalCompositeScore);

  // 4. Generate natural language reasoning, pros, cons, and badges
  const rankedOptions: RankedMarketOption[] = scoredList.map((item, index) => {
    const { market, costBreakdown, scoring } = item;
    const rank = index + 1;
    const isTop = rank === 1;

    const pros: string[] = [];
    const cons: string[] = [];

    // Evaluate pros
    if (costBreakdown.netRealizationAmount >= maxNetRealization * 0.98) {
      pros.push(`Delivers the highest net in-pocket realization (₹${costBreakdown.netRealizationAmount.toLocaleString('en-IN')})`);
    }
    if (costBreakdown.distanceKm <= 50) {
      pros.push(`Short transit distance (${costBreakdown.distanceKm} km) minimizes spoilage and transit delays`);
    }
    if (market.mandiCessPercent === 0) {
      pros.push("Direct corporate procurement: 0% Mandi Cess & 0% Agent commission fees");
    }
    if (market.commissionPercent <= 1.5 && market.commissionPercent > 0) {
      pros.push(`Low commission fee of ${market.commissionPercent}%`);
    }
    if (scoring.paymentTermsScore >= 95) {
      pros.push("Guaranteed escrow / instant bank transfer upon weighment");
    }
    if (scoring.marketDemandScore >= 90) {
      pros.push("High daily trade liquidity ensures fast produce clearance");
    }

    // Evaluate cons
    if (costBreakdown.distanceKm > 200) {
      cons.push(`Long transport haul (${costBreakdown.distanceKm} km) incurs ₹${costBreakdown.transportCost.toLocaleString('en-IN')} freight cost`);
    }
    if (costBreakdown.spoilageRiskCost > (costBreakdown.grossSellingValue * 0.04)) {
      cons.push(`High spoilage risk (est. ₹${costBreakdown.spoilageRiskCost.toLocaleString('en-IN')}) due to transit duration`);
    }
    if (market.commissionPercent >= 4.0) {
      cons.push(`Higher intermediary commission rate of ${market.commissionPercent}%`);
    }
    if (scoring.paymentTermsScore < 70) {
      cons.push("Deferred 7-day payment settlement cycle");
    }

    // Assign key badge
    let keyBadge: RankedMarketOption["keyBadge"];
    if (costBreakdown.netRealizationAmount === maxNetRealization) {
      keyBadge = "HIGHEST_NET_RETURN";
    } else if (costBreakdown.distanceKm === minDistance) {
      keyBadge = "FASTEST_TRANSIT";
    } else if (scoring.buyerReliabilityScore >= 95) {
      keyBadge = "MOST_RELIABLE";
    } else if (costBreakdown.spoilageRiskCost < 300) {
      keyBadge = "LOWEST_SPOILAGE";
    }

    // Generate comprehensive explanation
    let recommendationReason = "";
    if (isTop) {
      recommendationReason = `Top Choice: Although headline mandi price is ₹${market.modalPricePerQuintal}/Q, after deducting ₹${costBreakdown.transportCost.toLocaleString('en-IN')} transport, ₹${(costBreakdown.marketChargesMandiCess + costBreakdown.commissionAgentFee).toLocaleString('en-IN')} market charges, and ₹${costBreakdown.spoilageRiskCost.toLocaleString('en-IN')} spoilage risk, you achieve the highest net realization of ₹${costBreakdown.netRealizationAmount.toLocaleString('en-IN')} (₹${costBreakdown.netRealizationPerQuintal}/Q) with an overall score of ${scoring.totalCompositeScore}/100.`;
    } else if (rank === 2) {
      recommendationReason = `Strong Second Option: Offers competitive net return of ₹${costBreakdown.netRealizationAmount.toLocaleString('en-IN')}. Good backup if primary market arrivals exceed daily demand quota.`;
    } else {
      recommendationReason = `Rank #${rank}: Offers ₹${market.modalPricePerQuintal}/Q modal price, but higher logistics and market charges reduce net return to ₹${costBreakdown.netRealizationAmount.toLocaleString('en-IN')} (${costBreakdown.netMarginPercentage}% net margin).`;
    }

    return {
      rank,
      marketId: market.id,
      marketName: market.name,
      marketType: market.marketType,
      location: `${market.city}, ${market.state}`,
      distanceKm: costBreakdown.distanceKm,
      modalPrice: market.modalPricePerQuintal,
      costBreakdown,
      scoring,
      isRecommended: rank <= 3,
      recommendationReason,
      pros: pros.slice(0, 3),
      cons: cons.slice(0, 2),
      keyBadge
    };
  });

  return rankedOptions;
}
