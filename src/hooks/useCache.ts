import { useState, useCallback, useEffect } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function useCache<T>() {
  const [cache, setCache] = useState<Map<string, CacheEntry<T>>>(new Map());

  // Clean up expired entries periodically
  useEffect(() => {
    const cleanup = () => {
      const now = Date.now();
      setCache(prevCache => {
        const newCache = new Map(prevCache);
        for (const [key, entry] of newCache.entries()) {
          if (now - entry.timestamp > CACHE_DURATION) {
            newCache.delete(key);
          }
        }
        return newCache;
      });
    };

    const interval = setInterval(cleanup, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const set = useCallback((key: string, data: T): void => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(key, {
        data,
        timestamp: Date.now()
      });
      return newCache;
    });
  }, []);

  const get = useCallback((key: string): T | null => {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      setCache(prevCache => {
        const newCache = new Map(prevCache);
        newCache.delete(key);
        return newCache;
      });
      return null;
    }

    return entry.data;
  }, [cache]);

  const clear = useCallback(() => {
    setCache(new Map());
  }, []);

  return { set, get, clear };
}