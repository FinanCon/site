import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      question: 'O que é o Fator R e por que ele importa para a área da saúde?',
      paragraphs: [
        'No Simples Nacional, várias atividades de serviço, como medicina, odontologia, psicologia e fisioterapia, podem ser tributadas pelo Anexo III ou pelo Anexo V. Quem decide é o Fator R: a folha de pagamento dos últimos 12 meses (incluindo pró-labore) dividida pela receita bruta do mesmo período.',
        'Se o resultado for 28% ou mais, a empresa vai para o Anexo III, com alíquota inicial de 6%. Abaixo disso, fica no Anexo V, que começa em 15,5%. Ajustar o pró-labore com planejamento pode reduzir bastante o imposto, mas o cálculo precisa considerar também o INSS e o Imposto de Renda sobre o pró-labore.',
      ],
    },
    {
      question: 'Certificado digital: e-CNPJ ou e-CPF? A1 ou A3?',
      paragraphs: [
        'O e-CNPJ identifica a empresa e é usado para emitir notas, acessar a Receita Federal e cumprir obrigações. O e-CPF identifica a pessoa e serve, por exemplo, para a declaração de Imposto de Renda e assinaturas digitais.',
        'O modelo A1 fica instalado no computador e vale por 1 ano. O A3 fica em um token ou cartão, tem validade mais longa e pode ser levado para qualquer lugar. Para quem usa sistemas de emissão integrados, o A1 costuma ser o mais prático.',
      ],
    },
    {
      question: 'Reforma tributária: o que muda e quando?',
      paragraphs: [
        'A reforma substitui gradualmente PIS, Cofins, IPI, ICMS e ISS por dois novos tributos sobre o consumo: a CBS (federal) e o IBS (estadual e municipal). Em 2026 acontece a fase de testes, com alíquotas simbólicas destacadas nas notas. A partir de 2027 a CBS passa a valer de verdade, e entre 2029 e 2032 ICMS e ISS vão sendo reduzidos até a extinção, em 2033.',
        'Empresas do Simples Nacional continuam no regime, mas terão novas escolhas a fazer. Cada caso precisa de análise, e é aí que a gente ajuda.',
      ],
    },
    {
      question: 'Como funciona a contabilidade digital da Finan.Con?',
      paragraphs: [
        'Você envia documentos e recebe guias, relatórios e avisos pela plataforma Onvio, integrada ao Sistema Domínio. As notas fiscais e os extratos podem ser importados automaticamente, o que reduz o trabalho manual e o risco de erro. E, quando precisar conversar, a equipe está no WhatsApp.',
      ],
    },
  ];

  return (
    <section id="guias" className="py-24 bg-[#F5F3EE]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        <div className="max-w-[720px]">
          <p className="text-[#284591] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#141E37] leading-[1.08]">
            Guias rápidos
          </h2>
          <p className="mt-4 text-[20px] text-[#4A5A66] leading-[1.6]">
            Respostas diretas para as dúvidas que mais ouvimos dos nossos clientes.
          </p>
        </div>

        <div className="mt-10 border-t border-[#E2E0D8] max-w-[860px]">
          {guides.map((guide, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={guide.question} className="border-b border-[#E2E0D8]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left font-display font-semibold text-[21px] text-[#141E37] hover:text-[#284591] transition-colors cursor-pointer"
                >
                  <span>{guide.question}</span>
                  <Plus
                    className={`w-7 h-7 text-[#3280C2] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-45 text-[#F0B44C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pb-7 space-y-4 max-w-[72ch]">
                    {guide.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-[17.5px] text-[#4A5A66] leading-[1.62]">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
