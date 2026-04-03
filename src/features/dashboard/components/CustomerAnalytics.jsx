import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';
import { Users, UserPlus, UserCheck, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Total Customers',
    value: '12,847',
    change: '+8.1%',
    positive: true,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: UserPlus,
    label: 'New This Month',
    value: '1,234',
    change: '+12.3%',
    positive: true,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: UserCheck,
    label: 'Active Users',
    value: '9,456',
    change: '+5.2%',
    positive: true,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: TrendingUp,
    label: 'Retention Rate',
    value: '73.5%',
    change: '+2.1%',
    positive: true,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
  },
];

export const CustomerAnalytics = memo(function CustomerAnalytics() {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Customer Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bg} flex-shrink-0`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <span className={`text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
