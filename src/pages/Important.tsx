import { Link } from 'react-router-dom';
import { computeTopicStats } from '../content';
import { formatMarks, pluralize } from '../lib/format';

export default function Important() {
  const stats = computeTopicStats();
  const maxMarks = Math.max(...stats.map((s) => s.totalMarks), 1);

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <span className="eyebrow">Important Topics</span>
      <h1 className="page-title">Where the marks actually are</h1>
      <p className="page-lede">
        Ranked by how many questions and marks in the five source papers map to each topic — a direct count, not an
        opinion. Use this to decide what to study first.
      </p>

      <div className="stack" style={{ gap: 10, marginTop: 28 }}>
        {stats.map((s, i) => (
          <Link key={s.topic.id} to={`/topics/${s.topic.id}`} className="card card-link card-pad" style={{ display: 'block' }}>
            <div className="spread" style={{ marginBottom: 10 }}>
              <div className="row" style={{ gap: 10 }}>
                <span className="faint mono" style={{ fontSize: 13 }}>
                  #{i + 1}
                </span>
                <h2 style={{ fontSize: 15.5, margin: 0 }}>{s.topic.name}</h2>
              </div>
              <span className="qcard-meta">
                {pluralize(s.questionCount, 'question')} · {formatMarks(s.totalMarks)} marks
                {s.repeatCount > 0 ? ` · ${pluralize(s.repeatCount, 'verified repeat')}` : ''}
              </span>
            </div>
            <div style={{ height: 6, background: 'var(--bg-sunken)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(s.totalMarks / maxMarks) * 100}%`,
                  background: 'var(--accent)',
                  borderRadius: 999,
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
