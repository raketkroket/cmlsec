import type { ReactNode } from 'react';
import { useReveal } from '@/lib/motion';

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 transition-all duration-700 ease-premium ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${className}`}
    >
      <span className="h-px w-8 bg-accent-400/70" />
      <span className="text-xs font-medium uppercase tracking-label text-steel-300">{children}</span>
    </div>
  );
}
