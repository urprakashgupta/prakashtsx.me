import { BlogNavigation } from '@/components/blog-navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn more about my journey, what I do, and why I document my experiences',
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <BlogNavigation />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-4xl md:text-6xl tracking-tight mb-4 text-black dark:text-white">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Welcome to my personal corner of the internet 👋
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
              Hi, I'm Prakash!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm a developer on a continuous learning journey, documenting my
              experiences, thoughts, and technical discoveries along the way.
              This space is my digital garden where I nurture ideas and track my
              growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Every day is an opportunity to learn something new, build
              something meaningful, and become a better version of myself. This
              site is a testament to that philosophy.
            </p>
          </section>

          {/* What I Do */}
          <section className="mb-12 bg-gray-50 dark:bg-zinc-900 rounded-lg p-6 border-2 border-gray-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              <span>💻</span> What I Do
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm passionate about building web applications and exploring new
              technologies. My journey involves:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span>
                  Writing code and building projects that solve real problems
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span>Learning new frameworks, tools, and best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span>
                  Documenting my daily progress and technical insights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                <span>
                  Contributing to open source and helping others learn
                </span>
              </li>
            </ul>
          </section>

          {/* Why This Site */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              <span></span> Why I Document My Journey
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This site serves multiple purposes:
            </p>
            <div className="space-y-4">
              <div className="pl-4 border-l-4 border-blue-600 dark:border-blue-400">
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Personal Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Writing helps me reflect, learn deeper, and track my progress
                  over time
                </p>
              </div>
              <div className="pl-4 border-l-4 border-purple-600 dark:border-purple-400">
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Sharing Knowledge
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If my experiences help even one person, it's worth it
                </p>
              </div>
              <div className="pl-4 border-l-4 border-green-600 dark:border-green-400">
                <h3 className="font-semibold text-black dark:text-white mb-1">
                  Thinking Out Loud
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A space to organize my thoughts and document my journey
                  authentically
                </p>
              </div>
            </div>
          </section>

          {/* What You'll Find */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
              <span>🌟</span> What You'll Find Here
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                  Daily Diary
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  My day-to-day experiences, what I'm learning, challenges I'm
                  facing, and small wins worth celebrating
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-2 text-black dark:text-white">
                  Tech Blogs
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  In-depth articles about technologies I'm exploring, tutorials,
                  and technical insights from my projects
                </p>
              </div>
            </div>
          </section>

          {/* Closing */}
          <section className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 italic">
              "The journey of a thousand miles begins with a single step."
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm">
              Thanks for being part of my journey! 🌱
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
