export interface UserProfile {
  id: string;
  name: string;
  role: "FARMER" | "BUYER" | "TRANSPORTER" | "FPO" | "ADMIN";
  avatar: string;
  email: string;
  phone: string;
  location: string;
  coordinates: { lat: number; lng: number };
  verified: boolean;
  rating: number;
  badge?: string;
  details: Record<string, any>;
}

export const MOCK_USERS: Record<string, UserProfile> = {
  FARMER: {
    id: "usr-farmer-1",
    name: "Ramesh Kisan Patil",
    role: "FARMER",
    avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80",
    email: "ramesh.patil@agrilink.in",
    phone: "+91 98231 45678",
    location: "Dindori, Nashik, Maharashtra",
    coordinates: { lat: 20.1982, lng: 73.8344 },
    verified: true,
    rating: 4.9,
    badge: "Verified Progressive Farmer",
    details: {
      totalLandAcres: 14.5,
      irrigation: "Drip Irrigation & Farm Pond",
      primaryCrops: ["Tomato (Hybrid)", "Onion (Rabi)", "Grapes"],
      kccStatus: "Kisan Credit Card Active",
      fpoAffiliation: "Sahyadri Farmers Producer Co."
    }
  },
  BUYER: {
    id: "usr-buyer-1",
    name: "Aditya Agro Corp (Reliance Fresh Hub)",
    role: "BUYER",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    email: "procurement@reliancefresh-agro.com",
    phone: "+91 22 6789 1234",
    location: "Vashi Hub, Navi Mumbai, Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    verified: true,
    rating: 4.95,
    badge: "Enterprise Verified Buyer",
    details: {
      businessType: "Corporate Retail & Institutional Procurement",
      gstNumber: "27AABCR1234F1Z9",
      creditRating: 4.9,
      reliabilityScore: 98.4,
      settlementCycle: "Instant Escrow / T+0 Settlement",
      monthlyProcurementVolume: "2,500 Metric Tons"
    }
  },
  TRANSPORTER: {
    id: "usr-transporter-1",
    name: "Gurukripa Cold Chain & Logistics",
    role: "TRANSPORTER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "dispatch@gurukripalogistics.in",
    phone: "+91 98901 77665",
    location: "Pune Express Hub, Maharashtra",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    verified: true,
    rating: 4.8,
    badge: "Certified Reefer Transporter",
    details: {
      fleetSize: 8,
      activeVehicles: [
        { id: "veh-1", name: "14-Ft Eicher Pro (4 MT Reefer)", reg: "MH-12-QE-4501", status: "In Transit", temp: "14°C" },
        { id: "veh-2", name: "Tata 1109 Open Truck (6 MT)", reg: "MH-15-AB-8822", status: "Available" },
        { id: "veh-3", name: "Tata Ace Mega (1.2 MT Mini)", reg: "MH-15-CK-1092", status: "Available" }
      ],
      ratePerKmPerTon: 3.6,
      operatingRadius: "500 km across Maharashtra, Gujarat & MP"
    }
  },
  FPO: {
    id: "usr-fpo-1",
    name: "Sahyadri Farmers Producer Co. Ltd.",
    role: "FPO",
    avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80",
    email: "info@sahyadrifpo.org",
    phone: "+91 253 250 9988",
    location: "Mohadi, Nashik, Maharashtra",
    coordinates: { lat: 20.0800, lng: 73.9100 },
    verified: true,
    rating: 4.9,
    badge: "Govt. Registered FPO (NABARD / SFAC)",
    details: {
      memberCount: 480,
      activeAggregationBatches: 3,
      totalAggregatedVolumeMT: 340,
      collectiveTurnoverFY: "₹8.4 Crores",
      coldStorageCapacity: "2,000 MT CA Storage Facility"
    }
  },
  ADMIN: {
    id: "usr-admin-1",
    name: "AgriLink Intelligence Admin",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    email: "admin@agrilink.gov.in",
    phone: "+91 11 2338 5544",
    location: "AgriTech Center, New Delhi",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    verified: true,
    rating: 5.0,
    badge: "Platform Supervisor",
    details: {
      monitoredMandis: 450,
      activePriceSyncProviders: ["Agmarknet Live", "eNAM Central", "MSAMB Direct"],
      pendingKycApprovals: 4,
      disputeCases: 1
    }
  }
};

export interface MockListing {
  id: string;
  cropName: string;
  variety: string;
  category: string;
  quantity: number;
  unit: string;
  qualityGrade: "GRADE_A" | "GRADE_B" | "GRADE_C" | "ORGANIC";
  expectedPricePerUnit: number;
  minimumAcceptablePrice: number;
  locationName: string;
  state: string;
  latitude: number;
  longitude: number;
  harvestDate: string;
  status: "ACTIVE" | "HAS_OFFERS" | "NEGOTIATING" | "SOLD" | "COMPLETED";
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  imageUrl: string;
  description: string;
  offersCount: number;
  createdAt: string;
}

export const MOCK_PRODUCE_LISTINGS: MockListing[] = [
  {
    id: "lst-101",
    cropName: "Tomato",
    variety: "Hybrid 1057 (Firm & Red)",
    category: "Vegetables",
    quantity: 20,
    unit: "Quintal",
    qualityGrade: "GRADE_A",
    expectedPricePerUnit: 2500,
    minimumAcceptablePrice: 2200,
    locationName: "Dindori, Nashik",
    state: "Maharashtra",
    latitude: 20.1982,
    longitude: 73.8344,
    harvestDate: "2026-08-25",
    status: "HAS_OFFERS",
    farmerName: "Ramesh Kisan Patil",
    farmerPhone: "+91 98231 45678",
    farmerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80",
    description: "Export-quality greenhouse hybrid tomatoes, firm texture, uniform 60-70mm grading. Plucked at breaker stage with 6-day shelf life. Packed in 25kg standard plastic crates.",
    offersCount: 3,
    createdAt: "Today, 07:30 AM"
  },
  {
    id: "lst-102",
    cropName: "Onion",
    variety: "Nasik Red (Gavran Rabi Stock)",
    category: "Vegetables",
    quantity: 50,
    unit: "Quintal",
    qualityGrade: "GRADE_A",
    expectedPricePerUnit: 2400,
    minimumAcceptablePrice: 2150,
    locationName: "Lasalgaon, Nashik",
    state: "Maharashtra",
    latitude: 20.1472,
    longitude: 74.2250,
    harvestDate: "2026-08-20",
    status: "ACTIVE",
    farmerName: "Ramesh Kisan Patil",
    farmerPhone: "+91 98231 45678",
    farmerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80",
    description: "Well-cured, double-skin medium-to-large size (45mm+) Nasik Red onions. Low moisture content, ideal for transport and storage up to 30 days.",
    offersCount: 1,
    createdAt: "Yesterday"
  },
  {
    id: "lst-103",
    cropName: "Wheat",
    variety: "Sharbati Gold (Sehore)",
    category: "Grains",
    quantity: 100,
    unit: "Quintal",
    qualityGrade: "GRADE_A",
    expectedPricePerUnit: 3250,
    minimumAcceptablePrice: 3000,
    locationName: "Sehore / Indore",
    state: "Madhya Pradesh",
    latitude: 22.7196,
    longitude: 75.8577,
    harvestDate: "2026-08-10",
    status: "ACTIVE",
    farmerName: "Suresh Meena",
    farmerPhone: "+91 94250 11223",
    farmerRating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80",
    description: "Premium Sharbati wheat grains, golden lustrous color, high protein and gluten value. Cleaned, destoned and packed in 50kg jute bags.",
    offersCount: 2,
    createdAt: "2 days ago"
  },
  {
    id: "lst-104",
    cropName: "Green Chilli",
    variety: "Guntur Teja (Hot Pungency)",
    category: "Spices",
    quantity: 15,
    unit: "Quintal",
    qualityGrade: "GRADE_A",
    expectedPricePerUnit: 8600,
    minimumAcceptablePrice: 8000,
    locationName: "Guntur Rural",
    state: "Andhra Pradesh",
    latitude: 16.3067,
    longitude: 80.4365,
    harvestDate: "2026-08-23",
    status: "ACTIVE",
    farmerName: "Venkat Rao",
    farmerPhone: "+91 98480 33445",
    farmerRating: 4.95,
    imageUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80",
    description: "Freshly plucked bright green chillies with high SHU heat level. Sorted and aerated packaging in ventilated mesh bags.",
    offersCount: 0,
    createdAt: "3 days ago"
  },
  {
    id: "lst-105",
    cropName: "Mango",
    variety: "Alphonso (Hapus Certified)",
    category: "Fruits",
    quantity: 30,
    unit: "Quintal",
    qualityGrade: "ORGANIC",
    expectedPricePerUnit: 9800,
    minimumAcceptablePrice: 9000,
    locationName: "Ratnagiri Coastal Orchards",
    state: "Maharashtra",
    latitude: 16.9902,
    longitude: 73.3120,
    harvestDate: "2026-08-24",
    status: "ACTIVE",
    farmerName: "Ganesh Kadam",
    farmerPhone: "+91 94220 88990",
    farmerRating: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80",
    description: "Naturally ripened GI-tagged Devgad/Ratnagiri Alphonso mangoes. Chemical-free organic certification, 250g+ fruit weight.",
    offersCount: 1,
    createdAt: "4 days ago"
  }
];

export interface MockOffer {
  id: string;
  listingId: string;
  listingCrop: string;
  listingQuantity: number;
  buyerId: string;
  buyerName: string;
  buyerType: string;
  buyerRating: number;
  buyerReliabilityScore: number;
  offeredPricePerUnit: number;
  quantity: number;
  pickupDate: string;
  paymentTerms: "INSTANT_ESCROW" | "DELIVERY_50_50" | "POST_INSPECTION_24H" | "CREDIT_7_DAYS";
  paymentTermLabel: string;
  transportResponsibility: "BUYER_ARRANGES" | "FARMER_ARRANGES" | "PLATFORM_TRANSPORTER";
  notes: string;
  counterPricePerUnit?: number;
  status: "PENDING" | "COUNTERED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  isTopRecommended: boolean;
  recommendationExplanation: string;
  estimatedGrossINR: number;
  estimatedTransportINR: number;
  estimatedNetINR: number;
  createdAt: string;
  history: Array<{ sender: string; text: string; time: string; price?: number }>;
}

export const MOCK_OFFERS: MockOffer[] = [
  {
    id: "off-101",
    listingId: "lst-101",
    listingCrop: "Tomato (Hybrid 1057)",
    listingQuantity: 20,
    buyerId: "usr-buyer-1",
    buyerName: "Reliance Fresh Rural Procurement Hub",
    buyerType: "Direct Corporate Collection",
    buyerRating: 4.95,
    buyerReliabilityScore: 98.4,
    offeredPricePerUnit: 2550,
    quantity: 20,
    pickupDate: "2026-08-25",
    paymentTerms: "INSTANT_ESCROW",
    paymentTermLabel: "100% Escrow Deposited (Instant Bank Release upon weighment)",
    transportResponsibility: "BUYER_ARRANGES",
    notes: "Direct farmgate pickup with crate replacement. 0% Mandi Cess and 0% Commission agent deduction. Payment escrow already funded in AgriLink vault.",
    status: "PENDING",
    isTopRecommended: true,
    recommendationExplanation: "Recommended #1: Zero transport cost (Buyer Arranges) and 0% mandi charges yield the highest net cash-in-hand (₹48,600) with 98.4% institutional reliability!",
    estimatedGrossINR: 51000,
    estimatedTransportINR: 0,
    estimatedNetINR: 48600,
    createdAt: "20 mins ago",
    history: [
      { sender: "Reliance Fresh Procurement", text: "Offer submitted for 20 Quintals @ ₹2,550/Q with farmgate pickup.", time: "20 mins ago", price: 2550 }
    ]
  },
  {
    id: "off-102",
    listingId: "lst-101",
    listingCrop: "Tomato (Hybrid 1057)",
    listingQuantity: 20,
    buyerId: "usr-buyer-2",
    buyerName: "Metro Cash & Carry Wholesale (Pune Hub)",
    buyerType: "Wholesale Aggregator",
    buyerRating: 4.7,
    buyerReliabilityScore: 91.0,
    offeredPricePerUnit: 2620,
    quantity: 20,
    pickupDate: "2026-08-26",
    paymentTerms: "POST_INSPECTION_24H",
    paymentTermLabel: "Bank Transfer 24 Hours Post QC Inspection",
    transportResponsibility: "FARMER_ARRANGES",
    notes: "Deliver to Pune Gultekdi hub. Farmer responsible for transport freight and loading.",
    status: "PENDING",
    isTopRecommended: false,
    recommendationExplanation: "Deceptive Headline Price: Although offering ₹2,620/Q (₹70 higher), requiring Farmer to arrange Pune freight (-₹2,800) and APMC cess (-₹1,050) reduces net realization to ₹45,200 (₹3,400 LESS than Offer #1).",
    estimatedGrossINR: 52400,
    estimatedTransportINR: 2800,
    estimatedNetINR: 45200,
    createdAt: "1 hour ago",
    history: [
      { sender: "Metro Wholesale", text: "Offer submitted for delivery at Pune warehouse @ ₹2,620/Q.", time: "1 hour ago", price: 2620 }
    ]
  },
  {
    id: "off-103",
    listingId: "lst-101",
    listingCrop: "Tomato (Hybrid 1057)",
    listingQuantity: 20,
    buyerId: "usr-buyer-3",
    buyerName: "Kishore Veg Traders (Vashi Mandi Agent)",
    buyerType: "Commission Merchant",
    buyerRating: 4.2,
    buyerReliabilityScore: 76.0,
    offeredPricePerUnit: 2400,
    quantity: 20,
    pickupDate: "2026-08-25",
    paymentTerms: "CREDIT_7_DAYS",
    paymentTermLabel: "7-Day Cheque Payment",
    transportResponsibility: "FARMER_ARRANGES",
    notes: "Traditional mandi slip payment.",
    status: "PENDING",
    isTopRecommended: false,
    recommendationExplanation: "Lowest net yield (₹41,200) due to 4% commission agent fee, high transport to Vashi, and 7-day payment risk.",
    estimatedGrossINR: 48000,
    estimatedTransportINR: 3200,
    estimatedNetINR: 41200,
    createdAt: "3 hours ago",
    history: [
      { sender: "Kishore Veg Traders", text: "Offer submitted @ ₹2,400/Q.", time: "3 hours ago", price: 2400 }
    ]
  }
];

export interface MockOrder {
  id: string;
  orderNumber: string;
  listingCrop: string;
  quantityQuintals: number;
  farmerName: string;
  buyerName: string;
  transporterName: string;
  agreedPricePerUnit: number;
  totalAmount: number;
  escrowStatus: "SECURED_IN_VAULT" | "RELEASED" | "REFUNDED";
  orderStatus: "CONFIRMED" | "PICKUP_SCHEDULED" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "QUALITY_CHECK" | "COMPLETED";
  pickupLocation: string;
  deliveryLocation: string;
  vehicleNumber: string;
  driverPhone: string;
  temperatureCelsius?: number;
  distanceKm: number;
  currentMilestone: string;
  milestones: Array<{ title: string; status: "completed" | "current" | "upcoming"; time?: string }>;
  qualityCheck: {
    passed: boolean;
    gradeAssigned: string;
    moisturePercent: number;
    visualDefectRate: number;
    inspectedBy: string;
  };
  createdAt: string;
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-8924",
    orderNumber: "AGRI-ORD-8924",
    listingCrop: "Tomato (Hybrid 1057)",
    quantityQuintals: 20,
    farmerName: "Ramesh Kisan Patil (Nashik)",
    buyerName: "Reliance Fresh Rural Hub (Navi Mumbai)",
    transporterName: "Gurukripa Cold Chain Logistics",
    agreedPricePerUnit: 2550,
    totalAmount: 51000,
    escrowStatus: "SECURED_IN_VAULT",
    orderStatus: "IN_TRANSIT",
    pickupLocation: "Dindori Farmgate, Nashik, Maharashtra",
    deliveryLocation: "Reliance Fresh DC, Ghansoli, Navi Mumbai",
    vehicleNumber: "MH-12-QE-4501 (14-Ft Reefer)",
    driverPhone: "+91 98901 77665 (Driver: Balwant Singh)",
    temperatureCelsius: 13.8,
    distanceKm: 168,
    currentMilestone: "Truck in transit on Mumbai-Nashik Expressway (Km 84). Estimated arrival in 1h 45m.",
    milestones: [
      { title: "Order Confirmed & Escrow Funded", status: "completed", time: "24 Aug, 08:30 AM" },
      { title: "Transporter Assigned (Gurukripa Reefer)", status: "completed", time: "24 Aug, 09:15 AM" },
      { title: "Farmgate Weighment & Loading (20 Q)", status: "completed", time: "24 Aug, 11:30 AM" },
      { title: "Dispatched & In Transit (Live GPS Active)", status: "current", time: "24 Aug, 12:00 PM" },
      { title: "Delivery & Automated Quality Inspection", status: "upcoming" },
      { title: "Escrow Payout Release to Farmer Wallet", status: "upcoming" }
    ],
    qualityCheck: {
      passed: true,
      gradeAssigned: "Grade-A Premium (Export Fit)",
      moisturePercent: 88.5,
      visualDefectRate: 1.2,
      inspectedBy: "AgriLink Automated Optical QC & Weighbridge"
    },
    createdAt: "Today, 08:30 AM"
  },
  {
    id: "ord-8919",
    orderNumber: "AGRI-ORD-8919",
    listingCrop: "Onion (Nasik Red)",
    quantityQuintals: 50,
    farmerName: "Ramesh Kisan Patil (Nashik)",
    buyerName: "Surat Fresh Grocers Wholesale",
    transporterName: "Mahalaxmi Freight Carriers",
    agreedPricePerUnit: 2400,
    totalAmount: 120000,
    escrowStatus: "RELEASED",
    orderStatus: "COMPLETED",
    pickupLocation: "Lasalgaon Yard, Nashik",
    deliveryLocation: "Surat APMC Gate #4, Gujarat",
    vehicleNumber: "MH-15-AB-8822 (Tata 1109)",
    driverPhone: "+91 94220 55443",
    distanceKm: 235,
    currentMilestone: "Delivered & Inspected. ₹1,20,000 released to Ramesh Patil Bank Account via IMPS.",
    milestones: [
      { title: "Order Confirmed & Escrow Funded", status: "completed", time: "22 Aug, 09:00 AM" },
      { title: "Loaded & Weighed (50 Quintals)", status: "completed", time: "22 Aug, 01:00 PM" },
      { title: "Dispatched & In Transit", status: "completed", time: "22 Aug, 02:30 PM" },
      { title: "Delivered at Surat APMC", status: "completed", time: "23 Aug, 06:15 AM" },
      { title: "QC Passed & Instant Settlement Released", status: "completed", time: "23 Aug, 08:00 AM" }
    ],
    qualityCheck: {
      passed: true,
      gradeAssigned: "Grade-A Export Quality",
      moisturePercent: 12.1,
      visualDefectRate: 0.8,
      inspectedBy: "Surat Mandi Certified Assayer"
    },
    createdAt: "22 Aug 2026"
  }
];

export interface FpoBatch {
  id: string;
  fpoName: string;
  cropName: string;
  variety: string;
  totalPooledMetricTons: number;
  contributingFarmersCount: number;
  expectedPricePerQuintal: number;
  highestBidPerQuintal: number;
  status: "AGGREGATING" | "AUCTION_LIVE" | "CONTRACT_LOCKED" | "FULFILLED";
  pickupLocation: string;
  closingTime: string;
}

export const MOCK_FPO_BATCHES: FpoBatch[] = [
  {
    id: "fpo-batch-01",
    fpoName: "Sahyadri Farmers Producer Co.",
    cropName: "Soybean",
    variety: "Yellow JS 335 (High Oil Content)",
    totalPooledMetricTons: 120,
    contributingFarmersCount: 42,
    expectedPricePerQuintal: 4600,
    highestBidPerQuintal: 4680,
    status: "AUCTION_LIVE",
    pickupLocation: "Mohadi Central Aggregation Hub, Nashik",
    closingTime: "Tomorrow, 05:00 PM"
  },
  {
    id: "fpo-batch-02",
    fpoName: "Sahyadri Farmers Producer Co.",
    cropName: "Tomato",
    variety: "Hybrid 1057 (Bulk Institutional Lot)",
    totalPooledMetricTons: 60,
    contributingFarmersCount: 18,
    expectedPricePerQuintal: 2500,
    highestBidPerQuintal: 2580,
    status: "CONTRACT_LOCKED",
    pickupLocation: "Dindori Collection Center",
    closingTime: "Locked with BigBasket Procurement"
  },
  {
    id: "fpo-batch-03",
    fpoName: "Kisan Vikas Co-operative Federation",
    cropName: "Wheat",
    variety: "Sharbati Gold Grade-A",
    totalPooledMetricTons: 250,
    contributingFarmersCount: 85,
    expectedPricePerQuintal: 3300,
    highestBidPerQuintal: 3340,
    status: "AGGREGATING",
    pickupLocation: "Sehore Grain Terminal, MP",
    closingTime: "28 Aug 2026"
  }
];
