import { Link, useParams } from 'react-router-dom';
import { paperById, questionsByPaper, comprehensions } from '../content';
import { formatMarks } from '../lib/format';
import NotFound from './NotFound';

export default function PaperDetail() {
  const { paperId = '' } = useParams();
  const paper = paperById.get(paperId);
  if (!paper) return <NotFound />;

  const qs = questionsByPaper(paper.id);
  const totalMarks = qs.reduce((s, q) => s + q.marks, 0);
  const paperComprehensions = comprehensions.filter((c) => c.paperId === paper.id);

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
      <Link to="/papers" className="faint" style={{ fontSize: 13 }}>
        ← All papers
      </Link>

      <span className={`pill ${paper.kind === 'end-term' ? 'pill-accent' : 'pill-amber'}`} style={{ display: 'inline-flex', marginTop: 16 }}>
        {paper.kind === 'end-term' ? 'Official end term' : 'Practice paper'}
      </span>
      <h1 className="page-title">{paper.name}</h1>
      <p className="page-lede">{paper.note}</p>

      <div className="row wrap muted" style={{ gap: 20, marginTop: 18, fontSize: 13.5 }}>
        <span>{qs.length} questions transcribed</span>
        <span>·</span>
        <span>{formatMarks(totalMarks)} marks</span>
        <span>·</span>
        <span>{paperComprehensions.length} shared passages</span>
      </div>

      <div className="stack" style={{ gap: 10, marginTop: 28 }}>
        {qs.map((q) => (
          <Link key={q.id} to={`/questions/${q.id}`} className="card card-link" style={{ display: 'block', padding: '13px 16px' }}>
            <div className="spread">
              <div className="row" style={{ gap: 10 }}>
                <span className="pill">Q{q.number}</span>
                <span style={{ fontSize: 14, fontWeight: 550 }}>{q.title}</span>
              </div>
              <div className="row" style={{ gap: 6, flexShrink: 0 }}>
                <span className="pill">{q.type}</span>
                <span className="pill pill-accent">{formatMarks(q.marks)}m</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
