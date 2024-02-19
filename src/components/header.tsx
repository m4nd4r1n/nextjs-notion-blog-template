import Image from 'next/image';

import config from '@/../blog.config';
import Link from '@/components/link';

const Header = () => {
  return (
    <header className='sticky -top-2 z-10 flex items-center justify-between pb-2 pt-4 backdrop-blur-sm md:-top-10 md:pt-12'>
      <div className='flex items-center'>
        <Link href='/' aria-label={config.title}>
          <Image src='/logo.png' width={36} height={36} alt={config.title} />
        </Link>
        <div className='ml-2 hidden font-medium text-neutral-600 dark:text-neutral-300 sm:block'>
          {config.title}
        </div>
      </div>
      <NavBar />
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
      </ul>
    </div>
  );
};
