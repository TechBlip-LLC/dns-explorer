import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toolsConfig } from './toolsConfig';

interface ToolsMenuContentProps {
  onClose: () => void;
}

export function ToolsMenuContent({ onClose }: ToolsMenuContentProps) {
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-[slideUp_0.2s_ease-out]">
      {Object.entries(toolsConfig).map(([category, tools]) => (
        <div key={category} className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
            {category}
          </h3>
          <div className="grid gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                onClick={onClose}
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
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}