import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', positive: true, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { title: 'Active Orders', value: '+2,350', change: '+180.1%', positive: true, icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'New Customers', value: '+12,234', change: '+19%', positive: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { title: 'Active Now', value: '+573', change: '+201', positive: true, icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
];

export const OverviewStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <p className={`text-xs mt-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.positive ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
                            {stat.change} from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
