import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { RECORD_TYPES } from '../../constants';

interface BatchQueryFormProps {
  onSubmit: (domains: string[], recordType: string) => Promise<void>;
  isLoading?: boolean;
}

export function BatchQueryForm({ onSubmit, isLoading }: BatchQueryFormProps) {
  const [domains, setDomains] = useState<string[]>(['']);
  const [recordType, setRecordType] = useState('A');
  const [error, setError] = useState('');

  const addDomain = () => setDomains([...domains, '']);
  
  const removeDomain = (index: number) => {
    const newDomains = domains.filter((_, i) => i !== index);
    setDomains(newDomains.length ? newDomains : ['']);
  };

  const updateDomain = (index: number, value: string) => {
    const newDomains = [...domains];
    newDomains[index] = value;
    setDomains(newDomains);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validDomains = domains.filter(d => d.trim());
    if (!validDomains.length) {
      setError('Please enter at least one domain');
      return;
    }

    try {
      await onSubmit(validDomains, recordType);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to query domains');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 mb-4">
        <div className="w-32">
          <Select
            label="Record Type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            options={RECORD_TYPES.map(type => ({ value: type, label: type }))}
            disabled={isLoading}
          />
        </div>
        <div className="flex-1">
          <Button
            type="button"
            variant="secondary"
            onClick={addDomain}
            disabled={isLoading}
          >
            Add Domain
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {domains.map((domain, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <Input
                label={index === 0 ? 'Domains' : ''}
                value={domain}
                onChange={(e) => updateDomain(index, e.target.value)}
                placeholder="example.com"
                disabled={isLoading}
              />
            </div>
            {domains.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeDomain(index)}
                className="mt-auto mb-1"
                disabled={isLoading}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Button
        type="submit"
        icon={isLoading ? Loader2 : Search}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Querying...' : 'Query All Domains'}
      </Button>
    </form>
  );
}