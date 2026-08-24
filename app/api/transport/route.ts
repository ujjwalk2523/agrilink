import { NextRequest, NextResponse } from "next/server";
import { MOCK_ORDERS, MockOrder } from "@/lib/mock-data/seed-data";

let activeOrders: MockOrder[] = [...MOCK_ORDERS];

const MOCK_JOBS = [
  {
    id: "job-01",
    crop: "Tomato (Grade-A Crates)",
    origin: "Dindori Farmgate, Nashik",
    destination: "Reliance Fresh DC, Ghansoli, Navi Mumbai",
    distanceKm: 168,
    tonnage: "2.0 MT (20 Quintals)",
    vehicleRecommended: "14-Ft Eicher Pro / Reefer",
    tempRequirement: "12°C - 15°C (Chilled)",
    maxBudgetINR: 3200,
    status: "OPEN_FOR_BIDS",
    bidsCount: 2,
    pickupWindow: "Today before 04:00 PM",
  },
  {
    id: "job-02",
    crop: "Nasik Red Onions",
    origin: "Lasalgaon Yard, Nashik",
    destination: "Surat APMC Mandi, Gujarat",
    distanceKm: 235,
    tonnage: "5.0 MT (50 Quintals)",
    vehicleRecommended: "Tata 1109 Open Truck",
    tempRequirement: "Ambient / Ventilated",
    maxBudgetINR: 5800,
    status: "OPEN_FOR_BIDS",
    bidsCount: 4,
    pickupWindow: "Tomorrow, 08:00 AM",
  },
  {
    id: "job-03",
    crop: "Sharbati Gold Wheat",
    origin: "Sehore Grain Terminal, MP",
    destination: "Vashi Grain Market, Navi Mumbai",
    distanceKm: 760,
    tonnage: "10.0 MT (100 Quintals)",
    vehicleRecommended: "10-Tyre Heavy Hauler (16 MT)",
    tempRequirement: "Dry Covered Waterproof",
    maxBudgetINR: 22000,
    status: "OPEN_FOR_BIDS",
    bidsCount: 1,
    pickupWindow: "26 Aug 2026",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "jobs" or "orders"

    if (type === "orders") {
      return NextResponse.json({
        success: true,
        count: activeOrders.length,
        data: activeOrders,
      });
    }

    return NextResponse.json({
      success: true,
      jobs: MOCK_JOBS,
      activeShipments: activeOrders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch transport data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobId,
      vehicleId,
      vehicleRegNumber,
      quotedAmountINR,
      driverName,
      driverPhone,
      transporterName = "Gurukripa Cold Chain Logistics",
    } = body;

    if (!jobId || !quotedAmountINR) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (jobId, quotedAmountINR)" },
        { status: 400 }
      );
    }

    const quote = {
      quoteId: `QT-${Date.now().toString().slice(-6)}`,
      jobId,
      transporterName,
      vehicleRegNumber: vehicleRegNumber || "MH-12-QE-4501",
      driverName: driverName || "Balwant Singh",
      driverPhone: driverPhone || "+91 98901 77665",
      quotedAmountINR: Number(quotedAmountINR),
      status: "SUBMITTED",
      submittedAt: "Just now",
    };

    return NextResponse.json({
      success: true,
      message: `Transport haulage quote of ₹${quotedAmountINR} submitted successfully!`,
      data: quote,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit transport quote" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, milestoneStatus, notes, temperatureCelsius } = body;

    if (!orderId || !milestoneStatus) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (orderId, milestoneStatus)" },
        { status: 400 }
      );
    }

    const order = activeOrders.find((o) => o.id === orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order ${orderId} not found` },
        { status: 404 }
      );
    }

    order.orderStatus = milestoneStatus;
    if (notes) order.currentMilestone = notes;
    if (temperatureCelsius !== undefined) order.temperatureCelsius = Number(temperatureCelsius);

    return NextResponse.json({
      success: true,
      message: `Shipment milestone updated to ${milestoneStatus}`,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update transport milestone" },
      { status: 500 }
    );
  }
}
