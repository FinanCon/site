import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type LegalTab = 'privacidade' | 'cookies' | 'termos';

interface LegalModalProps {
  isOpen: boolean;
  initialTab: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, initialTab, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141E37]/75"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F3EE] text-[#141E37] w-full max-w-[820px] max-h-[88vh] rounded-[20px] border border-[#E2E0D8] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#141E37] text-[#F5F3EE] px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[#F0B44C] font-semibold text-[12px] uppercase tracking-[0.14em]">
              Conformidade & Transparência · LGPD
            </p>
            <h2
              id="legal-modal-title"
              className="font-display font-bold text-[22px] sm:text-[26px] text-[#F5F3EE] mt-0.5"
            >
              Privacidade, Cookies e Termos de Uso
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="p-2 rounded-full text-[#C9D6DF] hover:text-[#F5F3EE] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#E2E0D8] px-6 sm:px-8 flex flex-wrap gap-2">
          {[
            { id: 'privacidade' as LegalTab, label: 'Política de Privacidade (LGPD)' },
            { id: 'cookies' as LegalTab, label: 'Política de Cookies' },
            { id: 'termos' as LegalTab, label: 'Termos de Uso' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-semibold text-[15px] px-3.5 py-3.5 border-b-[3px] -mb-px transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-[#141E37] border-[#F0B44C]'
                    : 'text-[#4A5A66] border-transparent hover:text-[#141E37]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-[16px] text-[#4A5A66] leading-[1.65]">
          {activeTab === 'privacidade' && (
            <>
              <p className="text-[#141E37] font-semibold">
                Controladora de Dados: Finan.Con Soluções Empresariais Ltda · CNPJ 44.541.903/0001-55
              </p>
              <p>
                A <strong className="text-[#141E37]">Finan.Con Soluções Empresariais</strong> respeita a sua privacidade e atua em estrita conformidade com a <strong className="text-[#141E37]">Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)</strong> e com as normas de sigilo profissional do Conselho Federal de Contabilidade (CFC).
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                1. Como funcionam os simuladores deste site
              </h3>
              <p>
                As informações inseridas nas ferramentas gratuitas deste site (<strong className="text-[#141E37]">Diagnóstico da empresa, Calculadora de Fator R e Comparador PJ ou CLT</strong>) são processadas <strong className="text-[#141E37]">100% localmente no seu próprio navegador</strong>. Nenhum valor financeiro ou resposta do diagnóstico é gravado em banco de dados ou enviado aos nossos servidores sem a sua ação explícita.
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                2. Dados compartilhados voluntariamente no atendimento
              </h3>
              <p>
                Quando você clica para iniciar uma conversa pelo WhatsApp ou envia um e-mail para <strong className="text-[#141E37]">contato@financon.com.br</strong>, coletamos apenas os dados fornecidos voluntariamente por você (nome, telefone, e-mail e informações preliminares da sua empresa) com a finalidade exclusiva de prestar atendimento consultivo, elaborar propostas de serviços contábeis, BPO financeiro, auditoria condominial ou proteção patrimonial.
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                3. Compartilhamento e Segurança
              </h3>
              <p>
                Não comercializamos nem cedemos dados pessoais a terceiros. Na contratação de serviços contábeis digitais, utilizamos plataformas homologadas de alta segurança (<strong className="text-[#141E37]">Sistema Domínio e Portal Onvio · Thomson Reuters</strong>), e, para soluções de proteção patrimonial solicitadas pelo cliente, atuamos em parceria técnica com a <strong className="text-[#141E37]">DAMP Seguros</strong> mediante consentimento específico.
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                4. Direitos do Titular (Art. 18 da LGPD)
              </h3>
              <p>
                Você pode solicitar a qualquer momento a confirmação de tratamento, acesso, correção ou exclusão de seus dados de contato pelos nossos canais oficiais:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#141E37]">
                <li>
                  <strong>E-mail do Encarregado (DPO):</strong> contato@financon.com.br
                </li>
                <li>
                  <strong>WhatsApp:</strong> (14) 99772-1309
                </li>
                <li>
                  <strong>Endereço físico:</strong> Av. Getúlio Vargas, 22-25, Torre 2, sala 102 · Bauru/SP
                </li>
              </ul>
            </>
          )}

          {activeTab === 'cookies' && (
            <>
              <h3 className="font-display font-bold text-[19px] text-[#141E37]">
                Uso transparente e mínimo de Cookies
              </h3>
              <p>
                O site da <strong className="text-[#141E37]">Finan.Con</strong> foi projetado com arquitetura limpa e privacidade desde a concepção (<em>Privacy by Design</em>). Não utilizamos cookies invasivos de rastreamento publicitário ou venda de perfil comportamental.
              </p>

              <div className="bg-white rounded-[14px] p-5 border border-[#E2E0D8] space-y-3">
                <div>
                  <strong className="block font-display text-[#141E37] text-[17px]">
                    1. Armazenamento Estritamente Necessário (LocalStorage)
                  </strong>
                  <p className="text-[15px] mt-0.5">
                    Registramos apenas a chave local <code className="bg-[#F5F3EE] px-1.5 py-0.5 rounded text-[14px]">financon_cookie_consent</code> no seu navegador para lembrar que você já fechou ou aceitou o aviso de privacidade, evitando exibir o banner repetidamente.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E0D8]">
                  <strong className="block font-display text-[#141E37] text-[17px]">
                    2. Fontes e Desempenho Técnico
                  </strong>
                  <p className="text-[15px] mt-0.5">
                    Carregamos as famílias tipográficas oficiais (<em>Space Grotesk</em> e <em>Inter</em>) via Google Fonts para leitura nítida em qualquer dispositivo, sem coleta de dados pessoais identificáveis.
                  </p>
                </div>
              </div>

              <p>
                Você pode limpar ou bloquear os cookies a qualquer momento diretamente nas configurações de privacidade do seu navegador (Chrome, Safari, Edge ou Firefox), sem qualquer prejuízo ao uso das calculadoras e guias deste site.
              </p>
            </>
          )}

          {activeTab === 'termos' && (
            <>
              <h3 className="font-display font-bold text-[19px] text-[#141E37]">
                1. Caráter Orientativo das Calculadoras e Guias
              </h3>
              <p>
                As ferramentas gratuitas disponíveis neste site (<strong className="text-[#141E37]">Diagnóstico da empresa, Fator R e PJ ou CLT</strong>) utilizam as tabelas tributárias de 2026 — incluindo Simples Nacional (LC 123/2006), faixas de INSS e IRRF com a redução da Lei 15.270/2025.
              </p>
              <p>
                Os valores apresentados constituem <strong className="text-[#141E37]">estimativas preliminares de apoio à decisão</strong> e não substituem a análise contábil individualizada, pois não contemplam particularidades como dependentes de IR, ISS fixo municipal, sublimites estaduais, equiparação hospitalar ou retenções específicas da atividade.
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                2. Propriedade Intelectual
              </h3>
              <p>
                A marca <strong className="text-[#141E37]">Finan.Con Soluções Empresariais</strong>, seu símbolo gráfico das três barras ascendentes com anel, textos institucionais, guias e código das ferramentas são de titularidade da <strong className="text-[#141E37]">Finan.Con Soluções Empresariais Ltda (CNPJ 44.541.903/0001-55)</strong>.
              </p>

              <h3 className="font-display font-bold text-[19px] text-[#141E37] pt-2">
                3. Foro e Legislação Aplicável
              </h3>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil, ficando eleito o foro da Comarca de <strong className="text-[#141E37]">Bauru/SP</strong> para dirimir eventuais questões decorrentes deste site.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-[#E2E0D8] px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[13.5px] text-[#4A5A66]">
            Finan.Con Soluções Empresariais Ltda · CNPJ 44.541.903/0001-55
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#141E37] hover:bg-[#284591] text-[#F5F3EE] font-semibold text-[15px] px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Entendi e fechar
          </button>
        </div>
      </div>
    </div>
  );
};
