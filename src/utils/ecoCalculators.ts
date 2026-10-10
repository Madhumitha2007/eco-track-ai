import { CategoryId, EcoImpactStats, WasteRecord } from '../types/waste';
import { WASTE_CATEGORIES } from '../data/wasteCategories';

// Conversion factors per 1kg of properly recycled/composted material (based on standard EPA WARM model approximations)
const CONVERSION_FACTORS: Record<CategoryId, { co2PerKg: number; landfillPerKg: number; waterPerKg: number; energyPerKg: number }> = {
  organic: { co2PerKg: 0.85, landfillPerKg: 1.0, waterPerKg: 12, energyPerKg: 0.4 },
  paper: { co2PerKg: 1.40, landfillPerKg: 1.0, waterPerKg: 26, energyPerKg: 4.0 },
  plastic: { co2PerKg: 1.80, landfillPerKg: 1.0, waterPerKg: 15, energyPerKg: 5.5 },
  glass: { co2PerKg: 0.35, landfillPerKg: 1.0, waterPerKg: 4, energyPerKg: 1.2 },
  metal: { co2PerKg: 3.50, landfillPerKg: 1.0, waterPerKg: 35, energyPerKg: 8.5 },
  electronic: { co2PerKg: 4.20, landfillPerKg: 1.0, waterPerKg: 45, energyPerKg: 12.0 },
  hazardous: { co2PerKg: 2.10, landfillPerKg: 1.0, waterPerKg: 50, energyPerKg: 6.0 },
};

export const calculateEcoStats = (records: WasteRecord[]): EcoImpactStats => {
  let totalWeightKg = 0;
  let totalItemsCount = records.length;
  let co2SavedKg = 0;
  let landfillDivertedKg = 0;
  let waterSavedLiters = 0;
  let energySavedKwh = 0;

  let recyclableCount = 0;
  let organicCount = 0;
  let specialDisposalCount = 0;

  records.forEach(rec => {
    // Standardize weight assumption if logged in items (~0.25kg avg per item)
    const weight = rec.unit === 'items' ? rec.quantity * 0.25 : rec.quantity;
    totalWeightKg += weight;

    const factors = CONVERSION_FACTORS[rec.category] || CONVERSION_FACTORS.paper;
    co2SavedKg += weight * factors.co2PerKg;
    landfillDivertedKg += weight * factors.landfillPerKg;
    waterSavedLiters += weight * factors.waterPerKg;
    energySavedKwh += weight * factors.energyPerKg;

    const categoryMeta = WASTE_CATEGORIES[rec.category];
    if (categoryMeta) {
      if (categoryMeta.isRecyclable) recyclableCount++;
      if (categoryMeta.isOrganic) organicCount++;
      if (categoryMeta.isSpecialDisposal) specialDisposalCount++;
    }
  });

  const recyclablePercentage = totalItemsCount > 0 ? Math.round((recyclableCount / totalItemsCount) * 100) : 0;
  const organicPercentage = totalItemsCount > 0 ? Math.round((organicCount / totalItemsCount) * 100) : 0;
  
  // 1 tree absorbs ~21.8 kg CO2 per year
  const treesSavedEquiv = Number((co2SavedKg / 21.8).toFixed(1));

  return {
    totalWeightKg: Number(totalWeightKg.toFixed(1)),
    totalItemsCount,
    co2SavedKg: Number(co2SavedKg.toFixed(1)),
    landfillDivertedKg: Number(landfillDivertedKg.toFixed(1)),
    waterSavedLiters: Math.round(waterSavedLiters),
    energySavedKwh: Number(energySavedKwh.toFixed(1)),
    treesSavedEquiv,
    recyclablePercentage,
    organicPercentage,
    specialDisposalCount
  };
};

export const getCategoryDistribution = (records: WasteRecord[]): { category: CategoryId; name: string; count: number; weight: number; color: string }[] => {
  const map: Record<CategoryId, { count: number; weight: number }> = {
    organic: { count: 0, weight: 0 },
    paper: { count: 0, weight: 0 },
    plastic: { count: 0, weight: 0 },
    glass: { count: 0, weight: 0 },
    metal: { count: 0, weight: 0 },
    electronic: { count: 0, weight: 0 },
    hazardous: { count: 0, weight: 0 }
  };

  records.forEach(rec => {
    if (map[rec.category]) {
      map[rec.category].count += 1;
      const weight = rec.unit === 'items' ? rec.quantity * 0.25 : rec.quantity;
      map[rec.category].weight += weight;
    }
  });

  return (Object.keys(map) as CategoryId[]).map(catId => ({
    category: catId,
    name: WASTE_CATEGORIES[catId].name,
    count: map[catId].count,
    weight: Number(map[catId].weight.toFixed(1)),
    color: WASTE_CATEGORIES[catId].color
  }));
};
