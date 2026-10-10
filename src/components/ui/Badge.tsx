import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'sky' | 'teal' | 'slate' | 'violet' | 'rose' | 'outline' | 'demo';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  className,
  icon
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sky: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    teal: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    slate: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    outline: 'bg-transparent text-slate-300 border-slate-700',
    demo: 'bg-amber-400/10 text-amber-300 border-amber-400/40 font-mono text-[11px] tracking-wide'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 rounded-xl gap-2 font-semibold'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center border transition-all shadow-sm',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="inline-block shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
