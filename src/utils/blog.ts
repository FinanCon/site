export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  category: string;
  summary: string;
  author: string;
  readTime: string;
  featured?: boolean;
  content: string;
}

const rawModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function formatPtBrDate(isoDate: string): string {
  const parts = isoDate.trim().split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez',
  ];
  const monthIdx = parseInt(month, 10) - 1;
  const monthLabel = months[monthIdx] ?? month;
  return `${day} ${monthLabel} ${year}`;
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const normalized = raw.replace(/\r\n/g, '\n').trim();
  if (!normalized.startsWith('---')) {
    return { meta: {}, body: normalized };
  }
  const endIdx = normalized.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { meta: {}, body: normalized };
  }

  const frontmatterBlock = normalized.slice(3, endIdx).trim();
  const body = normalized.slice(endIdx + 4).trim();
  const meta: Record<string, string> = {};

  for (const line of frontmatterBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }

  return { meta, body };
}

function filenameToSlug(filePath: string): string {
  const fileName = filePath.split('/').pop() || '';
  return fileName
    .replace(/\.md$/i, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(rawModules).map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const date = meta.date || '2026-01-01';
    return {
      slug: meta.slug || filenameToSlug(path),
      title: meta.title || 'Artigo Finan.Con',
      date,
      formattedDate: formatPtBrDate(date),
      category: meta.category || 'Notícias',
      summary: meta.summary || '',
      author: meta.author || 'Equipe Finan.Con',
      readTime: meta.readTime || '4 min de leitura',
      featured: meta.featured === 'true',
      content: body,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
