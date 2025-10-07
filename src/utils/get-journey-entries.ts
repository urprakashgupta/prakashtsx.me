import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

export interface JourneyEntry {
  slug: string;
  date: string;
  title?: string;
  mood?: string;
  content: string;
}

export const journeySchema = z.object({
  date: z.string(),
  title: z.string().optional(),
  mood: z.string().optional(),
});

/**
 * Get all journey entries from journey directory
 */
export function getAllJourneyEntries(): JourneyEntry[] {
  try {
    const journeyDir = path.join(process.cwd(), 'src/content/journey');

    // Check if directory exists
    if (!fs.existsSync(journeyDir)) {
      return [];
    }

    const files = fs.readdirSync(journeyDir);

    const entries = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(journeyDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const { success, data: validatedData } = journeySchema.safeParse(data);

        if (!success) {
          console.error(`Invalid frontmatter in ${file}`);
          return null;
        }

        return {
          ...validatedData,
          slug: file.replace('.md', ''),
          content,
        };
      })
      .filter(Boolean) as JourneyEntry[];

    // Sort by date, newest first
    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting journey entries:', error);
    return [];
  }
}

/**
 * Get paginated journey entries
 */
export function getPaginatedJourneyEntries(
  page: number = 1,
  perPage: number = 5
) {
  const allEntries = getAllJourneyEntries();
  const totalPages = Math.ceil(allEntries.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    entries: allEntries.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    totalEntries: allEntries.length,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
