import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

export function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
              Neem direct
              <br />
              contact op.
            </h2>
            <p
              className={`mt-8 max-w-md text-base leading-relaxed text-steel-300/70 transition-all duration-700 ease-premium ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Liever persoonlijk contact? Wij staan klaar om uw vraag te beantwoorden en de juiste
              inzet te bespreken.
            </p>

            <div className="mt-10 space-y-5">
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Adres" value="CML Security B.V." sub="Nederland" />
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Telefoon" value="Bel ons direct" />
              <ContactRow icon={<Mail className="h-5 w-5" />} label="E-mail" value="info@cmlsecurity.nl" />
              <ContactRow icon={<Clock className="h-5 w-5" />} label="Bereikbaar" value="24/7 — altijd paraat" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-white/8 bg-ink-850">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(45,91,240,0.10),transparent_60%)]" />
              <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                <p className="text-xs font-medium uppercase tracking-label text-accent-200/80">
                  CML Security B.V.
                </p>
                <p className="mt-4 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                  Veiligheid begint met een gesprek.
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-steel-300/70">
                  Vertel ons wat u beveiligd wilt hebben. Wij zetten de juiste mensen en middelen
                  in voor uw situatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-white/8 pb-5">
      <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-accent-300">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-label text-steel-400">{label}</p>
        <p className="mt-1 text-base font-medium text-white">{value}</p>
        {sub && <p className="text-sm text-steel-400">{sub}</p>}
      </div>
    </div>
  );
}
