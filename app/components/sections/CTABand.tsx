import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function CTABand() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-600 text-white p-10 md:p-14 overflow-hidden shadow-[0_30px_70px_-30px_rgba(15,118,110,0.6)]">
          {/* Decorative rings */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full border-2 border-white/15" />
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-white/5 blur-2xl" />

          <div className="relative grid md:grid-cols-[1.4fr,1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                Free 30-min consultation
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Ready to <span className="text-cyan-100">secure your IT-service</span>?
              </h2>
              <p className="mt-4 text-teal-50/90 text-base md:text-lg max-w-xl">
                Tell us where you want to be in 6 months — we'll map the
                technology, security, and delivery to get you there. No
                templates, no pressure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-7 py-3.5 rounded-full font-bold shadow-[0_15px_35px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition"
              >
                Book Consultation
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
              </Link>
              <a
                href="tel:+919915718004"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border-2 border-white/40 text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition"
              >
                <Phone size={18} /> +91-9915718004
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
