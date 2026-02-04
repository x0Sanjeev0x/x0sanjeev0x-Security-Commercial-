
// Added React import to resolve the 'React' namespace error
import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Partner {
  name: string;
  logo: string;
}
