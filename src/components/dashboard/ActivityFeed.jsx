import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';

const activities = [
    {
        id: 1,
        type: 'order',
        message: 'New order #3210 received',
        time: '2 minutes ago',
        icon: ShoppingCart,
        color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    },
    {
        id: 2,
        type: 'payment',
        message: 'Payment of $299.00 received',
        time: '15 minutes ago',
        icon: DollarSign,
        color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    },
    {
        id: 3,
        type: 'product',
        message: 'Product "Wireless Headphones" updated',
        time: '1 hour ago',
        icon: Package,
        color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    },
    {
        id: 4,
        type: 'analytics',
        message: 'Sales increased by 12.5%',
        time: '2 hours ago',
        icon: TrendingUp,
        color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    },
];

export const ActivityFeed = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${activity.color}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
