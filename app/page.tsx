import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';
import HeroSection from '@/app/components/sections/HeroSection';
import MetricsSection from '@/app/components/sections/MetricsSection';
import AboutSection from '@/app/components/sections/AboutSection';
import WhyChooseUsSection from '@/app/components/sections/WhyChooseUsSection';

export const metadata = {
  title: 'Toshi Consulting - Technology Solutions',
  description: 'Technology solutions partner committed to helping businesses improve efficiency and innovate with confidence.',
};

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <AboutSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
