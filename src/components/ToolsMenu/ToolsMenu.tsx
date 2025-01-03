import React from 'react';
import { Settings } from 'lucide-react';
import { ToolsMenuContent } from './ToolsMenuContent';
import { useToolsMenu } from './useToolsMenu';

export function ToolsMenu() {
  const { isOpen, setIsOpen } = useToolsMenu();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings className="w-5 h-5" />
        <span>Tools</span>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <ToolsMenuContent onClose={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
}