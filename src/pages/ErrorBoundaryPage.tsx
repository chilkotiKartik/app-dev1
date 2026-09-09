import { Link, useRouteError } from 'react-router-dom';

export default function ErrorBoundaryPage() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : 'Something went wrong rendering this page.';
  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 64, textAlign: 'center' }}>
      <h1 className="page-title">Something broke</h1>
      <p className="page-lede" style={{ margin: '0 auto 20px' }}>
        {message}
      </p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  );
}
