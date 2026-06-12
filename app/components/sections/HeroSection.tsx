'use client';

import Link from 'next/link';

/* ── AI CORE — hexagon chip (exact Verdant SVG) ── */
function AICore() {
  return (
    <div className="absolute z-[5]" style={{ top: '37%', left: '34.3%', width: '34%' }}>
      <div className="relative w-full aspect-square">
        {/* halo */}
        <div
          className="absolute inset-[9%] rounded-full v-nodepulse"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.32), rgba(6,182,212,0.10) 55%, transparent 72%)' }}
        />
        <svg viewBox="0 0 200 200" className="relative w-full h-full overflow-visible">
          <defs>
            <linearGradient id="hexOut" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5ec8f7" /><stop offset="1" stopColor="#0ea5e9" /></linearGradient>
            <linearGradient id="hexIn" x1="0.2" y1="0" x2="0.9" y2="1"><stop offset="0" stopColor="#6d8bf2" /><stop offset="1" stopColor="#3f57d8" /></linearGradient>
          </defs>
          <g fill="none" stroke="#7cc4f4" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M80 58 V40 H62" /><path d="M100 54 V26" /><path d="M120 58 V40 H138" />
            <path d="M60 82 H32" /><path d="M58 100 H22" /><path d="M60 118 H32" />
            <path d="M140 82 H168" /><path d="M142 100 H178" /><path d="M140 118 H168" />
            <path d="M80 142 V160 H62" /><path d="M100 146 V174" /><path d="M120 142 V160 H138" />
          </g>
          <g>
            <circle cx="62" cy="40" r="7" fill="#22d3ee" /><circle cx="100" cy="22" r="7" fill="#22d3ee" /><circle cx="138" cy="40" r="7" fill="#22d3ee" />
            <circle cx="28" cy="82" r="7" fill="#3b82f6" /><circle cx="18" cy="100" r="7" fill="#3b82f6" /><circle cx="28" cy="118" r="7" fill="#3b82f6" />
            <circle cx="172" cy="82" r="7" fill="#3b82f6" /><circle cx="182" cy="100" r="7" fill="#3b82f6" /><circle cx="172" cy="118" r="7" fill="#3b82f6" />
            <circle cx="62" cy="160" r="7" fill="#8b5cf6" /><circle cx="100" cy="178" r="7" fill="#8b5cf6" /><circle cx="138" cy="160" r="7" fill="#8b5cf6" />
          </g>
          <path d="M100 46 L147 73 L147 127 L100 154 L53 127 L53 73 Z" fill="url(#hexOut)" />
          <path d="M100 60 L134 80 L134 120 L100 140 L66 120 L66 80 Z" fill="url(#hexIn)" />
          <path d="M100 60 L134 80 L134 120 L100 140 Z" fill="rgba(255,255,255,0.08)" />
          <text x="100" y="115" textAnchor="middle" className="font-sora" fontSize="42" fontWeight="800" letterSpacing="1" fill="#ffffff">AI</text>
        </svg>
        <div className="absolute left-0 top-full w-full text-center mt-1.5">
          <span className="inline-flex items-center gap-1.5 font-jetbrains text-[11px] tracking-[0.25em] font-extrabold text-[#0A3D37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_7px_#10b981]" /> AI CORE
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Floating visual system (exact Verdant proportions, responsive) ── */
function HeroVisual() {
  return (
    <div className="relative w-full max-w-[410px] mx-auto aspect-[577/600]">
      {/* connectors — colour-matched, wired into the core */}
      <svg viewBox="0 0 577 600" className="absolute inset-0 w-full h-full overflow-visible z-[1]" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="d6sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0ea5e9" /><stop offset="1" stopColor="#2DD4BF" /></linearGradient>
          <linearGradient id="d6teal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0D9488" /><stop offset="1" stopColor="#2DD4BF" /></linearGradient>
          <linearGradient id="d6emerald" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#10b981" /><stop offset="1" stopColor="#34d399" /></linearGradient>
          <linearGradient id="d6amber" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f59e0b" /><stop offset="1" stopColor="#fbbf24" /></linearGradient>
        </defs>
        <path d="M104 122 C 180 180, 200 234, 260 286" stroke="url(#d6sky)" strokeWidth={2} className="v-dash" style={{ opacity: 0.55 }} />
        <path d="M432 156 C 384 204, 350 244, 314 286" stroke="url(#d6teal)" strokeWidth={2} className="v-dash" style={{ opacity: 0.55, animationDelay: '0.3s' }} />
        <path d="M122 470 C 192 420, 222 378, 266 334" stroke="url(#d6emerald)" strokeWidth={2} className="v-dash" style={{ opacity: 0.55, animationDelay: '0.15s' }} />
        <path d="M452 500 C 398 442, 350 382, 312 340" stroke="url(#d6amber)" strokeWidth={2} className="v-dash" style={{ opacity: 0.55, animationDelay: '0.45s' }} />
      </svg>

      <AICore />

      {/* Cloud Infra — sky */}
      <div className="absolute z-[2] v-floaty" style={{ top: '5.7%', left: '0%', width: '36.4%' }}>
        <div className="rounded-[18px] bg-white/95 backdrop-blur-sm border border-sky-400/16 p-3 sm:p-[18px] shadow-[0_12px_30px_rgba(14,116,150,0.12)]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="grid place-items-center w-9 h-9 rounded-[10px] bg-[#e0f2fe] text-base">☁</div>
            <div className="text-[13px] sm:text-[15px] font-extrabold text-[#0A3D37]">Cloud Infra</div>
          </div>
          <div className="h-[7px] rounded-[5px] bg-[#e6eef2] overflow-hidden mb-2"><div className="h-full w-[90%]" style={{ background: 'linear-gradient(90deg,#0ea5e9,#22d3ee)' }} /></div>
          <div className="text-[11px] sm:text-[13px] text-[#3a5a55] font-medium">99.99% uptime · auto-scale</div>
        </div>
      </div>

      {/* Terminal — dark */}
      <div className="absolute z-[4] v-floaty2" style={{ top: '4.3%', right: '0%', width: '39.9%' }}>
        <div className="rounded-2xl bg-[#0E1A20] overflow-hidden shadow-[0_26px_56px_rgba(8,40,36,0.4)] font-jetbrains">
          <div className="flex gap-1.5 px-4 py-3 border-b border-white/[0.07]">
            <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" /><span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" /><span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
          </div>
          <div className="px-4 py-3.5 text-[11px] sm:text-[13px] leading-[1.95]">
            <div className="text-[#cbd5cf]"><span className="text-[#2DD4BF]">$</span> deploy --prod</div>
            <div className="text-[#5fe3c8]">✓ build passed</div>
            <div className="text-[#5fe3c8]">✓ shipped 1.2s</div>
          </div>
        </div>
      </div>

      {/* Threat Monitor — emerald */}
      <div className="absolute z-[3] v-floaty-slow" style={{ bottom: '9%', left: '1.4%', width: '36.7%' }}>
        <div className="rounded-[18px] bg-white/95 backdrop-blur-sm border border-emerald-400/18 p-3 sm:p-[18px] shadow-[0_12px_30px_rgba(6,95,70,0.12)]">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-[10px] bg-[#d1fae5] text-base">🛡</div>
            <div className="text-[13px] sm:text-[15px] font-extrabold text-[#0A3D37]">Threat Monitor</div>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-[13.5px] text-[#0a7d5e] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" /> All systems secure
          </div>
        </div>
      </div>

      {/* Automations — amber focal accent */}
      <div className="absolute z-[4] v-floaty2-slow" style={{ bottom: '2.7%', right: '2.4%', width: '37.8%' }}>
        <div className="rounded-[18px] bg-white/95 backdrop-blur-sm border border-amber-400/30 p-3 sm:p-[18px] shadow-[0_18px_42px_rgba(180,120,10,0.18)]">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="grid place-items-center w-9 h-9 rounded-[10px] bg-[#fdeccd] text-base">⚡</div>
            <div className="text-[13px] sm:text-[15px] font-extrabold text-[#0A3D37]">Automations</div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-sora text-xl sm:text-2xl font-extrabold text-[#E08600]">1.2k</span>
            <span className="text-[11px] sm:text-[13px] text-[#3a5a55] font-semibold">tasks/day</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden font-jakarta text-[#0A3D37] flex flex-col min-h-screen" style={{ background: '#E9F8F2' }}>
      {/* layered light sources */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: -140, right: -120, width: 760, height: 620, background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.38), rgba(45,212,191,0) 62%)' }} />
      <div aria-hidden className="pointer-events-none absolute" style={{ top: 280, left: 80, width: 560, height: 520, background: 'radial-gradient(ellipse at center, rgba(13,148,136,0.22), rgba(13,148,136,0) 60%)' }} />
      <div aria-hidden className="pointer-events-none absolute" style={{ bottom: -160, left: -80, width: 560, height: 440, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.14), rgba(16,185,129,0) 60%)' }} />
      {/* dot-grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(rgba(10,61,55,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto flex flex-col flex-1">
        {/* ── Hero ── */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center px-5 sm:px-8 lg:px-10 pt-28 lg:pt-24 pb-24 lg:pb-28">
          {/* visual */}
          <div className="order-2 lg:order-1 w-full flex justify-center lg:justify-end">
            <HeroVisual />
          </div>

          {/* copy */}
          <div className="order-1 lg:order-2 w-full max-w-[560px] lg:mr-auto">
            <div className="inline-flex items-center gap-[9px] text-[11.5px] font-bold tracking-[0.5px] uppercase text-[#0c7a70] bg-white/80 border border-[rgba(13,148,136,0.22)] rounded-full px-3.5 py-1.5 mb-4">
              <span className="text-[#0D9488]">✦</span> Modern software, built to automate
            </div>
            <h1 className="font-sora text-[27px] sm:text-[33px] lg:text-[37px] xl:text-[41px] leading-[1.1] font-extrabold tracking-[-1px] text-[#0A3D37] mb-4">
              AI Integration, Automation &amp;{' '}
              <span style={{ background: 'linear-gradient(100deg,#06b6d4 0%,#0ea5e9 45%,#1d4ed8 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Web &amp; App Development
              </span>
            </h1>
            <p className="text-[14px] leading-[1.55] text-[#33514C] max-w-[440px] mb-5">
              We build production-grade AI integrations, intelligent automations, and high-performance web &amp; mobile apps — modern software that handles the busywork, so your team ships faster and scales with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link href="/contact" className="inline-flex items-center gap-2.5 text-[14px] font-bold text-white px-6 py-3 rounded-full shadow-[0_14px_30px_rgba(13,148,136,0.36)] hover:brightness-[1.07] transition" style={{ background: 'linear-gradient(135deg,#0D9488,#0c7a70)' }}>
                Free Consultation <span>→</span>
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#0c7a70] hover:text-[#0A3D37] transition">
                Our Services <span>→</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-[7px] text-[13px] font-bold text-[#0c6b62] px-[15px] py-[9px] rounded-full" style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.24)' }}>
                <span className="text-[#0D9488]">✦</span> AI Integration
              </span>
              <span className="inline-flex items-center gap-[7px] text-[13px] font-bold text-[#9a5a00] px-[15px] py-[9px] rounded-full" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
                <span className="text-[#E08600]">⚡</span> Automation
              </span>
              <span className="inline-flex items-center gap-[7px] text-[13px] font-bold text-[#5b21b6] px-[15px] py-[9px] rounded-full" style={{ background: 'rgba(124,58,237,0.09)', border: '1px solid rgba(124,58,237,0.26)' }}>
                <span className="font-jetbrains text-[#7c3aed]">&lt;/&gt;</span> Web &amp; App Dev
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
