import { lazy, Suspense, useState, useEffect } from 'react';
import { AutoSkeleton } from '@shared/components/skeleton';
import { OverviewStats } from './OverviewStats';

const SalesChart = lazy(() => import('./SalesChart').then((m) => ({ default: m.SalesChart })));
const RevenueChart = lazy(() => import('./SalesChart').then((m) => ({ default: m.RevenueChart })));
const RecentOrders = lazy(() =>
  import('./RecentOrders').then((m) => ({ default: m.RecentOrders })),
);
const TopProducts = lazy(() => import('./TopProducts').then((m) => ({ default: m.TopProducts })));
const CustomerAnalytics = lazy(() =>
  import('./CustomerAnalytics').then((m) => ({ default: m.CustomerAnalytics })),
);
const ActivityFeed = lazy(() =>
  import('./ActivityFeed').then((m) => ({ default: m.ActivityFeed })),
);
const FinancialWidgets = lazy(() =>
  import('./FinancialWidgets').then((m) => ({ default: m.FinancialWidgets })),
);

const skeletonConfig = { animation: 'shimmer' };

function useLazySkeleton() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return !loaded;
}

const LazyWidget = ({ children }) => {
  const loading = useLazySkeleton();
  return (
    <AutoSkeleton loading={loading} config={skeletonConfig}>
      <Suspense fallback={null}>{children}</Suspense>
    </AutoSkeleton>
  );
};

export const DashboardContent = () => {
  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <OverviewStats />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="w-full min-w-0">
          <LazyWidget>
            <SalesChart />
          </LazyWidget>
        </div>
        <div className="w-full min-w-0">
          <LazyWidget>
            <RevenueChart />
          </LazyWidget>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full min-w-0">
          <LazyWidget>
            <RecentOrders />
          </LazyWidget>
          <LazyWidget>
            <TopProducts />
          </LazyWidget>
        </div>

        <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <LazyWidget>
            <CustomerAnalytics />
          </LazyWidget>
          <LazyWidget>
            <ActivityFeed />
          </LazyWidget>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-1">
          Financial Overview
        </h2>
        <LazyWidget>
          <FinancialWidgets />
        </LazyWidget>
      </div>
    </div>
  );
};
