'use client';
import { useState } from 'react';

interface PaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T) => React.ReactNode;
}

export function PaginatedList<T extends { slug: string }>({
  items,
  itemsPerPage = 5,
  renderItem,
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-y-3">
        {currentItems.map((item) => (
          <div key={item.slug}>{renderItem(item)}</div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-row items-center justify-between mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handlePrevPage}
            disabled={!hasPrev}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              hasPrev
                ? 'bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600'
                : 'bg-zinc-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            ← Previous
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages} ({items.length} total)
          </span>

          <button
            onClick={handleNextPage}
            disabled={!hasNext}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              hasNext
                ? 'bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600'
                : 'bg-zinc-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
