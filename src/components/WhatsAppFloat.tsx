import React from 'react';
import { WhatsAppIcon } from './Navbar';

export const WhatsAppFloat: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/5514997721309?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Finan.Con.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-[18px] bottom-[18px] z-30 flex lg:hidden w-[58px] h-[58px] rounded-full bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] items-center justify-center shadow-[0_8px_24px_rgba(20,30,55,0.35)] transition-transform active:translate-y-px"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
};
