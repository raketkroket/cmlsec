import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onQuote: () => void;
}

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Over CML', href: '#over' },
  { label: 'Contact', href: '#contact' },
];

const legal = [
  { label: 'Algemene Voorwaarden', href: '/algemene-voorwaarden' },
  { label: 'Cookiebeleid', href: '/cookies' },
];

export function Footer({ onQuote }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(45,91,240,0.08),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo className="h-28 w-28" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-steel-300/70">
              Professionele beveiliging op maat voor bedrijven, objecten en evenementen. Altijd paraat,
              altijd afgestemd op uw situatie.
            </p>
            <button
              onClick={onQuote}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 transition-colors duration-300 hover:bg-steel-50"
            >
              Offerte aanvragen
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-label text-steel-400">Navigatie</p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-sm text-steel-200/80 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-label text-steel-400">Juridisch</p>
            <ul className="mt-5 space-y-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-sm text-steel-200/80 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-steel-500">© {new Date().getFullYear()} CML Security B.V. — Alle rechten voorbehouden.</p>
          <p className="text-xs text-steel-500">Veiligheid zonder compromis.</p>
        </div>
      </div>
    </footer>
  );
}
