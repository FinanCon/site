import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { DiagnosticCalculator } from './components/DiagnosticCalculator';
import { FAQSection } from './components/FAQSection';
import { AboutUsSection } from './components/AboutUsSection';
import { CTASection } from './components/CTASection';
import { BlogPage } from './components/BlogPage';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { LegalModal, LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';

function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean || '/';
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacidade');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((target: string) => {
    if (target.startsWith('/#') || target.startsWith('#')) {
      const hash = target.replace(/^\/?#/, '');
      if (normalizePath(window.location.pathname) !== '/') {
        window.history.pushState({}, '', `/#${hash}`);
        setCurrentPath('/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const next = normalizePath(target);
    if (next !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', next);
      setCurrentPath(next);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const isBlogIndex = currentPath === '/conteudos' || currentPath === '/blog';
  const blogSlugMatch = currentPath.match(/^\/(?:conteudos|blog)\/([^/]+)$/);
  const blogSlug = blogSlugMatch ? decodeURIComponent(blogSlugMatch[1]) : undefined;
  const isBlogView = isBlogIndex || Boolean(blogSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#141E37]">
      <Navbar onNavigate={navigate} currentPath={currentPath} />
      <main id="inicio" className="flex-grow">
        {isBlogView ? (
          <BlogPage slug={blogSlug} onNavigate={navigate} />
        ) : (
          <>
            <HeroSection />
            <ProblemSection />
            <SolutionsSection />
            <DiagnosticCalculator />
            <FAQSection />
            <AboutUsSection />
            <CTASection />
          </>
        )}
      </main>
      <Footer onOpenLegal={handleOpenLegal} onNavigate={navigate} />
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
