import { CheckCircle2, TrendingUp, Headphones, Award } from 'lucide-react';
import AnimatedCounter from '@/app/components/common/AnimatedCounter';

const metrics = [
  { number: 100, suffix: '%',     label: 'Delivery Commitment',     icon: CheckCircle2, tone: 'from-emerald-500 to-green-600' },
  { number: 99,  suffix: '%',     label: 'Project Success Rate',    icon: TrendingUp,   tone: 'from-sky-500 to-blue-600' },
  { number: 24,  suffix: '/7',    label: 'Round-the-Clock Support', icon: Headphones,   tone: 'from-violet-500 to-fuchsia-500' },
  { number: 15,  suffix: '+',     label: 'Years of Excellence',     icon: Award,        tone: 'from-amber-500 to-orange-500' },
];

export default function MetricsSection() {
  return (
    <section className="relative -mt-16 lg:-mt-20 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-[0_25px_60px_-30px_rgba(15,118,110,0.45)] border border-teal-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="group flex items-center gap-4 p-3 sm:p-4 rounded-2xl hover:bg-teal-50/60 transition">
                <div className={`grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${m.tone} text-white shadow-[0_10px_24px_-10px_rgba(20,184,166,0.7)] group-hover:scale-110 transition`}>
                  <Icon size={22} />
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
