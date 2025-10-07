import { BlogNavigation } from '@/components/blog-navigation';
import BlogSection from '@/components/blog-section';
import { Metadata } from 'next';

const title = 'Tech Blog';
const description =
  'Technical articles about web development, software engineering, learning strategies, and building projects. Learn from my experiences and insights.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'tech blog',
    'web development',
    'software engineering',
    'coding tutorials',
    'developer insights',
    'Next.js',
    'TypeScript',
    'React',
  ],
  openGraph: {
    title,
    description,
    url: 'https://prakashtsx.me/blogs',
    type: 'website',
    images: [{ url: '/og-image/blogs', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: '/og-image/blogs' }],
  },
};

export default function Blogs() {
  return (
    <>
      <BlogNavigation />
      <BlogSection />
    </>
  );
}
