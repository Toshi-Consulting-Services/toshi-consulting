import Reveal from '@/app/components/common/Reveal';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Toshi rebuilt our compliance reporting stack in six weeks — what our previous vendor couldn't ship in a year. Their team genuinely owned the outcome.",
    name: 'Mayank Mishra',
    role: 'Founder & CEO',
    company: 'Omynx Labs',
    initials: 'MM',
    tone: 'from-teal-500 to-cyan-500',
  },
  {
    quote:
      "We came to Toshi for a blockchain audit and stayed for everything else. They speak the language of the business, not just the codebase.",
    name: 'John Doe',
    role: 'Title',
    company: 'Company',
    initials: 'JD',
    tone: 'from-cyan-500 to-sky-500',
  },
  {
    quote:
      "Honest, fast, and unusually pragmatic. They told us which features NOT to build — and that's the advice that paid for the engagement twice over.",
    name: 'John Doe',
    role: 'Title',
    company: 'Company',
    initials: 'JD',
    tone: 'from-emerald-500 to-teal-500',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 section-mint overflow-hidden">
      <div className="pointer-events-none absolute top-20 right-10 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-10 w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Star size={13} className="text-teal-600 fill-teal-500" /> Client Stories
          </div>
          <h2 className="mt-4 fluid-h2 font-black tracking-tight text-slate-900">
            What teams say about{' '}
            <span className="font-display brand-gradient-text">working with us</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <article className="group h-full flex flex-col bg-white rounded-3xl p-8 border border-teal-100 shadow-[0_15px_45px_-25px_rgba(15,118,110,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_55px_-25px_rgba(15,118,110,0.55)] transition">
                {/* Quote glyph */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 text-teal-200 mb-4"
                  aria-hidden="true"
                >
                  <path d="M7 7h3l-1 3H7v6H3v-9zm10 0h3l-1 3h-2v6h-4v-9z" />
                </svg>

                <div className="flex gap-1 mb-3 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed text-[15px] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-7 pt-5 border-t border-teal-100 flex items-center gap-3">
                  <span className={`grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br ${t.tone} text-white font-black text-sm shadow-[0_10px_22px_-10px_rgba(20,184,166,0.7)]`}>
                    {t.initials}
                  </span>
                  <div className="leading-tight">
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
