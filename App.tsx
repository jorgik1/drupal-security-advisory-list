import React, { useState, useEffect, useMemo } from 'react';
import { SecurityAdvisory } from './types';
import { fetchAdvisories, FeedType } from './src/services/rssService';
import { AdvisoryCard } from './src/components/AdvisoryCard';
import { LoadingSpinner } from './src/components/LoadingSpinner';
import { ErrorMessage } from './src/components/ErrorMessage';
import { SearchIcon, ListBulletIcon } from './src/components/Icons';
import { Pagination } from './src/components/Pagination';
import { ThemeSwitcher } from './src/components/ThemeSwitcher';
import { FeedSelector } from './src/components/FeedSelector';
import { ViewSelector, ViewType } from './src/components/ViewSelector';
import { VulnerabilityChecker } from './src/components/VulnerabilityChecker';

const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('feed');
  const [advisories, setAdvisories] = useState<SecurityAdvisory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [feedType, setFeedType] = useState<FeedType>('all');

  useEffect(() => {
    if (view !== 'feed') return; // Only fetch advisories for the feed view

    const loadAdvisories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedAdvisories = await fetchAdvisories(feedType);
        setAdvisories(fetchedAdvisories);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadAdvisories();
  }, [feedType, view]);

  const filteredAdvisories = useMemo(() => {
    return advisories.filter(advisory =>
      advisory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advisory.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [advisories, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, feedType]);

  const totalPages = Math.ceil(filteredAdvisories.length / ITEMS_PER_PAGE);

  const currentAdvisories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAdvisories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAdvisories, currentPage]);
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const renderFeedContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner />
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">Fetching latest advisories...</p>
        </div>
      );
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (filteredAdvisories.length === 0) {
      return <p className="text-center text-zinc-500 dark:text-zinc-400">
        {searchTerm ? "No advisories match your search." : "No advisories found."}
      </p>;
    }

    return (
      <div className="space-y-3">
        {currentAdvisories.map((advisory, index) => (
          <AdvisoryCard key={advisory.id || index} advisory={advisory} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <ViewSelector selectedView={view} onSelectView={setView} />
          <ThemeSwitcher />
        </div>
        
        {view === 'feed' ? (
          <>
            <header className="py-8">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <ListBulletIcon className="h-8 w-8 text-blue-500"/>
                 </div>
                 <div>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Live Feed</p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">
                        Drupal Security
                    </h1>
                 </div>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                The latest security notifications, advisories, and news from the Drupal security team. Stay informed and keep your sites secure.
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search advisories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-zinc-500" />
                    </div>
                </div>
                <FeedSelector selectedFeed={feedType} onSelectFeed={setFeedType} />
            </div>

            <section>
              {renderFeedContent()}
            </section>

            {filteredAdvisories.length > ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            )}
          </>
        ) : (
          <VulnerabilityChecker />
        )}
        
        <footer className="text-center py-8 mt-8 text-zinc-500 dark:text-zinc-600 text-sm">
            <p>UI inspired by Apple Music. Data provided by Drupal.org.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;