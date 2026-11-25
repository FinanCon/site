import React, { useState, useEffect } from 'react';
import { LegalTab } from './LegalModal';

interface CookieBannerProps {
  onOpenLegal: (tab: LegalTab) => void;
}

const STORAGE_KEY = 'financon_cookie_consent_v1';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de privacidade e cookies"
      className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-[520px] z-40 bg-[#141E37] text-[#F5F3EE] rounded-[20px] p-5 sm:p-6 border border-[#F5F3EE]/15 shadow-[0_16px_40px_rgba(20,30,55,0.45)]"
    >
      <p className="text-[14.5px] text-[#C9D6DF] leading-[1.55]">
        Usamos apenas armazenamento essencial para o funcionamento do site e das calculadoras, em conformidade com a{' '}
        <strong className="text-[#F5F3EE] font-semibold">LGPD</strong>. Nenhum dado digitado nos simuladores é salvo sem você enviar.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-[13.5px]">
          <button
            type="button"
            onClick={() => onOpenLegal('privacidade')}
            className="text-[#7FD0E8] hover:text-[#F5F3EE] underline underline-offset-4 font-medium cursor-pointer"
          >
            Política de Privacidade
          </button>
          <span className="text-[#C9D6DF]/40">·</span>
          <button
            type="button"
            onClick={() => onOpenLegal('cookies')}
            className="text-[#7FD0E8] hover:text-[#F5F3EE] underline underline-offset-4 font-medium cursor-pointer"
          >
            Cookies
          </button>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[14.5px] px-5 py-2 rounded-full transition-colors cursor-pointer"
        >
          Concordar e fechar
        </button>
      </div>
    </aside>
  );
};
