export interface QuoteFormData {
  type: string;
  naam: string;
  bedrijfsnaam: string;
  email: string;
  telefoonnummer: string;
  locatie: string;
  periode: string;
  bericht: string;
  honeypot: string;
}

export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+0-9 ()-]{6,}$/;

export function validateQuote(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  if (!data.type) errors.type = 'Kies een type beveiliging.';
  if (!data.naam || data.naam.trim().length < 2) errors.naam = 'Vul uw naam in.';
  if (!data.email || !emailRe.test(data.email)) errors.email = 'Vul een geldig e-mailadres in.';
  if (!data.telefoonnummer || !phoneRe.test(data.telefoonnummer))
    errors.telefoonnummer = 'Vul een geldig telefoonnummer in.';
  if (!data.locatie || data.locatie.trim().length < 2) errors.locatie = 'Vul een locatie in.';
  if (data.bericht && data.bericht.length > 4000) errors.bericht = 'Uw bericht is te lang.';
  if (data.honeypot) errors.honeypot = 'Er is een fout opgetreden.';
  return errors;
}

export function sanitizeText(v: string): string {
  return v.replace(/[<>]/g, '').trim();
}

export function buildQuotePayload(data: QuoteFormData) {
  return {
    type: sanitizeText(data.type),
    naam: sanitizeText(data.naam),
    bedrijfsnaam: sanitizeText(data.bedrijfsnaam),
    email: sanitizeText(data.email),
    telefoonnummer: sanitizeText(data.telefoonnummer),
    locatie: sanitizeText(data.locatie),
    periode: sanitizeText(data.periode),
    bericht: sanitizeText(data.bericht),
  };
}
