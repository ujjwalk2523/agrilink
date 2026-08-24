import { GeoLocation } from "../types";

// Standard geographic coordinates for key agricultural hubs across India
export const KNOWN_HUBS: Record<string, GeoLocation> = {
  "nashik": { name: "Nashik", state: "Maharashtra", latitude: 19.9975, longitude: 73.7898 },
  "pune": { name: "Pune APMC (Gultekdi)", state: "Maharashtra", latitude: 18.5204, longitude: 73.8567 },
  "vashi": { name: "Vashi APMC (Navi Mumbai)", state: "Maharashtra", latitude: 19.0760, longitude: 72.8777 },
  "lasalgaon": { name: "Lasalgaon Mandi (Asia's Largest Onion Hub)", state: "Maharashtra", latitude: 20.1472, longitude: 74.2250 },
  "surat": { name: "Surat APMC", state: "Gujarat", latitude: 21.1702, longitude: 72.8311 },
  "indore": { name: "Indore APMC (Choithram)", state: "Madhya Pradesh", latitude: 22.7196, longitude: 75.8577 },
  "azadpur": { name: "Azadpur APMC Mandi", state: "Delhi NCR", latitude: 28.7159, longitude: 77.1783 },
  "kolar": { name: "Kolar APMC (Tomato Capital)", state: "Karnataka", latitude: 13.1367, longitude: 78.1340 },
  "bangalore": { name: "Yeshwanthpur APMC (Bengaluru)", state: "Karnataka", latitude: 13.0280, longitude: 77.5407 },
  "guntur": { name: "Guntur Mirchi Yard", state: "Andhra Pradesh", latitude: 16.3067, longitude: 80.4365 },
  "lucknow": { name: "Dubagga APMC (Lucknow)", state: "Uttar Pradesh", latitude: 26.8467, longitude: 80.9462 },
  "jaipur": { name: "Muhana Mandi (Jaipur)", state: "Rajasthan", latitude: 26.9124, longitude: 75.7873 },
  "ahmedabad": { name: "Jamalpur APMC (Ahmedabad)", state: "Gujarat", latitude: 23.0225, longitude: 72.5714 },
  "reliance_fresh_hub_nashik": { name: "Reliance Fresh Rural Hub (Nashik)", state: "Maharashtra", latitude: 19.9500, longitude: 73.8200 },
  "itc_e_choupal_indore": { name: "ITC e-Choupal Integrated Hub", state: "Madhya Pradesh", latitude: 22.8000, longitude: 75.9200 },
  "bigbasket_hub_kolar": { name: "BigBasket Direct Farm Sourcing Hub", state: "Karnataka", latitude: 13.1800, longitude: 78.1600 }
};

/**
 * Calculates geodesic distance between two coordinate pairs using Haversine formula
 */
export function calculateGeodesicDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Converts geodesic straight-line distance to realistic road distance
 * applying road tortuosity/circuity factor (1.28x for Indian terrain)
 */
export function calculateRoadDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const straightLine = calculateGeodesicDistanceKm(lat1, lon1, lat2, lon2);
  const circuityFactor = 1.28;
  const distance = Math.round(straightLine * circuityFactor * 10) / 10;
  return Math.max(distance, 5); // Minimum 5 km
}

/**
 * Estimates transit duration in hours factoring truck commercial speeds and loading overhead
 */
export function estimateTransitHours(distanceKm: number): number {
  const avgTruckSpeedKmh = 40; // Average commercial agricultural vehicle speed
  const handlingBufferHours = 1.5; // Loading, check-post, toll plaza buffer
  const transitTime = distanceKm / avgTruckSpeedKmh + handlingBufferHours;
  return Math.round(transitTime * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
