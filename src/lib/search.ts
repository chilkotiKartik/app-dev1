import type { Question } from '../content/types';
import { paperById, topicById } from '../content';

/** Flatten every text-bearing block of a question into a single search haystack. */
function questionHaystack(q: Question): string {
  const parts: string[] = [q.title, String(q.number), q.paperId];
  const paper = paperById.get(q.paperId);
  if (paper) parts.push(paper.name);
  const topic = topicById.get(q.topicId);
  if (topic) {
    parts.push(topic.name);
    const sub = topic.subtopics.find((s) => s.id === q.subtopicId);
    if (sub) parts.push(sub.name);
  }
  const collect = (blocks: typeof q.stem) => {
    for (const b of blocks) {
      if (b.kind === 'text' || b.kind === 'render') parts.push(b.value);
      else if (b.kind === 'code') parts.push(b.value, b.caption ?? '');
      else if (b.kind === 'table') parts.push(b.head.join(' '), b.rows.flat().join(' '));
      else if (b.kind === 'list') parts.push(b.items.join(' '));
      else if (b.kind === 'figure') parts.push(b.alt, b.caption ?? '');
    }
  };
  collect(q.stem);
  for (const opt of q.options) collect(opt.blocks);
  if (q.shortAnswer) parts.push(q.shortAnswer);
  return parts.join(' \n ').toLowerCase();
}

const cache = new WeakMap<Question, string>();
export function getHaystack(q: Question): string {
  let h = cache.get(q);
  if (!h) {
    h = questionHaystack(q);
    cache.set(q, h);
  }
  return h;
}

/** Forgiving multi-token search: every token must appear somewhere in the haystack. */
export function matchesQuery(q: Question, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  const haystack = getHaystack(q);
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  return tokens.every((tok) => haystack.includes(tok));
}
