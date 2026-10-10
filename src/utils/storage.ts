import { WasteRecord } from '../types/waste';
import { SAMPLE_RECORDS } from '../data/sampleData';

const STORAGE_KEY = 'ecotrack_ai_records_v1';
const LISTENERS: Set<() => void> = new Set();

export const getStoredRecords = (): WasteRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time initialization with realistic demo data
      saveRecords(SAMPLE_RECORDS);
      return SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_RECORDS;
  } catch (err) {
    console.error('Error reading records from localStorage:', err);
    return SAMPLE_RECORDS;
  }
};

export const saveRecords = (records: WasteRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    notifyListeners();
  } catch (err) {
    console.error('Error saving records to localStorage:', err);
  }
};

export const addWasteRecord = (newRecord: Omit<WasteRecord, 'id' | 'createdAt'>): WasteRecord => {
  const current = getStoredRecords();
  const record: WasteRecord = {
    ...newRecord,
    id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    createdAt: Date.now(),
    isDemo: false
  };
  const updated = [record, ...current];
  saveRecords(updated);
  return record;
};

export const deleteWasteRecord = (id: string): void => {
  const current = getStoredRecords();
  const updated = current.filter(r => r.id !== id);
  saveRecords(updated);
};

export const resetToDemoData = (): void => {
  saveRecords(SAMPLE_RECORDS);
};

export const clearAllRecords = (): void => {
  saveRecords([]);
};

export const subscribeRecordsChange = (callback: () => void): (() => void) => {
  LISTENERS.add(callback);
  return () => LISTENERS.delete(callback);
};

const notifyListeners = (): void => {
  LISTENERS.forEach(cb => cb());
};
