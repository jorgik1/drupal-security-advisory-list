import React from 'react';
import { SecurityAdvisory } from '../types';
import { ExternalLinkIcon } from './Icons';

interface AdvisoryCardProps {
  advisory: SecurityAdvisory;
}

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

const cleanDescription = (html: string): string => {
    const text = html.replace(/<[^>]*>?/gm, ' ');
    return text.replace(/\s\s+/g, ' ').trim().slice(0, 200) + '...';
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory }) => {
  return (
    <a
      href={advisory.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-lg transition-all duration-300 ease-in-out transform border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 hover:scale-[1.02]"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
            {advisory.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            By {advisory.creator} &middot; Published on {formatDate(advisory.pubDate)}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
           <ExternalLinkIcon className="h-5 w-5 text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
        </div>
      </div>
      <p className="mt-3 text-sm text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
        {cleanDescription(advisory.description)}
      </p>
    </a>
  );
};