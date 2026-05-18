'use client';

import dynamic from 'next/dynamic';
import { ArrowRight, Zap } from 'lucide-react';

const Hero3DBackground = dynamic(() => import('@/app/components/3d/Hero3DBackground'), {
  ssr: false,
});

export default function ModernHeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden pt-32">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Hero3DBackground />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8 hover:bg-blue-500/20 transition">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-blue-300 text-sm font-semibold">Next-Gen Technology Solutions</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Secure Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Digital Future
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          Enterprise-grade technology solutions for businesses that want to lead, not follow. We connect, understand, and help you innovate.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105 flex items-center justify-center gap-2 group">
            Free Consultation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
          <button className="px-8 py-4 border-2 border-cyan-500 text-cyan-300 rounded-lg hover:bg-cyan-500/10 font-semibold text-lg hover:border-cyan-400 transition flex items-center justify-center gap-2">
            📞 Call Now: +91-9915718004
          </button>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-white/10 transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
            <p className="text-gray-400 text-sm mt-1">Delivery</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-white/10 transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">99%</div>
            <p className="text-gray-400 text-sm mt-1">Success Rate</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-white/10 transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">10+</div>
            <p className="text-gray-400 text-sm mt-1">Years Expert</p>
          </div>
        </div>
      </div>
    </section>
  );
}
