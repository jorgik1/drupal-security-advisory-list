import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const buttonBaseClasses = "p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-black";
  const enabledClasses = "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300";
  const disabledClasses = "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-900 dark:text-zinc-600";

  return (
    <nav className="flex items-center justify-between mt-8" aria-label="Pagination">
      <button
        onClick={onPrevPage}
        disabled={isFirstPage}
        aria-disabled={isFirstPage}
        className={`${buttonBaseClasses} ${isFirstPage ? disabledClasses : enabledClasses}`}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </button>

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Page <span className="font-medium text-zinc-800 dark:text-zinc-200">{currentPage}</span> of <span className="font-medium text-zinc-800 dark:text-zinc-200">{totalPages}</span>
      </div>

      <button
        onClick={onNextPage}
        disabled={isLastPage}
        aria-disabled={isLastPage}
        className={`${buttonBaseClasses} ${isLastPage ? disabledClasses : enabledClasses}`}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </button>
    </nav>
  );
};