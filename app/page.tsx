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
  title: 'AI Integration, Automation & Web Apps | Toshi Consulting',
  description:
    'Toshi Consulting builds AI integrations, intelligent automation, and high-performance web & mobile apps — software that automates your work and scales fast.',
};

export default function HomePage() {
  return (
    <>
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
