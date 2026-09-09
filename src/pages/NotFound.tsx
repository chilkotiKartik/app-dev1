import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <EmptyState
        title="Page not found"
        description="That page doesn't exist, or the question/topic/paper ID doesn't match anything transcribed here."
        action={
          <div className="row" style={{ gap: 10, justifyContent: 'center', marginTop: 8 }}>
            <Link to="/" className="btn btn-primary">
              Go home
            </Link>
            <Link to="/questions" className="btn">
              Browse questions
            </Link>
          </div>
        }
      />
    </div>
  );
}
