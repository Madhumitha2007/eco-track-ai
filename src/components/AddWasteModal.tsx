import React, { useState } from 'react';
import { PlusCircle, Leaf } from 'lucide-react';
import { CategoryId } from '../types/waste';
import { WASTE_CATEGORIES } from '../data/wasteCategories';
import { addWasteRecord } from '../utils/storage';
import { Modal } from './ui/Modal';

interface AddWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info') => void;
}

export const AddWasteModal: React.FC<AddWasteModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('organic');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<'kg' | 'items'>('items');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addWasteRecord({
      title: title.trim(),
      category,
      quantity: Number(quantity) || 1,
      unit,
      date,
      notes: notes.trim() || undefined
    });

    onSuccess();
    onShowToast('Waste Record Added', `"${title}" has been saved to your local storage.`, 'success');
    
    // Reset form
    setTitle('');
    setCategory('organic');
    setQuantity(1);
    setUnit('items');
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Waste Item"
      subtitle="Record household waste item for classification & eco metrics"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Item Name / Description *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Cardboard boxes, Plastic bottles..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Waste Stream Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryId)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
          >
            {(Object.keys(WASTE_CATEGORIES) as CategoryId[]).map((catId) => (
              <option key={catId} value={catId}>
                {WASTE_CATEGORIES[catId].name} ({WASTE_CATEGORIES[catId].streamName})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Quantity *</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Unit *</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'kg' | 'items')}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="items">Items / Units</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Date Logged *</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Optional Notes
          </label>
          <input
            type="text"
            placeholder="e.g. Deposited at neighborhood glass recycling point"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-glow-sm"
          >
            <PlusCircle className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Save Record</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
