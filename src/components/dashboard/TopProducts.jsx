import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';

const products = [
    { name: 'Wireless Headphones', sales: 1234, revenue: '$45,231', progress: 85 },
    { name: 'Smart Watch', sales: 987, revenue: '$38,456', progress: 72 },
    { name: 'Laptop Stand', sales: 756, revenue: '$29,876', progress: 65 },
    { name: 'USB-C Hub', sales: 543, revenue: '$21,345', progress: 48 },
    { name: 'Mechanical Keyboard', sales: 432, revenue: '$18,234', progress: 38 },
];

export const TopProducts = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {product.sales} sales • {product.revenue}
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    {product.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${product.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
