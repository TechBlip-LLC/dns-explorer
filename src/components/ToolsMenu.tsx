import React from 'react';
import { 
  Settings, 
  Search, 
  History, 
  BarChart2, 
  Shield, 
  Zap,
  Globe,
  FileJson,
  ChevronRight
} from 'lucide-react';

const tools = [
  {
    icon: Search,
    label: 'Batch Lookup',
    description: 'Query multiple domains at once',
    href: '#batch',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Globe,
    label: 'Reverse DNS',
    description: 'Find domains associated with an IP',
    href: '#reverse',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Shield,
    label: 'DNS Security Check',
    description: 'Verify DNSSEC, CAA records',
    href: '#security',
    color: 'bg-green-50 text-green-600'
  },
  {
    icon: BarChart2,
    label: 'Propagation Checker',
    description: 'Check DNS propagation globally',
    href: '#propagation',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Zap,
    label: 'Response Time',
    description: 'Test DNS resolution speed',
    href: '#speed',
    color: 'bg-yellow-50 text-yellow-600'
  },
  {
    icon: FileJson,
    label: 'Record Generator',
    description: 'Generate DNS record configurations',
    href: '#generator',
    color: 'bg-rose-50 text-rose-600'
  }
];

export function ToolsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
      >
        <Settings className="w-5 h-5" />
        <span>Tools</span>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-[slideUp_0.2s_ease-out]">
            <div className="grid gap-1 p-1">
              {tools.map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all group"
                >
                  <div className={`p-2.5 rounded-lg ${tool.color} transition-all group-hover:scale-110`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 flex items-center justify-between">
                      {tool.label}
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                    <div className="text-sm text-gray-500">{tool.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}