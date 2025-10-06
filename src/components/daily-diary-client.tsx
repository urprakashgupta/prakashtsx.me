'use client';
import { useState, useMemo } from 'react';
import type { DiaryEntry } from '@/utils/get-diary-entries';
import { beautifyDate } from '@/utils/beautify-date';

const ENTRIES_PER_PAGE = 5;

// DiaryCard component to display individual diary entry
function DiaryCard({ entry }: { entry: DiaryEntry }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="dark:border-zinc-800 border-2 border-zinc-100 rounded-md p-4 w-full hover:bg-gray-50 dark:hover:bg-zinc-800/70 transition-all duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            {entry.title && (
              <h3 className="font-bold text-lg">{entry.title}</h3>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {beautifyDate(entry.date)}
            </p>
          </div>
          {entry.mood && (
            <span className="text-2xl" title={`Mood: ${entry.mood}`}>
              {entry.mood}
            </span>
          )}
        </div>

        <div className="text-gray-700 dark:text-gray-300">
          {isExpanded ? (
            <div className="whitespace-pre-wrap">{entry.content}</div>
          ) : (
            <div className="line-clamp-3 whitespace-pre-wrap">
              {entry.content}
            </div>
          )}
        </div>

        {entry.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline self-start"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}

interface DailyDiaryClientProps {
  allEntries: DiaryEntry[];
}

function DailyDiaryClient({ allEntries }: DailyDiaryClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side pagination
  const paginatedData = useMemo(() => {
    const totalPages = Math.ceil(allEntries.length / ENTRIES_PER_PAGE);
    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const endIndex = startIndex + ENTRIES_PER_PAGE;
    
    return {
      entries: allEntries.slice(startIndex, endIndex),
      totalPages,
      currentPage,
      totalEntries: allEntries.length,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [allEntries, currentPage]);

  const handleNextPage = () => {
    if (paginatedData.hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (paginatedData.hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="flex flex-col gap-y-4 text-black dark:text-white w-full">
      <div className="mb-2">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight">
          Daily Diary
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          My daily journey - what I did, learned, and experienced each day
        </p>
      </div>

      {paginatedData.entries.length > 0 ? (
        <>
          <div className="flex flex-col w-full gap-y-3">
            {paginatedData.entries.map((entry) => (
              <DiaryCard key={entry.slug} entry={entry} />
            ))}
          </div>

          {/* Pagination Controls */}
          {paginatedData.totalPages > 1 && (
            <div className="flex flex-row items-center justify-between mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handlePrevPage}
                disabled={!paginatedData.hasPrev}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  paginatedData.hasPrev
                    ? 'bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {paginatedData.currentPage} of {paginatedData.totalPages} ({paginatedData.totalEntries} entries)
              </span>

              <button
                onClick={handleNextPage}
                disabled={!paginatedData.hasNext}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  paginatedData.hasNext
                    ? 'bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-700 dark:hover:bg-zinc-600'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 text-center">
          No diary entries yet. Start writing your daily journey!
        </div>
      )}
    </section>
  );
}

export default DailyDiaryClient;
