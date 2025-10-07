import React from 'react';

function GetInTouch() {
  return (
    <div className="flex flex-col gap-y-4 text-black dark:text-white w-full">
      <Footer />
    </div>
  );
}

import { GithubIcon, Mail, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <GithubIcon className="w-5 h-5" />,
    href: 'https://github.com/urprakashgupta',
    label: 'GitHub',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:prakashtsx@gmail.com',
    label: 'Email',
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: 'https://www.linkedin.com/in/urprakashgupta',
    label: 'LinkedIn',
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: 'https://twitter.com/prakash_tsx',
    label: 'Twitter',
  },
];

function Footer() {
  return (
    <footer>
      <div className="flex justify-center space-x-6">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-400 dark:hover:text-white hover:text-zinc-900 transition-colors duration-200"
            aria-label={link.label}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Prakash. All rights reserved.
      </div>
      <div className="mt-4 text-center text-sm">Made with ❤️ by Prakash</div>
    </footer>
  );
}

export default GetInTouch;
