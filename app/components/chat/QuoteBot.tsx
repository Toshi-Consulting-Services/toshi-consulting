'use client';

/**
 * Quote Bot — the chat widget from Design 06 (Verdant) "Toshi Assistant".
 * Black + cyan theme, 384×564 panel, guided tap-to-answer quote flow:
 *   intent → service → stage → timeline → budget → email → summary.
 *
 * Opened ONLY by the navbar "Get Quote" button (via the QUOTE_BOT_EVENT bus) —
 * there is intentionally NO floating launcher FAB (the design's "AI button",
 * which Kanav explicitly did not want). Mounted once in app/layout.tsx so it's
 * available site-wide and survives client-side navigation.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { QUOTE_BOT_EVENT } from './quoteBus';

type Msg = { text: string; isBot: boolean };
type Chip = { label: string; value: string };
type Step = 'intent' | 'service' | 'stage' | 'timeline' | 'budget' | 'name' | 'email' | 'confirm';
type Answers = { name?: string; service?: string; stage?: string; timeline?: string; budget?: string; email?: string };

// Guided flow — chips are [label, value]. Mirrors the approved design exactly.
const CHIPS: Record<string, [string, string][]> = {
  intent: [['Get a project quote', 'quote'], ['Explore services', 'services']],
  service: [['AI Integration', 'AI Integration'], ['Automation', 'Automation'], ['Web & App Dev', 'Web & App Dev'], ['Cloud & DevOps', 'Cloud & DevOps'], ['Cybersecurity', 'Cybersecurity'], ['Not sure yet', 'Not sure']],
  stage: [['New idea', 'New idea'], ['Have a spec', 'Have a spec'], ['Improving existing', 'Improving existing'], ['Just researching', 'Just researching']],
  timeline: [['ASAP', 'ASAP'], ['1–3 months', '1–3 months'], ['3–6 months', '3–6 months'], ['Flexible', 'Flexible']],
  budget: [['< $5k', '< $5k'], ['$5k–$15k', '$5k–$15k'], ['$15k–$50k', '$15k–$50k'], ['$50k+', '$50k+'], ['Not sure', 'Not sure']],
  confirm: [['📅 Book a call', 'book'], ['↻ Start over', 'restart']],
};

const CYAN_BTN = 'linear-gradient(120deg,#0891b2,#06b6d4)';

export default function QuoteBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [typing, setTyping] = useState(false);
  const [emailMode, setEmailMode] = useState(false);
  const [nameMode, setNameMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');

  // Logic state read inside async timeouts — kept in refs to dodge stale closures.
  const stepRef = useRef<Step>('intent');
  const answersRef = useRef<Answers>({});
  const startedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Msg[]>([]);
  const streamingRef = useRef(false);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const scrollSoon = useCallback(() => {
    later(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 60);
  }, [later]);

  const setChipsFor = useCallback((s: Step) => {
    stepRef.current = s;
    setChips((CHIPS[s] || []).map(([label, value]) => ({ label, value })));
    scrollSoon();
  }, [scrollSoon]);

  const botSay = useCallback((text: string, after?: () => void) => {
    setTyping(true);
    setChips([]);
    scrollSoon();
    later(() => {
      setTyping(false);
      setMessages((m) => [...m, { text, isBot: true }]);
      scrollSoon();
      if (after) later(after, 40);
    }, 600);
  }, [later, scrollSoon]);

  const save = (k: keyof Answers, v: string) => { answersRef.current = { ...answersRef.current, [k]: v }; };

  const askService = useCallback(() => botSay('Which service do you need?', () => setChipsFor('service')), [botSay, setChipsFor]);
  const askStage = useCallback(() => botSay('What stage is the project at?', () => setChipsFor('stage')), [botSay, setChipsFor]);
  const askTimeline = useCallback(() => botSay("What's your ideal timeline?", () => setChipsFor('timeline')), [botSay, setChipsFor]);
  const askBudget = useCallback(() => botSay('Roughly, what budget range are you working with?', () => setChipsFor('budget')), [botSay, setChipsFor]);
  const askName = useCallback(() => {
    stepRef.current = 'name';
    botSay('Great — and your name?', () => { setNameMode(true); setChips([]); scrollSoon(); });
  }, [botSay, scrollSoon]);
  const askEmail = useCallback(() => {
    stepRef.current = 'email';
    botSay('Perfect. Where should we send your tailored quote?', () => { setEmailMode(true); setChips([]); scrollSoon(); });
  }, [botSay, scrollSoon]);
  const book = useCallback(() => botSay('📅  Opening our calendar… a specialist will confirm your slot shortly. (demo)', () => setChipsFor('confirm')), [botSay, setChipsFor]);

  const startFlow = useCallback(() => {
    answersRef.current = {};
    stepRef.current = 'intent';
    setMessages([]);
    setChips([]);
    setEmailMode(false);
    setNameMode(false);
    setName('');
    setEmail('');
    setInput('');
    botSay("👋  Hi! I'm Toshi's assistant. I can scope your project and get you a quote in about 30 seconds.\n\nWhat brings you here today?", () => setChipsFor('intent'));
  }, [botSay, setChipsFor]);

  const openChat = useCallback(() => {
    setOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      later(startFlow, 120);
    }
  }, [later, startFlow]);

  const closeChat = useCallback(() => setOpen(false), []);

  // The navbar "Get Quote" buttons fire QUOTE_BOT_EVENT — that's the only opener.
  useEffect(() => {
    const onOpen = () => openChat();
    window.addEventListener(QUOTE_BOT_EVENT, onOpen);
    return () => window.removeEventListener(QUOTE_BOT_EVENT, onOpen);
  }, [openChat]);

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    const nm = name.trim();
    if (!nm) return;
    setMessages((m) => [...m, { text: nm, isBot: false }]);
    answersRef.current = { ...answersRef.current, name: nm };
    setNameMode(false);
    scrollSoon();
    later(askEmail, 40);
  };

  const finish = useCallback((em: string) => {
    const a = answersRef.current;
    const summary =
      "✅  All set! Here's what I noted:\n" +
      (a.name ? '•  Name: ' + a.name + '\n' : '') +
      '•  Service: ' + (a.service || '—') + '\n' +
      '•  Stage: ' + (a.stage || '—') + '\n' +
      '•  Timeline: ' + (a.timeline || '—') + '\n' +
      '•  Budget: ' + (a.budget || '—') + '\n\n' +
      'Our team will email a tailored quote to ' + em + ' within 24 hours.';
    botSay(summary, () => botSay('Anything else I can help with?', () => setChipsFor('confirm')));
    // Deliver the captured lead (fire-and-forget — the UX never blocks on it).
    void fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...a, email: em }),
    }).catch(() => {});
  }, [botSay, setChipsFor]);

  const answer = (value: string, label: string) => {
    const s = stepRef.current;
    setMessages((m) => [...m, { text: label, isBot: false }]);
    setChips([]);
    scrollSoon();
    if (s === 'intent') {
      if (value === 'quote') askService();
      else if (value === 'services') {
        botSay('We work across six areas:\n•  AI Integration\n•  Automation\n•  Web & App Development\n•  Cloud & DevOps\n•  Cybersecurity\n•  Training', () => {
          botSay('Which one fits your project?', () => setChipsFor('service'));
        });
      }
    } else if (s === 'service') { save('service', label); askStage(); }
    else if (s === 'stage') { save('stage', label); askTimeline(); }
    else if (s === 'timeline') { save('timeline', label); askBudget(); }
    else if (s === 'budget') { save('budget', label); askName(); }
    else if (s === 'confirm') {
      if (value === 'restart') startFlow();
      else if (value === 'book') book();
    }
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { botSay('Hmm, that email looks off — mind double-checking it?'); return; }
    setMessages((m) => [...m, { text: em, isBot: false }]);
    answersRef.current = { ...answersRef.current, email: em };
    setEmailMode(false);
    scrollSoon();
    later(() => finish(em), 40);
  };

  // Free-text answers are powered by Groq (streamed). The scripted chip flow
  // above still handles structured lead capture.
  const streamReply = useCallback(async (userText: string) => {
    setTyping(true);
    setChips([]);
    scrollSoon();
    const prior = messagesRef.current
      .slice(-12)
      .map((m) => ({ role: m.isBot ? 'assistant' : 'user', content: m.text }));
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...prior, { role: 'user', content: userText }] }),
      });
      if (!res.ok || !res.body) throw new Error('chat ' + res.status);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      let started = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!acc) continue;
        if (!started) {
          started = true;
          setTyping(false);
          setMessages((m) => [...m, { text: acc, isBot: true }]);
        } else {
          setMessages((m) => { const c = m.slice(); c[c.length - 1] = { text: acc, isBot: true }; return c; });
        }
        scrollSoon();
      }
      if (!started) {
        setTyping(false);
        setMessages((m) => [...m, { text: "Sorry — I didn't quite catch that. Could you rephrase, or tap an option above?", isBot: true }]);
        scrollSoon();
      }
    } catch {
      setTyping(false);
      setMessages((m) => [...m, { text: "I'm having trouble responding right now. Please email info@toshiconsulting.com, or tap “Get a project quote” above.", isBot: true }]);
      scrollSoon();
    } finally {
      streamingRef.current = false;
    }
  }, [scrollSoon]);

  const submitText = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t || streamingRef.current) return;
    streamingRef.current = true;
    setMessages((m) => [...m, { text: t, isBot: false }]);
    setInput('');
    scrollSoon();
    void streamReply(t);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Toshi Assistant — quote chat"
      className="qb-pop font-jakarta fixed z-[80] right-4 bottom-4 sm:right-6 sm:bottom-6 flex flex-col w-[384px] max-w-[calc(100vw-2rem)] h-[564px] max-h-[calc(100dvh-6rem)] rounded-3xl overflow-hidden bg-white border border-[rgba(13,79,71,0.08)] shadow-[0_30px_70px_rgba(8,40,36,0.34)]"
    >
      {/* Header — black + cyan */}
      <div
        className="relative flex items-center gap-3 px-4 pt-4 pb-[15px] text-white overflow-hidden"
        style={{ background: 'linear-gradient(125deg,#0a1418 0%,#0d2832 62%,#091a20 100%)' }}
      >
        <div className="pointer-events-none absolute -top-10 -right-8 w-[180px] h-[120px]" style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.28), transparent 65%)' }} />
        <div className="relative flex items-center justify-center w-[42px] h-[42px] rounded-[13px]" style={{ background: 'rgba(34,211,238,0.16)', border: '1px solid rgba(34,211,238,0.4)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2 L20 7 V17 L12 22 L4 17 V7 Z" fill="#22d3ee" />
            <text x="12" y="15.5" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="8.5" fontWeight="800" fill="#0a1418">AI</text>
          </svg>
          <span className="absolute -right-0.5 -bottom-0.5 w-[13px] h-[13px] rounded-full" style={{ background: '#22d3ee', border: '2px solid #0a1418', boxShadow: '0 0 8px #22d3ee' }} />
        </div>
        <div className="relative flex-1 leading-[1.25]">
          <div className="font-extrabold text-[15.5px]">Toshi Assistant</div>
          <div className="text-[11.5px] text-[#9fdfe9] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22d3ee', boxShadow: '0 0 7px #22d3ee' }} /> Online · replies instantly
          </div>
        </div>
        <button onClick={closeChat} aria-label="Close chat" className="relative w-8 h-8 rounded-full text-white text-sm hover:bg-white/20 transition" style={{ background: 'rgba(255,255,255,0.12)' }}>✕</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-[9px]" style={{ background: '#f5faf8' }}>
        {messages.map((m, i) => (
          <div key={i} className={m.isBot ? 'self-start max-w-[86%]' : 'self-end max-w-[86%]'}>
            <div
              className="text-[13.5px] leading-[1.5] whitespace-pre-line px-[14px] py-[10px]"
              style={
                m.isBot
                  ? { background: '#fff', border: '1px solid #e8efed', color: '#22302d', borderRadius: '14px', borderTopLeftRadius: '4px' }
                  : { background: CYAN_BTN, color: '#fff', borderRadius: '14px', borderTopRightRadius: '4px' }
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="self-start flex gap-1 bg-white border border-[#e8efed] rounded-[14px] px-[14px] py-3">
            <span className="qb-dot w-1.5 h-1.5 rounded-full bg-[#9fb8b2]" />
            <span className="qb-dot w-1.5 h-1.5 rounded-full bg-[#9fb8b2]" style={{ animationDelay: '0.2s' }} />
            <span className="qb-dot w-1.5 h-1.5 rounded-full bg-[#9fb8b2]" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-[7px] mt-[3px]">
            {chips.map((c, i) => (
              <button
                key={i}
                onClick={() => answer(c.value, c.label)}
                className="text-[12.5px] font-semibold text-[#0c4a52] bg-white border border-[#9fdfe9] rounded-full px-[13px] py-[7px] hover:bg-[#e0f7fb] hover:border-[#22d3ee] transition"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="px-[13px] py-[11px] border-t border-[#eef3f1] bg-white">
        {nameMode ? (
          <form onSubmit={submitName} className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              className="flex-1 rounded-full px-4 py-[11px] text-[13.5px] outline-none text-[#16302b]"
              style={{ border: '1.5px solid #cfe0db' }}
            />
            <button type="submit" className="rounded-full px-[18px] text-white font-bold text-[13.5px]" style={{ background: CYAN_BTN }}>Send</button>
          </form>
        ) : emailMode ? (
          <form onSubmit={submitEmail} className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@company.com"
              aria-label="Your email"
              className="flex-1 rounded-full px-4 py-[11px] text-[13.5px] outline-none text-[#16302b]"
              style={{ border: '1.5px solid #cfe0db' }}
            />
            <button type="submit" className="rounded-full px-[18px] text-white font-bold text-[13.5px]" style={{ background: CYAN_BTN }}>Send</button>
          </form>
        ) : (
          <form onSubmit={submitText} className="flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Type a message"
              className="flex-1 rounded-full px-4 py-[11px] text-[13.5px] outline-none text-[#16302b]"
              style={{ border: '1.5px solid #e1ebe8', background: '#f7fbfa' }}
            />
            <button type="submit" aria-label="Send message" className="shrink-0 w-10 h-10 rounded-full text-white text-sm flex items-center justify-center" style={{ background: CYAN_BTN }}>➤</button>
          </form>
        )}
        <div className="text-center text-[10px] text-[#9aa8a4] mt-2">Powered by Toshi AI · we&apos;ll never share your details</div>
      </div>
    </div>
  );
}
