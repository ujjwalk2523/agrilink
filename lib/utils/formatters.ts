/**
 * Formats a number into Indian Rupee currency format (₹ 1,23,456)
 */
export function formatINR(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/**
 * Formats quantity with unit
 */
export function formatQuantity(quantity: number, unit: string = "Quintal"): string {
  if (quantity >= 10 && unit.toLowerCase() === "quintal") {
    const tons = Math.round((quantity / 10) * 10) / 10;
    return `${quantity} Q (${tons} MT)`;
  }
  return `${quantity} ${unit}`;
}

/**
 * Formats date into readable string (e.g., "24 Aug 2026, 02:30 PM")
 */
export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Returns badge color classes for various platform statuses
 */
export function getStatusBadgeClass(status: string): string {
  switch (status.toUpperCase()) {
    case "ACTIVE":
    case "CONFIRMED":
    case "ACCEPTED":
    case "COMPLETED":
    case "DELIVERED":
    case "VERIFIED":
    case "FRESH":
      return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";

    case "PENDING":
    case "HAS_OFFERS":
    case "NEGOTIATING":
    case "IN_TRANSIT":
    case "PICKUP_SCHEDULED":
    case "QUALITY_CHECK":
    case "RECENT":
      return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";

    case "COUNTERED":
    case "TRANSPORT_PENDING":
    case "PAYMENT_PENDING":
      return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";

    case "CANCELLED":
    case "REJECTED":
    case "EXPIRED":
    case "DISPUTED":
    case "STALE":
      return "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";

    case "DRAFT":
    case "UNVERIFIED":
    default:
      return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  }
}
