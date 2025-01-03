import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="text-white hover:bg-white/10"
      icon={theme === 'dark' ? Sun : Moon}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    />
  );
}