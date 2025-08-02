import React from 'react';
import { BookOpen } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary-500" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-warm-gray dyslexia-text">
          Loading DysWrite
        </h3>
        <p className="text-gray-600 dyslexia-text">
          Preparing your writing assistant...
        </p>
      </div>
    </div>
  );
}