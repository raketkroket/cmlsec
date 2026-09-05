const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

function sanitize(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.replace(/[<>]/g, "").trim().slice(0, 4000);
}

function validate(data: QuotePayload): string | null {
  if (data.honeypot) return "Spam gedetecteerd.";
  if (!data.type) return "Kies een type beveiliging.";
  if (!data.naam || data.naam.trim().length < 2) return "Vul uw naam in.";
  if (!data.email || !emailRe.test(data.email)) return "Vul een geldig e-mailadres in.";
  if (!data.telefoonnummer || !phoneRe.test(data.telefoonnummer))
    return "Vul een geldig telefoonnummer in.";
  if (!data.locatie || data.locatie.trim().length < 2) return "Vul een locatie in.";
  if (data.bericht && data.bericht.length > 4000) return "Uw bericht is te lang.";
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInternalEmail(d: QuotePayload): string {
  const rows = [
    ["Type", d.type ?? ""],
    ["Naam", d.naam ?? ""],
    ["Bedrijfsnaam", d.bedrijfsnaam ?? ""],
    ["E-mail", d.email ?? ""],
    ["Telefoonnummer", d.telefoonnummer ?? ""],
    ["Locatie", d.locatie ?? ""],
    ["Gewenste periode", d.periode ?? ""],
    ["Bericht", d.bericht ?? ""],
  ];
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px;border-bottom:1px solid #1C2230;color:#7C8CAE;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(
          label
        )}</td><td style="padding:8px 16px;border-bottom:1px solid #1C2230;color:#E6EAF3;font-size:14px;vertical-align:top">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#050607;font-family:Inter,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050607;min-height:100%">
    <tr><td align="center" style="padding:40px 20px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#090B0F;border:1px solid #1C2230;border-radius:16px;overflow:hidden">
        <tr><td style="padding:32px 40px;border-bottom:1px solid #1C2230">
          <p style="margin:0;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#7C8CAE">CML Security B.V.</p>
          <h1 style="margin:8px 0 0;font-size:24px;font-weight:600;color:#F4F6FB">Nieuwe offerte-aanvraag</h1>
        </td></tr>
        <tr><td style="padding:24px 40px 8px">
          <table width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
        </td></tr>
        <tr><td style="padding:24px 40px 32px">
          <p style="margin:0;font-size:13px;color:#5A6B8F">Deze aanvraag is verzonden via het contactformulier op cmlsecurity.nl</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildConfirmationEmail(d: QuotePayload): string {
  const naam = escapeHtml(d.naam ?? "");
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#050607;font-family:Inter,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050607;min-height:100%">
    <tr><td align="center" style="padding:40px 20px">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#090B0F;border:1px solid #1C2230;border-radius:16px;overflow:hidden">
        <tr><td style="padding:32px 40px;border-bottom:1px solid #1C2230">
          <p style="margin:0;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#7C8CAE">CML Security B.V.</p>
          <h1 style="margin:8px 0 0;font-size:24px;font-weight:600;color:#F4F6FB">Wij hebben uw aanvraag ontvangen</h1>
        </td></tr>
        <tr><td style="padding:32px 40px">
          <p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Beste ${naam},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Bedankt voor uw aanvraag. Wij hebben uw gegevens ontvangen en nemen zo snel mogelijk contact met u op om de mogelijkheden te bespreken.</p>
          <p style="margin:0 0 16px;font-size:15px;color:#C9D1E3;line-height:1.6">Heeft u tussentijds vragen? Neem gerust contact met ons op.</p>
          <p style="margin:0;font-size:15px;color:#C9D1E3;line-height:1.6">Met vriendelijke groet,<br><strong style="color:#F4F6FB">CML Security B.V.</strong></p>
        </td></tr>
        <tr><td style="padding:24px 40px 32px;border-top:1px solid #1C2230">
          <p style="margin:0;font-size:13px;color:#5A6B8F">Dit is een automatische bevestiging. U hoeft niet te reageren op deze e-mail.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const raw = await req.json();
    const data: QuotePayload = {
      type: sanitize(raw.type),
      naam: sanitize(raw.naam),
      bedrijfsnaam: sanitize(raw.bedrijfsnaam),
      email: sanitize(raw.email),
      telefoonnummer: sanitize(raw.telefoonnummer),
      locatie: sanitize(raw.locatie),
      periode: sanitize(raw.periode),
      bericht: sanitize(raw.bericht),
      honeypot: typeof raw.honeypot === "string" ? raw.honeypot : "",
    };

    const validationError = validate(data);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "noreply@cmlsecurity.nl";
    const toEmail = Deno.env.get("CML_NOTIFY_EMAIL") || "info@cmlsecurity.nl";

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "De e-mailservice is nog niet geconfigureerd. Neem contact op met CML Security." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const [internalRes, customerRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `CML Security <${fromEmail}>`,
          to: [toEmail],
          reply_to: data.email,
          subject: `Nieuwe offerte-aanvraag — ${data.naam}`,
          html: buildInternalEmail(data),
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `CML Security <${fromEmail}>`,
          to: [data.email!],
          subject: "Uw aanvraag bij CML Security B.V.",
          html: buildConfirmationEmail(data),
        }),
      }),
    ]);

    if (!internalRes.ok) {
      const errText = await internalRes.text();
      console.error("Internal email failed:", errText);
      return new Response(
        JSON.stringify({ error: "Het verzenden van de aanvraag is mislukt. Probeer het later opnieuw." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!customerRes.ok) {
      console.warn("Confirmation email failed:", await customerRes.text());
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-quote error:", err);
    return new Response(
      JSON.stringify({ error: "Er ging iets mis bij het verwerken van uw aanvraag." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
