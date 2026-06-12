import { NextResponse } from 'next/server';
import { deliverLead, isValidEmail } from '@/app/lib/leads';

// Quote Bot scripted-flow lead capture. Delivery is handled by the shared
// deliverLead helper (Resend primary, n8n fallback) — same path the chat
// capture_lead tool uses.
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const email = str(data.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const ok = await deliverLead({
    email,
    name: str(data.name),
    query: str(data.query),
    service: str(data.service),
    stage: str(data.stage),
    timeline: str(data.timeline),
    budget: str(data.budget),
    source: 'quote-bot-form',
  });

  return ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json(
        { ok: false, error: 'Could not send right now — please email info@toshiconsulting.com directly.' },
        { status: 502 },
      );
}
