import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

interface AboutProps {
  onQuote: () => void;
}

export function About({ onQuote }: AboutProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="over" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image side */}
          <div className="lg:col-span-6">
            <div
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 transition-all duration-1000 ease-premium ${
                visible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            >
              <img
                src="https://images.pexels.com/photos/27831371/pexels-photo-27831371.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professionele beveiliger van CML Security in uniform"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(45,91,240,0.10),transparent_55%)]" />
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-6 lg:pt-6">
            <SectionLabel>Over CML</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  VEILIGHEID BEGINT
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: '120ms' }}
                >
                  BIJ VERTROUWEN.
                </span>
              </span>
            </h2>

            <div
              className={`mt-8 space-y-6 transition-all duration-700 ease-premium ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '260ms' }}
            >
              <p className="text-lg leading-relaxed text-steel-200/85">
                CML Security B.V. werkt nauw samen met opdrachtgevers om een beveiligingsplan te
                creëren dat past bij hun specifieke situatie. Geen standaardoplossing, maar een
                doordachte aanpak die uitgaat van uw object, uw evenement en uw mensen.
              </p>
              <p className="text-base leading-relaxed text-steel-300/70">
                Wij geloven dat goede beveiliging begint met luisteren. Door te begrijpen wat er speelt,
                kunnen wij de juiste mensen op de juiste plek inzetten. Met oog voor detail en oog voor
                het grotere plaatje.
              </p>

              <button
                onClick={onQuote}
                className="group mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Meer over CML
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
