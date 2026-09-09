import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { topics, computeTopicStats } from '../content';
import { pluralize } from '../lib/format';

export default function Revision() {
  const stats = computeTopicStats();
  const [openTopic, setOpenTopic] = useState<string | null>(stats[0]?.topic.id ?? null);

  const revisionCards = useMemo(() => {
    const map = new Map<string, { term: string; meaning: string }[]>();
    for (const t of topics) map.set(t.id, t.keyTerms);
    return map;
  }, []);

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <span className="eyebrow">Quick Revision</span>
      <h1 className="page-title">Every topic, one glance each</h1>
      <p className="page-lede">
        Key terms and common mistakes for every topic, condensed for a last pass before the exam. Expand a topic to
        see its cheat-sheet.
      </p>

      <div className="stack" style={{ gap: 10, marginTop: 28 }}>
        {stats.map(({ topic, questionCount }) => {
          const isOpen = openTopic === topic.id;
          const terms = revisionCards.get(topic.id) ?? [];
          return (
            <div key={topic.id} className="card">
              <button
                type="button"
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                aria-expanded={isOpen}
                className="spread"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 15 }}>{topic.name}</span>
                <span className="qcard-meta">
                  {pluralize(questionCount, 'question')} {isOpen ? '▲' : '▼'}
                </span>
              </button>
              {isOpen ? (
                <div style={{ padding: '0 18px 18px' }}>
                  <div className="grid grid-2" style={{ marginBottom: 14 }}>
                    {terms.slice(0, 8).map((kt) => (
                      <div key={kt.term} style={{ padding: '10px 12px', background: 'var(--bg-sunken)', borderRadius: 8 }}>
                        <p style={{ margin: 0, fontWeight: 650, fontSize: 13 }}>{kt.term}</p>
                        <p className="muted" style={{ margin: 0, fontSize: 12.5 }}>
                          {kt.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginBottom: 6, fontWeight: 600, fontSize: 13 }}>Watch out for:</p>
                  <ul style={{ marginTop: 0, marginBottom: 12, fontSize: 13.5 }}>
                    {topic.commonMistakes.slice(0, 3).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                  <div style={{ padding: '10px 12px', background: 'var(--amber-soft)', borderRadius: 8, marginBottom: 12 }}>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 650 }}>💡 {topic.hinglishTip}</p>
                  </div>
                  <Link to={`/topics/${topic.id}`} className="btn btn-sm">
                    Full topic page →
                  </Link>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
