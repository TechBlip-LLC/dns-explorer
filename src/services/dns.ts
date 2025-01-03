import { DNSRecord } from '../types';
import { handleDNSError } from '../utils/errorHandling';
import { validateDNSInput } from '../utils/validation';
import { useCacheContext } from '../contexts/CacheContext';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

const DNS_ENDPOINT = 'https://cloudflare-dns.com/dns-query';
const RATE_LIMIT = 100;
let queryCount = 0;
let lastResetTime = Date.now();

export async function queryDNS(
  domain: string, 
  recordType: string,
  cache: ReturnType<typeof useCacheContext>,
  trackEvent: ReturnType<typeof useAnalyticsContext>['trackEvent']
): Promise<DNSRecord[]> {
  const validationError = validateDNSInput(domain);
  if (validationError) {
    throw new Error(validationError);
  }

  // Check cache first
  const cacheKey = `${domain}:${recordType}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) {
    trackEvent('cache_hit', { domain, recordType });
    return cachedResult;
  }

  const startTime = performance.now();
  trackEvent('query_started', { domain, recordType });

  // Reset counter if a minute has passed
  if (Date.now() - lastResetTime > 60000) {
    queryCount = 0;
    lastResetTime = Date.now();
  }

  // Check rate limit
  if (queryCount >= RATE_LIMIT) {
    trackEvent('query_failed', { 
      domain, 
      recordType, 
      error: 'rate_limit',
      duration: performance.now() - startTime 
    });
    throw new Error('Rate limit exceeded. Please wait a minute before trying again.');
  }

  try {
    const response = await fetch(`${DNS_ENDPOINT}?name=${domain}&type=${recordType}`, {
      headers: { 'Accept': 'application/dns-json' }
    });

    queryCount++;
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

    // Cache the results
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
}