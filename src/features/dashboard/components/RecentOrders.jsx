import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';
import { Badge } from '@shared/components/Badge';
import { MoreVertical } from 'lucide-react';

const orders = [
  {
    id: '#ORD-001',
    customer: 'Alice Johnson',
    product: 'Laptop Pro',
    amount: '$1,299',
    status: 'completed',
  },
  {
    id: '#ORD-002',
    customer: 'Bob Smith',
    product: 'Wireless Mouse',
    amount: '$49',
    status: 'pending',
  },
  {
    id: '#ORD-003',
    customer: 'Carol White',
    product: 'Monitor 4K',
    amount: '$599',
    status: 'processing',
  },
  {
    id: '#ORD-004',
    customer: 'David Brown',
    product: 'Keyboard',
    amount: '$129',
    status: 'completed',
  },
  {
    id: '#ORD-005',
    customer: 'Eva Davis',
    product: 'Headphones',
    amount: '$249',
    status: 'cancelled',
  },
];

const statusVariant = {
  completed: 'success',
  pending: 'warning',
  processing: 'info',
  cancelled: 'danger',
};

export const RecentOrders = memo(function RecentOrders() {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-900 dark:text-white">Recent Orders</CardTitle>
        <button
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left pb-3 text-gray-500 dark:text-gray-400 font-medium">
                  Order
                </th>
                <th className="text-left pb-3 text-gray-500 dark:text-gray-400 font-medium">
                  Customer
                </th>
                <th className="text-left pb-3 text-gray-500 dark:text-gray-400 font-medium">
                  Amount
                </th>
                <th className="text-left pb-3 text-gray-500 dark:text-gray-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 text-gray-900 dark:text-white font-medium">{order.id}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                  <td className="py-3 text-gray-900 dark:text-white">{order.amount}</td>
                  <td className="py-3">
                    <Badge variant={statusVariant[order.status]} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
});
