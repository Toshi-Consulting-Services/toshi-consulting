import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Reveal from '@/app/components/common/Reveal';

const pillars = [
  'Quality applications built to scale',
  'Acceleration through automation',
  'Trust-based, long-term partnership',
  '24/7 support across every engagement',
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: collage */}
        <Reveal className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-teal-100/60 to-cyan-100/40 rounded-3xl -z-10 blur-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-[0_20px_50px_-20px_rgba(20,184,166,0.6)] p-6 text-white flex flex-col justify-end">
                <div className="text-4xl font-black leading-none">15+</div>
                <div className="text-xs font-semibold mt-1 uppercase tracking-wider text-teal-50">
                  Years of Delivery
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-teal-50 border border-teal-100 p-6 flex flex-col justify-between">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-white shadow text-teal-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">99%</div>
                  <div className="text-xs font-semibold text-slate-600 uppercase mt-1">
                    Success rate
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-2xl bg-white border border-teal-100 p-6 flex flex-col justify-between shadow-[0_15px_40px_-20px_rgba(15,118,110,0.35)]">
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Our Mission
                </div>
                <div className="text-sm text-slate-700 leading-relaxed">
                  Provide reliable end-to-end support and solutions —
                  ensuring seamless operations and customer satisfaction.
                </div>
              </div>
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white flex flex-col justify-end shadow-[0_20px_50px_-20px_rgba(15,118,110,0.6)]">
                <div className="text-xs font-bold text-emerald-50 uppercase tracking-wider mb-2">
                  Our Vision
                </div>
                <div className="text-sm leading-relaxed">
                  Become a trusted global technology partner empowering
                  innovative, scalable, and future-ready digital solutions.
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: copy */}
        <Reveal delay={150}>
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> About Us
          </div>
          <h2 className="mt-4 fluid-h2 font-black tracking-tight text-slate-900">
            A technology partner you can{' '}
            <span className="font-display brand-gradient-text">actually trust</span>.
          </h2>
          <p className="mt-5 text-slate-600 fluid-lead leading-relaxed">
            For over a decade, Toshi Consulting has helped businesses turn
            ambition into reliable digital delivery. We blend engineering
            craftsmanship with practical advice — so technology stops being
            an obstacle and starts being your edge.
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {pillars.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-slate-700">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-teal-100 text-teal-700 mt-0.5">
                  <CheckCircle2 size={14} />
                </span>
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-7 py-3.5 rounded-full font-bold shadow-[0_15px_35px_-12px_rgba(20,184,166,0.9)] hover:-translate-y-0.5 transition"
          >
            Learn more about us
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
