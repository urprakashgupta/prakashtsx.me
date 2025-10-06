import { Suspense } from 'react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { BlogNavigation } from '@/components/blog-navigation';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { beautifyDate } from '@/utils/beautify-date';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const diarySchema = z.object({
  date: z.string(),
  title: z.string().optional(),
  mood: z.string().optional(),
});

async function getDiaryEntry(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      'src/content/diary',
      `${slug}.md`
    );
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const { success, data: validatedData, error } = diarySchema.safeParse(data);

    if (!success) {
      console.error(data);
      throw new Error('Invalid data');
    }

    return { ...validatedData, content };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateStaticParams() {
  const diaryDir = path.join(process.cwd(), 'src/content/diary');

  try {
    const files = fs.readdirSync(diaryDir);

    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({
        slug: file.replace(/\.md$/, ''),
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const entry = await getDiaryEntry(params.slug);

  if (!entry) {
    return notFound();
  }

  return {
    title: entry.title || `Diary - ${entry.date}`,
    description: `Daily diary entry from ${entry.date}`,
  };
}

export default async function DiaryEntryPage(props: PageProps) {
  const params = await props.params;
  const entry = await getDiaryEntry(params.slug);

  if (!entry) {
    return notFound();
  }

  const title = entry.title || 'Daily Diary Entry';
  const date = beautifyDate(entry.date);

  return (
    <main className="container mx-auto px-4 py-8">
      <BlogNavigation />
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-black dark:text-white">
          {title}
        </h1>
        {entry.mood && (
          <span className="text-4xl" title={`Mood: ${entry.mood}`}>
            {entry.mood}
          </span>
        )}
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{date}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <MarkdownRenderer content={entry.content} />
      </Suspense>
    </main>
  );
}
