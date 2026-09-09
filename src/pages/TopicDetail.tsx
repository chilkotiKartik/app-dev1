import { Link, useParams } from 'react-router-dom';
import { topicById, questionsByTopic, questionsBySubtopic } from '../content';
import { BlockRenderer } from '../components/Blocks';
import QuestionCard from '../components/QuestionCard';
import EmptyState from '../components/EmptyState';
import { pluralize } from '../lib/format';
import { useState } from 'react';
import NotFound from './NotFound';

export default function TopicDetail() {
  const { topicId = '' } = useParams();
  const topic = topicById.get(topicId);
  const [activeSub, setActiveSub] = useState<string | 'all'>('all');

  if (!topic) return <NotFound />;

  const allQuestions = questionsByTopic(topic.id);
  const shown = activeSub === 'all' ? allQuestions : questionsBySubtopic(topic.id, activeSub);

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <Link to="/topics" className="faint" style={{ fontSize: 13 }}>
        ← All topics
      </Link>
      <span className="eyebrow" style={{ display: 'block', marginTop: 14 }}>
        Topic
      </span>
      <h1 className="page-title">{topic.name}</h1>
      <p className="page-lede">{topic.blurb}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 40, marginTop: 32 }} className="topic-grid">
        <div style={{ minWidth: 0 }}>
          <section aria-labelledby="learn-heading">
            <h2 id="learn-heading" className="section-title">
              Learn
            </h2>
            <div style={{ marginTop: 12 }}>
              <BlockRenderer blocks={topic.learn} />
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2 className="section-title">Key terms</h2>
            <dl className="grid grid-2" style={{ marginTop: 12 }}>
              {topic.keyTerms.map((kt) => (
                <div key={kt.term} className="card card-pad">
                  <dt style={{ fontWeight: 650, fontSize: 13.5, marginBottom: 4 }}>{kt.term}</dt>
                  <dd style={{ margin: 0, color: 'var(--text-muted)', fontSize: 13.5 }}>{kt.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2 className="section-title">Common mistakes</h2>
            <ul style={{ marginTop: 12 }}>
              {topic.commonMistakes.map((m, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {m}
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: 32 }}>
            <h2 className="section-title">Exam-focused guidance</h2>
            <ul style={{ marginTop: 12 }}>
              {topic.examFocus.map((m, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside>
          <div className="card card-pad" style={{ position: 'sticky', top: 76 }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>
              Subtopics
            </p>
            <div className="stack" style={{ gap: 4 }}>
              <button
                type="button"
                className="chip"
                aria-pressed={activeSub === 'all'}
                onClick={() => setActiveSub('all')}
                style={{ textAlign: 'left', justifyContent: 'flex-start', ...(activeSub === 'all' ? activeChipStyle : {}) }}
              >
                All ({allQuestions.length})
              </button>
              {topic.subtopics.map((s) => {
                const count = questionsBySubtopic(topic.id, s.id).length;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className="chip"
                    aria-pressed={activeSub === s.id}
                    onClick={() => setActiveSub(s.id)}
                    style={{ textAlign: 'left', justifyContent: 'flex-start', ...(activeSub === s.id ? activeChipStyle : {}) }}
                    title={s.summary}
                  >
                    {s.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 className="section-title">{pluralize(shown.length, 'question')} on this topic</h2>
        <div className="grid grid-2" style={{ marginTop: 14 }}>
          {shown.map((q) => (
            <QuestionCard key={q.id} question={q} showTopic={false} />
          ))}
        </div>
        {shown.length === 0 ? <EmptyState title="No questions in this subtopic yet" /> : null}
      </section>

      <style>{`
        @media (max-width: 900px) {
          .topic-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const activeChipStyle: React.CSSProperties = {
  background: 'var(--accent-soft)',
  color: 'var(--accent)',
  borderColor: 'transparent',
};
