import React, { createContext, useContext } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const AnalyticsContext = createContext<ReturnType<typeof useAnalytics> | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const analytics = useAnalytics();
  
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}