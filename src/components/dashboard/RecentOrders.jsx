import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { MoreVertical } from 'lucide-react';

const orders = [
    {
        id: '#3210',
        customer: 'John Doe',
        product: 'Wireless Headphones',
        amount: '$299.00',
        status: 'completed',
        date: '2025-11-25',
    },
    {
        id: '#3209',
        customer: 'Jane Smith',
        product: 'Smart Watch',
        amount: '$399.00',
        status: 'processing',
        date: '2025-11-25',
    },
    {
        id: '#3208',
        customer: 'Bob Johnson',
        product: 'Laptop Stand',
        amount: '$79.00',
        status: 'completed',
        date: '2025-11-24',
    },
    {
        id: '#3207',
        customer: 'Alice Williams',
        product: 'USB-C Hub',
        amount: '$49.00',
        status: 'pending',
        date: '2025-11-24',
    },
    {
        id: '#3206',
        customer: 'Charlie Brown',
        product: 'Mechanical Keyboard',
        amount: '$159.00',
        status: 'completed',
        date: '2025-11-23',
    },
];

const statusColors = {
    completed: 'success',
    processing: 'info',
    pending: 'warning',
    cancelled: 'destructive',
};

export const RecentOrders = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Order
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Customer
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Product
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Amount
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Status
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Date
                                </th>
                                <th className="w-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                >
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {order.id}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                        {order.customer}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                        {order.product}
                                    </td>
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                        {order.amount}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge variant={statusColors[order.status]} className="capitalize">
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                        {order.date}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};
