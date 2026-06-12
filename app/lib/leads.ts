// Shared lead delivery — used by both the Quote Bot's scripted form (/api/quote)
// and the Groq capture_lead tool (/api/chat). Primary: Resend if RESEND_API_KEY
// is set (hPanel env). Fallback: the n8n webhook (holds its own Resend key).

export type Lead = {
  email: string;
  name?: string;
  query?: string;     // what they're asking for / their need
  service?: string;
  stage?: string;
  timeline?: string;
  budget?: string;
  source?: string;    // e.g. 'quote-bot-form' | 'chat-tool'
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_URL = 'https://vmi3279661.contaboserver.net/webhook/contact-toshi';
const LEAD_TO = 'kchauhan@toshiconsulting.com'; // Resend test-mode delivery addr; flip to info@ once the domain is verified.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function deliverLead(lead: Lead): Promise<boolean> {
  const email = (lead.email || '').trim();
  if (!isValidEmail(email)) return false;

  const v = (s?: string) => (s || '').trim();
  const name = v(lead.name);
  const query = v(lead.query);
  const service = v(lead.service);
  const stage = v(lead.stage);
  const timeline = v(lead.timeline);
  const budget = v(lead.budget);
  const source = v(lead.source) || 'website';

  try {
    if (RESEND_API_KEY) {
      const rows: [string, string][] = [
        ['Name', name],
        ['Email', email],
        ['Asking for', query],
        ['Service', service],
        ['Stage', stage],
        ['Timeline', timeline],
        ['Budget', budget],
      ];
      const html =
        '<h2>New lead from the Toshi Consulting website</h2>' +
        `<p><em>Source: ${esc(source)}</em></p>` +
        rows.filter(([, val]) => val).map(([k, val]) => `<p><strong>${k}:</strong> ${esc(val)}</p>`).join('');
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Toshi Website <onboarding@resend.dev>',
          to: [LEAD_TO],
          reply_to: email,
          subject: `New lead: ${name || service || 'website visitor'}`,
          html,
        }),
        signal: AbortSignal.timeout(15000),
      });
      return res.ok;
    }

    // Fallback: n8n webhook.
    const message =
      `Source: ${source}\n` +
      `Asking for: ${query || '-'}\n` +
      `Service: ${service || '-'} | Stage: ${stage || '-'} | Timeline: ${timeline || '-'} | Budget: ${budget || '-'}`;
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name || 'Website lead', email, phone: '', message }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
