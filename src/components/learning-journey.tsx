import { getAllJourneyEntries } from '@/utils/get-journey-entries';
import { JourneyListClient } from './journey-list-client';

// Get journey entries at build time
const journeyEntries = getAllJourneyEntries();

function LearningJourney() {
  return (
    <section className="flex flex-col gap-y-2 text-black dark:text-white w-full">
      <div className="mb-2">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight flex items-center gap-3">
          Learning Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          My learning journey - documenting growth, challenges, and discoveries
          along the way
        </p>
      </div>

      {journeyEntries.length > 0 ? (
        <div className="mt-2">
          <JourneyListClient entries={journeyEntries} itemsPerPage={5} />
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 text-center">
          No journey entries yet !
        </div>
      )}
    </section>
  );
}

export default LearningJourney;
