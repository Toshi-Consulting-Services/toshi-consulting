import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/app/components/common/Reveal';
import { services } from '@/app/data/services';

export default function ServicesSection() {
  return (
    <section className="relative py-24 section-mint overflow-hidden">
      <div className="pointer-events-none absolute top-20 right-10 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Our Services
          </div>
          <h2 className="mt-4 fluid-h2 font-black tracking-tight text-slate-900">
            We Offer{' '}
            <span className="font-display brand-gradient-text">Professional Solutions</span>
          </h2>
          <p className="mt-4 text-slate-600 fluid-lead">
            Transform your business with our expert IT solutions to enhance
            efficiency, drive innovation, and deliver insights for smarter
            decision-making.
          </p>
        </Reveal>

        {/* Uniform grid — every service shown, equal-height cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 90} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col h-full bg-white rounded-2xl p-6 border border-teal-100 shadow-[0_10px_30px_-20px_rgba(15,118,110,0.4)] hover:shadow-[0_22px_44px_-22px_rgba(15,118,110,0.55)] hover:-translate-y-1 transition overflow-hidden"
                >
                  <div className={`absolute -top-12 -right-12 w-32 h-32 ${s.soft} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition`} />
                  <div className="relative flex flex-col h-full">
                    <div className={`inline-grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-[0_15px_30px_-12px_rgba(20,184,166,0.6)] group-hover:scale-110 transition`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                      {s.short}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-teal-700 text-sm font-bold">
                      View details
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Link to the full catalogue */}
        <Reveal className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 px-6 py-3 rounded-full text-sm font-bold hover:bg-teal-50 hover:-translate-y-0.5 shadow-sm transition"
          >
            View all services
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
