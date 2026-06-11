'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is the cancellation period?',
    a: 'You can cancel any engagement with 30 days notice. Work-in-progress is wrapped up, deliverables handed over, and a transition plan is included at no extra cost.',
  },
  {
    q: 'What does non-exclusive mean?',
    a: 'You retain the right to work with other partners on parallel initiatives. We never lock you into our services as the only path forward — we earn the next engagement.',
  },
  {
    q: 'Where are your offices located?',
    a: 'Our primary office is in IT Park Panchkula, Haryana. We deliver remotely across India, the EU, and North America — with timezone-overlap built into every team.',
  },
  {
    q: 'How fast can you start?',
    a: 'For most engagements, a discovery session within 5 business days and a working team within 2–3 weeks. Urgent engagements can be accelerated based on availability.',
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-[0_15px_45px_-25px_rgba(0,114,153,0.35)] p-2">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`border-b border-blue-50 last:border-b-0`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start gap-4 p-5 text-left hover:bg-blue-50/40 rounded-xl transition"
            >
              <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 transition ${isOpen ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white' : 'bg-blue-50 text-blue-700'}`}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
              <span className="flex-1">
                <div className="font-bold text-slate-900">{f.q}</div>
                <div
                  className={`text-sm text-slate-600 leading-relaxed transition-all duration-300 overflow-hidden ${isOpen ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {f.a}
                </div>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
