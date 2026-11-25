import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onNavigate?: (path: string) => void;
}

function renderInline(
  text: string,
  onNavigate?: (path: string) => void
): React.ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, idx) => {
    if (!token) return null;

    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-[#141E37]">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      return (
        <em key={idx} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith('/');
      return (
        <a
          key={idx}
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          onClick={(e) => {
            if (isInternal && onNavigate && !href.startsWith('/#')) {
              e.preventDefault();
              onNavigate(href);
            }
          }}
          className="font-semibold text-[#284591] hover:text-[#141E37] underline underline-offset-4 transition-colors"
        >
          {label}
        </a>
      );
    }

    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onNavigate }) => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line === '---') {
      blocks.push(<hr key={i} className="my-8 border-[#E2E0D8]" />);
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={i}
          className="font-display font-bold text-[22px] sm:text-[24px] text-[#141E37] mt-8 mb-3 leading-[1.2]"
        >
          {renderInline(line.slice(4), onNavigate)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={i}
          className="font-display font-bold text-[26px] sm:text-[30px] text-[#141E37] mt-10 mb-4 leading-[1.15]"
        >
          {renderInline(line.slice(3), onNavigate)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h2
          key={i}
          className="font-display font-bold text-[28px] sm:text-[34px] text-[#141E37] mt-10 mb-4 leading-[1.12]"
        >
          {renderInline(line.slice(2), onNavigate)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote
          key={`q-${i}`}
          className="my-7 bg-white border-l-4 border-[#F0B44C] rounded-r-[14px] px-6 py-5 text-[18px] text-[#141E37] leading-[1.6]"
        >
          {renderInline(quoteLines.join(' '), onNavigate)}
        </blockquote>
      );
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2.5 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-6 text-[17.5px] text-[#4A5A66] leading-[1.62]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[11px] w-2.5 h-2.5 rounded-[2px] bg-[#3280C2]"
              />
              {renderInline(item, onNavigate)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="my-5 space-y-3 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[28px_1fr] gap-2.5 text-[17.5px] text-[#4A5A66] leading-[1.62]"
            >
              <span className="font-display font-bold text-[#284591] tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{renderInline(item, onNavigate)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('> ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      lines[i].trim() !== '---'
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    blocks.push(
      <p key={`p-${i}`} className="my-4 text-[18px] text-[#4A5A66] leading-[1.68]">
        {renderInline(paraLines.join(' '), onNavigate)}
      </p>
    );
  }

  return <div className="max-w-[72ch]">{blocks}</div>;
};
