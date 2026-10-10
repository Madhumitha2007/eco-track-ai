import React from 'react';
import { Database, RotateCcw, Trash2, Info } from 'lucide-react';
import { resetToDemoData, clearAllRecords } from '../utils/storage';

interface DemoBannerProps {
  isDemoActive: boolean;
  onRefresh: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  isDemoActive,
  onRefresh,
  onShowToast
}) => {
  const handleResetDemo = () => {
    resetToDemoData();
    onRefresh();
    onShowToast('Demo Data Restored', 'Pre-populated realistic waste records loaded successfully.', 'success');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all waste records?')) {
      clearAllRecords();
      onRefresh();
      onShowToast('Records Cleared', 'All waste records removed from local storage.', 'info');
    }
  };

  return (
    <div className="bg-slate-900/90 border-b border-amber-500/20 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-300">
          <Database className="w-4 h-4 shrink-0 text-amber-400" />
          <span className="font-semibold">Demo Mode Active:</span>
          <span className="text-slate-300">
            {isDemoActive
              ? 'Showing realistic sample waste data for ForgeHacks evaluation.'
              : 'Using your custom browser LocalStorage records.'}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Demo Records</span>
          </button>

          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
