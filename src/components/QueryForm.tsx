import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { RECORD_TYPES } from '../constants';
import { animations } from './ui/animations';

interface QueryFormProps {
  onSubmit: (domain: string, recordType: string) => void;
  isLoading?: boolean;
}

export function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    onSubmit(domain.trim(), recordType);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${animations.slideUp}`}>
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <Input
            label="Domain Name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            error={error}
            disabled={isLoading}
          />
        </div>
        
        <div className="w-full">
          <Select
            label="Record Type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            options={RECORD_TYPES.map(type => ({ value: type, label: type }))}
            disabled={isLoading}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        icon={isLoading ? Loader2 : Search}
        fullWidth
        disabled={isLoading}
        aria-busy={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Querying...' : 'Query DNS'}
      </Button>
    </form>
  );
}