import { useState, useCallback } from 'react';
import { DNSRecord } from '../types';
import { handleDNSError } from '../utils/errorHandling';
import { validateDNSInput } from '../utils/validation';
import { useCache } from './useCache';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

const DNS_ENDPOINT = 'https://cloudflare-dns.com/dns-query';
const RATE_LIMIT = 100;
const RATE_WINDOW = 60000; // 1 minute in milliseconds

export function useDNSQuery() {
  const [queryCount, setQueryCount] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(Date.now());
  const cache = useCache<DNSRecord[]>();
  const { trackEvent } = useAnalyticsContext();

  const resetRateLimit = useCallback(() => {
    if (Date.now() - lastResetTime > RATE_WINDOW) {
      setQueryCount(0);
      setLastResetTime(Date.now());
    }
  }, [lastResetTime]);

  const queryDNS = useCallback(async (domain: string, recordType: string): Promise<DNSRecord[]> => {
    const validationError = validateDNSInput(domain);
    if (validationError) {
      throw new Error(validationError);
    }

    resetRateLimit();

    // Check rate limit
    if (queryCount >= RATE_LIMIT) {
      throw new Error('Rate limit exceeded. Please wait a minute before trying again.');
    }

    // Check cache
    const cacheKey = `${domain}:${recordType}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      trackEvent('cache_hit', { domain, recordType });
      return cachedResult;
    }

    const startTime = performance.now();
    trackEvent('query_started', { domain, recordType });

    try {
      const response = await fetch(`${DNS_ENDPOINT}?name=${domain}&type=${recordType}`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      setQueryCount(prev => prev + 1);
      const duration = performance.now() - startTime;

      if (!response.ok) {
        trackEvent('query_failed', { 
          domain, 
          recordType, 
          error: response.status,
          duration 
        });
        throw new Error(`DNS query failed: ${response.status}`);
      }

      const data = await response.json();
      const results = data.Answer?.map((answer: any) => ({
        type: recordType,
        value: answer.data,
        ttl: answer.TTL
      })) || [];

      cache.set(cacheKey, results);
      
      trackEvent('query_completed', { 
        domain, 
        recordType,
        resultCount: results.length,
        duration
      });

      return results;
    } catch (error) {
      const duration = performance.now() - startTime;
      trackEvent('query_failed', { 
        domain, 
        recordType,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration
      });
      throw handleDNSError(error);
    }
  }, [queryCount, lastResetTime, cache, trackEvent, resetRateLimit]);

  return { queryDNS };
}