import { useEffect, useCallback } from 'react';

const SESSION_KEY = 'dns_explorer_session';
const STORAGE_KEY = 'dns_explorer_analytics';

export function useAnalyticsSession() {
  useEffect(() => {
    const currentSession = sessionStorage.getItem(SESSION_KEY);
    if (!currentSession) {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem(SESSION_KEY, Date.now().toString());
    }
  }, []);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { clearSession };
}