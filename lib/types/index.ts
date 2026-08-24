export type UserRole = "FARMER" | "BUYER" | "TRANSPORTER" | "FPO" | "ADMIN";

export type QualityGrade = "GRADE_A" | "GRADE_B" | "GRADE_C" | "ORGANIC";

export type ListingStatus = 
  | "DRAFT"
  | "ACTIVE"
  | "HAS_OFFERS"
  | "NEGOTIATING"
  | "SOLD"
  | "COMPLETED"
  | "CANCELLED";

export type OfferStatus = 
  | "PENDING"
  | "COUNTERED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED"
  | "TRANSPORT_PENDING"
  | "PICKUP_SCHEDULED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "QUALITY_CHECK"
  | "PAYMENT_PENDING"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

export type TransportResponsibility = 
  | "BUYER_ARRANGES"
  | "FARMER_ARRANGES"
  | "PLATFORM_TRANSPORTER";

export type PaymentTerms = 
  | "INSTANT_ESCROW"
  | "DELIVERY_50_50"
  | "POST_INSPECTION_24H"
  | "CREDIT_7_DAYS";

export interface GeoLocation {
  name: string;
  state: string;
  district?: string;
  city?: string;
  latitude: number;
  longitude: number;
}

export interface NetRealizationInput {
  cropName: string;
  variety?: string;
  quantityQuintals: number;
  qualityGrade: QualityGrade;
  farmerLocation: GeoLocation;
  destinationMarket: {
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
    buyerReliabilityScore?: number;
    liquidityScore?: number;
    priceStabilityScore?: number;
    paymentTermsScore?: number;
  };
  customTransportRatePerKmPerTon?: number;
  perishabilityIndex?: number; // 0.1 - 0.9
  shelfLifeHours?: number;
}

export interface CostDeductions {
  grossSellingValue: number;
  distanceKm: number;
  estimatedTransitHours: number;
  transportCost: number;
  marketChargesMandiCess: number;
  commissionAgentFee: number;
  unloadingHandlingCost: number;
  spoilageRiskCost: number;
  totalDeductions: number;
  netRealizationAmount: number;
  netRealizationPerQuintal: number;
  netMarginPercentage: number;
}

export interface MarketScoreFactors {
  netRealizationScore: number; // 40%
  distanceScore: number;       // 20%
  buyerReliabilityScore: number; // 15%
  paymentTermsScore: number;   // 10%
  marketDemandScore: number;   // 10%
  priceStabilityScore: number; // 5%
  totalCompositeScore: number; // 0 - 100
}

export interface RankedMarketOption {
  rank: number;
  marketId: string;
  marketName: string;
  marketType: string;
  location: string;
  distanceKm: number;
  modalPrice: number;
  costBreakdown: CostDeductions;
  scoring: MarketScoreFactors;
  isRecommended: boolean;
  recommendationReason: string;
  pros: string[];
  cons: string[];
  keyBadge?: "HIGHEST_NET_RETURN" | "FASTEST_TRANSIT" | "LOWEST_SPOILAGE" | "MOST_RELIABLE";
}

export interface AiActionCard {
  type: "VIEW_MARKET" | "VIEW_OFFER" | "SELL_PRODUCE" | "COMPARE_MARKETS" | "TRACK_ORDER";
  label: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface AiAssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  recommendationSummary?: {
    crop: string;
    quantity: string;
    recommendedMarket: string;
    netRealizationINR: number;
    keyReason: string;
  };
  actions?: AiActionCard[];
}
