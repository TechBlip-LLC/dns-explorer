import React from 'react';
import { Card } from '../ui/Card';
import type { AnalyticsEvent } from '../../types/analytics';

interface ResponseTimeChartProps {
  events: AnalyticsEvent[];
}

export function ResponseTimeChart({ events }: ResponseTimeChartProps) {
  const queryData = React.useMemo(() => {
    return events
      .filter(e => e.name === 'query_completed')
      .map(e => ({
        timestamp: new Date(e.timestamp),
        type: e.data?.recordType,
        duration: e.data?.duration || 0,
        domain: e.data?.domain
      }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }, [events]);

  const maxDuration = Math.max(...queryData.map(d => d.duration));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Timeline</h3>
      <div className="h-[300px] overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {queryData.map((point, i) => (
            <div 
              key={i}
              className="flex items-center space-x-2 text-sm"
            >
              <span className="text-gray-500 w-20">
                {point.timestamp.toLocaleTimeString()}
              </span>
              <div 
                className="h-2 bg-indigo-500 rounded-full transition-all"
                style={{ 
                  width: `${(point.duration / maxDuration) * 100}%`,
                  minWidth: '20px'
                }}
              />
              <span className="text-gray-700 flex-1">
                {point.domain} ({point.type})
              </span>
              <span className="text-gray-500">
                {point.duration.toFixed(0)}ms
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}