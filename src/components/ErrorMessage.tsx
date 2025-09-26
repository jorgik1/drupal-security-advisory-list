import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-300" role="alert">
      <AlertTriangleIcon className="h-5 w-5 mr-3" />
      <div>
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{message}</span>
      </div>
    </div>
  );
};