import { useState } from 'react';

export function useToolsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    isOpen,
    setIsOpen
  };
}