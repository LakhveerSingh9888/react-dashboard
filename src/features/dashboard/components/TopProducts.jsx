import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';

const products = [
    { name: 'Laptop Pro X1', sales: 1204, revenue: '$1,563,996', growth: '+12%' },
    { name: 'Wireless Headphones', sales: 893, revenue: '$223,250', growth: '+8%' },
    { name: '4K Monitor', sales: 654, revenue: '$391,746', growth: '+15%' },
    { name: 'Mechanical Keyboard', sales: 521, revenue: '$67,229', growth: '+5%' },
    { name: 'USB-C Hub', sales: 478, revenue: '$47,322', growth: '+22%' },
];

export const TopProducts = () => {
    return (
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {products.map((product, index) => (
                        <div key={product.name} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-bold text-gray-400 w-5">{index + 1}</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.sales} units sold</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.revenue}</p>
                                <p className="text-xs text-green-500">{product.growth}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
