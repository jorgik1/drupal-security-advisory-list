import React from 'react';
import { FeedType } from '../services/rssService';

interface FeedSelectorProps {
  selectedFeed: FeedType;
  onSelectFeed: (feed: FeedType) => void;
}

const feedOptions: { key: FeedType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'core', label: 'Core' },
  { key: 'contrib', label: 'Contrib' },
];

export const FeedSelector: React.FC<FeedSelectorProps> = ({ selectedFeed, onSelectFeed }) => {
  return (
    <div className="flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 rounded-lg p-1 flex items-center space-x-1">
      {feedOptions.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelectFeed(key)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-black ${
            selectedFeed === key
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-black dark:text-white'
              : 'text-zinc-600 hover:bg-zinc-300/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};