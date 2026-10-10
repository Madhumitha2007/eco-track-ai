import React, { useState, useEffect } from 'react';
import { CategoryId, WasteRecord } from './types/waste';
import { getStoredRecords, subscribeRecordsChange } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoBanner } from './components/DemoBanner';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/ui/Toast';
import { AddWasteModal } from './components/AddWasteModal';

import { DashboardView } from './components/views/DashboardView';
import { ClassifierView } from './components/views/ClassifierView';
import { DisposalGuideView } from './components/views/DisposalGuideView';
import { TrackerView } from './components/views/TrackerView';
import { EcoImpactView } from './components/views/EcoImpactView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modal & Toast state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedClassifierCategory, setSelectedClassifierCategory] = useState<CategoryId>('organic');

  // Load records & sync
  const refreshRecords = () => {
    setRecords(getStoredRecords());
  };

  useEffect(() => {
    refreshRecords();
    const unsubscribe = subscribeRecordsChange(() => {
      refreshRecords();
    });
    return unsubscribe;
  }, []);

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectCategoryForClassifier = (catId: string) => {
    setSelectedClassifierCategory(catId as CategoryId);
    setActiveTab('classifier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDemoActive = records.some((r) => r.isDemo);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Top Banner indicating active Demo dataset */}
      <DemoBanner
        isDemoActive={isDemoActive}
        onRefresh={refreshRecords}
        onShowToast={addToast}
      />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        totalRecordsCount={records.length}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView
              records={records}
              onNavigate={setActiveTab}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onSelectCategoryForClassifier={handleSelectCategoryForClassifier}
            />
          )}

          {activeTab === 'classifier' && (
            <ClassifierView
              initialCategoryId={selectedClassifierCategory}
              onRecordAdded={refreshRecords}
              onShowToast={addToast}
              onNavigateToTracker={() => setActiveTab('tracker')}
            />
          )}

          {activeTab === 'guide' && (
            <DisposalGuideView
              onSelectCategory={handleSelectCategoryForClassifier}
            />
          )}

          {activeTab === 'tracker' && (
            <TrackerView
              records={records}
              onRefresh={refreshRecords}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onShowToast={addToast}
            />
          )}

          {activeTab === 'impact' && (
            <EcoImpactView records={records} />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Add Waste Modal */}
      <AddWasteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refreshRecords}
        onShowToast={addToast}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
