'use client';

import Link from 'next/link';
import { Phone, ArrowRight, Sparkles, Bot, Zap, Code2 } from 'lucide-react';

function ShieldRadar() {
  // Three orbit radii (% of container) and the speed of each
  const orbits = [
    { radius: 36, duration: 14, dots: 1, delay: 0 },
    { radius: 26, duration: 9,  dots: 2, delay: -3 },
    { radius: 18, duration: 6,  dots: 3, delay: -2 },
  ];

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto select-none">
      {/* Concentric pulse rings */}
      <div className="absolute inset-0 grid place-items-center">
        {[0, 0.6, 1.2, 1.8].map((delay, i) => (
          <span
            key={i}
            className="absolute rounded-full border-2 border-teal-400/40 animate-radar"
            style={{
              width: '78%',
              height: '78%',
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        {/* Static rings */}
        {[28, 44, 60, 76].map((size) => (
          <span
            key={size}
            className="absolute rounded-full border border-teal-300/40"
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
        {/* Orbiting data dots — visualise data flowing into the shield */}
        {orbits.map((orbit, oi) =>
          Array.from({ length: orbit.dots }).map((_, di) => {
            const offset = di * (orbit.duration / orbit.dots);
            return (
              <span
                key={`${oi}-${di}`}
                className="absolute left-1/2 top-1/2 animate-orbit"
                style={{
                  // @ts-expect-error custom CSS var
                  '--orbit-r': `${orbit.radius}%`,
                  animationDuration: `${orbit.duration}s`,
                  animationDelay: `${orbit.delay - offset}s`,
                }}
              >
                <span className="block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_14px_rgba(20,184,166,0.95)]" />
              </span>
            );
          })
        )}
      </div>

      {/* Shield */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-[34%] h-[34%] grid place-items-center animate-float">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 blur-2xl opacity-50" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-teal-500 via-teal-500 to-cyan-500 shadow-[0_20px_50px_-12px_rgba(20,184,166,0.6)] grid place-items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-[60%] h-[60%] text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8.5 3.2v6.3c0 5.4-3.8 9.3-8.5 10.5-4.7-1.2-8.5-5.1-8.5-10.5V5.2L12 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12.4l2.6 2.6L15.8 10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Customer Care card */}
      <div className="absolute left-[2%] bottom-[18%] bg-white rounded-2xl shadow-[0_18px_45px_-14px_rgba(15,118,110,0.3)] border border-teal-100 px-4 py-3 flex items-center gap-3 animate-float -rotate-2" style={{ animationDelay: '0.6s' }}>
        <div className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
          <Phone size={18} />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            Toshi Customer Care
          </div>
          <div className="text-sm font-bold text-slate-900">+91-9915718004</div>
          <div className="text-[10px] text-teal-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available 24/7
          </div>
        </div>
      </div>

      {/* Floating capability badge */}
      <div className="absolute right-[2%] top-[14%] bg-white rounded-2xl shadow-[0_18px_45px_-14px_rgba(15,118,110,0.3)] border border-teal-100 px-3 py-2 flex items-center gap-2 animate-float rotate-3" style={{ animationDelay: '1.2s' }}>
        <div className="grid place-items-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600">
          <Bot size={16} />
        </div>
        <div className="text-[11px] font-bold text-slate-900 leading-tight">
          AI-Native
          <div className="text-teal-600 text-[10px] font-semibold">Automation-first</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-bg pt-32 pb-20 lg:pb-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-teal-200/50 to-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-emerald-200/40 to-teal-200/30 blur-3xl" />
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(15,118,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,1)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: shield illustration (matches original layout) */}
        <div className="order-1 relative">
          <ShieldRadar />
        </div>

        {/* Right: copy */}
        <div className="order-2 max-w-xl animate-fade-up lg:pl-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles size={14} className="text-teal-600" />
            Modern software, built to automate
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900">
            AI Integration, Automation &
            <br />
            <span className="font-display brand-gradient-text text-[1.05em]">Web & App Development</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
            We build production-grade AI integrations, intelligent automations,
            and high-performance web & mobile apps — modern software that handles
            the busywork, so your team ships faster and scales with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-7 py-3.5 rounded-full font-bold shadow-[0_15px_35px_-12px_rgba(20,184,166,0.9)] hover:shadow-[0_18px_40px_-10px_rgba(6,182,212,0.9)] hover:-translate-y-0.5 transition"
            >
              Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white border-2 border-teal-600 text-teal-700 px-7 py-3.5 rounded-full font-bold hover:bg-teal-50 transition"
            >
              Our Services
            </Link>
          </div>

          {/* Trust pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { icon: <Sparkles size={14} />, label: 'AI Integration' },
              { icon: <Zap size={14} />, label: 'Automation' },
              { icon: <Code2 size={14} />, label: 'Web & App Dev' },
            ].map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 bg-white border border-teal-200 text-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm"
              >
                <span className="text-teal-600">{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
