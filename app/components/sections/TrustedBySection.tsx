import Reveal from '@/app/components/common/Reveal';

const logos = [
  { name: 'Stellar Bank',  glyph: 'STELLAR' },
  { name: 'Nimbus',        glyph: 'nimbus' },
  { name: 'Vega Health',   glyph: 'VEGA' },
  { name: 'Orbit Labs',    glyph: 'ORBIT' },
  { name: 'Atlas Robotics', glyph: 'ATLAS' },
  { name: 'Lumen',         glyph: 'lumen' },
];

const monogramSVGs: Record<string, React.ReactNode> = {
  STELLAR: (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 1l2.6 7.6H22l-6.2 4.6L18.2 21 12 16.4 5.8 21l2.4-7.8L2 8.6h7.4z" />
      </svg>
      <span>STELLAR</span>
    </span>
  ),
  nimbus: (
    <span className="inline-flex items-center gap-1.5 lowercase">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 16a4 4 0 010-8 6 6 0 0111.3-2A5 5 0 0119 16z" />
      </svg>
      <span>nimbus</span>
    </span>
  ),
  VEGA: (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 3l9 16H3z" />
      </svg>
      <span className="tracking-[0.2em]">VEGA</span>
    </span>
  ),
  ORBIT: (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span>ORBIT</span>
    </span>
  ),
  ATLAS: (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
      </svg>
      <span>ATLAS</span>
    </span>
  ),
  lumen: (
    <span className="inline-flex items-center gap-1.5 lowercase">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" d="M12 3v2m0 14v2M5 12H3m18 0h-2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
      <span>lumen</span>
    </span>
  ),
};

export default function TrustedBySection() {
  return (
    <section className="relative py-12 bg-white border-y border-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
            Trusted by ambitious teams across India & beyond
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-7">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-6 items-center">
            {logos.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-center text-slate-400 hover:text-teal-700 font-extrabold text-base md:text-lg tracking-tight transition grayscale hover:grayscale-0"
                aria-label={l.name}
                title={l.name}
              >
                {monogramSVGs[l.glyph]}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
