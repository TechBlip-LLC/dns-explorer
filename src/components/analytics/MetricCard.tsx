import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  trendUp: boolean;
}

export function MetricCard({ title, value, trend, icon: Icon, trendUp }: MetricCardProps) {
  return (
    <Card className="p-6 border-l-4 border-indigo-400">
      <div className="flex items-center justify-between">
        <div className="p-2.5 rounded-xl bg-indigo-50">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trendUp 
            ? 'text-green-600 bg-green-50/50 ring-1 ring-green-100' 
            : 'text-rose-600 bg-rose-50/50 ring-1 ring-rose-100'
        }`}>
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </Card>
  );
}