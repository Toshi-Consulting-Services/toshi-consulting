import { services } from '@/app/data/services';
import { deliverLead } from '@/app/lib/leads';

// Groq-powered free-text answers for the Quote Bot, with a capture_lead tool so
// the assistant can file a lead (name + email + query) straight from chat.
// Streams tokens back so replies type out. The scripted chip flow still handles
// the structured quote path.
const GROQ_KEY = process.env.GROQ_API_KEY;
// Own model var so the customer-facing chat can run a stronger model than the
// blog generator (scripts/generate-drafts.mjs uses GROQ_MODEL=scout). 70b =
// better instruction-following + more reliable tool-calling.
const GROQ_MODEL = process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = [
  'You are "Toshi Assistant", the friendly assistant on the Toshi Consulting Services website.',
  'Company: Toshi Consulting Services Private Limited — a technology consulting firm in IT Park, Panchkula, Haryana, India.',
  'Founder & CEO: Toshi Trivedi.',
  'Hours: Mon–Fri, 10:00–18:00 IST. Phone: +91-9915718004. Email: info@toshiconsulting.com.',
  '',
  'Services we offer:',
  services.map((s) => `- ${s.title}: ${s.short}`).join('\n'),
  '',
  'How to respond:',
  '- Keep replies SHORT — 1 to 2 sentences. Never ramble or stack several questions into one reply.',
  '- Speak in first-person plural ("we", "our team"), warm and helpful.',
  '- You CAN and SHOULD answer questions about who we are, our founder/leadership (Toshi Trivedi), our services, our process, and the kinds of work we do — these are all on-topic.',
  '- NEVER invent specific prices, delivery timelines, client names, or case-study numbers. For pricing or scope, briefly invite them to share their requirement so our team can follow up.',
  '- Off-topic = unrelated general knowledge (trivia, world facts, news, maths, coding help, other companies, personal questions). For those, in one short sentence say it is outside what you can help with and steer back to our services — do not answer the off-topic question itself.',
  '- Use Indian context where natural (₹, DPDP). Avoid the phrases: "leverage", "synergy", "game-changing", "unlock the power of", "in conclusion".',
  '- You are an AI assistant — never claim to be human.',
  '',
  'Capturing leads:',
  '- Only once a visitor is clearly interested, ask ONE time for their name, email, and a short description of what they need.',
  '- As soon as you have their email AND what they need, call the capture_lead tool. Never ask for contact details repeatedly.',
  '- After capture_lead succeeds, confirm in one short sentence that our team will email them within 24 hours.',
].join('\n');

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'capture_lead',
      description:
        'Save the website visitor as a sales lead. Call this as soon as you have the visitor\'s email and a description of what they are asking for.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: "The visitor's name, if provided." },
          email: { type: 'string', description: "The visitor's email address." },
          query: { type: 'string', description: 'A short description of what the visitor needs or is asking for.' },
          service: { type: 'string', description: 'The Toshi service this relates to, if clear (e.g. AI Integration, Web & App Development).' },
        },
        required: ['email', 'query'],
      },
    },
  },
];

type InMsg = { role?: unknown; content?: unknown };
type GroqMsg = { role: string; content: string | null; tool_calls?: unknown[]; tool_call_id?: string };

function groqFetch(messages: GroqMsg[], useTools: boolean) {
  return fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.4,
      max_tokens: 220,
      stream: true,
      ...(useTools ? { tools: TOOLS, tool_choice: 'auto' } : {}),
    }),
    signal: AbortSignal.timeout(30000),
  });
}

// Read a Groq SSE stream: forward text deltas to `onText`, accumulate any
// tool-call deltas (OpenAI format — fragments concatenate by index).
async function pumpGroqStream(
  res: Response,
  onText: (t: string) => void,
): Promise<{ content: string; tool: { id: string; name: string; args: string } | null }> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let content = '';
  const toolAcc: Record<number, { id: string; name: string; args: string }> = {};

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx: number;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') break;
      try {
        const json = JSON.parse(data);
        const delta = json?.choices?.[0]?.delta;
        if (delta?.content) {
          content += delta.content;
          onText(delta.content);
        }
        if (Array.isArray(delta?.tool_calls)) {
          for (const tc of delta.tool_calls) {
            const i = typeof tc.index === 'number' ? tc.index : 0;
            toolAcc[i] = toolAcc[i] || { id: '', name: '', args: '' };
            if (tc.id) toolAcc[i].id = tc.id;
            if (tc.function?.name) toolAcc[i].name = tc.function.name;
            if (tc.function?.arguments) toolAcc[i].args += tc.function.arguments;
          }
        }
      } catch {
        // ignore keep-alive / partial frames
      }
    }
  }

  const tool = Object.values(toolAcc).find((t) => t.name === 'capture_lead') || null;
  return { content, tool };
}

const ERR = "I'm having trouble responding right now. Please email info@toshiconsulting.com.";

export async function POST(req: Request) {
  if (!GROQ_KEY) {
    return new Response('AI chat is not configured right now — please email info@toshiconsulting.com.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  let body: { messages?: InMsg[] };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid request.', { status: 400 });
  }

  const history: GroqMsg[] = (Array.isArray(body.messages) ? body.messages : [])
    .slice(-12)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content ?? '').slice(0, 2000),
    }))
    .filter((m) => (m.content ?? '').trim().length > 0);

  if (history.length === 0) return new Response('', { status: 400 });

  const baseMessages: GroqMsg[] = [{ role: 'system', content: SYSTEM_PROMPT }, ...history];
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      (async () => {
        try {
          // Pass 1: stream the answer, with the capture_lead tool available.
          const res1 = await groqFetch(baseMessages, true);
          if (!res1.ok || !res1.body) { controller.enqueue(encoder.encode(ERR)); controller.close(); return; }

          const { content, tool } = await pumpGroqStream(res1, (t) => controller.enqueue(encoder.encode(t)));

          // No tool call → normal answer already streamed.
          if (!tool) { controller.close(); return; }

          // Tool call → file the lead, then stream a natural confirmation.
          let args: Record<string, string> = {};
          try { args = JSON.parse(tool.args || '{}'); } catch { /* keep empty */ }
          const saved = await deliverLead({
            email: String(args.email ?? ''),
            name: String(args.name ?? ''),
            query: String(args.query ?? ''),
            service: String(args.service ?? ''),
            source: 'chat-tool',
          });

          const toolResult = saved
            ? 'Lead saved successfully. Warmly confirm that our team will email the visitor within 24 hours.'
            : 'Could not save the lead — the email may be invalid. Politely ask the visitor to double-check their email address.';

          const followUp: GroqMsg[] = [
            ...baseMessages,
            {
              role: 'assistant',
              content: content || null,
              tool_calls: [
                { id: tool.id || 'call_1', type: 'function', function: { name: 'capture_lead', arguments: tool.args || '{}' } },
              ],
            },
            { role: 'tool', tool_call_id: tool.id || 'call_1', content: toolResult },
          ];

          const res2 = await groqFetch(followUp, false);
          if (res2.ok && res2.body) {
            await pumpGroqStream(res2, (t) => controller.enqueue(encoder.encode(t)));
          } else if (saved) {
            controller.enqueue(encoder.encode("\n\nAll set — our team will email you within 24 hours."));
          }
          controller.close();
        } catch {
          try { controller.enqueue(encoder.encode(ERR)); } catch { /* already closed */ }
          controller.close();
        }
      })();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
