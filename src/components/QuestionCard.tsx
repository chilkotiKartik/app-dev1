import { Link } from 'react-router-dom';
import type { Question } from '../content/types';
import { paperById, topicById } from '../content';
import { formatMarks } from '../lib/format';

export default function QuestionCard({ question, showTopic = true }: { question: Question; showTopic?: boolean }) {
  const paper = paperById.get(question.paperId);
  const topic = topicById.get(question.topicId);
  return (
    <Link to={`/questions/${question.id}`} className="card card-link" style={{ display: 'block', padding: '15px 17px' }}>
      <div className="qcard-top">
        <span className="pill">{question.type}</span>
        <span className="pill pill-accent">{formatMarks(question.marks)} marks</span>
        {paper ? <span className="pill">{paper.name.replace('End Term ', '')}</span> : null}
        <span className="pill">Q{question.number}</span>
      </div>
      <h3 className="qcard-title">{question.title}</h3>
      {showTopic && topic ? <p className="qcard-meta">{topic.name}</p> : null}
    </Link>
  );
}
