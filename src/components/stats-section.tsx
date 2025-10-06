import { getJourneyStats } from '@/utils/get-journey-stats';

const stats = getJourneyStats();

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-black dark:text-white mb-1">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

function StatsSection() {
  return (
    <section className="flex flex-col gap-y-4 text-black dark:text-white w-full">
      <div className="mb-2">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight">
          Journey Stats
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Tracking my progress and consistency
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Diary Entries"
          value={stats.totalDiaryEntries}
          subtitle={
            stats.firstEntryDate ? `Since ${stats.firstEntryDate}` : undefined
          }
          icon="📝"
        />

        <StatCard
          title="Tech Blogs"
          value={stats.totalBlogs}
          subtitle="Articles written"
          icon="💻"
        />

        <StatCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle="Keep it going!"
          icon="🔥"
        />

        <StatCard
          title="Longest Streak"
          value={`${stats.longestStreak} days`}
          subtitle="Personal best"
          icon="🏆"
        />
      </div>

      {stats.mostProductiveMonth !== 'N/A' && (
        <div className="mt-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800 border-2 border-blue-200 dark:border-zinc-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h3 className="font-bold text-lg">Most Productive Month</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {stats.mostProductiveMonth} - You were on fire! 🚀
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default StatsSection;
