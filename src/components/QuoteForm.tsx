import { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { quoteTypes } from '@/lib/content';
import { validateQuote, buildQuotePayload, type QuoteFormData } from '@/lib/validation';
import { useReveal } from '@/lib/motion';
import { SectionLabel } from './SectionLabel';

type Status = 'idle' | 'loading' | 'success' | 'error';

const empty: QuoteFormData = {
  type: '',
  naam: '',
  bedrijfsnaam: '',
  email: '',
  telefoonnummer: '',
  locatie: '',
  periode: '',
  bericht: '',
  honeypot: '',
};

export function QuoteForm() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [data, setData] = useState<QuoteFormData>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  const update = (field: keyof QuoteFormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateQuote(data);
    setErrors(errs as Record<string, string>);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    setServerError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quote`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(buildQuotePayload(data)),
      });

      if (!res.ok) {
        let msg = `Verzenden mislukt (${res.status}).`;
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch {
          /* ignore parse error */
        }
        throw new Error(msg);
      }

      const json = await res.json();
      if (!json?.ok) throw new Error(json?.error || 'Onverwachte reactie van de server.');

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Er ging iets mis.');
    }
  };

  return (
    <section id="offerte" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Offerte aanvragen</SectionLabel>
            <h2 className="mt-8 font-display text-4xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl">
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  VERTEL ONS
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: '120ms' }}
                >
                  WAT ER BEVEILIGD
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`inline-block transition-transform duration-1000 ease-premium ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ transitionDelay: '240ms' }}
                >
                  MOET WORDEN.
                </span>
              </span>
            </h2>
            <p
              className={`mt-8 max-w-md text-base leading-relaxed text-steel-300/70 transition-all duration-700 ease-premium ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Vul het formulier in en wij nemen zo snel mogelijk contact met u op. Liever direct
              contact? Bel of mail ons.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-6 sm:p-8">
              {status === 'success' ? (
                <SuccessState onReset={() => { setData(empty); setStatus('idle'); }} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Type selector */}
                  <fieldset>
                    <legend className="mb-3 text-xs font-medium uppercase tracking-label text-steel-400">
                      Wat wilt u beveiligd hebben?
                    </legend>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {quoteTypes.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => update('type', t)}
                          className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                            data.type === t
                              ? 'border-accent-400/60 bg-accent-400/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-steel-300 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.type && <FieldError msg={errors.type} />}
                  </fieldset>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Naam"
                      required
                      error={errors.naam}
                    >
                      <input
                        type="text"
                        autoComplete="name"
                        value={data.naam}
                        onChange={(e) => update('naam', e.target.value)}
                        className={inputClass(!!errors.naam)}
                        placeholder="Uw naam"
                      />
                    </Field>
                    <Field label="Bedrijfsnaam">
                      <input
                        type="text"
                        autoComplete="organization"
                        value={data.bedrijfsnaam}
                        onChange={(e) => update('bedrijfsnaam', e.target.value)}
                        className={inputClass(false)}
                        placeholder="Optioneel"
                      />
                    </Field>
                    <Field label="E-mail" required error={errors.email}>
                      <input
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass(!!errors.email)}
                        placeholder="naam@bedrijf.nl"
                      />
                    </Field>
                    <Field label="Telefoonnummer" required error={errors.telefoonnummer}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={data.telefoonnummer}
                        onChange={(e) => update('telefoonnummer', e.target.value)}
                        className={inputClass(!!errors.telefoonnummer)}
                        placeholder="06 12 34 56 78"
                      />
                    </Field>
                    <Field label="Locatie" required error={errors.locatie}>
                      <input
                        type="text"
                        value={data.locatie}
                        onChange={(e) => update('locatie', e.target.value)}
                        className={inputClass(!!errors.locatie)}
                        placeholder="Plaats of regio"
                      />
                    </Field>
                  </div>

                  <Field label="Gewenste periode">
                    <input
                      type="text"
                      value={data.periode}
                      onChange={(e) => update('periode', e.target.value)}
                      className={inputClass(false)}
                      placeholder="Bijv. vanaf volgende maand, permanent, of data"
                    />
                  </Field>

                  <Field label="Bericht" error={errors.bericht}>
                    <textarea
                      rows={4}
                      value={data.bericht}
                      onChange={(e) => update('bericht', e.target.value)}
                      className={inputClass(!!errors.bericht)}
                      placeholder="Vertel ons wat u precies nodig heeft"
                    />
                  </Field>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={data.honeypot}
                    onChange={(e) => update('honeypot', e.target.value)}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  {status === 'error' && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{serverError || 'Er ging iets mis bij het verzenden. Probeer het opnieuw.'}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-steel-50 disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verzenden...
                      </>
                    ) : (
                      <>
                        Offerte aanvragen
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full border border-accent-400/30 bg-accent-400/10">
        <Check className="h-8 w-8 text-accent-300" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-white">Aanvraag verzonden</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-steel-300/75">
        Bedankt voor uw aanvraag. Wij nemen zo snel mogelijk contact met u op.
      </p>
      <button
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
      >
        Nieuwe aanvraag
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-label text-steel-400">
        {label}
        {required && <span className="ml-1 text-accent-300">*</span>}
      </span>
      {children}
      {error && <FieldError msg={error} />}
    </label>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-1.5 text-xs text-red-300/90">{msg}</p>;
}

function inputClass(hasError: boolean): string {
  return `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-400/40 ${
    hasError ? 'border-red-500/40' : 'border-white/10 focus:border-accent-400/50'
  }`;
}
