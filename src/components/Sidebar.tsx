import React from 'react';
import { LayoutDashboard, ScanLine, BookOpen, Table, LineChart, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'classifier', label: 'Waste Classifier', icon: ScanLine, badge: 'AI Demo' },
  { id: 'guide', label: 'Disposal Guide', icon: BookOpen, badge: null },
  { id: 'tracker', label: 'Waste Tracker', icon: Table, badge: null },
  { id: 'impact', label: 'Eco Impact', icon: LineChart, badge: 'EPA Model' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const handleSelect = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={clsx(
          'fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-slate-950 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <p className="px-3 text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Main Menu
            </p>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={clsx(
                      'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group',
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-glow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={clsx(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Hackathon Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>ForgeHacks 2026</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Built for environmental action & waste reduction. 100% Client-Side privacy.
          </p>
        </div>
      </aside>
    </>
  );
};
