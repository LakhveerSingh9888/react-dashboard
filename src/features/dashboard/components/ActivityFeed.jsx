import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: ShoppingCart,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    title: 'New order placed',
    desc: 'Order #12345 for $299',
    time: '2 min ago',
  },
  {
    id: 2,
    icon: DollarSign,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30',
    title: 'Payment received',
    desc: 'Invoice #INV-001 paid',
    time: '15 min ago',
  },
  {
    id: 3,
    icon: Package,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    title: 'Shipment dispatched',
    desc: 'Order #12340 shipped',
    time: '1 hr ago',
  },
  {
    id: 4,
    icon: TrendingUp,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    title: 'Sales milestone',
    desc: 'Reached $10K this week',
    time: '3 hr ago',
  },
];

export const ActivityFeed = memo(function ActivityFeed() {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.bg} flex-shrink-0`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{activity.desc}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
