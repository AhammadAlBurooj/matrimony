import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { QuickSearchCard } from '../components/home/QuickSearchCard';
import { RegisteredProfilesSection } from '../components/home/RegisteredProfilesSection';
import { TrustStatsSection } from '../components/home/TrustStatsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CallToActionSection } from '../components/home/CallToActionSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-[#FAFAFA]">
      <HeroSection />
      <QuickSearchCard />
      <RegisteredProfilesSection />
      <TrustStatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};
