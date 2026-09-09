import { Link } from 'react-router-dom';
import { papers, questionsByPaper } from '../content';
import { formatMarks } from '../lib/format';

export default function Papers() {
  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <span className="eyebrow">Exam Papers</span>
      <h1 className="page-title">Read a full paper, in order</h1>
      <p className="page-lede">
        Each paper is transcribed question-by-question from its source PDF, in the order it was originally asked.
      </p>

      <div className="grid grid-2" style={{ marginTop: 28 }}>
        {papers.map((p) => {
          const qs = questionsByPaper(p.id);
          const marks = qs.reduce((s, q) => s + q.marks, 0);
          return (
            <Link key={p.id} to={`/papers/${p.id}`} className="card card-link card-pad">
              <span className={`pill ${p.kind === 'end-term' ? 'pill-accent' : 'pill-amber'}`} style={{ marginBottom: 10 }}>
                {p.kind === 'end-term' ? 'Official end term' : 'Practice paper'}
              </span>
              <h2 style={{ fontSize: 17, margin: '0 0 6px' }}>{p.name}</h2>
              <p className="muted" style={{ fontSize: 13.5, marginBottom: 10 }}>{p.section.label}</p>
              <p className="qcard-meta">
                {qs.length} questions transcribed · {formatMarks(marks)} marks
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
