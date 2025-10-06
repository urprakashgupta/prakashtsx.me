import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prakash - Code, Learn, Document, Repeat',
  description:
    'Documenting my daily journey, technical learnings, and staying consistent with my work',
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
