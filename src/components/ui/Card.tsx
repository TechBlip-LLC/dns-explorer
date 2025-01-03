import React from 'react';
import { animations } from './animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${animations.fadeIn} hover:shadow-2xl transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}