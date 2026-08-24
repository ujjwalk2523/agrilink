import { NextRequest, NextResponse } from "next/server";

interface KycItem {
  id: string;
  name: string;
  role: "FARMER" | "BUYER" | "TRANSPORTER" | "FPO";
  docType: string;
  docNumber: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

let kycQueue: KycItem[] = [
  {
    id: "kyc-01",
    name: "Ramesh Kisan Patil",
    role: "FARMER",
    docType: "7/12 Land Record Extract (14.5 Acres)",
    docNumber: "MH-NSK-DIN-4920",
    submittedAt: "Today, 06:30 AM",
    status: "APPROVED",
  },
  {
    id: "kyc-02",
    name: "Aditya Agro Corp",
    role: "BUYER",
    docType: "GSTIN Certificate & APMC License",
    docNumber: "27AABCR1234F1Z9",
    submittedAt: "Yesterday",
    status: "APPROVED",
  },
  {
    id: "kyc-03",
    name: "Gurukripa Cold Logistics",
    role: "TRANSPORTER",
    docType: "National Commercial Vehicle Permit & Reefer Audit",
    docNumber: "NP-MH-2024-8840",
    submittedAt: "2 days ago",
    status: "APPROVED",
  },
  {
    id: "kyc-04",
    name: "Kisan Vikas FPO",
    role: "FPO",
    docType: "SFAC / NABARD Registration Certificate",
    docNumber: "FPO-MH-NAB-2022-901",
    submittedAt: "Just now",
    status: "PENDING",
  },
];

let auditLogs: Array<{ action: string; user: string; timestamp: string }> = [
  { action: "Farmer KYC Approved for Ramesh Patil (7/12 Verified via Mahabhulekh)", user: "Admin", timestamp: "Today, 07:00 AM" },
  { action: "Agmarknet Live Mandi Sync Executed (450 APMCs Updated)", user: "System Cron", timestamp: "Today, 06:00 AM" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    kycQueue,
    auditLogs,
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { kycId, action } = body; // action: "APPROVE" | "REJECT"

    if (!kycId || !action) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (kycId, action)" },
        { status: 400 }
      );
    }

    const item = kycQueue.find((k) => k.id === kycId);
    if (!item) {
      return NextResponse.json(
        { success: false, error: `KYC item ${kycId} not found` },
        { status: 404 }
      );
    }

    item.status = action === "APPROVE" ? "APPROVED" : "REJECTED";

    auditLogs.unshift({
      action: `${item.role} KYC ${item.status} for ${item.name} (${item.docNumber})`,
      user: "Admin Officer",
      timestamp: "Just now",
    });

    return NextResponse.json({
      success: true,
      message: `KYC Application for ${item.name} has been ${item.status.toLowerCase()}!`,
      data: item,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update KYC status" },
      { status: 500 }
    );
  }
}
