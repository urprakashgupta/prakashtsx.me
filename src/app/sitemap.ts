import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/utils/get-blog-posts';
import { getAllDiaryEntries } from '@/utils/get-diary-entries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prakashtsx.me';

  // Get all blog posts
  const blogs = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Get all diary entries
  const diaryEntries = getAllDiaryEntries().map((entry) => ({
    url: `${baseUrl}/diary/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...blogs, ...diaryEntries];
}
