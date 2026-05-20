import Reveal from '@/app/components/common/Reveal';
import { Mail } from 'lucide-react';

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4.08 0 2 2 0 0 1 4.08 0zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  );
}

const team = [
  {
    slug: 'kanav-chauhan',
    name: 'Kanav Chauhan',
    role: 'Founder & CEO',
    bio: 'A decade of building reliable digital products across AI, blockchain, and security. Engineer at heart, operator by necessity.',
    initials: 'KC',
    tone: 'from-teal-500 to-cyan-500',
    side: 'bg-teal-50',
  },
  {
    slug: 'toshi-trivedi',
    name: 'Toshi Trivedi',
    role: 'Principal Consultant',
    bio: 'Translates business outcomes into shippable engineering plans — QA test automation, AI-augmented workflows, and brand-led marketing.',
    initials: 'TT',
    tone: 'from-cyan-500 to-sky-500',
    side: 'bg-cyan-50',
  },
];

export default function TeamSection() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Meet the team
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            The people behind{' '}
            <span className="font-display brand-gradient-text">your delivery</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Small, senior team — every engagement led by people who've shipped
            production systems for clients you'd recognise.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <article className="group relative bg-white rounded-3xl overflow-hidden border border-teal-100 shadow-[0_15px_45px_-25px_rgba(15,118,110,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_55px_-25px_rgba(15,118,110,0.5)] transition">
                <a href={`/authors/${m.slug}`} className="block">
                <div className={`relative h-56 ${m.side} grid place-items-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.18),transparent_60%)]" />
                  {/* Initials avatar — stand-in for real photo */}
                  <div className={`relative grid place-items-center w-32 h-32 rounded-full bg-gradient-to-br ${m.tone} text-white font-black text-5xl shadow-[0_25px_60px_-20px_rgba(15,118,110,0.55)] ring-4 ring-white`}>
                    {m.initials}
                  </div>
                </div>
                </a>
                <div className="p-6">
                  <a href={`/authors/${m.slug}`} className="hover:text-teal-700 transition"><h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 transition">{m.name}</h3></a>
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mt-0.5">
                    {m.role}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{m.bio}</p>
                  <div className="mt-5 flex gap-2">
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="grid place-items-center w-9 h-9 rounded-lg bg-teal-50 text-teal-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 hover:text-white transition"
                    >
                      <LinkedinGlyph />
                    </a>
                    <a
                      href="mailto:hr@toshiconsulting.com"
                      aria-label="Email"
                      className="grid place-items-center w-9 h-9 rounded-lg bg-teal-50 text-teal-700 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 hover:text-white transition"
                    >
                      <Mail size={15} />
                    </a>
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
