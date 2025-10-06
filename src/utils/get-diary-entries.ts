import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

export interface DiaryEntry {
  slug: string;
  date: string;
  title?: string;
  mood?: string;
  content: string;
}

export const diarySchema = z.object({
  date: z.string(),
  title: z.string().optional(),
  mood: z.string().optional(),
});

/**
 * Get all diary entries from diary directory
 */
export function getAllDiaryEntries(): DiaryEntry[] {
  try {
    const diaryDir = path.join(process.cwd(), 'src/content/diary');

    // Check if directory exists
    if (!fs.existsSync(diaryDir)) {
      return [];
    }

    const files = fs.readdirSync(diaryDir);

    const entries = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(diaryDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        const { success, data: validatedData } = diarySchema.safeParse(data);

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
      .filter(Boolean) as DiaryEntry[];

    // Sort by date, newest first
    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting diary entries:', error);
    return [];
  }
}

/**
 * Get paginated diary entries
 */
export function getPaginatedDiaryEntries(
  page: number = 1,
  perPage: number = 5
) {
  const allEntries = getAllDiaryEntries();
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
