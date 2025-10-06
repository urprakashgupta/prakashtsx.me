'use client';
import { useState } from 'react';
import { Link } from 'next-view-transitions';
import BookIcon from './icons/book-icon';
import type { DiaryEntry } from '@/utils/get-diary-entries';

interface DiaryListClientProps {
  entries: DiaryEntry[];
  itemsPerPage?: number;
}

export function DiaryListClient({
  entries,
  itemsPerPage = 5,
}: DiaryListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = entries.slice(startIndex, endIndex);

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
      <div className="flex flex-col w-full gap-y-2">
        {currentEntries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/diary/${entry.slug}`}
            className="group dark:hover:bg-zinc-800/70 dark:border-zinc-800 border-2 border-zinc-100 hover:border-zinc-200 dark:hover:border-zinc-700 rounded-md py-3 w-full hover:bg-gray-50 transition-all duration-200 flex flex-col px-3"
          >
            <div className="flex flex-row items-center gap-2">
              <BookIcon className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              <span className="font-bold group-hover:text-black dark:group-hover:text-white">
                {entry.title || entry.date}
              </span>
            </div>
          </Link>
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
            Page {currentPage} of {totalPages}
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
