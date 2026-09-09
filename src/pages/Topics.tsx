import { Link } from 'react-router-dom';
import { computeTopicStats } from '../content';
import { formatMarks, pluralize } from '../lib/format';

export default function Topics() {
  const stats = computeTopicStats();
  return (
    <div className="container" style={{ paddingTop: 36, paddingBottom: 48 }}>
      <span className="eyebrow">Topic Explorer</span>
      <h1 className="page-title">Every topic these papers actually test</h1>
      <p className="page-lede">
        Study a topic before you drill questions on it — each page explains the idea in plain language, then shows
        exactly which exam questions test it.
      </p>

      <div className="grid grid-3" style={{ marginTop: 28 }}>
        {stats.map(({ topic, questionCount, totalMarks }) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className="card card-link card-pad">
            <h2 style={{ fontSize: 16.5, margin: '0 0 6px' }}>{topic.name}</h2>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 12 }}>
              {topic.blurb}
            </p>
            <p className="qcard-meta">
              {pluralize(questionCount, 'question')} · {formatMarks(totalMarks)} marks · {topic.subtopics.length} subtopics
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
