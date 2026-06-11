'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Code2, BrainCircuit, Cloud, ShieldCheck, Workflow } from 'lucide-react';

function CapabilityOrbit() {
  // Curved connector paths (viewBox 0..100) from the centre AI CORE to each card.
  const links = [
    'M50 50 C 44 42 38 35 32 30', // -> Cloud Infra (top-left)
    'M50 50 C 58 42 65 33 72 26', // -> Deploy terminal (top-right)
    'M50 50 C 44 58 37 67 30 73', // -> Threat Monitor (bottom-left)
    'M50 50 C 58 58 66 68 73 75', // -> Automations (bottom-right)
  ];

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto select-none">
      {/* Dashed connector lines flowing into the core */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        {links.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#14b8a6"
            strokeWidth={0.7}
            strokeLinecap="round"
            className="hero-dash"
            style={{ animationDelay: `${i * 0.2}s`, opacity: 0.55 }}
          />
        ))}
      </svg>

      {/* Centre — AI CORE */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[31%]">
        <div className="relative aspect-square rounded-[1.6rem] border border-teal-200/70 bg-white/40 backdrop-blur p-2.5 animate-float">
          <div className="absolute inset-0 -z-10 rounded-[1.6rem] bg-gradient-to-br from-teal-400 to-cyan-400 blur-2xl opacity-40" />
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-teal-500 via-teal-500 to-cyan-500 shadow-[0_18px_45px_-12px_rgba(20,184,166,0.6)] grid place-items-center text-white">
            <div className="flex flex-col items-center gap-1">
              <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.6} />
              <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.18em]">AI CORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Infra — top-left */}
      <div className="absolute top-[4%] left-0 w-[46%] animate-float" style={{ animationDelay: '0.4s' }}>
        <div className="rounded-2xl bg-white shadow-[0_18px_45px_-16px_rgba(15,118,110,0.3)] border border-teal-100 p-3 sm:p-4">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600 shrink-0">
              <Cloud size={18} />
            </div>
            <span className="font-bold text-slate-900 text-sm sm:text-base">Cloud Infra</span>
          </div>
          <div className="mt-2.5 h-1.5 rounded-full bg-teal-100 overflow-hidden">
            <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] text-slate-500 font-medium">99.99% uptime · auto-scale</div>
        </div>
      </div>

      {/* Deploy terminal — top-right (Web & App Development) */}
      <div className="absolute top-0 right-0 w-[48%] animate-float" style={{ animationDelay: '1s' }}>
        <div className="rounded-2xl bg-slate-900 shadow-[0_20px_50px_-16px_rgba(15,23,42,0.5)] p-3 sm:p-4 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-2.5 space-y-1 text-[10px] sm:text-[11px] leading-relaxed">
            <div className="text-slate-300"><span className="text-cyan-400">$</span> deploy --prod</div>
            <div className="text-emerald-400">✓ build passed</div>
            <div className="text-emerald-400">✓ shipped 1.2s</div>
          </div>
        </div>
      </div>

      {/* Threat Monitor — bottom-left (Cybersecurity) */}
      <div className="absolute bottom-[6%] left-0 w-[46%] animate-float" style={{ animationDelay: '0.7s' }}>
        <div className="rounded-2xl bg-white shadow-[0_18px_45px_-16px_rgba(15,118,110,0.3)] border border-teal-100 p-3 sm:p-4">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <span className="font-bold text-slate-900 text-sm sm:text-base">Threat Monitor</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> All systems secure
          </div>
        </div>
      </div>

      {/* Automations — bottom-right */}
      <div className="absolute bottom-0 right-0 w-[46%] animate-float" style={{ animationDelay: '1.3s' }}>
        <div className="rounded-2xl bg-white shadow-[0_18px_45px_-16px_rgba(15,118,110,0.3)] border border-teal-100 p-3 sm:p-4">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-xl bg-teal-50 text-teal-600 shrink-0">
              <Workflow size={18} />
            </div>
            <span className="font-bold text-slate-900 text-sm sm:text-base">Automations</span>
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] font-semibold text-teal-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> 1.2k tasks/day
          </div>
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
        {/* Left: AI-core capability orbit */}
        <div className="order-1 relative">
          <CapabilityOrbit />
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
