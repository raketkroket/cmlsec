import { useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/content';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActive(i);
    }
  };

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8" ref={ref}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Ervaring</SectionLabel>
            <h2 className="mt-8 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
              Wat opdrachtgevers
              <br />
              zeggen over CML.
            </h2>
          </div>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Referentie ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-accent-400' : 'w-2 bg-white/15 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div
          className={`mt-14 transition-all duration-700 ease-premium ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="flex w-[88vw] flex-shrink-0 snap-center flex-col justify-between rounded-2xl border border-white/8 bg-ink-900/60 p-8 sm:w-[30rem] sm:p-10"
              >
                <Quote className="h-8 w-8 text-accent-400/60" />
                <p className="mt-6 font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                  "{t.quote}"
                </p>
                <div className="mt-8 border-t border-white/8 pt-5">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-steel-400">{t.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
