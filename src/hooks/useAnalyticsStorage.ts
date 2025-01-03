import { useCallback } from 'react';
import { AnalyticsEvent } from '../types/analytics';

const STORAGE_KEY = 'dns_explorer_analytics';

export function useAnalyticsStorage() {
  const saveEvents = useCallback((events: AnalyticsEvent[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }, []);

  const loadEvents = useCallback((): AnalyticsEvent[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load analytics:', error);
      return [];
    }
  }, []);

  return { saveEvents, loadEvents };
}