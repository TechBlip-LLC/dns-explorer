import { handleDNSError } from '../utils/errorHandling';
import { DNSRecord } from '../types';

export async function queryReverseDNS(ip: string): Promise<DNSRecord[]> {
  try {
    const arpa = ip.split('.')
      .reverse()
      .join('.') + '.in-addr.arpa';
      
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${arpa}&type=PTR`, {
      headers: {
        'Accept': 'application/dns-json',
        'Content-Type': 'application/dns-json',
        // Required for Cloudflare's DNS-over-HTTPS
        'User-Agent': 'dns-explorer/1.0'
      },
      // Ensure proper CORS handling
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`Reverse DNS query failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.Answer || data.Answer.length === 0) {
      return [{
        type: 'PTR',
        value: 'No PTR record found',
        ttl: 0
      }];
    }
    
    return data.Answer.map((answer: any) => ({
      type: 'PTR',
      value: answer.data.replace(/\.$/, ''), // Remove trailing dot
      ttl: answer.TTL
    }));
  } catch (error) {
    throw handleDNSError(error);
  }
}