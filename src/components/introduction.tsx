import Image from 'next/image';
import React from 'react';
import { Link } from 'next-view-transitions';

function Introduction() {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
          Prakash ⚡
        </h1>
        <p className="text-zinc-600 dark:text-zinc-500 mb-3">
          I tinker around with my beloved laptop
        </p>
        <Link
          href="/about"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Learn more about me →
        </Link>
      </div>
      <div>
        <Image
          src="https://avatars.githubusercontent.com/u/136782002?s=400&u=e283ed86e5d1345ed746040c07b1a2a2231e08db&v=4"
          alt="Prakash's Photo"
          height={200}
          width={200}
          className="object-cover rounded-full border-4 dark:border-zinc-800 border-zinc-900"
        />
      </div>
    </div>
  );
}

export default Introduction;
