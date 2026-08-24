import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding AgriLink database...");

  // 1. Create Crops
  const tomato = await prisma.crop.upsert({
    where: { name: "Tomato" },
    update: {},
    create: {
      name: "Tomato",
      category: "Vegetables",
      unit: "Quintal",
      perishabilityIndex: 0.75,
      shelfLifeHours: 72,
      optimalTempCelsius: 14.0
    }
  });

  const onion = await prisma.crop.upsert({
    where: { name: "Onion" },
    update: {},
    create: {
      name: "Onion",
      category: "Vegetables",
      unit: "Quintal",
      perishabilityIndex: 0.20,
      shelfLifeHours: 720
    }
  });

  const wheat = await prisma.crop.upsert({
    where: { name: "Wheat" },
    update: {},
    create: {
      name: "Wheat",
      category: "Grains",
      unit: "Quintal",
      perishabilityIndex: 0.03,
      shelfLifeHours: 8760
    }
  });

  // 2. Create Varieties
  const tomatoHybrid = await prisma.cropVariety.create({
    data: {
      cropId: tomato.id,
      name: "Hybrid 1057",
      characteristics: "Firm red greenhouse hybrid, 60-70mm grading"
    }
  });

  const onionNasikRed = await prisma.cropVariety.create({
    data: {
      cropId: onion.id,
      name: "Nasik Red (Gavran)",
      characteristics: "Double-skin, pungent, high shelf-life rabi stock"
    }
  });

  // 3. Create Markets
  const lasalgaon = await prisma.market.create({
    data: {
      name: "Lasalgaon Mandi (Asia's Largest Onion & Veg Hub)",
      marketType: "APMC",
      state: "Maharashtra",
      district: "Nashik",
      city: "Lasalgaon",
      latitude: 20.1472,
      longitude: 74.2250,
      mandiCessPercent: 1.5,
      commissionPercent: 2.5,
      unloadingRatePerUnit: 15.0,
      dailyVolumeMetric: 650.0,
      liquidityScore: 96.0
    }
  });

  const vashi = await prisma.market.create({
    data: {
      name: "Vashi APMC (Navi Mumbai)",
      marketType: "APMC",
      state: "Maharashtra",
      district: "Thane",
      city: "Navi Mumbai",
      latitude: 19.0760,
      longitude: 72.8777,
      mandiCessPercent: 2.0,
      commissionPercent: 4.0,
      unloadingRatePerUnit: 20.0,
      dailyVolumeMetric: 1200.0,
      liquidityScore: 98.0
    }
  });

  const relianceHub = await prisma.market.create({
    data: {
      name: "Reliance Fresh Rural Hub (Nashik)",
      marketType: "PRIVATE_COLLECTION_HUB",
      state: "Maharashtra",
      district: "Nashik",
      city: "Nashik",
      latitude: 19.9500,
      longitude: 73.8200,
      mandiCessPercent: 0.0,
      commissionPercent: 0.0,
      unloadingRatePerUnit: 10.0,
      dailyVolumeMetric: 250.0,
      liquidityScore: 90.0
    }
  });

  // 4. Create Market Prices
  await prisma.marketPrice.createMany({
    data: [
      {
        marketId: lasalgaon.id,
        cropId: tomato.id,
        varietyId: tomatoHybrid.id,
        qualityGrade: "GRADE_A",
        minPrice: 1800,
        maxPrice: 2400,
        modalPrice: 2250,
        priceTrend: "BULLISH",
        dailyArrivalUnits: 450,
        dataSource: "MSAMB / Agmarknet Live",
        dataFreshness: "FRESH"
      },
      {
        marketId: vashi.id,
        cropId: tomato.id,
        varietyId: tomatoHybrid.id,
        qualityGrade: "GRADE_A",
        minPrice: 2400,
        maxPrice: 3100,
        modalPrice: 2850,
        priceTrend: "BULLISH",
        dailyArrivalUnits: 820,
        dataSource: "eNAM Integrated Portal",
        dataFreshness: "FRESH"
      },
      {
        marketId: relianceHub.id,
        cropId: tomato.id,
        varietyId: tomatoHybrid.id,
        qualityGrade: "GRADE_A",
        minPrice: 2400,
        maxPrice: 2600,
        modalPrice: 2550,
        priceTrend: "STABLE",
        dailyArrivalUnits: 200,
        dataSource: "Direct Corporate Procurement Portal",
        dataFreshness: "FRESH"
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
