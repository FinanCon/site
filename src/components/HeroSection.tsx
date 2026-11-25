import React from 'react';
import { WhatsAppIcon } from './Navbar';

export const HeroSection: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/5514997721309?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Finan.Con.';

  return (
    <section className="bg-[#141E37] text-[#F5F3EE] overflow-hidden relative border-b border-white/[0.06]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Texto Principal */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="text-[#F0B44C] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-5">
              Para quem existimos
            </p>
            <h1 className="font-display font-bold text-[clamp(42px,6.2vw,76px)] leading-[1.06] tracking-[-0.02em] text-[#F5F3EE] max-w-[13ch]">
              Empreender não deveria tirar o seu sono.
            </h1>
            <p className="mt-7 text-[19px] sm:text-[21px] text-[#C9D6DF] leading-[1.58] max-w-[48ch]">
              Contabilidade, BPO financeiro e proteção patrimonial para quem empreende. Organizamos os números da sua empresa para você decidir com clareza e segurança.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[17px] px-7 py-4 rounded-full transition-all duration-150 active:translate-y-px"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Falar no WhatsApp</span>
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center text-[#F5F3EE] border-[1.5px] border-[#F5F3EE]/35 hover:border-[#F5F3EE] font-semibold text-[17px] px-7 py-4 rounded-full transition-colors duration-150"
              >
                Ver serviços
              </a>
              <a
                href="#ferramentas"
                className="inline-flex items-center justify-center text-[#7FD0E8] hover:text-[#F5F3EE] font-semibold text-[16px] px-4 py-3.5 transition-colors duration-150 underline underline-offset-4"
              >
                Simular impostos e diagnóstico
              </a>
            </div>
          </div>

          {/* Símbolo Arquitetônico Ascendente da Marca */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <img
              src="/hero-mark.svg"
              alt=""
              aria-hidden="true"
              width={380}
              height={476}
              fetchPriority="high"
              className="w-[180px] sm:w-[240px] lg:w-[380px] aspect-[94.4/118.2] h-auto animate-rise-mark select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
