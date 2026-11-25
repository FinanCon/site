import React from 'react';

export const AboutUsSection: React.FC = () => {
  const partners = [
    {
      name: 'Fernanda Ruiz Mussato',
      role: 'Sócia · Diretora Financeira (CFO)',
      image: '/fernanda-mussato.jpg',
      imageAlt: 'Fernanda Ruiz Mussato — Sócia e Diretora Financeira da Finan.Con',
      education: 'Administração de Empresas e MBA em Gestão Empresarial.',
      experience:
        '22 anos no Grupo Paschoalotto, na área financeira, e 5 anos na área financeira do Hospital Prontocor.',
    },
    {
      name: 'Michelle Rossini Crepaldi',
      role: 'Sócia · Contadora (CAO · CRC 1SP337666/O-0)',
      image: '/michelle-rossini.jpg',
      imageAlt: 'Michelle Rossini Crepaldi — Sócia e Contadora da Finan.Con',
      education:
        'Ciências Contábeis, MBA em Controladoria e MBA em Contabilidade, Compliance e Direito Tributário.',
      experience: '12 anos no Grupo Paschoalotto, na área contábil e tributária.',
    },
  ];

  const values = [
    {
      name: 'Respeito',
      desc: 'Tratar a si e aos outros com consideração.',
    },
    {
      name: 'Honestidade',
      desc: 'Agir com a verdade em todas as situações.',
    },
    {
      name: 'Lealdade',
      desc: 'Ser transparente mesmo diante dos desafios.',
    },
    {
      name: 'Empatia',
      desc: 'Colocar-se no lugar do próximo, compreendendo suas limitações.',
    },
    {
      name: 'Comprometimento',
      desc: 'Dedicar-se com responsabilidade e zelo em todas as ações.',
    },
  ];

  return (
    <section id="quem-somos" className="bg-[#141E37] text-[#F5F3EE] py-24">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        {/* Liderança */}
        <p className="text-[#F0B44C] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
          Quem está à frente
        </p>
        <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#F5F3EE] leading-[1.08] max-w-[18ch]">
          Liderança feminina, experiência de grandes operações
        </h2>
        <p className="mt-4 text-[20px] text-[#C9D6DF] max-w-[60ch]">
          Uma equipe detalhista, especialista, determinada e acolhedora.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mt-14">
          {partners.map((person) => (
            <article
              key={person.name}
              className="rounded-[20px] bg-[#18233D] border border-[#F5F3EE]/12 overflow-hidden flex flex-col"
            >
              {/* Retrato Editorial */}
              <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#0E1526] border-b-[3px] border-[#F0B44C]">
                <img
                  src={person.image}
                  alt={person.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Bio e Credenciais */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-[25px] sm:text-[26px] text-[#F5F3EE] leading-[1.15]">
                    {person.name}
                  </h3>
                  <p className="text-[#7FD0E8] font-semibold text-[15.5px] mt-2 mb-4">
                    {person.role}
                  </p>
                  <p className="text-[#C9D6DF] text-[16.5px] leading-[1.6]">
                    {person.education}
                  </p>
                  <p className="text-[#C9D6DF] text-[16.5px] leading-[1.6] mt-2.5">
                    {person.experience}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Valores e Condutas (Tabela Editorial da Apresentação Institucional) */}
        <div className="mt-20 pt-14 border-t border-[#F5F3EE]/15">
          <div className="mb-8">
            <p className="text-[#F0B44C] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-2">
              Valores e condutas
            </p>
            <h3 className="font-display font-bold text-[clamp(26px,3.2vw,36px)] text-[#F5F3EE]">
              Como agimos
            </h3>
          </div>

          <div className="divide-y divide-[#F5F3EE]/15 border-t border-b border-[#F5F3EE]/15">
            {values.map((val) => (
              <div
                key={val.name}
                className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-4 font-display font-bold text-[20px] text-[#F0B44C]">
                  {val.name}
                </div>
                <div className="sm:col-span-8 text-[17px] text-[#C9D6DF]">
                  {val.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
