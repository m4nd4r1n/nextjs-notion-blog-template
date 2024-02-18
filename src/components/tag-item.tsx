import Link from 'next/link';
import type { FC } from 'react';

import type { SelectColor } from '@/libs/types';

interface TagItemProps {
  tag: string;
  color: SelectColor;
}

const TagItem: FC<TagItemProps> = ({ tag, color }) => {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      className={`mr-3 text-sm font-medium uppercase leading-none motion-safe:transition-colors ${COLORS[color]}`}
    >
      {tag}
    </Link>
  );
};

export default TagItem;

const COLORS: Readonly<Record<SelectColor, string>> = Object.freeze({
  default: 'text-slate-500 hover:text-slate-600 dark:hover:text-slate-400',
  gray: 'text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400',
  brown: 'text-brown-500 hover:text-brown-600 dark:hover:text-brown-400',
  orange: 'text-orange-500 hover:text-orange-600 dark:hover:text-orange-400',
  yellow: 'text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400',
  green: 'text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400',
  blue: 'text-sky-500 hover:text-sky-600 dark:hover:text-sky-400',
  purple: 'text-violet-500 hover:text-violet-600 dark:hover:text-violet-400',
  pink: 'text-pink-500 hover:text-pink-600 dark:hover:text-pink-400',
  red: 'text-rose-500 hover:text-rose-600 dark:hover:text-rose-400',
});
