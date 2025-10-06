import { getAllBlogPosts } from './get-blog-posts';
import { getAllDiaryEntries } from './get-diary-entries';

export interface JourneyStats {
  totalDiaryEntries: number;
  totalBlogs: number;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  mostProductiveMonth: string;
  firstEntryDate: string | null;
}

/**
 * Calculate current streak of consecutive days with diary entries
 */
function calculateCurrentStreak(entries: { date: string }[]): number {
  if (entries.length === 0) return 0;

  const dates = entries
    .map((e) => new Date(e.date))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const entryDate of dates) {
    const entry = new Date(entryDate);
    entry.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currentDate.getTime() - entry.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}

/**
 * Calculate longest streak ever
 */
function calculateLongestStreak(entries: { date: string }[]): number {
  if (entries.length === 0) return 0;

  const dates = entries
    .map((e) => new Date(e.date))
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);

    prevDate.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

/**
 * Find the most productive month
 */
function getMostProductiveMonth(entries: { date: string }[]): string {
  if (entries.length === 0) return 'N/A';

  const monthCounts: { [key: string]: number } = {};

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });

  const mostProductive = Object.entries(monthCounts).reduce(
    (max, [month, count]) => (count > max.count ? { month, count } : max),
    { month: '', count: 0 }
  );

  if (!mostProductive.month) return 'N/A';

  const [year, month] = mostProductive.month.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Get all journey statistics
 */
export function getJourneyStats(): JourneyStats {
  const diaryEntries = getAllDiaryEntries();
  const blogs = getAllBlogPosts();

  const allEntries = [...diaryEntries];
  const sortedByDate = allEntries.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstEntry = sortedByDate[0];
  const firstDate = firstEntry ? new Date(firstEntry.date) : null;
  const today = new Date();
  const totalDays = firstDate
    ? Math.floor(
        (today.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return {
    totalDiaryEntries: diaryEntries.length,
    totalBlogs: blogs.length,
    currentStreak: calculateCurrentStreak(diaryEntries),
    longestStreak: calculateLongestStreak(diaryEntries),
    totalDays,
    mostProductiveMonth: getMostProductiveMonth(diaryEntries),
    firstEntryDate: firstDate
      ? firstDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : null,
  };
}
