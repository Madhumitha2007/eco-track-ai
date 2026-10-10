export type CategoryId = 
  | 'organic'
  | 'paper'
  | 'plastic'
  | 'glass'
  | 'metal'
  | 'electronic'
  | 'hazardous';

export interface WasteCategory {
  id: CategoryId;
  name: string;
  icon: string;
  color: string; // Tailwind color class
  bgColor: string; // Tailwind bg class
  borderColor: string;
  streamName: string;
  description: string;
  examples: string[];
  disposalInstructions: string[];
  recyclingSteps: string[];
  compostingInfo?: string;
  hazardWarning?: string;
  isSpecialDisposal: boolean;
  isRecyclable: boolean;
  isOrganic: boolean;
}

export interface WasteRecord {
  id: string;
  title: string;
  category: CategoryId;
  quantity: number; // in kg or units
  unit: 'kg' | 'items';
  date: string; // YYYY-MM-DD
  notes?: string;
  createdAt: number;
  isDemo?: boolean;
}

export interface EcoTip {
  id: string;
  category: string;
  tip: string;
  actionableStep: string;
  impactTag: string;
}

export interface EcoImpactStats {
  totalWeightKg: number;
  totalItemsCount: number;
  co2SavedKg: number;
  landfillDivertedKg: number;
  waterSavedLiters: number;
  energySavedKwh: number;
  treesSavedEquiv: number;
  recyclablePercentage: number;
  organicPercentage: number;
  specialDisposalCount: number;
}
