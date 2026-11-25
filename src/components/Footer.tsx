import React from 'react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-[#141E37] text-[#C9D6DF] py-12 text-[14px] border-t border-white/[0.06]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        <div className="flex flex-wrap gap-6 justify-between items-center pb-8 border-b border-white/[0.08]">
          <a href="#inicio" aria-label="Finan.Con, voltar ao topo">
            <img
              src="/logo-financon.svg"
              alt="Finan.Con Soluções Empresariais"
              width={102}
              height={36}
              className="h-9 w-[102px]"
            />
          </a>

          <div className="text-left sm:text-right">
            <p className="leading-relaxed">
              <em className="text-[#F0B44C] not-italic font-semibold">
                Direcionar para transformar
              </em>
              <br />
              Finan.Con Soluções Empresariais Ltda · CNPJ 44.541.903/0001-55 · Bauru/SP
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13.5px] text-[#C9D6DF]/80">
          <p>
            © {new Date().getFullYear()} Finan.Con Soluções Empresariais. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLegal('privacidade')}
              className="hover:text-[#F5F3EE] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Política de Privacidade (LGPD)
            </button>
            <span aria-hidden="true" className="text-white/20">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-[#F5F3EE] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Política de Cookies
            </button>
            <span aria-hidden="true" className="text-white/20">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('termos')}
              className="hover:text-[#F5F3EE] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
