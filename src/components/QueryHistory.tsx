import React from 'react';
import { X, Clock } from 'lucide-react';

interface QueryHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: { domain: string; type: string; timestamp: Date }[];
  onSelectQuery: (domain: string, type: string) => void;
}

export function QueryHistory({ isOpen, onClose, history, onSelectQuery }: QueryHistoryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Query History</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-center text-gray-500">No queries yet</p>
          ) : (
            <ul className="space-y-2">
              {history.map((query, index) => (
                <li key={index}>
                  <button
                    onClick={() => onSelectQuery(query.domain, query.type)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{query.domain}</span>
                      <span className="text-sm text-gray-500">{query.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {query.timestamp.toLocaleTimeString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}