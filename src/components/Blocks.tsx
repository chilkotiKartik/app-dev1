import type { Block } from '../content/types';

function inlineFormat(text: string): (string | JSX.Element)[] {
  // Minimal inline markdown: **bold** and `code`
  const parts: (string | JSX.Element)[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const chunk = m[0];
    if (chunk.startsWith('**')) parts.push(<strong key={key++}>{chunk.slice(2, -2)}</strong>);
    else parts.push(
      <code className="inline-code" key={key++}>
        {chunk.slice(1, -1)}
      </code>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function RichText({ value }: { value: string }) {
  const paragraphs = value.split(/\n{2,}/);
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j, arr) => (
            <span key={j}>
              {inlineFormat(line)}
              {j < arr.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

export function CodeBlock({ lang, value, caption }: { lang: string; value: string; caption?: string }) {
  return (
    <div className="code-block">
      {caption ? <div className="code-block-caption">{caption}</div> : null}
      <pre>
        <code className={`lang-${lang}`}>{value}</code>
      </pre>
    </div>
  );
}

export function TableBlock({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  return (
    <div>
      {caption ? <p className="faint" style={{ fontSize: 12.5, marginBottom: 4 }}>{caption}</p> : null}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{inlineFormat(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'text':
            return <RichText key={i} value={b.value} />;
          case 'render':
            return (
              <div className="card" style={{ padding: '12px 14px', background: 'var(--bg-sunken)', marginBottom: 12 }} key={i}>
                <p className="faint" style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                  Rendered output (described)
                </p>
                <RichText value={b.value} />
              </div>
            );
          case 'code':
            return <CodeBlock key={i} lang={b.lang} value={b.value} caption={b.caption} />;
          case 'table':
            return <TableBlock key={i} head={b.head} rows={b.rows} caption={b.caption} />;
          case 'list':
            return b.ordered ? (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inlineFormat(it)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inlineFormat(it)}</li>
                ))}
              </ul>
            );
          case 'figure':
            return (
              <figure key={i} style={{ margin: '14px 0' }}>
                <div className="card" style={{ padding: 10, background: 'var(--bg-sunken)' }}>
                  <img src={b.src} alt={b.alt} loading="lazy" style={{ borderRadius: 6 }} />
                </div>
                {b.caption ? (
                  <figcaption className="faint" style={{ fontSize: 12, marginTop: 6 }}>
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
