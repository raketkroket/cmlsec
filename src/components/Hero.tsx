import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useMagnetic } from '@/lib/motion';

interface HeroProps {
  onQuote: () => void;
}

export function Hero({ onQuote }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const primaryRef = useMagnetic<HTMLButtonElement>(0.2);
  const secondaryRef = useMagnetic<HTMLAnchorElement>(0.2);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // subtle parallax on the background as user scrolls past hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const bg = el.querySelector('[data-hero-bg]') as HTMLElement | null;
        if (bg) bg.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1 + y * 0.0004})`;
        const content = el.querySelector('[data-hero-content]') as HTMLElement | null;
        if (content) {
          const op = Math.max(0, 1 - y / 600);
          content.style.opacity = String(op);
          content.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden sm:min-h-[640px]">
      {/* Background image */}
      <div data-hero-bg className="absolute inset-0 will-change-transform">
        <img
          src="https://images.pexels.com/photos/29935587/pexels-photo-29935587.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Beveiliger bij een verlicht kantoorgebouw in de nacht"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(45,91,240,0.12),transparent_55%)] animate-ambient" />
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div
            className={`max-w-4xl transition-all duration-1000 ease-premium ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`mb-6 flex items-center gap-3 transition-all duration-700 ease-premium ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              style={{ transitionDelay: '120ms' }}
            >
              <span className="h-px w-10 bg-accent-400/70" />
              <span className="text-xs font-medium uppercase tracking-label text-steel-300">
                CML Security B.V.
              </span>
            </div>

            <h1 className="font-display text-5xl font-semibold leading-[0.92] tracking-tightest text-white min-[375px]:text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {['VEILIGHEID', 'ZONDER', 'COMPROMIS.'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <span
                    className={`inline-block transition-transform duration-1000 ease-premium ${
                      mounted ? 'translate-y-0' : 'translate-y-full'
                    }`}
                    style={{ transitionDelay: `${260 + i * 130}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className={`mt-8 max-w-xl text-base leading-relaxed text-steel-200/80 transition-all duration-700 ease-premium sm:text-lg ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '760ms' }}
            >
              CML Security levert professionele beveiligingsoplossingen op maat voor bedrijven,
              objecten en evenementen. Altijd paraat, altijd afgestemd op uw situatie.
            </p>

            <div
              className={`mt-10 flex flex-col gap-4 sm:flex-row sm:items-center transition-all duration-700 ease-premium ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '920ms' }}
            >
              <button
                ref={primaryRef}
                onClick={onQuote}
                className="magnetic group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink-950 transition-colors duration-300 hover:bg-steel-50"
              >
                Offerte aanvragen
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </button>
              <a
                ref={secondaryRef}
                href="#diensten"
                className="magnetic group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
              >
                Ontdek onze diensten
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-label text-steel-400">Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-scrollHint text-steel-400" />
      </div>
    </section>
  );
}
