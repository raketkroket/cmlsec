import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

export function Introduction() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel>CML Security</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  BEVEILIGING DIE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: '120ms' }}
                >
                  VOORUIT DENKT.
                </span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <div
              className={`space-y-6 transition-all duration-700 ease-premium ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '260ms' }}
            >
              <p className="text-lg leading-relaxed text-steel-200/85">
                CML Security B.V. is een professioneel beveiligingsbedrijf dat veiligheid levert op
                maat. Wij werken nauw samen met opdrachtgevers om een beveiligingsplan te creëren dat
                past bij hun object, evenement of organisatie.
              </p>
              <p className="text-base leading-relaxed text-steel-300/70">
                Van permanente objectbeveiliging tot mobiele surveillance, van evenementen tot
                toegangscontrole. Wat u ook beveiligt, wij zorgen voor rust, overzicht en de juiste
                inzet op het juiste moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
