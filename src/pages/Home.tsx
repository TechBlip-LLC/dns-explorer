import React, { useState } from 'react';
import { QueryForm } from '../components/QueryForm';
import { BatchQueryForm } from '../components/batch/BatchQueryForm';
import { QueryResults } from '../components/QueryResults';
import { BatchResults } from '../components/batch/BatchResults';
import { QueryHistory } from '../components/QueryHistory';
import { QueryModeSelector, type QueryMode } from '../components/QueryModeSelector';
import { Card } from '../components/ui/Card';
import { History } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { type DNSRecord } from '../types';
import { useDNSQuery } from '../hooks/useDNSQuery';
import { useAnalyticsContext } from '../contexts/AnalyticsContext';

export function Home() {
  const [queryMode, setQueryMode] = useState<QueryMode>('single');
  const [singleResults, setSingleResults] = useState<DNSRecord[]>([]);
  const [batchResults, setBatchResults] = useState<Record<string, DNSRecord[]>>({});
  const [history, setHistory] = useState<{ domain: string; type: string; timestamp: Date }[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useAnalyticsContext();
  const { queryDNS } = useDNSQuery();

  const handleSingleQuery = async (domain: string, recordType: string) => {
    setIsLoading(true);
    setError(null);
    setBatchResults({});
    
    try {
      const dnsResults = await queryDNS(domain, recordType);
      setSingleResults(dnsResults);
      setHistory(prev => [...prev, { domain, type: recordType, timestamp: new Date() }]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch DNS records');
      console.error('Query failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchQuery = async (domains: string[], recordType: string) => {
    setIsLoading(true);
    setError(null);
    setSingleResults([]);
    const results: Record<string, DNSRecord[]> = {};
    
    trackEvent('batch_query_started', { domains, recordType });
    
    try {
      await Promise.all(
        domains.map(async (domain) => {
          try {
            const records = await queryDNS(domain, recordType);
            results[domain] = records;
            setHistory(prev => [...prev, { domain, type: recordType, timestamp: new Date() }]);
          } catch (error) {
            results[domain] = [];
            console.error(`Error querying ${domain}:`, error);
          }
        })
      );
      setBatchResults(results);
      trackEvent('batch_query_completed', { 
        domainCount: domains.length,
        successCount: Object.values(results).filter(r => r.length > 0).length
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process batch query');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHistory = () => {
    const newState = !isHistoryOpen;
    setIsHistoryOpen(newState);
    if (newState) {
      trackEvent('history_opened');
    }
  };

  const handleHistorySelect = (domain: string, type: string) => {
    trackEvent('history_query_selected', { domain, type });
    setQueryMode('single');
    handleSingleQuery(domain, type);
    setIsHistoryOpen(false);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Card>
        <div className="flex justify-end mb-6">
          <QueryModeSelector mode={queryMode} onChange={setQueryMode} />
        </div>

        {queryMode === 'batch' ? (
          <BatchQueryForm onSubmit={handleBatchQuery} isLoading={isLoading} />
        ) : (
          <QueryForm onSubmit={handleSingleQuery} isLoading={isLoading} />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
            {error}
          </div>
        )}
      </Card>

      {singleResults.length > 0 && <QueryResults results={singleResults} />}
      {Object.keys(batchResults).length > 0 && <BatchResults results={batchResults} />}

      <Button
        variant="primary"
        icon={History}
        onClick={toggleHistory}
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      />

      <QueryHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectQuery={handleHistorySelect}
      />
    </main>
  );
}