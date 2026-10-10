import React, { useState } from 'react';
import { 
  LineChart, 
  Leaf, 
  Droplets, 
  Zap, 
  Trees, 
  Info, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { WasteRecord } from '../../types/waste';
import { calculateEcoStats } from '../../utils/ecoCalculators';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface EcoImpactViewProps {
  records: WasteRecord[];
}

export const EcoImpactView: React.FC<EcoImpactViewProps> = ({ records }) => {
  const stats = calculateEcoStats(records);
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" icon={<LineChart className="w-3.5 h-3.5" />}>
            Environmental Analytics
          </Badge>
          <Badge variant="demo">EPA WARM Model</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          Estimated Environmental Impact Summary
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Visualizing your positive ecological contribution calculated from your logged waste reduction & recycling habits.
        </p>
      </div>

      {/* MANDATORY DISCLAIMER ALERT BOX */}
      <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 text-amber-200 text-xs">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-extrabold text-amber-300 uppercase tracking-wider block">
            Scientific Estimation Disclaimer:
          </span>
          <p className="text-slate-300 leading-relaxed">
            All environmental impact figures (CO₂ avoided, landfill diverted, water & energy saved) are estimated approximations calculated using standard EPA (Environmental Protection Agency) Waste Reduction Model (WARM) conversion factors. These metrics serve as educational indicators for ForgeHacks evaluation and are not scientifically certified laboratory audit measurements.
          </p>
        </div>
      </div>

      {/* Main Impact Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: CO2 Avoided */}
        <Card hoverEffect glow className="border-l-4 border-l-emerald-500 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Estimated CO₂ Avoided
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-white">{stats.co2SavedKg}</span>
            <span className="text-xs text-emerald-400 font-mono ml-1">kg CO₂e</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Equivalent to preventing greenhouse gas emissions from burning fossil fuels.
          </p>
        </Card>

        {/* Metric 2: Landfill Diverted */}
        <Card hoverEffect className="border-l-4 border-l-sky-500 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Landfill Volume Diverted
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-white">{stats.landfillDivertedKg}</span>
            <span className="text-xs text-sky-400 font-mono ml-1">kg diverted</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Prevented organic decomposition methane in anaerobic landfills.
          </p>
        </Card>

        {/* Metric 3: Water Conserved */}
        <Card hoverEffect className="border-l-4 border-l-teal-500 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Water Conserved
            </span>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-white">{stats.waterSavedLiters}</span>
            <span className="text-xs text-teal-400 font-mono ml-1">Liters</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Saved by recycling paper, metal & plastic vs virgin resource extraction.
          </p>
        </Card>

        {/* Metric 4: Energy Saved */}
        <Card hoverEffect className="border-l-4 border-l-amber-500 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Energy Conserved
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div>
            <span className="text-4xl font-black text-white">{stats.energySavedKwh}</span>
            <span className="text-xs text-amber-400 font-mono ml-1">kWh</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Electricity saved by smelting recycled metal and repulping paper.
          </p>
        </Card>
      </div>

      {/* Equivalents Banner & Tree Absorption Badge */}
      <Card className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Trees className="w-9 h-9 animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Ecological Equivalent Standard
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Equivalent to planting ~{stats.treesSavedEquiv} mature trees
            </h3>
            <p className="text-xs text-slate-300">
              Based on standard forestry metric where 1 mature tree absorbs ~21.8 kg CO₂ annually.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold shrink-0 transition-colors"
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>{showMethodology ? 'Hide Calculation Model' : 'View Calculation Methodology'}</span>
        </button>
      </Card>

      {/* Calculation Methodology Breakdown Box */}
      {showMethodology && (
        <Card className="space-y-4 border-emerald-500/30 bg-slate-900/95 animate-slide-up">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparent Environmental Conversion Factors</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">EPA WARM Reference</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The table below outlines the exact multiplier factors used per 1.0 kg of waste diverted to recycling or composting:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Category Stream</th>
                  <th className="p-2.5">CO₂ Avoided / kg</th>
                  <th className="p-2.5">Water Saved / kg</th>
                  <th className="p-2.5">Energy Saved / kg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold text-emerald-400">Organic Composting</td>
                  <td className="p-2.5">0.85 kg</td>
                  <td className="p-2.5">12.0 L</td>
                  <td className="p-2.5">0.4 kWh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-400">Paper & Cardboard</td>
                  <td className="p-2.5">1.40 kg</td>
                  <td className="p-2.5">26.0 L</td>
                  <td className="p-2.5">4.0 kWh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-sky-400">Rigid Plastics</td>
                  <td className="p-2.5">1.80 kg</td>
                  <td className="p-2.5">15.0 L</td>
                  <td className="p-2.5">5.5 kWh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-300">Metals & Aluminum</td>
                  <td className="p-2.5">3.50 kg</td>
                  <td className="p-2.5">35.0 L</td>
                  <td className="p-2.5">8.5 kWh</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-violet-400">Electronic E-Waste</td>
                  <td className="p-2.5">4.20 kg</td>
                  <td className="p-2.5">45.0 L</td>
                  <td className="p-2.5">12.0 kWh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
