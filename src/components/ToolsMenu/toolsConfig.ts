import { 
  Search, 
  Shield, 
  BarChart2
} from 'lucide-react';
import { ToolsConfig } from './types';

export const toolsConfig: ToolsConfig = {
  "Essential Tools": [
    {
      icon: Search,
      label: 'Batch Lookup',
      description: 'Query multiple domains at once',
      href: '/batch',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Shield,
      label: 'DNS Security',
      description: 'Basic DNSSEC verification',
      href: '/security',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: BarChart2,
      label: 'DNS Propagation',
      description: 'Check basic propagation status',
      href: '/propagation',
      color: 'bg-orange-50 text-orange-600'
    }
  ]
};