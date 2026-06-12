import { MagnifyingGlass, Target, ShieldCheck, Lightning, UsersThree, Sparkle } from '@phosphor-icons/react/dist/ssr';
import Reveal from '@/app/components/common/Reveal';

// Cohesive cool ramp (teal→indigo) + one muted-warm terracotta. No alarm hues.
const reasons = [
  {
    icon: MagnifyingGlass,
    title: 'Business Discovery Sessions',
    desc: 'We start by understanding your unique business challenges and goals — never by selling a template.',
    tone: 'from-[#4F7DF0] to-[#3C63D9]',
  },
  {
    icon: Target,
    title: 'Tailored Solutions',
    desc: 'Custom-built solutions designed for your business — no off-the-shelf compromises.',
    tone: 'from-[#7C6FF0] to-[#5D4FE0]',
  },
  {
    icon: ShieldCheck,
    title: 'Security-First Delivery',
    desc: 'Robust, secure, and scalable applications backed by enterprise-grade hardening.',
    tone: 'from-[#12B0A6] to-[#0E8F86]',
  },
  {
    icon: Lightning,
    title: 'Acceleration Through Automation',
    desc: 'Faster deployments, fewer regressions, and predictable releases — by default.',
    tone: 'from-[#E0915C] to-[#CE7642]',
  },
  {
    icon: UsersThree,
    title: 'A Real Partnership',
    desc: 'We measure success in your KPIs — not ticket counts. Long-term relationships, not handoffs.',
    tone: 'from-[#5566E0] to-[#3F4ECF]',
  },
  {
    icon: Sparkle,
    title: 'Innovate With Confidence',
    desc: 'Modern stacks, AI-assisted delivery, and a team that ships every week — not every quarter.',
    tone: 'from-[#13B0C8] to-[#0E93AC]',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-teal-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Why Choose Us
          </div>
          <h2 className="mt-4 fluid-h2 font-black tracking-tight text-slate-900">
            We don't just build —{' '}
            <span className="font-display brand-gradient-text">we partner.</span>
          </h2>
          <p className="mt-4 text-slate-600 fluid-lead">
            Six reasons companies stay with Toshi for years, not months.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 80}>
                <div className="group relative h-full bg-white rounded-2xl p-7 border border-teal-100 shadow-[0_10px_30px_-20px_rgba(15,118,110,0.4)] hover:shadow-[0_22px_44px_-22px_rgba(15,118,110,0.5)] hover:-translate-y-1 transition">
                  <div className={`inline-grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br ${r.tone} text-white shadow-[0_12px_25px_-10px_rgba(20,184,166,0.6)] group-hover:scale-110 transition`}>
                    <Icon size={22} weight="duotone" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{r.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
