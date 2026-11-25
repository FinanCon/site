import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '../utils/blog';
import { MarkdownRenderer } from './MarkdownRenderer';
import { WhatsAppIcon } from './Navbar';

interface BlogPageProps {
  slug?: string;
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ slug, onNavigate }) => {
  const allPosts = useMemo(() => getAllPosts(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(allPosts.map((p) => p.category)));
    return ['Todos', ...unique];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Todos') return allPosts;
    return allPosts.filter((p) => p.category === selectedCategory);
  }, [allPosts, selectedCategory]);

  /* Visualização de Artigo Individual */
  if (slug) {
    const post = getPostBySlug(slug);
    if (!post) {
      return (
        <section className="py-24 bg-[#F5F3EE] min-h-[70vh]">
          <div className="max-w-[820px] mx-auto px-6 sm:px-7">
            <button
              type="button"
              onClick={() => onNavigate('/conteudos')}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#284591] hover:text-[#141E37] mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Conteúdos & Notícias</span>
            </button>
            <h1 className="font-display font-bold text-[36px] text-[#141E37]">
              Artigo não encontrado
            </h1>
            <p className="mt-4 text-[18px] text-[#4A5A66]">
              O conteúdo que você procurou não está disponível ou foi movido.
            </p>
          </div>
        </section>
      );
    }

    const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
    const whatsappPostUrl = `https://wa.me/5514997721309?text=${encodeURIComponent(
      `Olá! Li o artigo "${post.title}" no site da Finan.Con e gostaria de conversar sobre o meu caso.`
    )}`;

    return (
      <article className="bg-[#F5F3EE]">
        {/* Cabeçalho do Artigo em Marinho */}
        <header className="bg-[#141E37] text-[#F5F3EE] py-16 sm:py-20 border-b border-white/[0.08]">
          <div className="max-w-[860px] mx-auto px-6 sm:px-7">
            <button
              type="button"
              onClick={() => onNavigate('/conteudos')}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#7FD0E8] hover:text-[#F5F3EE] mb-8 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Todos os conteúdos e notícias</span>
            </button>

            <p className="text-[#F0B44C] font-semibold text-[13px] uppercase tracking-[0.14em] mb-3">
              {post.category}
            </p>
            <h1 className="font-display font-bold text-[clamp(30px,4.2vw,48px)] leading-[1.1] text-[#F5F3EE]">
              {post.title}
            </h1>
            <p className="mt-5 text-[19px] text-[#C9D6DF] leading-[1.6] max-w-[60ch]">
              {post.summary}
            </p>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] text-[#C9D6DF]">
              <span className="inline-flex items-center gap-2">
                <User className="w-4 h-4 text-[#7FD0E8]" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7FD0E8]" />
                {post.formattedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7FD0E8]" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Corpo do Artigo */}
        <div className="py-14 sm:py-20">
          <div className="max-w-[860px] mx-auto px-6 sm:px-7">
            <MarkdownRenderer content={post.content} onNavigate={onNavigate} />

            {/* Box CTA de Conversão */}
            <div className="mt-14 rounded-[20px] bg-[#141E37] text-[#F5F3EE] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[#F0B44C] font-semibold text-[13px] uppercase tracking-[0.14em] mb-1.5">
                  Atendimento consultivo
                </p>
                <h3 className="font-display font-bold text-[24px] text-[#F5F3EE]">
                  Ficou com alguma dúvida sobre esse tema?
                </h3>
                <p className="mt-2 text-[16px] text-[#C9D6DF] max-w-[48ch]">
                  Converse diretamente com a equipe da Finan.Con e veja como aplicar isso na realidade da sua empresa.
                </p>
              </div>
              <a
                href={whatsappPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2.5 bg-[#F0B44C] hover:bg-[#F5C468] text-[#141E37] font-semibold text-[16px] px-6 py-3.5 rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Outros Artigos */}
            {otherPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#E2E0D8]">
                <h3 className="font-display font-bold text-[24px] text-[#141E37] mb-6">
                  Continue lendo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherPosts.map((other) => (
                    <button
                      key={other.slug}
                      type="button"
                      onClick={() => onNavigate(`/conteudos/${other.slug}`)}
                      className="text-left bg-white rounded-[20px] p-6 border border-[#E2E0D8] hover:border-[#3280C2] transition-colors flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <span className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[#284591]">
                          {other.category} · {other.formattedDate}
                        </span>
                        <h4 className="font-display font-bold text-[20px] text-[#141E37] mt-2 leading-[1.25]">
                          {other.title}
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#284591] mt-4">
                        Ler artigo <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  /* Listagem Principal: Blog & Notícias */
  return (
    <section className="bg-[#F5F3EE] min-h-[75vh]">
      {/* Header Editorial */}
      <header className="bg-[#141E37] text-[#F5F3EE] py-16 sm:py-20 border-b border-white/[0.08]">
        <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#7FD0E8] hover:text-[#F5F3EE] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </button>

          <p className="text-[#F0B44C] font-semibold text-[14px] uppercase tracking-[0.14em] mb-3">
            Blog & Notícias
          </p>
          <h1 className="font-display font-bold text-[clamp(34px,4.8vw,58px)] leading-[1.06] text-[#F5F3EE] max-w-[18ch]">
            Conteúdos para decidir com clareza
          </h1>
          <p className="mt-5 text-[19px] text-[#C9D6DF] leading-[1.6] max-w-[58ch]">
            Guias práticos, atualizações tributárias e orientações de gestão financeira escritos sem “contabilês” pela equipe da Finan.Con.
          </p>
        </div>
      </header>

      {/* Filtros & Grade de Artigos */}
      <div className="py-14 sm:py-20">
        <div className="max-w-[1160px] mx-auto px-6 sm:px-7">
          {/* Filtro por Categoria */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E2E0D8]">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[14.5px] font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#141E37] text-[#F5F3EE]'
                      : 'bg-white border border-[#E2E0D8] text-[#4A5A66] hover:text-[#141E37] hover:border-[#3280C2]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Lista de Artigos */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-[20px] border border-[#E2E0D8] p-7 flex flex-col justify-between hover:border-[#3280C2] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[13px] font-semibold text-[#284591] mb-3">
                    <span className="uppercase tracking-[0.1em]">{post.category}</span>
                    <span className="text-[#4A5A66] font-medium">{post.formattedDate}</span>
                  </div>
                  <h2 className="font-display font-bold text-[22px] text-[#141E37] leading-[1.22]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[16px] text-[#4A5A66] leading-[1.58]">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E0D8] flex items-center justify-between gap-3">
                  <span className="text-[13.5px] text-[#4A5A66]">{post.readTime}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/conteudos/${post.slug}`)}
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#284591] hover:text-[#141E37] cursor-pointer"
                  >
                    <span>Ler artigo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
