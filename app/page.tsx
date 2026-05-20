import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import HeroSection from '@/app/components/sections/HeroSection';
import MetricsSection from '@/app/components/sections/MetricsSection';
import TrustedBySection from '@/app/components/sections/TrustedBySection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import ProcessSection from '@/app/components/sections/ProcessSection';
import AboutSection from '@/app/components/sections/AboutSection';
import WhyChooseUsSection from '@/app/components/sections/WhyChooseUsSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import CTABand from '@/app/components/sections/CTABand';

export const metadata = {
  title: 'Toshi Consulting — Secure Your IT-Service | AI, Blockchain, QA, Digital Media',
  description:
    'A reliable and consistent IT solutions partner. AI Integration, Blockchain Consulting, QA Automation & Digital Media — backed by 10+ years of delivery excellence.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MetricsSection />
        <TrustedBySection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
