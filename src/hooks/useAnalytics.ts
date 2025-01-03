import { useCallback } from 'react';
import { useAnalyticsEvents } from './useAnalyticsEvents';
import { useAnalyticsSession } from './useAnalyticsSession';
import { useAnalyticsMetrics } from './useAnalyticsMetrics';

export function useAnalytics() {
  const { events, trackEvent, clearEvents } = useAnalyticsEvents();
  const { clearSession } = useAnalyticsSession();
  const metrics = useAnalyticsMetrics(events);

  const getEventCount = useCallback((eventName: string) => {
    return events.filter(e => e.name === eventName).length;
  }, [events]);

  const getRecentEvents = useCallback((minutes: number = 60) => {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return events.filter(e => new Date(e.timestamp) > cutoff);
  }, [events]);

  const reset = useCallback(() => {
    clearEvents();
    clearSession();
  }, [clearEvents, clearSession]);

  return {
    events,
    trackEvent,
    getEventCount,
    getRecentEvents,
    reset,
    metrics,
    stats: {
      totalQueries: getEventCount('query_started'),
      successfulQueries: getEventCount('query_completed'),
      failedQueries: getEventCount('query_failed'),
      cacheHits: getEventCount('cache_hit'),
      recentEvents: getRecentEvents(60)
    }
  };
}