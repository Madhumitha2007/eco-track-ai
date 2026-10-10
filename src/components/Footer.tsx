import React from 'react';
import { Leaf, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200">EcoTrack AI</span>
          <span>— Engineered for ForgeHacks 2026</span>
        </div>

        {/* Info & Tech */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-sky-400" /> React 18 + TypeScript + Vite + Tailwind
          </span>
          <span>•</span>
          <span>Local Browser Persistence</span>
          <span>•</span>
          <span>No Paid APIs Required</span>
        </div>

        {/* Disclaimer */}
        <div className="text-center md:text-right text-[11px] text-slate-400 max-w-xs">
          Environmental impact stats are transparent estimates based on EPA WARM conversion metrics for demo purposes.
        </div>
      </div>
    </footer>
  );
};
