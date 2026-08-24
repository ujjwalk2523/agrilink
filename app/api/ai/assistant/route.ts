import { NextRequest, NextResponse } from "next/server";
import { processAiQuery } from "@/lib/services/ai-assistant";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, role = "FARMER", context } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Missing query in request body" },
        { status: 400 }
      );
    }

    const aiResponse = processAiQuery(query);

    return NextResponse.json({
      success: true,
      data: aiResponse,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process AI query" },
      { status: 500 }
    );
  }
}
