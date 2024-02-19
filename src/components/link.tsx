import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type {
  AnchorHTMLAttributes,
  FC,
  PropsWithChildren,
  RefAttributes,
} from 'react';

import { cva } from 'cva';

import { cn } from '@/utils/cn';

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    PropsWithChildren,
    RefAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary';
}

const Link: FC<LinkProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <NextLink className={cn(linkVariants({ variant }), className)} {...props} />
  );
};

const linkVariants = cva('motion-safe:transition-colors', {
  variants: {
    variant: {
      primary: [
        'text-primary-500',
        'hover:text-primary-600',
        'active:text-primary-700',
        'dark:hover:text-primary-400',
        'dark:active:text-primary-300',
      ],
      secondary: [
        'text-neutral-900',
        'hover:text-neutral-600',
        'active:text-neutral-500',
        'dark:text-neutral-100',
        'dark:hover:text-neutral-400',
        'dark:active:text-neutral-500',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export default Link;
