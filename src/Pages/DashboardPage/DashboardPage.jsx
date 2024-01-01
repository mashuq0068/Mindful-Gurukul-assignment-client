import  { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../../Components/Dashboard/Dashboard'));

const DashboardPage = () => {
  return (
    <div>
        {/* adding suspense for lazy loading */}
      <Suspense fallback={ <span className="loading  fixed top-[50vh] left-[50vw] loading-spinner text-secondary"></span>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
