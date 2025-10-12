
import type React from 'react';

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface ManagementSystem {
  name: string;
  description: string;
  website: string;
  keyFeatures: string[];
}
