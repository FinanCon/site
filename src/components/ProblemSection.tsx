import React from 'react';

export const ProblemSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Organizar',
      description:
        'Colocamos em ordem impostos, documentos, pessoas e finanças, para que nada fique escondido.',
      featured: false,
    },
    {
      num: '02',
      title: 'Direcionar',
      description:
        'Traduzimos números em orientação clara, para que cada decisão seja tomada com segurança.',
      featured: false,
    },
    {
      num: '03',
      title: 'Transformar',
      description:
        'Com clareza e direção, o negócio deixa de ser fonte de preocupação e passa a gerar prosperidade.',
      featured: true,
    },
  ];

  const differentials = [
    {
      title: 'Clareza',
      description: 'Números explicados de forma simples, sem “contabilês”.',
    },
    {
      title: 'Segurança',
      description: 'Obrigações em dia e decisões baseadas em informação correta.',
    },
    {
      title: 'Resultado',
      description: 'Gestão voltada ao crescimento e à saúde financeira do negócio.',
    },
    {
      title: 'Suporte qualificado',
      description: 'Equipe especialista, preparada para orientar em cada etapa.',
    },
    {
      title: 'Presença ativa',
      description: 'Atendimento por WhatsApp, e-mail, telefone e reuniões presenciais ou on-line.',
    },
    {
      title: 'Tranquilidade',
      description: 'Você cuida do seu negócio; nós cuidamos dos números.',
    },
  ];

  return (
    <section id="proposito" className="py-24 bg-[#F5F3EE] border-b border-[#E2E0D8]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        {/* Intro Editorial: Nosso Propósito */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-6">
            <p className="text-[#284591] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
              Nosso propósito
            </p>
            <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#141E37] leading-[1.08]">
              Direcionar para transformar
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[19px] sm:text-[20px] text-[#4A5A66] leading-[1.6]">
              Muitos empreendedores vivem a rotina com informação de menos e insegurança de mais: medo de errar nos impostos, de ser multado, de não saber para onde vai o dinheiro. O que eles buscam é{' '}
              <strong className="text-[#141E37] font-semibold">
                confiança, acolhimento e tranquilidade
              </strong>
              .
            </p>
          </div>
        </div>

        {/* 3 Etapas do Propósito (Estilo Apresentação Institucional + Editorial) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className={
                step.featured
                  ? 'rounded-[20px] bg-[#141E37] text-[#F5F3EE] p-8 sm:p-10 flex flex-col justify-between'
                  : 'rounded-[20px] bg-white border border-[#E2E0D8] text-[#141E37] p-8 sm:p-10 flex flex-col justify-between'
              }
            >
              <div>
                <span
                  className={`font-display font-bold text-3xl sm:text-4xl block mb-5 ${
                    step.featured ? 'text-[#F0B44C]' : 'text-[#3280C2]'
                  }`}
                >
                  {step.num}
                </span>
                <h3
                  className={`font-display font-bold text-[26px] mb-3 ${
                    step.featured ? 'text-[#F5F3EE]' : 'text-[#141E37]'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-[17px] leading-[1.6] ${
                    step.featured ? 'text-[#C9D6DF]' : 'text-[#4A5A66]'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco Nossa Missão & Diferenciais (Dark Editorial) */}
        <div className="mt-16 rounded-[20px] bg-[#141E37] text-[#F5F3EE] p-8 sm:p-14">
          <div className="max-w-3xl">
            <p className="text-[#F0B44C] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-4">
              Nossa missão & diferenciais
            </p>
            <h3 className="font-display font-bold text-[clamp(26px,3.2vw,38px)] text-[#F5F3EE] leading-[1.16]">
              Direcionar empreendedores através de uma equipe especialista e acolhedora, assegurando seus resultados com clareza.
            </h3>
            <div className="w-16 h-[3px] bg-[#7FD0E8] my-6" />
            <p className="text-[#C9D6DF] text-[18px]">
              O que você pode esperar de uma equipe{' '}
              <strong className="text-[#F5F3EE] font-semibold">
                detalhista, especialista, determinada e acolhedora
              </strong>
              :
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 border-t border-white/15 pt-10">
            {differentials.map((item) => (
              <div key={item.title} className="space-y-2">
                <h4 className="font-display font-bold text-[21px] text-[#7FD0E8]">
                  {item.title}
                </h4>
                <p className="text-[16.5px] text-[#C9D6DF] leading-[1.55]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
