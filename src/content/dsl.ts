import type { Block, CodeLang, Option } from './types';

export const t = (value: string): Block => ({ kind: 'text', value });

export const c = (lang: CodeLang, value: string, caption?: string): Block => ({
  kind: 'code',
  lang,
  value,
  caption,
});

export const py = (value: string, caption?: string) => c('python', value, caption);
export const sh = (value: string, caption?: string) => c('shell', value, caption);
export const out = (value: string, caption?: string) => c('text', value, caption);

export const tbl = (head: string[], rows: string[][], caption?: string): Block => ({
  kind: 'table',
  head,
  rows,
  caption,
});

export const li = (items: string[], ordered = false): Block => ({ kind: 'list', ordered, items });

export const fig = (src: string, alt: string, caption?: string): Block => ({
  kind: 'figure',
  src,
  alt,
  caption,
});

export const rnd = (value: string): Block => ({ kind: 'render', value });

/** Correct option. */
export const ok = (id: string, ...blocks: (Block | string)[]): Option => ({
  id,
  blocks: blocks.map(norm),
  correct: true,
});

/** Incorrect option. */
export const no = (id: string, ...blocks: (Block | string)[]): Option => ({
  id,
  blocks: blocks.map(norm),
  correct: false,
});

function norm(b: Block | string): Block {
  return typeof b === 'string' ? t(b) : b;
}
