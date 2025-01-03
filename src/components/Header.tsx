import React from 'react';
import { Database, BarChart2, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenAnalytics: () => void;
}

export function Header({ onOpenAnalytics }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-500/90 to-indigo-600/90 dark:from-indigo-600/90 dark:to-indigo-700/90 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Database className="w-6 h-6 md:w-8 md:h-8 text-white" />
            <h1 className="text-xl md:text-2xl font-bold text-white">DNS Explorer</h1>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              icon={BarChart2}
              onClick={onOpenAnalytics}
              className="text-white hover:bg-white/10 transition-colors p-2 md:p-3"
              aria-label="Open Analytics"
            >
              <span className="hidden md:inline">Analytics</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}