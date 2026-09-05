import { capabilities } from '@/lib/content';

export function CapabilitiesStrip() {
  const items = [...capabilities, ...capabilities];
  return (
    <section className="relative border-y border-white/8 bg-ink-900/60 py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
          {items.map((c, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-sm font-medium uppercase tracking-label text-steel-300/70">
                {c.label}
              </span>
              <span className="h-1 w-1 rounded-full bg-accent-400/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
