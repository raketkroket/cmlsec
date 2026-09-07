import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

const steps = [
  { k: '24/7', t: 'Altijd beschikbaar', d: 'Wij zijn er wanneer u ons nodig heeft. Dag en nacht, zeven dagen per week.' },
  { k: '01', t: 'Professioneel getrainde beveiligers', d: 'Onze mensen zijn getraind voor hun taak en weten wat er speelt op de locatie.' },
  { k: '02', t: 'Snel reageren op onverwachte situaties', d: 'Bij incidenten handelen wij snel en adequaat, met de juiste afstemming.' },
  { k: '03', t: 'Maatwerk voor iedere locatie', d: 'Geen standaardpakket. Wij stemmen de inzet af op uw object, evenement of organisatie.' },
];

export function StorySection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-y border-white/8 bg-ink-900/35 py-24 sm:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-5 transition-all duration-700 ease-premium sm:px-8 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>24/7 paraatheid</SectionLabel>
            <p className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl">
              ALTIJD PARAAT.<br />
              <span className="text-steel-400">Nooit een moment zonder toezicht.</span>
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {steps.map((step) => (
              <article key={step.k} className="border-t border-white/10 pt-4">
                <p className="font-display text-2xl font-semibold text-accent-300">{step.k}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300/75">{step.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
