import React from 'react';
import { X, BarChart2 } from 'lucide-react';
import { Button } from './ui/Button';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsDrawer({ isOpen, onClose }: AnalyticsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full md:w-[600px] lg:w-[800px] bg-white shadow-xl animate-[slideInRight_0.3s_ease-out] dark:bg-gray-900">
        <div className="flex items-center justify-between border-b p-3 md:p-4 bg-gradient-to-r from-indigo-500/90 to-indigo-600/90">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/5 rounded-lg">
              <BarChart2 className="h-5 w-5 text-white/90" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-white/90">Analytics Dashboard</h2>
          </div>
          <Button 
            variant="ghost" 
            icon={X} 
            onClick={onClose}
            className="text-white/70 hover:text-white/90 hover:bg-white/5 p-2" 
            aria-label="Close"
          />
        </div>
        <div className="h-[calc(100vh-3.5rem)] overflow-y-auto p-4 md:p-6">
          <AnalyticsDashboard />
        </div>
      </div>
    </div>
  );
}