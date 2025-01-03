import React from 'react';
import { Card } from './ui/Card';
import { Skeleton } from './ui/Skeleton';

export function QueryResultsSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-32" />
      </div>
      
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    </Card>
  );
}