import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Info, 
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  Leaf
} from 'lucide-react';
import { CategoryId } from '../../types/waste';
import { WASTE_CATEGORIES } from '../../data/wasteCategories';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DisposalGuideViewProps {
  onSelectCategory: (catId: CategoryId) => void;
}

export const DisposalGuideView: React.FC<DisposalGuideViewProps> = ({ onSelectCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryId>('all');

  const categories = Object.values(WASTE_CATEGORIES);

  // Filter categories and search items
  const filteredCategories = categories.filter((cat) => {
    if (activeFilter !== 'all' && cat.id !== activeFilter) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.examples.some((ex) => ex.toLowerCase().includes(q)) ||
      cat.streamName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Municipal Disposal Directory
          </Badge>
          <Badge variant="outline">Updated Guidelines</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          Smart Waste Disposal & Recycling Guide
        </h1>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Learn how to properly separate, prepare, and dispose of household items to maximize recycling rates and protect sanitation workers.
        </p>
      </div>

      {/* CRITICAL SAFETY WARNING BANNER */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-500/50 p-6 rounded-2xl shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                Critical Hazard Warning: DO NOT Bin Batteries or Hazardous Waste!
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Lithium batteries, electronic circuit boards, paints, pesticides, motor oil, and fluorescent lamps pose extreme fire hazards and toxic contamination when thrown into regular curbside garbage or blue recycling bins.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-lg border border-rose-500/30">
                🚫 Batteries spark facility fires
              </span>
              <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-lg border border-rose-500/30">
                🚫 Liquids contaminate paper pulp
              </span>
              <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-lg border border-rose-500/30">
                🚫 Heavy metals poison groundwater
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items (e.g. pizza box, battery, bottle)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Streams ({categories.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Cards Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => (
          <Card
            key={cat.id}
            hoverEffect
            className={`space-y-5 border-l-4 ${cat.borderColor} flex flex-col justify-between`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.bgColor} flex items-center justify-center text-emerald-400`}>
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{cat.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400">{cat.streamName}</p>
                  </div>
                </div>

                {cat.isSpecialDisposal ? (
                  <Badge variant="rose" size="sm">
                    Hazardous Dropoff
                  </Badge>
                ) : (
                  <Badge variant="emerald" size="sm">
                    Curbside Accepted
                  </Badge>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{cat.description}</p>

              {/* Examples */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Accepted Materials:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {cat.examples.join(', ')}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Disposal Steps & Best Practices:
                </span>
                <ul className="space-y-1.5">
                  {cat.disposalInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">ID: {cat.id}</span>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Classify in Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
