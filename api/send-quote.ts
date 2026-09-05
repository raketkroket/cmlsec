import type { VercelRequest, VercelResponse } from '@vercel/node';

interface QuotePayload {
  type?: string;
  naam?: string;
  bedrijfsnaam?: string;
  email?: string;
  telefoonnummer?: string;
  locatie?: string;
  periode?: string;
  bericht?: string;
  honeypot?: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+0-9 ()-]{6,}$/;

function sanitize(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[<>]/g, '').trim().slice(0, 4000) : '';
}

function validate(data: QuotePayload): string | null {
  if (data.honeypot) return 'Spam gedetecteerd.';
  if (!data.type) return 'Kies een type beveiliging.';
  if (!data.naam || data.naam.length < 2) return 'Vul uw naam in.';
  if (!data.email || !emailRe.test(data.email)) return 'Vul een geldig e-mailadres in.';
  if (!data.telefoonnummer || !phoneRe.test(data.telefoonnummer)) return 'Vul een geldig telefoonnummer in.';
  if (!data.locatie || data.locatie.length < 2) return 'Vul een locatie in.';
  if (data.bericht && data.bericht.length > 4000) return 'Uw bericht is te lang.';
  return null;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function emailHeader(title: string, logoUrl: string): string {
  return `<tr><td style="padding:28px 40px;border-bottom:1px solid #1C2230">
    <a href="https://cmlsecurity.nl" style="display:inline-block;text-decoration:none">
      <img src="${escapeHtml(logoUrl)}" alt="CML Security B.V." width="72" style="display:block;width:72px;height:auto;border:0;outline:none;text-decoration:none" />
    </a>
    <h1 style="margin:20px 0 0;font-size:24px;font-weight:600;line-height:1.25;color:#F4F6FB">${escapeHtml(title)}</h1>
  </td></tr>`;
}

function emailShell(content: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#050607;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050607;min-height:100%"><tr><td align="center" style="padding:40px 20px">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#090B0F;border:1px solid #1C2230;border-radius:16px;overflow:hidden">${content}</table>
  </td></tr></table></body></html>`;
}

function buildInternalEmail(data: QuotePayload, logoUrl: string): string {
  const rows = [
    ['Type', data.type], ['Naam', data.naam], ['Bedrijfsnaam', data.bedrijfsnaam], ['E-mail', data.email],
    ['Telefoonnummer', data.telefoonnummer], ['Locatie', data.locatie], ['Gewenste periode', data.periode], ['Bericht', data.bericht],
  ].map(([label, value]) => `<tr><td style="padding:8px 16px;border-bottom:1px solid #1C2230;color:#7C8CAE;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 16px;border-bottom:1px solid #1C2230;color:#E6EAF3;font-size:14px;vertical-align:top">${escapeHtml(value ?? '')}</td></tr>`).join('');

  return emailShell(`${emailHeader('Nieuwe offerte-aanvraag', logoUrl)}<tr><td style="padding:24px 40px 8px"><table width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr><tr><td style="padding:24px 40px 32px"><p style="margin:0;font-size:13px;color:#5A6B8F">Deze aanvraag is verzonden via het contactformulier op cmlsecurity.nl</p></td></tr>`);
}

function buildConfirmationEmail(data: QuotePayload, logoUrl: string): string {
  const name = escapeHtml(data.naam ?? '');
  return emailShell(`${emailHeader('Wij hebben uw aanvraag ontvangen', logoUrl)}<tr><td style="padding:32px 40px"><p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Beste ${name},</p><p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Bedankt voor uw aanvraag. Wij hebben uw gegevens ontvangen en nemen zo snel mogelijk contact met u op om de mogelijkheden te bespreken.</p><p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Heeft u tussentijds vragen? Neem gerust contact met ons op.</p><p style="margin:0;font-size:15px;color:#C9D1E3;line-height:1.6">Met vriendelijke groet,<br><strong style="color:#F4F6FB">CML Security B.V.</strong></p></td></tr><tr><td style="padding:24px 40px 32px;border-top:1px solid #1C2230"><p style="margin:0;font-size:13px;color:#5A6B8F">Dit is een automatische bevestiging. U hoeft niet te reageren op deze e-mail.</p></td></tr>`);
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>): Promise<Response> {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const raw = req.body ?? {};
  const data: QuotePayload = {
    type: sanitize(raw.type), naam: sanitize(raw.naam), bedrijfsnaam: sanitize(raw.bedrijfsnaam), email: sanitize(raw.email),
    telefoonnummer: sanitize(raw.telefoonnummer), locatie: sanitize(raw.locatie), periode: sanitize(raw.periode), bericht: sanitize(raw.bericht),
    honeypot: typeof raw.honeypot === 'string' ? raw.honeypot : '',
  };
  const validationError = validate(data);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const notifyEmail = process.env.CML_NOTIFY_EMAIL;
  const logoUrl = process.env.CML_LOGO_URL || 'https://cmlsecurity.nl/assets/images/LOGO.png';
  if (!apiKey || !fromEmail || !notifyEmail) {
    res.status(503).json({ error: 'De e-mailservice is nog niet geconfigureerd. Neem contact op met CML Security.' });
    return;
  }

  try {
    const [internalResponse, confirmationResponse] = await Promise.all([
      sendEmail(apiKey, { from: `CML Security <${fromEmail}>`, to: [notifyEmail], reply_to: data.email, subject: `Nieuwe offerte-aanvraag - ${data.naam}`, html: buildInternalEmail(data, logoUrl) }),
      sendEmail(apiKey, { from: `CML Security <${fromEmail}>`, to: [data.email], subject: 'Uw aanvraag bij CML Security B.V.', html: buildConfirmationEmail(data, logoUrl) }),
    ]);
    if (!internalResponse.ok) {
      console.error('Internal email failed:', await internalResponse.text());
      res.status(502).json({ error: 'Het verzenden van de aanvraag is mislukt. Probeer het later opnieuw.' });
      return;
    }
    if (!confirmationResponse.ok) console.warn('Confirmation email failed:', await confirmationResponse.text());
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('send-quote error:', error);
    res.status(500).json({ error: 'Er ging iets mis bij het verwerken van uw aanvraag.' });
  }
}