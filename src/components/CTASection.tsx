import React from 'react';
import { WhatsAppIcon } from './Navbar';

export const CTASection: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/5514997721309?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Finan.Con.';

  return (
    <section id="contato" className="py-24 bg-[#F5F3EE]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        <div className="lg:col-span-6">
          <p className="text-[#284591] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
            Contato direto
          </p>
          <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#141E37] leading-[1.08]">
            Vamos conversar?
          </h2>
          <p className="mt-4 text-[20px] text-[#4A5A66] leading-[1.6] max-w-[50ch]">
            Conte como está a sua empresa hoje. A gente mostra o caminho para ter mais clareza, segurança e tranquilidade.
          </p>
          <p className="mt-3 text-[16.5px] text-[#284591] font-medium">
            Transformar complexidade em clareza, gerar prosperidade e construir legados duradouros.
          </p>

          <div className="mt-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[17px] px-7 py-4 rounded-full transition-all duration-150 active:translate-y-px"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          <div className="mt-10 border-t border-[#E2E0D8]">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[28px_1fr] gap-4 items-start py-4 border-b border-[#E2E0D8] text-[#141E37] no-underline group"
            >
              <WhatsAppIcon className="w-6 h-6 mt-0.5 text-[#3280C2]" />
              <span>
                <small className="block text-[#4A5A66] text-[14px]">WhatsApp</small>
                <strong className="font-semibold text-[18px] group-hover:text-[#284591] transition-colors">
                  (14) 99772-1309
                </strong>
              </span>
            </a>

            {/* E-mail */}
            <a
              href="mailto:contato@financon.com.br"
              className="grid grid-cols-[28px_1fr] gap-4 items-start py-4 border-b border-[#E2E0D8] text-[#141E37] no-underline group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-6 h-6 mt-0.5 text-[#3280C2]"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span>
                <small className="block text-[#4A5A66] text-[14px]">E-mail</small>
                <strong className="font-semibold text-[18px] group-hover:text-[#284591] transition-colors">
                  contato@financon.com.br
                </strong>
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/finan.con_/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[28px_1fr] gap-4 items-start py-4 border-b border-[#E2E0D8] text-[#141E37] no-underline group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-6 h-6 mt-0.5 text-[#3280C2]"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>
                <small className="block text-[#4A5A66] text-[14px]">Instagram</small>
                <strong className="font-semibold text-[18px] group-hover:text-[#284591] transition-colors">
                  @finan.con_
                </strong>
              </span>
            </a>

            {/* Endereço */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+Get%C3%BAlio+Vargas+22-25+Bauru+SP"
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[28px_1fr] gap-4 items-start py-4 border-b border-[#E2E0D8] text-[#141E37] no-underline group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-6 h-6 mt-0.5 text-[#3280C2]"
              >
                <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z" />
                <circle cx="12" cy="10" r="2.3" />
              </svg>
              <span>
                <small className="block text-[#4A5A66] text-[14px]">Endereço</small>
                <strong className="font-semibold text-[18px] group-hover:text-[#284591] transition-colors">
                  Av. Getúlio Vargas, 22-25, Torre 2, sala 102 · Bauru/SP
                </strong>
              </span>
            </a>
          </div>
        </div>

        {/* Coluna Direita: Fotografia Arquitetônica do Escritório em Bauru */}
        <div className="lg:col-span-6">
          <figure className="rounded-[20px] overflow-hidden border border-[#E2E0D8] bg-white">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#141E37]">
              <img
                src="/escritorio-financon.jpg"
                alt="Escritório da Finan.Con Soluções Empresariais na Av. Getúlio Vargas em Bauru/SP"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-5 sm:px-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#E2E0D8]">
              <div>
                <strong className="font-display font-bold text-[17px] text-[#141E37] block">
                  Nosso espaço na Av. Getúlio Vargas
                </strong>
                <span className="text-[14.5px] text-[#4A5A66]">
                  Torre 2, sala 102 · Bauru/SP — Atendimento presencial e digital
                </span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Get%C3%BAlio+Vargas+22-25+Bauru+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-semibold text-[#284591] hover:text-[#141E37] underline underline-offset-4 shrink-0"
              >
                Ver no mapa →
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
