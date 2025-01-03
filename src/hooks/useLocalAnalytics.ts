import { useCallback, useMemo } from 'react';
import { analytics } from '../services/localAnalytics';
import type { EventName } from '../types/analytics';

export function useLocalAnalytics() {
  const trackEvent = useCallback((eventName: EventName, data?: Record<string, any>) => {
    analytics.track(eventName, data);
  }, []);

  const stats = useMemo(() => ({
    totalQueries: analytics.getEventCount('query_started'),
    successfulQueries: analytics.getEventCount('query_completed'),
    failedQueries: analytics.getEventCount('query_failed'),
    cacheHits: analytics.getEventCount('cache_hit'),
    recentEvents: analytics.getRecentEvents(60)
  }), []);

  return { trackEvent, stats };
}