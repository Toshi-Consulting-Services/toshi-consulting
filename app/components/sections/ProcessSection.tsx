import Reveal from '@/app/components/common/Reveal';
import { MagnifyingGlass, PenNib, Cpu, Lifebuoy } from '@phosphor-icons/react/dist/ssr';

// Cohesive cool ramp; `num` is a pale tint of each step's accent.
const steps = [
  {
    n: '01',
    icon: MagnifyingGlass,
    title: 'Discover',
    desc: 'A grounded conversation about your business, your team, and the outcomes that matter — not the tech stack.',
    tone: 'from-[#4F7DF0] to-[#3C63D9]',
    num: 'text-[#cdd9f8]',
  },
  {
    n: '02',
    icon: PenNib,
    title: 'Design',
    desc: 'Architecture, journeys, and a delivery roadmap that fits your timeline and risk appetite.',
    tone: 'from-[#7C6FF0] to-[#5D4FE0]',
    num: 'text-[#d8d2f8]',
  },
  {
    n: '03',
    icon: Cpu,
    title: 'Build',
    desc: 'Weekly demos, code you own, automated tests, and secure-by-default infrastructure from day one.',
    tone: 'from-[#13B0C8] to-[#0E93AC]',
    num: 'text-[#c7e9f1]',
  },
  {
    n: '04',
    icon: Lifebuoy,
    title: 'Support',
    desc: '24/7 monitoring, on-call rotation, and quarterly health reviews — long after launch.',
    tone: 'from-[#12B0A6] to-[#0E8F86]',
    num: 'text-[#c4ebe6]',
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(15,118,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,1)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> How we work
          </div>
          <h2 className="mt-4 fluid-h2 font-black tracking-tight text-slate-900">
            A simple, repeatable{' '}
            <span className="font-display brand-gradient-text">process</span>
          </h2>
          <p className="mt-4 text-slate-600 fluid-lead">
            Four phases. Every engagement, every team. No surprises.
          </p>
        </Reveal>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting dashed line behind cards (desktop only) */}
          <div className="hidden lg:block pointer-events-none absolute left-0 right-0 top-14 mx-12 border-t-2 border-dashed border-teal-200" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i * 100} className="h-full">
                <div className="relative h-full flex flex-col bg-white rounded-2xl border border-teal-100 p-7 shadow-[0_10px_30px_-20px_rgba(15,118,110,0.4)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(15,118,110,0.5)] transition">
                  <div className="flex items-start justify-between">
                    <span className={`relative grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-[0_15px_30px_-12px_rgba(20,184,166,0.6)]`}>
                      <Icon size={22} weight="duotone" />
                    </span>
                    <span className={`font-display text-4xl ${s.num}`}>{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
