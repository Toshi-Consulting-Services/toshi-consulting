import { CheckCircle, TrendUp, Headset, Medal } from '@phosphor-icons/react/dist/ssr';
import AnimatedCounter from '@/app/components/common/AnimatedCounter';

// Cohesive cool ramp + muted-warm gold for "excellence" (award, not alarm).
const metrics = [
  { number: 100, suffix: '%',     label: 'Delivery Commitment',     icon: CheckCircle, tone: 'from-[#12B0A6] to-[#0E8F86]' },
  { number: 99,  suffix: '%',     label: 'Project Success Rate',    icon: TrendUp,     tone: 'from-[#4F7DF0] to-[#3C63D9]' },
  { number: 24,  suffix: '/7',    label: 'Round-the-Clock Support', icon: Headset,     tone: 'from-[#13B0C8] to-[#0E93AC]' },
  { number: 15,  suffix: '+',     label: 'Years of Excellence',     icon: Medal,       tone: 'from-[#E0915C] to-[#CE7642]' },
];

export default function MetricsSection() {
  return (
    <section className="relative -mt-16 lg:-mt-20 z-20 pb-6" style={{ background: '#E9F8F2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-[0_25px_60px_-30px_rgba(15,118,110,0.45)] border border-teal-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="group flex items-center gap-4 p-3 sm:p-4 rounded-2xl hover:bg-teal-50/60 transition">
                <div className={`grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${m.tone} text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] group-hover:scale-110 transition`}>
                  <Icon size={22} weight="duotone" />
                </div>
                <div className="leading-tight">
                  <div className={`text-3xl font-black tracking-tight bg-gradient-to-br ${m.tone} bg-clip-text text-transparent`}>
                    <AnimatedCounter end={m.number} suffix={m.suffix} />
                  </div>
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
