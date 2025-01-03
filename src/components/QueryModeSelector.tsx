import React from 'react';
import { Search, Layers } from 'lucide-react';
import { Button } from './ui/Button';

export type QueryMode = 'single' | 'batch';

interface QueryModeSelectorProps {
  mode: QueryMode;
  onChange: (mode: QueryMode) => void;
}

export function QueryModeSelector({ mode, onChange }: QueryModeSelectorProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 p-1">
      <Button
        variant="ghost"
        icon={Search}
        onClick={() => onChange('single')}
        className={mode === 'single' ? 'bg-gray-100' : ''}
      >
        Single Query
      </Button>
      <Button
        variant="ghost"
        icon={Layers}
        onClick={() => onChange('batch')}
        className={mode === 'batch' ? 'bg-gray-100' : ''}
      >
        Batch Query
      </Button>
    </div>
  );
}