import React, { useState } from 'react';
import { BatchQueryForm } from '../components/batch/BatchQueryForm';
import { BatchResults } from '../components/batch/BatchResults';
import { queryDNS } from '../services/dns';
import { type DNSRecord } from '../types';
import { Card } from '../components/ui/Card';

export function BatchLookup() {
  const [results, setResults] = useState<Record<string, DNSRecord[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBatchQuery = async (domains: string[], recordType: string) => {
    setIsLoading(true);
    setError(null);
    const batchResults: Record<string, DNSRecord[]> = {};
    
    try {
      await Promise.all(
        domains.map(async (domain) => {
          try {
            const records = await queryDNS(domain, recordType);
            batchResults[domain] = records;
          } catch (error) {
            batchResults[domain] = [];
            console.error(`Error querying ${domain}:`, error);
          }
        })
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process batch query');
    } finally {
      setIsLoading(false);
      setResults(batchResults);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Batch DNS Lookup</h1>
        <p className="text-gray-500 mt-1">Query multiple domains at once</p>
      </div>

      <div className="space-y-6">
        <Card>
          <BatchQueryForm onSubmit={handleBatchQuery} isLoading={isLoading} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </Card>
        {Object.keys(results).length > 0 && <BatchResults results={results} />}
      </div>
    </div>
  );
}