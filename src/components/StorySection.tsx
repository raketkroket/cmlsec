import { useEffect, useRef, useState } from 'react';
import { useScrollProgress, useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

const steps = [
  { k: '24/7', t: 'Altijd beschikbaar', d: 'Wij zijn er wanneer u ons nodig heeft. Dag en nacht, zeven dagen per week.' },
  { k: '01', t: 'Professioneel getrainde beveiligers', d: 'Onze mensen zijn getraind voor hun taak en weten wat er speelt op de locatie.' },
  { k: '02', t: 'Snel reageren op onverwachte situaties', d: 'Bij incidenten handelen wij snel en adequaat, met de juiste afstemming.' },
  { k: '03', t: 'Maatwerk voor iedere locatie', d: 'Geen standaardpakket. Wij stemmen de inzet af op uw object, evenement of organisatie.' },
];

export function StorySection() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const { ref: labelRef, visible } = useReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length * 0.999));
    setActiveStep(idx);
  }, [progress]);

  return (
    <section ref={sectionRef} className="relative bg-ink-950">
      {/* Sticky visual + steps */}
      <div ref={ref} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/17507234/pexels-photo-17507234.jpeg?auto=compress&cs=tinysrgb&w=2000"
              alt="Beveiliger in een donkere omgeving"
              className="h-full w-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/60 to-ink-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(45,91,240,0.12),transparent_55%)]" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left: big number */}
              <div className="lg:col-span-7">
                <div ref={labelRef}>
                  <SectionLabel>24/7 Readiness</SectionLabel>
                </div>
                <div className="relative mt-8 h-[40vh] sm:h-[44vh]">
                  {steps.map((s, i) => (
                    <div
                      key={s.k}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-premium ${
                        i === activeStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                      }`}
                    >
                      <span className="font-display text-[22vw] font-bold leading-none tracking-tightest text-white/95 sm:text-[16vw] lg:text-[12rem]">
                        {s.k}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: steps */}
              <div className="lg:col-span-5 lg:pt-24">
                <div className="space-y-1">
                  {steps.map((s, i) => (
                    <div
                      key={s.k}
                      className={`border-l-2 py-5 pl-5 transition-all duration-500 ease-premium ${
                        i === activeStep
                          ? 'border-accent-400 bg-white/[0.03]'
                          : 'border-white/10 bg-transparent'
                      }`}
                    >
                      <p
                        className={`text-sm font-medium transition-colors duration-300 ${
                          i === activeStep ? 'text-white' : 'text-steel-400'
                        }`}
                      >
                        {s.t}
                      </p>
                      <p
                        className={`mt-1 text-sm leading-relaxed transition-all duration-500 ${
                          i === activeStep ? 'text-steel-200/70 opacity-100' : 'text-steel-400/50 opacity-0'
                        }`}
                      >
                        {s.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer that drives the sticky scroll */}
        <div className="h-[260vh]" />
      </div>

      {/* Closing statement */}
      <div
        className={`mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 transition-all duration-700 ease-premium ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
          ALTIJD PARAAT.
          <br />
          <span className="text-steel-400">Nooit een moment zonder toezicht.</span>
        </p>
      </div>
    </section>
  );
}
