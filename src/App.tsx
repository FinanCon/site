import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { DiagnosticCalculator } from './components/DiagnosticCalculator';
import { FAQSection } from './components/FAQSection';
import { AboutUsSection } from './components/AboutUsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';

export const App: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacidade');

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#141E37]">
      <Navbar />
      <main id="inicio" className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SolutionsSection />
        <DiagnosticCalculator />
        <FAQSection />
        <AboutUsSection />
        <CTASection />
      </main>
      <Footer onOpenLegal={handleOpenLegal} />
      <WhatsAppFloat />
      <CookieBanner onOpenLegal={handleOpenLegal} />
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
};

export default App;
