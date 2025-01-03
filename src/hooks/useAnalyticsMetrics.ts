import { useMemo } from 'react';
import { AnalyticsEvent } from '../types/analytics';

export function useAnalyticsMetrics(events: AnalyticsEvent[]) {
  return useMemo(() => ({
    getSuccessRate: () => {
      const total = events.filter(e => e.name === 'query_started').length;
      const successful = events.filter(e => e.name === 'query_completed').length;
      return total > 0 ? (successful / total) * 100 : 0;
    },
    
    getAverageResponseTime: () => {
      const completedQueries = events.filter(e => e.name === 'query_completed');
      const durations = completedQueries.map(e => e.data?.duration || 0);
      return durations.length > 0 
        ? durations.reduce((a, b) => a + b, 0) / durations.length 
        : 0;
    },
    
    getQueryTypeDistribution: () => {
      return events
        .filter(e => e.name === 'query_completed')
        .reduce((acc, event) => {
          const type = event.data?.recordType || 'unknown';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
    }
  }), [events]);
}