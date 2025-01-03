export const RECORD_TYPES = [
  'A',
  'AAAA',
  'CNAME',
  'MX',
  'TXT',
  'NS',
  'SOA',
  'PTR'
] as const;

export type RecordType = typeof RECORD_TYPES[number];