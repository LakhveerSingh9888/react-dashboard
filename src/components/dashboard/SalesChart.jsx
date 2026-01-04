import React, { memo, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@components/ui/Card';

/* ------------------ constants ------------------ */

const SALES_DATA = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Feb', sales: 3000, revenue: 1398 },
  { month: 'Mar', sales: 2000, revenue: 9800 },
  { month: 'Apr', sales: 2780, revenue: 3908 },
  { month: 'May', sales: 1890, revenue: 4800 },
  { month: 'Jun', sales: 2390, revenue: 3800 },
  { month: 'Jul', sales: 3490, revenue: 4300 },
];

/* ------------------ Sales Chart ------------------ */

export const SalesChart = memo(function SalesChart() {
  const data = useMemo(() => SALES_DATA, []);

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: {
        color: '#374151',
      },
      formatter: (params) => {
        const param = params[0];
        return `${param.name}<br/>${param.seriesName}: $${param.value.toLocaleString()}`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#6b7280',
        },
      },
      axisLabel: {
        color: '#6b7280',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#6b7280',
        },
      },
      axisLabel: {
        color: '#6b7280',
        formatter: (value) => `$${value.toLocaleString()}`,
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        smooth: true,
        data: data.map(item => item.sales),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2,
        },
        itemStyle: {
          color: '#3b82f6',
        },
        symbol: 'circle',
        symbolSize: 6,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
        },
      },
    ],
  }), [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>

      <CardContent>
        <ReactECharts
          option={option}
          style={{ height: '300px', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </CardContent>
    </Card>
  );
});

/* ------------------ Revenue Chart ------------------ */

export const RevenueChart = memo(function RevenueChart() {
  const data = useMemo(() => SALES_DATA, []);

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: {
        color: '#374151',
      },
      formatter: (params) => {
        const param = params[0];
        return `${param.name}<br/>${param.seriesName}: $${param.value.toLocaleString()}`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#6b7280',
        },
      },
      axisLabel: {
        color: '#6b7280',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#6b7280',
        },
      },
      axisLabel: {
        color: '#6b7280',
        formatter: (value) => `$${value.toLocaleString()}`,
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        data: data.map(item => item.revenue),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(139, 92, 246, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(139, 92, 246, 0)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#8b5cf6',
          width: 2,
        },
        itemStyle: {
          color: '#8b5cf6',
        },
        symbol: 'circle',
        symbolSize: 6,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
        },
      },
    ],
  }), [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly revenue breakdown</CardDescription>
      </CardHeader>

      <CardContent>
        <ReactECharts
          option={option}
          style={{ height: '300px', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </CardContent>
    </Card>
  );
});
