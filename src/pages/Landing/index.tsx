import { Footer } from '@/components/layout/Footer';
import { CTASection } from './components/CTASection';
import { FeaturesSection } from './components/FeaturesSection';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InteractiveDemoSection } from './components/InteractiveDemoSection';
import { LandingHeader } from './components/LandingHeader';
import { TestimonialsSection } from './components/TestimonialsSection';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InteractiveDemoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
  
export default LandingPage;