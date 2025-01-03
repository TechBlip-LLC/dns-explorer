import React, { useState } from 'react';
import { ArrowLeftRight, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ReverseDNSFormProps {
  onSubmit: (ip: string) => Promise<void>;
  isLoading?: boolean;
}

export function ReverseDNSForm({ onSubmit, isLoading }: ReverseDNSFormProps) {
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');

  const validateIP = (ip: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) {
      return 'Please enter a valid IPv4 address';
    }
    const parts = ip.split('.').map(Number);
    for (const part of parts) {
      if (part < 0 || part > 255) {
        return 'Each octet must be between 0 and 255';
      }
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateIP(ip);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    await onSubmit(ip);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="IP Address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="8.8.8.8"
        error={error}
        disabled={isLoading}
      />

      <Button 
        type="submit" 
        icon={isLoading ? Loader2 : ArrowLeftRight}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? 'Looking up...' : 'Reverse Lookup'}
      </Button>
    </form>
  );
}