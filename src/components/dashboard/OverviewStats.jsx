import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

const stats = [
    {
        title: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up',
        icon: DollarSign,
        description: 'from last month',
    },
    {
        title: 'Orders',
        value: '2,350',
        change: '+15.3%',
        trend: 'up',
        icon: ShoppingCart,
        description: 'from last month',
    },
    {
        title: 'Customers',
        value: '1,234',
        change: '+12.5%',
        trend: 'up',
        icon: Users,
        description: 'from last month',
    },
    {
        title: 'Active Now',
        value: '573',
        change: '-5.2%',
        trend: 'down',
        icon: Activity,
        description: 'from last hour',
    },
];

export const OverviewStats = () => {
    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

                return (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {stat.title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="flex items-center text-xs mt-1">
                                <TrendIcon
                                    className={`h-3 w-3 mr-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}
                                />
                                <span
                                    className={`font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {stat.change}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 ml-1">{stat.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
