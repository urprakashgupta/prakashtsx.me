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

const journeySchema = z.object({
  date: z.string(),
  title: z.string().optional(),
  mood: z.string().optional(),
});

async function getJourneyEntry(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      'src/content/journey',
      `${slug}.md`
    );
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const {
      success,
      data: validatedData,
      error,
    } = journeySchema.safeParse(data);

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
  const journeyDir = path.join(process.cwd(), 'src/content/journey');

  try {
    const files = fs.readdirSync(journeyDir);

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
  const entry = await getJourneyEntry(params.slug);

  if (!entry) {
    return notFound();
  }

  const title = entry.title || `Learning Journey - ${entry.date}`;
  const description = `Learning journey entry from ${beautifyDate(
    entry.date
  )}. Documenting my growth as a developer, challenges faced, and lessons learned.`;

  return {
    title: title,
    description: description,
    authors: [{ name: 'Prakash' }],
    openGraph: {
      title: title,
      description: description,
      url: `https://prakashtsx.me/journey/${params.slug}`,
      type: 'article',
      publishedTime: entry.date,
      authors: ['Prakash'],
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
  };
}

export default async function JourneyEntryPage(props: PageProps) {
  const params = await props.params;
  const entry = await getJourneyEntry(params.slug);

  if (!entry) {
    return notFound();
  }

  const title = entry.title || 'Learning Journey Entry';
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
