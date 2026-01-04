import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Users, UserPlus, UserCheck, TrendingUp } from 'lucide-react';

const metrics = [
    { label: 'Total Customers', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'New This Month', value: '156', icon: UserPlus, color: 'text-green-600' },
    { label: 'Active Users', value: '892', icon: UserCheck, color: 'text-purple-600' },
    { label: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: 'text-orange-600' },
];

export const CustomerAnalytics = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {metrics.map((metric) => {
                        const Icon = metric.icon;
                        return (
                            <div key={metric.label} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${metric.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {metric.label}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {metric.value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
