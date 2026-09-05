import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services, type ServiceSlug } from '@/lib/content';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

interface ServiceShowcaseProps {
  onSelect: (slug: ServiceSlug) => void;
  onQuote: () => void;
}

export function ServiceShowcase({ onSelect, onQuote }: ServiceShowcaseProps) {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();
  const current = services[active];

  return (
    <section id="diensten" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref}>
          <SectionLabel>Diensten</SectionLabel>
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
            Wat wij
            <br />
            voor u bewaken.
          </h2>
        </div>

        {/* Desktop interactive layout */}
        <div className="mt-16 hidden md:block">
          <div className="grid grid-cols-12 gap-10">
            {/* Left: list */}
            <div className="col-span-5 lg:col-span-4">
              <ul className="space-y-1">
                {services.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <li key={s.slug}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => onSelect(s.slug)}
                        className="group flex w-full items-baseline gap-4 border-b border-white/8 py-6 text-left transition-colors duration-300"
                      >
                        <span
                          className={`text-sm font-medium tabular-nums transition-colors duration-300 ${
                            isActive ? 'text-accent-300' : 'text-steel-500'
                          }`}
                        >
                          {s.number}
                        </span>
                        <span
                          className={`font-display text-2xl font-medium transition-all duration-300 lg:text-3xl ${
                            isActive ? 'text-white translate-x-1' : 'text-steel-400'
                          }`}
                        >
                          {s.title}
                        </span>
                        <ArrowUpRight
                          className={`ml-auto h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                            isActive ? 'text-accent-300 opacity-100 translate-x-0' : 'text-steel-500 opacity-0 -translate-x-2'
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: visual */}
            <div className="col-span-7 lg:col-span-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-ink-850">
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    className={`absolute inset-0 transition-all duration-700 ease-premium ${
                      i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(45,91,240,0.14),transparent_60%)]" />
                  </div>
                ))}

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-end justify-between gap-6">
                    <div key={current.slug} className="max-w-md">
                      <p className="text-xs font-medium uppercase tracking-label text-accent-200/80">
                        {current.number} — Dienst
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                        {current.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-steel-200/80">
                        {current.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onSelect(current.slug)}
                      className="group flex flex-shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
                    >
                      Meer weten
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile stacked layout */}
        <div className="mt-12 space-y-6 md:hidden">
          {services.map((s) => (
            <button
              key={s.slug}
              onClick={() => onSelect(s.slug)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-850 text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <span className="absolute left-4 top-4 text-xs font-medium tabular-nums text-accent-200/80">
                  {s.number}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300/75">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-200">
                  Meer weten
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 flex flex-col items-start gap-5 border-t border-white/8 pt-12 transition-all duration-700 ease-premium sm:flex-row sm:items-center sm:justify-between ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="max-w-md text-lg text-steel-200/80">
            Niet zeker welke inzet bij uw situatie past? Wij denken graag met u mee.
          </p>
          <button
            onClick={onQuote}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink-950 transition-colors duration-300 hover:bg-steel-50"
          >
            Offerte aanvragen
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
