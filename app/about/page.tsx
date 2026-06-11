import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import CTABand from '@/app/components/sections/CTABand';
import MetricsSection from '@/app/components/sections/MetricsSection';
import WhyChooseUsSection from '@/app/components/sections/WhyChooseUsSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import { Target, Compass, ShieldCheck, Users, Sparkles, Heart } from 'lucide-react';

export const metadata = {
  title: 'About Toshi Consulting — Our Mission, Vision & Story',
  description:
    'A decade of reliable delivery. Toshi Consulting partners with growing businesses to deliver innovative, scalable, future-ready digital solutions.',
};

const values = [
  { icon: ShieldCheck, title: 'Integrity',     desc: 'We say what we will do — and then do it.' },
  { icon: Sparkles,    title: 'Craftsmanship', desc: 'Quality is the default; speed comes from discipline.' },
  { icon: Heart,       title: 'Partnership',   desc: 'Your KPIs are our KPIs — no transactional handoffs.' },
  { icon: Users,       title: 'Empowerment',   desc: 'We train your team to own what we build together.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-24 hero-bg overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-blue-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Our Story
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              About{' '}
              <span className="brand-gradient-text">Toshi Consulting</span>
            </h1>
            <p className="mt-5 text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We're a technology-solutions partner committed to helping
              businesses improve efficiency and innovate with confidence —
              built on a decade of delivery for clients across India and beyond.
            </p>
          </div>
        </section>

        <MetricsSection />

        {/* Mission / Vision */}
        <section className="py-24 section-mint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8">
            <div className="relative bg-white rounded-3xl p-10 border border-blue-100 shadow-[0_15px_45px_-25px_rgba(0,71,212,0.4)] overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-100/60 blur-2xl" />
              <div className="relative">
                <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_15px_30px_-12px_rgba(0,101,248,0.6)]">
                  <Target size={26} />
                </div>
                <h2 className="mt-5 text-3xl font-black text-slate-900">Our Mission</h2>
                <p className="mt-3 text-slate-600 leading-relaxed text-lg">
                  Provide reliable end-to-end support and solutions — ensuring
                  seamless operations and customer satisfaction. We're
                  committed to delivering quality applications, accelerating
                  efficiency, and building trust-based relationships with our
                  clients.
                </p>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-violet-600 to-cyan-500 text-white rounded-3xl p-10 shadow-[0_25px_60px_-25px_rgba(0,71,212,0.6)] overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border-2 border-white/15" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full border border-white/15" />
              <div className="relative">
                <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur border border-white/25 text-white">
                  <Compass size={26} />
                </div>
                <h2 className="mt-5 text-3xl font-black">Our Vision</h2>
                <p className="mt-3 text-blue-50 leading-relaxed text-lg">
                  Become a trusted global technology partner empowering
                  businesses with innovative, scalable, and future-ready
                  digital solutions. Be the go-to partner for organisations
                  seeking excellence and transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> What we stand for
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                Our <span className="brand-gradient-text">Core Values</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="group bg-white rounded-2xl p-7 border border-blue-100 shadow-[0_10px_30px_-20px_rgba(0,71,212,0.4)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-22px_rgba(0,71,212,0.5)] transition">
                    <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_12px_25px_-10px_rgba(0,101,248,0.6)] group-hover:scale-110 transition">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{v.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
