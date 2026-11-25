import React, { useState, useMemo } from 'react';
import { WhatsAppIcon } from './Navbar';

type TabId = 'diag' | 'fr' | 'pj' | 'rpa';

interface DiagQuestion {
  k: string;
  t: string;
  h?: string;
  m?: boolean;
  o: string[];
  skip?: (answers: Record<string, number | number[]>) => boolean;
}

interface DiagFinding {
  alert?: boolean;
  title: string;
  desc: string;
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const formatPct = (x: number): string =>
  (x * 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';

const parseNum = (val: string): number => {
  const v = (val || '').toString().trim().replace(/\s|R\$|%/g, '');
  if (!v) return NaN;
  let normalized = v;
  if (v.indexOf(',') > -1) {
    normalized = v.replace(/\./g, '').replace(',', '.');
  } else if ((v.match(/\./g) || []).length > 1 || /\.\d{3}$/.test(v)) {
    normalized = v.replace(/\./g, '');
  }
  return parseFloat(normalized);
};

/* Tabelas Simples Nacional e Tributos 2026 */
const A3: [number, number, number][] = [
  [180000, 0.06, 0],
  [360000, 0.112, 9360],
  [720000, 0.135, 17640],
  [1800000, 0.16, 35640],
  [3600000, 0.21, 125640],
  [4800000, 0.33, 648000],
];

const A5: [number, number, number][] = [
  [180000, 0.155, 0],
  [360000, 0.18, 4500],
  [720000, 0.195, 9900],
  [1800000, 0.205, 17100],
  [3600000, 0.23, 62100],
  [4800000, 0.305, 540000],
];

const calcEffectiveRate = (table: [number, number, number][], rbt12: number): number | null => {
  for (let i = 0; i < table.length; i++) {
    if (rbt12 <= table[i][0]) {
      const f = table[i];
      return rbt12 <= 0 ? 0 : (rbt12 * f[1] - f[2]) / rbt12;
    }
  }
  return null;
};

const SM = 1621;
const TETO = 8475.55;

const calcInssEmp = (salario: number): number => {
  const b = Math.min(salario, TETO);
  let t = 0;
  const faixas: [number, number][] = [
    [1621, 0.075],
    [2902.84, 0.09],
    [4354.27, 0.12],
    [8475.55, 0.14],
  ];
  let prev = 0;
  for (let i = 0; i < faixas.length; i++) {
    if (b > prev) {
      t += (Math.min(b, faixas[i][0]) - prev) * faixas[i][1];
      prev = faixas[i][0];
    }
  }
  return t;
};

const calcIrTab = (base: number): number => {
  if (base <= 2428.8) return 0;
  if (base <= 2826.65) return base * 0.075 - 182.16;
  if (base <= 3751.05) return base * 0.15 - 394.16;
  if (base <= 4664.68) return base * 0.225 - 675.49;
  return base * 0.275 - 908.73;
};

const calcIrrf = (bruto: number, inss: number): number => {
  const t = Math.max(0, Math.min(calcIrTab(bruto - inss), calcIrTab(bruto - 607.2)));
  let red = 0;
  if (bruto <= 5000) red = t;
  else if (bruto <= 7350) red = Math.max(0, 978.62 - 0.133145 * bruto);
  return Math.max(0, t - Math.min(red, t));
};

const calcPjNet = (faturamentoMensal: number, honorarios: number) => {
  const P = Math.max(SM, 0.28 * faturamentoMensal);
  const inss = Math.min(P, TETO) * 0.11;
  const ir = calcIrrf(P, inss);
  const e = calcEffectiveRate(A3, faturamentoMensal * 12);
  if (e === null) return null;
  const das = faturamentoMensal * e;
  const dist = faturamentoMensal - das - P - honorarios;
  const irDiv = dist > 50000 ? dist * 0.1 : 0;
  return {
    liq: faturamentoMensal - das - inss - ir - honorarios - irDiv,
    das,
    P,
    inss,
    ir,
    irDiv,
    e,
  };
};

const QUESTIONS: DiagQuestion[] = [
  {
    k: 'sit',
    t: 'Qual é a sua situação hoje?',
    o: [
      'Quero abrir uma empresa',
      'Já tenho empresa',
      'Trabalho como autônomo (pessoa física)',
      'Sou síndico ou administro um condomínio',
    ],
  },
  {
    k: 'area',
    t: 'Em qual área você atua?',
    o: [
      'Saúde: médico, dentista, psicólogo, fisioterapeuta ou clínica',
      'Outros serviços',
      'Comércio ou indústria',
      'Condomínio',
    ],
    skip: (a) => a.sit === 3,
  },
  {
    k: 'fat',
    t: 'Qual é o faturamento mensal, aproximadamente?',
    o: [
      'Até R$ 6.750',
      'De R$ 6.750 a R$ 30 mil',
      'De R$ 30 mil a R$ 150 mil',
      'Acima de R$ 150 mil',
    ],
    skip: (a) => a.sit === 3,
  },
  {
    k: 'reg',
    t: 'Qual é o regime tributário da empresa?',
    o: ['MEI', 'Simples Nacional', 'Lucro Presumido ou Real', 'Não sei'],
    skip: (a) => a.sit !== 1,
  },
  {
    k: 'func',
    t: 'Quantas pessoas trabalham com você?',
    h: 'Funcionários registrados, sem contar os sócios.',
    o: ['Nenhuma', 'De 1 a 5', 'De 6 a 20', 'Mais de 20'],
    skip: (a) => a.sit === 0,
  },
  {
    k: 'fin',
    t: 'Como as finanças são controladas hoje?',
    o: [
      'Em planilha ou caderno',
      'Em um sistema de gestão',
      'Alguém da equipe cuida, mas sem relatórios',
      'Não tenho controle',
    ],
    skip: (a) => a.sit === 0,
  },
  {
    k: 'dor',
    t: 'O que mais preocupa você?',
    h: 'Pode escolher mais de uma opção.',
    m: true,
    o: [
      'Pagar imposto demais',
      'Medo de multas ou obrigações atrasadas',
      'Não saber para onde vai o dinheiro',
      'Dívidas e juros',
      'Proteger a família e o patrimônio',
      'Quero trocar de contador',
    ],
  },
];

export const DiagnosticCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('diag');

  /* Estado 1: Diagnóstico da empresa */
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});
  const [step, setStep] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [showDiagResult, setShowDiagResult] = useState<boolean>(false);

  /* Estado 2: Fator R */
  const [rbtInput, setRbtInput] = useState<string>('');
  const [folhaInput, setFolhaInput] = useState<string>('');
  const [mesInput, setMesInput] = useState<string>('');

  /* Estado 3: PJ ou CLT */
  const [pjSalInput, setPjSalInput] = useState<string>('');
  const [pjFatInput, setPjFatInput] = useState<string>('');
  const [pjHonInput, setPjHonInput] = useState<string>('');

  /* Estado 4: RPA */
  const [rpaValorInput, setRpaValorInput] = useState<string>('');
  const [rpaIssInput, setRpaIssInput] = useState<string>('');

  /* Helpers do Diagnóstico */
  const isQuestionVisible = (idx: number, ans: Record<string, number | number[]>) => {
    const q = QUESTIONS[idx];
    return !(q.skip && q.skip(ans));
  };

  const visibleCount = useMemo(() => {
    let n = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
      if (isQuestionVisible(i, answers)) n++;
    }
    return n;
  }, [answers]);

  const currentVisibleIndex = useMemo(() => {
    let n = 0;
    for (let i = 0; i < step; i++) {
      if (isQuestionVisible(i, answers)) n++;
    }
    return n;
  }, [step, answers]);

  const advanceDiag = (updatedAnswers: Record<string, number | number[]>) => {
    setHistory((prev) => [...prev, step]);
    let next = step + 1;
    while (next < QUESTIONS.length && !isQuestionVisible(next, updatedAnswers)) {
      next++;
    }
    if (next >= QUESTIONS.length) {
      setShowDiagResult(true);
    } else {
      setStep(next);
    }
  };

  const handleOptionSelect = (optIdx: number) => {
    const q = QUESTIONS[step];
    if (q.m) {
      const current = (answers[q.k] as number[]) || [];
      const exists = current.indexOf(optIdx);
      const nextArr =
        exists > -1 ? current.filter((x) => x !== optIdx) : [...current, optIdx];
      setAnswers((prev) => ({ ...prev, [q.k]: nextArr }));
    } else {
      const updated = { ...answers, [q.k]: optIdx };
      setAnswers(updated);
      advanceDiag(updated);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prevStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setStep(prevStep);
    setShowDiagResult(false);
  };

  const handleRestartDiag = () => {
    setAnswers({});
    setStep(0);
    setHistory([]);
    setShowDiagResult(false);
  };

  const diagFindings = useMemo(() => {
    const F: DiagFinding[] = [];
    const dor = (answers.dor as number[]) || [];
    const al = (title: string, desc: string) => F.push({ alert: true, title, desc });
    const ok = (title: string, desc: string) => F.push({ title, desc });

    const saude = answers.area === 0;
    const cond = answers.sit === 3 || answers.area === 3;

    if (cond) {
      ok(
        'Auditoria das contas do condomínio',
        'Uma auditoria independente dá segurança ao síndico e transparência aos condôminos, especialmente antes da assembleia ou na troca de gestão.'
      );
    }
    if (answers.sit === 0) {
      ok(
        'Planejamento de abertura',
        'Antes de abrir, vale definir o tipo de empresa, as atividades e o regime tributário. Uma escolha bem feita no início evita pagar imposto a mais depois.'
      );
      if (saude) {
        al(
          'Profissões da saúde não podem ser MEI',
          'Médicos, dentistas, psicólogos e fisioterapeutas são profissões regulamentadas. O caminho costuma ser uma empresa no Simples Nacional, atenta ao Fator R.'
        );
      }
    }
    if (answers.sit === 2) {
      ok(
        'Avaliar a abertura de uma empresa',
        'Dependendo do quanto você recebe, trabalhar como pessoa jurídica pode reduzir bastante os impostos. Use o simulador PJ ou CLT e converse com a gente.'
      );
    }
    if (answers.sit === 1) {
      if (answers.reg === 0 && (answers.fat as number) > 0) {
        al(
          'Faturamento acima do limite do MEI',
          'O MEI pode faturar até R$ 81 mil por ano (média de R$ 6.750 por mês). Acima disso, a empresa precisa migrar de regime para evitar cobranças e multas.'
        );
      }
      if (answers.reg === 0 && saude) {
        al(
          'Atividade da saúde não é permitida no MEI',
          'Profissões regulamentadas da saúde não podem ser MEI. É importante regularizar o enquadramento.'
        );
      }
      if (answers.reg === 1 && saude) {
        ok(
          'Revisar o Fator R',
          'No Simples Nacional, a sua atividade pode pagar a partir de 6% ou de 15,5%, dependendo da folha. Teste no simulador de Fator R.'
        );
      }
      if (answers.reg === 2 && (answers.fat as number) < 3) {
        ok(
          'Comparar os regimes tributários',
          'Para o seu porte, vale comparar o regime atual com o Simples Nacional. Em muitos casos há economia relevante.'
        );
      }
      if (answers.reg === 3) {
        al(
          'Conhecer o próprio regime',
          'Saber em qual regime a empresa está é o primeiro passo para pagar o imposto certo. Podemos levantar isso com você.'
        );
      }
    }
    if ((answers.func as number) > 0) {
      ok(
        'Departamento pessoal',
        'Com funcionários, folha, férias, eSocial e encargos precisam estar em dia para evitar passivos trabalhistas.'
      );
    }
    if (
      answers.fin === 0 ||
      answers.fin === 2 ||
      answers.fin === 3 ||
      dor.indexOf(2) > -1
    ) {
      ok(
        'BPO financeiro',
        'Controle diário de contas a pagar e a receber, conciliação e relatórios de fluxo de caixa para saber exatamente para onde vai o dinheiro.'
      );
    }
    if (dor.indexOf(0) > -1) {
      ok(
        'Planejamento tributário',
        'Revisar regime, atividades e pró-labore pode reduzir o imposto dentro da lei.'
      );
    }
    if (dor.indexOf(1) > -1) {
      al(
        'Obrigações em dia',
        'Um calendário de obrigações acompanhado pela contabilidade, com avisos no portal on-line, evita multas e surpresas.'
      );
    }
    if (dor.indexOf(3) > -1) {
      ok(
        'Reestruturação de dívidas',
        'Análise das dívidas e um plano para reorganizar pagamentos e recuperar o fôlego do caixa.'
      );
    }
    if (dor.indexOf(4) > -1) {
      ok(
        'Proteção e patrimônio',
        'Seguro de vida, sucessão e consórcios, com a DAMP Seguros, olhando para o CNPJ e o CPF juntos.'
      );
    }
    if (dor.indexOf(5) > -1) {
      ok(
        'Troca de contador sem dor de cabeça',
        'Cuidamos da transição com o escritório anterior e da conferência de tudo o que foi entregue.'
      );
    }
    if (F.length === 0) {
      ok(
        'Contabilidade digital',
        'Documentos, guias e relatórios on-line, com uma equipe próxima para orientar cada decisão.'
      );
    }
    return F;
  }, [answers]);

  const diagWhatsAppUrl = useMemo(() => {
    const getLabel = (k: string) => {
      const q = QUESTIONS.find((x) => x.k === k);
      const v = answers[k];
      if (!q || v === undefined) return null;
      return Array.isArray(v) ? v.map((i) => q.o[i]).join('; ') : q.o[v];
    };
    let msg = 'Olá! Fiz o diagnóstico no site da Finan.Con.\n';
    ['sit', 'area', 'fat', 'reg', 'func', 'fin', 'dor'].forEach((k) => {
      const v = getLabel(k);
      if (v) msg += `\n• ${v}`;
    });
    msg += `\n\nPontos indicados: ${diagFindings.map((f) => f.title).join(', ')}.`;
    return `https://wa.me/5514997721309?text=${encodeURIComponent(msg)}`;
  }, [answers, diagFindings]);

  /* Cálculo Fator R */
  const fatorRResult = useMemo(() => {
    const r = parseNum(rbtInput);
    const f = parseNum(folhaInput);
    const m = parseNum(mesInput);
    const ok = r > 0 && f >= 0 && m > 0;
    if (!ok) return { status: 'empty' as const };
    if (r > 4800000) return { status: 'limit' as const };

    const x = f / r;
    const e3 = calcEffectiveRate(A3, r) || 0;
    const e5 = calcEffectiveRate(A5, r) || 0;
    const d3 = m * e3;
    const d5 = m * e5;
    const in3 = x >= 0.28;
    const need = Math.max(0, 0.28 * r - f);

    return {
      status: 'ready' as const,
      x,
      e3,
      e5,
      d3,
      d5,
      in3,
      need,
    };
  }, [rbtInput, folhaInput, mesInput]);

  /* Cálculo PJ x CLT */
  const pjCltResult = useMemo(() => {
    const S = parseNum(pjSalInput);
    const F = parseNum(pjFatInput);
    const H = parseNum(pjHonInput) || 0;
    if (!(S > 0 && F > 0)) return { status: 'empty' as const };

    const iC = calcInssEmp(S);
    const irC = calcIrrf(S, iC);
    const liqC = S - iC - irC;
    const anoC = liqC * (12 + 1 + 1 / 3) + S * 0.08 * (12 + 1 + 1 / 3);

    const r = calcPjNet(F, H);
    if (!r) return { status: 'limit' as const };

    const anoP = r.liq * 12;
    let lo = 0;
    let hi = 400000;
    for (let k = 0; k < 60; k++) {
      const mid = (lo + hi) / 2;
      const t = calcPjNet(mid, H);
      if (!t || t.liq * 12 > anoC) hi = mid;
      else lo = mid;
    }
    const diff = anoP - anoC;

    return {
      status: 'ready' as const,
      liqC,
      anoC,
      liqP: r.liq,
      anoP,
      effectiveDas: r.e,
      diff,
      breakEvenMonthly: hi,
    };
  }, [pjSalInput, pjFatInput, pjHonInput]);

  /* Cálculo RPA */
  const rpaResult = useMemo(() => {
    const V = parseNum(rpaValorInput);
    const iss = parseNum(rpaIssInput) || 0;
    if (!(V > 0)) return { status: 'empty' as const };

    const inss = Math.min(V, TETO) * 0.11;
    const ir = calcIrrf(V, inss);
    const vIss = (V * iss) / 100;
    const liq = V - inss - ir - vIss;

    return {
      status: 'ready' as const,
      V,
      iss,
      inss,
      ir,
      vIss,
      liq,
      inssPatronal: V * 0.2,
    };
  }, [rpaValorInput, rpaIssInput]);

  const currentQuestion = QUESTIONS[step];

  return (
    <section
      id="ferramentas"
      className="py-24 bg-white border-t border-b border-[#E2E0D8]"
    >
      <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
        {/* Header */}
        <div className="max-w-[720px]">
          <p className="text-[#284591] font-semibold text-[14px] leading-[1.4] tracking-[0.14em] uppercase mb-3">
            Simuladores interativos
          </p>
          <h2 className="font-display font-bold text-[clamp(34px,4.4vw,52px)] text-[#141E37] leading-[1.08]">
            Ferramentas gratuitas
          </h2>
          <p className="mt-4 text-[20px] text-[#4A5A66] leading-[1.6]">
            Faça um diagnóstico rápido da sua empresa ou simule impostos em poucos segundos. Os resultados são estimativas para orientar a conversa com a nossa equipe.
          </p>
        </div>

        {/* Abas */}
        <div
          role="tablist"
          aria-label="Ferramentas"
          className="flex flex-wrap gap-2 mt-10 border-b border-[#E2E0D8]"
        >
          {[
            { id: 'diag' as TabId, label: 'Diagnóstico da empresa' },
            { id: 'fr' as TabId, label: 'Fator R' },
            { id: 'pj' as TabId, label: 'PJ ou CLT' },
            { id: 'rpa' as TabId, label: 'RPA' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`font-semibold text-[16px] px-4 py-3.5 border-b-[3px] -mb-px transition-colors cursor-pointer ${
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

        {/* Painel 1: Diagnóstico da Empresa */}
        {activeTab === 'diag' && (
          <div className="pt-9 max-w-[820px]">
            {!showDiagResult ? (
              <div>
                {/* Barra de Progresso */}
                <div className="h-1.5 bg-[#E2E0D8] rounded-full overflow-hidden">
                  <span
                    className="block h-full bg-[#F0B44C] transition-all duration-300"
                    style={{
                      width: `${(currentVisibleIndex / Math.max(1, visibleCount)) * 100}%`,
                    }}
                  />
                </div>

                <p className="mt-5 text-[14px] text-[#4A5A66]">
                  Pergunta {currentVisibleIndex + 1} de {visibleCount}
                </p>

                <h3 className="font-display font-bold text-[clamp(24px,2.6vw,30px)] text-[#141E37] mt-1.5">
                  {currentQuestion.t}
                </h3>

                {currentQuestion.h && (
                  <p className="text-[16px] text-[#4A5A66] mt-2">{currentQuestion.h}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {currentQuestion.o.map((opt, idx) => {
                    const cur = answers[currentQuestion.k];
                    const isPressed = currentQuestion.m
                      ? Array.isArray(cur) && cur.indexOf(idx) > -1
                      : cur === idx;

                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={isPressed}
                        onClick={() => handleOptionSelect(idx)}
                        className={`text-left font-medium text-[17px] rounded-2xl px-5 py-4 border-[1.5px] transition-colors cursor-pointer ${
                          isPressed
                            ? 'border-[#F0B44C] bg-[#F0B44C]/15 text-[#141E37]'
                            : 'border-[#E2E0D8] bg-[#F5F3EE] text-[#141E37] hover:border-[#3280C2]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center flex-wrap gap-4 mt-7">
                  {history.length > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="font-semibold text-[15px] text-[#284591] underline underline-offset-4 py-2 cursor-pointer"
                    >
                      Voltar
                    </button>
                  )}

                  {currentQuestion.m && (
                    <button
                      type="button"
                      onClick={() => advanceDiag(answers)}
                      className="inline-flex items-center gap-2 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[17px] px-7 py-3.5 rounded-full transition-colors cursor-pointer"
                    >
                      Continuar
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-display font-bold text-[clamp(24px,2.6vw,30px)] text-[#141E37]">
                  Seu diagnóstico preliminar
                </h3>
                <p className="text-[16px] text-[#4A5A66] mt-2">
                  Com base nas suas respostas, estes são os pontos que merecem atenção:
                </p>

                <ul className="mt-6 space-y-3.5">
                  {diagFindings.map((f) => (
                    <li
                      key={f.title}
                      className={`bg-[#F5F3EE] rounded-[14px] px-5 py-4 border-l-[5px] ${
                        f.alert ? 'border-l-[#F0B44C]' : 'border-l-[#3280C2]'
                      }`}
                    >
                      <strong className="block font-display font-bold text-[18px] text-[#141E37] mb-1">
                        {f.title}
                      </strong>
                      <span className="text-[16px] text-[#4A5A66]">{f.desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center flex-wrap gap-5 mt-7">
                  <a
                    href={diagWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[17px] px-7 py-4 rounded-full transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Enviar meu diagnóstico no WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleRestartDiag}
                    className="font-semibold text-[15px] text-[#284591] underline underline-offset-4 py-2 cursor-pointer"
                  >
                    Refazer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Painel 2: Fator R */}
        {activeTab === 'fr' && (
          <div className="pt-9">
            <p className="text-[#4A5A66] max-w-[70ch] text-[18px]">
              Para prestadores de serviço sujeitos ao Fator R, como médicos, dentistas, psicólogos e fisioterapeutas. Descubra em qual anexo do Simples Nacional a sua empresa se enquadra.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-7 items-start">
              <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Receita bruta dos últimos 12 meses
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="360.000,00"
                      value={rbtInput}
                      onChange={(e) => setRbtInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>

                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Folha dos últimos 12 meses
                  <small className="font-normal text-[#4A5A66] text-[14px] -mt-1">
                    Salários, pró-labore e encargos (INSS patronal e FGTS)
                  </small>
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="72.000,00"
                      value={folhaInput}
                      onChange={(e) => setFolhaInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>

                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Faturamento deste mês
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="30.000,00"
                      value={mesInput}
                      onChange={(e) => setMesInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>
              </form>

              <div
                aria-live="polite"
                className="bg-[#141E37] text-[#F5F3EE] rounded-[24px] p-7 sm:p-9 min-h-full"
              >
                {fatorRResult.status === 'empty' && (
                  <p className="text-[#C9D6DF] text-[17px]">
                    Preencha os três valores para ver o resultado.
                  </p>
                )}

                {fatorRResult.status === 'limit' && (
                  <p className="text-[#C9D6DF] text-[17px]">
                    Receita acima de R$ 4,8 milhões em 12 meses ultrapassa o limite do Simples Nacional. Fale com a gente para avaliar o melhor regime.
                  </p>
                )}

                {fatorRResult.status === 'ready' && (
                  <div>
                    <div>
                      <span className="block text-[14px] text-[#C9D6DF]">Seu Fator R</span>
                      <strong className="font-display font-bold text-[52px] sm:text-[64px] leading-none block mt-1.5 tabular-nums">
                        {formatPct(fatorRResult.x)}
                      </strong>
                      <em className="not-italic inline-block mt-3 font-semibold text-[#141E37] bg-[#F0B44C] rounded-full px-3.5 py-1.5 text-[15px]">
                        {fatorRResult.in3 ? 'Anexo III' : 'Anexo V'}
                      </em>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7">
                      <div
                        className={`rounded-2xl p-4 border ${
                          fatorRResult.in3
                            ? 'border-[#F0B44C] bg-[#F0B44C]/[0.08]'
                            : 'border-[#F5F3EE]/[0.18]'
                        }`}
                      >
                        <span className="block text-[14px] text-[#C9D6DF]">Anexo III</span>
                        <strong className="font-display font-bold text-[26px] block mt-1 tabular-nums">
                          {formatPct(fatorRResult.e3)}
                        </strong>
                        <small className="text-[#C9D6DF] text-[14px] tabular-nums">
                          DAS ≈ {brl.format(fatorRResult.d3)} no mês
                        </small>
                      </div>

                      <div
                        className={`rounded-2xl p-4 border ${
                          !fatorRResult.in3
                            ? 'border-[#F0B44C] bg-[#F0B44C]/[0.08]'
                            : 'border-[#F5F3EE]/[0.18]'
                        }`}
                      >
                        <span className="block text-[14px] text-[#C9D6DF]">Anexo V</span>
                        <strong className="font-display font-bold text-[26px] block mt-1 tabular-nums">
                          {formatPct(fatorRResult.e5)}
                        </strong>
                        <small className="text-[#C9D6DF] text-[14px] tabular-nums">
                          DAS ≈ {brl.format(fatorRResult.d5)} no mês
                        </small>
                      </div>
                    </div>

                    {fatorRResult.in3 ? (
                      <p className="my-6 text-[#C9D6DF] text-[16px]">
                        Com o Fator R em{' '}
                        <b className="text-[#F5F3EE]">{formatPct(fatorRResult.x)}</b>, sua empresa fica no Anexo III. Manter a folha acima de 28% da receita é o que garante essa alíquota menor.
                      </p>
                    ) : (
                      <p className="my-6 text-[#C9D6DF] text-[16px]">
                        Para chegar aos 28%, a folha dos últimos 12 meses precisaria aumentar cerca de{' '}
                        <b className="text-[#F5F3EE]">{brl.format(fatorRResult.need)}</b> (em média,{' '}
                        <b className="text-[#F5F3EE]">{brl.format(fatorRResult.need / 12)}</b> por mês). Isso pode reduzir o DAS deste mês em até{' '}
                        <b className="text-[#F5F3EE]">
                          {brl.format(fatorRResult.d5 - fatorRResult.d3)}
                        </b>
                        , mas o pró-labore maior também gera INSS e IR. Vale fazer a conta completa com a gente.
                      </p>
                    )}

                    <a
                      href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Fiz%20a%20simula%C3%A7%C3%A3o%20de%20Fator%20R%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20o%20meu%20caso."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[16.5px] px-6 py-3.5 rounded-full transition-colors"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Conversar sobre o resultado</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Painel 3: PJ ou CLT */}
        {activeTab === 'pj' && (
          <div className="pt-9">
            <p className="text-[#4A5A66] max-w-[70ch] text-[18px]">
              Compare quanto sobra no seu bolso em um ano como CLT e como PJ no Simples Nacional, com pró-labore ajustado para o Fator R.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-7 items-start">
              <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Salário bruto como CLT (mensal)
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="10.000,00"
                      value={pjSalInput}
                      onChange={(e) => setPjSalInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>

                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Faturamento mensal como PJ
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="14.000,00"
                      value={pjFatInput}
                      onChange={(e) => setPjFatInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>

                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Honorários contábeis (mensal)
                  <small className="font-normal text-[#4A5A66] text-[14px] -mt-1">Opcional</small>
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="0,00"
                      value={pjHonInput}
                      onChange={(e) => setPjHonInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>
              </form>

              <div
                aria-live="polite"
                className="bg-[#141E37] text-[#F5F3EE] rounded-[24px] p-7 sm:p-9 min-h-full"
              >
                {pjCltResult.status === 'empty' && (
                  <p className="text-[#C9D6DF] text-[17px]">
                    Informe o salário CLT e o faturamento PJ.
                  </p>
                )}

                {pjCltResult.status === 'limit' && (
                  <p className="text-[#C9D6DF] text-[17px]">
                    Faturamento acima do limite do Simples Nacional. Fale com a gente para avaliar o regime ideal.
                  </p>
                )}

                {pjCltResult.status === 'ready' && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="rounded-2xl p-4 border border-[#F5F3EE]/[0.18]">
                        <span className="block text-[14px] text-[#C9D6DF]">CLT · por ano</span>
                        <strong className="font-display font-bold text-[28px] sm:text-[30px] block mt-1 tabular-nums">
                          {brl.format(pjCltResult.anoC)}
                        </strong>
                        <small className="text-[#C9D6DF] text-[14px] block mt-1 tabular-nums">
                          Líquido mensal {brl.format(pjCltResult.liqC)} + 13º, férias e FGTS
                        </small>
                      </div>

                      <div className="rounded-2xl p-4 border border-[#F0B44C] bg-[#F0B44C]/[0.08]">
                        <span className="block text-[14px] text-[#C9D6DF]">PJ · por ano</span>
                        <strong className="font-display font-bold text-[28px] sm:text-[30px] block mt-1 tabular-nums">
                          {brl.format(pjCltResult.anoP)}
                        </strong>
                        <small className="text-[#C9D6DF] text-[14px] block mt-1 tabular-nums">
                          Líquido mensal {brl.format(pjCltResult.liqP)} · DAS{' '}
                          {formatPct(pjCltResult.effectiveDas)}
                        </small>
                      </div>
                    </div>

                    <p className="my-6 text-[#C9D6DF] text-[16px]">
                      {pjCltResult.diff >= 0 ? (
                        <>
                          Como PJ, você ficaria com cerca de{' '}
                          <b className="text-[#F5F3EE]">{brl.format(pjCltResult.diff)}</b> a mais por ano.
                        </>
                      ) : (
                        <>
                          Como PJ, você ficaria com cerca de{' '}
                          <b className="text-[#F5F3EE]">{brl.format(-pjCltResult.diff)}</b> a menos por ano.
                        </>
                      )}{' '}
                      Para empatar com o CLT, o faturamento PJ precisaria ser de aproximadamente{' '}
                      <b className="text-[#F5F3EE]">
                        {brl.format(pjCltResult.breakEvenMonthly)}
                      </b>{' '}
                      por mês. Considera pró-labore de 28% do faturamento (Anexo III), sem benefícios como plano de saúde e vale-refeição.
                    </p>

                    <a
                      href="https://wa.me/5514997721309?text=Ol%C3%A1%21%20Fiz%20a%20simula%C3%A7%C3%A3o%20PJ%20x%20CLT%20no%20site%20e%20gostaria%20de%20conversar%20sobre%20abrir%20a%20minha%20empresa."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[16.5px] px-6 py-3.5 rounded-full transition-colors"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Conversar sobre abrir PJ</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Painel 4: RPA */}
        {activeTab === 'rpa' && (
          <div className="pt-9">
            <p className="text-[#4A5A66] max-w-[70ch] text-[18px]">
              Calcule os descontos de um Recibo de Pagamento Autônomo e o valor líquido que o profissional recebe.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-7 items-start">
              <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  Valor bruto do serviço
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <i className="not-italic text-[#4A5A66] font-medium">R$</i>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="3.000,00"
                      value={rpaValorInput}
                      onChange={(e) => setRpaValorInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-2.5 outline-none tabular-nums"
                    />
                  </span>
                </label>

                <label className="grid gap-2 font-semibold text-[16px] text-[#141E37]">
                  ISS retido
                  <small className="font-normal text-[#4A5A66] text-[14px] -mt-1">
                    Opcional, conforme o município
                  </small>
                  <span className="flex items-center border-[1.5px] border-[#E2E0D8] focus-within:border-[#3280C2] rounded-[14px] bg-[#F5F3EE] px-4 transition-colors">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="0"
                      value={rpaIssInput}
                      onChange={(e) => setRpaIssInput(e.target.value)}
                      className="flex-1 min-w-0 bg-transparent border-0 font-medium text-[20px] text-[#141E37] py-3.5 px-1 outline-none tabular-nums"
                    />
                    <i className="not-italic text-[#4A5A66] font-medium">%</i>
                  </span>
                </label>
              </form>

              <div
                aria-live="polite"
                className="bg-[#141E37] text-[#F5F3EE] rounded-[24px] p-7 sm:p-9 min-h-full"
              >
                {rpaResult.status === 'empty' && (
                  <p className="text-[#C9D6DF] text-[17px]">
                    Informe o valor bruto do serviço.
                  </p>
                )}

                {rpaResult.status === 'ready' && (
                  <div>
                    <div>
                      <span className="block text-[14px] text-[#C9D6DF]">
                        Valor líquido para o profissional
                      </span>
                      <strong className="font-display font-bold text-[48px] sm:text-[58px] leading-none block mt-1.5 tabular-nums">
                        {brl.format(rpaResult.liq)}
                      </strong>
                    </div>

                    <dl className="mt-6 divide-y divide-[#F5F3EE]/15 text-[16px] tabular-nums">
                      <div className="flex justify-between gap-4 py-2.5">
                        <dt className="text-[#C9D6DF]">Valor bruto</dt>
                        <dd className="font-semibold">{brl.format(rpaResult.V)}</dd>
                      </div>
                      <div className="flex justify-between gap-4 py-2.5">
                        <dt className="text-[#C9D6DF]">INSS (11%)</dt>
                        <dd className="font-semibold">− {brl.format(rpaResult.inss)}</dd>
                      </div>
                      <div className="flex justify-between gap-4 py-2.5">
                        <dt className="text-[#C9D6DF]">Imposto de Renda</dt>
                        <dd className="font-semibold">− {brl.format(rpaResult.ir)}</dd>
                      </div>
                      {rpaResult.vIss > 0 && (
                        <div className="flex justify-between gap-4 py-2.5">
                          <dt className="text-[#C9D6DF]">
                            ISS ({rpaResult.iss.toLocaleString('pt-BR')}%)
                          </dt>
                          <dd className="font-semibold">− {brl.format(rpaResult.vIss)}</dd>
                        </div>
                      )}
                    </dl>

                    <p className="mt-6 text-[#C9D6DF] text-[16px]">
                      Para a empresa contratante fora do Simples Nacional (ou no Anexo IV), há ainda{' '}
                      <b className="text-[#F5F3EE]">{brl.format(rpaResult.inssPatronal)}</b> de INSS patronal (20%). Pagamentos frequentes ao mesmo profissional podem caracterizar vínculo: fale com a gente antes de usar o RPA como rotina.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-[14px] text-[#4A5A66] max-w-[80ch]">
          Estimativas com as tabelas de 2026: Simples Nacional (LC 123/2006), INSS e IRRF com a redução da Lei 15.270/2025. Não consideram situações específicas como dependentes, ISS fixo, sublimites ou retenções. Confirme o seu caso com a nossa equipe.
        </p>
      </div>
    </section>
  );
};
