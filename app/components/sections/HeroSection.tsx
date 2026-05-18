'use client';

import dynamic from 'next/dynamic';

const Hero3DBackground = dynamic(() => import('@/app/components/3d/Hero3DBackground'), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden pt-32">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Hero3DBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Secure Your IT-Service
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Technology solutions partner committed to helping businesses improve efficiency and innovate with confidence.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
            Free Consultation
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold text-lg">
            📞 Call Us Now
          </button>
        </div>
      </div>
    </section>
  );
}
