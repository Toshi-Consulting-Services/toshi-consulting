import { NextResponse } from 'next/server';

// Primary: send directly via Resend if RESEND_API_KEY is set (server-side secret, hPanel env).
// Fallback: the n8n webhook — used until the env var is live, so the form never breaks.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_URL = 'https://vmi3279661.contaboserver.net/webhook/contact-toshi';
const LEAD_TO = 'kchauhan@toshiconsulting.com';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(data.name);
  const email = str(data.email);
  const phone = str(data.phone);
  const message = str(data.message);
  const company = str(data.company); // honeypot

  // Bots fill the hidden honeypot field — accept silently, send nothing.
  if (company) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in your name, email, and message.' },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ ok: false, error: 'Message is too long.' }, { status: 400 });
  }

  try {
    if (RESEND_API_KEY) {
      // Direct via Resend — no n8n hop.
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const html =
        '<h2>New enquiry from the Toshi Consulting website</h2>' +
        `<p><strong>Name:</strong> ${esc(name)}</p>` +
        `<p><strong>Email:</strong> ${esc(email)}</p>` +
        `<p><strong>Phone:</strong> ${esc(phone) || '-'}</p>` +
        `<p><strong>Message:</strong></p><p>${esc(message).replace(/\n/g, '<br>')}</p>`;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Toshi Website <onboarding@resend.dev>',
          to: [LEAD_TO],
          reply_to: email,
          subject: `New enquiry: ${name || 'website visitor'}`,
          html,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error('resend ' + res.status);
    } else {
      // Fallback: n8n webhook (holds its own Resend key).
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error('upstream ' + res.status);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not send right now — please email hr@toshiconsulting.com directly.' },
      { status: 502 },
    );
  }
}
