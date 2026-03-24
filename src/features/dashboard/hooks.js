import { useGetDashboardStatsQuery } from './api';

export const useDashboardStats = (options) => useGetDashboardStatsQuery(undefined, options);
