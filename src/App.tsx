import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import ErrorBoundaryPage from './pages/ErrorBoundaryPage';
import { SkeletonCards } from './components/Skeleton';

const Home = lazy(() => import('./pages/Home'));
const Topics = lazy(() => import('./pages/Topics'));
const TopicDetail = lazy(() => import('./pages/TopicDetail'));
const QuestionBank = lazy(() => import('./pages/QuestionBank'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const Papers = lazy(() => import('./pages/Papers'));
const PaperDetail = lazy(() => import('./pages/PaperDetail'));
const Repeated = lazy(() => import('./pages/Repeated'));
const Important = lazy(() => import('./pages/Important'));
const Revision = lazy(() => import('./pages/Revision'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <SkeletonCards />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'topics', element: withSuspense(Topics) },
      { path: 'topics/:topicId', element: withSuspense(TopicDetail) },
      { path: 'questions', element: withSuspense(QuestionBank) },
      { path: 'questions/:questionId', element: withSuspense(QuestionDetail) },
      { path: 'papers', element: withSuspense(Papers) },
      { path: 'papers/:paperId', element: withSuspense(PaperDetail) },
      { path: 'repeated', element: withSuspense(Repeated) },
      { path: 'important', element: withSuspense(Important) },
      { path: 'revision', element: withSuspense(Revision) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
