import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { type DNSRecord } from '../../types';

interface BatchResultsProps {
  results: Record<string, DNSRecord[]>;
}

export function BatchResults({ results }: BatchResultsProps) {
  return (
    <Card>
      <div className="space-y-4">
        {Object.entries(results).map(([domain, records]) => (
          <div key={domain} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 className="font-medium text-gray-900">{domain}</h3>
            </div>
            {records.length === 0 ? (
              <div className="p-4 text-gray-500">No records found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">TTL</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Badge>{record.type}</Badge>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <code className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
                            {record.value}
                          </code>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {record.ttl}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}