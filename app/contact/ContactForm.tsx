'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';

const inputClass =
  'mt-1.5 w-full px-4 py-3 rounded-xl bg-blue-50/40 border border-blue-100 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        setForm({ name: '', phone: '', email: '', message: '', company: '' });
      } else {
        setStatus('error');
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error — please try again, or email us directly.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/60 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <Send size={20} />
        </div>
        <h3 className="mt-4 text-lg font-black text-slate-900">Message sent — thank you!</h3>
        <p className="mt-1 text-sm text-slate-600">
          We&apos;ve received your enquiry and typically reply within 1 business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-bold text-blue-700 hover:text-blue-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Your full name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+91"
            className={inputClass}
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Email</span>
        <input
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          placeholder="you@email.com"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Message</span>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us about your project or inquiry..."
          className={`${inputClass} resize-none`}
        />
      </label>

      {/* Honeypot — hidden from humans; bots that fill it are silently dropped */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={update('company')}
        className="hidden"
      />

      {status === 'error' && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <p className="text-xs text-slate-500 leading-relaxed">
        By submitting this form, you agree to our{' '}
        <Link href="/privacy" className="font-semibold text-blue-700 hover:underline">Privacy Policy</Link>
        {' '}and{' '}
        <Link href="/terms" className="font-semibold text-blue-700 hover:underline">Terms</Link>
        , and consent to us contacting you about your enquiry.
      </p>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-6 py-3.5 rounded-xl font-bold shadow-[0_15px_35px_-12px_rgba(0,152,204,0.9)] hover:-translate-y-0.5 transition disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <Send size={18} /> {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
