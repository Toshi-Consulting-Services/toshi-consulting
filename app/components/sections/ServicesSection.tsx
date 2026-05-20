import Link from 'next/link';
import { Brain, Link2, Bug, Megaphone, ArrowUpRight, Sparkles } from 'lucide-react';
import Reveal from '@/app/components/common/Reveal';

export const services = [
  {
    slug: 'ai-integration',
    title: 'AI Integration',
    description:
      'Seamlessly integrate AI capabilities into your existing applications to enhance functionality, improve efficiency, and drive innovation across your workflows.',
    icon: Brain,
    tone: 'from-teal-500 to-cyan-500',
    soft: 'bg-teal-50',
  },
  {
    slug: 'blockchain-consulting',
    title: 'Blockchain Consulting',
    description:
      'Unlock the potential of your business with tailored blockchain solutions that drive automation, enhance transparency, and optimize decentralised operations.',
    icon: Link2,
    tone: 'from-cyan-500 to-sky-500',
    soft: 'bg-cyan-50',
  },
  {
    slug: 'qa-testing-and-automations',
    title: 'QA Testing & Automations',
    description:
      'Empower your team with expert-led trainings in Python, Java, and Cloud technologies — equipping them with the skills needed to succeed in the digital age.',
    icon: Bug,
    tone: 'from-emerald-500 to-teal-500',
    soft: 'bg-emerald-50',
  },
  {
    slug: 'digital-media-marketing-and-branding',
    title: 'Digital Media Marketing & Branding',
    description:
      'Build a powerful online presence with strategies that connect, engage, and convert. From social-media campaigns to complete brand-identity design, we help businesses stand out in the digital world and grow with confidence.',
    icon: Megaphone,
    tone: 'from-teal-600 to-emerald-600',
    soft: 'bg-teal-50',
  },
];

export default function ServicesSection() {
  const [featured, ...rest] = services;
  const FeaturedIcon = featured.icon;

  return (
    <section className="relative py-24 section-mint overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(15,118,110,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,1)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute top-20 right-10 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Our Services
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            We Offer{' '}
            <span className="font-display brand-gradient-text">Professional Solutions</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Transform your business with our expert IT solutions to enhance
            efficiency, drive innovation, and deliver insights for smarter
            decision-making.
          </p>
        </Reveal>

        {/* Featured + side stack */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured large card */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <Link
              href={`/services#${featured.slug}`}
              className="group relative block h-full bg-white rounded-3xl p-8 border border-teal-100 shadow-[0_15px_45px_-25px_rgba(15,118,110,0.45)] hover:shadow-[0_25px_55px_-22px_rgba(15,118,110,0.55)] hover:-translate-y-1 transition overflow-hidden"
            >
              <div className={`absolute -top-24 -right-24 w-72 h-72 ${featured.soft} rounded-full blur-3xl opacity-70`} />
              {/* Decorative mock dashboard */}
              <div className="absolute right-6 bottom-6 hidden md:block opacity-90">
                <div className="w-72 h-44 rounded-2xl bg-white border border-teal-100 shadow-[0_25px_50px_-20px_rgba(15,118,110,0.45)] p-4 rotate-3 group-hover:rotate-2 transition">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-300" />
                    <span className="w-2 h-2 rounded-full bg-amber-300" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="ml-auto text-[10px] font-semibold text-slate-400">ai-pipeline.live</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <div className="h-1.5 rounded bg-teal-200" />
                        <div className="h-1.5 rounded bg-teal-100" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-end gap-1 h-16">
                    {[40, 70, 55, 90, 65, 85, 50, 75].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t bg-gradient-to-t ${featured.tone}`}
                        style={{ height: `${h}%`, opacity: 0.6 + i * 0.04 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative max-w-sm">
                <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-200 text-teal-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Most requested
                </div>
                <div className={`mt-5 inline-grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br ${featured.tone} text-white shadow-[0_18px_35px_-12px_rgba(20,184,166,0.65)] group-hover:scale-110 transition`}>
                  <FeaturedIcon size={30} />
                </div>
                <h3 className="mt-5 text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-teal-700 font-bold">
                  Explore the practice
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                  />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Side stack */}
          {rest.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i + 1) * 90}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group relative block bg-white rounded-3xl p-6 border border-teal-100 shadow-[0_10px_30px_-20px_rgba(15,118,110,0.4)] hover:shadow-[0_22px_44px_-22px_rgba(15,118,110,0.55)] hover:-translate-y-1 transition overflow-hidden h-full"
                >
                  <div className={`absolute -top-12 -right-12 w-32 h-32 ${s.soft} rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition`} />
                  <div className="relative">
                    <div className={`inline-grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-[0_15px_30px_-12px_rgba(20,184,166,0.6)] group-hover:scale-110 transition`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {s.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-teal-700 text-sm font-bold">
                      View details
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
