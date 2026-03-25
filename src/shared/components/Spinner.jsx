import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProgressSpinner
        style={{ width: '48px', height: '48px' }}
        strokeWidth="4"
        animationDuration=".8s"
      />
    </div>
  );
};

export default Spinner;
