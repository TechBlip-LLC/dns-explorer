import { isValidDomain } from './domainValidation';
import { isValidIP } from './ipValidation';

export function validateDNSInput(input: string, type: 'domain' | 'ip' = 'domain'): string {
  if (!input.trim()) {
    return 'Input is required';
  }

  if (type === 'ip') {
    return isValidIP(input) ? '' : 'Invalid IP address format';
  }

  return isValidDomain(input) ? '' : 'Invalid domain name format';
}