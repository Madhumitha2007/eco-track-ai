import { CategoryId, WasteCategory } from '../types/waste';

export const WASTE_CATEGORIES: Record<CategoryId, WasteCategory> = {
  organic: {
    id: 'organic',
    name: 'Organic Waste',
    icon: 'Leaf',
    color: 'emerald',
    bgColor: 'bg-emerald-950/60',
    borderColor: 'border-emerald-500/30',
    streamName: 'Green Bin / Home Compost',
    description: 'Biodegradable organic matter including food scraps, yard waste, coffee grounds, and unbleached paper towels.',
    examples: ['Fruit peels & vegetable scraps', 'Coffee grounds & tea bags', 'Eggshells & nutshells', 'Garden leaves & weeds', 'Soiled paper napkins'],
    disposalInstructions: [
      'Collect in a breathable kitchen caddy or lined compost bin.',
      'Avoid mixing plastic wrappers, sticker labels, or synthetic tea bags.',
      'Deposit in green municipal organics bin or home compost pile.',
      'Keep meat and dairy quantities minimal in small home compost bins to avoid pests.'
    ],
    recyclingSteps: [
      'Aerately turn compost every 1-2 weeks.',
      'Maintain 3:1 brown (carbon) to green (nitrogen) ratio for fast decomposition.'
    ],
    compostingInfo: 'Produces rich humus nutrient soil amendment in 6-12 weeks, lowering landfill methane emissions.',
    isSpecialDisposal: false,
    isRecyclable: false,
    isOrganic: true
  },
  paper: {
    id: 'paper',
    name: 'Paper & Cardboard',
    icon: 'FileText',
    color: 'amber',
    bgColor: 'bg-amber-950/60',
    borderColor: 'border-amber-500/30',
    streamName: 'Blue Recycling Bin',
    description: 'Clean fiber materials including cardboard boxes, office paper, newspapers, magazines, and paper packaging.',
    examples: ['Corrugated cardboard boxes', 'Newspapers & magazines', 'Office printer paper', 'Cereal boxes & paperboard', 'Envelopes (without plastic windows)'],
    disposalInstructions: [
      'Flatten all cardboard boxes to save bin capacity.',
      'Keep paper dry and free of grease, oil, or food residue.',
      'Remove plastic tape, bubble wraps, and plastic sleeves.',
      'Do NOT recycle wax-coated paper plates or heavily soiled pizza boxes.'
    ],
    recyclingSteps: [
      'Pulping with water and chemicals to separate wood fibers.',
      'Filtering and de-inking to produce fresh paper products.'
    ],
    isSpecialDisposal: false,
    isRecyclable: true,
    isOrganic: false
  },
  plastic: {
    id: 'plastic',
    name: 'Plastics',
    icon: 'Container',
    color: 'sky',
    bgColor: 'bg-sky-950/60',
    borderColor: 'border-sky-500/30',
    streamName: 'Yellow/Blue Plastic Bin',
    description: 'Rigid plastic containers, bottles, jugs, and tubs stamped with recycling symbols #1 (PETE), #2 (HDPE), and #5 (PP).',
    examples: ['Water & soda bottles (#1 PETE)', 'Milk jugs & detergent bottles (#2 HDPE)', 'Yogurt cups & food tubs (#5 PP)', 'Shampoo & conditioner bottles'],
    disposalInstructions: [
      'Empty all liquid or food residue and give a light rinse.',
      'Screw plastic caps back onto empty bottles.',
      'Do NOT bag recyclables in plastic trash bags — leave them loose in your bin.',
      'Avoid soft single-use plastic films (bags/wraps) in curbside bins unless accepted locally.'
    ],
    recyclingSteps: [
      'Sorting by resin code at Material Recovery Facilities (MRF).',
      'Shredding into flakes, melting, and repelletizing into recycled plastic resins.'
    ],
    isSpecialDisposal: false,
    isRecyclable: true,
    isOrganic: false
  },
  glass: {
    id: 'glass',
    name: 'Glass Packaging',
    icon: 'Wine',
    color: 'teal',
    bgColor: 'bg-teal-950/60',
    borderColor: 'border-teal-500/30',
    streamName: 'Glass Bin / Bottle Depot',
    description: 'Container glass including beverage bottles and jar packaging (flint, amber, and green glass).',
    examples: ['Beverage bottles & glass jars', 'Olive oil & condiment bottles', 'Food storage glass jars', 'Cosmetic glass containers'],
    disposalInstructions: [
      'Rinse out food or beverage residue.',
      'Remove metal lids or corks and sort them into their respective streams.',
      'Do NOT include cookware (Pyrex), ceramics, window panes, or lightbulbs in glass recycling as they melt at different temperatures.',
      'Handle broken glass carefully wrapped in thick paper if discarding.'
    ],
    recyclingSteps: [
      'Crushing into uniform cullet.',
      'Melting infinitely in furnaces without loss of structural purity or clarity.'
    ],
    isSpecialDisposal: false,
    isRecyclable: true,
    isOrganic: false
  },
  metal: {
    id: 'metal',
    name: 'Metals & Cans',
    icon: 'Shield',
    color: 'slate',
    bgColor: 'bg-slate-900/80',
    borderColor: 'border-slate-500/40',
    streamName: 'Metal Recycling Stream',
    description: 'Ferrous and non-ferrous metals including aluminum beverage cans, tin food cans, clean aluminum foil, and metal lids.',
    examples: ['Aluminum soda & beverage cans', 'Steel/tin canned food containers', 'Clean aluminum foil trays', 'Metal bottle caps & lid rings'],
    disposalInstructions: [
      'Rinse cans to remove food particles.',
      'Ball up clean aluminum foil (minimum 2-inch sphere size so sorting machinery detects it).',
      'Leave metal labels attached; magnetic separators will extract steel.',
      'Scrap metal (pipes, pans, pots) should go to dedicated scrap drop-offs.'
    ],
    recyclingSteps: [
      'Magnetic separation of steel from aluminum.',
      'Smelting into metal ingots for manufacturing new cans within 60 days.'
    ],
    isSpecialDisposal: false,
    isRecyclable: true,
    isOrganic: false
  },
  electronic: {
    id: 'electronic',
    name: 'Electronic Waste (E-Waste)',
    icon: 'Cpu',
    color: 'violet',
    bgColor: 'bg-violet-950/60',
    borderColor: 'border-violet-500/30',
    streamName: 'E-Waste Drop-off Center',
    description: 'End-of-life electrical equipment, computers, mobile devices, batteries, cables, circuit boards, and appliances.',
    examples: ['Mobile phones & tablets', 'Laptops & computer towers', 'Rechargeable & alkaline batteries', 'Chargers, cables & power strips', 'Small kitchen appliances'],
    disposalInstructions: [
      'NEVER throw e-waste or batteries into regular garbage or curbside recycling bins.',
      'Factory reset devices and wipe personal data prior to drop-off.',
      'Remove lithium-ion batteries if detachable and tape battery terminals with electrical tape.',
      'Take to certified e-waste collection sites, municipal drop-offs, or retailer buy-back programs.'
    ],
    recyclingSteps: [
      'Manual disassembly to recover gold, copper, silver, lithium, and rare earth minerals.',
      'Safe containment of heavy metal toxins (lead, mercury, cadmium).'
    ],
    hazardWarning: 'CRITICAL HAZARD: Lithium-ion batteries in standard bins can spark intense chemical fires in recycling trucks and sorting facilities!',
    isSpecialDisposal: true,
    isRecyclable: true,
    isOrganic: false
  },
  hazardous: {
    id: 'hazardous',
    name: 'Hazardous Waste',
    icon: 'AlertTriangle',
    color: 'rose',
    bgColor: 'bg-rose-950/60',
    borderColor: 'border-rose-500/30',
    streamName: 'Household Hazardous Waste (HHW)',
    description: 'Chemicals, toxins, paints, solvents, pesticides, motor oils, fluorescent tubes, and medical waste that pose health and safety risks.',
    examples: ['Paint, varnishes & wood stains', 'Motor oil & automotive fluids', 'Pesticides, weedkillers & fertilizers', 'Fluorescent light bulbs & tubes', 'Household chemical cleaners & bleach'],
    disposalInstructions: [
      'NEVER pour down drains, storm sewers, or dump into regular trash bins.',
      'Keep items in original labeled containers whenever possible.',
      'Store in a cool, leak-proof container during transport.',
      'Deliver strictly to local municipal Household Hazardous Waste (HHW) facilities or scheduled collection events.'
    ],
    recyclingSteps: [
      'Neutralization, high-temperature incineration, or re-refining (for motor oils).',
      'Mercury recovery from fluorescent lamps.'
    ],
    hazardWarning: 'EXTREME TOXICITY WARNING: Improper disposal pollutes local water tables, harms wildlife, and endangers sanitation workers.',
    isSpecialDisposal: true,
    isRecyclable: false,
    isOrganic: false
  }
};
