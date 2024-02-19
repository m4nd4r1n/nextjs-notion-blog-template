import Link from 'next/link';
import type { FC } from 'react';

import type { SelectColor } from '@/types';

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
  default:
    'text-slate-500 hover:text-slate-600 active:text-slate-700 dark:hover:text-slate-400 dark:active:text-slate-300',
  gray: 'text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 active:text-gray-700 dark:active:text-gray-300',
  brown:
    'text-brown-500 hover:text-brown-600 dark:hover:text-brown-400 active:text-brown-700 dark:active:text-brown-300',
  orange:
    'text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 active:text-orange-700 dark:active:text-orange-300',
  yellow:
    'text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 active:text-yellow-700 dark:active:text-yellow-300',
  green:
    'text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-700 dark:active:text-emerald-300',
  blue: 'text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 active:text-sky-700 dark:active:text-sky-300',
  purple:
    'text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 active:text-violet-700 dark:active:text-violet-300',
  pink: 'text-pink-500 hover:text-pink-600 dark:hover:text-pink-400 active:text-pink-700 dark:active:text-pink-300',
  red: 'text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 active:text-rose-700 dark:active:text-rose-300',
});
