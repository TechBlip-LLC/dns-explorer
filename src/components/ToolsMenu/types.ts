import { LucideIcon } from 'lucide-react';

export interface Tool {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
  color: string;
}

export interface ToolsConfig {
  [category: string]: Tool[];
}