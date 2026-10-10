import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        hoverEffect && 'glass-panel-hover hover:-translate-y-1',
        glow && 'border-emerald-500/30 shadow-glow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
