'use client';

import Image from 'next/image';
import { useState } from 'react';

import config from '@/../blog.config';
import Client from '@/components/client';
import Link from '@/components/link';
import ThemeSwitch, { ThemeSwitchSkeleton } from '@/components/theme-switch';
import useOnScroll from '@/hooks/use-on-scroll';
import { cn } from '@/utils/cn';

const Header = () => {
  const [borderShow, setBorderShow] = useState(false);

  const handleWindowScroll = () => {
    if (window.scrollY > 50) setBorderShow(true);
    else setBorderShow(false);
  };

  useOnScroll(handleWindowScroll);

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full px-4 py-2 backdrop-blur-[5px] md:px-6 md:py-4',
        'before:absolute before:bottom-0 before:h-px before:bg-neutral-200/50 before:transition-[width,left] before:duration-700 before:content-[""] before:dark:bg-neutral-600/50',
        {
          'before:left-0 before:w-full': borderShow,
          'before:left-1/2 before:w-0': !borderShow,
        },
      )}
    >
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
        <div className='flex items-center'>
          <Link href='/' aria-label={config.title}>
            <Image src='/logo.png' width={36} height={36} alt={config.title} />
          </Link>
          <div className='ml-2 hidden font-medium text-neutral-600 dark:text-neutral-300 sm:block'>
            {config.title}
          </div>
        </div>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;

type Link = {
  id: number;
  name: string;
  to: string;
  show: boolean;
  external?: boolean;
};

const NavBar = () => {
  const links: Link[] = [
    { id: 0, name: 'Blog', to: '/', show: true },
    { id: 1, name: 'About', to: '/about', show: config.showAbout },
    { id: 2, name: 'Search', to: '/search', show: true },
  ];

  return (
    <div className='flex-shrink-0'>
      <ul className='flex flex-row gap-4'>
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className='nav block text-black dark:text-gray-50'
              >
                <Link
                  variant='secondary'
                  href={link.to}
                  target={link.external ? '_blank' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ),
        )}
        <Client fallback={<ThemeSwitchSkeleton />}>
          <ThemeSwitch />
        </Client>
      </ul>
    </div>
  );
};
