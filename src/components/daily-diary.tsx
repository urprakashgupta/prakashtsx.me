import { getAllDiaryEntries } from '@/utils/get-diary-entries';
import { DiaryListClient } from './diary-list-client';

// Get diary entries at build time
const diaryEntries = getAllDiaryEntries();

function DailyDiary() {
  return (
    <section className="flex flex-col gap-y-2 text-black dark:text-white w-full">
      <div className="mb-2">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight">
          Daily Diary
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          My daily journey - what I did, learned, and experienced each day
        </p>
      </div>

      {diaryEntries.length > 0 ? (
        <div className="mt-2">
          <DiaryListClient entries={diaryEntries} itemsPerPage={5} />
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 text-center">
          No diary entries yet. Start writing your daily journey!
        </div>
      )}
    </section>
  );
}

export default DailyDiary;
