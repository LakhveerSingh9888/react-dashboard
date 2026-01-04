import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { DollarSign, TrendingDown, Wallet } from 'lucide-react';

const widgets = [
    {
        title: 'Net Profit',
        value: '$12,345',
        change: '+8.2%',
        trend: 'up',
        icon: DollarSign,
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600',
    },
    {
        title: 'Total Expenses',
        value: '$8,234',
        change: '+3.1%',
        trend: 'up',
        icon: TrendingDown,
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        iconColor: 'text-red-600',
    },
    {
        title: 'Account Balance',
        value: '$45,678',
        change: '+12.5%',
        trend: 'up',
        icon: Wallet,
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600',
    },
];

export const FinancialWidgets = () => {
    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {widgets.map((widget) => {
                const Icon = widget.icon;
                return (
                    <Card key={widget.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {widget.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${widget.bgColor}`}>
                                <Icon className={`h-4 w-4 ${widget.iconColor}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {widget.value}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span className="text-green-600 font-medium">{widget.change}</span> from last
                                month
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
