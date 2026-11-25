import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl =
    'https://wa.me/5514997721309?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Finan.Con.';

  const navLinks = [
    { href: '#proposito', label: 'Propósito' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#ferramentas', label: 'Ferramentas' },
    { href: '#guias', label: 'Guias' },
    { href: '#quem-somos', label: 'Quem somos' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#141E37] border-b border-white/[0.07]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7 h-[76px] flex items-center justify-between gap-5">
        <a
          href="#inicio"
          aria-label="Finan.Con, início"
          className="inline-flex items-center shrink-0 py-1"
        >
          <img
            src="/logo-financon.svg"
            alt="Finan.Con Soluções Empresariais"
            width={114}
            height={40}
            className="h-10 w-[114px]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#C9D6DF] hover:text-[#F5F3EE] text-[15.5px] font-medium transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[15px] px-5 py-2.5 rounded-full transition-all duration-150 active:translate-y-px"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
            <span>Falar no WhatsApp</span>
          </a>
        </nav>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[14px] px-4 py-2 rounded-full transition-colors duration-150"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="p-2 text-[#F5F3EE] hover:text-[#F0B44C] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141E37] border-t border-white/10 px-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F5F3EE] hover:text-[#F0B44C] text-lg font-medium py-1 border-b border-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
