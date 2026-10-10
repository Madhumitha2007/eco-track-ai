import React, { useState } from 'react';
import { 
  Table, 
  PlusCircle, 
  Trash2, 
  Search, 
  Filter, 
  Calendar, 
  RotateCcw, 
  Database,
  ArrowUpDown,
  Download,
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { CategoryId, WasteRecord } from '../../types/waste';
import { WASTE_CATEGORIES } from '../../data/wasteCategories';
import { deleteWasteRecord, resetToDemoData, clearAllRecords } from '../../utils/storage';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface TrackerViewProps {
  records: WasteRecord[];
  onRefresh: () => void;
  onOpenAddModal: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  records,
  onRefresh,
  onOpenAddModal,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'date' | 'title' | 'quantity'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleDelete = (id: string, title: string) => {
    deleteWasteRecord(id);
    onRefresh();
    onShowToast('Record Deleted', `"${title}" has been removed from local storage.`, 'info');
  };

  const handleResetDemo = () => {
    resetToDemoData();
    onRefresh();
    onShowToast('Demo Data Restored', 'Reset to initial sample dataset.', 'success');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all saved waste records?')) {
      clearAllRecords();
      onRefresh();
      onShowToast('All Records Cleared', 'Your waste tracker is now empty.', 'info');
    }
  };

  // Filter & Sort
  const filteredRecords = records
    .filter((r) => {
      if (selectedCategoryFilter !== 'all' && r.category !== selectedCategoryFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        (r.notes && r.notes.toLowerCase().includes(q)) ||
        WASTE_CATEGORIES[r.category]?.name.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let comp = 0;
      if (sortField === 'date') comp = a.date.localeCompare(b.date);
      if (sortField === 'title') comp = a.title.localeCompare(b.title);
      if (sortField === 'quantity') comp = a.quantity - b.quantity;
      return sortOrder === 'asc' ? comp : -comp;
    });

  const totalLoggedWeight = filteredRecords.reduce((acc, r) => acc + (r.unit === 'items' ? r.quantity * 0.25 : r.quantity), 0);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald" icon={<Table className="w-3.5 h-3.5" />}>
              LocalStorage Database
            </Badge>
            <Badge variant="outline">{records.length} Total Entries</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Personal Waste Tracker Log
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track daily household waste, organize by category stream, and audit your recycling progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-glow-sm hover:shadow-glow-md transition-all"
          >
            <PlusCircle className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Add Waste Record</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <Card className="space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left: Search & Category Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search waste logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full sm:w-48 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {(Object.keys(WASTE_CATEGORIES) as CategoryId[]).map((catId) => (
                <option key={catId} value={catId}>
                  {WASTE_CATEGORIES[catId].name}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Quick Database Action Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <button
              onClick={handleResetDemo}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>

            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Quick summary line */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>
            Showing <strong className="text-white">{filteredRecords.length}</strong> of{' '}
            <strong className="text-white">{records.length}</strong> total records
          </span>
          <span className="font-mono text-emerald-400 font-semibold">
            Filtered Total: ~{totalLoggedWeight.toFixed(1)} kg
          </span>
        </div>
      </Card>

      {/* Main Records Table */}
      <Card className="p-0 overflow-hidden">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Waste Records Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No entries match your search criteria or your tracker database is empty.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onOpenAddModal}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Log New Record
              </button>
              <button
                onClick={handleResetDemo}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Load Sample Demo Data
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th
                    className="py-3.5 px-4 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortField('title');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Item Name & Notes</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4">Category Stream</th>
                  <th
                    className="py-3.5 px-4 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortField('quantity');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Quantity</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </th>
                  <th
                    className="py-3.5 px-4 cursor-pointer hover:text-white"
                    onClick={() => {
                      setSortField('date');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Log Date</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredRecords.map((rec) => {
                  const catMeta = WASTE_CATEGORIES[rec.category];
                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors group">
                      {/* Title & Notes */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-100">{rec.title}</div>
                        {rec.notes && <div className="text-[11px] text-slate-400 mt-0.5">{rec.notes}</div>}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <Badge variant={(catMeta?.color as any) || 'slate'} size="sm">
                          {catMeta?.name || rec.category}
                        </Badge>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400">
                        {rec.quantity} {rec.unit}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-300 font-mono">
                        {rec.date}
                      </td>

                      {/* Status / Demo Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {rec.isDemo ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                            Demo
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Saved
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(rec.id, rec.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
