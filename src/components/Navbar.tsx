import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useMagnetic } from '@/lib/motion';

interface NavbarProps {
  onQuote: () => void;
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Over CML', href: '#over' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const ctaRef = useMagnetic<HTMLButtonElement>(0.25);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-premium ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav
            className={`flex items-center justify-between rounded-full transition-all duration-700 ease-premium ${
              scrolled
                ? 'border border-white/8 bg-ink-900/70 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] px-4 py-2.5'
                : 'border border-transparent px-2 py-1'
            }`}
          >
            <a href="#home" aria-label="CML Security B.V. — home" className="flex shrink-0 items-center">
              <Logo
                className={`h-16 w-16 transition-all duration-700 ease-premium sm:h-[4.5rem] sm:w-[4.5rem] ${
                  scrolled ? 'md:h-14 md:w-14' : 'md:h-[4.5rem] md:w-[4.5rem]'
                }`}
              />
            </a>

            <div className="hidden md:flex items-center gap-9">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="link-underline text-sm font-medium text-steel-200/80 hover:text-white transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                ref={ctaRef}
                onClick={onQuote}
                className="magnetic hidden sm:inline-flex items-center gap-2 rounded-full bg-white pl-5 pr-3 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-steel-50 group"
              >
                Offerte aanvragen
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </button>

              <button
                onClick={() => setOpen(true)}
                aria-label="Menu openen"
                className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onQuote={onQuote} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onQuote,
}: {
  open: boolean;
  onClose: () => void;
  onQuote: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ease-premium ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-ink-950/80 backdrop-blur-md transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-ink-900 border-l border-white/8 transition-transform duration-500 ease-premium ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <Logo className="h-16 w-16" />
          <button
            onClick={onClose}
            aria-label="Menu sluiten"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="group flex items-center justify-between border-b border-white/5 py-5 text-2xl font-medium text-steel-100 transition-colors hover:text-white"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(12px)',
                transitionProperty: 'opacity, transform, color',
                transitionDuration: '500ms',
              }}
            >
              {l.label}
              <ArrowRight className="h-5 w-5 -rotate-45 text-steel-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-0" />
            </a>
          ))}
        </nav>

        <div className="px-6">
          <button
            onClick={() => {
              onClose();
              onQuote();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-ink-950"
          >
            Offerte aanvragen
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
