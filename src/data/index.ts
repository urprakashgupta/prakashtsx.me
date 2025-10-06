export type IconNameType = 'pull-request' | 'video' | 'github';

interface ILink {
  name: string;
  href: string;
  icon?: IconNameType;
  iconClass?: string;
  hidden?: true;
}

export const links: Array<ILink> = [
  {
    name: 'Improved Mail0 loading speed by introducing indexes',
    href: 'https://github.com/Mail-0/Zero/pull/1613',
    icon: 'pull-request',
  },
  {
    name: 'Mannu Aurora & Harkirat appreciating me for my work',
    href: '',
    hidden: true,
  },
  {
    name: 'Added rate limit middleware to expressots',
    href: 'https://github.com/expressots/expressots/pull/115',
    icon: 'pull-request',
  },
  {
    name: 'Cache all screenshots in single directory in shortest',
    href: 'https://github.com/antiwork/shortest/pull/387',
    icon: 'pull-request',
  },
  {
    name: 'Auto close support tickets that are old',
    href: 'https://github.com/antiwork/helper/pull/65',
    icon: 'pull-request',
  },
  {
    name: 'Add razorpay integration',
    href: 'https://github.com/code100x/cms/pull/175',
    icon: 'pull-request',
  },
  {
    name: 'Add functionality to convert a webpage to pdf',
    href: 'https://github.com/code100x/daily-code/pull/56',
    icon: 'pull-request',
  },
  {
    name: 'Prevents mail service from spamming emails',
    href: 'https://github.com/formbricks/formbricks/pull/2798',
    icon: 'pull-request',
  },
  {
    name: 'Hobby snake game project that got over 25 stars',
    href: 'https://github.com/devsargam/SnakeGame',
    icon: 'github',
  },
];
