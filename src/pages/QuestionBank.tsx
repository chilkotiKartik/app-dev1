import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { questions, papers, topics, repeatGroups } from '../content';
import type { QuestionType } from '../content/types';
import { matchesQuery } from '../lib/search';
import QuestionCard from '../components/QuestionCard';
import EmptyState from '../components/EmptyState';
import { pluralize } from '../lib/format';

const TYPES: QuestionType[] = ['MCQ', 'MSQ', 'SA'];
const repeatedIds = new Set(repeatGroups.flatMap((g) => g.questionIds));
const PAGE_SIZE = 24;

export default function QuestionBank() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [localQuery, setLocalQuery] = useState(q);

  const [paperId, setPaperId] = useState<string>('all');
  const [topicId, setTopicId] = useState<string>('all');
  const [type, setType] = useState<QuestionType | 'all'>('all');
  const [onlyRepeated, setOnlyRepeated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return questions.filter((qq) => {
      if (paperId !== 'all' && qq.paperId !== paperId) return false;
      if (topicId !== 'all' && qq.topicId !== topicId) return false;
      if (type !== 'all' && qq.type !== type) return false;
      if (onlyRepeated && !repeatedIds.has(qq.id)) return false;
      if (!matchesQuery(qq, q)) return false;
      return true;
    });
  }, [paperId, topicId, type, onlyRepeated, q]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [paperId, topicId, type, onlyRepeated, q]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (localQuery.trim()) setParams({ q: localQuery.trim() });
    else setParams({});
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <span className="eyebrow">Question Bank</span>
      <h1 className="page-title">Search and filter every transcribed question</h1>
      <p className="page-lede">
        Filter by paper, topic, question type or repetition — or search by keyword, question number, or year.
      </p>

      <form onSubmit={submitSearch} role="search" className="search-box" style={{ marginTop: 24, maxWidth: 480 }}>
        <label htmlFor="bank-search" className="sr-only">
          Search the question bank
        </label>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="bank-search"
          className="input"
          type="search"
          placeholder="e.g. groupby, session, 168, IPv4…"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </form>

      <div className="filter-bar" style={{ marginTop: 18 }}>
        <select className="select" style={{ width: 'auto' }} value={paperId} onChange={(e) => setPaperId(e.target.value)} aria-label="Filter by paper">
          <option value="all">All papers</option>
          {papers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select className="select" style={{ width: 'auto' }} value={topicId} onChange={(e) => setTopicId(e.target.value)} aria-label="Filter by topic">
          <option value="all">All topics</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <div className="row" style={{ gap: 6 }}>
          {(['all', ...TYPES] as const).map((tt) => (
            <button
              key={tt}
              type="button"
              className={`chip ${type === tt ? 'active' : ''}`}
              onClick={() => setType(tt)}
              aria-pressed={type === tt}
            >
              {tt === 'all' ? 'All types' : tt}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`chip ${onlyRepeated ? 'active' : ''}`}
          aria-pressed={onlyRepeated}
          onClick={() => setOnlyRepeated((v) => !v)}
        >
          Repeated only
        </button>
        {(paperId !== 'all' || topicId !== 'all' || type !== 'all' || onlyRepeated || q) && (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setPaperId('all');
              setTopicId('all');
              setType('all');
              setOnlyRepeated(false);
              setLocalQuery('');
              setParams({});
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="muted" style={{ marginTop: 18, marginBottom: 14, fontSize: 13.5 }}>
        {pluralize(filtered.length, 'question')} match{filtered.length === 1 ? 'es' : ''}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No questions match those filters"
          description="Try clearing a filter or searching a different term."
        />
      ) : (
        <>
          <div className="grid grid-2">
            {visible.map((qq) => (
              <QuestionCard key={qq.id} question={qq} />
            ))}
          </div>
          {hasMore ? (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button type="button" className="btn" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                Show {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
