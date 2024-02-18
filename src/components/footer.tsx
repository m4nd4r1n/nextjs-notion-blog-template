import Link from 'next/link';

import config from '@/../blog.config';

const Footer = () => {
  return (
    <footer className='mt-8 flex flex-col items-center'>
      <div className='mb-4 flex space-x-2 text-sm text-neutral-500 dark:text-neutral-400'>
        <div>{`© ${new Date().getFullYear()} ${config.author}`}</div>
        <div>{` • `}</div>
        <Link href='/'>{config.title}</Link>
      </div>
    </footer>
  );
};

export default Footer;
