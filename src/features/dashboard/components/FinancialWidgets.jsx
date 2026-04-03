import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/Card';
import { DollarSign, TrendingDown, Wallet } from 'lucide-react';

export const FinancialWidgets = memo(function FinancialWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$84,254</p>
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$23,841</p>
              <p className="text-xs text-red-500">+3.2% from last month</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$60,413</p>
              <p className="text-xs text-green-500">+18.7% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
