import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  fullWidth?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  fullWidth,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
    secondary: "bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50",
    ghost: "text-secondary-600 hover:bg-secondary-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && (
        <Icon 
          className={`w-5 h-5 ${props.disabled ? 'opacity-50' : ''} ${
            props['aria-busy'] ? 'animate-spin' : ''
          }`} 
        />
      )}
      {children}
    </button>
  );
}