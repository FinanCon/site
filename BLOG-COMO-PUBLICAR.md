# Como publicar Notícias e Artigos no Blog da Finan.Con (via GitHub / IA)

Este site possui publicação **100% automática de Blog & Notícias baseada em arquivos Markdown (`.md`)**.
Sempre que um novo arquivo `.md` for adicionado na pasta `content/blog/` e enviado para a branch `main` no GitHub (`github.com/FinanCon/site`), ele aparece automaticamente na página **`/conteudos`** do site no próximo build!

---

## 1. Passo a passo para publicar (Michelle / Equipe)

1. Crie um novo arquivo dentro da pasta `content/blog/` seguindo o padrão de nome:
   `AAAA-MM-DD-titulo-curto-sem-acentos.md`
   *(Exemplo: `2026-12-01-calendario-imposto-de-renda-2027.md`)*
2. No topo do arquivo, preencha o cabeçalho (Frontmatter) exatamente neste formato:

```markdown
---
title: "Título claro e direto do artigo ou notícia"
date: "2026-12-01"
category: "Tributário & Notícias"
summary: "Resumo em 1 ou 2 frases explicando o que o empresário ou médico vai aprender."
author: "Michelle Rossini Crepaldi"
readTime: "4 min de leitura"
featured: "false"
---

Escreva aqui o texto completo do artigo em Markdown...
```

3. Faça o commit e push para a branch `main` do repositório `github.com/FinanCon/site`.
4. Na Hostinger (quando conectada ao repositório GitHub), o push dispara a atualização automática do site.

---

## 2. Categorias recomendadas

- `Área da Saúde`
- `Tributário & Notícias`
- `BPO Financeiro`
- `Condomínios & Patrimônio`

---

## 3. Prompt pronto para usar no Claude / IA da Finan.Con

Quando quiser pedir para o Claude ou outra IA escrever e já salvar uma notícia ou artigo no repositório `FinanCon/site`, cole esta instrução:

> **Prompt para a IA:**
> "Crie um novo artigo para o blog da Finan.Con na pasta `content/blog/` do repositório `FinanCon/site`, com o nome `AAAA-MM-DD-slug-do-tema.md`.
> Siga rigorosamente o tom de voz da Finan.Con: consultivo, próximo, simples, sem 'contabilês' e sem usar medo como argumento de venda. Fale na segunda pessoa ('você') e conecte com os pilares Organizar, Direcionar e Transformar.
> Use exatamente este frontmatter YAML no topo: `title`, `date` (YYYY-MM-DD), `category` (uma entre: Área da Saúde, Tributário & Notícias, BPO Financeiro, Condomínios & Patrimônio), `summary`, `author` (Michelle Rossini Crepaldi ou Fernanda Ruiz Mussato), `readTime`, `featured`.
> Estruture o corpo com subtítulos `##`, listas objetivas `-` e uma citação resumo `>`. Ao final, faça o commit e push para a branch `main`."
