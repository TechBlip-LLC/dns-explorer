import React from 'react';
import { Card } from '../ui/Card';
import type { AnalyticsEvent } from '../../types/analytics';

interface QueryMetricsProps {
  events: AnalyticsEvent[];
}

export function QueryMetrics({ events }: QueryMetricsProps) {
  const metrics = React.useMemo(() => {
    const recordTypes = new Set(events.map(e => e.data?.recordType).filter(Boolean));
    return Array.from(recordTypes).map(type => {
      const typeEvents = events.filter(e => e.data?.recordType === type);
      const completed = typeEvents.filter(e => e.name === 'query_completed');
      const failed = typeEvents.filter(e => e.name === 'query_failed');
      const total = completed.length + failed.length;
      
      const durations = completed.map(e => e.data?.duration || 0);
      const avgDuration = durations.length 
        ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0)
        : 0;
      
      return {
        type,
        total,
        successful: completed.length,
        failed: failed.length,
        successRate: total > 0 ? ((completed.length / total) * 100).toFixed(1) : '0',
        avgResponseTime: `${avgDuration}ms`
      };
    });
  }, [events]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Metrics</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Response</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map((metric) => (
              <tr key={metric.type} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {metric.total}
                  <span className="text-xs ml-1 text-gray-400">
                    ({metric.failed} failed)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.successRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{metric.avgResponseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}