import React, { useState } from 'react';
import { CategoryId } from '../../types/waste';
import { WASTE_CATEGORIES } from '../../data/wasteCategories';

interface ChartDataItem {
  category: CategoryId;
  name: string;
  count: number;
  weight: number;
  color: string;
}

interface CategoryChartsProps {
  data: ChartDataItem[];
}

const COLOR_HEX_MAP: Record<string, string> = {
  emerald: '#10b981',
  amber: '#f59e0b',
  sky: '#0284c7',
  teal: '#14b8a6',
  slate: '#64748b',
  violet: '#8b5cf6',
  rose: '#f43f5e'
};

export const CategoryDonutChart: React.FC<CategoryChartsProps> = ({ data }) => {
  const [activeItem, setActiveItem] = useState<ChartDataItem | null>(null);
  
  const totalCount = data.reduce((acc, curr) => acc + curr.count, 0);

  if (totalCount === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl p-6">
        <span className="text-3xl mb-2">📊</span>
        <p className="text-sm font-medium">No waste records logged yet</p>
        <p className="text-xs text-slate-600 mt-1">Log an item or click "Load Demo Data" above</p>
      </div>
    );
  }

  // Calculate SVG Pie Segments
  let cumulativeAngle = 0;
  const size = 200;
  const radius = 70;
  const strokeWidth = 26;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const slices = data
    .filter(item => item.count > 0)
    .map(item => {
      const percentage = (item.count / totalCount) * 100;
      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((cumulativeAngle / 360) * circumference);
      
      const angle = (item.count / totalCount) * 360;
      cumulativeAngle += angle;

      const hex = COLOR_HEX_MAP[item.color] || '#10b981';

      return {
        ...item,
        percentage: Math.round(percentage),
        strokeDasharray,
        strokeDashoffset,
        hex
      };
    });

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
      {/* SVG Donut */}
      <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90 overflow-visible">
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {slices.map((slice) => (
            <circle
              key={slice.category}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={slice.hex}
              strokeWidth={activeItem?.category === slice.category ? strokeWidth + 6 : strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              className="transition-all duration-300 cursor-pointer hover:opacity-90"
              onMouseEnter={() => setActiveItem(slice)}
              onMouseLeave={() => setActiveItem(null)}
            />
          ))}
        </svg>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-slate-100">
            {activeItem ? activeItem.count : totalCount}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            {activeItem ? activeItem.name : 'Total Items'}
          </span>
        </div>
      </div>

      {/* Legend List */}
      <div className="flex-1 w-full space-y-2.5">
        {data.map(item => {
          const hex = COLOR_HEX_MAP[item.color] || '#10b981';
          const pct = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
          return (
            <div
              key={item.category}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                activeItem?.category === item.category
                  ? 'bg-slate-800/90 border-slate-700'
                  : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/40'
              }`}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-xs font-medium text-slate-200">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{item.weight} kg</span>
                <span className="text-xs font-bold text-slate-200 min-w-[2.5rem] text-right">
                  {pct}% ({item.count})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryBarChart: React.FC<CategoryChartsProps> = ({ data }) => {
  const maxWeight = Math.max(...data.map(d => d.weight), 1);

  return (
    <div className="space-y-3 py-2">
      {data.map((item) => {
        const hex = COLOR_HEX_MAP[item.color] || '#10b981';
        const pctWidth = Math.round((item.weight / maxWeight) * 100);

        return (
          <div key={item.category} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">{item.name}</span>
              <span className="text-slate-400 font-mono">{item.weight} kg ({item.count} items)</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(pctWidth, 3)}%`,
                  backgroundColor: hex
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
