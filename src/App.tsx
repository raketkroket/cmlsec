import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CapabilitiesStrip } from '@/components/CapabilitiesStrip';
import { Introduction } from '@/components/Introduction';
import { ServiceShowcase } from '@/components/ServiceShowcase';
import { StorySection } from '@/components/StorySection';
import { StatsSection } from '@/components/StatsSection';
import { About } from '@/components/About';
import { Testimonials } from '@/components/Testimonials';
import { QuoteForm } from '@/components/QuoteForm';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  const openQuote = () => {
    setQuoteOpen(true);
  };

  const closeQuote = () => {
    setQuoteOpen(false);
  };

  // Scroll to the quote section when requested
  const scrollToQuote = () => {
    const el = document.getElementById('offerte');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      openQuote();
    }
  };

  const handleServiceSelect = () => {
    // Service detail pages would be built here; for now, scroll to quote
    scrollToQuote();
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuote();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="grain relative min-h-screen bg-ink-950">
      <Navbar onQuote={scrollToQuote} />

      <main>
        <Hero onQuote={scrollToQuote} />
        <CapabilitiesStrip />
        <Introduction />
        <ServiceShowcase onSelect={handleServiceSelect} onQuote={scrollToQuote} />
        <StorySection />
        <StatsSection />
        <About onQuote={scrollToQuote} />
        <Testimonials />
        <QuoteForm />
        <Contact />
      </main>

      <Footer onQuote={scrollToQuote} />

      {/* quoteOpen is currently used as a scroll target rather than a modal,
          but we keep the state for potential modal expansion */}
      {quoteOpen ? null : null}
    </div>
  );
}

export default App;
