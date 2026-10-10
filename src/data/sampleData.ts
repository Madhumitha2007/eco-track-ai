import { WasteRecord } from '../types/waste';

export const SAMPLE_RECORDS: WasteRecord[] = [
  {
    id: 'demo-1',
    title: 'Apple Cores & Banana Peels',
    category: 'organic',
    quantity: 1.2,
    unit: 'kg',
    date: '2026-10-10',
    notes: 'Kitchen organic waste added to home compost bin.',
    createdAt: Date.now() - 3600000 * 2,
    isDemo: true
  },
  {
    id: 'demo-2',
    title: 'PET Water Bottles (Pack of 12)',
    category: 'plastic',
    quantity: 0.8,
    unit: 'kg',
    date: '2026-10-09',
    notes: 'Rinsed #1 PET plastic bottles placed loose in recycling container.',
    createdAt: Date.now() - 3600000 * 24,
    isDemo: true
  },
  {
    id: 'demo-3',
    title: 'Amazon Delivery Cardboard Boxes',
    category: 'paper',
    quantity: 2.5,
    unit: 'kg',
    date: '2026-10-08',
    notes: 'Flattened corrugated shipping boxes.',
    createdAt: Date.now() - 3600000 * 48,
    isDemo: true
  },
  {
    id: 'demo-4',
    title: 'Glass Pasta Sauce & Jam Jars',
    category: 'glass',
    quantity: 1.5,
    unit: 'kg',
    date: '2026-10-07',
    notes: 'Rinsed glass containers deposited at neighborhood glass bank.',
    createdAt: Date.now() - 3600000 * 72,
    isDemo: true
  },
  {
    id: 'demo-5',
    title: 'Aluminum Soda & Beverage Cans',
    category: 'metal',
    quantity: 0.6,
    unit: 'kg',
    date: '2026-10-06',
    notes: 'Empty aluminum cans collected for scrap recycling.',
    createdAt: Date.now() - 3600000 * 96,
    isDemo: true
  },
  {
    id: 'demo-6',
    title: 'Old Smartphone & AA Rechargeable Batteries',
    category: 'electronic',
    quantity: 0.4,
    unit: 'kg',
    date: '2026-10-05',
    notes: 'Terminals taped; delivered to retail e-waste dropoff.',
    createdAt: Date.now() - 3600000 * 120,
    isDemo: true
  },
  {
    id: 'demo-7',
    title: 'Expired Solvent Cleaner & Paint Can',
    category: 'hazardous',
    quantity: 1.8,
    unit: 'kg',
    date: '2026-10-04',
    notes: 'Brought safely to Municipal Household Hazardous Waste facility.',
    createdAt: Date.now() - 3600000 * 144,
    isDemo: true
  }
];
