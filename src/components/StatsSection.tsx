import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/content';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

export function StatsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-y border-white/8 bg-ink-900/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref}>
          <SectionLabel>Waarom CML</SectionLabel>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatCell key={s.label} stat={s} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({
  stat,
  index,
  visible,
}: {
  stat: { value: string; label: string };
  index: number;
  visible: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShown(true), index * 120);
    return () => clearTimeout(t);
  }, [visible, index]);

  return (
    <div
      ref={ref}
      className={`group relative min-w-0 bg-ink-900/40 p-8 transition-all duration-700 ease-premium sm:p-10 lg:p-8 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-400/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <p className="break-words font-display text-[1.65rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[1.8rem] xl:text-3xl">
        {stat.value}
      </p>
      <p className="mt-3 text-xs font-medium uppercase tracking-label text-steel-400">
        {stat.label}
      </p>
    </div>
  );
}
