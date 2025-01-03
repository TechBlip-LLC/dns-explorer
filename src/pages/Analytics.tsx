import React from 'react';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';

export function Analytics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">DNS Analytics</h1>
        <p className="text-gray-500 mt-1">Monitor your DNS performance and usage metrics</p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}