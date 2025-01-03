import { useState, useCallback, useEffect } from 'react';
import { AnalyticsEvent } from '../types/analytics';
import { useAnalyticsStorage } from './useAnalyticsStorage';

const MAX_EVENTS = 1000;

export function useAnalyticsEvents() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const { saveEvents, loadEvents } = useAnalyticsStorage();

  // Load events on mount
  useEffect(() => {
    setEvents(loadEvents());
  }, [loadEvents]);

  // Save events when they change
  useEffect(() => {
    saveEvents(events);
  }, [events, saveEvents]);

  const trackEvent = useCallback((eventName: string, data?: Record<string, any>) => {
    const event: AnalyticsEvent = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: {
        ...data,
        environment: import.meta.env.DEV ? 'development' : 'production'
      }
    };

    setEvents(prevEvents => {
      const newEvents = [event, ...prevEvents];
      return newEvents.slice(0, MAX_EVENTS);
    });
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    events,
    trackEvent,
    clearEvents
  };
}