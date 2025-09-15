import React from 'react';
import { Beaker } from 'lucide-react';

export const BetaBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
        <Beaker className="h-4 w-4" />
        <span className="text-sm font-medium">Beta Version</span>
        <span className="text-orange-100 text-xs">- We're constantly improving your experience</span>
      </div>
    </div>
  );
};