import React from 'react';
import { QuickSearchCard } from '../components/home/QuickSearchCard';
import { RegisteredProfilesSection } from '../components/home/RegisteredProfilesSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-[#FAFAFA]">
      <QuickSearchCard />
      <RegisteredProfilesSection />
    </div>
  );
};
