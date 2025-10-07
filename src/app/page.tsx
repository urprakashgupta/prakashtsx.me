import BlogSection from '@/components/blog-section';
import LearningJourney from '@/components/learning-journey';
import GetInTouch from '@/components/get-in-touch';
import Introduction from '@/components/introduction';
import ProofOfWork from '@/components/proof-of-work';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prakash',
    url: 'https://prakashtsx.me',
    image: 'https://prakashtsx.me/icon.png',
    sameAs: [
      'https://github.com/urprakashgupta',
      'https://twitter.com/prakash_tsx',
    ],
    jobTitle: 'Software Developer',
    description:
      'Developer documenting my journey, sharing technical learnings, and building projects.',
    knowsAbout: [
      'Web Development',
      'Software Engineering',
      'Next.js',
      'TypeScript',
      'React',
    ],
  };

  return (
    <main className="flex flex-col gap-y-8 justify-center items-start mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Introduction Section */}
      <Introduction />
      {/* Proof of work Section */}
      <ProofOfWork />
      {/* Daily Diary Section */}
      <LearningJourney />
      {/* Blogs Section */}
      <BlogSection />
      {/* Footer Section */}
      <hr className="border-zinc-900 dark:border-zinc-800 border w-full" />
      <GetInTouch />
      {/* <FiberWrapper /> */}
    </main>
  );
}
