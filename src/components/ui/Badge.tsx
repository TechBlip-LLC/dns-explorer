import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-primary-100 text-primary-800 ring-1 ring-primary-200',
    success: 'bg-green-100 text-green-800 ring-1 ring-green-200',
    error: 'bg-red-100 text-red-800 ring-1 ring-red-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}