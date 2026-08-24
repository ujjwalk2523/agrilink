import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCE_LISTINGS, MockListing } from "@/lib/mock-data/seed-data";

// In-memory store initialized with seed data for fast, reliable state management
let activeListings: MockListing[] = [...MOCK_PRODUCE_LISTINGS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get("crop");
    const grade = searchParams.get("grade");
    const search = searchParams.get("search");

    let filtered = [...activeListings];

    if (crop && crop !== "ALL") {
      filtered = filtered.filter((l) => l.cropName.toLowerCase() === crop.toLowerCase());
    }

    if (grade && grade !== "ALL") {
      filtered = filtered.filter((l) => l.qualityGrade === grade);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.cropName.toLowerCase().includes(q) ||
          l.variety.toLowerCase().includes(q) ||
          l.locationName.toLowerCase().includes(q) ||
          l.farmerName.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      cropName,
      variety,
      quantity,
      unit = "Quintals",
      qualityGrade = "GRADE_A",
      expectedPricePerUnit,
      minimumFloorPrice,
      harvestDate,
      locationName,
      state = "Maharashtra",
      farmerName = "Ramesh Kisan Patil",
      description = "",
      imageUrl,
    } = body;

    if (!cropName || !variety || !quantity || !expectedPricePerUnit) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (cropName, variety, quantity, expectedPricePerUnit)" },
        { status: 400 }
      );
    }

    const defaultImages: Record<string, string> = {
      Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      Onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
      "Green Chilli": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
      Mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
      Potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    };

    const newListing: MockListing = {
      id: `lst-${Date.now()}`,
      cropName,
      variety,
      category: "Vegetables",
      quantity: Number(quantity),
      unit,
      qualityGrade,
      expectedPricePerUnit: Number(expectedPricePerUnit),
      minimumAcceptablePrice: minimumFloorPrice ? Number(minimumFloorPrice) : Number(expectedPricePerUnit) * 0.9,
      locationName: locationName || "Dindori, Nashik",
      state,
      latitude: 20.1982,
      longitude: 73.8344,
      harvestDate: harvestDate || new Date().toISOString().split("T")[0],
      farmerName,
      farmerPhone: "+91 98231 45678",
      farmerRating: 4.9,
      imageUrl: imageUrl || defaultImages[cropName] || defaultImages.Tomato,
      status: "ACTIVE",
      offersCount: 0,
      description: description || `Freshly harvested ${qualityGrade} ${cropName} (${variety}) available for direct farmgate pickup with digital weighment.`,
      createdAt: "Just now",
    };

    activeListings.unshift(newListing);

    return NextResponse.json({
      success: true,
      message: "Produce listing published successfully",
      data: newListing,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create produce listing" },
      { status: 500 }
    );
  }
}
