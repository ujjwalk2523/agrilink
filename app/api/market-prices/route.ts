import { NextResponse } from "next/server";
import { marketDataService } from "@/lib/services/market-data-provider";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crop = searchParams.get("crop") || undefined;
  const state = searchParams.get("state") || undefined;

  try {
    const prices = await marketDataService.getMarketPrices(crop, state);
    return NextResponse.json({
      success: true,
      count: prices.length,
      data: prices
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve market prices" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await marketDataService.addManualAdminPrice(body);
    return NextResponse.json({
      success: true,
      message: "Market price published successfully",
      data: created
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to publish price record" },
      { status: 400 }
    );
  }
}
