import React from 'react';
import GithubCalender from './github-calender';

function ProofOfWork() {
  return (
    <div className="flex flex-col gap-y-4 text-black dark:text-white w-full">
      <h2 className="font-bold text-2xl md:text-4xl tracking-tight">
        Proof of Work
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        All the work I have done so far in public && people&apos;s appreciation
      </p>
      <GithubCalender />
    </div>
  );
}

export default ProofOfWork;
