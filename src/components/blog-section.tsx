import { getAllBlogPosts } from '@/utils/get-blog-posts';
import { BlogListClient } from './blog-list-client';

// Get blog posts at build time
const blogPosts = getAllBlogPosts();

function BlogSection() {
  return (
    <section className="flex flex-col gap-y-2 text-black dark:text-white w-full">
      <div className="mb-2">
        <h2 className="font-bold text-2xl md:text-4xl tracking-tight">Blogs</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          My thoughts, ideas, and insights about development, design, and more
        </p>
      </div>

      {blogPosts.length > 0 ? (
        <div className="mt-2">
          <BlogListClient posts={blogPosts} itemsPerPage={5} />
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 text-center">
          I haven&apos;t written any blogs yet but I do plan to write some
          soon...
        </div>
      )}
    </section>
  );
}

export default BlogSection;
