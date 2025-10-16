'use client';
import dynamic from 'next/dynamic';
import { useCallback, useState, useEffect } from 'react';
import { Activity } from 'react-github-calendar';

const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
  loading: () => <div className="h-[159px] w-full" />,
});

function GithubCalender() {
  const [totalCount, setTotalCount] = useState(0);
  const [key, setKey] = useState(0);

  // Force refresh every 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 24 * 60 * 60 * 1000); // 24 hours
    return () => clearInterval(interval);
  }, []);

  const processContributions = useCallback((contributions: Activity[]) => {
    // Hack to calculate total count after rendering
    setTimeout(() => {
      const total = contributions
        .map((el) => el.count)
        .reduce((acc, curr) => acc + curr, 0);

      setTotalCount(total);
    }, 0);

    return contributions.slice(91, 365);
  }, []);

  return (
    <GitHubCalendar
      key={key}
      username="urprakashgupta"
      transformData={processContributions}
      totalCount={totalCount}
      errorMessage="Unable to fetch contribution data"
      blockSize={12}
      blockMargin={4}
      fontSize={14}
      hideColorLegend={false}
      hideMonthLabels={false}
      hideTotalCount={false}
      loading={false}
    />
  );
}

export default GithubCalender;
