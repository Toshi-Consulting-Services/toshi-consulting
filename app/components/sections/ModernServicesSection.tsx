'use client';

import Link from 'next/link';
import { Cpu, Cloud, Zap, Shield } from 'lucide-react';

export default function ModernServicesSection() {
  const services = [
    {
      title: 'Blockchain Solutions',
      description: 'Enterprise-grade blockchain & smart contracts for transparent, secure distributed systems.',
      icon: Cpu,
      gradient: 'from-blue-600 to-cyan-600',
      color: 'text-blue-400',
    },
    {
      title: 'AI & Machine Learning',
      description: 'AI-powered automation and intelligent systems that drive competitive advantage.',
      icon: Zap,
      gradient: 'from-cyan-600 to-teal-600',
      color: 'text-cyan-400',
    },
    {
      title: 'DevOps & CI/CD',
      description: 'Accelerated deployment pipelines and infrastructure automation for enterprise scale.',
      icon: Cloud,
      gradient: 'from-teal-600 to-blue-600',
      color: 'text-teal-400',
    },
    {
      title: 'Cloud Security',
      description: 'Secure, scalable multi-cloud infrastructure with compliance-ready architecture.',
      icon: Shield,
      gradient: 'from-indigo-600 to-blue-600',
      color: 'text-indigo-400',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive technology solutions designed to transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href="/services"
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition duration-300`}></div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition transform`}>
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-3 ${service.color} group-hover:text-white transition`}>
                  {service.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition mb-4">
                  {service.description}
                </p>

                {/* Learn More */}
                <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition font-semibold">
                  Learn More
                  <span className="group-hover:translate-x-2 transition">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
