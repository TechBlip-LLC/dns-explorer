import React, { createContext, useContext } from 'react';
import { useCache } from '../hooks/useCache';
import { DNSRecord } from '../types';

const CacheContext = createContext<ReturnType<typeof useCache<DNSRecord[]>> | undefined>(undefined);

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const cache = useCache<DNSRecord[]>();
  
  return (
    <CacheContext.Provider value={cache}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCacheContext() {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCacheContext must be used within a CacheProvider');
  }
  return context;
}