import React from 'react';
import { Stethoscope, HeartPulse, ShieldAlert, Sparkles, CheckCircle2, ArrowRight, Home, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HealthSection: React.FC = () => {
  const whatsappUrl = 'https://wa.me/5514996128126?text=Ol%C3%A1%2C%20sou%20m%C3%A9dico(a)%20e%20gostaria%20de%20avaliar%20a%20redu%C3%A7%C3%A3o%20de%20impostos%20com%20a%20Finan.con!';

  return (
    <section id="saude" className="py-24 bg-gradient-to-b from-slate-900 to-blue-950 text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartPulse className="w-4 h-4 text-teal-400" />
            Finan.con Saúde • Especialidade da Casa
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Você cuida dos pacientes.{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Nós cuidamos da sua PJ Médica.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Muitos médicos e profissionais da saúde perdem milhares de reais por ano emitindo recibos como pessoa física ou com enquadramentos genéricos. Nossa equipe é especialista no setor médico de Bauru e região.
          </p>
        </div>

        {/* Comparativo PF x PJ Médica Especializada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-14">
          
          {/* Card Negativo: Modelo Tradicional / PF */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-8 sm:p-10 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Médico como Pessoa Física / Tradicional</h3>
                <p className="text-xs text-rose-300">Alto risco e tributação abusiva</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Tributação de até <strong>27,5% no Carnê-Leão</strong> sobre honorários e plantões.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Desgaste pós-plantão para emitir notas fiscais para hospitais, clínicas e convênios.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Risco constante de malha fina por preenchimento incorreto de despesas dedutíveis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Falta de tempo para planejar investimentos, aposentadoria e patrimônio pessoal.</span>
              </li>
            </ul>
          </motion.div>

          {/* Card Positivo: Com Finan.con Saúde */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border-2 border-teal-400/50 bg-slate-900/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-teal-500/10 relative"
          >
            <div className="absolute -top-3.5 right-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-extrabold text-xs uppercase px-3.5 py-1 tracking-wider shadow-md">
              Economia Real
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-300">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Com a Finan.con Saúde</h3>
                <p className="text-xs text-teal-300">Planejamento sob medida para sua carreira médica</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>Alíquota reduzida a partir de <strong>6% no Simples Nacional</strong> através do Fator R planejado.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>Nós cuidamos da emissão de todas as notas fiscais dos seus plantões e clínicas parceiras.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>Planejamento societário e equiparação hospitalar quando aplicável para clínicas.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Suporte Patrimonial:</strong> Apoiamos na burocracia financeira e tributária para compra de imóveis e bens do médico.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Chamada para Médicos */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              Quer saber quanto você pode economizar de impostos no próximo mês?
            </h4>
            <p className="text-sm text-slate-300">
              Fazemos um estudo tributário gratuito dos seus rendimentos médicos sem qualquer compromisso.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-6 py-3.5 text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
          >
            <span>Falar com Especialista em Saúde</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
