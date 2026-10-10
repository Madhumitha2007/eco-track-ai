import React, { useState } from 'react';
import { 
  Recycle, 
  Leaf, 
  AlertTriangle, 
  Package, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2,
  PlusCircle,
  Zap
} from 'lucide-react';
import { WasteRecord } from '../../types/waste';
import { calculateEcoStats, getCategoryDistribution } from '../../utils/ecoCalculators';
import { ECO_TIPS } from '../../data/ecoTips';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CategoryDonutChart, CategoryBarChart } from '../ui/Charts';
import { WASTE_CATEGORIES } from '../../data/wasteCategories';

interface DashboardViewProps {
  records: WasteRecord[];
  onNavigate: (tab: string) => void;
  onOpenAddModal: () => void;
  onSelectCategoryForClassifier: (catId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  onNavigate,
  onOpenAddModal,
  onSelectCategoryForClassifier
}) => {
  const stats = calculateEcoStats(records);
  const distribution = getCategoryDistribution(records);

  // Daily tip state
  const [tipIndex, setTipIndex] = useState(0);
  const currentTip = ECO_TIPS[tipIndex % ECO_TIPS.length];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % ECO_TIPS.length);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl p-8 overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart Environmental Waste Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Keep your planet clean with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              EcoTrack AI
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Classify household waste, follow localized disposal rules, track recycling habits, and monitor your estimated environmental impact in real time.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('classifier')}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Classify Waste Now</span>
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
            >
              <span>Explore Disposal Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Items */}
        <Card hoverEffect glow className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Items Logged
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{stats.totalItemsCount}</span>
            <span className="text-xs text-slate-400 ml-2 font-mono">({stats.totalWeightKg} kg total)</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Saved in browser LocalStorage</span>
          </div>
        </Card>

        {/* Card 2: Recyclable % */}
        <Card hoverEffect className="border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Recyclable Items
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Recycle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{stats.recyclablePercentage}%</span>
            <span className="text-xs text-slate-400 ml-2 font-mono">of total waste</span>
          </div>
          <div className="mt-2 text-[11px] text-sky-400 font-medium">
            Diverted into blue/yellow stream
          </div>
        </Card>

        {/* Card 3: Organic Waste % */}
        <Card hoverEffect className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Organic Waste
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{stats.organicPercentage}%</span>
            <span className="text-xs text-slate-400 ml-2 font-mono">compostable</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400 font-medium">
            Suitable for green bin / home compost
          </div>
        </Card>

        {/* Card 4: Special Disposal Items */}
        <Card hoverEffect className="border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Special Handling
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{stats.specialDisposalCount}</span>
            <span className="text-xs text-slate-400 ml-2 font-mono">hazardous/e-waste</span>
          </div>
          <div className="mt-2 text-[11px] text-rose-400 font-medium">
            Requires dedicated drop-off center
          </div>
        </Card>
      </div>

      {/* Main Charts & Daily Tip Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Breakdown Charts */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Waste Breakdown by Category</h2>
              <p className="text-xs text-slate-400">Distribution of logged waste materials</p>
            </div>
            <button
              onClick={() => onNavigate('tracker')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <CategoryDonutChart data={distribution} />
        </Card>

        {/* Daily Eco Tip Card */}
        <Card className="flex flex-col justify-between bg-gradient-to-b from-slate-900 to-emerald-950/40 border-emerald-500/30">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Zap className="w-4 h-4" />
                <h3 className="font-bold text-sm text-slate-100">Daily Eco Tip</h3>
              </div>
              <Badge variant="emerald" size="sm">
                {currentTip.impactTag}
              </Badge>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {currentTip.category}
              </p>
              <p className="text-sm font-semibold text-slate-200 leading-snug">
                "{currentTip.tip}"
              </p>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Actionable Step:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentTip.actionableStep}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Tip {tipIndex + 1} of {ECO_TIPS.length}</span>
            <button
              onClick={handleNextTip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Eco Tip</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Category Classification Shortcuts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Quick Classification Lookup</h2>
            <p className="text-xs text-slate-400">Select any standard waste stream to inspect disposal rules instantly</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.values(WASTE_CATEGORIES).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategoryForClassifier(cat.id)}
              className={`${cat.bgColor} border ${cat.borderColor} p-3.5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 hover:brightness-110 flex flex-col items-center text-center space-y-2 group`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 leading-tight">{cat.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{cat.streamName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Table Snapshot */}
      <Card>
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Recent Waste Log Activity</h3>
            <p className="text-xs text-slate-400">Latest entries recorded in local browser memory</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Record</span>
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Manage All
            </button>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">No waste records logged yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Item Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Stream</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {records.slice(0, 4).map((rec) => {
                  const catMeta = WASTE_CATEGORIES[rec.category];
                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-200">
                        {rec.title}
                        {rec.isDemo && (
                          <span className="ml-2 text-[10px] text-amber-400 font-mono">[Demo]</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={(catMeta?.color as any) || 'slate'} size="sm">
                          {catMeta?.name || rec.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300">
                        {rec.quantity} {rec.unit}
                      </td>
                      <td className="py-3 px-3 text-slate-400">{rec.date}</td>
                      <td className="py-3 px-3 text-right text-slate-400 font-medium">
                        {catMeta?.streamName || 'General Trash'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
