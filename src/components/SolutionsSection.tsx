import React from 'react';
import { WhatsAppIcon } from './Navbar';

export const SolutionsSection: React.FC = () => {
  const healthItems = [
    'Abertura, alteração e encerramento de empresas',
    'Escolha do melhor regime tributário',
    'Escrita fiscal e gestão de tributos',
    'Contabilidade e obrigações acessórias',
    'Departamento pessoal',
    'Gestão societária',
    'Relatórios gerenciais e controladoria',
    'Gestão estratégica do negócio',
  ];

  const bpoItems = [
    'Gestão de contas a pagar',
    'Gestão de contas a receber',
    'Emissão e envio de notas fiscais',
    'Emissão e envio de boletos',
    'Conciliação bancária e de caixa',
    'Relatório de fluxo de caixa',
    'Acompanhamento de métricas e resultados',
    'Implantação e treinamento',
  ];

  const bpoFlow = [
    {
      step: '01',
      title: 'Implantação',
      text: 'Mapeamos a rotina, organizamos as contas e treinamos a sua equipe.',
    },
    {
      step: '02',
      title: 'Controle diário',
      text: 'Acompanhamos cada entrada e saída e sinalizamos os gastos que mais pesam no caixa.',
    },
    {
      step: '03',
      title: 'Relatórios',
      text: 'Posição de contas a pagar e a receber em relatórios diários, semanais e mensais, para planejar com segurança.',
    },
  ];

  const condoItems = [
    'Receitas, cobranças e inadimplência',
    'Despesas, notas fiscais e comprovantes',
    'Contratos com fornecedores e prestadores',
    'Folha de pagamento e encargos',
    'Tributos retidos sobre serviços contratados',
    'Fundo de reserva e saldos bancários',
  ];

  const patrimonialCards = [
    {
      title: 'Seguro de vida',
      desc: 'Individual e coletivo: proteção para você, sua família e sua equipe.',
    },
    {
      title: 'Sucessão e inventário',
      desc: 'Planejamento para que o patrimônio passe adiante sem surpresas.',
    },
    {
      title: 'Consórcios',
      desc: 'Conquista planejada de bens, sem os juros de um financiamento.',
    },
    {
      title: 'Reestruturação de dívidas',
      desc: 'Análise e plano para reorganizar as dívidas e recuperar o fôlego.',
    },
  ];

  return (
    <section id="servicos" className="py-24 bg-[#F5F3EE]">
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        {/* Cabeçalho da Seção */}
        <header className="max-w-[680px] mb-14">
          <p className="text-[#284591] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
            O que fazemos
          </p>
          <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#141E37] leading-[1.08]">
            Quatro frentes de trabalho, um mesmo cuidado
          </h2>
          <p className="mt-4 text-[20px] text-[#4A5A66] leading-[1.6]">
            Uma equipe especialista e acolhedora, perto de você para organizar impostos, rotina financeira e patrimônio.
          </p>
        </header>

        {/* Frente 1: Contabilidade e Fiscal (Destaque Especialidade Saúde) */}
        <article
          id="saude"
          className="bg-white rounded-[20px] p-7 sm:p-12 lg:p-14 mb-8 border border-[#E2E0D8] border-t-4 border-t-[#3280C2]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block text-[14px] font-semibold text-[#284591] mb-3">
                Para profissionais e clínicas da saúde
              </span>
              <h3 className="font-display font-bold text-[clamp(28px,3.2vw,38px)] text-[#141E37] leading-[1.1]">
                Contabilidade e fiscal: especialistas em quem cuida da saúde
              </h3>
              <p className="mt-4 text-[17.5px] text-[#4A5A66] leading-[1.6]">
                A área da saúde é a nossa especialidade e reúne a maioria dos nossos clientes. Também atendemos outros prestadores de serviços.
              </p>
              <p className="mt-4 text-[16px] text-[#4A5A66] leading-[1.55]">
                Você cuida dos seus pacientes. A gente cuida dos números, impostos, Fator R e folha com clareza e presença.
              </p>
              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20contabilidade%20e%20gest%C3%A3o%20fiscal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[16px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1">
              {healthItems.map((item) => (
                <li
                  key={item}
                  className="py-3.5 pl-6 border-b border-[#E2E0D8] relative text-[16.5px] text-[#141E37] leading-[1.45]"
                >
                  <span
                    className="absolute left-0 top-[21px] w-2.5 h-2.5 rounded-[2px] bg-[#F0B44C]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Frente 2: BPO Financeiro */}
        <article className="py-12 border-t border-[#E2E0D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block text-[14px] font-semibold text-[#284591] mb-3">
                Para pequenas e médias empresas
              </span>
              <h3 className="font-display font-bold text-[clamp(28px,3vw,36px)] text-[#141E37] leading-[1.1]">
                BPO financeiro: seu financeiro em ordem, todos os dias
              </h3>
              <p className="mt-4 text-[17.5px] text-[#4A5A66] leading-[1.6]">
                Assumimos a rotina financeira da sua empresa, de qualquer segmento, para que você foque no que gera resultado.
              </p>

              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20BPO%20financeiro."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[16px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1">
              {bpoItems.map((item) => (
                <li
                  key={item}
                  className="py-3.5 pl-6 border-b border-[#E2E0D8] relative text-[16.5px] text-[#141E37] leading-[1.45]"
                >
                  <span
                    className="absolute left-0 top-[21px] w-2.5 h-2.5 rounded-[2px] bg-[#3280C2]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Como funciona na prática — Linha sequencial de 3 colunas (largura total) */}
          <div className="mt-10 pt-8 border-t border-[#E2E0D8]/80">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
              <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#284591]">
                BPO Financeiro na prática · Como funciona
              </p>
              <p className="text-[15.5px] font-medium text-[#4A5A66]">
                Resultado:{' '}
                <strong className="text-[#141E37] font-semibold">
                  clareza, previsibilidade e mais tempo para o seu negócio.
                </strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {bpoFlow.map((f) => (
                <div
                  key={f.step}
                  className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#E2E0D8] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display font-bold text-[28px] leading-none text-[#3280C2]">
                        {f.step}
                      </span>
                      <span className="w-8 h-[2px] bg-[#E2E0D8]" aria-hidden="true" />
                    </div>
                    <h4 className="font-display font-bold text-[21px] text-[#141E37] mb-2">
                      {f.title}
                    </h4>
                    <p className="text-[16px] text-[#4A5A66] leading-[1.58]">
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Frente 3: Auditoria para Condomínios */}
        <article className="py-12 border-t border-[#E2E0D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block text-[14px] font-semibold text-[#284591] mb-3">
                Para síndicos, conselhos fiscais e administradoras
              </span>
              <h3 className="font-display font-bold text-[clamp(28px,3vw,36px)] text-[#141E37] leading-[1.1]">
                Auditoria para condomínios
              </h3>
              <p className="mt-4 text-[17.5px] text-[#4A5A66] leading-[1.6]">
                Auditoria independente das contas condominiais, com relatório claro para apresentar ao conselho e à assembleia. Indicada na troca de síndico, antes da prestação de contas ou como rotina anual.
              </p>
              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20auditoria%20para%20condom%C3%ADnios."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[16px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>

            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1">
              {condoItems.map((item) => (
                <li
                  key={item}
                  className="py-3.5 pl-6 border-b border-[#E2E0D8] relative text-[16.5px] text-[#141E37] leading-[1.45]"
                >
                  <span
                    className="absolute left-0 top-[21px] w-2.5 h-2.5 rounded-[2px] bg-[#3280C2]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Frente 4: Proteção e Patrimônio (Parceria DAMP Seguros) */}
        <article className="py-12 border-t border-[#E2E0D8]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block text-[14px] font-semibold text-[#284591] mb-3">
                Em parceria com a DAMP Seguros
              </span>
              <h3 className="font-display font-bold text-[clamp(28px,3vw,36px)] text-[#141E37] leading-[1.1]">
                Proteção e patrimônio: cuidar da empresa e de quem está por trás dela
              </h3>
              <p className="mt-4 text-[17.5px] text-[#4A5A66] leading-[1.6]">
                Na prestação de serviços, a empresa é você. Olhamos para o CNPJ e para o CPF juntos, protegendo a renda, a família e o patrimônio construído.
              </p>
              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20prote%C3%A7%C3%A3o%20patrimonial%20%28seguros%2C%20sucess%C3%A3o%2C%20cons%C3%B3rcios%20ou%20reestrutura%C3%A7%C3%A3o%20de%20d%C3%ADvidas%29."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[16px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patrimonialCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-6 border border-[#E2E0D8] border-l-4 border-l-[#F0B44C]"
                >
                  <h4 className="font-display font-bold text-[20px] text-[#141E37] mb-2">
                    {card.title}
                  </h4>
                  <p className="text-[15.5px] text-[#4A5A66] leading-[1.55]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Bloco Contabilidade Digital (Domínio + Onvio) */}
        <div className="mt-8 rounded-[20px] bg-[#141E37] text-[#F5F3EE] p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 border-b border-[#F5F3EE]/15">
            <div className="lg:col-span-6">
              <p className="text-[#F0B44C] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
                Sem papel e sem correria
              </p>
              <h3 className="font-display font-bold text-[clamp(28px,3.2vw,40px)] text-[#F5F3EE] leading-[1.1]">
                Contabilidade digital, do seu jeito
              </h3>
            </div>
            <div className="lg:col-span-6">
              <p className="text-[17.5px] text-[#C9D6DF] leading-[1.6]">
                Trabalhamos com o <strong className="text-[#F5F3EE] font-semibold">Sistema Domínio</strong> e a plataforma <strong className="text-[#F5F3EE] font-semibold">Onvio</strong>: você envia documentos, recebe guias e acompanha as obrigações da sua empresa on-line, sem papel e sem correria. E seguimos automatizando processos para entregar mais rápido e com menos erros.
              </p>
            </div>
          </div>

          {/* 3 Pilares da Experiência Digital */}
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[16px] bg-[#18233D] border border-[#F5F3EE]/10 p-6 sm:p-7">
              <div className="w-11 h-11 rounded-[12px] bg-[#3280C2]/20 border border-[#7FD0E8]/30 flex items-center justify-center text-[#7FD0E8] mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <strong className="block font-display font-bold text-[21px] text-[#7FD0E8] mb-2">
                Portal on-line
              </strong>
              <p className="text-[16px] text-[#C9D6DF] leading-[1.58]">
                Documentos, guias e relatórios num só lugar, acessíveis pelo computador ou celular a qualquer hora.
              </p>
            </div>

            <div className="rounded-[16px] bg-[#18233D] border border-[#F5F3EE]/10 p-6 sm:p-7">
              <div className="w-11 h-11 rounded-[12px] bg-[#3280C2]/20 border border-[#7FD0E8]/30 flex items-center justify-center text-[#7FD0E8] mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <strong className="block font-display font-bold text-[21px] text-[#7FD0E8] mb-2">
                Processos acompanhados
              </strong>
              <p className="text-[16px] text-[#C9D6DF] leading-[1.58]">
                Prazos e obrigações monitorados pela nossa equipe, com aviso antecipado do que está pendente.
              </p>
            </div>

            <div className="rounded-[16px] bg-[#18233D] border border-[#F5F3EE]/10 p-6 sm:p-7">
              <div className="w-11 h-11 rounded-[12px] bg-[#F0B44C]/15 border border-[#F0B44C]/35 flex items-center justify-center text-[#F0B44C] mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <strong className="block font-display font-bold text-[21px] text-[#F0B44C] mb-2">
                Integrações diretas
              </strong>
              <p className="text-[16px] text-[#C9D6DF] leading-[1.58]">
                Notas fiscais e extratos bancários importados direto para a contabilidade, reduzindo trabalho manual.
              </p>
            </div>
          </div>
        </div>

        {/* Extras: Certificado Digital & Emissor de Notas Fiscais */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-[22px] border border-[#E2E0D8] bg-white p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-[24px] text-[#141E37]">
                Certificado digital
              </h3>
              <p className="mt-3 text-[16.5px] text-[#4A5A66] leading-[1.6]">
                e-CNPJ e e-CPF para emitir notas, assinar documentos e acessar os sistemas do governo. Indicamos o modelo certo para você.
              </p>
            </div>
            <div>
              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20certificado%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[15.5px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>
          </article>

          <article className="rounded-[22px] border border-[#E2E0D8] bg-white p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-[24px] text-[#141E37]">
                Emissor de notas fiscais
              </h3>
              <p className="mt-3 text-[16.5px] text-[#4A5A66] leading-[1.6]">
                Sistema para emitir NFS-e e NF-e de forma simples, integrado à sua contabilidade.
              </p>
            </div>
            <div>
              <a
                href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20o%20emissor%20de%20notas%20fiscais%20%28NFS-e%20/%20NF-e%29."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-semibold text-[15.5px] text-[#284591] hover:text-[#141E37] border-b-[1.5px] border-current pb-0.5 transition-colors"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>Contratar pelo WhatsApp</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
