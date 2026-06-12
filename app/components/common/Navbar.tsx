'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { services } from '@/app/data/services';
import { openQuoteBot } from '@/app/components/chat/quoteBus';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', dropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white text-[13px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-6 min-w-0">
            <a href="tel:+919915718004" className="flex items-center gap-2 hover:text-teal-100 transition">
              <Phone size={13} /> +91-9915718004
            </a>
            <a href="mailto:info@toshiconsulting.com" className="flex items-center gap-2 hover:text-teal-100 transition">
              <Mail size={13} /> info@toshiconsulting.com
            </a>
            <span className="hidden lg:flex items-center gap-2">
              <MapPin size={13} /> IT Park Panchkula, Haryana
            </span>
          </div>
          <div className="flex md:hidden items-center gap-2 text-[12px]">
            <Phone size={12} /> +91-9915718004
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-teal-50">
              <Clock size={12} /> Mon–Fri · 10:00–18:00
            </span>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded-full font-semibold transition"
            >
              Request Callback <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(15,118,110,0.18)]'
            : 'bg-white/80 backdrop-blur'
        } border-b border-teal-100/60`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Toshi Consulting — Home">
            <Image
              src="/logo.png"
              alt="Toshi Consulting"
              width={596}
              height={246}
              priority
              className="h-10 sm:h-11 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);

              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
                        active ? 'text-teal-700' : 'text-slate-700 hover:text-teal-700'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={14} className="transition group-hover:rotate-180" />
                      {active && (
                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] w-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                      )}
                    </Link>

                    {/* Dropdown mega-menu (2×4 grid) — pt-3 bridges the hover gap */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition duration-200">
                      <div className="w-[680px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-teal-100 shadow-[0_25px_60px_-20px_rgba(15,118,110,0.35)] p-3">
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((s) => {
                            const Icon = s.icon;
                            return (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 transition group/item"
                              >
                                <span className={`grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br ${s.tone} text-white shrink-0`}>
                                  <Icon size={16} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-bold text-slate-800 group-hover/item:text-teal-700 transition">
                                    {s.title}
                                  </span>
                                  <span className="block text-xs text-slate-500 leading-snug line-clamp-2">
                                    {s.short}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          href="/services"
                          className="mt-2 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold text-teal-700 bg-teal-50/60 hover:bg-teal-100 transition border-t border-teal-50"
                        >
                          View all services <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition ${
                    active ? 'text-teal-700' : 'text-slate-700 hover:text-teal-700'
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] w-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA — opens the Quote Bot (Toshi Assistant) instead of navigating */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openQuoteBot()}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_10px_25px_-12px_rgba(20,184,166,0.9)] hover:shadow-[0_14px_30px_-10px_rgba(6,182,212,0.9)] hover:-translate-y-0.5 transition cursor-pointer"
            >
              Get Quote
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-teal-700 hover:bg-teal-50 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile sheet */}
        {open && (
          <div className="lg:hidden border-t border-teal-100 bg-white max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                      isActive(item.href)
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-slate-700 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-teal-100 pl-3">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => { setOpen(false); openQuoteBot(); }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-5 py-3 rounded-full text-sm font-bold cursor-pointer"
              >
                Get Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
