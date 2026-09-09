import { Link } from 'react-router-dom';
import { papers, topics, questions, repeatGroups, computeTopicStats } from '../content';
import { formatMarks, pluralize } from '../lib/format';

export default function Home() {
  const topicStats = computeTopicStats().slice(0, 6);
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <section style={{ maxWidth: 760 }}>
        <span className="eyebrow">Modern Application Development I</span>
        <h1 className="page-title">Study from the actual exam, not a guess at it.</h1>
        <p className="page-lede">
          Every question here is transcribed from {pluralize(papers.length, 'real source paper')} — four official
          IITM BS Diploma end-term papers and one practice paper — with a verified solution, an explanation grounded
          in the code, and the topic it belongs to. Nothing is invented.
        </p>
        <div className="row wrap" style={{ gap: 10, marginTop: 22 }}>
          <Link to="/topics" className="btn btn-primary">
            Start with the topics
          </Link>
          <Link to="/questions" className="btn">
            Browse the question bank
          </Link>
          <Link to="/revision" className="btn">
            Quick revision
          </Link>
        </div>
      </section>

      <div className="grid grid-4" style={{ marginTop: 36 }}>
        <StatCard label="Questions transcribed" value={String(questions.length)} />
        <StatCard label="Source papers" value={String(papers.length)} />
        <StatCard label="Topics covered" value={String(topics.length)} />
        <StatCard label="Total marks represented" value={formatMarks(totalMarks)} />
      </div>

      <section style={{ marginTop: 48 }}>
        <div className="spread" style={{ marginBottom: 14 }}>
          <h2 className="section-title">Most-tested topics</h2>
          <Link to="/important" className="btn btn-sm">
            See full ranking
          </Link>
        </div>
        <p className="muted" style={{ marginBottom: 16, maxWidth: 640 }}>
          Ranked purely by how many questions and marks in the source papers map to each topic — not by opinion.
        </p>
        <div className="grid grid-3">
          {topicStats.map((s) => (
            <Link key={s.topic.id} to={`/topics/${s.topic.id}`} className="card card-link card-pad">
              <p className="qcard-meta" style={{ marginBottom: 6 }}>
                {pluralize(s.questionCount, 'question')} · {formatMarks(s.totalMarks)} marks
              </p>
              <h3 style={{ fontSize: 15.5, margin: 0 }}>{s.topic.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <div className="spread" style={{ marginBottom: 14 }}>
          <h2 className="section-title">Verified repeats</h2>
          <Link to="/repeated" className="btn btn-sm">
            See all {repeatGroups.length}
          </Link>
        </div>
        <p className="muted" style={{ marginBottom: 16, maxWidth: 640 }}>
          {pluralize(repeatGroups.length, 'question')} appear — verbatim or as a close variant — across more than one
          source paper. Each is cross-checked, not guessed.
        </p>
        <div className="grid grid-2">
          {repeatGroups.slice(0, 4).map((g) => (
            <Link key={g.id} to={`/repeated#${g.id}`} className="card card-link card-pad">
              <span className={`pill ${g.kind === 'verbatim' ? 'pill-green' : 'pill-amber'}`} style={{ marginBottom: 8 }}>
                {g.kind === 'verbatim' ? 'Verbatim repeat' : 'Variant'}
              </span>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 550 }}>{g.label}</p>
              <p className="qcard-meta" style={{ marginTop: 6 }}>
                Appears in {g.questionIds.length} places
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <h2 className="section-title">Source papers</h2>
        <p className="muted" style={{ marginBottom: 16, maxWidth: 640 }}>
          Read a paper end to end, in exam order, with every question's verified answer attached.
        </p>
        <div className="grid grid-3">
          {papers.map((p) => (
            <Link key={p.id} to={`/papers/${p.id}`} className="card card-link card-pad">
              <span className={`pill ${p.kind === 'end-term' ? 'pill-accent' : 'pill-amber'}`} style={{ marginBottom: 8 }}>
                {p.kind === 'end-term' ? 'Official end term' : 'Practice paper'}
              </span>
              <h3 style={{ fontSize: 15, margin: '0 0 4px' }}>{p.name}</h3>
              <p className="qcard-meta">
                {p.section.questionCount} questions in section · {p.section.marks} marks
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card card-pad">
      <p className="eyebrow" style={{ marginBottom: 8 }}>
        {label}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{value}</p>
    </div>
  );
}
