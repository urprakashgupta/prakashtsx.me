import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://prakashtsx.me'),
  title: 'Prakash - Documenting My Growth Journey',
  description:
    'Documenting my daily journey as a developer, sharing technical learnings, building projects, and staying consistent with my growth.',
  keywords: [
    'developer blog',
    'coding journey',
    'tech blog',
    'daily diary',
    'software engineering',
    'web development',
    'Prakash',
    'learning in public',
    'prakash.tsx',
    'prakashtsx',
    'urprakashgupta',
    'prakashtsx.me',
  ],
  authors: [{ name: 'Prakash', url: 'https://prakashtsx.me' }],
  creator: 'Prakash',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prakashtsx.me',
    siteName: 'Prakash - Developer Journey',
    title: 'Prakash - Documenting My Growth Journey',
    description:
      'Documenting my daily journey as a developer, sharing technical learnings, building projects, and staying consistent with my growth.',
    images: [
      {
        url: '/og-image/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Prakash - Developer Journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prakash - Documenting My Growth Journey',
    description:
      'Documenting my daily journey as a developer, sharing technical learnings, building projects, and staying consistent with my growth.',
    creator: '@prakash_tsx',
    images: ['/og-image/og_image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add this from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="bg-white dark:bg-zinc-900">
        <body className={inter.className}>
          <main className="bg-white dark:border-zinc-800 border-zinc-200 border-2 dark:bg-zinc-900 min-h-screen max-w-2xl mx-auto my-1 px-4 py-4">
            {children}
            <SpeedInsights />
            <Analytics />
          </main>
          <Script id="clarity-script" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nczs4rjeot");
            `}
          </Script>
          <Script
            id="ahrefs"
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="KrVNPks4a/m70wrtIgrG/g"
            async
          ></Script>
        </body>
      </html>
    </ViewTransitions>
  );
}
