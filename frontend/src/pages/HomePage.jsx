import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStatsSection } from '../components/home/TrustStatsSection';
import { FeaturedProfilesSection } from '../components/home/FeaturedProfilesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CallToActionSection } from '../components/home/CallToActionSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustStatsSection />
      <FeaturedProfilesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

