import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/utils/get-blog-posts';
import { getAllJourneyEntries } from '@/utils/get-journey-entries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prakashtsx.me';

  // Automatically get all blog posts
  const blogs = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Automatically get all journey entries
  const journeyEntries = getAllJourneyEntries().map((entry) => ({
    url: `${baseUrl}/journey/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static pages (never change)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journey`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Combine everything automatically
  return [...staticPages, ...blogs, ...journeyEntries];
}
