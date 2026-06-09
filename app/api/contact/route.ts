import { NextResponse } from 'next/server';

// n8n webhook (holds the Resend key + sends the email). Not a secret — just an endpoint.
const WEBHOOK_URL = 'https://vmi3279661.contaboserver.net/webhook/contact-toshi';

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
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error('upstream ' + res.status);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not send right now — please email hr@toshiconsulting.com directly.' },
      { status: 502 },
    );
  }
}
