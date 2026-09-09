import { Link } from 'react-router-dom';
import { repeatGroups, questionById, paperById } from '../content';
import { pluralize } from '../lib/format';

export default function Repeated() {
  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 56 }}>
      <span className="eyebrow">Repeated Questions</span>
      <h1 className="page-title">What actually comes back, exam after exam</h1>
      <p className="page-lede">
        Every group below was cross-checked question-by-question against the source PDFs — code, options and the
        marked answer. "Verbatim" means the stem, code and options are effectively identical; "variant" means the
        same idea recurs with different numbers or wording. Nothing here is a guess at similarity.
      </p>

      <div className="stack" style={{ gap: 16, marginTop: 28 }}>
        {repeatGroups.map((g) => (
          <div key={g.id} id={g.id} className="card card-pad">
            <div className="row wrap" style={{ gap: 8, marginBottom: 10 }}>
              <span className={`pill ${g.kind === 'verbatim' ? 'pill-green' : 'pill-amber'}`}>
                {g.kind === 'verbatim' ? 'Verbatim repeat' : 'Variant'}
              </span>
              <span className="pill">{pluralize(g.questionIds.length, 'occurrence')}</span>
            </div>
            <h2 style={{ fontSize: 16.5, margin: '0 0 6px' }}>{g.label}</h2>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 14 }}>{g.note}</p>
            <div className="row wrap" style={{ gap: 8 }}>
              {g.questionIds.map((qid) => {
                const q = questionById.get(qid);
                if (!q) return null;
                const paper = paperById.get(q.paperId);
                return (
                  <Link key={qid} to={`/questions/${qid}`} className="chip" style={{ textDecoration: 'none' }}>
                    {paper?.name.replace('End Term ', '') ?? q.paperId} · Q{q.number}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
