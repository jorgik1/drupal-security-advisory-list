import React from 'react';
import { ListBulletIcon, BugAntIcon } from '../components/Icons';

export type ViewType = 'feed' | 'checker';

interface ViewSelectorProps {
  selectedView: ViewType;
  onSelectView: (view: ViewType) => void;
}

const viewOptions: { key: ViewType; label: string; icon: React.FC<{className?: string}> }[] = [
  { key: 'feed', label: 'Feed', icon: ListBulletIcon },
  { key: 'checker', label: 'Checker', icon: BugAntIcon },
];

export const ViewSelector: React.FC<ViewSelectorProps> = ({ selectedView, onSelectView }) => {
  return (
    <div className="flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 rounded-lg p-1 flex items-center space-x-1">
      {viewOptions.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onSelectView(key)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-black ${
            selectedView === key
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-black dark:text-white'
              : 'text-zinc-600 hover:bg-zinc-300/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};