import { Link, useParams } from 'react-router-dom';
import { questionById, paperById, topicById, comprehensionById, repeatGroupsForQuestion, questionsByPaper } from '../content';
import { BlockRenderer } from '../components/Blocks';
import { formatMarks } from '../lib/format';
import NotFound from './NotFound';

export default function QuestionDetail() {
  const { questionId = '' } = useParams();
  const question = questionById.get(questionId);
  if (!question) return <NotFound />;

  const paper = paperById.get(question.paperId)!;
  const topic = topicById.get(question.topicId);
  const subtopic = topic?.subtopics.find((s) => s.id === question.subtopicId);
  const comprehension = question.comprehensionId ? comprehensionById.get(question.comprehensionId) : undefined;
  const repeats = repeatGroupsForQuestion(question.id);

  const paperQuestions = questionsByPaper(paper.id);
  const idx = paperQuestions.findIndex((q) => q.id === question.id);
  const prev = idx > 0 ? paperQuestions[idx - 1] : undefined;
  const next = idx >= 0 && idx < paperQuestions.length - 1 ? paperQuestions[idx + 1] : undefined;

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56, maxWidth: 880 }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 13 }} className="faint">
        <Link to="/questions">Question Bank</Link>
        {' / '}
        <Link to={`/papers/${paper.id}`}>{paper.name}</Link>
        {' / '}
        <span>Q{question.number}</span>
      </nav>

      <div className="qcard-top" style={{ marginTop: 16 }}>
        <span className="pill">{question.type}</span>
        <span className="pill pill-accent">{formatMarks(question.marks)} marks</span>
        <span className="pill">{paper.name}</span>
        <span className="pill">Question {question.number}</span>
        {topic ? (
          <Link to={`/topics/${topic.id}`} className="pill" style={{ textDecoration: 'none' }}>
            {topic.name}
          </Link>
        ) : null}
      </div>

      <h1 className="page-title" style={{ fontSize: 26 }}>
        {question.title}
      </h1>

      {subtopic ? (
        <p className="muted" style={{ marginTop: -4, marginBottom: 18, fontSize: 13.5 }}>
          {subtopic.name}
        </p>
      ) : null}

      {repeats.length > 0 ? (
        <div className="card card-pad" style={{ background: 'var(--amber-soft)', borderColor: 'transparent', marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>
            <strong>Repeated question.</strong> This appears — verbatim or as a close variant — in{' '}
            {repeats[0].questionIds.length - 1} other place{repeats[0].questionIds.length - 1 === 1 ? '' : 's'}.{' '}
            <Link to="/repeated">See all repeats →</Link>
          </p>
        </div>
      ) : null}

      {comprehension ? (
        <div className="card card-pad" style={{ marginBottom: 20 }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            Shared passage · questions {comprehension.range}
          </p>
          <BlockRenderer blocks={comprehension.stem} />
        </div>
      ) : null}

      <section aria-labelledby="stem-heading">
        <h2 id="stem-heading" className="sr-only">
          Question
        </h2>
        <BlockRenderer blocks={question.stem} />
      </section>

      {question.type === 'SA' ? (
        <div className="card card-pad" style={{ marginTop: 8 }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            Short answer
          </p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 15 }}>{question.shortAnswer}</p>
        </div>
      ) : (
        <div style={{ marginTop: 8 }}>
          {question.options.map((opt) => (
            <div key={opt.id} className={`option-row ${opt.correct ? 'correct' : ''}`}>
              <span className="option-marker" aria-hidden="true">
                {opt.correct ? '✓' : ''}
              </span>
              <div className="option-body">
                <BlockRenderer blocks={opt.blocks} />
              </div>
              {opt.correct ? <span className="sr-only">Correct answer</span> : null}
            </div>
          ))}
        </div>
      )}

      <section className="solution-block" aria-labelledby="solution-heading" style={{ marginTop: 24 }}>
        <h2 id="solution-heading" className="section-title" style={{ marginBottom: 14 }}>
          Verified solution
        </h2>
        <p className="solution-verdict">{question.solution.verdict}</p>
        <BlockRenderer blocks={question.solution.explanation} />
        {question.solution.approach ? (
          <div style={{ marginTop: 16 }}>
            <p className="eyebrow" style={{ marginBottom: 6 }}>
              Exam approach
            </p>
            <p style={{ margin: 0 }}>{question.solution.approach}</p>
          </div>
        ) : null}
        {question.solution.takeaways && question.solution.takeaways.length > 0 ? (
          <div style={{ marginTop: 16 }}>
            <p className="eyebrow" style={{ marginBottom: 6 }}>
              Key takeaways
            </p>
            <ul style={{ margin: 0 }}>
              {question.solution.takeaways.map((tk, i) => (
                <li key={i}>{tk}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <div className="spread" style={{ marginTop: 32, gap: 10 }}>
        {prev ? (
          <Link to={`/questions/${prev.id}`} className="btn">
            ← Q{prev.number}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/questions/${next.id}`} className="btn">
            Q{next.number} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
