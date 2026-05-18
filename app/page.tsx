import ModernNavbar from '@/app/components/common/ModernNavbar';
import Footer from '@/app/components/common/Footer';
import ModernHeroSection from '@/app/components/sections/ModernHeroSection';
import ModernServicesSection from '@/app/components/sections/ModernServicesSection';
import AboutSection from '@/app/components/sections/AboutSection';
import WhyChooseUsSection from '@/app/components/sections/WhyChooseUsSection';

export const metadata = {
  title: 'Toshi Consulting - Enterprise Technology Solutions | Blockchain, AI, Cloud & DevOps',
  description: 'Enterprise cybersecurity, digital transformation & cloud consulting. Scalable IT solutions, DevOps automation & AI-powered technology for growing businesses.',
};

export default function Home() {
  return (
    <main className="w-full bg-slate-950">
      <ModernNavbar />
      <ModernHeroSection />
      <ModernServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
